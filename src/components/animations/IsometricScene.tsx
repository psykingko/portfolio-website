"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  floatingAnimation,
  floatingDelayed,
  floatingSlow,
  rotatingAnimation,
  rotatingReverse,
} from "../../utils/animations";

interface IsometricSceneProps {
  className?: string;
  prefersReducedMotion?: boolean;
}

export const IsometricScene: React.FC<IsometricSceneProps> = ({
  className = "",
  prefersReducedMotion = false,
}) => {
  // Smooth parallax scroll effects with spring physics - optimized config
  const { scrollY } = useScroll();

  const springConfig = useMemo(
    () => ({
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    }),
    []
  );

  const y1 = useSpring(useTransform(scrollY, [0, 300], [0, -50]), springConfig);
  const y2 = useSpring(useTransform(scrollY, [0, 300], [0, -30]), springConfig);
  const y3 = useSpring(useTransform(scrollY, [0, 300], [0, -20]), springConfig);
  const x2 = useSpring(useTransform(scrollY, [0, 300], [0, 10]), springConfig);
  const rotate1 = useSpring(
    useTransform(scrollY, [0, 300], [0, 15]),
    springConfig
  );
  const rotate2 = useSpring(
    useTransform(scrollY, [0, 300], [0, -10]),
    springConfig
  );
  const scale1 = useSpring(
    useTransform(scrollY, [0, 300], [1, 1.1]),
    springConfig
  );

  // Memoize animation variants
  const floatVariants = useMemo(
    () => (prefersReducedMotion ? { animate: {} } : floatingAnimation),
    [prefersReducedMotion]
  );

  const floatDelayedVariants = useMemo(
    () => (prefersReducedMotion ? { animate: {} } : floatingDelayed),
    [prefersReducedMotion]
  );

  const floatSlowVariants = useMemo(
    () => (prefersReducedMotion ? { animate: {} } : floatingSlow),
    [prefersReducedMotion]
  );

  const rotateVariants = useMemo(
    () => (prefersReducedMotion ? { animate: {} } : rotatingAnimation),
    [prefersReducedMotion]
  );

  const rotateReverseVariants = useMemo(
    () => (prefersReducedMotion ? { animate: {} } : rotatingReverse),
    [prefersReducedMotion]
  );

  return (
    <div className={`isometric-scene relative ${className}`.trim()}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full gpu-accelerated"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Animated isometric 3D scene with floating geometric shapes"
      >
        {/* Gradient Definitions */}
        <defs>
          {/* Primary gradient for main shapes */}
          <linearGradient
            id="primaryGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7b5ae6" />
            <stop offset="100%" stopColor="#5634d6" />
          </linearGradient>

          {/* Accent gradients */}
          <linearGradient
            id="orangeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ff8a65" />
            <stop offset="100%" stopColor="#ff6b35" />
          </linearGradient>

          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4db6e6" />
            <stop offset="100%" stopColor="#166c96" />
          </linearGradient>

          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#80e5de" />
            <stop offset="100%" stopColor="#4ecdc4" />
          </linearGradient>

          {/* Shadow filters - optimized */}
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="2"
              dy="8"
              stdDeviation="8"
              floodColor="rgba(86, 52, 214, 0.15)"
            />
          </filter>

          <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="rgba(86, 52, 214, 0.3)"
            />
          </filter>
        </defs>

        {/* Background subtle pattern */}
        <motion.g opacity={0.1}>
          <circle cx="50" cy="50" r="2" fill="url(#primaryGradient)" />
          <circle cx="350" cy="80" r="1.5" fill="url(#orangeGradient)" />
          <circle cx="80" cy="320" r="1" fill="url(#blueGradient)" />
          <circle cx="320" cy="350" r="2" fill="url(#tealGradient)" />
        </motion.g>

        {/* Main floating cube - Primary element with parallax */}
        <motion.g
          variants={floatVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y1,
            rotate: prefersReducedMotion ? 0 : rotate1,
          }}
        >
          <g filter="url(#softShadow)">
            {/* Isometric cube faces */}
            {/* Top face */}
            <path
              d="M 150 120 L 200 100 L 250 120 L 200 140 Z"
              fill="url(#primaryGradient)"
              opacity="0.9"
            />
            {/* Left face */}
            <path
              d="M 150 120 L 200 140 L 200 190 L 150 170 Z"
              fill="url(#primaryGradient)"
              opacity="0.7"
            />
            {/* Right face */}
            <path
              d="M 200 140 L 250 120 L 250 170 L 200 190 Z"
              fill="url(#primaryGradient)"
              opacity="0.8"
            />
            {/* Edge highlights for 3D effect */}
            <path
              d="M 150 120 L 200 100 L 250 120"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 200 100 L 200 150"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              fill="none"
            />
          </g>
        </motion.g>

        {/* Secondary floating sphere with parallax */}
        <motion.g
          variants={floatDelayedVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y2,
            x: prefersReducedMotion ? 0 : x2,
          }}
        >
          <circle
            cx="320"
            cy="180"
            r="25"
            fill="url(#orangeGradient)"
            filter="url(#softShadow)"
            opacity="0.85"
          />
          {/* Highlight on sphere */}
          <circle
            cx="315"
            cy="175"
            r="8"
            fill="rgba(255, 255, 255, 0.3)"
            opacity="0.6"
          />
          {/* Additional highlight for depth */}
          <circle
            cx="312"
            cy="172"
            r="3"
            fill="rgba(255, 255, 255, 0.5)"
            opacity="0.8"
          />
        </motion.g>

        {/* Small rotating triangle */}
        <motion.g
          variants={rotateVariants}
          animate="animate"
          style={{
            originX: "100px",
            originY: "250px",
          }}
        >
          <path
            d="M 100 230 L 120 270 L 80 270 Z"
            fill="url(#tealGradient)"
            filter="url(#softShadow)"
            opacity="0.8"
          />
        </motion.g>

        {/* Rotating diamond with parallax */}
        <motion.g
          variants={rotateReverseVariants}
          animate="animate"
          style={{
            originX: "350px",
            originY: "300px",
            y: prefersReducedMotion ? 0 : y2,
            scale: prefersReducedMotion ? 1 : scale1,
          }}
        >
          <path
            d="M 350 285 L 365 300 L 350 315 L 335 300 Z"
            fill="url(#primaryGradient)"
            filter="url(#glowEffect)"
            opacity="0.8"
          />
          {/* Diamond inner highlight */}
          <path
            d="M 350 290 L 358 300 L 350 310 L 342 300 Z"
            fill="rgba(255, 255, 255, 0.3)"
            opacity="0.6"
          />
        </motion.g>

        {/* Subtle connecting lines for depth */}
        <motion.g opacity={0.2} variants={floatVariants} animate="animate">
          <line
            x1="200"
            y1="140"
            x2="320"
            y2="180"
            stroke="url(#primaryGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <line
            x1="100"
            y1="250"
            x2="200"
            y2="140"
            stroke="url(#orangeGradient)"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
        </motion.g>

        {/* Ambient light effects */}
        <motion.g opacity={0.1}>
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="1"
            strokeDasharray="10,20"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="url(#orangeGradient)"
            strokeWidth="0.5"
            strokeDasharray="5,15"
          />
        </motion.g>
      </svg>

      {/* CSS-based floating elements for additional depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles with enhanced animations */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-teal rounded-full opacity-60 shadow-sm gpu-accelerated"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent-blue rounded-full opacity-50 shadow-md gpu-accelerated"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                  rotate: [0, 180, 360],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }
          }
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent-orange rounded-full opacity-70 shadow-sm gpu-accelerated"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-8, 8, -8],
                  scale: [1, 1.5, 1],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  },
                }
          }
        />
      </div>
    </div>
  );
};

export default IsometricScene;
