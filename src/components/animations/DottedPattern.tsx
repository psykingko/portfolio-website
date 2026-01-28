"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface DottedPatternProps {
  color?: string;
  opacity?: number;
  spacing?: number;
  dotSize?: number;
  animate?: boolean;
  className?: string;
}

const DottedPattern: React.FC<DottedPatternProps> = ({
  color = "#5634d6",
  opacity = 0.06,
  spacing = 30,
  dotSize = 2,
  animate = true,
  className = "",
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id="dotted-pattern"
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <motion.circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={dotSize}
              fill={color}
              opacity={opacity}
              animate={
                !prefersReducedMotion && animate
                  ? {
                      opacity: [opacity, opacity * 1.5, opacity],
                      scale: [1, 1.2, 1],
                    }
                  : undefined
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
      </svg>
    </motion.div>
  );
};

export default DottedPattern;
