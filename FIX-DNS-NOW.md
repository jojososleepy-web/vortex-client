# 🔧 Fix DNS for vortexproxy.online

Your domain is pointing to Namecheap parking page instead of your server!

---

## ✅ What to Change in Namecheap:

### **Go to Namecheap DNS Settings:**

1. **Open:** https://ap.www.namecheap.com/domains/list/
2. **Click:** "Manage" next to vortexproxy.online
3. **Click:** "Advanced DNS" tab

---

### **Current Settings (WRONG):**

You probably see something like:
```
Type: A Record
Host: @
Value: 162.255.119.209 (Namecheap parking)
```

---

### **Change To (CORRECT):**

**DELETE all existing records, then add these 2:**

**Record 1 - Main domain:**
```
Type: CNAME Record
Host: @
Value: vortexproxy.loca.lt
TTL: Automatic
```

**Record 2 - www subdomain:**
```
Type: CNAME Record
Host: www  
Value: vortexproxy.loca.lt
TTL: Automatic
```

---

### **Step-by-Step:**

1. **Delete existing records:**
   - Click 🗑️ trash icon next to each A Record or CNAME
   - Delete ALL of them

2. **Add Record 1:**
   - Click "+ Add New Record"
   - Type: Select "CNAME Record"
   - Host: Type `@`
   - Value: Type `vortexproxy.loca.lt`
   - TTL: Leave as "Automatic"
   - Click checkmark ✓

3. **Add Record 2:**
   - Click "+ Add New Record" again
   - Type: Select "CNAME Record"
   - Host: Type `www`
   - Value: Type `vortexproxy.loca.lt`
   - TTL: Leave as "Automatic"
   - Click checkmark ✓

4. **Save:**
   - Click green ✓ "Save All Changes" button (top right)

---

## ⏰ Wait Time:

- **Minimum:** 10 minutes
- **Usually:** 30 minutes
- **Maximum:** 2 hours

---

## 🧪 Test If It's Working:

**After 15 minutes, visit:**
- https://vortexproxy.online

**You should see:**
- Your Vortex Client homepage! 🎉

**If you see:**
- "Namecheap parking page" = DNS not updated yet, wait longer
- "Cannot connect" = Check if server/tunnel still running
- "503 error" = Tunnel disconnected, restart it

---

## 🔄 Restart Tunnel If Needed:

If tunnel stopped, run in PowerShell:
```powershell
cd "c:\Users\Mrbea\Downloads\Minecraft client script with HUD features - Claude_files\vortex-client"
npx localtunnel --port 3000 --subdomain vortexproxy
```

---

## ✅ Checklist:

- [ ] Delete old A/CNAME records in Namecheap
- [ ] Add CNAME @ → vortexproxy.loca.lt
- [ ] Add CNAME www → vortexproxy.loca.lt  
- [ ] Click "Save All Changes"
- [ ] Wait 15-30 minutes
- [ ] Visit https://vortexproxy.online
- [ ] Update Azure redirect URI

---

**Do this now!** Then wait and your domain will work! 🚀
