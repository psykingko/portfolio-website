/**
 * Contact Form Tests
 * **Validates: Requirements US5**
 *
 * Tests the contact form functionality including validation, accessibility, and user interactions.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ContactSection from "../components/sections/ContactSection";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock email utilities
jest.mock("../utils/email", () => ({
  contactFormConfig: {
    service: "netlify",
    validation: {
      name: { required: true, minLength: 2, maxLength: 100 },
      email: { required: true },
      message: { required: true, minLength: 10, maxLength: 5000 },
    },
    honeypot: { fieldName: "website", timeThreshold: 3000 },
  },
  submitHandlers: {
    netlify: jest.fn().mockResolvedValue({ success: true }),
  },
  rateLimitConfig: {
    storageKey: "contact_form_submissions",
    windowMs: 15 * 60 * 1000,
    maxRequests: 3,
    message: "Too many submissions",
  },
}));

describe("ContactSection", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset all mocks
    jest.clearAllMocks();
  });

  describe("Form Rendering", () => {
    it("renders contact form with all required fields", () => {
      render(<ContactSection />);

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/attachment/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /send message/i })
      ).toBeInTheDocument();
    });

    it("renders contact information", () => {
      render(<ContactSection />);

      expect(screen.getByText("singhashish9599@gmail.com")).toBeInTheDocument();
      expect(screen.getByText("+91 9599717790")).toBeInTheDocument();
      expect(screen.getByText(/connect with me/i)).toBeInTheDocument();
      expect(screen.getByText(/view my work/i)).toBeInTheDocument();
    });

    it("has proper accessibility attributes", () => {
      render(<ContactSection />);

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("noValidate");

      const nameInput = screen.getByLabelText(/full name/i);
      expect(nameInput).toHaveAttribute("required");
      expect(nameInput).toHaveAttribute("autoComplete", "name");

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("autoComplete", "email");

      const messageTextarea = screen.getByLabelText(/message/i);
      expect(messageTextarea).toHaveAttribute("required");
    });
  });

  describe("Form Validation", () => {
    it("shows validation errors for empty required fields", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/name must be at least 2 characters/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/please enter a valid email address/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/message must be at least 10 characters/i)
        ).toBeInTheDocument();
      });
    });

    it("validates email format", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, "invalid-email");

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid email address/i)
        ).toBeInTheDocument();
      });
    });

    it("validates message length", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const messageTextarea = screen.getByLabelText(/message/i);
      await user.type(messageTextarea, "short");

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/message must be at least 10 characters/i)
        ).toBeInTheDocument();
      });
    });

    it("clears field errors when user starts typing", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      // Trigger validation errors
      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/name must be at least 2 characters/i)
        ).toBeInTheDocument();
      });

      // Start typing in name field
      const nameInput = screen.getByLabelText(/full name/i);
      await user.type(nameInput, "John");

      await waitFor(() => {
        expect(
          screen.queryByText(/name must be at least 2 characters/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Form Submission", () => {
    it("submits form with valid data", async () => {
      const user = userEvent.setup();
      const mockSubmitHandler =
        require("../utils/email").submitHandlers.netlify;

      render(<ContactSection />);

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      await user.type(
        screen.getByLabelText(/email address/i),
        "john@example.com"
      );
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message that is long enough."
      );

      // Submit the form
      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmitHandler).toHaveBeenCalledWith({
          name: "John Doe",
          email: "john@example.com",
          message: "This is a test message that is long enough.",
        });
      });
    });

    it("shows success message after successful submission", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      await user.type(
        screen.getByLabelText(/email address/i),
        "john@example.com"
      );
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message that is long enough."
      );

      // Submit the form
      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/message sent successfully/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/thank you for reaching out/i)
        ).toBeInTheDocument();
      });
    });

    it("shows loading state during submission", async () => {
      const user = userEvent.setup();
      const mockSubmitHandler =
        require("../utils/email").submitHandlers.netlify;

      // Make the submit handler take some time
      mockSubmitHandler.mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      );

      render(<ContactSection />);

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      await user.type(
        screen.getByLabelText(/email address/i),
        "john@example.com"
      );
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message that is long enough."
      );

      // Submit the form
      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      // Check for loading state
      expect(screen.getByText(/sending/i)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      // Wait for submission to complete
      await waitFor(() => {
        expect(
          screen.getByText(/message sent successfully/i)
        ).toBeInTheDocument();
      });
    });

    it("handles submission errors gracefully", async () => {
      const user = userEvent.setup();
      const mockSubmitHandler =
        require("../utils/email").submitHandlers.netlify;

      // Make the submit handler reject
      mockSubmitHandler.mockRejectedValue(new Error("Network error"));

      render(<ContactSection />);

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      await user.type(
        screen.getByLabelText(/email address/i),
        "john@example.com"
      );
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message that is long enough."
      );

      // Submit the form
      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility Features", () => {
    it("has proper ARIA labels and roles", () => {
      render(<ContactSection />);

      const section = screen.getByRole("region");
      expect(section).toHaveAttribute("aria-labelledby", "contact-heading");

      const heading = screen.getByRole("heading", { name: /get in touch/i });
      expect(heading).toHaveAttribute("id", "contact-heading");
    });

    it("associates error messages with form fields", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/full name/i);
        const errorMessage = screen.getByText(
          /name must be at least 2 characters/i
        );

        expect(nameInput).toHaveAttribute("aria-invalid", "true");
        expect(nameInput).toHaveAttribute("aria-describedby");
        expect(errorMessage).toHaveAttribute("role", "alert");
      });
    });

    it("has proper focus management", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email address/i);

      await user.tab();
      expect(nameInput).toHaveFocus();

      await user.tab();
      expect(emailInput).toHaveFocus();
    });
  });

  describe("Honeypot Protection", () => {
    it("includes hidden honeypot field", () => {
      render(<ContactSection />);

      const honeypotField = screen.getByLabelText(/website/i);
      expect(honeypotField).toBeInTheDocument();
      expect(honeypotField.closest(".sr-only")).toBeInTheDocument();
    });

    it("rejects submission if honeypot field is filled", async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      // Fill out the form including honeypot
      await user.type(screen.getByLabelText(/full name/i), "John Doe");
      await user.type(
        screen.getByLabelText(/email address/i),
        "john@example.com"
      );
      await user.type(
        screen.getByLabelText(/message/i),
        "This is a test message that is long enough."
      );

      // Fill honeypot field (this would be done by bots)
      const honeypotField = screen.getByLabelText(/website/i);
      await user.type(honeypotField, "spam");

      // Submit the form
      const submitButton = screen.getByRole("button", {
        name: /send message/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/submission blocked/i)).toBeInTheDocument();
      });
    });
  });
});
