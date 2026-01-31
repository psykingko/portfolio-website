#!/usr/bin/env node

/**
 * Performance Check Script
 * Validates that the build meets performance requirements
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Checking Performance Optimizations...\n");

let hasErrors = false;
let hasWarnings = false;

// Check 1: Next.js Config
console.log("1️⃣  Checking Next.js configuration...");
try {
  const nextConfigPath = path.join(process.cwd(), "next.config.ts");
  const nextConfig = fs.readFileSync(nextConfigPath, "utf8");

  const checks = [
    {
      pattern: /reactStrictMode:\s*true/,
      message: "React Strict Mode enabled",
    },
    {
      pattern: /formats:\s*\[['"]image\/avif['"],\s*['"]image\/webp['"]\]/,
      message: "Modern image formats configured",
    },
    { pattern: /compress:\s*true/, message: "Compression enabled" },
    { pattern: /removeConsole/, message: "Console removal configured" },
  ];

  checks.forEach(({ pattern, message }) => {
    if (pattern.test(nextConfig)) {
      console.log(`   ✅ ${message}`);
    } else {
      console.log(`   ⚠️  ${message} - NOT FOUND`);
      hasWarnings = true;
    }
  });
} catch (error) {
  console.log("   ❌ Could not read next.config.ts");
  hasErrors = true;
}

// Check 2: Font Optimization
console.log("\n2️⃣  Checking font optimization...");
try {
  const layoutPath = path.join(process.cwd(), "src/app/layout.tsx");
  const layout = fs.readFileSync(layoutPath, "utf8");

  if (layout.includes('display: "swap"')) {
    console.log("   ✅ Font display swap enabled");
  } else {
    console.log("   ⚠️  Font display swap not found");
    hasWarnings = true;
  }

  if (layout.includes("preload: true")) {
    console.log("   ✅ Font preloading enabled");
  } else {
    console.log("   ⚠️  Font preloading not found");
    hasWarnings = true;
  }

  if (layout.includes("preconnect")) {
    console.log("   ✅ DNS preconnect configured");
  } else {
    console.log("   ⚠️  DNS preconnect not found");
    hasWarnings = true;
  }
} catch (error) {
  console.log("   ❌ Could not read layout.tsx");
  hasErrors = true;
}

// Check 3: Image Optimization
console.log("\n3️⃣  Checking image optimization...");
try {
  const optimizedImagePath = path.join(
    process.cwd(),
    "src/components/ui/OptimizedImage.tsx"
  );
  if (fs.existsSync(optimizedImagePath)) {
    console.log("   ✅ OptimizedImage component exists");

    const content = fs.readFileSync(optimizedImagePath, "utf8");
    if (content.includes('loading="lazy"')) {
      console.log("   ✅ Lazy loading implemented");
    }
    if (content.includes("quality={85}")) {
      console.log("   ✅ Image quality optimized");
    }
  } else {
    console.log("   ⚠️  OptimizedImage component not found");
    hasWarnings = true;
  }
} catch (error) {
  console.log("   ❌ Error checking image optimization");
  hasErrors = true;
}

// Check 4: CSS Optimizations
console.log("\n4️⃣  Checking CSS optimizations...");
try {
  const globalsPath = path.join(process.cwd(), "src/app/globals.css");
  const globals = fs.readFileSync(globalsPath, "utf8");

  if (globals.includes("content-visibility")) {
    console.log("   ✅ Content visibility optimization present");
  } else {
    console.log("   ⚠️  Content visibility not found");
    hasWarnings = true;
  }

  if (globals.includes("will-change")) {
    console.log("   ✅ GPU acceleration hints present");
  } else {
    console.log("   ⚠️  GPU acceleration hints not found");
    hasWarnings = true;
  }

  if (globals.includes("prefers-reduced-motion")) {
    console.log("   ✅ Reduced motion support present");
  } else {
    console.log("   ❌ Reduced motion support missing");
    hasErrors = true;
  }
} catch (error) {
  console.log("   ❌ Could not read globals.css");
  hasErrors = true;
}

// Check 5: Performance Monitoring
console.log("\n5️⃣  Checking performance monitoring...");
try {
  const perfMonitorPath = path.join(
    process.cwd(),
    "src/components/PerformanceMonitor.tsx"
  );
  if (fs.existsSync(perfMonitorPath)) {
    console.log("   ✅ PerformanceMonitor component exists");

    const content = fs.readFileSync(perfMonitorPath, "utf8");
    if (content.includes("PerformanceObserver")) {
      console.log("   ✅ Web Vitals monitoring implemented");
    }
  } else {
    console.log("   ⚠️  PerformanceMonitor component not found");
    hasWarnings = true;
  }
} catch (error) {
  console.log("   ⚠️  Could not check performance monitoring");
  hasWarnings = true;
}

// Check 6: Build Output Size (if .next exists)
console.log("\n6️⃣  Checking build output...");
const nextDir = path.join(process.cwd(), ".next");
if (fs.existsSync(nextDir)) {
  console.log("   ✅ Build directory exists");

  // Check for static optimization
  const buildManifest = path.join(nextDir, "build-manifest.json");
  if (fs.existsSync(buildManifest)) {
    console.log("   ✅ Build manifest generated");
  }
} else {
  console.log("   ℹ️  No build found (run npm run build first)");
}

// Summary
console.log("\n" + "=".repeat(50));
console.log("📊 Performance Check Summary\n");

if (hasErrors) {
  console.log("❌ FAILED - Critical issues found");
  console.log("   Please fix the errors above before deploying.\n");
  process.exit(1);
} else if (hasWarnings) {
  console.log("⚠️  PASSED WITH WARNINGS");
  console.log("   Consider addressing the warnings for optimal performance.\n");
  process.exit(0);
} else {
  console.log("✅ ALL CHECKS PASSED");
  console.log("   Your site is optimized for maximum performance!\n");
  process.exit(0);
}
