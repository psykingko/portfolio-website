/**
 * Integration test to verify skip links functionality
 * This test focuses on the actual skip link behavior and accessibility
 */

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Simple test component that includes the skip links structure
const SkipLinksTestComponent = () => {
  return (
    <div>
      {/* Skip links */}
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

      {/* Navigation */}
      <header id="navigation">
        <nav>
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

      {/* Main content */}
      <main id="main-content" tabIndex={-1}>
        <h1>Welcome to the Portfolio</h1>
        <p>This is the main content area.</p>
      </main>
    </div>
  );
};

describe("Skip Links Integration", () => {
  it("skip links are hidden by default but visible when focused", async () => {
    const user = userEvent.setup();
    render(<SkipLinksTestComponent />);

    const skipToMainLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });

    // Skip link should have sr-only class (visually hidden)
    expect(skipToMainLink).toHaveClass("sr-only");

    // Focus the skip link (simulating Tab key press)
    await user.tab();

    // The link should now be focused
    expect(skipToMainLink).toHaveFocus();

    // It should have the focus classes that make it visible
    expect(skipToMainLink).toHaveClass("focus:not-sr-only");
  });

  it("skip links navigate to correct targets", () => {
    render(<SkipLinksTestComponent />);

    const skipToMainLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    const skipToNavLink = screen.getByRole("link", {
      name: /skip to navigation/i,
    });

    // Verify the links point to the correct targets
    expect(skipToMainLink.getAttribute("href")).toBe("#main-content");
    expect(skipToNavLink.getAttribute("href")).toBe("#navigation");

    // Verify the target elements exist
    expect(document.getElementById("main-content")).toBeInTheDocument();
    expect(document.getElementById("navigation")).toBeInTheDocument();
  });

  it("main content is focusable for skip link functionality", () => {
    render(<SkipLinksTestComponent />);

    const mainContent = screen.getByRole("main");

    // Main content should have tabIndex="-1" to be focusable programmatically
    expect(mainContent).toHaveAttribute("tabIndex", "-1");
    expect(mainContent).toHaveAttribute("id", "main-content");
  });

  it("skip links appear in correct tab order", async () => {
    const user = userEvent.setup();
    render(<SkipLinksTestComponent />);

    // First tab should focus the first skip link
    await user.tab();
    expect(
      screen.getByRole("link", { name: /skip to main content/i })
    ).toHaveFocus();

    // Second tab should focus the second skip link
    await user.tab();
    expect(
      screen.getByRole("link", { name: /skip to navigation/i })
    ).toHaveFocus();
  });

  it("skip links have proper styling classes for accessibility", () => {
    render(<SkipLinksTestComponent />);

    const skipToMainLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    const skipToNavLink = screen.getByRole("link", {
      name: /skip to navigation/i,
    });

    // Both skip links should have the skip-link class
    expect(skipToMainLink).toHaveClass("skip-link");
    expect(skipToNavLink).toHaveClass("skip-link");

    // They should have proper focus styling classes
    expect(skipToMainLink).toHaveClass("focus:bg-primary", "focus:text-white");
    expect(skipToNavLink).toHaveClass("focus:bg-primary", "focus:text-white");
  });
});
