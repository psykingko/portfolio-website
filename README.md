# Ashish Singh - Portfolio Website

A modern, high-performance personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features responsive design, animated 3D elements, and a functional contact form.

## Features

- 🎨 Modern design with soft beige background and navy blue accents
- 📱 Fully responsive across desktop, tablet, and mobile
- ✨ Smooth animations with Framer Motion
- 🎯 3D isometric elements and micro-interactions
- 📧 Working contact form with email integration
- ♿ Accessibility compliant (WCAG 2.1 AA)
- 🚀 Optimized for performance (Lighthouse scores ≥80)
- 🔍 SEO-friendly with structured data

## Quick Start

1. **Clone and install dependencies:**

   ```bash
   git clone <repository-url>
   cd portfolio-website
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Environment Configuration

The application requires several environment variables for full functionality. See [ENVIRONMENT.md](./ENVIRONMENT.md) for detailed configuration instructions.

### Required Variables

- `NEXT_PUBLIC_SITE_URL` - Your website URL
- `CONTACT_EMAIL` - Email for receiving contact form submissions

### Optional Variables

- `SENDGRID_API_KEY` - For email sending functionality
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - For Google Analytics
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - For spam protection

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

### Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   ├── ui/            # Reusable UI components
│   └── animations/    # Animation components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # CSS files
└── types/              # TypeScript type definitions
```

### Code Quality

This project uses:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **Jest** for unit testing
- **Playwright** for E2E testing

## Deployment

### 🚀 Quick Deploy to Vercel (5 Minutes)

**Fastest way to get your portfolio live with a free `.vercel.app` domain:**

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Click "Deploy"

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`, `CONTACT_EMAIL`, `RESEND_API_KEY`
   - Redeploy

**📖 Detailed Guides:**

- [⚡ Quick Start (5 min)](./QUICK_START_VERCEL.md)
- [📚 Full Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)
- [✅ Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- [🔧 Environment Variables Setup](./VERCEL_ENV_SETUP.md)

### Other Platforms

The application can also be deployed to:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

See deployment guides for platform-specific instructions.

## Performance

The website is optimized for performance with:

- Code splitting and lazy loading
- Image optimization with Next.js Image component
- Bundle size optimization
- Critical CSS inlining
- Efficient animations with Framer Motion

Target metrics:

- Lighthouse Performance: ≥80
- First Contentful Paint: <1.2s
- Bundle size: <200KB gzipped

## Accessibility

The website follows WCAG 2.1 AA guidelines:

- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Reduced motion support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary. All rights reserved.

## Contact

For questions or support, please contact:

- Email: singhashish9599@gmail.com
- LinkedIn: [Ashish Singh](https://linkedin.com/in/ashish-singh)
- GitHub: [ashish-singh](https://github.com/ashish-singh)
