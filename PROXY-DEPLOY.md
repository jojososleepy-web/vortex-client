# Deploy Vortex Proxy to Render

## Steps:

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect to your GitHub repo: `jojososleepy-web/vortex-client`
4. Configure:
   - **Name:** `vortex-proxy`
   - **Root Directory:** `proxy`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`
5. Click **"Create Web Service"**

## Important:

**Render's free tier uses HTTP ports (like 10000), NOT port 19132.**

Minecraft Bedrock REQUIRES port 19132 UDP, which Render free tier doesn't support for UDP traffic.

## Alternative: Use a Minecraft-specific host

For a real working proxy, you need:
- **Aternos** (free, supports Bedrock)
- **Oracle Cloud** (free tier, configure firewall for UDP 19132)
- **Your own PC** (run proxy locally)

**For now, the website will show a placeholder IP. You'll need proper UDP hosting for the proxy to actually work.**
