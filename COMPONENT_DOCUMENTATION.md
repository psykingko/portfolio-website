# Component Documentation

This document provides comprehensive documentation for the base UI components in the portfolio website design system.

## Overview

The component library consists of three foundational components that integrate seamlessly with the design system:

- **Button**: Interactive elements for actions and navigation
- **Card**: Container components for content organization
- **Badge**: Small labels and tags for categorization

All components are built with:

- TypeScript for type safety
- Accessibility best practices (WCAG 2.1 AA)
- Responsive design principles
- Design system integration
- Comprehensive testing

## Button Component

### Usage

```tsx
import Button from "@/components/ui/Button";

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>

// As a link
<Button href="/projects" variant="primary">View Projects</Button>

// With different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Disabled state
<Button disabled>Disabled</Button>

// With accessibility
<Button aria-label="Download resume">Download</Button>
```

### Props

| Prop         | Type                              | Default     | Description            |
| ------------ | --------------------------------- | ----------- | ---------------------- |
| `children`   | `React.ReactNode`                 | -           | Button content         |
| `variant`    | `"primary" \| "secondary"`        | `"primary"` | Visual style variant   |
| `size`       | `"sm" \| "md" \| "lg"`            | `"md"`      | Button size            |
| `onClick`    | `() => void`                      | -           | Click handler          |
| `href`       | `string`                          | -           | URL for link buttons   |
| `disabled`   | `boolean`                         | `false`     | Disabled state         |
| `type`       | `"button" \| "submit" \| "reset"` | `"button"`  | Button type            |
| `className`  | `string`                          | -           | Additional CSS classes |
| `aria-label` | `string`                          | -           | Accessibility label    |

### Features

- **Ripple Effect**: Visual feedback on click
- **Keyboard Navigation**: Full keyboard support for link buttons
- **Focus Management**: Visible focus indicators
- **Responsive**: Touch-friendly targets on mobile (44px minimum)
- **Loading States**: Built-in support for loading indicators
- **Accessibility**: ARIA attributes and semantic HTML

### CSS Classes

- `.btn-base`: Base button styles
- `.btn-primary`: Primary variant styles
- `.btn-secondary`: Secondary variant styles

## Card Component

### Usage

```tsx
import Card from "@/components/ui/Card";

// Basic usage
<Card>
  <h2>Card Title</h2>
  <p>Card content goes here.</p>
</Card>

// With different padding
<Card padding="sm">Compact card</Card>
<Card padding="lg">Spacious card</Card>

// Disable hover effects
<Card hover={false}>Static card</Card>

// As different HTML elements
<Card as="article">Article content</Card>
<Card as="section">Section content</Card>

// Custom styling
<Card className="border-2 border-primary">Custom card</Card>
```

### Props

| Prop        | Type                              | Default | Description            |
| ----------- | --------------------------------- | ------- | ---------------------- |
| `children`  | `React.ReactNode`                 | -       | Card content           |
| `className` | `string`                          | -       | Additional CSS classes |
| `hover`     | `boolean`                         | `true`  | Enable hover effects   |
| `padding`   | `"none" \| "sm" \| "md" \| "lg"`  | `"md"`  | Internal padding       |
| `as`        | `"div" \| "article" \| "section"` | `"div"` | HTML element type      |

### Features

- **Hover Effects**: Subtle lift and shadow on hover
- **Flexible Padding**: Multiple padding options
- **Semantic HTML**: Support for different HTML elements
- **Shadow System**: Integrated with design system shadows
- **Responsive**: Adapts to different screen sizes

### CSS Classes

- `.card-base`: Base card styles with hover effects
- `.card-flat`: Flat variant without shadows
- `.card-elevated`: Enhanced shadow variant
- `.card-gradient`: Gradient border variant

## Badge Component

### Usage

```tsx
import Badge from "@/components/ui/Badge";

// Basic usage
<Badge>Default</Badge>

// Skill badges (most common use case)
<Badge variant="skill">React</Badge>
<Badge variant="skill">TypeScript</Badge>

// Different variants
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="lg">Large</Badge>

// Interactive badges
<Badge
  variant="skill"
  onClick={() => console.log("Clicked!")}
  aria-label="React skill badge"
>
  React
</Badge>

// Custom styling
<Badge className="bg-accent-orange text-white">Custom</Badge>
```

### Props

| Prop          | Type                                               | Default     | Description                             |
| ------------- | -------------------------------------------------- | ----------- | --------------------------------------- |
| `children`    | `React.ReactNode`                                  | -           | Badge content                           |
| `variant`     | `"default" \| "skill" \| "primary" \| "secondary"` | `"default"` | Visual style variant                    |
| `size`        | `"sm" \| "md" \| "lg"`                             | `"md"`      | Badge size                              |
| `className`   | `string`                                           | -           | Additional CSS classes                  |
| `onClick`     | `() => void`                                       | -           | Click handler (makes badge interactive) |
| `interactive` | `boolean`                                          | `false`     | Force interactive styling               |
| `aria-label`  | `string`                                           | -           | Accessibility label                     |

### Features

- **Hover Effects**: Scale and color transitions on hover
- **Interactive Support**: Click handlers with keyboard navigation
- **Skill-Specific Styling**: Special styling for skill badges
- **Accessibility**: Full keyboard support and ARIA attributes
- **Flexible Sizing**: Multiple size options

### CSS Classes

- `.badge-base`: Base badge styles
- `.badge-skill`: Skill-specific styling with hover effects
- `.badge-primary`: Primary variant
- `.badge-secondary`: Secondary variant
- `.badge-interactive`: Interactive badge styles

## Design System Integration

### Colors

All components use CSS custom properties from the design system:

```css
--color-primary: #5634d6 --color-primary-light: #7b5ae6
  --color-primary-dark: #4527b8 --color-bg-card: #ffffff
  --color-text-primary: #1a1a1a --color-text-secondary: #666666;
```

### Typography

Components integrate with the responsive typography system:

```css
--font-size-sm: clamp(0.75rem, 2vw, 0.875rem)
  --font-size-base: clamp(0.875rem, 2.5vw, 1rem)
  --font-size-lg: clamp(1rem, 3vw, 1.125rem);
```

### Spacing

Consistent spacing using the design system scale:

```css
--spacing-2: 0.5rem --spacing-3: 0.75rem --spacing-4: 1rem --spacing-6: 1.5rem;
```

### Shadows

Integrated shadow system for depth and hierarchy:

```css
--shadow-card: 0 8px 32px rgba(0, 0, 0, 0.08) --shadow-hover: 0 12px 40px
  rgba(86, 52, 214, 0.15) --shadow-soft: 0 4px 20px rgba(86, 52, 214, 0.1);
```

## Accessibility Features

### Keyboard Navigation

- All interactive components support keyboard navigation
- Tab order follows logical flow
- Enter and Space keys trigger actions
- Focus indicators are clearly visible

### Screen Reader Support

- Semantic HTML elements
- Proper ARIA labels and roles
- Descriptive text for complex interactions
- State changes are announced

### Color Contrast

- All text meets WCAG 2.1 AA standards (4.5:1 minimum)
- Focus indicators have sufficient contrast
- Interactive states maintain accessibility

### Touch Targets

- Minimum 44px touch targets on mobile devices
- Adequate spacing between interactive elements
- Responsive sizing for different screen sizes

## Responsive Behavior

### Mobile (< 768px)

- Buttons use larger padding for touch-friendly targets
- Cards stack vertically with reduced padding
- Badges wrap naturally in flex containers
- Typography scales down appropriately

### Tablet (768px - 1023px)

- Balanced sizing between mobile and desktop
- Cards may display in 2-column grids
- Buttons maintain comfortable sizing

### Desktop (≥ 1024px)

- Full-size components with optimal spacing
- Cards can display in multi-column layouts
- Hover effects are fully enabled

## Testing

All components include comprehensive tests covering:

- Rendering with different props
- User interactions (click, keyboard)
- Accessibility features
- Responsive behavior
- Integration scenarios

Run tests with:

```bash
npm test -- --testPathPattern=components.test.tsx
```

## Performance Considerations

### CSS Optimization

- Uses CSS custom properties for efficient theming
- Minimal runtime overhead
- Efficient hover and transition effects
- Tree-shaking eliminates unused styles

### Bundle Size

- Lightweight component implementations
- No external dependencies beyond React
- Efficient class name concatenation utility
- Optimized for production builds

### Animation Performance

- Hardware-accelerated transforms
- Respects `prefers-reduced-motion`
- Efficient transition timing functions
- Minimal layout thrashing

## Common Patterns

### Project Cards

```tsx
<Card as="article">
  <h3 className="heading-sm mb-3">Project Title</h3>
  <p className="body-md text-text-secondary mb-4">Project description...</p>

  <div className="mb-4">
    <div className="flex flex-wrap gap-2">
      <Badge variant="skill" size="sm">
        React
      </Badge>
      <Badge variant="skill" size="sm">
        TypeScript
      </Badge>
    </div>
  </div>

  <div className="flex gap-3">
    <Button variant="primary" size="sm">
      View Demo
    </Button>
    <Button variant="secondary" size="sm" href="#">
      GitHub
    </Button>
  </div>
</Card>
```

### Skills Section

```tsx
<div className="mb-6">
  <h3 className="heading-sm mb-3">Frontend</h3>
  <div className="flex flex-wrap gap-2">
    {frontendSkills.map(skill => (
      <Badge
        key={skill}
        variant="skill"
        onClick={() => showSkillDetails(skill)}
        aria-label={`${skill} skill badge`}
      >
        {skill}
      </Badge>
    ))}
  </div>
</div>
```

### Call-to-Action Section

```tsx
<Card className="text-center">
  <h2 className="heading-lg mb-4">Ready to Work Together?</h2>
  <p className="body-lg text-text-secondary mb-6">
    Let's discuss your next project.
  </p>

  <div className="button-group-responsive">
    <Button variant="primary" size="lg">
      Get In Touch
    </Button>
    <Button variant="secondary" size="lg" href="/resume.pdf">
      Download Resume
    </Button>
  </div>
</Card>
```

## Customization

### Extending Components

Components can be extended using composition:

```tsx
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <Card as="article" className="project-card">
    <img src={project.thumbnail} alt={project.title} />
    <div className="p-6">
      <h3 className="heading-sm mb-2">{project.title}</h3>
      <p className="body-md text-text-secondary mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.map(tech => (
          <Badge key={tech} variant="skill" size="sm">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="primary" size="sm" href={project.demoUrl}>
          View Demo
        </Button>
        <Button variant="secondary" size="sm" href={project.githubUrl}>
          GitHub
        </Button>
      </div>
    </div>
  </Card>
);
```

### Custom Variants

Add new variants by extending the CSS:

```css
/* Custom button variant */
.btn-accent {
  background: var(--color-accent-orange);
  color: var(--color-text-light);
}

.btn-accent:hover:not(:disabled) {
  background: #e55a2b; /* Darker orange */
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

/* Custom badge variant */
.badge-featured {
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-accent-blue)
  );
  color: var(--color-text-light);
  font-weight: 600;
}
```

## Migration Guide

If upgrading from previous component versions:

1. Update import paths to use the new component locations
2. Replace old class names with new design system classes
3. Update prop names to match the new interfaces
4. Test accessibility features with screen readers
5. Verify responsive behavior across breakpoints

## Support

For questions or issues with the components:

1. Check the test files for usage examples
2. Review the design system documentation
3. Examine the CSS classes in `components.css`
4. Test with the ComponentShowcase demo

The components are designed to be flexible, accessible, and maintainable while providing a consistent user experience across the portfolio website.
