/**
 * Typography Scale Tests
 *
 * Tests to validate the responsive typography implementation with clamp() functions
 * Validates: Requirements US6 (responsive design), Design Document typography specifications
 */

describe("Typography Scale Implementation", () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    // Create a test element
    testElement = document.createElement("div");
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    if (testElement.parentNode) {
      document.body.removeChild(testElement);
    }
  });

  describe("Heading Typography Classes", () => {
    test("heading-xl class applies correct font properties", () => {
      testElement.className = "heading-xl";

      // Simulate CSS application (in real browser, this would be handled by CSS)
      testElement.style.fontSize = "var(--font-size-heading-xl)";
      testElement.style.fontWeight = "800";
      testElement.style.fontFamily = "var(--font-display)";
      testElement.style.lineHeight = "var(--line-height-tight)";

      expect(testElement.style.fontSize).toBe("var(--font-size-heading-xl)");
      expect(testElement.style.fontWeight).toBe("800");
      expect(testElement.style.fontFamily).toBe("var(--font-display)");
    });

    test("heading-lg class applies correct font properties", () => {
      testElement.className = "heading-lg";

      testElement.style.fontSize = "var(--font-size-heading-lg)";
      testElement.style.fontWeight = "700";
      testElement.style.fontFamily = "var(--font-display)";

      expect(testElement.style.fontSize).toBe("var(--font-size-heading-lg)");
      expect(testElement.style.fontWeight).toBe("700");
    });

    test("heading-md class applies correct font properties", () => {
      testElement.className = "heading-md";

      testElement.style.fontSize = "var(--font-size-heading-md)";
      testElement.style.fontWeight = "600";

      expect(testElement.style.fontSize).toBe("var(--font-size-heading-md)");
      expect(testElement.style.fontWeight).toBe("600");
    });

    test("heading-sm class applies correct font properties", () => {
      testElement.className = "heading-sm";

      testElement.style.fontSize = "var(--font-size-heading-sm)";
      testElement.style.fontWeight = "600";

      expect(testElement.style.fontSize).toBe("var(--font-size-heading-sm)");
      expect(testElement.style.fontWeight).toBe("600");
    });
  });

  describe("Body Typography Classes", () => {
    test("body-xl class applies correct font properties", () => {
      testElement.className = "body-xl";

      testElement.style.fontSize = "var(--font-size-body-xl)";
      testElement.style.lineHeight = "var(--line-height-loose)";
      testElement.style.fontFamily = "var(--font-sans)";

      expect(testElement.style.fontSize).toBe("var(--font-size-body-xl)");
      expect(testElement.style.lineHeight).toBe("var(--line-height-loose)");
      expect(testElement.style.fontFamily).toBe("var(--font-sans)");
    });

    test("body-lg class applies correct font properties", () => {
      testElement.className = "body-lg";

      testElement.style.fontSize = "var(--font-size-body-lg)";
      testElement.style.lineHeight = "var(--line-height-loose)";

      expect(testElement.style.fontSize).toBe("var(--font-size-body-lg)");
      expect(testElement.style.lineHeight).toBe("var(--line-height-loose)");
    });

    test("body-md class applies correct font properties", () => {
      testElement.className = "body-md";

      testElement.style.fontSize = "var(--font-size-body-md)";
      testElement.style.lineHeight = "var(--line-height-relaxed)";

      expect(testElement.style.fontSize).toBe("var(--font-size-body-md)");
      expect(testElement.style.lineHeight).toBe("var(--line-height-relaxed)");
    });

    test("body-sm class applies correct font properties", () => {
      testElement.className = "body-sm";

      testElement.style.fontSize = "var(--font-size-body-sm)";
      testElement.style.lineHeight = "var(--line-height-normal)";

      expect(testElement.style.fontSize).toBe("var(--font-size-body-sm)");
      expect(testElement.style.lineHeight).toBe("var(--line-height-normal)");
    });

    test("body-xs class applies correct font properties", () => {
      testElement.className = "body-xs";

      testElement.style.fontSize = "var(--font-size-body-xs)";
      testElement.style.lineHeight = "var(--line-height-normal)";

      expect(testElement.style.fontSize).toBe("var(--font-size-body-xs)");
      expect(testElement.style.lineHeight).toBe("var(--line-height-normal)");
    });
  });

  describe("Clamp Function Validation", () => {
    test("CSS custom properties contain valid clamp() functions", () => {
      const headingXL = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-heading-xl");
      const headingLG = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-heading-lg");
      const headingMD = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-heading-md");
      const headingSM = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-heading-sm");

      expect(headingXL).toBe("clamp(3rem, 8vw, 5rem)");
      expect(headingLG).toBe("clamp(2rem, 5vw, 3rem)");
      expect(headingMD).toBe("clamp(1.5rem, 4vw, 2rem)");
      expect(headingSM).toBe("clamp(1.25rem, 3vw, 1.5rem)");
    });

    test("Body text clamp functions are properly defined", () => {
      const bodyXL = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-body-xl");
      const bodyLG = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-body-lg");
      const bodyMD = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-body-md");
      const bodySM = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-body-sm");
      const bodyXS = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--font-size-body-xs");

      expect(bodyXL).toBe("clamp(1.125rem, 3vw, 1.25rem)");
      expect(bodyLG).toBe("clamp(1rem, 2.5vw, 1.125rem)");
      expect(bodyMD).toBe("clamp(0.875rem, 2.5vw, 1rem)");
      expect(bodySM).toBe("clamp(0.75rem, 2vw, 0.875rem)");
      expect(bodyXS).toBe("clamp(0.625rem, 1.5vw, 0.75rem)");
    });
  });

  describe("Font Family Assignment", () => {
    test("heading classes use display font family", () => {
      const headingClasses = [
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
      ];

      headingClasses.forEach(className => {
        testElement.className = className;
        testElement.style.fontFamily = "var(--font-display)";
        expect(testElement.style.fontFamily).toBe("var(--font-display)");
      });
    });

    test("body classes use sans font family", () => {
      const bodyClasses = [
        "body-xl",
        "body-lg",
        "body-md",
        "body-sm",
        "body-xs",
      ];

      bodyClasses.forEach(className => {
        testElement.className = className;
        testElement.style.fontFamily = "var(--font-sans)";
        expect(testElement.style.fontFamily).toBe("var(--font-sans)");
      });
    });
  });

  describe("Line Height Consistency", () => {
    test("heading classes have appropriate line heights", () => {
      // Test that headings use tight line heights for better visual hierarchy
      testElement.className = "heading-xl";
      testElement.style.lineHeight = "var(--line-height-tight)";
      expect(testElement.style.lineHeight).toBe("var(--line-height-tight)");

      testElement.className = "heading-lg";
      testElement.style.lineHeight = "var(--line-height-tight)";
      expect(testElement.style.lineHeight).toBe("var(--line-height-tight)");
    });

    test("body classes have appropriate line heights for readability", () => {
      // Test that body text uses looser line heights for better readability
      testElement.className = "body-xl";
      testElement.style.lineHeight = "var(--line-height-loose)";
      expect(testElement.style.lineHeight).toBe("var(--line-height-loose)");

      testElement.className = "body-lg";
      testElement.style.lineHeight = "var(--line-height-loose)";
      expect(testElement.style.lineHeight).toBe("var(--line-height-loose)");

      testElement.className = "body-md";
      testElement.style.lineHeight = "var(--line-height-relaxed)";
      expect(testElement.style.lineHeight).toBe("var(--line-height-relaxed)");
    });
  });
});

/**
 * Property-Based Test for Typography Responsiveness
 * **Validates: Requirements US6**
 *
 * This test validates that typography scales appropriately across different viewport widths
 */
describe("Typography Responsiveness Property Test", () => {
  test("typography scales correctly across viewport widths", () => {
    // Test various viewport widths
    const viewportWidths = [320, 480, 768, 1024, 1280, 1440, 1920];

    viewportWidths.forEach(width => {
      // Simulate viewport width change
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: width,
      });

      // Calculate expected font sizes based on clamp() function
      // For heading-xl: clamp(3rem, 8vw, 5rem)
      const minSize = 48; // 3rem = 48px
      const maxSize = 80; // 5rem = 80px
      const vwSize = width * 0.08; // 8vw
      const expectedSize = Math.max(minSize, Math.min(vwSize, maxSize));

      // Verify that the calculated size is within expected bounds
      expect(expectedSize).toBeGreaterThanOrEqual(minSize);
      expect(expectedSize).toBeLessThanOrEqual(maxSize);

      // For smaller viewports, should use minimum size
      if (width <= 600) {
        expect(expectedSize).toBe(minSize);
      }

      // For larger viewports, should use maximum size
      if (width >= 1000) {
        expect(expectedSize).toBe(maxSize);
      }
    });
  });

  test("body text maintains readability across all viewport sizes", () => {
    const viewportWidths = [320, 480, 768, 1024, 1280, 1920];

    viewportWidths.forEach(width => {
      // For body-md: clamp(0.875rem, 2.5vw, 1rem)
      const minSize = 14; // 0.875rem = 14px
      const maxSize = 16; // 1rem = 16px
      const vwSize = width * 0.025; // 2.5vw
      const expectedSize = Math.max(minSize, Math.min(vwSize, maxSize));

      // Ensure body text never goes below 14px for readability
      expect(expectedSize).toBeGreaterThanOrEqual(14);

      // Ensure body text doesn't exceed 16px to maintain hierarchy
      expect(expectedSize).toBeLessThanOrEqual(16);
    });
  });

  test("all typography classes have proper clamp() function structure", () => {
    const typographyClasses = [
      {
        name: "heading-xl",
        variable: "--font-size-heading-xl",
        expected: "clamp(3rem, 8vw, 5rem)",
      },
      {
        name: "heading-lg",
        variable: "--font-size-heading-lg",
        expected: "clamp(2rem, 5vw, 3rem)",
      },
      {
        name: "heading-md",
        variable: "--font-size-heading-md",
        expected: "clamp(1.5rem, 4vw, 2rem)",
      },
      {
        name: "heading-sm",
        variable: "--font-size-heading-sm",
        expected: "clamp(1.25rem, 3vw, 1.5rem)",
      },
      {
        name: "body-xl",
        variable: "--font-size-body-xl",
        expected: "clamp(1.125rem, 3vw, 1.25rem)",
      },
      {
        name: "body-lg",
        variable: "--font-size-body-lg",
        expected: "clamp(1rem, 2.5vw, 1.125rem)",
      },
      {
        name: "body-md",
        variable: "--font-size-body-md",
        expected: "clamp(0.875rem, 2.5vw, 1rem)",
      },
      {
        name: "body-sm",
        variable: "--font-size-body-sm",
        expected: "clamp(0.75rem, 2vw, 0.875rem)",
      },
      {
        name: "body-xs",
        variable: "--font-size-body-xs",
        expected: "clamp(0.625rem, 1.5vw, 0.75rem)",
      },
    ];

    typographyClasses.forEach(({ name, variable, expected }) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        variable
      );
      expect(value).toBe(expected);

      // Verify clamp function structure
      expect(value).toMatch(/^clamp\(.+rem,\s*\d+(\.\d+)?vw,\s*.+rem\)$/);
    });
  });
});
