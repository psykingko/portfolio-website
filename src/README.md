# Portfolio Website Source Structure

This document outlines the folder structure and organization of the portfolio website source code.

## Directory Structure

```
src/
├── app/                    # Next.js App Router files
│   ├── favicon.ico        # Site favicon
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── components/            # React components
│   ├── layout/           # Layout-related components
│   │   ├── Header.tsx    # Site header with navigation
│   │   └── Navigation.tsx # Navigation component (includes mobile menu)
│   ├── sections/         # Page section components
│   │   ├── HeroSection.tsx        # Hero section with intro and 3D elements
│   │   ├── AboutSection.tsx       # About/summary section
│   │   ├── SkillsSection.tsx      # Technical skills showcase
│   │   ├── ProjectsSection.tsx    # Projects portfolio
│   │   └── ContactSection.tsx     # Contact form and social links
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx    # Button component with variants
│   │   ├── Card.tsx      # Card component for content containers
│   │   ├── Badge.tsx     # Badge component for skills/tags
│   │   ├── Modal.tsx     # Modal component for overlays
│   │   └── LoadingSpinner.tsx # Loading spinner component
│   ├── animations/       # Animation-specific components
│   │   ├── IsometricScene.tsx     # 3D isometric scene for hero
│   │   ├── FloatingElements.tsx   # Floating animation elements
│   │   └── ScrollReveal.tsx       # Scroll-triggered animations
│   └── index.ts          # Component exports
├── hooks/                # Custom React hooks
│   ├── useScrollAnimation.ts  # Hook for scroll-based animations
│   ├── useReducedMotion.ts    # Hook for motion preferences
│   ├── useContactForm.ts      # Hook for contact form logic
│   └── index.ts              # Hook exports
├── styles/               # Styling files
│   ├── globals.css       # Global styles (moved from app/)
│   └── components.css    # Component-specific styles
├── types/                # TypeScript type definitions
│   └── css.d.ts         # CSS module type definitions
├── utils/                # Utility functions and constants
│   ├── constants.ts      # Application constants
│   ├── animations.ts     # Animation utilities and variants
│   ├── seo.ts           # SEO utilities and meta tag generation
│   └── index.ts         # Utility exports
└── README.md            # This documentation file
```

## Component Architecture

### Layout Components

- **Header**: Main site header with navigation
- **Navigation**: Responsive navigation with hamburger menu for mobile

### Section Components

Each major page section is a separate component for better organization:

- **HeroSection**: Split layout with introduction text and 3D isometric scene
- **AboutSection**: Professional summary and contact information
- **SkillsSection**: Technical skills organized by category with interactive badges
- **ProjectsSection**: Featured projects with case studies and links
- **ContactSection**: Contact form and social media links

### UI Components

Reusable components following a consistent design system:

- **Button**: Configurable button with multiple variants and sizes
- **Card**: Container component for content sections
- **Badge**: Small labels for skills, tags, and categories
- **Modal**: Overlay component for expanded content
- **LoadingSpinner**: Loading indicator with size variants

### Animation Components

Specialized components for visual effects:

- **IsometricScene**: SVG-based 3D isometric elements for the hero section
- **FloatingElements**: Animated floating elements with parallax effects
- **ScrollReveal**: Wrapper for scroll-triggered reveal animations

## Custom Hooks

- **useScrollAnimation**: Manages scroll-based animations with Intersection Observer
- **useReducedMotion**: Respects user's motion preferences for accessibility
- **useContactForm**: Handles contact form state, validation, and submission

## Utilities

- **constants.ts**: Application-wide constants and configuration
- **animations.ts**: Framer Motion animation variants and utilities
- **seo.ts**: SEO configuration, meta tag generation, and structured data

## Styling Strategy

- **globals.css**: Global styles, CSS custom properties, and base styles
- **components.css**: Component-specific styles and utilities
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **CSS Custom Properties**: For theme management and consistent design tokens

## Import Strategy

Each directory includes an `index.ts` file for clean imports:

```typescript
// Instead of multiple imports
import Header from "./components/layout/Header";

// Use barrel exports
import { Header } from "./components";
```

## Development Guidelines

1. **Component Organization**: Keep components focused and single-responsibility
2. **Type Safety**: Use TypeScript interfaces for all component props
3. **Accessibility**: Include proper ARIA labels and semantic HTML
4. **Performance**: Lazy load non-critical components and optimize images
5. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
6. **Animation**: Respect `prefers-reduced-motion` for accessibility

## Next Steps

This folder structure provides the foundation for implementing the portfolio website according to the design document. Each component includes placeholder implementations that will be developed in subsequent phases of the project.
