import { useEffect, useState } from "react";

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Implementation will be added in Phase 2.3
    // Will check for prefers-reduced-motion media query
    // Will provide appropriate animation configurations
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return {
    prefersReducedMotion,
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6 },
    animate: prefersReducedMotion ? {} : { y: 0, opacity: 1 },
  };
};
