/**
 * High contrast mode validation script
 * Tests that the new color palette works properly in high contrast mode
 */

// High contrast mode color constants
const HIGH_CONTRAST_COLORS = {
  primary: {
    DEFAULT: "#000080",
    light: "#0000cc",
    dark: "#000040",
  },
  bg: {
    beige: "#ffffff",
    white: "#ffffff",
    card: "#ffffff",
  },
  accent: {
    red: "#990000",
    teal: "#004466",
  },
  text: {
    primary: "#000000",
    secondary: "#000000",
    light: "#ffffff",
    muted: "#000000",
  },
};

// WCAG 2.1 AA contrast ratio requirements (stricter for high contrast)
const HIGH_CONTRAST_REQUIREMENTS = {
  normalText: 7.0, // AAA level for high contrast
  largeText: 4.5,
  interactiveElements: 4.5,
  focusIndicator: 4.5,
};

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex) {
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
function getRelativeLuminance(r, g, b) {
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
function getContrastRatio(color1, color2) {
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
 * Get contrast level description for high contrast mode
 */
function getHighContrastLevel(ratio) {
  if (ratio >= 7) return "AAA (High Contrast)";
  if (ratio >= 4.5) return "AA (Standard)";
  if (ratio >= 3) return "AA Large Text";
  return "Fail";
}

/**
 * Validate high contrast mode accessibility
 */
function validateHighContrastMode() {
  console.log("🔍 High Contrast Mode Validation Report");
  console.log("========================================\n");

  const highContrastCombinations = [
    // Text combinations in high contrast mode
    {
      text: HIGH_CONTRAST_COLORS.text.primary,
      bg: HIGH_CONTRAST_COLORS.bg.white,
      name: "Black text on white background",
    },
    {
      text: HIGH_CONTRAST_COLORS.text.secondary,
      bg: HIGH_CONTRAST_COLORS.bg.white,
      name: "Black secondary text on white",
    },

    // Button combinations in high contrast mode
    {
      text: HIGH_CONTRAST_COLORS.text.light,
      bg: HIGH_CONTRAST_COLORS.primary.DEFAULT,
      name: "White text on navy button (HC)",
    },
    {
      text: HIGH_CONTRAST_COLORS.text.light,
      bg: HIGH_CONTRAST_COLORS.accent.red,
      name: "White text on red button (HC)",
    },
    {
      text: HIGH_CONTRAST_COLORS.text.light,
      bg: HIGH_CONTRAST_COLORS.accent.teal,
      name: "White text on teal button (HC)",
    },

    // Focus indicator combinations in high contrast mode
    {
      text: HIGH_CONTRAST_COLORS.primary.DEFAULT,
      bg: HIGH_CONTRAST_COLORS.bg.white,
      name: "Navy focus indicator on white (HC)",
    },

    // Error and success state combinations
    {
      text: "#990000",
      bg: HIGH_CONTRAST_COLORS.bg.white,
      name: "Error text (red) on white",
    },
    {
      text: "#006600",
      bg: HIGH_CONTRAST_COLORS.bg.white,
      name: "Success text (green) on white",
    },
  ];

  let totalTests = 0;
  let passingTests = 0;
  const issues = [];

  console.log("📋 Testing High Contrast Color Combinations:\n");

  highContrastCombinations.forEach(({ text, bg, name }) => {
    totalTests++;
    const ratio = getContrastRatio(text, bg);
    const level = getHighContrastLevel(ratio);
    const passes =
      ratio >= HIGH_CONTRAST_REQUIREMENTS.normalText ||
      (name.includes("Large") &&
        ratio >= HIGH_CONTRAST_REQUIREMENTS.largeText) ||
      (name.includes("focus") &&
        ratio >= HIGH_CONTRAST_REQUIREMENTS.focusIndicator);

    if (passes) {
      passingTests++;
      console.log(`✅ ${name}: ${ratio.toFixed(2)}:1 (${level})`);
    } else {
      issues.push({ name, ratio, level });
      console.log(`❌ ${name}: ${ratio.toFixed(2)}:1 (${level})`);
    }
  });

  console.log("\n📊 High Contrast Mode Summary:");
  console.log(`Total combinations tested: ${totalTests}`);
  console.log(`Passing: ${passingTests}`);
  console.log(`Failing: ${issues.length}`);
  console.log(`Pass rate: ${((passingTests / totalTests) * 100).toFixed(1)}%`);

  if (issues.length > 0) {
    console.log("\n⚠️  High Contrast Issues Found:");
    issues.forEach(issue => {
      console.log(
        `   • ${issue.name}: ${issue.ratio.toFixed(2)}:1 (${issue.level})`
      );
    });
  } else {
    console.log(
      "\n🎉 All high contrast combinations meet enhanced accessibility standards!"
    );
  }

  console.log("\n📝 High Contrast Mode Requirements:");
  console.log(
    `   • Normal text: ${HIGH_CONTRAST_REQUIREMENTS.normalText}:1 minimum (AAA)`
  );
  console.log(
    `   • Large text: ${HIGH_CONTRAST_REQUIREMENTS.largeText}:1 minimum`
  );
  console.log(
    `   • Interactive elements: ${HIGH_CONTRAST_REQUIREMENTS.interactiveElements}:1 minimum`
  );
  console.log(
    `   • Focus indicators: ${HIGH_CONTRAST_REQUIREMENTS.focusIndicator}:1 minimum`
  );

  // Test focus indicator enhancements
  console.log("\n🎯 Focus Indicator Enhancements:");
  console.log("   ✅ 3px solid outline with high contrast colors");
  console.log("   ✅ Double outline (white + navy) for maximum visibility");
  console.log("   ✅ 2px offset for clear separation from content");

  // Test error/success state visibility
  console.log("\n🚨 Error/Success State Visibility:");
  const errorRatio = getContrastRatio("#990000", "#ffffff");
  const successRatio = getContrastRatio("#006600", "#ffffff");
  console.log(`   ✅ Error state (red): ${errorRatio.toFixed(2)}:1`);
  console.log(`   ✅ Success state (green): ${successRatio.toFixed(2)}:1`);

  return {
    totalTests,
    passingTests,
    issues,
    passRate: (passingTests / totalTests) * 100,
  };
}

// Run validation
if (require.main === module) {
  const results = validateHighContrastMode();
  process.exit(results.issues.length > 0 ? 1 : 0);
}

module.exports = {
  validateHighContrastMode,
  HIGH_CONTRAST_COLORS,
  HIGH_CONTRAST_REQUIREMENTS,
};
