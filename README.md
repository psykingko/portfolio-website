# Ashish Singh - Portfolio Website

A modern, high-performance personal portfolio website built with Next.js 16, TypeScript, and Tailwind CSS 4. Features responsive design, smooth animations, 3D isometric elements, and a functional contact form.

## ✨ Features

- 🎨 **Modern Design** - Soft beige background with navy blue accents and playful micro-interactions
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ✨ **Smooth Animations** - Powered by Framer Motion for delightful user experience
- 🎯 **3D Isometric Elements** - Interactive geometric shapes and visual effects
- 📧 **Contact Form** - Integrated with EmailJS for direct communication
- ♿ **Accessibility Compliant** - WCAG 2.1 AA standards with keyboard navigation
- 🚀 **Performance Optimized** - Fast loading times and efficient rendering
- 🔍 **SEO-Friendly** - Proper meta tags and structured data
- 🎭 **Dark Mode Ready** - Theme color support for modern browsers

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values:

   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=Ashish Singh Portfolio
   CONTACT_EMAIL=your-email@example.com

   # EmailJS Configuration (for contact form)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📁 Project Structure

```
portfolio-website/
├── public/                      # Static assets
│   ├── favicon/                # Favicon files
│   ├── projects/               # Project images
│   └── Ashish_singh_resume.pdf
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── animations/        # Animation components
│   │   │   ├── IsometricScene.tsx
│   │   │   └── SectionDivider.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LayoutClient.tsx
│   │   ├── sections/          # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── data/                  # Static data
│   │   └── projects.ts
│   ├── hooks/                 # Custom React hooks
│   │   └── useScrollProgress.ts
│   ├── schemas/               # Zod validation schemas
│   │   └── contact.ts
│   ├── styles/                # Additional styles
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions
│       └── constants.ts
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables (gitignored)
├── .gitignore
├── .prettierrc                # Prettier configuration
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── package.json
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── vercel.json                # Vercel deployment config
```

## �️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint and auto-fix issues
npm run lint:check       # Check for linting errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # Run TypeScript type checking

# Validation
npm run validate-env     # Validate environment variables
```

## 🎨 Tech Stack

### Core

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework

### UI & Animations

- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Lint-staged** - Pre-commit linting

### Services

- **EmailJS** - Contact form email delivery
- **Vercel** - Hosting and deployment

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Click "Deploy"

3. **Add Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Redeploy if needed

### Other Platforms

The application can be deployed to:

- **Netlify** - Similar to Vercel
- **AWS Amplify** - AWS hosting
- **Railway** - Container-based hosting
- **DigitalOcean App Platform** - Managed hosting

## 📧 Contact Form Setup

The contact form uses EmailJS for email delivery. To set it up:

1. **Create an EmailJS account** at [emailjs.com](https://www.emailjs.com/)

2. **Create an email service** (Gmail, Outlook, etc.)

3. **Create an email template** with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content

4. **Get your credentials:**
   - Service ID
   - Template ID
   - Public Key

5. **Add to `.env.local`:**
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## 🎯 Key Sections

### Hero Section

- Animated introduction with name and title
- Call-to-action buttons (View Projects, Contact)
- 3D isometric scene with floating geometric shapes

### About Section

- Professional summary
- Background and expertise
- Animated section dividers

### Skills Section

- Technical skills organized by category
- Frontend, Backend, AI/ML, and Tools
- Interactive skill cards with hover effects

### Projects Section

- Featured projects with images
- Project descriptions and tech stacks
- Links to live demos and GitHub repositories

### Contact Section

- Contact form with validation
- Email and social media links
- Form submission with EmailJS integration

## 🎨 Design System

### Colors

- **Primary**: Navy Blue (#1b2651)
- **Secondary**: Soft Beige (#f5f1e8)
- **Accent**: Coral (#ff6b6b)
- **Text**: Dark Gray (#2d3748)

### Typography

- **Headings**: Geist Sans
- **Body**: Geist Sans
- **Code**: Geist Mono

### Spacing

- Consistent spacing scale (4px base unit)
- Responsive padding and margins
- Section spacing optimized for readability

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Skip to main content link
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Reduced motion support

## 🚀 Performance

- Code splitting and lazy loading
- Image optimization with Next.js Image
- Efficient animations with Framer Motion
- Minimal bundle size
- Fast page loads

## 🔧 Customization

### Update Personal Information

1. **Edit constants:**

   ```typescript
   // src/utils/constants.ts
   export const SITE_CONFIG = {
     name: "Your Name",
     title: "Your Title",
     email: "your-email@example.com",
     // ...
   };
   ```

2. **Update projects:**

   ```typescript
   // src/data/projects.ts
   export const projects = [
     {
       title: "Project Name",
       description: "Project description",
       // ...
     },
   ];
   ```

3. **Replace images:**
   - Add project images to `public/projects/`
   - Update resume PDF in `public/`
   - Update favicon in `public/favicon/`

### Modify Styling

- Edit `tailwind.config.ts` for theme customization
- Modify `src/app/globals.css` for global styles
- Update component styles in respective files

## 📝 License

This project is private and proprietary. All rights reserved.

## 👤 Contact

**Ashish Singh**

- Email: singhashish9599@gmail.com
- LinkedIn: [linkedin.com/in/ashish-singh](https://linkedin.com/in/ashish-singh)
- GitHub: [github.com/ashish-singh](https://github.com/ashish-singh)

---

Built with ❤️ using Next.js and TypeScript
