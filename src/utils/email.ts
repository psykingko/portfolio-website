/**
 * Email Configuration and Utilities
 * Handles free email service configuration for the contact form
 */

import { clientEnv, serverEnv, features } from "./env";

// Email template configuration for different services
export const emailTemplates = {
  // For Formspree - they handle the email template
  formspree: {
    endpoint: `https://formspree.io/f/${clientEnv.FORMSPREE_FORM_ID}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },

  // For EmailJS - client-side email sending
  emailjs: {
    serviceId: clientEnv.EMAILJS_SERVICE_ID,
    templateId: clientEnv.EMAILJS_TEMPLATE_ID,
    publicKey: clientEnv.EMAILJS_PUBLIC_KEY,
  },

  // For Netlify Forms - handled by Netlify
  netlify: {
    // No configuration needed - just add netlify attribute to form
    formName: "contact",
  },
} as const;

// Contact form configuration
export const contactFormConfig = {
  // Determine which service to use based on available environment variables
  service: features.formspree
    ? "formspree"
    : features.emailjs
      ? "emailjs"
      : "netlify",

  // Form validation rules
  validation: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 5000,
    },
  },

  // Simple honeypot spam protection
  honeypot: {
    fieldName: "website", // Hidden field
    timeThreshold: 3000, // Minimum 3 seconds to fill form
  },
} as const;

// Email validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim()
    .substring(0, 5000); // Limit length
};

// Rate limiting configuration (simple client-side)
export const rateLimitConfig = {
  storageKey: "contact_form_submissions",
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 3, // Limit to 3 submissions per 15 minutes
  message: "Too many contact form submissions, please try again later.",
} as const;

// Form submission handlers for different services
export const submitHandlers = {
  formspree: async (data: { name: string; email: string; message: string }) => {
    const response = await fetch(emailTemplates.formspree.endpoint, {
      method: emailTemplates.formspree.method,
      headers: emailTemplates.formspree.headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _replyto: data.email,
        _subject: `Portfolio Contact: ${data.name}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return response.json();
  },

  emailjs: async (data: { name: string; email: string; message: string }) => {
    // EmailJS will be loaded dynamically when needed
    const emailjs = await import("@emailjs/browser");

    return emailjs.send(
      emailTemplates.emailjs.serviceId!,
      emailTemplates.emailjs.templateId!,
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_email: serverEnv.CONTACT_EMAIL,
      },
      emailTemplates.emailjs.publicKey
    );
  },

  netlify: async (data: { name: string; email: string; message: string }) => {
    // For Netlify Forms, we'll use a regular form submission
    // This is handled by the form component itself
    const formData = new FormData();
    formData.append("form-name", emailTemplates.netlify.formName);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return { success: true };
  },
} as const;

export type EmailService = keyof typeof emailTemplates;
export type ContactFormConfig = typeof contactFormConfig;
