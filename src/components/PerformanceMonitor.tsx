"use client";

import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }

    // Report Web Vitals
    if ("PerformanceObserver" in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            console.log("FID:", entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ["first-input"] });

        // Cumulative Layout Shift (CLS)
        let clsScore = 0;
        const clsObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
              console.log("CLS:", clsScore);
            }
          });
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
      } catch (e) {
        console.error("Performance monitoring error:", e);
      }
    }
  }, []);

  return null;
}
