"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  className?: string;
}

/**
 * HighlightCard Component
 *
 * A compact card component for displaying key highlights in the About section.
 * Features an icon at the top, title, and content with a subtle hover lift effect.
 *
 * @param icon - React node containing the icon to display
 * @param title - The card title
 * @param content - The card content text
 * @param className - Additional CSS classes
 */
const HighlightCard: React.FC<HighlightCardProps> = ({
  icon,
  title,
  content,
  className = "",
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  const hoverAnimation = prefersReducedMotion
    ? {}
    : {
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      };

  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl p-5 shadow-soft",
        "flex flex-col items-center text-center",
        "h-[120px] justify-center",
        "border border-gray-100",
        "transition-shadow duration-300",
        "hover:shadow-card",
        className
      )}
      whileHover={hoverAnimation}
    >
      <div className="text-primary mb-2 flex-shrink-0">{icon}</div>
      <h3 className="heading-sm text-primary mb-1 font-semibold">{title}</h3>
      <p className="body-sm text-text-secondary leading-snug">{content}</p>
    </motion.div>
  );
};

export default HighlightCard;
