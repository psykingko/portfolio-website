"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContactForm } from "../../hooks/useContactForm";
import { formFieldConfig } from "../../schemas/contactForm";
import { CONTACT_INFO } from "../../utils/constants";
import FormField from "../ui/FormField";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import Card from "../ui/Card";
import ScrollReveal from "../animations/ScrollReveal";
import {
  HoverLift,
  HoverScale,
  InteractiveButton,
} from "../animations/MicroInteractions";
import SectionDivider from "../animations/SectionDivider";

interface ContactSectionProps {
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  const {
    formData,
    isSubmitting,
    isSuccess,
    error,
    fieldErrors,
    handleChange,
    handleSubmit,
    reset,
    clearError,
  } = useContactForm();

  return (
    <section
      id="contact"
      className={`section-padding bg-white ${className}`}
      aria-labelledby="contact-heading"
    >
      <div className="container-xl mx-auto px-6">
        <ScrollReveal direction="down" delay={0.1}>
          <div className="text-center mb-16">
            <h2 id="contact-heading" className="heading-lg text-primary mb-6">
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-accent-orange mx-auto rounded-full mb-6" />
            <p className="text-lead text-text-secondary max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your project and
              explore how we can work together.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="heading-md text-text-primary mb-6">
                  Let's Start a Conversation
                </h3>
                <p className="body-lg text-text-secondary mb-8">
                  Whether you have a project in mind, need technical
                  consultation, or just want to say hello, I'd love to hear from
                  you. I typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <ScrollReveal direction="fade" delay={0.4} stagger>
                  <HoverLift intensity="subtle">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">
                          Email
                        </p>
                        <HoverScale intensity="subtle">
                          <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="body-lg text-primary hover:text-primary-dark transition-colors"
                          >
                            {CONTACT_INFO.email}
                          </a>
                        </HoverScale>
                      </div>
                    </div>
                  </HoverLift>

                  <HoverLift intensity="subtle">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">
                          Phone
                        </p>
                        <HoverScale intensity="subtle">
                          <a
                            href={`tel:${CONTACT_INFO.phone}`}
                            className="body-lg text-primary hover:text-primary-dark transition-colors"
                          >
                            {CONTACT_INFO.phone}
                          </a>
                        </HoverScale>
                      </div>
                    </div>
                  </HoverLift>

                  <HoverLift intensity="subtle">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">
                          LinkedIn
                        </p>
                        <HoverScale intensity="subtle">
                          <a
                            href={CONTACT_INFO.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="body-lg text-primary hover:text-primary-dark transition-colors"
                          >
                            Connect with me
                          </a>
                        </HoverScale>
                      </div>
                    </div>
                  </HoverLift>

                  <HoverLift intensity="subtle">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-secondary">
                          GitHub
                        </p>
                        <HoverScale intensity="subtle">
                          <a
                            href={CONTACT_INFO.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="body-lg text-primary hover:text-primary-dark transition-colors"
                          >
                            View my work
                          </a>
                        </HoverScale>
                      </div>
                    </div>
                  </HoverLift>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.3}>
            <HoverLift intensity="subtle">
              <Card className="p-8">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="heading-sm text-text-primary mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="body-md text-text-secondary mb-6">
                        Thank you for reaching out. I'll get back to you within
                        24 hours.
                      </p>
                      <InteractiveButton
                        variant="secondary"
                        onClick={reset}
                        aria-label="Send another message"
                      >
                        Send Another Message
                      </InteractiveButton>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                    >
                      <ScrollReveal stagger staggerDelay={0.1} delay={0.4}>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            label={formFieldConfig.name.label}
                            htmlFor="contact-name"
                            required={formFieldConfig.name.required}
                            error={fieldErrors.name}
                          >
                            <Input
                              type="text"
                              placeholder={formFieldConfig.name.placeholder}
                              value={formData.name}
                              onChange={e =>
                                handleChange("name", e.target.value)
                              }
                              autoComplete={formFieldConfig.name.autoComplete}
                              maxLength={formFieldConfig.name.maxLength}
                              disabled={isSubmitting}
                              variant={fieldErrors.name ? "error" : "default"}
                            />
                          </FormField>

                          <FormField
                            label={formFieldConfig.email.label}
                            htmlFor="contact-email"
                            required={formFieldConfig.email.required}
                            error={fieldErrors.email}
                          >
                            <Input
                              type={formFieldConfig.email.type}
                              placeholder={formFieldConfig.email.placeholder}
                              value={formData.email}
                              onChange={e =>
                                handleChange("email", e.target.value)
                              }
                              autoComplete={formFieldConfig.email.autoComplete}
                              maxLength={formFieldConfig.email.maxLength}
                              disabled={isSubmitting}
                              variant={fieldErrors.email ? "error" : "default"}
                            />
                          </FormField>
                        </div>

                        <FormField
                          label={formFieldConfig.message.label}
                          htmlFor="contact-message"
                          required={formFieldConfig.message.required}
                          error={fieldErrors.message}
                        >
                          <Textarea
                            placeholder={formFieldConfig.message.placeholder}
                            value={formData.message}
                            onChange={e =>
                              handleChange("message", e.target.value)
                            }
                            maxLength={formFieldConfig.message.maxLength}
                            rows={formFieldConfig.message.rows}
                            disabled={isSubmitting}
                            variant={fieldErrors.message ? "error" : "default"}
                          />
                        </FormField>

                        <FormField
                          label={formFieldConfig.file.label}
                          htmlFor="contact-file"
                          error={fieldErrors.file}
                          helpText={formFieldConfig.file.helpText}
                        >
                          <FileInput
                            accept={formFieldConfig.file.accept}
                            maxSize={formFieldConfig.file.maxSize}
                            value={formData.file || undefined}
                            onChange={file =>
                              handleChange("file", file || null)
                            }
                            disabled={isSubmitting}
                            aria-invalid={!!fieldErrors.file}
                          />
                        </FormField>
                      </ScrollReveal>

                      {/* Honeypot field - hidden from users */}
                      <div className="sr-only" aria-hidden="true">
                        <label htmlFor="contact-website">Website</label>
                        <input
                          id="contact-website"
                          type="text"
                          value={formData.website}
                          onChange={e =>
                            handleChange("website", e.target.value)
                          }
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-50 border border-red-200 rounded-lg"
                          role="alert"
                          aria-live="polite"
                        >
                          <div className="flex items-start">
                            <svg
                              className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <div className="flex-1">
                              <p className="text-sm text-red-800">{error}</p>
                              <button
                                type="button"
                                onClick={clearError}
                                className="mt-2 text-xs text-red-600 hover:text-red-800 underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex items-center justify-between pt-4">
                        <p className="text-xs text-text-secondary">
                          By submitting this form, you agree to be contacted
                          regarding your inquiry.
                        </p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-base btn-primary min-w-[120px]"
                          aria-describedby={error ? "form-error" : undefined}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <LoadingSpinner size="sm" className="mr-2" />
                              Sending...
                            </div>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </Card>
            </HoverLift>
          </ScrollReveal>
        </div>
      </div>

      {/* Section Divider */}
      <SectionDivider variant="gradient" color="#ffb3d9" />
    </section>
  );
};

export default ContactSection;
