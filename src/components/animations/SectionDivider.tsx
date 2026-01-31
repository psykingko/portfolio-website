"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SectionDividerProps {
  className?: string;
  variant?: "line" | "wave" | "dots" | "gradient" | "geometric";
  color?: string;
  animated?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  className = "",
  variant = "line",
  color = "#1b2651",
  animated = true,
}) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const shouldAnimate = animated && !prefersReducedMotion;

  const lineVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const dotsVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const renderDivider = () => {
    switch (variant) {
      case "line":
        return (
          <motion.div
            ref={ref}
            className={`h-px bg-gradient-to-r from-transparent via-current to-transparent ${className}`}
            style={{ color } as React.CSSProperties}
            variants={shouldAnimate ? lineVariants : undefined}
            initial={shouldAnimate ? "initial" : undefined}
            animate={shouldAnimate && inView ? "animate" : undefined}
          />
        );

      case "wave":
        return (
          <motion.div
            ref={ref}
            className={`w-full ${className}`}
            initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
            animate={
              shouldAnimate && inView
                ? { opacity: 1, y: 0, transition: { duration: 0.6 } }
                : undefined
            }
          >
            <svg
              viewBox="0 0 1200 120"
              className="w-full h-8"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z"
                fill={color}
                opacity="0.1"
                initial={shouldAnimate ? { pathLength: 0 } : undefined}
                animate={
                  shouldAnimate && inView
                    ? { pathLength: 1, transition: { duration: 1.2 } }
                    : undefined
                }
              />
              <motion.path
                d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60"
                stroke={color}
                strokeWidth="2"
                fill="none"
                opacity="0.6"
                initial={shouldAnimate ? { pathLength: 0 } : undefined}
                animate={
                  shouldAnimate && inView
                    ? { pathLength: 1, transition: { duration: 1 } }
                    : undefined
                }
              />
            </svg>
          </motion.div>
        );

      case "dots":
        return (
          <motion.div
            ref={ref}
            className={`flex justify-center space-x-2 ${className}`}
            variants={shouldAnimate ? dotsVariants : undefined}
            initial={shouldAnimate ? "initial" : undefined}
            animate={shouldAnimate && inView ? "animate" : undefined}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color } as React.CSSProperties}
                variants={shouldAnimate ? dotVariants : undefined}
              />
            ))}
          </motion.div>
        );

      case "gradient":
        return (
          <motion.div
            ref={ref}
            className={`h-px ${className}`}
            style={
              {
                background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
              } as React.CSSProperties
            }
            variants={shouldAnimate ? lineVariants : undefined}
            initial={shouldAnimate ? "initial" : undefined}
            animate={shouldAnimate && inView ? "animate" : undefined}
          />
        );

      case "geometric":
        return (
          <motion.div
            ref={ref}
            className={`flex justify-center ${className}`}
            initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : undefined}
            animate={
              shouldAnimate && inView
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, ease: "easeOut" },
                  }
                : undefined
            }
          >
            <svg width="60" height="20" viewBox="0 0 60 20">
              <motion.polygon
                points="10,10 20,2 30,10 20,18"
                fill={color}
                opacity="0.8"
                initial={shouldAnimate ? { scale: 0 } : undefined}
                animate={
                  shouldAnimate && inView
                    ? {
                        scale: 1,
                        transition: { duration: 0.4, delay: 0.1 },
                      }
                    : undefined
                }
              />
              <motion.polygon
                points="30,10 40,2 50,10 40,18"
                fill={color}
                opacity="0.6"
                initial={shouldAnimate ? { scale: 0 } : undefined}
                animate={
                  shouldAnimate && inView
                    ? {
                        scale: 1,
                        transition: { duration: 0.4, delay: 0.2 },
                      }
                    : undefined
                }
              />
              <motion.circle
                cx="5"
                cy="10"
                r="2"
                fill={color}
                opacity="0.4"
                initial={shouldAnimate ? { scale: 0 } : undefined}
                animate={
                  shouldAnimate && inView
                    ? {
                        scale: 1,
                        transition: { duration: 0.4, delay: 0.3 },
                      }
                    : undefined
                }
              />
              <motion.circle
                cx="55"
                cy="10"
                r="2"
                fill={color}
                opacity="0.4"
                initial={shouldAnimate ? { scale: 0 } : undefined}
                animate={
                  shouldAnimate && inView
                    ? {
                        scale: 1,
                        transition: { duration: 0.4, delay: 0.3 },
                      }
                    : undefined
                }
              />
            </svg>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return <div className="w-full py-8">{renderDivider()}</div>;
};

export default SectionDivider;
