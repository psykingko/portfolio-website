"use client";

import React from "react";
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
  // Smooth parallax scroll effects with spring physics
  const { scrollY } = useScroll();
  const y1 = useSpring(useTransform(scrollY, [0, 300], [0, -50]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const y2 = useSpring(useTransform(scrollY, [0, 300], [0, -30]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const y3 = useSpring(useTransform(scrollY, [0, 300], [0, -20]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const x2 = useSpring(useTransform(scrollY, [0, 300], [0, 10]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const rotate1 = useSpring(useTransform(scrollY, [0, 300], [0, 15]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const rotate2 = useSpring(useTransform(scrollY, [0, 300], [0, -10]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scale1 = useSpring(useTransform(scrollY, [0, 300], [1, 1.1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Animation variants that respect reduced motion preferences
  const floatVariants = prefersReducedMotion
    ? { animate: {} }
    : floatingAnimation;

  const floatDelayedVariants = prefersReducedMotion
    ? { animate: {} }
    : floatingDelayed;

  const floatSlowVariants = prefersReducedMotion
    ? { animate: {} }
    : floatingSlow;

  const rotateVariants = prefersReducedMotion
    ? { animate: {} }
    : rotatingAnimation;

  const rotateReverseVariants = prefersReducedMotion
    ? { animate: {} }
    : rotatingReverse;

  return (
    <div className={`isometric-scene relative ${className}`.trim()}>
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
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

          {/* Shadow filters */}
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

        {/* Isometric pyramid - New element */}
        <motion.g
          variants={floatSlowVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y3,
            rotate: prefersReducedMotion ? 0 : rotate2,
          }}
        >
          <g filter="url(#softShadow)">
            {/* Pyramid faces */}
            <path
              d="M 80 200 L 120 180 L 100 150 Z"
              fill="url(#blueGradient)"
              opacity="0.8"
            />
            <path
              d="M 120 180 L 140 200 L 100 150 Z"
              fill="url(#blueGradient)"
              opacity="0.6"
            />
            <path
              d="M 80 200 L 140 200 L 120 180 Z"
              fill="url(#blueGradient)"
              opacity="0.9"
            />
            {/* Pyramid edges */}
            <path
              d="M 80 200 L 100 150 L 140 200"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              fill="none"
            />
          </g>
        </motion.g>

        {/* Small rotating triangle */}
        <motion.g
          variants={rotateVariants}
          animate="animate"
          style={{ originX: "100px", originY: "250px" }}
        >
          <path
            d="M 100 230 L 120 270 L 80 270 Z"
            fill="url(#tealGradient)"
            filter="url(#softShadow)"
            opacity="0.8"
          />
        </motion.g>

        {/* Floating hexagon with parallax */}
        <motion.g
          variants={floatSlowVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y3,
            rotate: prefersReducedMotion ? 0 : rotate1,
          }}
        >
          <path
            d="M 300 280 L 320 270 L 340 280 L 340 300 L 320 310 L 300 300 Z"
            fill="url(#blueGradient)"
            filter="url(#softShadow)"
            opacity="0.75"
          />
          {/* Hexagon highlight */}
          <path
            d="M 305 285 L 315 280 L 325 285"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            fill="none"
          />
        </motion.g>

        {/* Isometric cylinder - New complex element */}
        <motion.g
          variants={floatDelayedVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y2,
            rotate: prefersReducedMotion ? 0 : rotate2,
          }}
        >
          <g filter="url(#softShadow)">
            {/* Cylinder top ellipse */}
            <ellipse
              cx="280"
              cy="250"
              rx="20"
              ry="8"
              fill="url(#tealGradient)"
              opacity="0.9"
            />
            {/* Cylinder body */}
            <rect
              x="260"
              y="250"
              width="40"
              height="30"
              fill="url(#tealGradient)"
              opacity="0.7"
            />
            {/* Cylinder bottom ellipse */}
            <ellipse
              cx="280"
              cy="280"
              rx="20"
              ry="8"
              fill="url(#tealGradient)"
              opacity="0.8"
            />
            {/* Cylinder highlights */}
            <ellipse
              cx="275"
              cy="248"
              rx="8"
              ry="3"
              fill="rgba(255, 255, 255, 0.3)"
              opacity="0.6"
            />
          </g>
        </motion.g>

        {/* Isometric torus - Advanced 3D element */}
        <motion.g
          variants={floatVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y1,
            rotate: prefersReducedMotion ? 0 : rotate1,
          }}
        >
          <g filter="url(#glowEffect)" opacity="0.7">
            {/* Outer torus ring */}
            <ellipse
              cx="350"
              cy="150"
              rx="25"
              ry="10"
              fill="none"
              stroke="url(#primaryGradient)"
              strokeWidth="8"
              opacity="0.8"
            />
            {/* Inner torus highlight */}
            <ellipse
              cx="350"
              cy="148"
              rx="18"
              ry="7"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Torus depth lines */}
            <path
              d="M 325 150 Q 350 140 375 150"
              stroke="url(#primaryGradient)"
              strokeWidth="3"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M 325 150 Q 350 160 375 150"
              stroke="url(#primaryGradient)"
              strokeWidth="3"
              fill="none"
              opacity="0.3"
            />
          </g>
        </motion.g>

        {/* Small accent circles with parallax */}
        <motion.g
          variants={floatVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y2,
            x: prefersReducedMotion ? 0 : x2,
          }}
        >
          <circle
            cx="120"
            cy="300"
            r="12"
            fill="url(#orangeGradient)"
            opacity="0.6"
            filter="url(#softShadow)"
          />
          {/* Inner glow */}
          <circle
            cx="118"
            cy="298"
            r="4"
            fill="rgba(255, 255, 255, 0.4)"
            opacity="0.8"
          />
        </motion.g>

        <motion.g
          variants={floatDelayedVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y3,
            rotate: prefersReducedMotion ? 0 : rotate2,
          }}
        >
          <circle
            cx="280"
            cy="120"
            r="8"
            fill="url(#tealGradient)"
            opacity="0.7"
            filter="url(#softShadow)"
          />
          {/* Sparkle effect */}
          <circle
            cx="278"
            cy="118"
            r="2"
            fill="rgba(255, 255, 255, 0.6)"
            opacity="0.9"
          />
        </motion.g>

        {/* Floating isometric prism */}
        <motion.g
          variants={floatSlowVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y1,
            rotate: prefersReducedMotion ? 0 : rotate1,
          }}
        >
          <g filter="url(#softShadow)">
            {/* Prism faces */}
            <path
              d="M 60 120 L 90 110 L 90 140 L 60 150 Z"
              fill="url(#blueGradient)"
              opacity="0.8"
            />
            <path
              d="M 90 110 L 110 120 L 110 150 L 90 140 Z"
              fill="url(#blueGradient)"
              opacity="0.6"
            />
            <path
              d="M 60 120 L 90 110 L 110 120 L 80 130 Z"
              fill="url(#blueGradient)"
              opacity="0.9"
            />
            {/* Prism edges */}
            <path
              d="M 60 120 L 90 110 L 110 120"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1"
              fill="none"
            />
          </g>
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

        {/* Additional small floating elements with enhanced parallax */}
        <motion.g
          variants={floatSlowVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y3,
            rotate: prefersReducedMotion ? 0 : rotate2,
          }}
        >
          <rect
            x="70"
            y="180"
            width="16"
            height="16"
            rx="2"
            fill="url(#blueGradient)"
            opacity="0.6"
            filter="url(#softShadow)"
            transform="rotate(45 78 188)"
          />
          {/* Inner square highlight */}
          <rect
            x="74"
            y="184"
            width="8"
            height="8"
            rx="1"
            fill="rgba(255, 255, 255, 0.4)"
            opacity="0.7"
            transform="rotate(45 78 188)"
          />
        </motion.g>

        {/* Floating isometric star */}
        <motion.g
          variants={floatDelayedVariants}
          animate="animate"
          style={{
            y: prefersReducedMotion ? 0 : y1,
            rotate: prefersReducedMotion ? 0 : rotate1,
          }}
        >
          <g filter="url(#glowEffect)" opacity="0.6">
            <path
              d="M 50 300 L 55 290 L 65 290 L 57 283 L 60 273 L 50 280 L 40 273 L 43 283 L 35 290 L 45 290 Z"
              fill="url(#orangeGradient)"
              opacity="0.8"
            />
            {/* Star center highlight */}
            <circle
              cx="50"
              cy="285"
              r="3"
              fill="rgba(255, 255, 255, 0.5)"
              opacity="0.9"
            />
          </g>
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
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-teal rounded-full opacity-60 shadow-sm"
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
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent-blue rounded-full opacity-50 shadow-md"
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
          className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent-orange rounded-full opacity-70 shadow-sm"
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

        {/* Additional floating micro-elements */}
        <motion.div
          className="absolute top-1/3 right-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-40"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-6, 6, -6],
                  x: [-3, 3, -3],
                  opacity: [0.4, 0.8, 0.4],
                  transition: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  },
                }
          }
        />

        <motion.div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent-teal rounded-full opacity-30"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [8, -8, 8],
                  rotate: [0, -180, -360],
                  scale: [0.8, 1.2, 0.8],
                  transition: {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                  },
                }
          }
        />
      </div>
    </div>
  );
};

export default IsometricScene;
