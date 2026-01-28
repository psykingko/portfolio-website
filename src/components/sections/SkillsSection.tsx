"use client";

import React from "react";
import { cn } from "@/utils/cn";
import Card from "../ui/Card";
import { SKILLS_DATA, SKILL_CATEGORIES, Skill } from "@/utils/constants";
import ScrollReveal from "../animations/ScrollReveal";
import { HoverLift } from "../animations/MicroInteractions";
import SectionDivider from "../animations/SectionDivider";

interface SkillsSectionProps {
  className?: string;
}

// Simple skill icons mapping
const getSkillIcon = (skillName: string) => {
  const iconMap: Record<string, string> = {
    // Frontend
    React: "⚛️",
    "Next.js": "▲",
    TypeScript: "🔷",
    JavaScript: "🟨",
    HTML5: "🌐",
    CSS3: "🎨",
    "Tailwind CSS": "💨",
    Sass: "🎨",

    // Backend
    "Node.js": "🟢",
    Python: "🐍",
    FastAPI: "⚡",
    "Express.js": "🚀",
    Django: "🎸",
    Flask: "🌶️",

    // Database
    MongoDB: "🍃",
    PostgreSQL: "🐘",
    MySQL: "🐬",
    Redis: "🔴",
    SQLite: "💾",

    // AI/ML
    TensorFlow: "🧠",
    PyTorch: "🔥",
    "Scikit-learn": "📊",
    "OpenAI API": "🤖",
    "Hugging Face": "🤗",
    NLTK: "📝",
    spaCy: "🔍",

    // Tools
    Git: "📝",
    Docker: "🐳",
    AWS: "☁️",
    Vercel: "▲",
    Netlify: "🌐",
    Postman: "📮",
    "VS Code": "💻",
    Figma: "🎨",
  };

  return iconMap[skillName] || "🔧";
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ className }) => {
  // Group skills by category
  const groupedSkills = SKILLS_DATA.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section
      id="skills"
      className={cn("section-padding bg-bg-white", className)}
      aria-labelledby="skills-heading"
    >
      <div className="container-xl mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <ScrollReveal direction="down" delay={0.1}>
            <div className="text-center mb-20">
              <h2 id="skills-heading" className="heading-lg text-primary mb-6">
                Technical Skills
              </h2>
              <div className="w-16 h-1 bg-accent-orange mx-auto rounded-full mb-8" />
              <p className="text-lead text-text-secondary max-w-2xl mx-auto">
                Technologies and tools I use to build modern web applications
                and AI-powered systems.
              </p>
            </div>
          </ScrollReveal>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(SKILL_CATEGORIES).map(
              ([categoryKey, categoryInfo], categoryIndex) => {
                const categorySkills = groupedSkills[categoryKey] || [];

                return (
                  <ScrollReveal
                    key={categoryKey}
                    direction="up"
                    delay={0.2 + categoryIndex * 0.1}
                  >
                    <HoverLift intensity="medium">
                      <Card className="h-full" hover={true} padding="lg">
                        {/* Category Header */}
                        <div className="mb-8">
                          <ScrollReveal
                            direction="fade"
                            delay={0.4 + categoryIndex * 0.1}
                          >
                            <h3 className="heading-sm text-primary mb-3">
                              {categoryInfo.title}
                            </h3>
                            <p className="body-sm text-text-secondary">
                              {categoryInfo.description}
                            </p>
                          </ScrollReveal>
                        </div>

                        {/* Skills List - Icons + Text approach */}
                        <ScrollReveal
                          stagger
                          staggerDelay={0.05}
                          delay={0.5 + categoryIndex * 0.1}
                        >
                          <div
                            className="space-y-4"
                            role="list"
                            aria-label={`${categoryInfo.title} skills`}
                          >
                            {categorySkills.map((skill, index) => (
                              <div
                                key={`${skill.name}-${index}`}
                                className="flex items-center space-x-3 group"
                                role="listitem"
                              >
                                <span
                                  className="text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                  aria-hidden="true"
                                >
                                  {getSkillIcon(skill.name)}
                                </span>
                                <span className="body-md text-text-primary font-medium group-hover:text-primary transition-colors duration-200">
                                  {skill.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </ScrollReveal>
                      </Card>
                    </HoverLift>
                  </ScrollReveal>
                );
              }
            )}
          </div>

          {/* Additional Info */}
          <ScrollReveal direction="fade" delay={0.8}>
            <div className="mt-16 text-center">
              <p className="body-md text-text-secondary">
                Always learning and exploring new technologies to stay current
                with industry trends.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Section Divider */}
      <SectionDivider variant="wave" color="#ff7849" />
    </section>
  );
};

export default SkillsSection;
