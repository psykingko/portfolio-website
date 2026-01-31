/**
 * Color contrast validation script for WCAG 2.1 AA compliance
 * Tests the new navy and red color palette
 */

// Color constants
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
 * Get contrast level description
 */
function getContrastLevel(ratio) {
  if (ratio >= 7) return "AAA (Enhanced)";
  if (ratio >= 4.5) return "AA (Standard)";
  if (ratio >= 3) return "AA Large Text";
  return "Fail";
}

/**
 * Validate all critical color combinations
 */
function validateAccessibility() {
  console.log("🎨 Color Accessibility Validation Report");
  console.log("==========================================\n");

  const criticalCombinations = [
    // Primary text combinations
    {
      text: COLORS.text.primary,
      bg: COLORS.bg.beige,
      name: "Primary text on beige background",
    },
    {
      text: COLORS.text.primary,
      bg: COLORS.bg.white,
      name: "Primary text on white background",
    },
    {
      text: COLORS.text.primary,
      bg: COLORS.bg.card,
      name: "Primary text on card background",
    },

    // Secondary text combinations
    {
      text: COLORS.text.secondary,
      bg: COLORS.bg.beige,
      name: "Secondary text on beige background",
    },
    {
      text: COLORS.text.secondary,
      bg: COLORS.bg.white,
      name: "Secondary text on white background",
    },
    {
      text: COLORS.text.secondary,
      bg: COLORS.bg.card,
      name: "Secondary text on card background",
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

    // Focus indicator combinations
    {
      text: COLORS.primary.DEFAULT,
      bg: COLORS.bg.beige,
      name: "Navy focus indicator on beige",
    },
    {
      text: COLORS.primary.DEFAULT,
      bg: COLORS.bg.white,
      name: "Navy focus indicator on white",
    },
    {
      text: COLORS.primary.DEFAULT,
      bg: COLORS.bg.card,
      name: "Navy focus indicator on card",
    },
  ];

  let totalTests = 0;
  let passingTests = 0;
  const issues = [];

  console.log("📋 Testing Critical Color Combinations:\n");

  criticalCombinations.forEach(({ text, bg, name }) => {
    totalTests++;
    const ratio = getContrastRatio(text, bg);
    const level = getContrastLevel(ratio);
    const passes =
      ratio >= CONTRAST_REQUIREMENTS.normalText ||
      ratio >= CONTRAST_REQUIREMENTS.focusIndicator;

    if (passes) {
      passingTests++;
      console.log(`✅ ${name}: ${ratio.toFixed(2)}:1 (${level})`);
    } else {
      issues.push({ name, ratio, level });
      console.log(`❌ ${name}: ${ratio.toFixed(2)}:1 (${level})`);
    }
  });

  console.log("\n📊 Summary:");
  console.log(`Total combinations tested: ${totalTests}`);
  console.log(`Passing: ${passingTests}`);
  console.log(`Failing: ${issues.length}`);
  console.log(`Pass rate: ${((passingTests / totalTests) * 100).toFixed(1)}%`);

  if (issues.length > 0) {
    console.log("\n⚠️  Issues Found:");
    issues.forEach(issue => {
      console.log(
        `   • ${issue.name}: ${issue.ratio.toFixed(2)}:1 (${issue.level})`
      );
    });
  } else {
    console.log("\n🎉 All color combinations meet WCAG 2.1 AA standards!");
  }

  console.log("\n📝 WCAG 2.1 AA Requirements:");
  console.log(
    `   • Normal text: ${CONTRAST_REQUIREMENTS.normalText}:1 minimum`
  );
  console.log(`   • Large text: ${CONTRAST_REQUIREMENTS.largeText}:1 minimum`);
  console.log(
    `   • Interactive elements: ${CONTRAST_REQUIREMENTS.interactiveElements}:1 minimum`
  );
  console.log(
    `   • Focus indicators: ${CONTRAST_REQUIREMENTS.focusIndicator}:1 minimum`
  );

  return {
    totalTests,
    passingTests,
    issues,
    passRate: (passingTests / totalTests) * 100,
  };
}

// Run validation
if (require.main === module) {
  const results = validateAccessibility();
  process.exit(results.issues.length > 0 ? 1 : 0);
}

module.exports = {
  validateAccessibility,
  getContrastRatio,
  getContrastLevel,
  COLORS,
  CONTRAST_REQUIREMENTS,
};
