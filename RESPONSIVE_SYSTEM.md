# Responsive Breakpoint System Documentation

## Overview

The portfolio website implements a comprehensive responsive breakpoint system that provides consistent viewport handling across all screen sizes. The system integrates with Tailwind CSS and provides both CSS utilities and JavaScript/TypeScript utilities for responsive behavior.

## Breakpoint Configuration

### Standard Breakpoints

The system uses the following breakpoints, matching modern device sizes:

| Breakpoint | Min Width | Device Type      | Description         |
| ---------- | --------- | ---------------- | ------------------- |
| `xs`       | 0px       | Mobile Portrait  | Extra small devices |
| `sm`       | 640px     | Mobile Landscape | Small devices       |
| `md`       | 768px     | Tablet Portrait  | Medium devices      |
| `lg`       | 1024px    | Tablet Landscape | Large devices       |
| `xl`       | 1280px    | Desktop          | Extra large devices |
| `2xl`      | 1536px    | Large Desktop    | 2X large devices    |

### Tailwind CSS Integration

The breakpoints are configured in `tailwind.config.ts`:

```typescript
const config: Config = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    // ... rest of config
  },
};
```

## CSS Utilities

### Container System

The responsive container system provides consistent max-widths and padding:

```css
.responsive-container {
  width: 100%;
  margin: 0 auto;
  padding: 1rem; /* Mobile */
}

@media (min-width: 640px) {
  .responsive-container {
    max-width: 640px;
    padding: 1rem;
  }
}

@media (min-width: 768px) {
  .responsive-container {
    max-width: 768px;
    padding: 1.5rem;
  }
}

/* ... continues for all breakpoints */
```

### Grid System

Responsive grid utilities that adapt column counts:

```css
.responsive-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr; /* Mobile: 1 column */
}

.responsive-grid-2-sm {
  grid-template-columns: repeat(2, 1fr); /* sm+: 2 columns */
}

.responsive-grid-3-md {
  grid-template-columns: repeat(3, 1fr); /* md+: 3 columns */
}

/* ... continues for all breakpoints */
```

### Flexbox Utilities

Responsive flexbox layouts:

```css
.responsive-flex {
  display: flex;
  flex-direction: column; /* Mobile: stack vertically */
  gap: 1rem;
}

.responsive-flex-row-md {
  flex-direction: row; /* md+: horizontal layout */
  gap: 2rem;
}
```

### Visibility Utilities

Show/hide elements at different breakpoints:

```css
.show-mobile-only {
  display: block; /* Visible on mobile */
}

@media (min-width: 640px) {
  .show-mobile-only {
    display: none; /* Hidden on sm+ */
  }
}

.hide-mobile {
  display: none; /* Hidden on mobile */
}

@media (min-width: 640px) {
  .hide-mobile {
    display: block; /* Visible on sm+ */
  }
}
```

## JavaScript/TypeScript Utilities

### Core Functions

Import responsive utilities:

```typescript
import {
  getCurrentBreakpoint,
  matchesBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  getResponsiveValue,
} from "@/utils/responsive";
```

#### `getCurrentBreakpoint()`

Returns the current breakpoint based on window width:

```typescript
const breakpoint = getCurrentBreakpoint();
// Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

#### `matchesBreakpoint(breakpoint)`

Check if current viewport matches a specific breakpoint:

```typescript
const isLargeScreen = matchesBreakpoint("lg");
// Returns: boolean
```

#### Device Type Detection

```typescript
const mobile = isMobile(); // < 768px
const tablet = isTablet(); // 768px - 1023px
const desktop = isDesktop(); // >= 1024px
```

#### `getResponsiveValue(values)`

Get responsive values based on current breakpoint:

```typescript
const columns = getResponsiveValue({
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
  "2xl": 6,
});
```

### React Hooks

Import responsive hooks:

```typescript
import {
  useBreakpoint,
  useDeviceType,
  useResponsiveValue,
  useWindowSize,
} from "@/hooks/useResponsive";
```

#### `useBreakpoint()`

Get current breakpoint with reactive updates:

```typescript
const MyComponent = () => {
  const breakpoint = useBreakpoint();

  return (
    <div>Current breakpoint: {breakpoint}</div>
  );
};
```

#### `useDeviceType()`

Get device type with reactive updates:

```typescript
const MyComponent = () => {
  const { deviceType, isMobile, isTablet, isDesktop } = useDeviceType();

  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  );
};
```

#### `useResponsiveValue(values)`

Get responsive values that update with breakpoint changes:

```typescript
const MyComponent = () => {
  const gridColumns = useResponsiveValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  });

  return (
    <div className={`grid grid-cols-${gridColumns}`}>
      {/* Grid content */}
    </div>
  );
};
```

#### `useWindowSize()`

Get window dimensions with debounced updates:

```typescript
const MyComponent = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      Viewport: {width} x {height}
    </div>
  );
};
```

## Usage Examples

### Responsive Hero Section

```tsx
const HeroSection = () => {
  const { isMobile, isDesktop } = useDeviceType();

  return (
    <section className="hero-responsive">
      <div className="hero-content">
        <h1 className="heading-xl">
          {isMobile ? "Mobile Title" : "Desktop Title"}
        </h1>
        <p className="body-lg">Hero description</p>
        <div className="button-group-responsive">
          <button className="btn-base btn-primary">Primary</button>
          <button className="btn-base btn-secondary">Secondary</button>
        </div>
      </div>
      {isDesktop && (
        <div className="hero-visual">
          <IsometricScene />
        </div>
      )}
    </section>
  );
};
```

### Responsive Grid Layout

```tsx
const ProjectGrid = ({ projects }) => {
  const gridColumns = useResponsiveValue({
    xs: 1,
    sm: 2,
    lg: 3,
  });

  return (
    <div className={`grid grid-cols-${gridColumns} gap-6`}>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

### Responsive Navigation

```tsx
const Navigation = () => {
  const { isMobile } = useDeviceType();

  return (
    <nav className="nav-responsive">
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </nav>
  );
};
```

## Tailwind CSS Classes

### Responsive Prefixes

Use Tailwind's responsive prefixes with the configured breakpoints:

```html
<!-- Responsive text sizes -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Responsive Heading
</h1>

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  <!-- Grid items -->
</div>

<!-- Responsive spacing -->
<div class="p-4 sm:p-6 md:p-8 lg:p-10">
  <!-- Content -->
</div>

<!-- Responsive visibility -->
<div class="block sm:hidden">Mobile only</div>
<div class="hidden sm:block">Desktop only</div>
```

### Container Classes

```html
<!-- Responsive container -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>

<!-- Custom container sizes -->
<div class="container-lg">
  <!-- Content with lg max-width -->
</div>
```

## Accessibility Considerations

### Touch Targets

The system ensures touch targets meet accessibility guidelines:

```css
.touch-target {
  min-height: 44px; /* WCAG AA minimum */
  min-width: 44px;
}

.touch-target-large {
  min-height: 48px; /* WCAG AAA recommended */
  min-width: 48px;
}
```

### Reduced Motion

Respects user motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-responsive {
    animation-duration: 0.01ms !important;
  }
}
```

### Focus Management

Responsive focus styles:

```css
.focus-responsive:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@media (max-width: 767px) {
  .focus-responsive:focus {
    outline: 3px solid var(--color-primary);
    outline-offset: 3px;
  }
}
```

## Performance Optimization

### Debounced Resize Handling

The system uses debounced resize handlers to prevent excessive re-renders:

```typescript
const createResizeHandler = (callback: () => void, delay: number = 150) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};
```

### SSR Compatibility

All utilities handle server-side rendering gracefully:

```typescript
export const getCurrentBreakpoint = (): Breakpoint | "xs" => {
  if (typeof window === "undefined") return "lg"; // SSR default
  // ... client-side logic
};
```

## Testing

The responsive system includes comprehensive tests:

```bash
npm test -- responsive.test.ts
```

Tests cover:

- Breakpoint detection accuracy
- Device type classification
- Responsive value calculation
- Touch target validation
- SSR compatibility
- Cross-browser compatibility

## Best Practices

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```css
/* Mobile styles (default) */
.component {
  padding: 1rem;
  font-size: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: 2rem;
    font-size: 1.125rem;
  }
}
```

### Consistent Spacing

Use the responsive spacing utilities for consistency:

```tsx
const Section = ({ children }) => (
  <section className="responsive-section">
    <div className="responsive-container">{children}</div>
  </section>
);
```

### Performance Considerations

- Use CSS for layout changes when possible
- Debounce resize handlers
- Minimize JavaScript-based responsive logic
- Test on real devices

### Accessibility

- Ensure touch targets are at least 44px on mobile
- Test with screen readers at all breakpoints
- Maintain proper focus management
- Respect user motion preferences

## Troubleshooting

### Common Issues

1. **Hydration Mismatches**: Use SSR-safe defaults in hooks
2. **Flash of Incorrect Layout**: Implement proper loading states
3. **Performance Issues**: Debounce resize handlers and minimize re-renders
4. **Touch Target Failures**: Use provided touch target utilities

### Debug Tools

Use the ResponsiveDemo component to test breakpoint behavior:

```tsx
import ResponsiveDemo from "@/components/demo/ResponsiveDemo";

// Add to a test page to visualize responsive behavior
```

## Migration Guide

### From Other Systems

If migrating from other responsive systems:

1. Update breakpoint values to match the new system
2. Replace custom media queries with the provided utilities
3. Update component logic to use the new hooks
4. Test thoroughly across all breakpoints

### Extending the System

To add custom breakpoints:

1. Update `BREAKPOINTS` constant in `utils/responsive.ts`
2. Add corresponding Tailwind screen configuration
3. Update CSS utilities as needed
4. Add tests for new breakpoints

This responsive breakpoint system provides a solid foundation for building responsive layouts that work consistently across all devices and screen sizes.
