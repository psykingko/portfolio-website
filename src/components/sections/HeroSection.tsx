"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import {
  fadeInLeft,
  staggerContainer,
  staggerItem,
} from "../../utils/animations";
import { InteractiveButton } from "../animations/MicroInteractions";

interface HeroSectionProps {
  name: string;
  title: string;
  subtitle: string;
  ctaButtons: {
    primary: { text: string; action: () => void };
    secondary: { text: string; href: string };
  };
}

// Rotating titles for the typewriter effect - split into two lines
const ROTATING_TITLES = [
  { line1: "MERN Stack", line2: "Developer" },
  { line1: "Next.js", line2: "Developer" },
  { line1: "AI", line2: "Enthusiast" },
];

const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  title,
  subtitle,
  ctaButtons,
}) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedLine1, setDisplayedLine1] = useState("");
  const [displayedLine2, setDisplayedLine2] = useState("");
  const [isTypingLine1, setIsTypingLine1] = useState(true);
  const [isTypingLine2, setIsTypingLine2] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentTitle = ROTATING_TITLES[currentTitleIndex];

  useEffect(() => {
    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion) {
      setDisplayedLine1(currentTitle.line1);
      setDisplayedLine2(currentTitle.line2);
      return;
    }

    const typingSpeed = 35; // ms per character when typing (even faster)
    const deletingSpeed = 25; // ms per character when deleting (even faster)
    const pauseDuration = 1000; // ms to pause after typing complete
    const lineBreakPause = 150; // ms pause between line 1 and line 2

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (isTypingLine1 && displayedLine1.length < currentTitle.line1.length) {
        // Typing line 1
        timeout = setTimeout(() => {
          setDisplayedLine1(
            currentTitle.line1.slice(0, displayedLine1.length + 1)
          );
        }, typingSpeed);
      } else if (
        isTypingLine1 &&
        displayedLine1.length === currentTitle.line1.length
      ) {
        // Finished line 1, pause then start line 2
        timeout = setTimeout(() => {
          setIsTypingLine1(false);
          setIsTypingLine2(true);
        }, lineBreakPause);
      } else if (
        isTypingLine2 &&
        displayedLine2.length < currentTitle.line2.length
      ) {
        // Typing line 2
        timeout = setTimeout(() => {
          setDisplayedLine2(
            currentTitle.line2.slice(0, displayedLine2.length + 1)
          );
        }, typingSpeed);
      } else if (
        isTypingLine2 &&
        displayedLine2.length === currentTitle.line2.length
      ) {
        // Finished both lines, pause then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setIsTypingLine2(false);
        }, pauseDuration);
      }
    } else {
      // Deleting phase - delete line 2 first, then line 1
      if (displayedLine2.length > 0) {
        // Deleting line 2
        timeout = setTimeout(() => {
          setDisplayedLine2(displayedLine2.slice(0, -1));
        }, deletingSpeed);
      } else if (displayedLine1.length > 0) {
        // Deleting line 1
        timeout = setTimeout(() => {
          setDisplayedLine1(displayedLine1.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next title
        setIsDeleting(false);
        setIsTypingLine1(true);
        setCurrentTitleIndex(prev => (prev + 1) % ROTATING_TITLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedLine1,
    displayedLine2,
    isTypingLine1,
    isTypingLine2,
    isDeleting,
    currentTitle,
    prefersReducedMotion,
  ]);

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
      className="relative min-h-screen bg-bg-beige flex items-center pt-0 lg:-mt-20 pb-20 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:no-underline"
      >
        Skip to main content
      </a>

      <div className="w-full max-w-[1150px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start min-h-[80vh]"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* LEFT ZONE - Text + CTA - Visual center of the page */}
          <motion.div
            className="lg:col-span-8 text-left pt-20 lg:pt-32 lg:pr-12"
            variants={heroTextVariants}
          >
            {/* Intro Line - Static, subtle context */}
            <motion.div variants={itemVariants} className="mb-4">
              <motion.p className="text-base md:text-lg font-normal text-text-secondary/70 tracking-wide">
                Hi, I'm Ashish and I am a
              </motion.p>
            </motion.div>

            {/* Main Animated Title - Typewriter Effect with Two Lines */}
            <motion.div
              variants={itemVariants}
              className="mb-8 min-h-[160px] md:min-h-[200px]"
            >
              <motion.h1
                className="heading-xl font-bold text-primary leading-[1.2] tracking-tight"
                animate={
                  !prefersReducedMotion &&
                  !isTypingLine1 &&
                  !isTypingLine2 &&
                  !isDeleting &&
                  displayedLine1.length === currentTitle.line1.length &&
                  displayedLine2.length === currentTitle.line2.length
                    ? {
                        y: [0, -1, 0, 1, 0],
                        opacity: [1, 0.98, 1, 0.98, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Line 1 */}
                <span className="block">
                  {displayedLine1}
                  {!prefersReducedMotion &&
                    isTypingLine1 &&
                    displayedLine1.length < currentTitle.line1.length && (
                      <motion.span
                        className="inline-block w-1 h-[0.8em] bg-primary ml-1 align-middle"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                </span>
                {/* Line 2 */}
                <span className="block">
                  {displayedLine2}
                  {!prefersReducedMotion &&
                    (isTypingLine2 ||
                      (!isTypingLine1 && !isTypingLine2 && !isDeleting)) && (
                      <motion.span
                        className="inline-block w-1 h-[0.8em] bg-primary ml-1 align-middle"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                </span>
              </motion.h1>
            </motion.div>

            {/* Supporting text block with visual anchor */}
            <motion.div
              variants={itemVariants}
              className="relative pl-4 border-l-2 border-primary/20"
            >
              {/* Primary value line - sub-headline treatment */}
              <motion.p
                className="text-[21px] font-medium text-[#475569] leading-[1.5] max-w-[520px] mb-2 tracking-tight"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { x: 2, transition: { duration: 0.2 } }
                }
              >
                I build scalable web & AI-powered products.
              </motion.p>

              {/* Secondary support line - quiet confidence */}
              <motion.p className="text-[17px] font-normal text-text-secondary opacity-85">
                Turning complex ideas into production-ready products
              </motion.p>
            </motion.div>

            {/* CTA Buttons - refined hierarchy with better spacing */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <InteractiveButton
                onClick={ctaButtons.primary.action}
                className="text-lg px-10 py-5 min-h-[60px] shadow-primary transition-all duration-300 rounded-lg hover:!bg-[var(--color-primary)] group"
                variant="primary"
                aria-label="View Projects"
              >
                <span className="flex items-center">
                  View Projects
                  <motion.svg
                    className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </span>
              </InteractiveButton>

              <InteractiveButton
                onClick={() => window.open(ctaButtons.secondary.href, "_blank")}
                className="text-base px-8 py-3 min-h-[48px] shadow-subtle transition-all duration-300 rounded-lg !bg-[#cd2028] !text-white hover:!bg-[#cd2028] group"
                variant="secondary"
                aria-label="Download Resume (PDF)"
              >
                <span className="flex items-center">
                  Download Resume
                  <motion.svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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

            {/* Personal signature - visual signature with icon */}
            <motion.div variants={itemVariants} className="mt-8">
              <motion.p className="text-[15px] font-medium text-text-secondary opacity-75 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                Based in India · Open to opportunities
              </motion.p>
            </motion.div>
          </motion.div>

          {/* RIGHT ZONE - Visual accent that overlaps center */}
          <motion.div
            className="lg:col-span-4 relative h-96 lg:h-[500px] pt-20 lg:pt-32 lg:-ml-44"
            variants={itemVariants}
          >
            {/* Constrained backdrop area - accent, not column */}
            <div className="relative w-full lg:w-[440px] h-full">
              {/* Grid/dot pattern background - constrained backdrop */}
              <div
                className="absolute inset-0 pointer-events-none lg:w-[380px]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #1b2651 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0",
                  opacity: 0.15,
                }}
                aria-hidden="true"
              />

              {/* Blurred gradient blob background - constrained */}
              <motion.div
                className="absolute inset-0 lg:w-[380px] rounded-3xl blur-[40px] opacity-20 bg-gradient-to-br from-[#1b2651] via-[#cd2028] to-[#ff6b35]"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Animated glow effect behind code card - NEW */}
              <motion.div
                className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
                style={
                  {
                    backgroundImage:
                      "radial-gradient(circle, #cd2028 0%, #ff6b35 30%, transparent 70%)",
                    filter: "blur(70px)",
                    zIndex: 0,
                  } as React.CSSProperties
                }
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        x: [-20, 20, -20],
                        y: [-30, 30, -30],
                        scale: [1, 1.15, 1],
                      }
                }
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />

              {/* Code snippet overlay - claims its space */}
              <motion.div
                className="relative w-full flex items-start justify-start p-8 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 font-mono text-[15px] border border-gray-700/50 shadow-2xl scale-105">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <div className="text-gray-300">
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400">build</span> ={" "}
                      <span className="text-yellow-400">(web, ai)</span> =&gt;
                    </div>
                    <div className="text-gray-300 pl-4">
                      <span className="text-green-400">scalableProduct</span>;
                    </div>
                    <div className="text-gray-400 mt-4">
                      // Crafting digital experiences
                    </div>
                    <div className="text-gray-400">
                      // with modern technology
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
