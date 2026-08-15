# 🌐 Connect vortexproxy.online to Your Server

## ✅ What's Running Now:

- 🖥️ Server: `http://localhost:3000` ✅
- 🌐 Tunnel: `https://vortexproxy.loca.lt` ✅
- 🎯 Your Domain: `vortexproxy.online` (needs DNS setup)

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Add DNS Records in Namecheap

**1. Go to:** https://ap.www.namecheap.com/domains/list/

**2. Click "Manage"** next to `vortexproxy.online`

**3. Click "Advanced DNS"** tab

**4. Delete any existing records** (Parking Page, etc.)

**5. Add these 2 records:**

**Record 1:**
- Type: `CNAME Record`
- Host: `@`
- Value: `vortexproxy.loca.lt`
- TTL: `Automatic`

**Record 2:**
- Type: `CNAME Record`
- Host: `www`
- Value: `vortexproxy.loca.lt`
- TTL: `Automatic`

**6. Click green ✓ "Save All Changes"**

---

### Step 2: Update Azure

**Go to:** https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Authentication/appId/63f94002-a99a-4fee-b1fb-a2920b141548

**Under Redirect URIs:**
1. Delete old URI (with `curvy-results` or other)
2. Click "+ Add URI"
3. Enter: `https://vortexproxy.online/auth/callback`
4. Click "Save"

---

### Step 3: Wait & Test

**Wait:** 10-30 minutes for DNS to propagate

**Then visit:** https://vortexproxy.online

**You should see:** Your Vortex Client homepage! 🎉

---

## ⚠️ IMPORTANT

**Keep these windows open:**
1. Server window (node server.js)
2. Tunnel window (localtunnel)

**If you close either = website stops working!**

---

## 🔧 Current Status:

✅ Server running on port 3000  
✅ Tunnel connected: vortexproxy.loca.lt  
✅ Domain purchased: vortexproxy.online  
⏳ DNS needs setup (do Step 1 above)  
⏳ Azure needs update (do Step 2 above)  

---

## 📝 Alternative: Deploy to Railway (Recommended)

This setup requires your computer to stay on 24/7.

**For permanent hosting** (computer can turn off), follow `DEPLOY-NOW.md` to deploy to Railway.

Railway gives you:
- ✅ 24/7 uptime
- ✅ No computer needed
- ✅ Faster performance
- ✅ Free hosting

---

**Start with Step 1 (Namecheap DNS) now!**
