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
import SectionHeader from "../ui/SectionHeader";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ContactSectionProps {
  className?: string;
}

interface ContactOptionProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  href?: string;
}

const ContactOption: React.FC<ContactOptionProps> = ({
  icon,
  label,
  value,
  href,
}) => (
  <HoverScale intensity="subtle">
    <a
      href={href || `mailto:${value}`}
      className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <span className="body-sm font-medium">{label}</span>
    </a>
  </HoverScale>
);

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  const { prefersReducedMotion } = useReducedMotion();
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
        <SectionHeader
          id="contact-heading"
          title="Get In Touch"
          subtitle="Ready to bring your ideas to life?"
          underlineColor="#1b2651"
          underlineWidth="130px"
        />

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <ScrollReveal direction="left" delay={0.1}>
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

              {/* Compact contact options */}
              <div className="flex flex-wrap gap-6">
                <ContactOption
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  label="Email"
                  value={CONTACT_INFO.email}
                />
                <ContactOption
                  icon={
                    <svg
                      className="w-5 h-5"
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
                  }
                  label="Phone"
                  value={CONTACT_INFO.phone}
                  href={`tel:${CONTACT_INFO.phone}`}
                />
                <ContactOption
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  }
                  label="LinkedIn"
                  href={CONTACT_INFO.linkedin}
                />
                <ContactOption
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  label="GitHub"
                  href={CONTACT_INFO.github}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.15}>
            <HoverLift intensity="subtle">
              <Card className="p-6 max-w-xl mx-auto border border-gray-100 shadow-sm">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, scale: 0.95 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, scale: 0.95 }
                      }
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
                      initial={
                        prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }
                      }
                      animate={{ opacity: 1 }}
                      exit={
                        prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }
                      }
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      noValidate
                    >
                      <ScrollReveal stagger staggerDelay={0.05} delay={0.2}>
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
                          initial={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 0, y: -10 }
                          }
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
      <SectionDivider variant="geometric" color="#1b2651" />
    </section>
  );
};

export default ContactSection;
