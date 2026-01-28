/**
 * React hooks for responsive behavior
 *
 * These hooks provide reactive responsive utilities that update when
 * the viewport size changes, enabling dynamic responsive behavior
 * in React components.
 */

import { useState, useEffect, useCallback } from "react";
import {
  BREAKPOINTS,
  MEDIA_QUERIES,
  getCurrentBreakpoint,
  matchesBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  getResponsiveValue,
  createResizeHandler,
  type Breakpoint,
} from "../utils/responsive";

/**
 * Hook to get the current breakpoint with reactive updates
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | "xs">(() => {
    if (typeof window === "undefined") return "lg"; // SSR default
    return getCurrentBreakpoint();
  });

  useEffect(() => {
    const handleResize = createResizeHandler(() => {
      setBreakpoint(getCurrentBreakpoint());
    });

    window.addEventListener("resize", handleResize);

    // Set initial value after hydration
    setBreakpoint(getCurrentBreakpoint());

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
};

/**
 * Hook to check if a specific breakpoint matches
 */
export const useBreakpointMatch = (breakpoint: Breakpoint) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return matchesBreakpoint(breakpoint);
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA_QUERIES[breakpoint]);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return matches;
};

/**
 * Hook to get device type with reactive updates
 */
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    () => {
      if (typeof window === "undefined") return "desktop";
      if (isMobile()) return "mobile";
      if (isTablet()) return "tablet";
      return "desktop";
    }
  );

  useEffect(() => {
    const handleResize = createResizeHandler(() => {
      if (isMobile()) {
        setDeviceType("mobile");
      } else if (isTablet()) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    });

    window.addEventListener("resize", handleResize);

    // Set initial value after hydration
    if (isMobile()) {
      setDeviceType("mobile");
    } else if (isTablet()) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    deviceType,
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
  };
};

/**
 * Hook to get responsive values that update with breakpoint changes
 */
export const useResponsiveValue = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}) => {
  const breakpoint = useBreakpoint();

  return getResponsiveValue({
    ...values,
    [breakpoint]: values[breakpoint as keyof typeof values],
  });
};

/**
 * Hook for window dimensions with debounced updates
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 1280, height: 720 }; // SSR default
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = createResizeHandler(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    window.addEventListener("resize", handleResize);

    // Set initial value after hydration
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

/**
 * Hook to check multiple breakpoints at once
 */
export const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState(() => {
    if (typeof window === "undefined") {
      return {
        sm: false,
        md: false,
        lg: true,
        xl: true,
        "2xl": false,
      };
    }

    return {
      sm: matchesBreakpoint("sm"),
      md: matchesBreakpoint("md"),
      lg: matchesBreakpoint("lg"),
      xl: matchesBreakpoint("xl"),
      "2xl": matchesBreakpoint("2xl"),
    };
  });

  useEffect(() => {
    const handleResize = createResizeHandler(() => {
      setBreakpoints({
        sm: matchesBreakpoint("sm"),
        md: matchesBreakpoint("md"),
        lg: matchesBreakpoint("lg"),
        xl: matchesBreakpoint("xl"),
        "2xl": matchesBreakpoint("2xl"),
      });
    });

    window.addEventListener("resize", handleResize);

    // Set initial values after hydration
    setBreakpoints({
      sm: matchesBreakpoint("sm"),
      md: matchesBreakpoint("md"),
      lg: matchesBreakpoint("lg"),
      xl: matchesBreakpoint("xl"),
      "2xl": matchesBreakpoint("2xl"),
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoints;
};

/**
 * Hook for media query matching with custom queries
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

/**
 * Hook for orientation detection
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    () => {
      if (typeof window === "undefined") return "landscape";
      return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    }
  );

  useEffect(() => {
    const handleResize = createResizeHandler(() => {
      setOrientation(
        window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      );
    });

    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(() => {
        setOrientation(
          window.innerHeight > window.innerWidth ? "portrait" : "landscape"
        );
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    // Set initial value after hydration
    setOrientation(
      window.innerHeight > window.innerWidth ? "portrait" : "landscape"
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return orientation;
};

/**
 * Hook for responsive grid columns
 */
export const useResponsiveGrid = (itemCount: number) => {
  const breakpoint = useBreakpoint();

  const getColumns = useCallback(() => {
    switch (breakpoint) {
      case "xs":
        return 1;
      case "sm":
        return Math.min(2, itemCount);
      case "md":
        return Math.min(3, itemCount);
      case "lg":
        return Math.min(4, itemCount);
      case "xl":
        return Math.min(5, itemCount);
      case "2xl":
        return Math.min(6, itemCount);
      default:
        return 1;
    }
  }, [breakpoint, itemCount]);

  return {
    columns: getColumns(),
    breakpoint,
    gridClass: `grid-cols-${getColumns()}`,
  };
};

/**
 * Hook for responsive container sizing
 */
export const useResponsiveContainer = () => {
  const breakpoint = useBreakpoint();

  const getContainerClass = useCallback(() => {
    return `container-${breakpoint === "xs" ? "sm" : breakpoint}`;
  }, [breakpoint]);

  const getMaxWidth = useCallback(() => {
    switch (breakpoint) {
      case "xs":
      case "sm":
        return BREAKPOINTS.sm;
      case "md":
        return BREAKPOINTS.md;
      case "lg":
        return BREAKPOINTS.lg;
      case "xl":
        return BREAKPOINTS.xl;
      case "2xl":
        return BREAKPOINTS["2xl"];
      default:
        return BREAKPOINTS.lg;
    }
  }, [breakpoint]);

  return {
    containerClass: getContainerClass(),
    maxWidth: getMaxWidth(),
    breakpoint,
  };
};

/**
 * Hook for responsive spacing
 */
export const useResponsiveSpacing = () => {
  const breakpoint = useBreakpoint();

  const getSpacing = useCallback(
    (type: "section" | "gap" | "padding") => {
      const spacingMap = {
        section: {
          xs: "4rem",
          sm: "5rem",
          md: "6rem",
          lg: "7rem",
          xl: "8rem",
          "2xl": "8rem",
        },
        gap: {
          xs: "1rem",
          sm: "1.5rem",
          md: "2rem",
          lg: "2.5rem",
          xl: "3rem",
          "2xl": "3rem",
        },
        padding: {
          xs: "1rem",
          sm: "1.5rem",
          md: "2rem",
          lg: "2.5rem",
          xl: "3rem",
          "2xl": "3rem",
        },
      };

      return spacingMap[type][breakpoint];
    },
    [breakpoint]
  );

  return {
    section: getSpacing("section"),
    gap: getSpacing("gap"),
    padding: getSpacing("padding"),
    breakpoint,
  };
};

/**
 * Hook for touch device detection
 */
export const useTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    // Check on mount
    checkTouch();

    // Listen for touch events to detect touch capability
    const handleTouchStart = () => {
      setIsTouch(true);
    };

    window.addEventListener("touchstart", handleTouchStart, { once: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return isTouch;
};

/**
 * Hook for hover capability detection
 */
export const useHoverCapability = () => {
  const [canHover, setCanHover] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(hover: hover)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");

    const handleChange = (e: MediaQueryListEvent) => {
      setCanHover(e.matches);
    };

    // Set initial value
    setCanHover(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return canHover;
};
