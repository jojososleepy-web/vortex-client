# 🚂 Deploy Vortex Client to Railway (FREE)

Get a permanent URL like `https://vortex-client.up.railway.app` - no need to keep your computer on!

---

## ✅ **What You'll Get:**

- 🌐 Permanent URL (never changes)
- ⚡ Fast, professional hosting
- 💰 FREE ($5 credit/month, your app uses ~$2)
- 🔄 Auto-deploy from GitHub
- 🚀 No computer needed

---

## 📋 **Step-by-Step Deployment (15 minutes)**

### **Step 1: Create GitHub Account (if you don't have one)**

1. Go to: https://github.com/signup
2. Enter your email
3. Create password
4. Choose username (e.g., `yourusername`)
5. Verify email

### **Step 2: Push Your Code to GitHub**

**Open PowerShell in your project folder:**

```powershell
cd "c:\Users\Mrbea\Downloads\Minecraft client script with HUD features - Claude_files\vortex-client"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial Vortex Client"

# Create repo on GitHub (you'll need to do this manually)
```

**Then go to GitHub:**
1. Click **+** (top right) → **New repository**
2. Name: `vortex-client`
3. Keep **Private** selected
4. Click **Create repository**

**Copy the commands GitHub shows you:**
```powershell
git remote add origin https://github.com/YOUR-USERNAME/vortex-client.git
git branch -M main
git push -u origin main
```

### **Step 3: Deploy to Railway**

1. Go to: https://railway.app
2. Click **Login** → **Login with GitHub**
3. Authorize Railway
4. Click **New Project**
5. Click **Deploy from GitHub repo**
6. Select your `vortex-client` repo
7. Click **Deploy Now**

**Railway will automatically:**
- ✅ Install dependencies (`npm install`)
- ✅ Start your server (`node server.js`)
- ✅ Give you a public URL

### **Step 4: Add Environment Variables**

1. In Railway dashboard, click your project
2. Click **Variables** tab
3. Add these one by one:

```
MICROSOFT_CLIENT_ID=63f94002-a99a-4fee-b1fb-a2920b141548
SESSION_SECRET=vortex-super-secret-session-key-change-in-production
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

**Don't add `VORTEX_DOMAIN`** - Railway automatically sets it!

### **Step 5: Get Your URL**

1. Click **Settings** tab
2. Scroll to **Networking**
3. Click **Generate Domain**
4. Your URL will be like: `https://vortex-client-production-xxxx.up.railway.app`

**Want a shorter URL?**
- Click the domain → **Custom Domain**
- Change to something like: `vortex-client.up.railway.app`

### **Step 6: Update Azure Redirect URI**

1. Go to: https://portal.azure.com
2. Find your app: `63f94002-a99a-4fee-b1fb-a2920b141548`
3. **Authentication** → **Redirect URIs**
4. Add: `https://your-railway-url.up.railway.app/auth/callback`
5. Click **Save**

---

## 🎉 **Done!**

Your website is now live permanently at your Railway URL!

**Benefits:**
- ✅ Works 24/7 (even when computer is off)
- ✅ URL never changes
- ✅ Fast loading
- ✅ Free SSL certificate (HTTPS)
- ✅ Auto-deploy when you push to GitHub

---

## 🔄 **To Update Your Site Later:**

Just push to GitHub:

```powershell
cd vortex-client
git add .
git commit -m "Updated features"
git push
```

Railway auto-deploys in ~2 minutes!

---

## 💰 **Railway Pricing:**

- **Free trial:** $5 credit (lasts ~2 months)
- **Hobby plan:** $5/month after trial
- Your app uses ~$2-3/month

---

## 🆘 **Troubleshooting:**

**"git not recognized":**
Install Git: https://git-scm.com/download/win

**"Failed to push":**
```powershell
git config user.name "Your Name"
git config user.email "your@email.com"
git push
```

**Railway build fails:**
Check the logs in Railway dashboard

---

## 📝 **Alternative: One-Click Deploy**

If you don't want to use GitHub, Railway also supports:
- Deploy from ZIP file
- Deploy from CLI

Want help with either? Let me know!

---

Good luck! 🚀
