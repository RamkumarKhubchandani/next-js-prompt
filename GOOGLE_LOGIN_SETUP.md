# 🔐 GOOGLE LOGIN SETUP GUIDE

## ❌ Current Issue
Google login is not working because you're missing the Google OAuth credentials in your `.env.local` file.

---

## ✅ How to Fix (Step-by-Step)

### **Step 1: Go to Google Cloud Console**
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account

### **Step 2: Create a New Project (or use existing)**
1. Click on the project dropdown (top left)
2. Click "NEW PROJECT"
3. Name it: "Next.js Mentorship Platform" (or any name)
4. Click "CREATE"

### **Step 3: Enable Google+ API**
1. In the search bar, type "Google+ API"
2. Click on "Google+ API"
3. Click "ENABLE"

### **Step 4: Create OAuth Credentials**
1. Go to "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" → "OAuth client ID"
3. If prompted, configure OAuth consent screen first:
   - User Type: **External**
   - App name: **Your Platform Name**
   - User support email: **your email**
   - Developer contact: **your email**
   - Click "SAVE AND CONTINUE"
   - Scopes: Skip (click "SAVE AND CONTINUE")
   - Test users: Skip (click "SAVE AND CONTINUE")
   - Click "BACK TO DASHBOARD"

4. Now create OAuth client ID:
   - Application type: **Web application**
   - Name: **Next.js App**
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://yourdomain.com` (add your production domain later)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google` (add production later)
   - Click "CREATE"

### **Step 5: Copy Credentials**
You'll see a popup with:
- **Client ID**: Something like `123456789-abc123.apps.googleusercontent.com`
- **Client Secret**: Something like `GOCSPX-abc123xyz`

**COPY BOTH!**

### **Step 6: Add to .env.local**
Add these two lines to your `.env.local` file:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

Your complete `.env.local` should look like:

```env
MONGODB_URI=mongodb+srv://ramkumarkhub:ram2411@cluster0.rqvvt.mongodb.net/
NEXTAUTH_SECRET=a8b3d5e8f1a2c3b4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8
NEXTAUTH_URL=http://localhost:3000
EMAIL_USER="infojsprompt@gmail.com"
EMAIL_PASSWORD="Ram@24111991"
ADZUNA_APP_ID="6d6f5ebb"
ADZUNA_APP_KEY="e817de4692539123eb7a16d84cd4d82f"
GEMINI_API_KEY=AIzaSyDXuBqB5S4OMG8Ix9bjh8aoC06YT5eupro
RESEND_API_KEY=re_F6WhAEbi_A2J9BGLZp2sCBxGNX66vRadX
GOOGLE_CLIENT_ID=your-actual-client-id
GOOGLE_CLIENT_SECRET=your-actual-client-secret
```

### **Step 7: Restart Your Dev Server**
```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

---

## 🧪 Test It

1. Go to `http://localhost:3000/login`
2. Click "Continue with Google"
3. Should redirect to Google login
4. After login, redirects back to `/dashboard`

---

## 🚨 Common Issues

### **Issue: "redirect_uri_mismatch"**
**Solution**: Make sure your redirect URI in Google Console exactly matches:
```
http://localhost:3000/api/auth/callback/google
```

### **Issue: "Access blocked: This app's request is invalid"**
**Solution**: 
1. Go back to OAuth consent screen
2. Add your email as a test user
3. Or publish the app (for production)

### **Issue: Still not working**
**Solution**:
1. Check browser console for errors
2. Check terminal/server logs
3. Make sure `.env.local` has no typos
4. Restart dev server

---

## 📝 For Production

When deploying to production:

1. Add production domain to Google Console:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com/api/auth/callback/google`

2. Add to production environment variables:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   GOOGLE_CLIENT_ID=same-as-development
   GOOGLE_CLIENT_SECRET=same-as-development
   ```

---

## ✅ Once Setup is Complete

Google login will work perfectly! Users can:
- Click "Continue with Google"
- Sign in with their Google account
- Auto-create account in your database
- Redirect to dashboard

**No more page refreshes!** 🎉
