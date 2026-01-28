/**
 * Responsive Breakpoint System Utilities
 *
 * This module provides TypeScript utilities for working with the responsive
 * breakpoint system, including hooks for responsive behavior and constants
 * for breakpoint values.
 */

// Breakpoint constants matching Tailwind configuration
export const BREAKPOINTS = {
  sm: 640, // Mobile landscape
  md: 768, // Tablet portrait
  lg: 1024, // Tablet landscape
  xl: 1280, // Desktop
  "2xl": 1536, // Large desktop
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// Media query strings for programmatic use
export const MEDIA_QUERIES = {
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  "2xl": `(min-width: ${BREAKPOINTS["2xl"]}px)`,

  // Max-width queries for mobile-first approach
  "max-sm": `(max-width: ${BREAKPOINTS.sm - 1}px)`,
  "max-md": `(max-width: ${BREAKPOINTS.md - 1}px)`,
  "max-lg": `(max-width: ${BREAKPOINTS.lg - 1}px)`,
  "max-xl": `(max-width: ${BREAKPOINTS.xl - 1}px)`,
  "max-2xl": `(max-width: ${BREAKPOINTS["2xl"] - 1}px)`,

  // Range queries
  "sm-md": `(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`,
  "md-lg": `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  "lg-xl": `(min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`,
  "xl-2xl": `(min-width: ${BREAKPOINTS.xl}px) and (max-width: ${BREAKPOINTS["2xl"] - 1}px)`,
} as const;

/**
 * Get the current breakpoint based on window width
 */
export const getCurrentBreakpoint = (): Breakpoint | "xs" => {
  if (typeof window === "undefined") return "lg"; // Default for SSR

  const width = window.innerWidth;

  if (width >= BREAKPOINTS["2xl"]) return "2xl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
};

/**
 * Check if current viewport matches a breakpoint
 */
export const matchesBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= BREAKPOINTS[breakpoint];
};

/**
 * Check if current viewport is mobile (below md breakpoint)
 */
export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BREAKPOINTS.md;
};

/**
 * Check if current viewport is tablet (md to lg range)
 */
export const isTablet = (): boolean => {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth;
  return width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
};

/**
 * Check if current viewport is desktop (lg and above)
 */
export const isDesktop = (): boolean => {
  if (typeof window === "undefined") return true; // Default for SSR
  return window.innerWidth >= BREAKPOINTS.lg;
};

/**
 * Get responsive value based on current breakpoint
 */
export const getResponsiveValue = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}): T | undefined => {
  const currentBreakpoint = getCurrentBreakpoint();

  // Return the most specific value available
  if (currentBreakpoint === "2xl" && values["2xl"] !== undefined)
    return values["2xl"];
  if (
    (currentBreakpoint === "2xl" || currentBreakpoint === "xl") &&
    values.xl !== undefined
  )
    return values.xl;
  if (
    (currentBreakpoint === "2xl" ||
      currentBreakpoint === "xl" ||
      currentBreakpoint === "lg") &&
    values.lg !== undefined
  )
    return values.lg;
  if (
    (currentBreakpoint === "2xl" ||
      currentBreakpoint === "xl" ||
      currentBreakpoint === "lg" ||
      currentBreakpoint === "md") &&
    values.md !== undefined
  )
    return values.md;
  if (currentBreakpoint !== "xs" && values.sm !== undefined) return values.sm;
  return values.xs;
};

/**
 * Container size utilities
 */
export const CONTAINER_SIZES = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Get container class name based on size
 */
export const getContainerClass = (size: Breakpoint = "xl"): string => {
  return `container-${size}`;
};

/**
 * Responsive grid column utilities
 */
export const getResponsiveGridCols = (
  breakpoint: Breakpoint | "xs",
  cols: number
): string => {
  if (breakpoint === "xs") return "grid-cols-1";
  return `${breakpoint}:grid-cols-${cols}`;
};

/**
 * Touch target size validation for mobile
 */
export const TOUCH_TARGET_SIZE = {
  minimum: 44, // WCAG AA minimum
  recommended: 48, // WCAG AAA recommended
} as const;

/**
 * Validate if an element meets touch target requirements
 */
export const validateTouchTarget = (element: HTMLElement): boolean => {
  if (!isMobile()) return true; // Only validate on mobile

  const rect = element.getBoundingClientRect();
  return (
    rect.width >= TOUCH_TARGET_SIZE.minimum &&
    rect.height >= TOUCH_TARGET_SIZE.minimum
  );
};

/**
 * Responsive spacing scale
 */
export const RESPONSIVE_SPACING = {
  xs: {
    section: "4rem",
    gap: "1rem",
    padding: "1rem",
  },
  sm: {
    section: "5rem",
    gap: "1.5rem",
    padding: "1.5rem",
  },
  md: {
    section: "6rem",
    gap: "2rem",
    padding: "2rem",
  },
  lg: {
    section: "7rem",
    gap: "2.5rem",
    padding: "2.5rem",
  },
  xl: {
    section: "8rem",
    gap: "3rem",
    padding: "3rem",
  },
  "2xl": {
    section: "8rem",
    gap: "3rem",
    padding: "3rem",
  },
} as const;

/**
 * Get responsive spacing value
 */
export const getResponsiveSpacing = (
  type: "section" | "gap" | "padding"
): string => {
  const breakpoint = getCurrentBreakpoint();
  return RESPONSIVE_SPACING[breakpoint][type];
};

/**
 * Responsive image sizing utilities
 */
export const RESPONSIVE_IMAGE_SIZES = {
  hero: {
    xs: "100vw",
    sm: "100vw",
    md: "50vw",
    lg: "40vw",
    xl: "40vw",
    "2xl": "40vw",
  },
  card: {
    xs: "100vw",
    sm: "50vw",
    md: "33vw",
    lg: "25vw",
    xl: "20vw",
    "2xl": "16vw",
  },
  thumbnail: {
    xs: "100px",
    sm: "120px",
    md: "150px",
    lg: "180px",
    xl: "200px",
    "2xl": "200px",
  },
} as const;

/**
 * Get responsive image sizes string for Next.js Image component
 */
export const getResponsiveImageSizes = (
  type: keyof typeof RESPONSIVE_IMAGE_SIZES
): string => {
  const sizes = RESPONSIVE_IMAGE_SIZES[type];
  return [
    `(max-width: ${BREAKPOINTS.sm - 1}px) ${sizes.xs}`,
    `(max-width: ${BREAKPOINTS.md - 1}px) ${sizes.sm}`,
    `(max-width: ${BREAKPOINTS.lg - 1}px) ${sizes.md}`,
    `(max-width: ${BREAKPOINTS.xl - 1}px) ${sizes.lg}`,
    `(max-width: ${BREAKPOINTS["2xl"] - 1}px) ${sizes.xl}`,
    sizes["2xl"],
  ].join(", ");
};

/**
 * Responsive animation duration utilities
 */
export const getResponsiveAnimationDuration = (): number => {
  if (isMobile()) return 300; // Faster animations on mobile
  return 600; // Standard duration for desktop
};

/**
 * Responsive font size utilities
 */
export const RESPONSIVE_FONT_SIZES = {
  "heading-xl": {
    xs: "2.5rem",
    sm: "3rem",
    md: "3.5rem",
    lg: "4rem",
    xl: "4.5rem",
    "2xl": "5rem",
  },
  "heading-lg": {
    xs: "2rem",
    sm: "2.25rem",
    md: "2.5rem",
    lg: "2.75rem",
    xl: "3rem",
    "2xl": "3rem",
  },
  "heading-md": {
    xs: "1.5rem",
    sm: "1.75rem",
    md: "1.875rem",
    lg: "2rem",
    xl: "2rem",
    "2xl": "2rem",
  },
  "heading-sm": {
    xs: "1.25rem",
    sm: "1.375rem",
    md: "1.5rem",
    lg: "1.5rem",
    xl: "1.5rem",
    "2xl": "1.5rem",
  },
} as const;

/**
 * Get responsive font size
 */
export const getResponsiveFontSize = (
  type: keyof typeof RESPONSIVE_FONT_SIZES
): string => {
  const breakpoint = getCurrentBreakpoint();
  return RESPONSIVE_FONT_SIZES[type][breakpoint];
};

/**
 * Utility to create responsive CSS custom properties
 */
export const createResponsiveProperty = (
  property: string,
  values: Record<Breakpoint | "xs", string>
): Record<string, string> => {
  const result: Record<string, string> = {};

  // Base value (xs)
  result[property] = values.xs || values.sm;

  // Responsive values
  Object.entries(BREAKPOINTS).forEach(([breakpoint, width]) => {
    const value = values[breakpoint as Breakpoint];
    if (value) {
      result[`@media (min-width: ${width}px)`] = {
        [property]: value,
      } as any;
    }
  });

  return result;
};

/**
 * Debounced resize handler for responsive utilities
 */
export const createResizeHandler = (
  callback: () => void,
  delay: number = 150
) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};

/**
 * Responsive layout detection utilities
 */
export const getLayoutType = (): "mobile" | "tablet" | "desktop" => {
  if (isMobile()) return "mobile";
  if (isTablet()) return "tablet";
  return "desktop";
};

/**
 * Check if device supports hover interactions
 */
export const supportsHover = (): boolean => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(hover: hover)").matches;
};

/**
 * Check if device has a coarse pointer (touch)
 */
export const hasCoarsePointer = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
};

/**
 * Get optimal number of columns for responsive grid
 */
export const getOptimalGridColumns = (
  itemCount: number
): Record<Breakpoint | "xs", number> => {
  return {
    xs: 1,
    sm: Math.min(2, itemCount),
    md: Math.min(3, itemCount),
    lg: Math.min(4, itemCount),
    xl: Math.min(5, itemCount),
    "2xl": Math.min(6, itemCount),
  };
};
