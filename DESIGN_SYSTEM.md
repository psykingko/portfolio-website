# Design System Documentation

This document outlines the custom design tokens and configuration for the portfolio website.

## Overview

The design system is built using Tailwind CSS v4 with custom design tokens defined in CSS custom properties. This approach provides:

- Consistent design language across the application
- Easy theme customization and maintenance
- Type-safe access to design tokens in TypeScript
- Responsive design with fluid typography and spacing
- Accessibility compliance with proper contrast ratios

## Color Palette

### Primary Colors

- **Primary**: `#1b2651` - Dark navy for primary actions and branding
- **Primary Light**: `#2d3a6b` - Lighter variant for hover states
- **Primary Dark**: `#0f1a3d` - Darker variant for active states

### Background Colors

- **Beige**: `#edeae1` - Main background color for the site
- **White**: `#ffffff` - Card backgrounds and content areas
- **Card**: `#ffffff` - Specific card background color

### Accent Colors

- **Red**: `#cd2028` - Bright red for highlights and CTAs
- **Teal**: `#166c96` - Teal blue for secondary accents

### Text Colors

- **Primary**: `#1a1a1a` - Main text color
- **Secondary**: `#666666` - Secondary text and descriptions
- **Light**: `#ffffff` - Text on dark backgrounds

## Typography

### Font Families

- **Sans**: Inter, system-ui, -apple-system, sans-serif
- **Display**: Poppins, Inter, system-ui, -apple-system, sans-serif

### Responsive Typography Scale

The typography system uses `clamp()` functions for fluid, responsive sizing across all text elements:

#### Heading Sizes

- **Heading XL**: `clamp(3rem, 8vw, 5rem)` - Hero headings (48px - 80px)
- **Heading LG**: `clamp(2rem, 5vw, 3rem)` - Section headings (32px - 48px)
- **Heading MD**: `clamp(1.5rem, 4vw, 2rem)` - Subsection headings (24px - 32px)
- **Heading SM**: `clamp(1.25rem, 3vw, 1.5rem)` - Card headings (20px - 24px)

#### Body Text Sizes

- **Body XL**: `clamp(1.125rem, 3vw, 1.25rem)` - Lead paragraphs (18px - 20px)
- **Body LG**: `clamp(1rem, 2.5vw, 1.125rem)` - Large body text (16px - 18px)
- **Body MD**: `clamp(0.875rem, 2.5vw, 1rem)` - Standard body text (14px - 16px)
- **Body SM**: `clamp(0.75rem, 2vw, 0.875rem)` - Small text (12px - 14px)
- **Body XS**: `clamp(0.625rem, 1.5vw, 0.75rem)` - Captions (10px - 12px)

#### Display Text Sizes

- **Display XL**: `clamp(4.5rem, 10vw, 6rem)` - Massive display text (72px - 96px)
- **Display LG**: `clamp(3rem, 7vw, 3.75rem)` - Large display text (48px - 60px)
- **Display MD**: `clamp(1.875rem, 5vw, 2.25rem)` - Medium display text (30px - 36px)

#### Special Text Styles

- **Lead Text**: `clamp(1.125rem, 3.5vw, 1.25rem)` - Introductory paragraphs
- **Caption Text**: `clamp(0.625rem, 1.5vw, 0.75rem)` - Labels and captions

### Font Weights

- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

## Spacing System

### Base Spacing Scale

Uses a consistent 0.25rem (4px) base unit:

- 1 = 0.25rem (4px)
- 2 = 0.5rem (8px)
- 4 = 1rem (16px)
- 8 = 2rem (32px)
- 16 = 4rem (64px)

### Responsive Spacing

- **Section Padding**: `clamp(4rem, 8vw, 8rem)` - Vertical section spacing
- **Section Gap**: `clamp(2rem, 4vw, 4rem)` - Gap between section elements

## Shadows

### Standard Shadows

- **Soft**: `0 4px 20px rgba(86, 52, 214, 0.1)` - Subtle element elevation
- **Card**: `0 8px 32px rgba(0, 0, 0, 0.08)` - Card component shadows
- **Hover**: `0 12px 40px rgba(86, 52, 214, 0.15)` - Hover state shadows

## Border Radius

- **Card**: `1.5rem (24px)` - Rounded corners for cards
- **Button**: `0.5rem (8px)` - Button border radius
- **Badge**: `9999px` - Fully rounded badges

## Breakpoints

- **sm**: 640px - Mobile landscape
- **md**: 768px - Tablet portrait
- **lg**: 1024px - Tablet landscape
- **xl**: 1280px - Desktop
- **2xl**: 1536px - Large desktop

## Container Sizes

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Animation System

### Durations

- **Fast**: 150ms - Quick interactions
- **Normal**: 300ms - Standard transitions
- **Slow**: 500ms - Complex animations

### Easing Functions

- **Custom**: `cubic-bezier(0.6, -0.05, 0.01, 0.99)` - Smooth, natural motion
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - Playful bounce effect
- **Elastic**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` - Elastic motion

### Floating Animations

- **Float**: 6s infinite vertical movement for isometric elements
- **Float Delayed**: Same as float with 2s delay
- **Float Slow**: 8s infinite movement with 4s delay

## Component Classes

### Typography Classes

```css
/* Heading Classes */
.heading-xl, .heading-lg, .heading-md, .heading-sm

/* Body Text Classes */
.body-xl, .body-lg, .body-md, .body-sm, .body-xs

/* Display Text Classes */
.text-display-xl, .text-display-lg, .text-display-md

/* Special Text Classes */
.text-lead, .text-caption
```

### Layout Classes

```css
.container-xl, .container-lg, .container-md, .container-sm
.section-padding, .section-gap
```

### Component Classes

```css
.card-base - Base card styling with hover effects
.btn-base, .btn-primary, .btn-secondary - Button variants
.badge-base, .badge-skill - Badge components
```

### Animation Classes

```css
.animate-float, .animate-float-delayed, .animate-float-slow
```

## Usage Examples

### Using Design Tokens in Components

```tsx
// Using Tailwind classes
<div className="bg-bg-beige text-text-primary">
  <h1 className="heading-xl text-primary">Title</h1>
  <p className="body-lg text-text-secondary">Description</p>
</div>

// Using component classes
<div className="card-base">
  <h2 className="heading-md">Card Title</h2>
  <button className="btn-base btn-primary">Action</button>
</div>
```

### Using Constants in JavaScript

```tsx
import { COLORS, SPACING, getColor } from "@/utils/constants";

const styles = {
  backgroundColor: COLORS.bg.beige,
  padding: SPACING[4],
  color: getColor("text.primary"),
};
```

### Using Animation Variants

```tsx
import { fadeInUp, staggerContainer } from "@/utils/animations";

<motion.div variants={staggerContainer} initial="initial" animate="animate">
  <motion.h1 variants={fadeInUp}>Animated Title</motion.h1>
</motion.div>;
```

## Accessibility Features

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:

- Normal text: 4.5:1 minimum contrast ratio
- Large text: 3:1 minimum contrast ratio

### Reduced Motion Support

All animations respect the `prefers-reduced-motion` setting:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are disabled or reduced */
}
```

### Focus Management

- Visible focus indicators on all interactive elements
- Skip links for keyboard navigation
- Proper tab order throughout the interface

### Touch Targets

- Minimum 44px touch targets on mobile devices
- Adequate spacing between interactive elements

## File Structure

```
src/
├── app/
│   └── globals.css          # Main CSS with design tokens
├── styles/
│   └── components.css       # Component-specific styles
├── utils/
│   ├── constants.ts         # Design token constants
│   └── animations.ts        # Animation utilities
├── types/
│   └── css.d.ts            # CSS custom property types
└── tailwind.config.ts       # Tailwind configuration
```

## Maintenance

### Adding New Colors

1. Add CSS custom property to `globals.css`
2. Add constant to `constants.ts`
3. Add Tailwind class to `tailwind.config.ts`
4. Update type definitions in `css.d.ts`

### Adding New Components

1. Create base styles in `components.css`
2. Add utility classes as needed
3. Document usage examples
4. Test across all breakpoints

### Performance Considerations

- CSS custom properties provide excellent performance
- Minimal runtime overhead compared to CSS-in-JS
- Efficient caching and compression
- Tree-shaking eliminates unused styles

This design system provides a solid foundation for building consistent, accessible, and maintainable user interfaces while maintaining excellent performance characteristics.
