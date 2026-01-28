"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Skill } from "@/utils/constants";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SkillBadgeProps {
  skill: Skill;
  categoryColor?: string;
  className?: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  categoryColor = "primary",
  className,
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  const getCategoryColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30";
      case "accent-orange":
        return "bg-accent-orange/10 text-accent-orange border-accent-orange/20 hover:bg-accent-orange/20 hover:border-accent-orange/30";
      case "accent-blue":
        return "bg-accent-blue/10 text-accent-blue border-accent-blue/20 hover:bg-accent-blue/20 hover:border-accent-blue/30";
      case "accent-pink":
        return "bg-accent-pink/10 text-accent-pink border-accent-pink/20 hover:bg-accent-pink/20 hover:border-accent-pink/30";
      default:
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30";
    }
  };

  const badgeVariants = {
    whileHover: prefersReducedMotion
      ? {}
      : {
          scale: 1.05,
          y: -2,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.2, ease: "easeOut" },
        },
    whileTap: prefersReducedMotion
      ? {}
      : {
          scale: 0.95,
          transition: { duration: 0.1 },
        },
  };

  return (
    <motion.div
      className={cn(
        // Base styles
        "inline-flex items-center px-3 py-2 rounded-full border text-sm font-medium cursor-pointer",
        "transition-all duration-300 ease-out",
        // Category-specific colors
        getCategoryColorClasses(categoryColor),
        // Custom className
        className
      )}
      variants={badgeVariants}
      whileHover="whileHover"
      whileTap="whileTap"
      role="listitem"
      aria-label={`${skill.name} skill`}
    >
      {/* SVG Icon */}
      <motion.span
        className="mr-2 w-4 h-4 flex-shrink-0"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: skill.icon }}
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.4 },
              }
        }
      />

      {/* Skill name */}
      <span>{skill.name}</span>

      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={
          {
            background: `radial-gradient(circle, ${
              categoryColor === "primary"
                ? "#5634d6"
                : categoryColor === "accent-orange"
                  ? "#ff6b35"
                  : categoryColor === "accent-blue"
                    ? "#4ecdc4"
                    : "#ffb3d9"
            }20 0%, transparent 70%)`,
          } as React.CSSProperties
        }
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                opacity: 1,
                scale: 1.2,
                transition: { duration: 0.3 },
              }
        }
      />
    </motion.div>
  );
};

export default SkillBadge;
