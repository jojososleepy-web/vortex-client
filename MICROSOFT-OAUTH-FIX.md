# 🔧 Microsoft OAuth Login Fix Guide

Your Microsoft login isn't working because the Azure app needs proper configuration. Follow these steps exactly.

---

## 🚨 Current Issue

Your Azure app `63f94002-a99a-4fee-b1fb-a2920b141548` is configured, but Microsoft OAuth requires:
1. ✅ Redirect URI (you already added this)
2. ❌ **API Permissions** (likely missing)
3. ❌ **Tokens enabled** (likely missing)

---

## ✅ Fix Microsoft Login (5 minutes)

### Step 1: Go to Your Azure App
1. Open: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/63f94002-a99a-4fee-b1fb-a2920b141548
2. You should see "Vortex Client" or your app name

### Step 2: Enable ID Tokens
1. Click **Authentication** (left sidebar)
2. Scroll down to **Implicit grant and hybrid flows**
3. ✅ Check **ID tokens (used for implicit and hybrid flows)**
4. Click **Save** at the top

### Step 3: Add API Permissions
1. Click **API permissions** (left sidebar)
2. Click **+ Add a permission**
3. Select **Microsoft Graph**
4. Select **Delegated permissions**
5. Search and check these permissions:
   - ✅ `openid`
   - ✅ `profile`
   - ✅ `email`
   - ✅ `User.Read`
   - ✅ `XboxLive.signin` (optional, for Xbox gamertags)
6. Click **Add permissions**
7. Click **✓ Grant admin consent for...** (blue button at top)
8. Click **Yes** to confirm

### Step 4: Verify Redirect URI
1. Still in **Authentication** page
2. Under **Platform configurations** → **Web**
3. Make sure this URI is listed:
   ```
   https://devourer-ceremony-lion.ngrok-free.dev/auth/callback
   ```
4. If not, click **Add URI** and paste it
5. Click **Save**

### Step 5: Test Login
1. Go to your website: https://devourer-ceremony-lion.ngrok-free.dev
2. Click **Login with Microsoft**
3. It should now work! ✅

---

## 🔍 Troubleshooting

### Error: "The client does not exist or is not enabled for consumers"
**Solution:** Your app is set to "Single tenant" instead of "Multitenant + Personal accounts"
- You already have the right app: `63f94002-a99a-4fee-b1fb-a2920b141548`
- This is set to "Any Entra ID Tenant + Personal Microsoft accounts" ✅

### Error: "invalid_request: The provided value for redirect_uri is not valid"
**Solution:** Redirect URI not registered
1. Go to **Authentication** in Azure
2. Add this exact URI: `https://devourer-ceremony-lion.ngrok-free.dev/auth/callback`
3. Make sure there's no extra `/` at the end
4. Click **Save**

### Error: "AADSTS65001: The user or administrator has not consented"
**Solution:** Missing API permissions
- Follow **Step 3** above to add permissions
- Click **Grant admin consent**

### Error: "interaction_required" or "AADSTS16000"
**Solution:** ID tokens not enabled
- Follow **Step 2** above
- Check "ID tokens" box and save

### Login button doesn't do anything
**Solution:** Check browser console for errors
1. Press F12 (Developer Tools)
2. Go to Console tab
3. Click login button
4. Share any red error messages

---

## 📋 Quick Checklist

In Azure Portal, verify your app has:
- ✅ Supported account types: **Multitenant + Personal accounts**
- ✅ Redirect URI: `https://devourer-ceremony-lion.ngrok-free.dev/auth/callback`
- ✅ ID tokens enabled (Authentication → Implicit grant)
- ✅ API permissions: `openid`, `profile`, `email`, `User.Read`
- ✅ Admin consent granted (green checkmark in API permissions)

---

## 🎮 Why Connect Microsoft Account?

Your users connect their Microsoft/Xbox accounts so:
1. **Xbox Gamertag** shows in their profile
2. **Cross-platform sync** (if you add a database)
3. **Xbox Live features** (friends, achievements)
4. **Verified identity** for premium purchases

---

## 🔗 Important Links

- Your Azure App: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/63f94002-a99a-4fee-b1fb-a2920b141548
- All Your Apps: https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps
- Azure Authentication Docs: https://learn.microsoft.com/en-us/azure/active-directory/develop/

---

## 🆘 Still Not Working?

Try **Demo Login** instead:
1. Go to your website
2. Click **Try Demo Mode** button
3. You can test all features without Microsoft login

Or check the server logs:
```bash
# View server output
cd vortex-client
npm start
```

Look for errors like:
- `OAuth error:...`
- `Token exchange error:...`
- `OAuth callback error:...`

Share these errors for more specific help!

---

## ⚠️ Important Notes

1. **ngrok URL changes** every time you restart ngrok
   - Current: `https://devourer-ceremony-lion.ngrok-free.dev`
   - If you restart ngrok, update redirect URI in Azure

2. **Free ngrok limitations**
   - URL changes on restart
   - Consider paid ngrok ($8/month) for static domain

3. **Production deployment**
   - Use a real domain (not ngrok)
   - Update redirect URI in Azure
   - Update `.env` with your domain

---

That's it! Follow steps 1-5 and Microsoft login will work. 🎉
