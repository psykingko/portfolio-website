"use client";

import React, { useState, useEffect } from "react";

interface NavigationProps {
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems: NavItem[] = [
    { label: "About", href: "#about", ariaLabel: "Go to About section" },
    { label: "Skills", href: "#skills", ariaLabel: "Go to Skills section" },
    {
      label: "Projects",
      href: "#projects",
      ariaLabel: "Go to Projects section",
    },
    { label: "Contact", href: "#contact", ariaLabel: "Go to Contact section" },
  ];

  // Handle smooth scrolling to sections
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerHeight = 80; // Account for fixed header
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }

    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`navigation ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-10" role="menubar">
        {navItems.map(item => (
          <li key={item.href} role="none">
            <a
              href={item.href}
              onClick={e => handleNavClick(e, item.href)}
              className={`
                relative text-base font-medium transition-colors duration-200 ease-out
                hover:text-primary focus-visible
                ${
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-text-primary hover:text-primary"
                }
              `}
              role="menuitem"
              aria-label={item.ariaLabel}
            >
              {item.label}
              {/* Active indicator - subtle underline */}
              {activeSection === item.href.substring(1) && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  aria-hidden="true"
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-black/5 focus-visible transition-colors duration-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        aria-label={
          isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`
              block w-5 h-0.5 bg-text-primary transition-all duration-300 ease-out
              ${isMobileMenuOpen ? "rotate-45 translate-y-0.5" : ""}
            `}
          />
          <span
            className={`
              block w-5 h-0.5 bg-text-primary transition-all duration-300 ease-out mt-1
              ${isMobileMenuOpen ? "opacity-0" : ""}
            `}
          />
          <span
            className={`
              block w-5 h-0.5 bg-text-primary transition-all duration-300 ease-out mt-1
              ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}
            `}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-intense z-50 md:hidden
          transform transition-transform duration-300 ease-out
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-black/10">
            <h2
              id="mobile-menu-title"
              className="text-lg font-semibold text-text-primary"
            >
              Navigation
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-black/5 focus-visible transition-colors duration-200"
              aria-label="Close navigation menu"
            >
              <span className="sr-only">Close menu</span>
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="block w-5 h-0.5 bg-text-primary rotate-45 absolute" />
                <span className="block w-5 h-0.5 bg-text-primary -rotate-45 absolute" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav
            className="flex-1 px-6 py-8"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul
              className="space-y-6"
              role="menubar"
              aria-orientation="vertical"
            >
              {navItems.map(item => (
                <li key={item.href} role="none">
                  <a
                    href={item.href}
                    onClick={e => handleNavClick(e, item.href)}
                    className={`
                      block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ease-out
                      hover:bg-primary/5 hover:text-primary focus-visible
                      ${
                        activeSection === item.href.substring(1)
                          ? "text-primary bg-primary/5"
                          : "text-text-primary"
                      }
                    `}
                    role="menuitem"
                    aria-label={item.ariaLabel}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-black/10">
            <a
              href="/resume.pdf"
              download
              className="btn-base btn-primary w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
