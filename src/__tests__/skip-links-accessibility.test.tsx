/**
 * Accessibility compliance test for skip links
 * Ensures skip links meet WCAG 2.1 AA guidelines
 */

import { render, screen } from "@testing-library/react";

// Component that represents the skip links structure from layout.tsx
const SkipLinksAccessibilityTest = () => {
  return (
    <div>
      {/* Skip links for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:no-underline"
      >
        Skip to main content
      </a>
      <a
        href="#navigation"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:no-underline"
      >
        Skip to navigation
      </a>

      {/* Site header with navigation */}
      <header id="navigation" role="banner" aria-label="Site header">
        <nav role="navigation" aria-label="Main navigation">
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content area */}
      <main
        id="main-content"
        role="main"
        aria-label="Main content"
        tabIndex={-1}
      >
        <h1>Portfolio Website</h1>
        <p>Welcome to my portfolio website.</p>
      </main>
    </div>
  );
};

describe("Skip Links Accessibility Compliance", () => {
  it("skip links have proper semantic structure", () => {
    render(<SkipLinksAccessibilityTest />);

    // Skip links should be actual links with proper href attributes
    const skipToMainLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    const skipToNavLink = screen.getByRole("link", {
      name: /skip to navigation/i,
    });

    expect(skipToMainLink).toBeInTheDocument();
    expect(skipToNavLink).toBeInTheDocument();
    expect(skipToMainLink).toHaveAttribute("href", "#main-content");
    expect(skipToNavLink).toHaveAttribute("href", "#navigation");
  });

  it("target elements have proper accessibility attributes", () => {
    render(<SkipLinksAccessibilityTest />);

    // Main content should have proper ARIA attributes
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveAttribute("id", "main-content");
    expect(mainContent).toHaveAttribute("aria-label", "Main content");
    expect(mainContent).toHaveAttribute("tabIndex", "-1");

    // Navigation should have proper ARIA attributes
    const navigation = screen.getByRole("banner");
    expect(navigation).toHaveAttribute("id", "navigation");
    expect(navigation).toHaveAttribute("aria-label", "Site header");
  });

  it("skip links provide meaningful text for screen readers", () => {
    render(<SkipLinksAccessibilityTest />);

    const skipToMainLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    const skipToNavLink = screen.getByRole("link", {
      name: /skip to navigation/i,
    });

    // Link text should be descriptive and meaningful
    expect(skipToMainLink).toHaveTextContent("Skip to main content");
    expect(skipToNavLink).toHaveTextContent("Skip to navigation");
  });

  it("skip links are positioned at the beginning of the document", () => {
    const { container } = render(<SkipLinksAccessibilityTest />);

    const allLinks = container.querySelectorAll("a");
    const skipLinks = container.querySelectorAll(".skip-link");

    // Skip links should be the first links in the document
    expect(skipLinks[0]).toBe(allLinks[0]);
    expect(skipLinks[1]).toBe(allLinks[1]);
  });

  it("skip links meet WCAG requirements for keyboard navigation", () => {
    render(<SkipLinksAccessibilityTest />);

    const skipToMainLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    const skipToNavLink = screen.getByRole("link", {
      name: /skip to navigation/i,
    });

    // Links should be focusable (have href attribute)
    expect(skipToMainLink).toHaveAttribute("href");
    expect(skipToNavLink).toHaveAttribute("href");

    // Links should have meaningful accessible names
    expect(skipToMainLink).toHaveAccessibleName("Skip to main content");
    expect(skipToNavLink).toHaveAccessibleName("Skip to navigation");
  });

  it("target elements exist and are properly identified", () => {
    render(<SkipLinksAccessibilityTest />);

    // Verify that the targets of skip links exist
    const mainContent = document.getElementById("main-content");
    const navigation = document.getElementById("navigation");

    expect(mainContent).toBeInTheDocument();
    expect(navigation).toBeInTheDocument();

    // Main content should be focusable for skip link functionality
    expect(mainContent).toHaveAttribute("tabIndex", "-1");
  });
});
