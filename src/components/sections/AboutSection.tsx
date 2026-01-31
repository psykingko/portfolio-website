"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { Briefcase, Code2, Trophy } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";
import SectionDivider from "../animations/SectionDivider";
import OrganicBlob from "../animations/OrganicBlob";
import GradientNoise from "../animations/GradientNoise";
import SectionHeader from "../ui/SectionHeader";
import HighlightCard from "../ui/HighlightCard";

interface AboutSectionProps {
  className?: string;
}

interface HighlightCardData {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const highlightCards: HighlightCardData[] = [
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Experience",
    content: "Full-Stack & AI Developer at TCS iON",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Tech Focus",
    content: "React, Node.js, FastAPI, AI/ML",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Achievement",
    content: "National Top-14 BGIS 2023 Finalist",
  },
];

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <section
      id="about"
      className={cn(
        "py-16 lg:py-24 bg-bg-playful-white relative overflow-hidden",
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
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <SectionHeader
            id="about-heading"
            title="About Me"
            underlineColor="#FF6B35"
            underlineWidth="120px"
          />

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12">
            {/* Left Column: Narrative Text */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-6">
                <p className="body-lg text-text-primary leading-relaxed">
                  I'm a{" "}
                  <strong className="text-primary">
                    Full-Stack & AI Developer
                  </strong>{" "}
                  who builds scalable, data-driven applications.
                </p>

                <p className="body-lg text-text-primary leading-relaxed">
                  At <strong>TCS iON</strong>, I developed{" "}
                  <strong>AI-powered sentiment analysis platforms</strong>{" "}
                  combining rule-based NLP and deep learning (BERT, LSTM) to
                  deliver insights from text, voice, and facial data.
                </p>

                <p className="body-lg text-text-primary leading-relaxed">
                  When I'm not coding, I bring the same strategic mindset from
                  competitive esports—where I was a{" "}
                  <strong className="text-primary">
                    National Top-14 Finalist in BGIS 2023
                  </strong>
                  —into problem-solving and execution.
                </p>
              </div>
            </ScrollReveal>

            {/* Right Column: Highlight Cards */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col gap-4">
                {highlightCards.map((card, index) => (
                  <HighlightCard
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    content={card.content}
                  />
                ))}
              </div>
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
