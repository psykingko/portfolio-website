/**
 * Contact Form Validation Schema
 * Uses Zod for type-safe form validation
 */

import { z } from "zod";

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/gif",
] as const;

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email address is too long"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),

  file: z
    .instanceof(File)
    .optional()
    .refine(
      file => !file || file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      file => !file || ACCEPTED_FILE_TYPES.includes(file.type as any),
      "File type not supported. Please upload PDF, DOC, DOCX, TXT, or image files"
    ),

  // Honeypot field for spam protection
  website: z.string().max(0, "This field should be empty"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Form field configurations for accessibility and validation
export const formFieldConfig = {
  name: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    autoComplete: "name",
    maxLength: 100,
  },
  email: {
    label: "Email Address",
    placeholder: "Enter your email address",
    required: true,
    autoComplete: "email",
    maxLength: 254,
    type: "email" as const,
  },
  message: {
    label: "Message",
    placeholder: "Tell me about your project or inquiry...",
    required: true,
    maxLength: 5000,
    rows: 6,
  },
  file: {
    label: "Attachment (Optional)",
    accept: ACCEPTED_FILE_TYPES.join(","),
    maxSize: MAX_FILE_SIZE,
    helpText: "Upload a file (PDF, DOC, DOCX, TXT, or image). Max size: 5MB",
  },
} as const;

// Error messages for better UX
export const errorMessages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be less than ${max} characters`,
  fileSize: "File size must be less than 5MB",
  fileType: "File type not supported",
  network: "Network error. Please try again.",
  server: "Server error. Please try again later.",
  spam: "Submission blocked. Please try again later.",
} as const;

export { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES };
