import React, { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = "-50px 0px",
    delay = 0,
  } = options;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        controls.start("animate");
      }, delay * 1000);

      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      controls.start("initial");
    }
  }, [controls, inView, delay, triggerOnce]);

  return { ref, controls, inView };
};

// Hook for parallax scroll effects
export const useParallaxScroll = (offset: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate if element is in viewport
      if (
        scrolled + windowHeight > elementTop &&
        scrolled < elementTop + elementHeight
      ) {
        const yPos = -(scrolled - elementTop) * offset;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return ref;
};

// Hook for scroll-triggered counters/numbers
export const useScrollCounter = (
  endValue: number,
  duration: number = 2000,
  startValue: number = 0
) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [count, setCount] = React.useState(startValue);

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(
          easeOutQuart * (endValue - startValue) + startValue
        );

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, endValue, duration, startValue]);

  return { ref, count };
};
