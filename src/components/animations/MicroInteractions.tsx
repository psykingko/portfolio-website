"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface MicroInteractionProps {
  children: React.ReactNode;
  type?: "hover" | "tap" | "focus" | "all";
  effect?: "lift" | "scale" | "rotate" | "glow" | "bounce" | "shake" | "pulse";
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
  disabled?: boolean;
}

const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  type = "all",
  effect = "lift",
  intensity = "medium",
  className = "",
  disabled = false,
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getIntensityValue = (base: number): number => {
    switch (intensity) {
      case "subtle":
        return base * 0.5;
      case "medium":
        return base;
      case "strong":
        return base * 1.5;
      default:
        return base;
    }
  };

  const getVariants = (): Variants => {
    const variants: Variants = {};

    if (type === "hover" || type === "all") {
      switch (effect) {
        case "lift":
          variants.whileHover = {
            y: -getIntensityValue(8),
            transition: { duration: 0.3, ease: "easeOut" },
          };
          break;
        case "scale":
          variants.whileHover = {
            scale: 1 + getIntensityValue(0.05),
            transition: { duration: 0.2, ease: "easeOut" },
          };
          break;
        case "rotate":
          variants.whileHover = {
            rotate: getIntensityValue(5),
            transition: { duration: 0.3, ease: "easeOut" },
          };
          break;
        case "glow":
          variants.whileHover = {
            filter: `drop-shadow(0 0 ${getIntensityValue(20)}px rgba(86, 52, 214, 0.3))`,
            transition: { duration: 0.3, ease: "easeOut" },
          };
          break;
        case "bounce":
          variants.whileHover = {
            y: [-2, -8, -2],
            transition: {
              duration: 0.6,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            },
          };
          break;
        case "pulse":
          variants.whileHover = {
            scale: [1, 1 + getIntensityValue(0.05), 1],
            transition: {
              duration: 0.8,
              ease: "easeInOut",
              repeat: Infinity,
            },
          };
          break;
      }
    }

    if (type === "tap" || type === "all") {
      variants.whileTap = {
        scale: 1 - getIntensityValue(0.05),
        transition: { duration: 0.1, ease: "easeInOut" },
      };
    }

    if (type === "focus" || type === "all") {
      variants.whileFocus = {
        scale: 1 + getIntensityValue(0.02),
        transition: { duration: 0.2, ease: "easeOut" },
      };
    }

    return variants;
  };

  return (
    <motion.div className={className} variants={getVariants()}>
      {children}
    </motion.div>
  );
};

// Specialized micro-interaction components
export const HoverLift: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}> = ({ children, className, intensity = "medium" }) => (
  <MicroInteraction
    type="hover"
    effect="lift"
    intensity={intensity}
    className={className}
  >
    {children}
  </MicroInteraction>
);

export const HoverScale: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}> = ({ children, className, intensity = "medium" }) => (
  <MicroInteraction
    type="hover"
    effect="scale"
    intensity={intensity}
    className={className}
  >
    {children}
  </MicroInteraction>
);

export const HoverGlow: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}> = ({ children, className, intensity = "medium" }) => (
  <MicroInteraction
    type="hover"
    effect="glow"
    intensity={intensity}
    className={className}
  >
    {children}
  </MicroInteraction>
);

export const TapScale: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <MicroInteraction type="tap" effect="scale" className={className}>
    {children}
  </MicroInteraction>
);

// Button with comprehensive micro-interactions
export const InteractiveButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}> = ({
  children,
  className = "",
  onClick,
  disabled = false,
  variant = "primary",
}) => {
  const { prefersReducedMotion } = useReducedMotion();

  const buttonVariants: Variants = prefersReducedMotion
    ? {}
    : {
        whileHover: {
          scale: 1.02,
          y: -2,
          transition: { duration: 0.2, ease: "easeOut" },
        },
        whileTap: {
          scale: 0.98,
          y: 0,
          transition: { duration: 0.1, ease: "easeInOut" },
        },
      };

  const baseClasses = "relative overflow-hidden transition-all duration-200";
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-light text-white",
    secondary: "bg-accent-orange hover:bg-orange-600 text-white",
    ghost:
      "bg-transparent hover:bg-primary/10 text-primary border border-primary",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      variants={buttonVariants}
      onClick={onClick}
      disabled={disabled}
      whileHover="whileHover"
      whileTap="whileTap"
    >
      {/* Ripple effect overlay */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full scale-0"
          whileTap={{
            scale: 4,
            opacity: [0.5, 0],
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        />
      )}
      {children}
    </motion.button>
  );
};

export default MicroInteraction;
