# ⚡ Quick Start: Deploy to Vercel in 5 Minutes

The fastest way to get your portfolio live on Vercel.

## 🎯 What You'll Get

- Free hosting at `https://your-project.vercel.app`
- Automatic HTTPS
- Global CDN
- Contact form that sends emails
- Automatic deployments on git push

## 🚀 5-Minute Deployment

### Step 1: Push to GitHub (1 min)

```bash
cd portfolio-website
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel (2 min)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Click **"Deploy"** (don't add env vars yet)
5. Wait for deployment (~2 min)
6. **Copy your Vercel URL** (e.g., `https://ashish-portfolio-abc123.vercel.app`)

### Step 3: Add Environment Variables (2 min)

1. Go to **Settings → Environment Variables**
2. Add these 4 variables (copy-paste ready):

```
NEXT_PUBLIC_SITE_URL
https://[paste-your-vercel-url-here].vercel.app

NEXT_PUBLIC_SITE_NAME
Ashish Singh - Full Stack & AI Developer

CONTACT_EMAIL
psykingko@gmail.com

RESEND_API_KEY
re_2yUt75oM_6zGuvU7x3RoaySKUNiixxePB
```

3. For each variable, check: ☑️ Production ☑️ Preview ☑️ Development
4. Click **Save** for each

### Step 4: Redeploy (30 sec)

1. Go to **Deployments** tab
2. Click **...** on latest deployment
3. Click **Redeploy**
4. Wait 1-2 minutes

### Step 5: Test (30 sec)

Visit your site and test:

- ✅ Site loads
- ✅ Contact form works
- ✅ Check email for test message

## ✅ Done!

Your portfolio is now live at: `https://your-project.vercel.app`

---

## 🎨 Customize Your URL (Optional)

Want a better URL? Change project name:

1. Go to **Settings → General**
2. Change **Project Name** to something like:
   - `ashish-portfolio`
   - `ashish-singh-dev`
   - `ashish-fullstack`
3. Your new URL: `https://[new-name].vercel.app`

---

## 🔄 Future Updates

Every time you push to GitHub, Vercel automatically deploys:

```bash
# Make changes
git add .
git commit -m "Update projects"
git push

# Vercel deploys automatically! 🎉
```

---

## 📧 Contact Form Setup

Your contact form is already configured:

- Emails go to: `psykingko@gmail.com`
- Uses Resend API (free tier)
- 3,000 emails/month limit

---

## 🆘 Troubleshooting

### Build Failed?

```bash
# Test locally first
npm run build

# If it works locally, check Vercel logs
```

### Contact Form Not Working?

1. Check all 4 environment variables are added
2. Verify `RESEND_API_KEY` is correct
3. Check Vercel Function Logs

### Need More Help?

- 📖 [Full Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)
- ✅ [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- 🔧 [Environment Variables Guide](./VERCEL_ENV_SETUP.md)

---

## 🎉 Share Your Portfolio

- LinkedIn: Add to profile
- GitHub: Add to README
- Resume: Include URL
- Email: Add to signature

---

**Your Live Site**: `https://[your-project-name].vercel.app`

**Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)

**Deployment Time**: ~5 minutes ⚡
