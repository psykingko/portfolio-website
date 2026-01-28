"use client";

import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setIsScrolled(scrollTop > 20);
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-[60] transition-transform duration-300 ease-out"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: "left",
        }}
        aria-hidden="true"
      />

      <header
        id="navigation"
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out
          ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-soft"
              : "bg-transparent"
          }
          ${className}
        `}
        role="banner"
        aria-label="Site header"
      >
        <div className="container-xl">
          <div className="flex items-center justify-between py-5">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <a
                href="#hero"
                className="text-xl font-bold text-primary hover:text-primary-dark transition-colors duration-200 focus:outline-none focus-visible:outline-none"
                aria-label="Ashish Singh - Go to top"
              >
                <span className="font-display">Ashish Singh</span>
              </a>
            </div>

            {/* Navigation */}
            <Navigation />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
