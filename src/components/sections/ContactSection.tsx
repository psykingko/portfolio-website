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
import SketchUnderline from "../animations/SketchUnderline";

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
        <ScrollReveal direction="down" delay={0.05}>
          <div className="text-center mb-16">
            <h2 id="contact-heading" className="heading-lg text-primary mb-6">
              Get In Touch
            </h2>
            <SketchUnderline color="#1b2651" width="130px" className="mb-6" />
            <p className="text-lead text-text-secondary max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your project and
              explore how we can work together.
            </p>
          </div>
        </ScrollReveal>

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

              <div className="space-y-6">
                <ScrollReveal direction="fade" delay={0.15} stagger>
                  <HoverLift intensity="subtle">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        ✉
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
                      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        ☎
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
                      <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        in
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
                      <div className="flex-shrink-0 w-12 h-12 bg-text-primary rounded-lg flex items-center justify-center text-white text-xl font-bold">
                        &lt;/&gt;
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
          <ScrollReveal direction="right" delay={0.15}>
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
      <SectionDivider variant="geometric" color="#1b2651" />
    </section>
  );
};

export default ContactSection;
