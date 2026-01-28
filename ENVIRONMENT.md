# Environment Configuration

This document explains how to configure environment variables for the portfolio website using **FREE services only**.

## Quick Start

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Choose your preferred free email service and fill in the values in `.env.local`

3. For production deployment, set the environment variables in your hosting platform (Vercel, Netlify, etc.)

## Environment Files

- **`.env.local`** - Local development environment (ignored by git)
- **`.env.example`** - Example configuration with placeholder values (committed to git)
- **`.env.production`** - Production configuration template (committed to git, contains no secrets)

## Required Environment Variables

### Site Configuration

| Variable                | Description                    | Required | Default                                      |
| ----------------------- | ------------------------------ | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Full URL of your website       | Yes      | `http://localhost:3000`                      |
| `NEXT_PUBLIC_SITE_NAME` | Site name for SEO and branding | Yes      | `"Ashish Singh - Full Stack & AI Developer"` |
| `CONTACT_EMAIL`         | Your email address             | Yes      | `singhashish9599@gmail.com`                  |

## Free Email Service Options

Choose **ONE** of these free email services for your contact form:

### Option 1: Formspree (Recommended)

- **Free tier**: 50 submissions/month
- **Setup**: Create account at [formspree.io](https://formspree.io)
- **Configuration**:

```bash
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id_here
```

### Option 2: EmailJS

- **Free tier**: 200 emails/month
- **Setup**: Create account at [emailjs.com](https://www.emailjs.com)
- **Configuration**:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Option 3: Netlify Forms

- **Free tier**: 100 submissions/month
- **Setup**: Deploy to Netlify (no additional configuration needed)
- **Configuration**: None required - automatically detected

## Free Hosting Options

### Vercel (Recommended)

- **Free tier**: Unlimited personal projects
- **Features**: Automatic deployments, custom domains, SSL
- **Setup**: Connect your GitHub repository

### Netlify

- **Free tier**: 100GB bandwidth/month
- **Features**: Form handling, custom domains, SSL
- **Setup**: Connect your GitHub repository

## Environment Variable Validation

The application includes built-in validation for environment variables:

- **Client-side validation**: Runs in the browser and validates `NEXT_PUBLIC_*` variables
- **Server-side validation**: Runs on the server and validates server-only variables

Validation errors will be thrown during application startup if required variables are missing.

## Feature Detection

The application automatically detects which email service to use based on available environment variables:

```typescript
const features = {
  formspree: !!NEXT_PUBLIC_FORMSPREE_FORM_ID,
  emailjs: !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY),
  netlifyForms: false, // Detected at build time
};
```

## Security Features

### Built-in Spam Protection

- **Honeypot field**: Hidden field to catch bots
- **Time-based validation**: Minimum time to fill form
- **Rate limiting**: Client-side submission limits
- **Input sanitization**: Removes potentially harmful content

### No Third-party Tracking

- No Google Analytics
- No error tracking services
- No reCAPTCHA
- Privacy-focused approach

## Development Setup

For local development, you can test without any email service:

```bash
# .env.local - Minimal setup
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Ashish Singh - Full Stack & AI Developer"
CONTACT_EMAIL=singhashish9599@gmail.com

# Add one of these for email testing:
# NEXT_PUBLIC_FORMSPREE_FORM_ID=your_test_form_id
```

## Production Deployment

### Vercel Setup

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add your chosen email service variables
   - Deploy

### Netlify Setup

1. Connect your GitHub repository to Netlify
2. If using Netlify Forms, no additional setup needed
3. For other email services, set environment variables in Site Settings

## Troubleshooting

### Contact Form Not Working

1. **Check email service configuration**:
   - Verify your form ID/API keys are correct
   - Check the service dashboard for delivery status

2. **Check browser console**:
   - Look for JavaScript errors
   - Verify network requests are successful

3. **Test with different email services**:
   - Try switching to a different free service
   - Netlify Forms work without any configuration

### Environment Variables Not Loading

1. Ensure `.env.local` exists and has correct syntax
2. Restart the development server after changing variables
3. Check that variable names are spelled correctly
4. Verify `NEXT_PUBLIC_` prefix for client-side variables

### Build Errors

1. Check that all required environment variables are set
2. Run environment validation: `npm run type-check`
3. Ensure no typos in variable names or values

## Cost Breakdown

**Total monthly cost: $0** 🎉

- **Hosting**: Free (Vercel/Netlify)
- **Email service**: Free (Formspree/EmailJS/Netlify Forms)
- **Domain**: Optional (can use free subdomain)
- **SSL**: Free (included with hosting)
- **CDN**: Free (included with hosting)

## Support

If you encounter issues:

1. Check the console for validation errors
2. Verify all required variables are set
3. Test with minimal configuration first
4. Try a different free email service

For more help, create an issue in the project repository with:

- Your environment setup (without sensitive values)
- Error messages
- Steps to reproduce the issue
