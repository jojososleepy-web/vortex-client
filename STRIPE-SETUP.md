# 💳 Stripe Payment Setup Guide

Complete guide to set up Stripe payments with Apple Pay, Cash App, and all card types.

---

## 🚀 Quick Setup (5 minutes)

### 1. Create Stripe Account
1. Go to https://stripe.com
2. Click **Sign Up** → Choose your country
3. Enter business details (or use personal for testing)
4. Verify your email

### 2. Get Your API Keys
1. Go to **Developers** → **API Keys** (https://dashboard.stripe.com/test/apikeys)
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`) - Click "Reveal test key"

### 3. Add Keys to Your Project

**Update `.env` file:**
```env
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_HERE
```

**Update `checkout.html` (line ~164):**
```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_ACTUAL_KEY_HERE';
```

### 4. Restart Server
```bash
taskkill /F /IM node.exe /T
cd vortex-client
npm start
```

### 5. Test Payment
1. Go to `https://your-ngrok-url.ngrok-free.dev/checkout.html`
2. Select a plan
3. Use test card: `4242 4242 4242 4242`
4. Any future date, any CVC
5. Complete payment!

---

## 📱 Supported Payment Methods

Your Vortex checkout automatically supports:

✅ **All Credit/Debit Cards**
- Visa, Mastercard, American Express, Discover, Diners Club, JCB, UnionPay

✅ **Apple Pay**
- Automatically appears on Safari (Mac/iPhone/iPad)
- Users see "Apple Pay" button if device supports it

✅ **Cash App Pay**
- Automatically available for US customers
- Users see "Cash App Pay" option in payment methods

✅ **Google Pay**
- Available on Chrome/Android with Google Pay setup

✅ **Link** (Stripe's 1-click checkout)

All enabled by Stripe's `automatic_payment_methods: true` setting!

---

## 🧪 Test Cards (Use in Test Mode)

| Card Number | Brand | Use Case |
|-------------|-------|----------|
| `4242 4242 4242 4242` | Visa | ✅ Successful payment |
| `4000 0025 0000 3155` | Visa | ✅ Requires 3D Secure (2FA) |
| `4000 0000 0000 9995` | Visa | ❌ Decline (insufficient funds) |
| `4000 0000 0000 0002` | Visa | ❌ Decline (generic) |

**For all test cards:**
- Use any **future expiration date** (e.g., 12/34)
- Use any **3-digit CVC** (e.g., 123)
- Use any **5-digit ZIP** (e.g., 12345)

More test cards: https://stripe.com/docs/testing

---

## 🔔 Setup Webhooks (Optional but Recommended)

Webhooks notify your server when payments succeed/fail.

### Local Testing with Stripe CLI:
1. Download Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3000/webhook/stripe`
4. Copy the webhook secret (starts with `whsec_...`)
5. Add to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
   ```

### Production Webhooks:
1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. URL: `https://your-domain.com/webhook/stripe`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook secret → Add to `.env`

---

## 💰 Go Live (When Ready)

### 1. Activate Your Account
- Go to **Activate your account** in Stripe Dashboard
- Provide business/personal information
- Add bank account for payouts

### 2. Switch to Live Keys
- Go to **Developers** → **API Keys**
- Toggle to **Live mode** (top right)
- Get your live keys: `pk_live_...` and `sk_live_...`
- Update `.env` and `checkout.html` with live keys

### 3. Update Prices (if needed)
- Currently set: $9.99/month, $29.99 lifetime
- To change: Edit `checkout.html` line ~67-68

---

## 🐛 Troubleshooting

### "Stripe not configured" error
- Check `.env` has correct keys
- Restart server after changing `.env`
- Keys should start with `pk_test_` or `sk_test_`

### Apple Pay not showing
- Apple Pay only works on Safari (Mac/iOS)
- Must use HTTPS (ngrok provides this)
- User must have card in Apple Wallet

### Cash App not showing
- Cash App Pay only available for US customers
- User must be in test mode or live mode (not both)

### Payment fails in test mode
- Use test card `4242 4242 4242 4242`
- Check Stripe Dashboard → **Payments** for error details

---

## 📊 View Payments

**Test Mode:**
https://dashboard.stripe.com/test/payments

**Live Mode:**
https://dashboard.stripe.com/payments

---

## 🔗 Useful Links

- Stripe Dashboard: https://dashboard.stripe.com
- API Keys: https://dashboard.stripe.com/apikeys
- Test Cards: https://stripe.com/docs/testing
- Webhooks: https://dashboard.stripe.com/webhooks
- Payment Methods: https://stripe.com/docs/payments/payment-methods

---

## 💡 Tips

1. **Always test** in test mode before going live
2. **Never commit** your secret key to Git (it's in `.env` which is gitignored)
3. **Use webhooks** to handle payment confirmations reliably
4. **Check dashboard** regularly to see successful payments
5. **Switch to live keys** only when ready to accept real payments

---

Need help? Check Stripe's documentation or contact Stripe support!
