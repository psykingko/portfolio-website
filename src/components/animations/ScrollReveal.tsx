"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 60,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  stagger = false,
  staggerDelay = 0.1,
}) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin: "-50px 0px",
  });

  // Create animation variants based on direction
  const getVariants = (): Variants => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
      };
    }

    const baseTransition = {
      duration,
      ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      delay,
    };

    switch (direction) {
      case "up":
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0, transition: baseTransition },
        };
      case "down":
        return {
          initial: { opacity: 0, y: -distance },
          animate: { opacity: 1, y: 0, transition: baseTransition },
        };
      case "left":
        return {
          initial: { opacity: 0, x: -distance },
          animate: { opacity: 1, x: 0, transition: baseTransition },
        };
      case "right":
        return {
          initial: { opacity: 0, x: distance },
          animate: { opacity: 1, x: 0, transition: baseTransition },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1, transition: baseTransition },
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: baseTransition },
        };
      default:
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0, transition: baseTransition },
        };
    }
  };

  const staggerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const staggerItemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration * 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={staggerVariants}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={staggerItemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getVariants()}
      initial="initial"
      animate={inView ? "animate" : "initial"}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
