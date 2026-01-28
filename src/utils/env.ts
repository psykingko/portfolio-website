/**
 * Environment Variables Configuration
 * Provides type-safe access to environment variables with validation
 */

// Client-side environment variables (prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  SITE_NAME:
    process.env.NEXT_PUBLIC_SITE_NAME ||
    "Ashish Singh - Full Stack & AI Developer",
  FORMSPREE_FORM_ID: process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID,
  EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
} as const;

// Server-side environment variables (only available in API routes and server components)
export const serverEnv = {
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || "singhashish9599@gmail.com",
} as const;

// Environment validation functions
export const validateClientEnv = () => {
  const errors: string[] = [];

  if (!clientEnv.SITE_URL) {
    errors.push("NEXT_PUBLIC_SITE_URL is required");
  }

  if (!clientEnv.SITE_NAME) {
    errors.push("NEXT_PUBLIC_SITE_NAME is required");
  }

  if (errors.length > 0) {
    throw new Error(
      `Client environment validation failed:\n${errors.join("\n")}`
    );
  }

  return clientEnv;
};

export const validateServerEnv = () => {
  const errors: string[] = [];

  if (!serverEnv.CONTACT_EMAIL) {
    errors.push("CONTACT_EMAIL is required");
  }

  if (errors.length > 0) {
    throw new Error(
      `Server environment validation failed:\n${errors.join("\n")}`
    );
  }

  return serverEnv;
};

// Utility functions for common environment checks
export const isDevelopment = () => process.env.NODE_ENV === "development";
export const isProduction = () => process.env.NODE_ENV === "production";
export const isTest = () => process.env.NODE_ENV === "test";

// Feature flags based on environment variables
export const features = {
  formspree: !!clientEnv.FORMSPREE_FORM_ID,
  emailjs: !!(
    clientEnv.EMAILJS_SERVICE_ID &&
    clientEnv.EMAILJS_TEMPLATE_ID &&
    clientEnv.EMAILJS_PUBLIC_KEY
  ),
  netlifyForms: false, // Will be detected at build time
} as const;

// SEO configuration based on environment
export const envSeoConfig = {
  title: clientEnv.SITE_NAME,
  description:
    "Full Stack & AI Developer specializing in React, Node.js, FastAPI, and NLP. Building scalable web applications and ML-powered systems.",
  url: clientEnv.SITE_URL,
  image: `${clientEnv.SITE_URL}/og-image.jpg`,
  keywords:
    "Full Stack Developer, AI Developer, React, Node.js, FastAPI, NLP, Machine Learning, Ashish Singh",
  author: "Ashish Singh",
  email: serverEnv.CONTACT_EMAIL,
  phone: "+91 9599717790",
} as const;

// Type exports
export type ClientEnv = typeof clientEnv;
export type ServerEnv = typeof serverEnv;
export type Features = typeof features;
export type SeoConfig = typeof envSeoConfig;
