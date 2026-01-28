"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  fadeInLeft,
  staggerContainer,
  staggerItem,
} from "../../utils/animations";
import { InteractiveButton } from "../animations/MicroInteractions";
import ScrollReveal from "../animations/ScrollReveal";

interface HeroSectionProps {
  name: string;
  title: string;
  subtitle: string;
  ctaButtons: {
    primary: { text: string; action: () => void };
    secondary: { text: string; href: string };
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  title,
  subtitle,
  ctaButtons,
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  // Animation variants that respect reduced motion preferences
  const heroTextVariants = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : fadeInLeft;

  const containerVariants = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : staggerContainer;

  const itemVariants = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : staggerItem;

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-bg-peach flex items-center py-20 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:no-underline"
      >
        Skip to main content
      </a>

      {/* Right side background with dot grid pattern and curved lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot grid pattern - covers entire hero section */}
        <div className="absolute inset-0 w-full h-full">
          <svg
            className="w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dot-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.5" fill="#6D5DF6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
          </svg>
        </div>

        {/* Curved flowing lines - animated */}
        <svg
          className="absolute right-0 top-0 w-1/2 h-full opacity-40"
          viewBox="0 0 500 800"
          preserveAspectRatio="xMaxYMid slice"
        >
          {/* Top curved line */}
          <motion.path
            d="M 500 100 Q 400 150 300 100 T 100 100 L 100 0 L 500 0 Z"
            fill="none"
            stroke="#6D5DF6"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.6,
              d: [
                "M 500 100 Q 400 150 300 100 T 100 100 L 100 0 L 500 0 Z",
                "M 500 120 Q 400 170 300 120 T 100 120 L 100 0 L 500 0 Z",
                "M 500 100 Q 400 150 300 100 T 100 100 L 100 0 L 500 0 Z",
              ],
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 1 },
              d: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Middle curved line */}
          <motion.path
            d="M 500 300 Q 350 250 200 300 T -50 300"
            fill="none"
            stroke="#FF7849"
            strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.5,
              d: [
                "M 500 300 Q 350 250 200 300 T -50 300",
                "M 500 320 Q 350 270 200 320 T -50 320",
                "M 500 300 Q 350 250 200 300 T -50 300",
              ],
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut", delay: 0.5 },
              opacity: { duration: 1, delay: 0.5 },
              d: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              },
            }}
          />

          {/* Bottom curved line */}
          <motion.path
            d="M 500 500 Q 300 450 100 500 T -100 500"
            fill="none"
            stroke="#6D5DF6"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.4,
              d: [
                "M 500 500 Q 300 450 100 500 T -100 500",
                "M 500 520 Q 300 470 100 520 T -100 520",
                "M 500 500 Q 300 450 100 500 T -100 500",
              ],
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut", delay: 1 },
              opacity: { duration: 1, delay: 1 },
              d: {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              },
            }}
          />

          {/* Large curved area - bottom right */}
          <motion.path
            d="M 500 600 Q 400 550 300 600 Q 200 650 100 600 L 100 800 L 500 800 Z"
            fill="none"
            stroke="#FF7849"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.3,
              d: [
                "M 500 600 Q 400 550 300 600 Q 200 650 100 600 L 100 800 L 500 800 Z",
                "M 500 620 Q 400 570 300 620 Q 200 670 100 620 L 100 800 L 500 800 Z",
                "M 500 600 Q 400 550 300 600 Q 200 650 100 600 L 100 800 L 500 800 Z",
              ],
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut", delay: 1.5 },
              opacity: { duration: 1, delay: 1.5 },
              d: {
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              },
            }}
          />
        </svg>

        {/* Subtle gradient overlay */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/3 to-transparent" />
      </div>

      <div className="container-xl w-full relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Text Content - Left aligned, 60% width */}
          <motion.div
            className="lg:col-span-7 space-y-6 lg:space-y-8 text-left"
            variants={heroTextVariants}
          >
            {/* Greeting */}
            <motion.div variants={itemVariants} className="space-y-2">
              <motion.p
                className="text-lead text-text-secondary font-medium"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { scale: 1.02, transition: { duration: 0.2 } }
                }
              >
                {name}
              </motion.p>
            </motion.div>

            {/* Main Title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h1
                className="heading-xl text-primary leading-tight"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { scale: 1.01, transition: { duration: 0.3 } }
                }
              >
                {title}
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants}>
              <motion.p
                className="body-lg text-text-secondary max-w-2xl leading-relaxed"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { scale: 1.01, transition: { duration: 0.2 } }
                }
              >
                I build scalable products at the intersection of Web & AI.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <InteractiveButton
                onClick={ctaButtons.primary.action}
                className="text-lg px-8 py-4 min-h-[56px] shadow-primary hover:shadow-primary-hover transition-all duration-300 rounded-lg"
                variant="primary"
                aria-label="View Projects"
              >
                🟣 View Projects
              </InteractiveButton>

              <InteractiveButton
                onClick={() => window.open(ctaButtons.secondary.href, "_blank")}
                className="text-lg px-8 py-4 min-h-[56px] shadow-subtle hover:shadow-soft transition-all duration-300 rounded-lg"
                variant="secondary"
                aria-label="Download Resume (PDF)"
              >
                <span className="flex items-center">
                  ⬇ Download Resume
                  <motion.svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </motion.svg>
                </span>
              </InteractiveButton>
            </motion.div>
          </motion.div>

          {/* Right side - empty space for background elements */}
          <div className="lg:col-span-5 hidden lg:block" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollReveal direction="fade" delay={0.5}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.button
            onClick={handleScrollToProjects}
            className="flex flex-col items-center text-text-secondary hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-2 group"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, 10, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
            whileHover={
              prefersReducedMotion
                ? {}
                : { scale: 1.1, transition: { duration: 0.2 } }
            }
            aria-label="Scroll down to view projects"
          >
            <span className="text-sm font-medium mb-2 group-hover:text-primary transition-colors">
              Scroll
            </span>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { y: 2, transition: { duration: 0.2 } }
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.button>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HeroSection;
