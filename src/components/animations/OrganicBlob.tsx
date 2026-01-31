"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface OrganicBlobProps {
  color?: string;
  opacity?: number;
  size?: "sm" | "md" | "lg" | "xl";
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  blur?: boolean;
  animate?: boolean;
  className?: string;
}

const OrganicBlob: React.FC<OrganicBlobProps> = ({
  color = "#1b2651",
  opacity = 0.1,
  size = "md",
  position = { top: "10%", right: "5%" },
  blur = true,
  animate = true,
  className = "",
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  const sizeMap = {
    sm: "w-32 h-32 md:w-48 md:h-48",
    md: "w-48 h-48 md:w-64 md:h-64",
    lg: "w-64 h-64 md:w-96 md:h-96",
    xl: "w-96 h-96 md:w-[32rem] md:h-[32rem]",
  };

  const blobVariants = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    animate: {
      scale: [1, 1.1, 0.95, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={`absolute pointer-events-none ${sizeMap[size]} ${className}`}
      style={{
        ...position,
        opacity,
        filter: blur ? "blur(60px)" : "none",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="w-full h-full"
        variants={!prefersReducedMotion && animate ? blobVariants : undefined}
        initial="initial"
        animate={!prefersReducedMotion && animate ? "animate" : undefined}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            fill={color}
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,76.8C26.4,84.6,10,87.6,-5.8,87.1C-21.6,86.6,-36.8,82.6,-50.2,74.9C-63.6,67.2,-75.2,55.8,-82.4,42.1C-89.6,28.4,-92.4,12.4,-90.8,-3.1C-89.2,-18.6,-83.2,-33.6,-74.4,-46.8C-65.6,-60,-54,-71.4,-40.4,-78.8C-26.8,-86.2,-11.6,-89.6,2.4,-93.6C16.4,-97.6,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default OrganicBlob;
