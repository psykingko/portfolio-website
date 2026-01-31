"use client";

import React from "react";
import Card from "../ui/Card";
import { cn } from "@/utils/cn";
import ScrollReveal from "../animations/ScrollReveal";
import { HoverLift } from "../animations/MicroInteractions";
import SectionDivider from "../animations/SectionDivider";
import OrganicBlob from "../animations/OrganicBlob";
import SketchUnderline from "../animations/SketchUnderline";
import GradientNoise from "../animations/GradientNoise";

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={cn(
        "section-padding bg-bg-playful-white relative overflow-hidden",
        className
      )}
      aria-labelledby="about-heading"
    >
      {/* Gradient Noise Overlay */}
      <GradientNoise opacity={0.03} />

      {/* Organic Blob Background */}
      <OrganicBlob
        color="#E8E4FF"
        opacity={0.15}
        size="lg"
        position={{ top: "-10%", right: "-5%" }}
        blur={true}
      />
      <OrganicBlob
        color="#FFE5D9"
        opacity={0.12}
        size="md"
        position={{ bottom: "10%", left: "-5%" }}
        blur={true}
      />

      <div className="container-xl mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <ScrollReveal direction="down" delay={0.05}>
            <div className="text-center mb-12">
              <h2 id="about-heading" className="heading-lg text-primary mb-4">
                About Me
              </h2>
              <SketchUnderline color="#FF6B35" width="120px" className="mb-4" />
            </div>
          </ScrollReveal>

          {/* Content Grid */}
          <div className="max-w-3xl mx-auto">
            {/* Professional Summary - Full width */}
            <ScrollReveal direction="up" delay={0.1}>
              <HoverLift intensity="subtle">
                <Card className="h-full">
                  <div className="space-y-6">
                    <ScrollReveal direction="fade" delay={0.15}>
                      <p className="body-lg text-text-primary leading-relaxed">
                        I'm a{" "}
                        <strong className="text-primary">
                          Full-Stack & AI Developer
                        </strong>{" "}
                        with hands-on experience building scalable, data-driven
                        web applications at the intersection of modern frontend,
                        robust backend systems, and applied AI.
                      </p>
                    </ScrollReveal>

                    <ScrollReveal direction="fade" delay={0.2}>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                          <p className="body-md text-text-primary">
                            Worked at <strong>TCS iON</strong> developing{" "}
                            <strong>
                              AI-powered sentiment analysis platforms
                            </strong>
                            , RESTful APIs with FastAPI, and React dashboards
                            with real-time analytics
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                          <p className="body-md text-text-primary">
                            Combined{" "}
                            <strong>
                              rule-based NLP and deep learning (BERT, LSTM)
                            </strong>{" "}
                            to deliver insights from text, voice, and facial
                            data
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                          <p className="body-md text-text-primary">
                            Build full-stack apps with{" "}
                            <strong>
                              React, Node.js, Express, MongoDB, SQL
                            </strong>{" "}
                            focused on performance and UX
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-accent-orange rounded-full mt-2 flex-shrink-0"></div>
                          <p className="body-md text-text-primary">
                            Pursuing <strong>MCA</strong> and seeking
                            opportunities to contribute to impactful products
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="fade" delay={0.25}>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="body-md text-text-primary italic">
                          When I'm not coding, I bring the same strategic
                          mindset from competitive esports—where I was a{" "}
                          <strong className="text-primary">
                            National Top-14 Finalist in BGMI 2023
                          </strong>
                          —into problem-solving, teamwork, and execution.
                        </p>
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
      <SectionDivider variant="geometric" color="#1b2651" />
    </section>
  );
};

export default AboutSection;
