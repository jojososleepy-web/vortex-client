# 🚀 DEPLOY VORTEX CLIENT (FREE)

## STEP-BY-STEP DEPLOYMENT TO VERCEL (100% FREE)

### Prerequisites:
- Node.js installed ✅ (you already have this)
- Vercel account (we'll create this - FREE)

---

## 📝 STEP 1: Create Vercel Account

1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"** (easiest option)
   - OR click **"Continue with Email"** if you don't have GitHub
3. Follow the signup steps (all FREE)
4. Verify your email
5. You're in!

---

## 💻 STEP 2: Install Vercel CLI

Open PowerShell (search for PowerShell in Start menu) and run:

```powershell
npm install -g vercel
```

Wait for it to install (takes 1-2 minutes).

---

## 🔐 STEP 3: Login to Vercel

In PowerShell, run:

```powershell
vercel login
```

It will open your browser and ask you to confirm. Click **"Confirm"**.

---

## 🚀 STEP 4: Deploy!

1. In PowerShell, navigate to the vortex-client folder:

```powershell
cd "C:\Users\Mrbea\Downloads\Minecraft client script with HUD features - Claude_files\vortex-client"
```

2. Run the deploy command:

```powershell
vercel
```

3. It will ask you questions:

**Set up and deploy?** → Press **Y** (Yes)

**Which scope?** → Press **Enter** (your account)

**Link to existing project?** → Press **N** (No)

**What's your project's name?** → Type: `vortex-client` → Press **Enter**

**In which directory is your code located?** → Press **Enter** (current directory)

**Want to override the settings?** → Press **N** (No)

4. Wait 30-60 seconds... it will deploy!

5. You'll see a URL like:
```
https://vortex-client-abc123.vercel.app
```

**COPY THIS URL** — that's your website!

---

## 🔧 STEP 5: Setup Environment Variables

After first deploy, you need to add secrets:

```powershell
vercel env add SESSION_SECRET
```
When it asks for the value, paste: `vortex-production-secret-key-change-this-to-random-string`

```powershell
vercel env add MICROSOFT_CLIENT_ID
```
When it asks for the value, paste: `81feaced-5ddd-41e7-8bef-3e20a2689bb7`

Then redeploy:
```powershell
vercel --prod
```

---

## ✅ DONE!

Your Vortex Client is now LIVE at:
**https://vortex-client-[your-id].vercel.app**

Anyone can visit it!

---

## 🔄 To Update Later

Whenever you make changes:

```powershell
cd "C:\Users\Mrbea\Downloads\Minecraft client script with HUD features - Claude_files\vortex-client"
vercel --prod
```

It will redeploy with your changes!

---

## 💰 Cost: $0 FOREVER

Vercel's free tier includes:
- ✅ Unlimited websites
- ✅ HTTPS (secure)
- ✅ Fast global CDN
- ✅ 100GB bandwidth/month (more than enough)
- ✅ No credit card required

---

## 🎮 What About the Minecraft Hacks?

The behavior pack (actual hacks) is still installed locally on your device:
- Copy `bedrock_pack` to Minecraft
- Use `/.` commands in-game
- Works 100% offline

The website is just for viewing features and creating accounts!

---

## 📝 NOTES:

- The Demo Login will work instantly
- For real Microsoft login, you need to add your production URL to Azure (see SETUP.md)
- Your website will be at: `https://vortex-client-[random].vercel.app`
- You can add a custom domain later ($10-15/year)
