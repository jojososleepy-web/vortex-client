# VORTEX CLIENT — QUICK START

## ✅ WEBSITE IS READY

Visit: **http://localhost:3000**

---

## 🔐 TO MAKE LOGIN WORK:

### Create Your Own Microsoft App:

1. Go to: **https://portal.azure.com**
2. Search: **"App registrations"**
3. Click: **"New registration"**
4. Enter:
   - Name: `Vortex Client`
   - Account types: **"Personal Microsoft accounts and organizational accounts"**
   - Redirect URI: `http://localhost:3000/auth/callback`
5. Click **"Register"**
6. **COPY THE CLIENT ID** that appears
7. Open `.env` file in this folder
8. Replace the `MICROSOFT_CLIENT_ID` with YOUR new Client ID
9. Restart the server: `npm start`

---

## 🎮 MINECRAFT BEDROCK PACK INSTALL:

### Windows 10/11:
1. Press `Win + R`
2. Paste: `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs`
3. Copy the entire **`bedrock_pack`** folder into that location
4. Open Minecraft → Create World → Behavior Packs → Activate **"Vortex Client"**
5. Enable **"Beta APIs"** in world settings (Experiments)
6. Create world and join

### Android:
1. Open file manager
2. Go to: `/storage/emulated/0/games/com.mojang/behavior_packs/`
3. Copy the **`bedrock_pack`** folder there
4. Open Minecraft → follow steps 4-6 above

### iOS:
1. Open Files app
2. Go to: `On My iPhone/Minecraft/games/com.mojang/behavior_packs/`
3. Copy the **`bedrock_pack`** folder there
4. Open Minecraft → follow steps 4-6 above

---

## 💻 IN-GAME COMMANDS:

Once in Minecraft with the pack enabled, type in chat:

```
/.help          - Show all commands
/.modules       - List all 38+ modules
/.killaura      - Toggle Killaura
/.fly           - Toggle Fly
/.xray          - Toggle Xray
/.speed         - Toggle Speed
/.esp           - Toggle ESP
/.tpmine diamond_ore - Set TPMine to diamond ore (then CROUCH to teleport)
```

**All commands use `/.` prefix!**

---

## 🎯 EXAMPLE USAGE:

1. Join your Minecraft world with Vortex pack enabled
2. Type: `/.fly` → Fly mode enabled
3. Type: `/.killaura` → Auto-attack nearby mobs
4. Type: `/.tpmine diamond_ore` → Set ore target
5. **Crouch/Sneak** → Teleports you to nearest diamond ore
6. Type: `/.modules` → See all 38+ available modules

---

## 👑 PREMIUM MODULES:

These require Premium (locked by default):
- InfiniteAura
- AntiHits
- StashFinder
- AutoMine
- AutoArmor
- AutoTotem

To enable Premium, set `premium: true` in `bedrock_pack/scripts/main.js` line 12.

---

## 🌐 WEBSITE FEATURES:

- ✅ Full features catalog with 38+ modules
- ✅ Premium section
- ✅ Commands reference
- ✅ Account page with Microsoft login
- ✅ Server selection
- ✅ Proxy connection display (shows "Vortex Proxy")
- ✅ Dark theme with purple/gold design

---

## ⚡ YOU'RE ALL SET!

**Website:** http://localhost:3000
**In-game:** Type `/.help` after loading the behavior pack

Enjoy Vortex Client! 🎮
