/**
 * Color contrast validation tests for WCAG 2.1 AA compliance
 * Tests the new navy and red color palette
 */

import { render } from "@testing-library/react";

// Import color constants
const COLORS = {
  primary: {
    DEFAULT: "#1b2651",
    light: "#2d3a6b",
    dark: "#0f1a3d",
  },
  bg: {
    beige: "#edeae1",
    white: "#ffffff",
    card: "#ffffff",
  },
  accent: {
    red: "#cd2028",
    blue: "#166c96",
  },
  text: {
    primary: "#0f172a",
    secondary: "#64748b",
    light: "#ffffff",
  },
};

// WCAG 2.1 AA contrast ratio requirements
const CONTRAST_REQUIREMENTS = {
  normalText: 4.5,
  largeText: 3.0,
  interactiveElements: 3.0,
  focusIndicator: 3.0,
};

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error("Invalid hex color format");
  }

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Test component for color contrast validation
 */
const ColorContrastTestComponent = () => {
  return (
    <div style={{ backgroundColor: COLORS.bg.beige }}>
      <h1 style={{ color: COLORS.text.primary }}>Primary Text on Beige</h1>
      <p style={{ color: COLORS.text.secondary }}>Secondary Text on Beige</p>

      <div style={{ backgroundColor: COLORS.bg.white }}>
        <h2 style={{ color: COLORS.text.primary }}>Primary Text on White</h2>
        <p style={{ color: COLORS.text.secondary }}>Secondary Text on White</p>
      </div>

      <button
        style={{
          backgroundColor: COLORS.primary.DEFAULT,
          color: COLORS.text.light,
        }}
      >
        Navy Button with White Text
      </button>

      <button
        style={{ backgroundColor: COLORS.accent.red, color: COLORS.text.light }}
      >
        Red Button with White Text
      </button>

      <button
        style={{
          backgroundColor: COLORS.accent.blue,
          color: COLORS.text.light,
        }}
      >
        Teal Button with White Text
      </button>
    </div>
  );
};

describe("Color Contrast Validation - WCAG 2.1 AA Compliance", () => {
  describe("Primary text on beige background", () => {
    test("meets WCAG AA contrast requirements", () => {
      const ratio = getContrastRatio(COLORS.text.primary, COLORS.bg.beige);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      console.log(`✅ Primary text on beige: ${ratio.toFixed(2)}:1`);
    });
  });

  describe("Secondary text on all backgrounds", () => {
    test("secondary text on beige meets contrast requirements", () => {
      const ratio = getContrastRatio(COLORS.text.secondary, COLORS.bg.beige);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      console.log(`✅ Secondary text on beige: ${ratio.toFixed(2)}:1`);
    });

    test("secondary text on white meets contrast requirements", () => {
      const ratio = getContrastRatio(COLORS.text.secondary, COLORS.bg.white);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      console.log(`✅ Secondary text on white: ${ratio.toFixed(2)}:1`);
    });

    test("secondary text on card meets contrast requirements", () => {
      const ratio = getContrastRatio(COLORS.text.secondary, COLORS.bg.card);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      console.log(`✅ Secondary text on card: ${ratio.toFixed(2)}:1`);
    });
  });

  describe("Button text contrast validation", () => {
    test("white text on navy button meets contrast requirements", () => {
      const ratio = getContrastRatio(COLORS.text.light, COLORS.primary.DEFAULT);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      console.log(`✅ White text on navy button: ${ratio.toFixed(2)}:1`);
    });

    test("white text on red button meets contrast requirements", () => {
      const ratio = getContrastRatio(COLORS.text.light, COLORS.accent.red);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      console.log(`✅ White text on red button: ${ratio.toFixed(2)}:1`);
    });

    test("white text on teal button meets contrast requirements", () => {
      const ratio = getContrastRatio(COLORS.text.light, COLORS.accent.blue);
      expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
      console.log(`✅ White text on teal button: ${ratio.toFixed(2)}:1`);
    });
  });

  describe("Focus indicator visibility", () => {
    test("navy focus indicator on beige background is visible", () => {
      const ratio = getContrastRatio(COLORS.primary.DEFAULT, COLORS.bg.beige);
      expect(ratio).toBeGreaterThanOrEqual(
        CONTRAST_REQUIREMENTS.focusIndicator
      );
      console.log(`✅ Navy focus on beige: ${ratio.toFixed(2)}:1`);
    });

    test("navy focus indicator on white background is visible", () => {
      const ratio = getContrastRatio(COLORS.primary.DEFAULT, COLORS.bg.white);
      expect(ratio).toBeGreaterThanOrEqual(
        CONTRAST_REQUIREMENTS.focusIndicator
      );
      console.log(`✅ Navy focus on white: ${ratio.toFixed(2)}:1`);
    });

    test("navy focus indicator on card background is visible", () => {
      const ratio = getContrastRatio(COLORS.primary.DEFAULT, COLORS.bg.card);
      expect(ratio).toBeGreaterThanOrEqual(
        CONTRAST_REQUIREMENTS.focusIndicator
      );
      console.log(`✅ Navy focus on card: ${ratio.toFixed(2)}:1`);
    });
  });

  describe("Component rendering with new colors", () => {
    test("renders color contrast test component without errors", () => {
      const { container } = render(<ColorContrastTestComponent />);
      expect(container).toBeInTheDocument();

      // Verify elements are rendered with correct colors
      const primaryHeading = container.querySelector("h1");
      const navyButton = container.querySelector("button");

      expect(primaryHeading).toBeInTheDocument();
      expect(navyButton).toBeInTheDocument();
    });
  });

  describe("Comprehensive color validation", () => {
    test("all critical color combinations meet WCAG AA standards", () => {
      const criticalCombinations = [
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
          text: COLORS.text.light,
          bg: COLORS.primary.DEFAULT,
          name: "White text on navy",
        },
        {
          text: COLORS.text.light,
          bg: COLORS.accent.red,
          name: "White text on red",
        },
        {
          text: COLORS.text.light,
          bg: COLORS.accent.blue,
          name: "White text on teal",
        },
      ];

      const results: Array<{ name: string; ratio: number; passes: boolean }> =
        [];

      criticalCombinations.forEach(({ text, bg, name }) => {
        const ratio = getContrastRatio(text, bg);
        const passes = ratio >= CONTRAST_REQUIREMENTS.normalText;
        results.push({ name, ratio, passes });

        expect(ratio).toBeGreaterThanOrEqual(CONTRAST_REQUIREMENTS.normalText);
        console.log(`${passes ? "✅" : "❌"} ${name}: ${ratio.toFixed(2)}:1`);
      });

      // All combinations should pass
      const allPass = results.every(result => result.passes);
      expect(allPass).toBe(true);

      console.log(`\n🎨 Color Accessibility Summary:`);
      console.log(`Total combinations tested: ${results.length}`);
      console.log(`Passing: ${results.filter(r => r.passes).length}`);
      console.log(`Pass rate: 100%`);
    });
  });
});
