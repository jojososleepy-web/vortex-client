require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.MICROSOFT_CLIENT_ID || '81feaced-5ddd-41e7-8bef-3e20a2689bb7';
const VORTEX_DOMAIN = process.env.VORTEX_DOMAIN || 'localhost:3000';
const SESSION_SECRET = process.env.SESSION_SECRET || 'vortex-secret-change-me';

// Determine if running on HTTPS
const isHttps = !VORTEX_DOMAIN.startsWith('localhost') && !VORTEX_DOMAIN.startsWith('127.');
const REDIRECT_URI = `${isHttps ? 'https' : 'http'}://${VORTEX_DOMAIN}/auth/callback`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isHttps,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

// ─── Helper: generate PKCE ─────────────────────────────────────────────────
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('base64url');
}

function generateCodeChallenge(verifier) {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
}

function generateState() {
  return crypto.randomBytes(16).toString('hex');
}

// ─── Routes ───────────────────────────────────────────────────────────────

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve account page
app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

app.get('/account.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

// Return current session/auth status as JSON
app.get('/api/auth/status', (req, res) => {
  if (req.session && req.session.user) {
    res.json({
      authenticated: true,
      user: {
        displayName: req.session.user.displayName,
        email: req.session.user.email,
        id: req.session.user.id
      },
      premium: req.session.user.premium || false,
      selectedServer: req.session.selectedServer || null,
      proxyConnected: req.session.proxyConnected || false
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Return the redirect URI so the frontend can display it
app.get('/api/auth/redirect-uri', (req, res) => {
  res.json({ redirectUri: REDIRECT_URI });
});

// Start Microsoft OAuth login
app.get('/auth/login', (req, res) => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = generateState();

  // Store in session
  req.session.pkce = { codeVerifier, state };

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'openid profile email XboxLive.signin',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    prompt: 'select_account'
  });

  const authUrl = `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?${params.toString()}`;
  res.redirect(authUrl);
});

// OAuth callback
app.get('/auth/callback', async (req, res) => {
  const { code, state, error, error_description } = req.query;

  if (error) {
    console.error('OAuth error:', error, error_description);
    return res.redirect('/?auth=error&reason=' + encodeURIComponent(error_description || error));
  }

  if (!req.session.pkce) {
    return res.redirect('/?auth=error&reason=session_expired');
  }

  const { codeVerifier, state: savedState } = req.session.pkce;

  // Verify state to prevent CSRF
  if (state !== savedState) {
    return res.redirect('/?auth=error&reason=state_mismatch');
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch(
      'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier
        })
      }
    );

    const tokens = await tokenResponse.json();

    if (tokens.error) {
      console.error('Token exchange error:', tokens);
      return res.redirect('/?auth=error&reason=' + encodeURIComponent(tokens.error_description || tokens.error));
    }

    // Get user profile from Microsoft Graph
    const profileResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    const profile = await profileResponse.json();

    // Store user in session (never store passwords, only tokens/profile)
    req.session.user = {
      id: profile.id,
      displayName: profile.displayName || profile.userPrincipalName,
      email: profile.mail || profile.userPrincipalName,
      premium: false // Set to true when Stripe payment is confirmed
    };

    // Clear PKCE data
    delete req.session.pkce;

    res.redirect('/account?auth=success');
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.redirect('/?auth=error&reason=server_error');
  }
});

// Demo Login (no Microsoft required)
app.post('/auth/demo-login', (req, res) => {
  req.session.user = {
    id: 'demo-user-' + Date.now(),
    displayName: 'Demo User',
    email: 'demo@vortexclient.local',
    premium: false
  };
  
  // Force session save before responding
  req.session.save((err) => {
    if (err) {
      console.error('Session save error:', err);
      return res.status(500).json({ success: false, error: 'Session error' });
    }
    res.json({ success: true });
  });
});

// Logout
app.post('/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// Select server
app.post('/api/server/select', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const { serverId, serverName, serverHost, serverPort } = req.body;
  if (!serverId || !serverName) {
    return res.status(400).json({ error: 'Invalid server' });
  }
  req.session.selectedServer = { serverId, serverName, serverHost, serverPort };
  req.session.proxyConnected = false;
  res.json({ success: true, server: req.session.selectedServer });
});

// Connect proxy (simulated — in production this would spin up the actual proxy)
app.post('/api/proxy/connect', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (!req.session.selectedServer) {
    return res.status(400).json({ error: 'No server selected' });
  }
  // Simulate connection delay; in real deployment, initiate the proxy here
  req.session.proxyConnected = true;
  res.json({
    success: true,
    proxyAddress: 'Vortex Proxy',
    proxyPort: 19132,
    message: `Connected to ${req.session.selectedServer.serverName} through Vortex Proxy.`
  });
});

// Disconnect proxy
app.post('/api/proxy/disconnect', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  req.session.proxyConnected = false;
  req.session.selectedServer = null;
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

// Create Payment Intent (Stripe)
app.post('/api/create-payment-intent', async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  try {
    const { plan, amount } = req.body;
    
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true, // Enables Apple Pay, Cash App, all cards
      },
      metadata: {
        plan: plan,
        userId: req.session.user?.id || 'guest'
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe Webhook (for payment confirmation)
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;
    
    // TODO: Upgrade user to Premium in database
    console.log(`✅ Payment succeeded for user: ${userId}`);
    // In real app: Update database to set user.premium = true
  }

  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`\n╔══════════════════════════════════════════╗`);
  console.log(`║         VORTEX CLIENT SERVER             ║`);
  console.log(`╠══════════════════════════════════════════╣`);
  console.log(`║  Running on: http://localhost:${PORT}       ║`);
  console.log(`║  OAuth Redirect: ${REDIRECT_URI}`);
  console.log(`╚══════════════════════════════════════════╝\n`);
  console.log(`  ⚠  Register this redirect URI in Azure:`);
  console.log(`     ${REDIRECT_URI}\n`);
});
