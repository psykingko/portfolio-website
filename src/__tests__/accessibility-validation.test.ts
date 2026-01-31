/**
 * Accessibility validation tests for color contrast ratios
 * Tests WCAG 2.1 AA compliance for the new color palette
 */

import {
  hexToRgb,
  getRelativeLuminance,
  getContrastRatio,
  meetsContrastRequirement,
  getContrastLevel,
  validateAllColorCombinations,
  validateButtonContrasts,
  validateFocusIndicators,
  generateAccessibilityReport,
  CONTRAST_REQUIREMENTS,
} from "../utils/accessibility";
import { COLORS } from "../utils/constants";

describe("Accessibility Color Validation", () => {
  describe("Color conversion utilities", () => {
    test("hexToRgb converts hex colors correctly", () => {
      expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("#1b2651")).toEqual({ r: 27, g: 38, b: 81 });
      expect(hexToRgb("#cd2028")).toEqual({ r: 205, g: 32, b: 40 });
      expect(hexToRgb("invalid")).toBeNull();
    });

    test("getRelativeLuminance calculates correctly", () => {
      // White should have luminance of 1
      expect(getRelativeLuminance(255, 255, 255)).toBeCloseTo(1, 3);

      // Black should have luminance of 0
      expect(getRelativeLuminance(0, 0, 0)).toBeCloseTo(0, 3);

      // Navy color luminance should be low
      expect(getRelativeLuminance(27, 38, 81)).toBeLessThan(0.1);
    });

    test("getContrastRatio calculates correctly", () => {
      // White on black should be 21:1
      expect(getContrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 1);

      // Same colors should be 1:1
      expect(getContrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 1);

      // Navy on white should have good contrast
      expect(getContrastRatio("#1b2651", "#ffffff")).toBeGreaterThan(4.5);
    });
  });

  describe("WCAG compliance checking", () => {
    test("meetsContrastRequirement works correctly", () => {
      expect(meetsContrastRequirement(4.5, "normalText")).toBe(true);
      expect(meetsContrastRequirement(4.4, "normalText")).toBe(false);
      expect(meetsContrastRequirement(3.0, "largeText")).toBe(true);
      expect(meetsContrastRequirement(2.9, "largeText")).toBe(false);
    });

    test("getContrastLevel returns correct descriptions", () => {
      expect(getContrastLevel(7.5)).toBe("AAA (Enhanced)");
      expect(getContrastLevel(5.0)).toBe("AA (Standard)");
      expect(getContrastLevel(3.5)).toBe("AA Large Text");
      expect(getContrastLevel(2.5)).toBe("Fail");
    });
  });

  describe("Primary text on beige background", () => {
    test("primary text has sufficient contrast on beige background", () => {
      const ratio = getContrastRatio(COLORS.text.primary, COLORS.bg.beige);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      expect(meetsContrastRequirement(ratio, "normalText")).toBe(true);
    });
  });

  describe("Secondary text on all background variants", () => {
    test("secondary text has sufficient contrast on beige background", () => {
      const ratio = getContrastRatio(COLORS.text.secondary, COLORS.bg.beige);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
    });

    test("secondary text has sufficient contrast on white background", () => {
      const ratio = getContrastRatio(COLORS.text.secondary, COLORS.bg.white);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
    });

    test("secondary text has sufficient contrast on card background", () => {
      const ratio = getContrastRatio(COLORS.text.secondary, COLORS.bg.card);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
    });
  });

  describe("Button text contrast validation", () => {
    test("white text on navy button has sufficient contrast", () => {
      const ratio = getContrastRatio(COLORS.text.light, COLORS.primary.DEFAULT);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      expect(meetsContrastRequirement(ratio, "normalText")).toBe(true);
    });

    test("white text on red button has sufficient contrast", () => {
      const ratio = getContrastRatio(COLORS.text.light, COLORS.accent.red);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      expect(meetsContrastRequirement(ratio, "normalText")).toBe(true);
    });

    test("white text on teal button has sufficient contrast", () => {
      const ratio = getContrastRatio(COLORS.text.light, COLORS.accent.blue);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      expect(meetsContrastRequirement(ratio, "normalText")).toBe(true);
    });
  });

  describe("Focus indicator visibility", () => {
    test("navy focus indicator is visible on beige background", () => {
      const ratio = getContrastRatio(COLORS.primary.DEFAULT, COLORS.bg.beige);
      expect(ratio).toBeGreaterThanOrEqual(
        CONTRAST_REQUIREMENTS.focusIndicator
      );
      expect(meetsContrastRequirement(ratio, "focusIndicator")).toBe(true);
    });

    test("navy focus indicator is visible on white background", () => {
      const ratio = getContrastRatio(COLORS.primary.DEFAULT, COLORS.bg.white);
      expect(ratio).toBeGreaterThanOrEqual(
        CONTRAST_REQUIREMENTS.focusIndicator
      );
      expect(meetsContrastRequirement(ratio, "focusIndicator")).toBe(true);
    });

    test("navy focus indicator is visible on card background", () => {
      const ratio = getContrastRatio(COLORS.primary.DEFAULT, COLORS.bg.card);
      expect(ratio).toBeGreaterThanOrEqual(
        CONTRAST_REQUIREMENTS.focusIndicator
      );
      expect(meetsContrastRequirement(ratio, "focusIndicator")).toBe(true);
    });
  });

  describe("Comprehensive validation functions", () => {
    test("validateAllColorCombinations returns results", () => {
      const combinations = validateAllColorCombinations();
      expect(combinations).toHaveLength(24); // 3 text colors × 8 background colors
      expect(combinations[0]).toHaveProperty("ratio");
      expect(combinations[0]).toHaveProperty("normalText");
      expect(combinations[0]).toHaveProperty("largeText");
    });

    test("validateButtonContrasts returns button-specific results", () => {
      const buttonContrasts = validateButtonContrasts();
      expect(buttonContrasts).toHaveLength(3); // Primary, red, teal buttons

      // All button contrasts should pass for normal text
      buttonContrasts.forEach(button => {
        expect(button.normalText).toBe(true);
      });
    });

    test("validateFocusIndicators returns focus-specific results", () => {
      const focusIndicators = validateFocusIndicators();
      expect(focusIndicators).toHaveLength(3); // 3 background colors

      // All focus indicators should pass
      focusIndicators.forEach(focus => {
        expect(focus.interactive).toBe(true);
      });
    });

    test("generateAccessibilityReport provides comprehensive summary", () => {
      const report = generateAccessibilityReport();

      expect(report).toHaveProperty("allCombinations");
      expect(report).toHaveProperty("buttonContrasts");
      expect(report).toHaveProperty("focusIndicators");
      expect(report).toHaveProperty("summary");
      expect(report).toHaveProperty("issues");

      expect(report.summary.total).toBeGreaterThan(0);
      expect(report.summary.passRate).toBeGreaterThanOrEqual(0);
      expect(report.summary.passRate).toBeLessThanOrEqual(100);
    });
  });

  describe("Critical color combinations", () => {
    test("all critical text/background combinations meet WCAG AA", () => {
      const criticalCombinations = [
        // Primary text on main backgrounds
        {
          text: COLORS.text.primary,
          bg: COLORS.bg.beige,
          name: "Primary text on beige",
        },
        {
          text: COLORS.text.primary,
          bg: COLORS.bg.white,
          name: "Primary text on white",
        },
        {
          text: COLORS.text.primary,
          bg: COLORS.bg.card,
          name: "Primary text on card",
        },

        // Secondary text on main backgrounds
        {
          text: COLORS.text.secondary,
          bg: COLORS.bg.beige,
          name: "Secondary text on beige",
        },
        {
          text: COLORS.text.secondary,
          bg: COLORS.bg.white,
          name: "Secondary text on white",
        },
        {
          text: COLORS.text.secondary,
          bg: COLORS.bg.card,
          name: "Secondary text on card",
        },

        // Button text combinations
        {
          text: COLORS.text.light,
          bg: COLORS.primary.DEFAULT,
          name: "White text on navy button",
        },
        {
          text: COLORS.text.light,
          bg: COLORS.accent.red,
          name: "White text on red button",
        },
        {
          text: COLORS.text.light,
          bg: COLORS.accent.blue,
          name: "White text on teal button",
        },
      ];

      criticalCombinations.forEach(({ text, bg, name }) => {
        const ratio = getContrastRatio(text, bg);
        expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
        console.log(
          `✅ ${name}: ${ratio.toFixed(2)}:1 (${getContrastLevel(ratio)})`
        );
      });
    });
  });
});
