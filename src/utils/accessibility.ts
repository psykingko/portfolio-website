/**
 * Accessibility utilities for color contrast validation
 * Implements WCAG 2.1 AA contrast ratio requirements
 */

import { COLORS } from "./constants";

// WCAG 2.1 AA contrast ratio requirements
export const CONTRAST_REQUIREMENTS = {
  normalText: 4.5,
  largeText: 3.0,
  interactiveElements: 3.0,
  focusIndicator: 3.0,
  graphicalElements: 3.0,
} as const;

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
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
 * Based on WCAG 2.1 formula
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
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
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
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
 * Check if contrast ratio meets WCAG requirements
 */
export function meetsContrastRequirement(
  ratio: number,
  requirement: keyof typeof CONTRAST_REQUIREMENTS
): boolean {
  return ratio >= CONTRAST_REQUIREMENTS[requirement];
}

/**
 * Get contrast level description
 */
export function getContrastLevel(ratio: number): string {
  if (ratio >= 7) return "AAA (Enhanced)";
  if (ratio >= 4.5) return "AA (Standard)";
  if (ratio >= 3) return "AA Large Text";
  return "Fail";
}

/**
 * Validate all color combinations in the design system
 */
export interface ColorCombination {
  foreground: string;
  background: string;
  foregroundName: string;
  backgroundName: string;
  ratio: number;
  level: string;
  normalText: boolean;
  largeText: boolean;
  interactive: boolean;
}

export function validateAllColorCombinations(): ColorCombination[] {
  const combinations: ColorCombination[] = [];

  // Text colors on background colors
  const textColors = [
    { color: COLORS.text.primary, name: "text.primary" },
    { color: COLORS.text.secondary, name: "text.secondary" },
    { color: COLORS.text.light, name: "text.light" },
  ];

  const backgroundColors = [
    { color: COLORS.bg.beige, name: "bg.beige" },
    { color: COLORS.bg.white, name: "bg.white" },
    { color: COLORS.bg.card, name: "bg.card" },
    { color: COLORS.primary.DEFAULT, name: "primary.DEFAULT" },
    { color: COLORS.primary.light, name: "primary.light" },
    { color: COLORS.primary.dark, name: "primary.dark" },
    { color: COLORS.accent.red, name: "accent.red" },
    { color: COLORS.accent.blue, name: "accent.blue" },
  ];

  // Test all text/background combinations
  textColors.forEach(text => {
    backgroundColors.forEach(bg => {
      try {
        const ratio = getContrastRatio(text.color, bg.color);
        combinations.push({
          foreground: text.color,
          background: bg.color,
          foregroundName: text.name,
          backgroundName: bg.name,
          ratio,
          level: getContrastLevel(ratio),
          normalText: meetsContrastRequirement(ratio, "normalText"),
          largeText: meetsContrastRequirement(ratio, "largeText"),
          interactive: meetsContrastRequirement(ratio, "interactiveElements"),
        });
      } catch (error) {
        console.error(
          `Error calculating contrast for ${text.name} on ${bg.name}:`,
          error
        );
      }
    });
  });

  return combinations;
}

/**
 * Validate specific button color combinations
 */
export function validateButtonContrasts(): ColorCombination[] {
  const buttonCombinations: ColorCombination[] = [];

  // Primary button: white text on navy background
  const primaryButtonRatio = getContrastRatio(
    COLORS.text.light,
    COLORS.primary.DEFAULT
  );
  buttonCombinations.push({
    foreground: COLORS.text.light,
    background: COLORS.primary.DEFAULT,
    foregroundName: "Button Text (White)",
    backgroundName: "Primary Button (Navy)",
    ratio: primaryButtonRatio,
    level: getContrastLevel(primaryButtonRatio),
    normalText: meetsContrastRequirement(primaryButtonRatio, "normalText"),
    largeText: meetsContrastRequirement(primaryButtonRatio, "largeText"),
    interactive: meetsContrastRequirement(
      primaryButtonRatio,
      "interactiveElements"
    ),
  });

  // Red accent button: white text on red background
  const redButtonRatio = getContrastRatio(COLORS.text.light, COLORS.accent.red);
  buttonCombinations.push({
    foreground: COLORS.text.light,
    background: COLORS.accent.red,
    foregroundName: "Button Text (White)",
    backgroundName: "Red Accent Button",
    ratio: redButtonRatio,
    level: getContrastLevel(redButtonRatio),
    normalText: meetsContrastRequirement(redButtonRatio, "normalText"),
    largeText: meetsContrastRequirement(redButtonRatio, "largeText"),
    interactive: meetsContrastRequirement(
      redButtonRatio,
      "interactiveElements"
    ),
  });

  // Teal accent button: white text on teal background
  const tealButtonRatio = getContrastRatio(
    COLORS.text.light,
    COLORS.accent.blue
  );
  buttonCombinations.push({
    foreground: COLORS.text.light,
    background: COLORS.accent.blue,
    foregroundName: "Button Text (White)",
    backgroundName: "Teal Accent Button",
    ratio: tealButtonRatio,
    level: getContrastLevel(tealButtonRatio),
    normalText: meetsContrastRequirement(tealButtonRatio, "normalText"),
    largeText: meetsContrastRequirement(tealButtonRatio, "largeText"),
    interactive: meetsContrastRequirement(
      tealButtonRatio,
      "interactiveElements"
    ),
  });

  return buttonCombinations;
}

/**
 * Validate focus indicator visibility
 */
export function validateFocusIndicators(): ColorCombination[] {
  const focusCombinations: ColorCombination[] = [];

  // Focus outline (primary color) on different backgrounds
  const backgrounds = [
    { color: COLORS.bg.beige, name: "bg.beige" },
    { color: COLORS.bg.white, name: "bg.white" },
    { color: COLORS.bg.card, name: "bg.card" },
  ];

  backgrounds.forEach(bg => {
    const ratio = getContrastRatio(COLORS.primary.DEFAULT, bg.color);
    focusCombinations.push({
      foreground: COLORS.primary.DEFAULT,
      background: bg.color,
      foregroundName: "Focus Indicator (Navy)",
      backgroundName: bg.name,
      ratio,
      level: getContrastLevel(ratio),
      normalText: meetsContrastRequirement(ratio, "focusIndicator"),
      largeText: meetsContrastRequirement(ratio, "focusIndicator"),
      interactive: meetsContrastRequirement(ratio, "focusIndicator"),
    });
  });

  return focusCombinations;
}

/**
 * Generate accessibility report
 */
export interface AccessibilityReport {
  allCombinations: ColorCombination[];
  buttonContrasts: ColorCombination[];
  focusIndicators: ColorCombination[];
  summary: {
    total: number;
    passing: number;
    failing: number;
    passRate: number;
  };
  issues: ColorCombination[];
}

export function generateAccessibilityReport(): AccessibilityReport {
  const allCombinations = validateAllColorCombinations();
  const buttonContrasts = validateButtonContrasts();
  const focusIndicators = validateFocusIndicators();

  const allTests = [...allCombinations, ...buttonContrasts, ...focusIndicators];
  const passing = allTests.filter(combo => combo.normalText || combo.largeText);
  const failing = allTests.filter(
    combo => !combo.normalText && !combo.largeText
  );

  return {
    allCombinations,
    buttonContrasts,
    focusIndicators,
    summary: {
      total: allTests.length,
      passing: passing.length,
      failing: failing.length,
      passRate: (passing.length / allTests.length) * 100,
    },
    issues: failing,
  };
}

/**
 * Log accessibility report to console
 */
export function logAccessibilityReport(): void {
  const report = generateAccessibilityReport();

  console.group("🎨 Color Accessibility Report");
  console.log(`Total combinations tested: ${report.summary.total}`);
  console.log(
    `Passing: ${report.summary.passing} (${report.summary.passRate.toFixed(1)}%)`
  );
  console.log(`Failing: ${report.summary.failing}`);

  if (report.issues.length > 0) {
    console.group("❌ Issues Found:");
    report.issues.forEach(issue => {
      console.log(
        `${issue.foregroundName} on ${issue.backgroundName}: ${issue.ratio.toFixed(2)}:1 (${issue.level})`
      );
    });
    console.groupEnd();
  }

  console.group("✅ Button Contrasts:");
  report.buttonContrasts.forEach(button => {
    const status = button.normalText ? "✅" : "❌";
    console.log(
      `${status} ${button.backgroundName}: ${button.ratio.toFixed(2)}:1 (${button.level})`
    );
  });
  console.groupEnd();

  console.group("🎯 Focus Indicators:");
  report.focusIndicators.forEach(focus => {
    const status = focus.interactive ? "✅" : "❌";
    console.log(
      `${status} Focus on ${focus.backgroundName}: ${focus.ratio.toFixed(2)}:1 (${focus.level})`
    );
  });
  console.groupEnd();

  console.groupEnd();
}
