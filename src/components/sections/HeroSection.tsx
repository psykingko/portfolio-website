"use client";

import React from "react";
import { motion } from "framer-motion";
import IsometricScene from "../animations/IsometricScene";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
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

  const heroVisualVariants = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : fadeInRight;

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

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-accent-pink rounded-full opacity-60"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-accent-blue rounded-full opacity-40"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [10, -10, 10],
                  rotate: [0, 180, 360],
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }
          }
        />
        <motion.div
          className="absolute bottom-40 left-20 w-1 h-1 bg-accent-orange rounded-full opacity-70"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-8, 8, -8],
                  scale: [1, 1.5, 1],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  },
                }
          }
        />
      </div>

      <div className="container-xl w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Text Content - 60% on desktop */}
          <motion.div
            className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left"
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

            {/* Subtitle - Reduced and more impactful */}
            <motion.div variants={itemVariants}>
              <motion.p
                className="body-lg text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed"
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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
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

          {/* Isometric 3D Scene - 40% on desktop */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center"
            variants={heroVisualVariants}
          >
            <motion.div
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-square"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { scale: 1.02, transition: { duration: 0.3 } }
              }
            >
              <IsometricScene
                className="w-full h-full"
                prefersReducedMotion={prefersReducedMotion}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollReveal direction="fade" delay={1.5}>
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
