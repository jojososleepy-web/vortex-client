# VORTEX CLIENT — SETUP GUIDE

## ✅ Server is Running

Your Vortex Client website is live at: **http://localhost:3000**

---

## 🔐 Microsoft OAuth Setup (Required for Login)

The website uses Microsoft OAuth for authentication. To make the "Connect Microsoft" button work, you need to register the redirect URI with Microsoft Azure.

### Steps:

1. Go to [Azure Portal](https://portal.azure.com) and login with your Microsoft account

2. Navigate to **Azure Active Directory** → **App registrations**

3. Find the app with Client ID: `81feaced-5ddd-41e7-8bef-3e20a2689bb7`
   - If this app doesn't exist or you don't have access, you'll need to create a new app registration

4. Go to **Authentication** → **Platform configurations** → **Add a platform** → **Web**

5. Add this Redirect URI:
   ```
   http://localhost:3000/auth/callback
   ```

6. Enable **ID tokens** and **Access tokens** if not already enabled

7. Click **Save**

### If You Need to Create a New App:

1. Go to **App registrations** → **New registration**
2. Name: `Vortex Client`
3. Supported account types: **Accounts in any organizational directory and personal Microsoft accounts**
4. Redirect URI: `http://localhost:3000/auth/callback`
5. Register, then copy the **Application (client) ID**
6. Update `.env` file with your new Client ID:
   ```
   MICROSOFT_CLIENT_ID=your-new-client-id-here
   ```
7. Restart the server

---

## 🚀 Production Deployment

When deploying to production (e.g., `vortexclient.com`):

1. Update `.env`:
   ```
   VORTEX_DOMAIN=vortexclient.com
   PORT=443
   SESSION_SECRET=generate-a-long-random-string
   ```

2. Add the production redirect URI to Azure:
   ```
   https://vortexclient.com/auth/callback
   ```

3. Use HTTPS (the code automatically switches to https:// when not localhost)

4. Set up SSL certificates (Let's Encrypt recommended)

---

## 💳 Stripe Premium Setup

To enable real Premium purchases:

1. Create a Stripe account at [stripe.com](https://stripe.com)

2. Create a **Payment Link** or **Checkout Session** for Vortex Premium

3. Add the Stripe checkout URL to `.env`:
   ```
   STRIPE_CHECKOUT_URL=https://buy.stripe.com/your-link
   ```

4. Update the Premium button in `public/index.html` to use the real Stripe link

5. Set up a Stripe webhook to notify your server when payment succeeds, then update the user's premium status in the database

---

## 📦 Minecraft Bedrock Pack

The Bedrock behavior pack is located at:
```
bedrock_pack/
```

To install:
1. Copy the entire `bedrock_pack` folder to:
   - Windows: `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs\`
   - Android: `/storage/emulated/0/games/com.mojang/behavior_packs/`
   - iOS: `On My iPhone/Minecraft/games/com.mojang/behavior_packs/`

2. Open Minecraft → Create New World → Behavior Packs → Enable "Vortex Client"

3. Enable **Beta APIs** in world settings

4. In-game, type `/.help` to see all commands

---

## 🔧 Current Features

### Website:
- ✅ Home page with hero, features preview
- ✅ Full features page with 38+ modules organized by category
- ✅ Premium section with 6 exclusive modules
- ✅ Commands reference page
- ✅ FAQ section
- ✅ Account page with Microsoft login flow
- ✅ Server selection interface
- ✅ Proxy connection status display
- ✅ Responsive mobile/desktop design
- ✅ Dark theme with purple/gold accent

### Authentication:
- ✅ Microsoft OAuth 2.0 with PKCE
- ✅ Secure session management
- ✅ Account status page
- ✅ Premium status tracking

### Proxy Address Display:
- ✅ Shows "Vortex Proxy" after connection
- ✅ Port: 19132
- ✅ Copy to clipboard button

---

## 🎮 Available Modules

**Combat (Regular):**
- Killaura, Fly, Aimbot, Reach, Fastest, Hitbox, AutoCrit, TriggerBot

**Movement (Regular):**
- Speed, LongJump, Jesus, HighJump, Spider

**Visual (Regular):**
- ESP, Xray, FullBright, NameTags, Tracer, ItemESP, MobESP, ChestESP, StorageESP, EntityRadar

**Utility (Regular):**
- Disabler, AutoLog, Noclip, TP, TPMine, AutoEat, AutoSwitch, AutoChest, ChestStealer

**Client/HUD (Regular):**
- ClickGUI, HUD Editor, Keystrokes, CPS Counter, FPS Counter, Coordinates, ArmorHUD, PotionHUD, ArrayList, Config Manager

**Premium Only:**
- InfiniteAura, AntiHits, StashFinder, AutoMine, AutoArmor, AutoTotem

---

## 📝 Notes

- The proxy connection is currently simulated on the website
- Real proxy functionality requires deploying a Bedrock proxy server (separate component)
- TPMine only works with ore blocks (diamond_ore, emerald_ore, etc.)
- All commands use the `/.` prefix
- Premium modules show a lock icon and require Premium purchase

---

## 🆘 Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Check server terminal for backend errors
3. Verify .env configuration
4. Ensure redirect URI is registered in Azure
5. Clear browser cache and cookies if auth fails

---

**Vortex Client is ready!** Visit http://localhost:3000 to see it in action.
