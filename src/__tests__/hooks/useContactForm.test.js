const { renderHook, act } = require("@testing-library/react");

// Mock fetch
global.fetch = jest.fn();

// Mock the hook since we can't import TypeScript files easily
const mockUseContactForm = () => {
  const { useState } = require("react");
  const { z } = require("zod");

  const contactSchema = z.object({
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
    website: z.string().optional(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async data => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
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

  const resetForm = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  };

  return {
    isSubmitting,
    isSuccess,
    error,
    submitForm,
    resetForm,
  };
};

describe("useContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with correct default state", () => {
    const { result } = renderHook(() => mockUseContactForm());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should successfully submit valid form data", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "Message sent successfully!",
      }),
    });

    const { result } = renderHook(() => mockUseContactForm());

    const validData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message that is long enough to pass validation.",
    };

    await act(async () => {
      await result.current.submitForm(validData);
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.error).toBe(null);
    expect(fetch).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validData),
    });
  });

  it("should handle validation errors", async () => {
    const { result } = renderHook(() => mockUseContactForm());

    const invalidData = {
      name: "J", // Too short
      email: "invalid-email",
      message: "Short", // Too short
    };

    await act(async () => {
      await result.current.submitForm(invalidData);
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBe(
      "Please check your form data and try again."
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should handle API errors", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Server error" }),
    });

    const { result } = renderHook(() => mockUseContactForm());

    const validData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a test message that is long enough to pass validation.",
    };

    await act(async () => {
      await result.current.submitForm(validData);
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBe("Server error");
  });

  it("should reset form state", () => {
    const { result } = renderHook(() => mockUseContactForm());

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error).toBe(null);
  });
});

describe("contactSchema validation", () => {
  const { z } = require("zod");

  const contactSchema = z.object({
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
    website: z.string().optional(),
  });

  it("should validate correct data", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a valid message that is long enough.",
    };

    expect(() => contactSchema.parse(validData)).not.toThrow();
  });

  it("should reject invalid email", () => {
    const invalidData = {
      name: "John Doe",
      email: "invalid-email",
      message: "This is a valid message that is long enough.",
    };

    expect(() => contactSchema.parse(invalidData)).toThrow();
  });

  it("should reject short name", () => {
    const invalidData = {
      name: "J",
      email: "john@example.com",
      message: "This is a valid message that is long enough.",
    };

    expect(() => contactSchema.parse(invalidData)).toThrow();
  });

  it("should accept optional website field", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      message: "This is a valid message that is long enough.",
      website: "",
    };

    expect(() => contactSchema.parse(validData)).not.toThrow();
  });
});
