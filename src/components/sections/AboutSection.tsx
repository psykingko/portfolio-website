"use client";

import React from "react";
import Card from "../ui/Card";
import { CONTACT_INFO } from "@/utils/constants";
import { cn } from "@/utils/cn";
import ScrollReveal from "../animations/ScrollReveal";
import { HoverLift, HoverScale } from "../animations/MicroInteractions";
import SectionDivider from "../animations/SectionDivider";

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={cn("section-padding bg-bg-peach", className)}
      aria-labelledby="about-heading"
    >
      <div className="container-xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <ScrollReveal direction="down" delay={0.1}>
            <div className="text-center mb-12">
              <h2 id="about-heading" className="heading-lg text-primary mb-4">
                About Me
              </h2>
              <div className="w-16 h-1 bg-accent-orange mx-auto rounded-full" />
            </div>
          </ScrollReveal>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Professional Summary - Takes 2 columns on large screens */}
            <ScrollReveal
              direction="left"
              delay={0.2}
              className="lg:col-span-2"
            >
              <HoverLift intensity="subtle">
                <Card className="h-full">
                  <h3 className="heading-sm text-primary mb-6">
                    Professional Summary
                  </h3>
                  <div className="space-y-6">
                    <ScrollReveal direction="fade" delay={0.4}>
                      <p className="body-lg text-text-primary leading-relaxed">
                        I am a{" "}
                        <strong className="text-primary">
                          Full Stack & AI Developer
                        </strong>{" "}
                        building scalable products at the intersection of Web &
                        AI.
                      </p>
                    </ScrollReveal>

                    <ScrollReveal direction="fade" delay={0.5}>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                          <p className="body-md text-text-primary">
                            <strong>Full Stack & AI Developer</strong> (MCA)
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                          <p className="body-md text-text-primary">
                            <strong>React, Node.js, FastAPI, NLP</strong>
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                          <p className="body-md text-text-primary">
                            Built{" "}
                            <strong>
                              sentiment analysis & analytics platforms
                            </strong>
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                          <p className="body-md text-text-primary">
                            Strong focus on{" "}
                            <strong>clean UI & scalable backend</strong>
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </Card>
              </HoverLift>
            </ScrollReveal>

            {/* Contact Information - Takes 1 column on large screens */}
            <ScrollReveal
              direction="right"
              delay={0.3}
              className="lg:col-span-1"
            >
              <HoverLift intensity="subtle">
                <Card className="h-full">
                  <h3 className="heading-sm text-primary mb-6">Get In Touch</h3>
                  <div className="space-y-4">
                    {/* Email */}
                    <ScrollReveal direction="fade" delay={0.5}>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 mt-1">
                          <svg
                            className="w-5 h-5 text-accent-orange"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <p className="body-sm text-text-secondary mb-1">
                            Email
                          </p>
                          <HoverScale intensity="subtle">
                            <a
                              href={`mailto:${CONTACT_INFO.email}`}
                              className="body-md text-primary hover:text-primary-light transition-colors duration-200 break-all"
                              aria-label={`Send email to ${CONTACT_INFO.email}`}
                            >
                              {CONTACT_INFO.email}
                            </a>
                          </HoverScale>
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Phone */}
                    <ScrollReveal direction="fade" delay={0.6}>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 mt-1">
                          <svg
                            className="w-5 h-5 text-accent-orange"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="body-sm text-text-secondary mb-1">
                            Phone
                          </p>
                          <HoverScale intensity="subtle">
                            <a
                              href={`tel:${CONTACT_INFO.phone}`}
                              className="body-md text-primary hover:text-primary-light transition-colors duration-200"
                              aria-label={`Call ${CONTACT_INFO.phone}`}
                            >
                              {CONTACT_INFO.phone}
                            </a>
                          </HoverScale>
                        </div>
                      </div>
                    </ScrollReveal>

                    {/* Social Links */}
                    <ScrollReveal direction="fade" delay={0.7}>
                      <div className="pt-4 border-t border-gray-200">
                        <p className="body-sm text-text-secondary mb-3">
                          Connect with me
                        </p>
                        <div className="flex space-x-4">
                          {/* LinkedIn */}
                          <HoverLift intensity="medium">
                            <a
                              href={CONTACT_INFO.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors duration-200"
                              aria-label="Visit LinkedIn profile"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </a>
                          </HoverLift>

                          {/* GitHub */}
                          <HoverLift intensity="medium">
                            <a
                              href={CONTACT_INFO.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-10 h-10 bg-text-primary text-white rounded-lg hover:bg-text-secondary transition-colors duration-200"
                              aria-label="Visit GitHub profile"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </a>
                          </HoverLift>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </Card>
              </HoverLift>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <SectionDivider variant="geometric" color="#5634d6" />
    </section>
  );
};

export default AboutSection;
