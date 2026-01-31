# 🚀 Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## ✅ Pre-Deployment Checklist

### Code Quality

- [ ] Run `npm run build` locally - builds successfully
- [ ] Run `npm run lint` - no errors
- [ ] Test all pages locally at `http://localhost:3000`
- [ ] Test contact form locally
- [ ] Check all images load correctly
- [ ] Verify resume PDF is in `/public` folder

### Content Review

- [ ] Personal information is correct (name, email, phone)
- [ ] All project descriptions are accurate
- [ ] Skills list is up to date
- [ ] Social media links work (LinkedIn, GitHub)
- [ ] Resume PDF is current version
- [ ] About section reflects latest experience

### Git Repository

- [ ] All changes committed
- [ ] Pushed to GitHub main branch
- [ ] `.env.local` is NOT committed (check `.gitignore`)
- [ ] Repository is public or accessible to Vercel

## 🔧 Vercel Setup Checklist

### Account & Project

- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Repository imported to Vercel
- [ ] Project name is meaningful (e.g., `ashish-portfolio`)

### Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_SITE_URL` (update after first deploy)
- [ ] `NEXT_PUBLIC_SITE_NAME`
- [ ] `CONTACT_EMAIL`
- [ ] `RESEND_API_KEY`
- [ ] All variables set for: Production, Preview, Development

### Build Settings

- [ ] Framework: Next.js (auto-detected)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`
- [ ] Node.js Version: 18.x or higher

## 🚀 Deployment Steps

### First Deployment

1. [ ] Click "Deploy" in Vercel
2. [ ] Wait for build to complete (2-3 minutes)
3. [ ] Check for build errors in logs
4. [ ] Copy your Vercel URL (e.g., `https://ashish-portfolio-xyz.vercel.app`)

### Update Site URL

5. [ ] Go to Settings → Environment Variables
6. [ ] Update `NEXT_PUBLIC_SITE_URL` with actual Vercel URL
7. [ ] Go to Deployments tab
8. [ ] Redeploy latest deployment

### Verify Deployment

9. [ ] Visit your Vercel URL
10. [ ] Check all sections load
11. [ ] Test navigation
12. [ ] Test contact form submission
13. [ ] Verify email is received at `psykingko@gmail.com`

## 🧪 Post-Deployment Testing

### Functionality Tests

- [ ] Homepage loads without errors
- [ ] All sections visible (Hero, About, Skills, Projects, Contact)
- [ ] Smooth scrolling works
- [ ] Navigation menu works (desktop & mobile)
- [ ] Mobile menu opens/closes
- [ ] Project cards display correctly
- [ ] Project images load
- [ ] Skill icons display
- [ ] Contact form accepts input
- [ ] Contact form validates fields
- [ ] Contact form submits successfully
- [ ] Success message appears after submission
- [ ] Email received at contact email
- [ ] Resume download works

### Visual Tests

- [ ] Playful backgrounds visible (blobs, patterns)
- [ ] Sketch underlines animate
- [ ] Hover effects work on cards
- [ ] Skill icons wiggle on hover
- [ ] Animations are smooth
- [ ] No layout shifts
- [ ] Colors match design
- [ ] Typography looks good

### Responsive Tests

- [ ] Desktop (1920px) - looks good
- [ ] Laptop (1440px) - looks good
- [ ] Tablet (768px) - looks good
- [ ] Mobile (375px) - looks good
- [ ] Mobile menu works
- [ ] Touch interactions work

### Performance Tests

- [ ] Page loads in < 3 seconds
- [ ] Images load quickly
- [ ] No console errors
- [ ] Lighthouse score > 90

### Browser Tests

- [ ] Chrome - works
- [ ] Firefox - works
- [ ] Safari - works
- [ ] Edge - works
- [ ] Mobile Safari - works
- [ ] Mobile Chrome - works

## 🔍 Troubleshooting

### If Build Fails

```bash
# Test locally first
npm run build

# Check for errors
npm run lint

# Fix errors and push again
git add .
git commit -m "Fix build errors"
git push
```

### If Contact Form Doesn't Work

1. Check Vercel Function Logs
2. Verify `RESEND_API_KEY` is correct
3. Verify `CONTACT_EMAIL` is correct
4. Check Resend dashboard for errors
5. Ensure email is verified in Resend

### If Images Don't Load

1. Check images are in `/public` folder
2. Verify image paths start with `/` (e.g., `/projects/image.jpg`)
3. Check image file names match exactly (case-sensitive)
4. Clear browser cache and reload

### If Environment Variables Don't Work

1. Verify all variables are added
2. Check variable names match exactly
3. Ensure all environments are selected
4. Redeploy after adding variables

## 📊 Monitoring

### Regular Checks

- [ ] Check Vercel Analytics weekly
- [ ] Monitor contact form submissions
- [ ] Review Function Logs for errors
- [ ] Check uptime status

### Monthly Tasks

- [ ] Update projects section with new work
- [ ] Refresh skills if learned new technologies
- [ ] Update resume PDF
- [ ] Review and respond to contact form messages

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ Site is live at your Vercel URL
- ✅ All pages load without errors
- ✅ Contact form sends emails
- ✅ Mobile responsive works
- ✅ Performance is good (Lighthouse > 90)
- ✅ No console errors

## 📱 Share Your Portfolio

Once deployed, share your portfolio:

- [ ] Update LinkedIn profile with portfolio URL
- [ ] Add to GitHub profile README
- [ ] Include in resume
- [ ] Add to email signature
- [ ] Share on Twitter/X
- [ ] Share on relevant communities

---

## 🆘 Need Help?

**Vercel Docs**: https://vercel.com/docs  
**Vercel Support**: https://vercel.com/support  
**Next.js Docs**: https://nextjs.org/docs

---

**Your Vercel URL**: `https://[your-project-name].vercel.app`

**Last Updated**: January 2026
