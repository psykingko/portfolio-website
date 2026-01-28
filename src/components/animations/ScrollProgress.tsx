"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: "top" | "bottom";
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className = "",
  color = "#5634d6",
  height = 4,
  position = "top",
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const positionClasses = {
    top: "top-0",
    bottom: "bottom-0",
  };

  return (
    <motion.div
      className={`fixed left-0 right-0 z-50 origin-left ${positionClasses[position]} ${className}`}
      style={
        {
          scaleX,
          height: height,
          backgroundColor: color,
        } as React.CSSProperties
      }
    />
  );
};

// Circular scroll progress indicator
export const CircularScrollProgress: React.FC<{
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}> = ({ className = "", size = 60, strokeWidth = 4, color = "#5634d6" }) => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(86, 52, 214, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          style={
            {
              pathLength,
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            } as React.CSSProperties
          }
        />
      </svg>
      {/* Percentage text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-primary"
        style={
          {
            opacity: scrollYProgress,
          } as React.CSSProperties
        }
      >
        <motion.span>{Math.round(scrollYProgress.get() * 100)}%</motion.span>
      </motion.div>
    </div>
  );
};

export default ScrollProgress;
