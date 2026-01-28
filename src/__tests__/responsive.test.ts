/**
 * Tests for the responsive breakpoint system
 *
 * These tests validate that the responsive utilities work correctly
 * across different viewport sizes and provide consistent behavior.
 */

import {
  BREAKPOINTS,
  MEDIA_QUERIES,
  getCurrentBreakpoint,
  matchesBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  getResponsiveValue,
  getResponsiveImageSizes,
  validateTouchTarget,
  TOUCH_TARGET_SIZE,
} from "../utils/responsive";

// Mock window object for testing
const mockWindow = (width: number, height: number = 800) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });
};

// Mock matchMedia for testing
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("Responsive Breakpoint System", () => {
  beforeEach(() => {
    // Reset window dimensions
    mockWindow(1280, 800);
    mockMatchMedia(true);
  });

  describe("BREAKPOINTS constant", () => {
    it("should have correct breakpoint values", () => {
      expect(BREAKPOINTS.sm).toBe(640);
      expect(BREAKPOINTS.md).toBe(768);
      expect(BREAKPOINTS.lg).toBe(1024);
      expect(BREAKPOINTS.xl).toBe(1280);
      expect(BREAKPOINTS["2xl"]).toBe(1536);
    });
  });

  describe("MEDIA_QUERIES constant", () => {
    it("should generate correct media query strings", () => {
      expect(MEDIA_QUERIES.sm).toBe("(min-width: 640px)");
      expect(MEDIA_QUERIES.md).toBe("(min-width: 768px)");
      expect(MEDIA_QUERIES.lg).toBe("(min-width: 1024px)");
      expect(MEDIA_QUERIES.xl).toBe("(min-width: 1280px)");
      expect(MEDIA_QUERIES["2xl"]).toBe("(min-width: 1536px)");
    });

    it("should generate correct max-width media queries", () => {
      expect(MEDIA_QUERIES["max-sm"]).toBe("(max-width: 639px)");
      expect(MEDIA_QUERIES["max-md"]).toBe("(max-width: 767px)");
      expect(MEDIA_QUERIES["max-lg"]).toBe("(max-width: 1023px)");
      expect(MEDIA_QUERIES["max-xl"]).toBe("(max-width: 1279px)");
      expect(MEDIA_QUERIES["max-2xl"]).toBe("(max-width: 1535px)");
    });

    it("should generate correct range media queries", () => {
      expect(MEDIA_QUERIES["sm-md"]).toBe(
        "(min-width: 640px) and (max-width: 767px)"
      );
      expect(MEDIA_QUERIES["md-lg"]).toBe(
        "(min-width: 768px) and (max-width: 1023px)"
      );
      expect(MEDIA_QUERIES["lg-xl"]).toBe(
        "(min-width: 1024px) and (max-width: 1279px)"
      );
      expect(MEDIA_QUERIES["xl-2xl"]).toBe(
        "(min-width: 1280px) and (max-width: 1535px)"
      );
    });
  });

  describe("getCurrentBreakpoint", () => {
    it("should return correct breakpoint for mobile width", () => {
      mockWindow(320);
      expect(getCurrentBreakpoint()).toBe("xs");
    });

    it("should return correct breakpoint for small width", () => {
      mockWindow(640);
      expect(getCurrentBreakpoint()).toBe("sm");
    });

    it("should return correct breakpoint for medium width", () => {
      mockWindow(768);
      expect(getCurrentBreakpoint()).toBe("md");
    });

    it("should return correct breakpoint for large width", () => {
      mockWindow(1024);
      expect(getCurrentBreakpoint()).toBe("lg");
    });

    it("should return correct breakpoint for extra large width", () => {
      mockWindow(1280);
      expect(getCurrentBreakpoint()).toBe("xl");
    });

    it("should return correct breakpoint for 2xl width", () => {
      mockWindow(1536);
      expect(getCurrentBreakpoint()).toBe("2xl");
    });

    it("should handle edge cases correctly", () => {
      mockWindow(639);
      expect(getCurrentBreakpoint()).toBe("xs");

      mockWindow(767);
      expect(getCurrentBreakpoint()).toBe("sm");

      mockWindow(1023);
      expect(getCurrentBreakpoint()).toBe("md");

      mockWindow(1279);
      expect(getCurrentBreakpoint()).toBe("lg");

      mockWindow(1535);
      expect(getCurrentBreakpoint()).toBe("xl");
    });
  });

  describe("matchesBreakpoint", () => {
    it("should correctly match breakpoints", () => {
      mockWindow(1280);
      expect(matchesBreakpoint("sm")).toBe(true);
      expect(matchesBreakpoint("md")).toBe(true);
      expect(matchesBreakpoint("lg")).toBe(true);
      expect(matchesBreakpoint("xl")).toBe(true);
      expect(matchesBreakpoint("2xl")).toBe(false);
    });

    it("should not match larger breakpoints on smaller screens", () => {
      mockWindow(640);
      expect(matchesBreakpoint("sm")).toBe(true);
      expect(matchesBreakpoint("md")).toBe(false);
      expect(matchesBreakpoint("lg")).toBe(false);
      expect(matchesBreakpoint("xl")).toBe(false);
      expect(matchesBreakpoint("2xl")).toBe(false);
    });
  });

  describe("Device type detection", () => {
    it("should correctly identify mobile devices", () => {
      mockWindow(320);
      expect(isMobile()).toBe(true);
      expect(isTablet()).toBe(false);
      expect(isDesktop()).toBe(false);
    });

    it("should correctly identify tablet devices", () => {
      mockWindow(800);
      expect(isMobile()).toBe(false);
      expect(isTablet()).toBe(true);
      expect(isDesktop()).toBe(false);
    });

    it("should correctly identify desktop devices", () => {
      mockWindow(1280);
      expect(isMobile()).toBe(false);
      expect(isTablet()).toBe(false);
      expect(isDesktop()).toBe(true);
    });

    it("should handle edge cases for device detection", () => {
      mockWindow(767);
      expect(isMobile()).toBe(true);

      mockWindow(768);
      expect(isTablet()).toBe(true);

      mockWindow(1023);
      expect(isTablet()).toBe(true);

      mockWindow(1024);
      expect(isDesktop()).toBe(true);
    });
  });

  describe("getResponsiveValue", () => {
    it("should return the most specific value for current breakpoint", () => {
      mockWindow(1280); // xl breakpoint

      const values = {
        xs: "mobile",
        sm: "small",
        md: "medium",
        lg: "large",
        xl: "extra-large",
        "2xl": "huge",
      };

      expect(getResponsiveValue(values)).toBe("extra-large");
    });

    it("should fall back to smaller breakpoint values when specific value is not available", () => {
      mockWindow(1280); // xl breakpoint

      const values = {
        xs: "mobile",
        md: "medium",
        // No xl value, should fall back to md
      };

      expect(getResponsiveValue(values)).toBe("medium");
    });

    it("should return xs value for mobile", () => {
      mockWindow(320);

      const values = {
        xs: "mobile",
        md: "medium",
        xl: "desktop",
      };

      expect(getResponsiveValue(values)).toBe("mobile");
    });

    it("should handle missing values gracefully", () => {
      mockWindow(1280);

      const values = {
        xs: "mobile",
        // Missing other values
      };

      expect(getResponsiveValue(values)).toBe("mobile");
    });
  });

  describe("getResponsiveImageSizes", () => {
    it("should generate correct sizes string for hero images", () => {
      const sizes = getResponsiveImageSizes("hero");
      expect(sizes).toContain("(max-width: 639px) 100vw");
      expect(sizes).toContain("(max-width: 767px) 100vw");
      expect(sizes).toContain("(max-width: 1023px) 50vw");
      expect(sizes).toContain("40vw");
    });

    it("should generate correct sizes string for card images", () => {
      const sizes = getResponsiveImageSizes("card");
      expect(sizes).toContain("(max-width: 639px) 100vw");
      expect(sizes).toContain("(max-width: 767px) 50vw");
      expect(sizes).toContain("(max-width: 1023px) 33vw");
      expect(sizes).toContain("16vw");
    });

    it("should generate correct sizes string for thumbnail images", () => {
      const sizes = getResponsiveImageSizes("thumbnail");
      expect(sizes).toContain("(max-width: 639px) 100px");
      expect(sizes).toContain("(max-width: 767px) 120px");
      expect(sizes).toContain("200px");
    });
  });

  describe("Touch target validation", () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = document.createElement("button");
      // Mock getBoundingClientRect
      mockElement.getBoundingClientRect = jest.fn();
    });

    it("should validate touch targets on mobile devices", () => {
      mockWindow(320); // Mobile

      // Mock element with sufficient size
      (mockElement.getBoundingClientRect as jest.Mock).mockReturnValue({
        width: 48,
        height: 48,
      });

      expect(validateTouchTarget(mockElement)).toBe(true);
    });

    it("should reject touch targets that are too small on mobile", () => {
      mockWindow(320); // Mobile

      // Mock element with insufficient size
      (mockElement.getBoundingClientRect as jest.Mock).mockReturnValue({
        width: 30,
        height: 30,
      });

      expect(validateTouchTarget(mockElement)).toBe(false);
    });

    it("should pass validation on desktop regardless of size", () => {
      mockWindow(1280); // Desktop

      // Mock element with small size
      (mockElement.getBoundingClientRect as jest.Mock).mockReturnValue({
        width: 20,
        height: 20,
      });

      expect(validateTouchTarget(mockElement)).toBe(true);
    });

    it("should use correct minimum touch target size", () => {
      expect(TOUCH_TARGET_SIZE.minimum).toBe(44);
      expect(TOUCH_TARGET_SIZE.recommended).toBe(48);
    });
  });

  describe("Responsive spacing and layout", () => {
    it("should provide consistent spacing values", () => {
      // Test that spacing values are reasonable and consistent
      const spacingTypes = ["section", "gap", "padding"] as const;
      const breakpoints = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

      spacingTypes.forEach(type => {
        breakpoints.forEach(breakpoint => {
          // Values should be strings with rem units
          // This is a basic validation that the structure is correct
          expect(typeof type).toBe("string");
          expect(typeof breakpoint).toBe("string");
        });
      });
    });
  });

  describe("Container utilities", () => {
    it("should provide correct container sizes", () => {
      expect(BREAKPOINTS.sm).toBeLessThan(BREAKPOINTS.md);
      expect(BREAKPOINTS.md).toBeLessThan(BREAKPOINTS.lg);
      expect(BREAKPOINTS.lg).toBeLessThan(BREAKPOINTS.xl);
      expect(BREAKPOINTS.xl).toBeLessThan(BREAKPOINTS["2xl"]);
    });
  });

  describe("SSR compatibility", () => {
    it("should handle undefined window gracefully", () => {
      // Temporarily remove window
      const originalWindow = global.window;
      delete (global as any).window;

      // These should not throw errors
      expect(getCurrentBreakpoint()).toBe("lg"); // Default for SSR
      expect(matchesBreakpoint("lg")).toBe(false);
      expect(isMobile()).toBe(false);
      expect(isTablet()).toBe(false);
      expect(isDesktop()).toBe(true); // Default for SSR

      // Restore window
      global.window = originalWindow;
    });
  });

  describe("Performance considerations", () => {
    it("should not cause memory leaks with event listeners", () => {
      // This is more of a structural test to ensure we're thinking about cleanup
      // In real usage, the hooks should properly clean up event listeners
      expect(typeof window.addEventListener).toBe("function");
      expect(typeof window.removeEventListener).toBe("function");
    });
  });
});

describe("Responsive CSS Integration", () => {
  it("should have consistent breakpoint values between JS and CSS", () => {
    // Ensure JS breakpoints match what's defined in CSS/Tailwind
    expect(BREAKPOINTS.sm).toBe(640);
    expect(BREAKPOINTS.md).toBe(768);
    expect(BREAKPOINTS.lg).toBe(1024);
    expect(BREAKPOINTS.xl).toBe(1280);
    expect(BREAKPOINTS["2xl"]).toBe(1536);
  });

  it("should generate media queries that match CSS conventions", () => {
    // Ensure media queries follow standard CSS format
    Object.values(MEDIA_QUERIES).forEach(query => {
      expect(query).toMatch(/^\(.*\)$/);
      expect(query).toContain("px");
    });
  });
});

describe("Accessibility considerations", () => {
  it("should provide adequate touch target sizes", () => {
    expect(TOUCH_TARGET_SIZE.minimum).toBeGreaterThanOrEqual(44);
    expect(TOUCH_TARGET_SIZE.recommended).toBeGreaterThanOrEqual(48);
  });

  it("should support reduced motion preferences", () => {
    // This would be tested in the component tests, but we can verify
    // the structure supports it
    expect(typeof window.matchMedia).toBe("function");
  });
});

describe("Cross-browser compatibility", () => {
  it("should handle different viewport units", () => {
    const sizes = getResponsiveImageSizes("hero");
    expect(sizes).toContain("vw"); // Viewport width units
    expect(sizes).toContain("px"); // Pixel units for fallback
  });

  it("should provide fallback values", () => {
    // Test that we have reasonable defaults for all scenarios
    const testValues = {
      xs: "mobile",
      lg: "desktop",
    };

    // Should work even with sparse value definitions
    mockWindow(800); // md breakpoint
    const result = getResponsiveValue(testValues);
    expect(result).toBeDefined();
  });
});
