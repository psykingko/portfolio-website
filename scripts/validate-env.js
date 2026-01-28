#!/usr/bin/env node

/**
 * Environment Validation Script
 * Validates that environment variables are properly configured
 */

const fs = require("fs");
const path = require("path");

// Colors for console output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath) {
  return fs.existsSync(path.join(__dirname, "..", filePath));
}

function validateEnvironmentFiles() {
  log("\n🔍 Validating Environment Configuration...", "blue");

  const files = [
    {
      path: ".env",
      required: true,
      description: "Base environment configuration",
    },
    {
      path: ".env.example",
      required: true,
      description: "Example environment file",
    },
    {
      path: ".env.development",
      required: true,
      description: "Development environment template",
    },
    {
      path: ".env.test",
      required: true,
      description: "Test environment configuration",
    },
    {
      path: ".env.staging",
      required: true,
      description: "Staging environment template",
    },
    {
      path: ".env.production",
      required: true,
      description: "Production environment template",
    },
    {
      path: ".env.local",
      required: false,
      description: "Local development environment (overrides all)",
    },
  ];

  let allValid = true;

  files.forEach(file => {
    const exists = checkFileExists(file.path);
    if (file.required && !exists) {
      log(
        `❌ Missing required file: ${file.path} (${file.description})`,
        "red"
      );
      allValid = false;
    } else if (exists) {
      log(`✅ Found: ${file.path} (${file.description})`, "green");
    } else {
      log(
        `⚠️  Optional file not found: ${file.path} (${file.description})`,
        "yellow"
      );
    }
  });

  return allValid;
}

function validateEnvironmentVariables() {
  log("\n🔧 Validating Environment Variables...", "blue");

  // Load environment variables
  require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

  const requiredVars = [
    { name: "NEXT_PUBLIC_SITE_URL", description: "Site URL for SEO and links" },
    { name: "NEXT_PUBLIC_SITE_NAME", description: "Site name for branding" },
    {
      name: "CONTACT_EMAIL",
      description: "Email for receiving contact form submissions",
    },
  ];

  const optionalVars = [
    {
      name: "NEXT_PUBLIC_FORMSPREE_FORM_ID",
      description: "Formspree form ID for contact form",
    },
    {
      name: "NEXT_PUBLIC_EMAILJS_SERVICE_ID",
      description: "EmailJS service ID",
    },
    {
      name: "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID",
      description: "EmailJS template ID",
    },
    {
      name: "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
      description: "EmailJS public key",
    },
  ];

  let allValid = true;

  // Check required variables
  requiredVars.forEach(variable => {
    const value = process.env[variable.name];
    if (!value) {
      log(
        `❌ Missing required variable: ${variable.name} (${variable.description})`,
        "red"
      );
      allValid = false;
    } else {
      log(
        `✅ Found: ${variable.name} = ${value.substring(0, 20)}${value.length > 20 ? "..." : ""}`,
        "green"
      );
    }
  });

  // Check optional variables
  optionalVars.forEach(variable => {
    const value = process.env[variable.name];
    if (value) {
      log(
        `✅ Found optional: ${variable.name} = ${value.substring(0, 20)}${value.length > 20 ? "..." : ""}`,
        "green"
      );
    } else {
      log(
        `⚠️  Optional variable not set: ${variable.name} (${variable.description})`,
        "yellow"
      );
    }
  });

  return allValid;
}

function validateFeatureFlags() {
  log("\n🎛️  Feature Flags Status...", "blue");

  const features = {
    formspree: !!process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID,
    emailjs: !!(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ),
    netlifyForms: false, // Detected at build time
  };

  Object.entries(features).forEach(([feature, enabled]) => {
    const status = enabled ? "✅ ENABLED" : "❌ DISABLED";
    const color = enabled ? "green" : "yellow";
    log(`${status}: ${feature}`, color);
  });
}

function main() {
  log("🚀 Portfolio Website Environment Validation", "blue");
  log("=".repeat(50), "blue");

  const filesValid = validateEnvironmentFiles();

  if (checkFileExists(".env.local")) {
    validateEnvironmentVariables();
    validateFeatureFlags();
  } else {
    log(
      "\n⚠️  .env.local not found. Create it from .env.example to test environment variables.",
      "yellow"
    );
  }

  log("\n📋 Summary:", "blue");
  if (filesValid) {
    log("✅ Environment configuration files are properly set up!", "green");
    log("💡 Next steps:", "blue");
    log("   1. Copy .env.example to .env.local", "reset");
    log("   2. Fill in your actual API keys and configuration", "reset");
    log("   3. Run this script again to validate your configuration", "reset");
  } else {
    log("❌ Some required environment files are missing.", "red");
    log("Please ensure all required files are created.", "red");
  }
}

// Install dotenv if not available
try {
  require("dotenv");
} catch (error) {
  log("Installing dotenv for environment validation...", "yellow");
  require("child_process").execSync("npm install dotenv --save-dev", {
    stdio: "inherit",
  });
}

main();
