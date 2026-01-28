"use client";

import React, { useEffect } from "react";

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  useEffect(() => {
    // Handle back to top button visibility and functionality
    const handleScroll = () => {
      const backToTopButton = document.getElementById("back-to-top");
      if (backToTopButton) {
        const scrollTop = window.scrollY;
        if (scrollTop > 300) {
          backToTopButton.style.opacity = "1";
          backToTopButton.style.visibility = "visible";
          backToTopButton.style.transform = "translateY(0)";
        } else {
          backToTopButton.style.opacity = "0";
          backToTopButton.style.visibility = "invisible";
          backToTopButton.style.transform = "translateY(100px)";
        }
      }
    };

    // Handle back to top button click
    const handleBackToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);

    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
      backToTopButton.addEventListener("click", handleBackToTop);
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (backToTopButton) {
        backToTopButton.removeEventListener("click", handleBackToTop);
      }
    };
  }, []);

  // Handle keyboard navigation for skip links
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key to close any open modals or menus
      if (e.key === "Escape") {
        // This will be useful for future modal implementations
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {children}
      {/* Back to top button */}
      <button
        id="back-to-top"
        className="fixed bottom-6 right-6 z-40 p-3 bg-primary text-white rounded-full shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-primary-dark focus-visible"
        aria-label="Back to top"
        style={{ transform: "translateY(100px)" }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
};

export default LayoutClient;
