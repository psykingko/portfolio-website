# Vercel Deployment Guide

Complete guide to deploy your portfolio website on Vercel with a free `.vercel.app` domain.

## 📋 Prerequisites

- [x] GitHub account
- [x] Vercel account (sign up at [vercel.com](https://vercel.com))
- [x] Resend API key (for contact form emails)
- [x] Portfolio code pushed to GitHub repository

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
cd portfolio-website
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your portfolio repository
5. Click **"Import"**

### Step 3: Configure Project Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (or leave blank)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variables

**CRITICAL**: Before deploying, add these environment variables:

1. In Vercel project settings, go to **Settings → Environment Variables**
2. Add the following variables:

| Variable Name           | Value                                      | Environment                      |
| ----------------------- | ------------------------------------------ | -------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | `https://your-project.vercel.app`          | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_NAME` | `Ashish Singh - Full Stack & AI Developer` | Production, Preview, Development |
| `CONTACT_EMAIL`         | `psykingko@gmail.com`                      | Production, Preview, Development |
| `RESEND_API_KEY`        | `re_2yUt75oM_6zGuvU7x3RoaySKUNiixxePB`     | Production, Preview, Development |

**Note**: For `NEXT_PUBLIC_SITE_URL`, you'll need to:

- First deploy without it (or use a placeholder)
- Copy your actual Vercel URL (e.g., `https://ashish-portfolio.vercel.app`)
- Update the environment variable
- Redeploy

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. Your site will be live at `https://[your-project-name].vercel.app`

### Step 6: Update Site URL

After first deployment:

1. Copy your Vercel URL (e.g., `https://ashish-portfolio-xyz123.vercel.app`)
2. Go to **Settings → Environment Variables**
3. Edit `NEXT_PUBLIC_SITE_URL` and paste your actual URL
4. Go to **Deployments** tab
5. Click the three dots on the latest deployment → **Redeploy**

## 🎯 Your Free Vercel Domain

Vercel provides a free domain in this format:

```
https://[project-name]-[random-string].vercel.app
```

Example:

```
https://ashish-portfolio-abc123xyz.vercel.app
```

You can customize the project name in **Settings → General → Project Name**.

## 📧 Contact Form Setup

Your contact form will work automatically with Resend:

1. Emails will be sent to: `psykingko@gmail.com`
2. Free tier limits:
   - 3,000 emails/month
   - 100 emails/day
3. Test the form after deployment to ensure it works

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

## 🛠️ Common Issues & Solutions

### Issue 1: Environment Variables Not Working

**Solution**:

- Ensure variables are added to all environments (Production, Preview, Development)
- Redeploy after adding/updating variables
- Check variable names match exactly (case-sensitive)

### Issue 2: Contact Form Not Sending Emails

**Solution**:

- Verify `RESEND_API_KEY` is correct
- Check `CONTACT_EMAIL` matches your Resend verified domain
- Look at Vercel Function Logs for errors

### Issue 3: Build Fails

**Solution**:

```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run type-check

# Fix any errors before pushing
```

### Issue 4: Images Not Loading

**Solution**:

- Ensure images are in `public/` folder
- Use relative paths: `/image.jpg` not `./image.jpg`
- Check image file names match exactly (case-sensitive)

## 📊 Monitoring Your Site

### View Deployment Logs

1. Go to Vercel Dashboard
2. Click your project
3. Go to **Deployments** tab
4. Click any deployment to see logs

### View Function Logs (Contact Form)

1. Go to your project in Vercel
2. Click **Functions** tab
3. Click on `/api/contact`
4. View real-time logs

### Analytics (Optional)

Vercel provides free analytics:

1. Go to **Analytics** tab
2. View page views, visitors, performance

## 🎨 Custom Domain (Optional - Future)

If you decide to buy a domain later:

1. Go to **Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_SITE_URL` environment variable

## 🔐 Security Best Practices

- ✅ Never commit `.env.local` to GitHub (already in `.gitignore`)
- ✅ Use Vercel Environment Variables for secrets
- ✅ Rotate API keys if exposed
- ✅ Enable Vercel's security features in settings

## 📱 Testing Your Deployment

After deployment, test these features:

- [ ] Homepage loads correctly
- [ ] All sections scroll smoothly
- [ ] Navigation works
- [ ] Projects display with images
- [ ] Contact form submits successfully
- [ ] Contact form sends email
- [ ] Mobile responsive design works
- [ ] Animations play smoothly
- [ ] Resume download works

## 🚀 Performance Optimization

Vercel automatically provides:

- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Edge caching
- ✅ Compression (gzip/brotli)

## 📞 Support

If you encounter issues:

1. **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
2. **Vercel Support**: [vercel.com/support](https://vercel.com/support)
3. **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## 🎉 You're Live!

Once deployed, share your portfolio:

- LinkedIn profile
- GitHub README
- Resume
- Email signature
- Social media

---

**Your Portfolio URL**: `https://[your-project-name].vercel.app`

**Deployment Status**: Check at [vercel.com/dashboard](https://vercel.com/dashboard)
