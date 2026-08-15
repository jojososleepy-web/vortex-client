# 🚀 Deploy vortexproxy.online - Just Click Buttons!

Your domain: **vortexproxy.online** ✅

---

## 📋 STEP 1: GitHub (2 minutes)

**1. Go to:** https://github.com/new

**2. Fill in:**
- Repository name: `vortex-client`
- Description: (leave blank)
- ⚫ Private (keep selected)
- ❌ Don't check any boxes

**3. Click:** Green "Create repository" button

**4. You'll see commands. IGNORE THEM. Just copy this URL:**
```
https://github.com/YOUR-USERNAME/vortex-client.git
```
(Replace YOUR-USERNAME with your actual GitHub username from the URL)

**5. Open PowerShell and run:**
```powershell
cd "c:\Users\Mrbea\Downloads\Minecraft client script with HUD features - Claude_files\vortex-client"

git remote add origin https://github.com/YOUR-USERNAME/vortex-client.git

git push -u origin main
```

**If it asks for login:** Enter GitHub username and password (or personal access token)

---

## 📋 STEP 2: Railway (3 minutes)

**1. Go to:** https://railway.app

**2. Click:** "Start a New Project" (big button)

**3. Click:** "Deploy from GitHub repo"

**4. If says "Connect GitHub":**
- Click "Connect GitHub"
- Click "Authorize Railway"
- Come back

**5. Click:** Your `vortex-client` repo from the list

**6. Click:** "Deploy Now" or "Add variables"

**7. Click:** "Variables" tab (top)

**8. Add these variables one by one (click "+ New Variable" for each):**

```
Name: MICROSOFT_CLIENT_ID
Value: 63f94002-a99a-4fee-b1fb-a2920b141548
```

```
Name: SESSION_SECRET
Value: vortex-super-secret-production-key-2024
```

```
Name: PORT
Value: 3000
```

**9. Click:** "Settings" tab (top)

**10. Scroll down to "Networking"**

**11. Click:** "Generate Domain" button

**12. Click the domain name** (something like vortex-client-production-abc.up.railway.app)

**13. Click:** "Custom Domain"

**14. Type:** `vortexproxy.online`

**15. Click:** "Add Domain"

**16. Railway shows DNS records. COPY THEM:**

Should look like:
```
Type: CNAME
Host: @
Target: vortex-client-production-abc.up.railway.app
```

**KEEP THIS TAB OPEN!**

---

## 📋 STEP 3: Namecheap (2 minutes)

**1. Go to:** https://ap.www.namecheap.com/domains/list/

**2. Find:** vortexproxy.online

**3. Click:** "Manage" button next to it

**4. Click:** "Advanced DNS" tab (top)

**5. Delete all existing records (if any):**
- Click trash icon 🗑️ next to each record

**6. Click:** "Add New Record" button

**7. Add Record 1:**
- Type: `CNAME Record`
- Host: `@`
- Value: (paste from Railway, like `vortex-client-production-abc.up.railway.app`)
- TTL: `Automatic`

**8. Click:** "Add New Record" again

**9. Add Record 2:**
- Type: `CNAME Record`
- Host: `www`
- Value: (same as above, paste from Railway)
- TTL: `Automatic`

**10. Click:** Green checkmark ✓ "Save All Changes" (top right)

**11. Wait 10-30 minutes** for DNS to update

---

## 📋 STEP 4: Azure (1 minute)

**1. Go to:** https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Authentication/appId/63f94002-a99a-4fee-b1fb-a2920b141548

**2. Under "Redirect URIs" section:**

**3. Find the old URI** (has `loca.lt` or `ngrok`)

**4. Click the 🗑️ trash icon** to delete it

**5. Click:** "+ Add URI" button

**6. Type:** `https://vortexproxy.online/auth/callback`

**7. Click:** "Save" button (bottom)

---

## 📋 STEP 5: Test It! (Wait 15 minutes first)

**After 15-30 minutes, visit:**

🔗 https://vortexproxy.online

**You should see:** Your Vortex Client homepage! 🎉

**If not working:**
- Wait longer (DNS can take up to 1 hour)
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito mode
- Check Railway logs for errors

---

## ✅ **What Each Step Does:**

1. **GitHub** = Stores your code
2. **Railway** = Runs your website 24/7
3. **Namecheap** = Points vortexproxy.online to Railway
4. **Azure** = Lets Microsoft login work with your domain

---

## 🆘 **If You Get Stuck:**

**GitHub asks for password but doesn't accept it?**
- Need "Personal Access Token" instead
- Go to: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Check "repo" box
- Copy token, use it as password

**Railway says "No repos found"?**
- Click "Connect GitHub" first
- Authorize Railway
- Refresh page

**Domain not working after 1 hour?**
- Check DNS: https://dnschecker.org/#CNAME/vortexproxy.online
- Should show Railway URL

**Railway deployment failed?**
- Click project → "Deployments" tab
- Click latest deployment
- Check logs for error

---

## 🎯 **Summary:**

You're doing 4 things:
1. Put code on GitHub ✅
2. Tell Railway to run it ✅
3. Point your domain to Railway ✅
4. Tell Azure your new domain ✅

Each step is just clicking buttons and copy/pasting!

---

**Start with STEP 1 (GitHub) and work your way down!**

Good luck! 🚀
