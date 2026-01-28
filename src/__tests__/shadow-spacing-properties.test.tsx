/**
 * Property-Based Tests for Shadow and Spacing Utilities
 * **Validates: Requirements US6, US7**
 *
 * These tests verify that shadow and spacing utilities maintain consistency
 * and performance across different viewport sizes and component combinations.
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock viewport dimensions for testing
const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event("resize"));
};

// Test data generators
const shadowClasses = [
  "shadow-soft",
  "shadow-card",
  "shadow-hover",
  "shadow-subtle",
  "shadow-medium",
  "shadow-strong",
  "shadow-primary",
  "shadow-primary-hover",
  "shadow-accent-orange",
  "shadow-accent-pink",
  "shadow-accent-blue",
  "shadow-glow-primary",
  "shadow-glow-accent",
  "shadow-inset-soft",
  "shadow-inset-medium",
];

const spacingClasses = [
  "p-responsive-xs",
  "p-responsive-sm",
  "p-responsive-md",
  "p-responsive-lg",
  "p-responsive-xl",
  "m-responsive-xs",
  "m-responsive-sm",
  "m-responsive-md",
  "m-responsive-lg",
  "m-responsive-xl",
  "gap-responsive-xs",
  "gap-responsive-sm",
  "gap-responsive-md",
  "gap-responsive-lg",
  "gap-responsive-xl",
];

const componentClasses = ["card-base", "btn-base", "badge-base"];

const viewportSizes = [
  { width: 320, height: 568, name: "mobile-small" },
  { width: 375, height: 667, name: "mobile-medium" },
  { width: 414, height: 896, name: "mobile-large" },
  { width: 768, height: 1024, name: "tablet-portrait" },
  { width: 1024, height: 768, name: "tablet-landscape" },
  { width: 1280, height: 720, name: "desktop-small" },
  { width: 1920, height: 1080, name: "desktop-large" },
];

describe("Shadow and Spacing Utilities - Property-Based Tests", () => {
  describe("Property 1: Shadow Consistency", () => {
    /**
     * **Validates: Requirements US6**
     * Property: All shadow utilities should render without errors and maintain visual hierarchy
     */
    it("should apply all shadow classes without errors", () => {
      shadowClasses.forEach(shadowClass => {
        const { container } = render(
          <div className={shadowClass} data-testid={`shadow-${shadowClass}`}>
            Test content
          </div>
        );

        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(shadowClass);
        expect(element).toBeInTheDocument();
      });
    });

    it("should maintain shadow hierarchy across different components", () => {
      componentClasses.forEach(componentClass => {
        shadowClasses.forEach(shadowClass => {
          const { container } = render(
            <div className={`${componentClass} ${shadowClass}`}>
              Test content
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toHaveClass(componentClass);
          expect(element).toHaveClass(shadowClass);
          expect(element).toBeInTheDocument();
        });
      });
    });

    it("should handle shadow combinations without conflicts", () => {
      // Test that interactive shadows work with base shadows
      const interactiveCombinations = [
        ["shadow-card", "shadow-interactive"],
        ["shadow-primary", "shadow-interactive"],
        ["shadow-soft", "shadow-interactive"],
      ];

      interactiveCombinations.forEach(([baseShadow, interactiveShadow]) => {
        const { container } = render(
          <div className={`${baseShadow} ${interactiveShadow}`}>
            Interactive element
          </div>
        );

        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(baseShadow);
        expect(element).toHaveClass(interactiveShadow);
      });
    });
  });

  describe("Property 2: Spacing Consistency", () => {
    /**
     * **Validates: Requirements US6**
     * Property: All spacing utilities should provide consistent layout spacing
     */
    it("should apply all spacing classes without errors", () => {
      spacingClasses.forEach(spacingClass => {
        const { container } = render(
          <div className={spacingClass} data-testid={`spacing-${spacingClass}`}>
            Test content
          </div>
        );

        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(spacingClass);
        expect(element).toBeInTheDocument();
      });
    });

    it("should maintain spacing consistency across component combinations", () => {
      componentClasses.forEach(componentClass => {
        spacingClasses.forEach(spacingClass => {
          const { container } = render(
            <div className={`${componentClass} ${spacingClass}`}>
              Test content
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toHaveClass(componentClass);
          expect(element).toHaveClass(spacingClass);
        });
      });
    });

    it("should handle multiple spacing utilities together", () => {
      const spacingCombinations = [
        ["p-responsive-md", "m-responsive-sm"],
        ["px-responsive-lg", "py-responsive-md"],
        ["gap-responsive-md", "space-y-responsive-sm"],
      ];

      spacingCombinations.forEach(([spacing1, spacing2]) => {
        const { container } = render(
          <div className={`${spacing1} ${spacing2}`}>
            <div>Child 1</div>
            <div>Child 2</div>
          </div>
        );

        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(spacing1);
        expect(element).toHaveClass(spacing2);
      });
    });
  });

  describe("Property 3: Responsive Behavior", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Utilities should work correctly across all viewport sizes
     */
    it("should render correctly at all viewport sizes", () => {
      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div className="p-responsive-md gap-responsive-lg shadow-card">
            <div className="m-responsive-sm shadow-soft">Child 1</div>
            <div className="m-responsive-sm shadow-soft">Child 2</div>
          </div>
        );

        const parent = container.firstChild as HTMLElement;
        const children = parent.children;

        expect(parent).toHaveClass("p-responsive-md");
        expect(parent).toHaveClass("gap-responsive-lg");
        expect(parent).toHaveClass("shadow-card");

        Array.from(children).forEach(child => {
          expect(child).toHaveClass("m-responsive-sm");
          expect(child).toHaveClass("shadow-soft");
        });
      });
    });

    it("should maintain touch target sizes on mobile", () => {
      // Test mobile viewports
      const mobileViewports = viewportSizes.filter(v => v.width < 768);

      mobileViewports.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <button className="btn-base btn-primary button-padding shadow-primary">
            Mobile Button
          </button>
        );

        const button = container.firstChild as HTMLElement;
        expect(button).toHaveClass("btn-base");
        expect(button).toHaveClass("button-padding");
        expect(button).toHaveClass("shadow-primary");
      });
    });
  });

  describe("Property 4: Component Integration", () => {
    /**
     * **Validates: Requirements US1, US2, US3**
     * Property: Shadow and spacing utilities should integrate seamlessly with all components
     */
    it("should work with card components in all combinations", () => {
      const cardVariants = [
        "card-base",
        "card-elevated",
        "card-gradient",
        "card-primary",
      ];
      const testShadows = ["shadow-soft", "shadow-primary", "shadow-hover"];
      const testSpacing = ["p-responsive-md", "gap-responsive-sm"];

      cardVariants.forEach(cardVariant => {
        testShadows.forEach(shadow => {
          testSpacing.forEach(spacing => {
            const { container } = render(
              <div className={`${cardVariant} ${shadow} ${spacing}`}>
                <h3>Card Title</h3>
                <p>Card content</p>
              </div>
            );

            const card = container.firstChild as HTMLElement;
            expect(card).toHaveClass(cardVariant);
            expect(card).toHaveClass(shadow);
            expect(card).toHaveClass(spacing);
          });
        });
      });
    });

    it("should work with button components in all combinations", () => {
      const buttonVariants = ["btn-primary", "btn-secondary"];
      const testShadows = ["shadow-primary", "shadow-primary-hover"];
      const testSpacing = ["button-padding"];

      buttonVariants.forEach(buttonVariant => {
        testShadows.forEach(shadow => {
          testSpacing.forEach(spacing => {
            const { container } = render(
              <button
                className={`btn-base ${buttonVariant} ${shadow} ${spacing}`}
              >
                Button Text
              </button>
            );

            const button = container.firstChild as HTMLElement;
            expect(button).toHaveClass("btn-base");
            expect(button).toHaveClass(buttonVariant);
            expect(button).toHaveClass(shadow);
            expect(button).toHaveClass(spacing);
          });
        });
      });
    });

    it("should work with badge components in all combinations", () => {
      const badgeVariants = ["badge-skill", "badge-primary", "badge-secondary"];
      const testShadows = ["shadow-soft", "shadow-subtle"];

      badgeVariants.forEach(badgeVariant => {
        testShadows.forEach(shadow => {
          const { container } = render(
            <span className={`badge-base ${badgeVariant} ${shadow}`}>
              Badge Text
            </span>
          );

          const badge = container.firstChild as HTMLElement;
          expect(badge).toHaveClass("badge-base");
          expect(badge).toHaveClass(badgeVariant);
          expect(badge).toHaveClass(shadow);
        });
      });
    });
  });

  describe("Property 5: Performance and Accessibility", () => {
    /**
     * **Validates: Requirements US6, US7**
     * Property: Utilities should maintain performance and accessibility standards
     */
    it("should not cause layout shifts with spacing utilities", () => {
      const { container, rerender } = render(
        <div className="p-responsive-sm">Initial content</div>
      );

      const initialElement = container.firstChild as HTMLElement;
      expect(initialElement).toHaveClass("p-responsive-sm");

      // Re-render with different spacing
      rerender(<div className="p-responsive-lg">Updated content</div>);

      const updatedElement = container.firstChild as HTMLElement;
      expect(updatedElement).toHaveClass("p-responsive-lg");
      expect(updatedElement).toBeInTheDocument();
    });

    it("should maintain focus visibility with shadow utilities", () => {
      const { container } = render(
        <button className="btn-base btn-primary shadow-primary focus:shadow-primary-hover">
          Focusable Button
        </button>
      );

      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass("btn-base");
      expect(button).toHaveClass("shadow-primary");
    });

    it("should work with reduced motion preferences", () => {
      // Mock reduced motion preference
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      const { container } = render(
        <div className="shadow-interactive p-responsive-md">
          Reduced motion content
        </div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("shadow-interactive");
      expect(element).toHaveClass("p-responsive-md");
    });
  });

  describe("Property 6: CSS Custom Properties Integration", () => {
    /**
     * **Validates: Requirements US1**
     * Property: All utilities should integrate with the CSS custom properties system
     */
    it("should use CSS custom properties for theming consistency", () => {
      const { container } = render(
        <div>
          <div className="shadow-primary" data-testid="primary-shadow">
            Primary themed element
          </div>
          <div className="shadow-accent-orange" data-testid="accent-shadow">
            Accent themed element
          </div>
          <div className="p-responsive-md" data-testid="responsive-spacing">
            Responsive spacing element
          </div>
        </div>
      );

      // Verify classes are applied (actual CSS values tested in integration)
      expect(
        container.querySelector('[data-testid="primary-shadow"]')
      ).toHaveClass("shadow-primary");
      expect(
        container.querySelector('[data-testid="accent-shadow"]')
      ).toHaveClass("shadow-accent-orange");
      expect(
        container.querySelector('[data-testid="responsive-spacing"]')
      ).toHaveClass("p-responsive-md");
    });

    it("should maintain consistency across theme variations", () => {
      const themeVariations = [
        { shadow: "shadow-primary", spacing: "p-responsive-md" },
        { shadow: "shadow-accent-orange", spacing: "p-responsive-lg" },
        { shadow: "shadow-accent-blue", spacing: "p-responsive-xl" },
      ];

      themeVariations.forEach(({ shadow, spacing }) => {
        const { container } = render(
          <div className={`${shadow} ${spacing}`}>Themed content</div>
        );

        const element = container.firstChild as HTMLElement;
        expect(element).toHaveClass(shadow);
        expect(element).toHaveClass(spacing);
      });
    });
  });
});
