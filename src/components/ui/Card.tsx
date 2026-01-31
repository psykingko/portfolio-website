"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "article" | "section";
  animated?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
  padding = "md",
  as: Component = "div",
  animated = true,
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  // Base classes from design system
  const baseClasses = "card-base";

  // Padding variants
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6", // Default from design system
    lg: "p-8",
  };

  // Hover effect is included in card-base by default
  // We can disable it by overriding the transform
  const hoverClasses = hover ? "" : "hover:transform-none";

  const classes = cn(
    baseClasses,
    paddingClasses[padding],
    hoverClasses,
    className
  );

  const hoverVariants = {
    whileHover:
      hover && !prefersReducedMotion
        ? {
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(27, 38, 81, 0.1)",
            transition: { duration: 0.3, ease: "easeOut" },
          }
        : {},
    whileTap:
      hover && !prefersReducedMotion
        ? {
            scale: 0.98,
            transition: { duration: 0.1 },
          }
        : {},
  };

  if (animated && !prefersReducedMotion) {
    return (
      <motion.div
        className={classes}
        variants={hoverVariants}
        whileHover="whileHover"
        whileTap="whileTap"
      >
        {children}
      </motion.div>
    );
  }

  return <Component className={classes}>{children}</Component>;
};

export default Card;
