#!/usr/bin/env node

/**
 * Pre-Deployment Verification Script
 * Run this before deploying to Vercel to catch common issues
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Verifying deployment readiness...\n");

let hasErrors = false;
let hasWarnings = false;

// Check 1: Environment files
console.log("📋 Checking environment files...");
const envLocalExists = fs.existsSync(".env.local");
const envExampleExists = fs.existsSync(".env.example");

if (!envLocalExists) {
  console.log("  ❌ .env.local not found");
  hasErrors = true;
} else {
  console.log("  ✅ .env.local exists");

  // Check if .env.local has required variables
  const envContent = fs.readFileSync(".env.local", "utf8");
  const requiredVars = [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_SITE_NAME",
    "CONTACT_EMAIL",
    "RESEND_API_KEY",
  ];

  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`  ✅ ${varName} found`);
    } else {
      console.log(`  ❌ ${varName} missing`);
      hasErrors = true;
    }
  });
}

if (!envExampleExists) {
  console.log("  ⚠️  .env.example not found");
  hasWarnings = true;
} else {
  console.log("  ✅ .env.example exists");
}

// Check 2: Resume PDF
console.log("\n📄 Checking resume PDF...");
const resumePath = path.join("public", "Ashish_singh_resume.pdf");
if (fs.existsSync(resumePath)) {
  console.log("  ✅ Resume PDF found");
} else {
  console.log("  ⚠️  Resume PDF not found at public/Ashish_singh_resume.pdf");
  hasWarnings = true;
}

// Check 3: Project images
console.log("\n🖼️  Checking project images...");
const projectsDir = path.join("public", "projects");
if (fs.existsSync(projectsDir)) {
  const images = fs
    .readdirSync(projectsDir)
    .filter(
      f => f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".webp")
    );
  console.log(`  ✅ Found ${images.length} project images`);
  if (images.length === 0) {
    console.log("  ⚠️  No images found in public/projects");
    hasWarnings = true;
  }
} else {
  console.log("  ⚠️  public/projects directory not found");
  hasWarnings = true;
}

// Check 4: Package.json scripts
console.log("\n📦 Checking package.json scripts...");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const requiredScripts = ["dev", "build", "start", "lint"];

requiredScripts.forEach(script => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`  ✅ Script "${script}" found`);
  } else {
    console.log(`  ❌ Script "${script}" missing`);
    hasErrors = true;
  }
});

// Check 5: Vercel configuration
console.log("\n⚙️  Checking Vercel configuration...");
if (fs.existsSync("vercel.json")) {
  console.log("  ✅ vercel.json found");
} else {
  console.log("  ⚠️  vercel.json not found (optional)");
  hasWarnings = true;
}

// Check 6: .gitignore
console.log("\n🔒 Checking .gitignore...");
if (fs.existsSync(".gitignore")) {
  const gitignoreContent = fs.readFileSync(".gitignore", "utf8");
  if (
    gitignoreContent.includes(".env.local") ||
    gitignoreContent.includes(".env*.local")
  ) {
    console.log("  ✅ .env.local is ignored");
  } else {
    console.log("  ❌ .env.local is NOT ignored - SECURITY RISK!");
    hasErrors = true;
  }
} else {
  console.log("  ❌ .gitignore not found");
  hasErrors = true;
}

// Check 7: Node modules
console.log("\n📚 Checking dependencies...");
if (fs.existsSync("node_modules")) {
  console.log("  ✅ node_modules exists");
} else {
  console.log("  ⚠️  node_modules not found - run npm install");
  hasWarnings = true;
}

// Check 8: Build test
console.log("\n🏗️  Build verification...");
console.log('  ℹ️  Run "npm run build" to verify build works');

// Summary
console.log("\n" + "=".repeat(50));
console.log("📊 VERIFICATION SUMMARY");
console.log("=".repeat(50));

if (hasErrors) {
  console.log("\n❌ ERRORS FOUND - Fix these before deploying:");
  console.log("   - Check the error messages above");
  console.log("   - Fix all ❌ items");
  console.log("   - Run this script again");
  process.exit(1);
} else if (hasWarnings) {
  console.log("\n⚠️  WARNINGS FOUND - Review these items:");
  console.log("   - Check the warning messages above");
  console.log("   - These are optional but recommended");
  console.log("\n✅ No critical errors - you can proceed with deployment");
  process.exit(0);
} else {
  console.log("\n✅ ALL CHECKS PASSED!");
  console.log("\n🚀 Your portfolio is ready for deployment!");
  console.log("\nNext steps:");
  console.log("  1. Run: npm run build (to verify build works)");
  console.log("  2. Push to GitHub: git push origin main");
  console.log("  3. Deploy to Vercel: Follow QUICK_START_VERCEL.md");
  console.log("\n📚 Deployment guides:");
  console.log("  - Quick Start: QUICK_START_VERCEL.md");
  console.log("  - Full Guide: VERCEL_DEPLOYMENT_GUIDE.md");
  console.log("  - Checklist: DEPLOYMENT_CHECKLIST.md");
  process.exit(0);
}
