"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SketchUnderlineProps {
  color?: string;
  width?: string;
  className?: string;
}

const SketchUnderline: React.FC<SketchUnderlineProps> = ({
  color = "#FF6B35",
  width = "100%",
  className = "",
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <motion.svg
      width={width}
      height="12"
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mx-auto ${className}`}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: {
          duration: prefersReducedMotion ? 0 : 1,
          ease: "easeInOut",
        },
        opacity: { duration: 0.3 },
      }}
      aria-hidden="true"
    >
      <motion.path
        d="M2 8C20 6 40 4 60 5C80 6 100 7 120 6C140 5 160 4 180 5C185 5.5 190 6 195 7"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.2,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
};

export default SketchUnderline;
