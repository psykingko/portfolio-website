// Animation utilities for Framer Motion and CSS animations
import { Variants } from "framer-motion";

// Common animation variants for Framer Motion
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Hover and interaction animations
export const scaleOnHover: Variants = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  whileTap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

export const liftOnHover: Variants = {
  whileHover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

export const rotateOnHover: Variants = {
  whileHover: {
    rotate: 5,
    transition: { duration: 0.3 },
  },
};

// Floating animations for isometric elements
export const floatingAnimation: Variants = {
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const floatingDelayed: Variants = {
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      delay: 2,
    },
  },
};

export const floatingSlow: Variants = {
  animate: {
    y: [-15, 15, -15],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
      delay: 4,
    },
  },
};

// Rotation animations for 3D elements
export const rotatingAnimation: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const rotatingReverse: Variants = {
  animate: {
    rotate: [360, 0],
    transition: {
      duration: 25,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// Page transition animations
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Utility functions
export const getReducedMotionVariant = (
  variant: Variants,
  prefersReducedMotion: boolean
): Variants => {
  if (prefersReducedMotion) {
    // Return variant with no animations
    return {
      initial: variant.animate || {},
      animate: variant.animate || {},
    };
  }
  return variant;
};

export const createStaggeredAnimation = (
  children: number,
  staggerDelay: number = 0.1,
  childDelay: number = 0.3
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childDelay,
    },
  },
});

// Custom easing functions
export const customEasing = {
  smooth: [0.6, -0.05, 0.01, 0.99],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  sharp: [0.4, 0, 0.2, 1],
} as const;

// Animation presets for common UI elements
export const buttonAnimation: Variants = {
  whileHover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2 },
  },
  whileTap: {
    scale: 0.98,
    y: 0,
    transition: { duration: 0.1 },
  },
};

export const cardAnimation: Variants = {
  whileHover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

export const badgeAnimation: Variants = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

// Scroll-triggered animation configurations
export const scrollRevealConfig = {
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: "-50px 0px",
};

export const scrollParallaxConfig = {
  offset: ["start end", "end start"],
  clamp: false,
};

export type AnimationVariant = keyof typeof fadeInUp;
export type EasingKey = keyof typeof customEasing;
