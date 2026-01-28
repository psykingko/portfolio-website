import { useState, FormEvent } from "react";
import { z } from "zod";

// Contact form validation schema (matches API)
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message too long"),
  // Honeypot field for spam protection (hidden from users)
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface FormData {
  name: string;
  email: string;
  message: string;
  file?: File | null;
  website: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
  file?: string;
}

interface UseContactFormReturn {
  formData: FormData;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  fieldErrors: FieldErrors;
  handleChange: (field: keyof FormData, value: string | File | null) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  reset: () => void;
  clearError: () => void;
  submitForm: (data: ContactFormData) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  file: null,
  website: "",
};

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validateField = (
    field: keyof FormData,
    value: string
  ): string | undefined => {
    try {
      switch (field) {
        case "name":
          contactSchema.shape.name.parse(value);
          break;
        case "email":
          contactSchema.shape.email.parse(value);
          break;
        case "message":
          contactSchema.shape.message.parse(value);
          break;
        default:
          break;
      }
      return undefined;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return err.errors[0]?.message;
      }
      return undefined;
    }
  };

  const handleChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (fieldErrors[field as keyof FieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Validate field if it's a string field
    if (
      typeof value === "string" &&
      (field === "name" || field === "email" || field === "message")
    ) {
      const fieldError = validateField(field, value);
      if (fieldError) {
        setFieldErrors(prev => ({ ...prev, [field]: fieldError }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const errors: FieldErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else {
      const nameError = validateField("name", formData.name);
      if (nameError) errors.name = nameError;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailError = validateField("email", formData.email);
      if (emailError) errors.email = emailError;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else {
      const messageError = validateField("message", formData.message);
      if (messageError) errors.message = messageError;
    }

    setFieldErrors(errors);

    // If there are validation errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Submit the form
    await submitForm({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      website: formData.website,
    });
  };

  const submitForm = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Validate data on client side
      const validatedData = contactSchema.parse(data);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSuccess(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("Please check your form data and try again.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setFormData(initialFormData);
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
    setFieldErrors({});
  };

  const resetForm = () => {
    reset();
  };

  const clearError = () => {
    setError(null);
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    error,
    fieldErrors,
    handleChange,
    handleSubmit,
    reset,
    clearError,
    submitForm,
    resetForm,
  };
}
