"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Card from "../ui/Card";
import { SKILLS_DATA, SKILL_CATEGORIES, Skill } from "@/utils/constants";
import ScrollReveal from "../animations/ScrollReveal";
import { HoverLift } from "../animations/MicroInteractions";
import SectionDivider from "../animations/SectionDivider";
import DottedPattern from "../animations/DottedPattern";
import SketchUnderline from "../animations/SketchUnderline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Code2,
  Layers,
  FileCode,
  Zap,
  Database,
  Cpu,
  Wrench,
  Globe,
  Palette,
  Wind,
  Circle,
  Server,
  Flame,
  Box,
  Leaf,
  Fish,
  HardDrive,
  Brain,
  BarChart3,
  Bot,
  FileText,
  Search,
  GitBranch,
  Container,
  Cloud,
  Send,
  Code,
  Figma,
} from "lucide-react";

interface SkillsSectionProps {
  className?: string;
}

// Icon mapping with Lucide React icons
const getSkillIcon = (skillName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    // Frontend
    React: <Code2 className="w-4 h-4" />,
    "Next.js": <Layers className="w-4 h-4" />,
    TypeScript: <FileCode className="w-4 h-4" />,
    JavaScript: <Code className="w-4 h-4" />,
    HTML5: <Globe className="w-4 h-4" />,
    CSS3: <Palette className="w-4 h-4" />,
    "Tailwind CSS": <Wind className="w-4 h-4" />,
    Sass: <Palette className="w-4 h-4" />,

    // Backend
    "Node.js": <Circle className="w-4 h-4" />,
    Python: <Code2 className="w-4 h-4" />,
    FastAPI: <Zap className="w-4 h-4" />,
    "Express.js": <Server className="w-4 h-4" />,
    Django: <Server className="w-4 h-4" />,
    Flask: <Flame className="w-4 h-4" />,

    // Database
    MongoDB: <Leaf className="w-4 h-4" />,
    PostgreSQL: <Database className="w-4 h-4" />,
    MySQL: <Fish className="w-4 h-4" />,
    Redis: <Box className="w-4 h-4" />,
    SQLite: <HardDrive className="w-4 h-4" />,

    // AI/ML
    TensorFlow: <Brain className="w-4 h-4" />,
    PyTorch: <Flame className="w-4 h-4" />,
    "Scikit-learn": <BarChart3 className="w-4 h-4" />,
    "OpenAI API": <Bot className="w-4 h-4" />,
    "Hugging Face": <Bot className="w-4 h-4" />,
    NLTK: <FileText className="w-4 h-4" />,
    spaCy: <Search className="w-4 h-4" />,

    // Tools
    Git: <GitBranch className="w-4 h-4" />,
    Docker: <Container className="w-4 h-4" />,
    AWS: <Cloud className="w-4 h-4" />,
    Vercel: <Layers className="w-4 h-4" />,
    Netlify: <Globe className="w-4 h-4" />,
    Postman: <Send className="w-4 h-4" />,
    "VS Code": <Code className="w-4 h-4" />,
    Figma: <Figma className="w-4 h-4" />,
  };

  return iconMap[skillName] || <Wrench className="w-4 h-4" />;
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ className }) => {
  const { prefersReducedMotion } = useReducedMotion();

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
      className={cn(
        "section-padding bg-tech-white relative overflow-hidden",
        className
      )}
      aria-labelledby="skills-heading"
    >
      {/* Subtle Dotted Pattern */}
      <DottedPattern color="#1b2651" opacity={0.05} spacing={35} dotSize={2} />

      <div className="container-xl mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <ScrollReveal direction="down" delay={0.05}>
            <div className="text-center mb-20">
              <h2 id="skills-heading" className="heading-lg text-primary mb-6">
                Technical Skills
              </h2>
              <SketchUnderline color="#1b2651" width="140px" className="mb-8" />
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
                    <HoverLift intensity="subtle">
                      <Card
                        className="h-full flex flex-col min-h-[400px]"
                        hover={true}
                        padding="lg"
                      >
                        {/* Category Header */}
                        <div className="mb-6">
                          <ScrollReveal
                            direction="fade"
                            delay={0.4 + categoryIndex * 0.1}
                          >
                            <h3 className="heading-sm text-primary mb-2">
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
                            className="space-y-3 flex-1"
                            role="list"
                            aria-label={`${categoryInfo.title} skills`}
                          >
                            {categorySkills.map((skill, index) => (
                              <div
                                key={`${skill.name}-${index}`}
                                className="flex items-center space-x-3 group"
                                role="listitem"
                              >
                                <motion.div
                                  className="w-8 h-8 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-primary group-hover:scale-110"
                                  whileHover={
                                    prefersReducedMotion
                                      ? {}
                                      : {
                                          rotate: [0, -5, 5, -5, 0],
                                          transition: { duration: 0.5 },
                                        }
                                  }
                                >
                                  <span
                                    className="text-white transition-all duration-200 group-hover:scale-110"
                                    aria-hidden="true"
                                  >
                                    {getSkillIcon(skill.name)}
                                  </span>
                                </motion.div>
                                <span className="body-sm text-text-primary font-medium group-hover:text-primary transition-colors duration-200">
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
          <ScrollReveal direction="fade" delay={0.3}>
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
      <SectionDivider variant="geometric" color="#1b2651" />
    </section>
  );
};

export default SkillsSection;
