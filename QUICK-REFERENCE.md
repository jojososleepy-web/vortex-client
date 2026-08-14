# ⚡ Vortex Client - Quick Reference

---

## 🔗 Your Live Website
**https://devourer-ceremony-lion.ngrok-free.dev**

---

## 🔧 Fix Microsoft Login (DO THIS FIRST)

1. Go to https://portal.azure.com
2. Open your app: `63f94002-a99a-4fee-b1fb-a2920b141548`
3. **Authentication** → Check "ID tokens" → Save
4. **API permissions** → Add permissions: `openid`, `profile`, `email`, `User.Read`
5. Click "Grant admin consent" → Yes
6. Done! Test login on your website

**Full guide:** See `MICROSOFT-OAUTH-FIX.md`

---

## 💳 Setup Stripe Payments

1. Sign up at https://stripe.com
2. Dashboard → API Keys → Copy your keys
3. Edit `.env` file:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
   STRIPE_SECRET_KEY=sk_test_YOUR_SECRET
   ```
4. Edit `public/checkout.html` line 164:
   ```javascript
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY';
   ```
5. Restart server:
   ```bash
   taskkill /F /IM node.exe /T
   cd vortex-client
   npm start
   ```
6. Test: Use card `4242 4242 4242 4242`

**Full guide:** See `STRIPE-SETUP.md`

---

## 🎮 Test Everything

✅ **Homepage:** https://devourer-ceremony-lion.ngrok-free.dev  
✅ **Login:** Click "Login with Microsoft" button  
✅ **Dashboard:** https://devourer-ceremony-lion.ngrok-free.dev/account.html  
✅ **Checkout:** https://devourer-ceremony-lion.ngrok-free.dev/checkout.html  
✅ **Demo Mode:** Click "Try Demo Mode" (no Microsoft needed)  

---

## 🖥️ Server Commands

**Start server:**
```bash
cd "c:\Users\Mrbea\Downloads\Minecraft client script with HUD features - Claude_files\vortex-client"
npm start
```

**Stop server:**
```bash
taskkill /F /IM node.exe /T
```

**Start ngrok:**
```bash
cd "C:\Users\Mrbea\Downloads\ngrok-v3-stable-windows-amd64"
.\ngrok.exe http 3000
```

---

## 💰 Current Pricing

- **Monthly:** $9.99/month
- **Lifetime:** $29.99 once (Best Value!)

To change: Edit `public/checkout.html` lines 67-68

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | API keys & configuration |
| `server.js` | Backend server |
| `public/index.html` | Homepage |
| `public/checkout.html` | Payment page |
| `bedrock_pack/` | Minecraft hacks (38+ modules) |
| `STRIPE-SETUP.md` | Payment setup guide |
| `MICROSOFT-OAUTH-FIX.md` | OAuth fix guide |
| `COMPLETE-SETUP-GUIDE.md` | Full documentation |

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Microsoft login fails | Enable ID tokens in Azure (see MICROSOFT-OAUTH-FIX.md) |
| "Stripe not configured" | Add API keys to `.env` and `checkout.html` |
| Port 3000 in use | Run: `taskkill /F /IM node.exe /T` |
| ngrok URL changed | Update Azure redirect URI + `.env` VORTEX_DOMAIN |

---

## ✅ What's Working Now

✅ Website is live and running  
✅ All pages load correctly  
✅ Demo login works  
✅ Stripe integration ready (just needs your API keys)  
✅ Microsoft OAuth ready (just needs Azure permissions)  
✅ 38+ Minecraft hacks in behavior pack  
✅ Enhanced animations and design  
✅ Apple Pay, Cash App, all cards supported  

---

## 📚 Full Documentation

- **`COMPLETE-SETUP-GUIDE.md`** - Everything explained in detail
- **`STRIPE-SETUP.md`** - Payment setup step-by-step
- **`MICROSOFT-OAUTH-FIX.md`** - Fix OAuth login
- **`INSTALLATION.md`** - Install Minecraft behavior pack

---

## 🚀 Next Steps

1. Fix Microsoft login (5 min) → `MICROSOFT-OAUTH-FIX.md`
2. Setup Stripe (5 min) → `STRIPE-SETUP.md`
3. Test everything
4. Share your link with users!

**Your URL:** https://devourer-ceremony-lion.ngrok-free.dev

---

Good luck! 🎉
