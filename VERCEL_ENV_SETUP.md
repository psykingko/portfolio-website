# Vercel Environment Variables - Quick Setup

## 🎯 Copy-Paste Ready Values

Add these to Vercel Dashboard → Settings → Environment Variables:

### Variable 1: Site URL

```
Name: NEXT_PUBLIC_SITE_URL
Value: https://your-project-name.vercel.app
Environment: Production, Preview, Development
```

**⚠️ Important**: Replace `your-project-name` with your actual Vercel URL after first deployment.

---

### Variable 2: Site Name

```
Name: NEXT_PUBLIC_SITE_NAME
Value: Ashish Singh - Full Stack & AI Developer
Environment: Production, Preview, Development
```

---

### Variable 3: Contact Email

```
Name: CONTACT_EMAIL
Value: psykingko@gmail.com
Environment: Production, Preview, Development
```

---

### Variable 4: Resend API Key

```
Name: RESEND_API_KEY
Value: re_2yUt75oM_6zGuvU7x3RoaySKUNiixxePB
Environment: Production, Preview, Development
```

---

## 📋 Checklist

- [ ] All 4 variables added to Vercel
- [ ] Each variable set for all environments (Production, Preview, Development)
- [ ] `NEXT_PUBLIC_SITE_URL` updated with actual Vercel URL
- [ ] Project redeployed after adding variables
- [ ] Contact form tested and working

---

## 🔄 Two-Step Deployment Process

### First Deployment (Get Your URL)

1. Add variables 2, 3, 4 (skip variable 1 or use placeholder)
2. Deploy
3. Copy your Vercel URL

### Second Deployment (Update URL)

1. Add/update variable 1 with your actual Vercel URL
2. Redeploy
3. Done! ✅

---

## 🚨 Common Mistakes to Avoid

❌ **Don't** include quotes around values  
✅ **Do** paste values directly

❌ **Don't** add spaces before/after values  
✅ **Do** copy exact values

❌ **Don't** forget to select all environments  
✅ **Do** check Production, Preview, Development

❌ **Don't** forget to redeploy after adding variables  
✅ **Do** trigger a new deployment

---

## 📸 Visual Guide

### Where to Add Variables in Vercel:

1. Go to your project dashboard
2. Click **Settings** (top navigation)
3. Click **Environment Variables** (left sidebar)
4. Click **Add New** button
5. Fill in:
   - **Name**: Variable name (e.g., `NEXT_PUBLIC_SITE_URL`)
   - **Value**: Variable value (paste from above)
   - **Environment**: Check all three boxes
6. Click **Save**
7. Repeat for all 4 variables

### After Adding All Variables:

1. Go to **Deployments** tab
2. Click the three dots (**...**) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

## ✅ Verification

After deployment, verify:

```bash
# Your site should be accessible at:
https://[your-project-name].vercel.app

# Contact form should:
- Accept form submissions
- Send emails to psykingko@gmail.com
- Show success message
```

---

## 🆘 Need Help?

If contact form doesn't work:

1. Check Vercel Function Logs
2. Verify all 4 variables are set
3. Ensure `RESEND_API_KEY` is valid
4. Check `CONTACT_EMAIL` matches Resend account

---

**Quick Access**: [vercel.com/dashboard](https://vercel.com/dashboard)
