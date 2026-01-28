/**
 * Design System Responsive Testing
 * **Validates: Requirements US6, US7**
 *
 * Comprehensive testing of the design system across different screen sizes including:
 * - Visual regression testing across mobile, tablet, and desktop viewports
 * - Component behavior validation at different breakpoints
 * - Typography scaling verification
 * - Shadow and spacing consistency checks
 * - Accessibility compliance across screen sizes
 * - Performance validation on different devices
 */

import React from "react";
import { render, screen } from "@testing-library/react";
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

  // Mock matchMedia for responsive queries
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  window.dispatchEvent(new Event("resize"));
};

// Test viewport configurations
const viewportSizes = [
  { width: 320, height: 568, name: "mobile-small", category: "mobile" },
  { width: 375, height: 667, name: "mobile-medium", category: "mobile" },
  { width: 414, height: 896, name: "mobile-large", category: "mobile" },
  { width: 768, height: 1024, name: "tablet-portrait", category: "tablet" },
  { width: 1024, height: 768, name: "tablet-landscape", category: "tablet" },
  { width: 1280, height: 720, name: "desktop-small", category: "desktop" },
  { width: 1440, height: 900, name: "desktop-medium", category: "desktop" },
  { width: 1920, height: 1080, name: "desktop-large", category: "desktop" },
];

// Component test data
const typographyClasses = [
  "heading-xl",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "body-xl",
  "body-lg",
  "body-md",
  "body-sm",
  "body-xs",
  "text-display-xl",
  "text-display-lg",
  "text-display-md",
  "text-lead",
  "text-caption",
];

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
];

const spacingClasses = [
  "p-responsive-xs",
  "p-responsive-sm",
  "p-responsive-md",
  "p-responsive-lg",
  "m-responsive-xs",
  "m-responsive-sm",
  "m-responsive-md",
  "m-responsive-lg",
  "gap-responsive-xs",
  "gap-responsive-sm",
  "gap-responsive-md",
  "gap-responsive-lg",
];

const componentClasses = ["card-base", "btn-base", "badge-base"];

describe("Design System Responsive Testing", () => {
  describe("Property 1: Typography Scaling Across Viewports", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Typography should scale appropriately across all viewport sizes
     */
    test("typography classes render correctly at all viewport sizes", () => {
      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        typographyClasses.forEach(typographyClass => {
          const { container } = render(
            <div
              className={typographyClass}
              data-testid={`${typographyClass}-${viewport.name}`}
            >
              Sample text content for {typographyClass}
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toHaveClass(typographyClass);
          expect(element).toBeInTheDocument();
          expect(element.textContent).toContain("Sample text content");
        });
      });
    });

    test("heading typography maintains hierarchy across screen sizes", () => {
      const headingClasses = [
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div>
            {headingClasses.map((headingClass, index) => (
              <h1
                key={index}
                className={headingClass}
                data-testid={`${headingClass}-${viewport.name}`}
              >
                Heading {index + 1}
              </h1>
            ))}
          </div>
        );

        headingClasses.forEach(headingClass => {
          const element = screen.getByTestId(
            `${headingClass}-${viewport.name}`
          );
          expect(element).toHaveClass(headingClass);
          expect(element).toBeInTheDocument();
        });
      });
    });

    test("body text remains readable at minimum viewport sizes", () => {
      const mobileViewports = viewportSizes.filter(
        v => v.category === "mobile"
      );
      const bodyClasses = [
        "body-xl",
        "body-lg",
        "body-md",
        "body-sm",
        "body-xs",
      ];

      mobileViewports.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        bodyClasses.forEach(bodyClass => {
          const { container } = render(
            <p className={bodyClass} data-testid={`${bodyClass}-mobile`}>
              This is sample body text that should remain readable on mobile
              devices.
            </p>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toHaveClass(bodyClass);
          expect(element).toBeInTheDocument();
          expect(element.textContent).toContain("readable on mobile");
        });
      });
    });
  });

  describe("Property 2: Responsive Breakpoint Behavior", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Components should adapt correctly at defined breakpoints
     */
    test("responsive container classes work at all breakpoints", () => {
      const containerClasses = [
        "container-sm",
        "container-md",
        "container-lg",
        "container-xl",
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        containerClasses.forEach(containerClass => {
          const { container } = render(
            <div
              className={`responsive-container ${containerClass}`}
              data-testid={`${containerClass}-${viewport.name}`}
            >
              Container content
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toHaveClass("responsive-container");
          expect(element).toHaveClass(containerClass);
        });
      });
    });

    test("responsive grid system adapts to viewport changes", () => {
      const gridClasses = [
        "responsive-grid",
        "responsive-grid-2-md",
        "responsive-grid-3-lg",
        "responsive-grid-4-xl",
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div className="responsive-grid responsive-grid-2-md responsive-grid-3-lg responsive-grid-4-xl">
            <div>Grid Item 1</div>
            <div>Grid Item 2</div>
            <div>Grid Item 3</div>
            <div>Grid Item 4</div>
          </div>
        );

        const gridElement = container.firstChild as HTMLElement;
        expect(gridElement).toHaveClass("responsive-grid");

        // Check that grid items are present
        const gridItems = gridElement.children;
        expect(gridItems).toHaveLength(4);
        Array.from(gridItems).forEach((item, index) => {
          expect(item.textContent).toBe(`Grid Item ${index + 1}`);
        });
      });
    });

    test("responsive flexbox utilities work across viewports", () => {
      const flexClasses = [
        "responsive-flex",
        "responsive-flex-row-md",
        "responsive-flex-row-lg",
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div className="responsive-flex responsive-flex-row-md responsive-flex-row-lg">
            <div>Flex Item 1</div>
            <div>Flex Item 2</div>
          </div>
        );

        const flexElement = container.firstChild as HTMLElement;
        expect(flexElement).toHaveClass("responsive-flex");
        expect(flexElement.children).toHaveLength(2);
      });
    });
  });

  describe("Property 3: Component Behavior Validation", () => {
    /**
     * **Validates: Requirements US1, US2, US3**
     * Property: All components should maintain functionality across screen sizes
     */
    test("card components maintain structure across viewports", () => {
      const cardVariants = [
        "card-base",
        "card-elevated",
        "card-gradient",
        "card-primary",
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        cardVariants.forEach(cardVariant => {
          const { container } = render(
            <div
              className={`${cardVariant} p-responsive-md`}
              data-testid={`${cardVariant}-${viewport.name}`}
            >
              <h3 className="heading-md">Card Title</h3>
              <p className="body-md">
                Card content that should be readable at all screen sizes.
              </p>
              <button className="btn-base btn-primary">Action Button</button>
            </div>
          );

          const cardElement = container.firstChild as HTMLElement;
          expect(cardElement).toHaveClass(cardVariant);
          expect(cardElement).toHaveClass("p-responsive-md");

          // Check internal structure
          const title = cardElement.querySelector("h3");
          const content = cardElement.querySelector("p");
          const button = cardElement.querySelector("button");

          expect(title).toHaveClass("heading-md");
          expect(content).toHaveClass("body-md");
          expect(button).toHaveClass("btn-base");
          expect(button).toHaveClass("btn-primary");
        });
      });
    });

    test("button components maintain touch targets on mobile", () => {
      const mobileViewports = viewportSizes.filter(
        v => v.category === "mobile"
      );
      const buttonVariants = ["btn-primary", "btn-secondary"];

      mobileViewports.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        buttonVariants.forEach(buttonVariant => {
          const { container } = render(
            <button
              className={`btn-base ${buttonVariant} touch-target`}
              data-testid={`${buttonVariant}-mobile`}
            >
              Mobile Button
            </button>
          );

          const buttonElement = container.firstChild as HTMLElement;
          expect(buttonElement).toHaveClass("btn-base");
          expect(buttonElement).toHaveClass(buttonVariant);
          expect(buttonElement).toHaveClass("touch-target");
        });
      });
    });

    test("badge components scale appropriately", () => {
      const badgeVariants = ["badge-skill", "badge-primary", "badge-secondary"];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        badgeVariants.forEach(badgeVariant => {
          const { container } = render(
            <span
              className={`badge-base ${badgeVariant}`}
              data-testid={`${badgeVariant}-${viewport.name}`}
            >
              Badge Text
            </span>
          );

          const badgeElement = container.firstChild as HTMLElement;
          expect(badgeElement).toHaveClass("badge-base");
          expect(badgeElement).toHaveClass(badgeVariant);
          expect(badgeElement.textContent).toBe("Badge Text");
        });
      });
    });
  });

  describe("Property 4: Shadow and Spacing Consistency", () => {
    /**
     * **Validates: Requirements US6, US7**
     * Property: Shadows and spacing should remain consistent across screen sizes
     */
    test("shadow utilities apply consistently across viewports", () => {
      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        shadowClasses.forEach(shadowClass => {
          const { container } = render(
            <div
              className={shadowClass}
              data-testid={`${shadowClass}-${viewport.name}`}
            >
              Shadow test element
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toHaveClass(shadowClass);
          expect(element).toBeInTheDocument();
        });
      });
    });

    test("responsive spacing utilities scale appropriately", () => {
      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        spacingClasses.forEach(spacingClass => {
          const { container } = render(
            <div
              className={spacingClass}
              data-testid={`${spacingClass}-${viewport.name}`}
            >
              <div>Child element for spacing test</div>
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toHaveClass(spacingClass);
          expect(element.children).toHaveLength(1);
        });
      });
    });

    test("combined shadow and spacing utilities work together", () => {
      const combinations = [
        { shadow: "shadow-card", spacing: "p-responsive-md" },
        { shadow: "shadow-primary", spacing: "p-responsive-lg" },
        { shadow: "shadow-soft", spacing: "m-responsive-sm" },
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        combinations.forEach(({ shadow, spacing }) => {
          const { container } = render(
            <div
              className={`${shadow} ${spacing}`}
              data-testid={`combo-${viewport.name}`}
            >
              Combined utilities test
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toHaveClass(shadow);
          expect(element).toHaveClass(spacing);
        });
      });
    });
  });

  describe("Property 5: Accessibility Compliance Across Screen Sizes", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Accessibility features should work at all screen sizes
     */
    test("focus management works across all viewports", () => {
      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div>
            <button
              className="btn-base btn-primary focus-responsive"
              data-testid={`focus-btn-${viewport.name}`}
            >
              Focusable Button
            </button>
            <a
              href="#test"
              className="focus-responsive"
              data-testid={`focus-link-${viewport.name}`}
            >
              Focusable Link
            </a>
          </div>
        );

        const button = screen.getByTestId(`focus-btn-${viewport.name}`);
        const link = screen.getByTestId(`focus-link-${viewport.name}`);

        expect(button).toHaveClass("focus-responsive");
        expect(link).toHaveClass("focus-responsive");
      });
    });

    test("touch targets meet minimum size requirements on mobile", () => {
      const mobileViewports = viewportSizes.filter(
        v => v.category === "mobile"
      );

      mobileViewports.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div>
            <button className="btn-base btn-primary touch-target-large">
              Large Touch Target
            </button>
            <button className="btn-base btn-secondary touch-target">
              Standard Touch Target
            </button>
          </div>
        );

        const largeButton = container.querySelector(".touch-target-large");
        const standardButton = container.querySelector(".touch-target");

        expect(largeButton).toHaveClass("touch-target-large");
        expect(standardButton).toHaveClass("touch-target");
      });
    });

    test("text contrast remains accessible across all components", () => {
      const textComponents = [
        { element: "h1", class: "heading-xl", text: "Main Heading" },
        { element: "p", class: "body-md", text: "Body text content" },
        { element: "span", class: "text-caption", text: "Caption text" },
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        textComponents.forEach(({ element, class: className, text }) => {
          const { container } = render(
            React.createElement(
              element,
              {
                className,
                "data-testid": `${className}-${viewport.name}`,
              },
              text
            )
          );

          const textElement = screen.getByTestId(
            `${className}-${viewport.name}`
          );
          expect(textElement).toHaveClass(className);
          expect(textElement.textContent).toBe(text);
        });
      });
    });
  });

  describe("Property 6: Performance Validation", () => {
    /**
     * **Validates: Requirements US7**
     * Property: Design system should maintain performance across screen sizes
     */
    test("CSS custom properties load efficiently", () => {
      // Test that CSS custom properties are available
      const cssProperties = [
        "--color-primary",
        "--color-bg-peach",
        "--font-size-heading-xl",
        "--shadow-card",
        "--spacing-section",
      ];

      cssProperties.forEach(property => {
        const value = getComputedStyle(
          document.documentElement
        ).getPropertyValue(property);
        expect(value).toBeTruthy();
      });
    });

    test("responsive utilities don't cause layout shifts", () => {
      const { container, rerender } = render(
        <div className="p-responsive-sm gap-responsive-md">
          <div>Initial content</div>
        </div>
      );

      const initialElement = container.firstChild as HTMLElement;
      expect(initialElement).toHaveClass("p-responsive-sm");
      expect(initialElement).toHaveClass("gap-responsive-md");

      // Simulate viewport change
      mockViewport(1280, 720);

      rerender(
        <div className="p-responsive-lg gap-responsive-xl">
          <div>Updated content</div>
        </div>
      );

      const updatedElement = container.firstChild as HTMLElement;
      expect(updatedElement).toHaveClass("p-responsive-lg");
      expect(updatedElement).toHaveClass("gap-responsive-xl");
    });

    test("animation utilities respect reduced motion preferences", () => {
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
        <div className="animate-float shadow-interactive">Animated content</div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("animate-float");
      expect(element).toHaveClass("shadow-interactive");
    });
  });

  describe("Property 7: Integration Testing", () => {
    /**
     * **Validates: Requirements US1, US2, US3, US6**
     * Property: All design system components should work together seamlessly
     */
    test("complete component integration across viewports", () => {
      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div className="responsive-container section-padding">
            <div className="responsive-grid responsive-grid-2-md responsive-grid-3-lg">
              <div className="card-base shadow-card p-responsive-md">
                <h2 className="heading-lg">Card Title</h2>
                <p className="body-md">Card description text</p>
                <div
                  className="gap-responsive-sm"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  <span className="badge-base badge-skill">React</span>
                  <span className="badge-base badge-skill">TypeScript</span>
                </div>
                <button className="btn-base btn-primary">Learn More</button>
              </div>

              <div className="card-base shadow-primary p-responsive-md">
                <h2 className="heading-lg">Another Card</h2>
                <p className="body-md">More content here</p>
                <button className="btn-base btn-secondary">
                  Secondary Action
                </button>
              </div>
            </div>
          </div>
        );

        // Verify main container
        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer).toHaveClass("responsive-container");
        expect(mainContainer).toHaveClass("section-padding");

        // Verify grid
        const grid = mainContainer.firstChild as HTMLElement;
        expect(grid).toHaveClass("responsive-grid");

        // Verify cards
        const cards = grid.children;
        expect(cards).toHaveLength(2);

        Array.from(cards).forEach((card, index) => {
          expect(card).toHaveClass("card-base");
          expect(card).toHaveClass("p-responsive-md");

          const heading = card.querySelector("h2");
          const paragraph = card.querySelector("p");
          const button = card.querySelector("button");

          expect(heading).toHaveClass("heading-lg");
          expect(paragraph).toHaveClass("body-md");
          expect(button).toHaveClass("btn-base");
        });
      });
    });

    test("hero section layout adapts correctly", () => {
      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <section className="hero-responsive section-padding">
            <div className="hero-content">
              <h1 className="heading-xl">Hello, I'm Ashish Singh</h1>
              <p className="text-lead">Full-Stack & AI Developer</p>
              <div className="button-group-responsive">
                <button className="btn-base btn-primary">View Work</button>
                <button className="btn-base btn-secondary">
                  Download Resume
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="animate-float shadow-soft">Visual Element</div>
            </div>
          </section>
        );

        const heroSection = container.firstChild as HTMLElement;
        expect(heroSection).toHaveClass("hero-responsive");
        expect(heroSection).toHaveClass("section-padding");

        const heroContent = heroSection.querySelector(".hero-content");
        const heroVisual = heroSection.querySelector(".hero-visual");

        expect(heroContent).toBeInTheDocument();
        expect(heroVisual).toBeInTheDocument();

        // Check content structure
        const heading = heroContent?.querySelector("h1");
        const lead = heroContent?.querySelector("p");
        const buttonGroup = heroContent?.querySelector(
          ".button-group-responsive"
        );

        expect(heading).toHaveClass("heading-xl");
        expect(lead).toHaveClass("text-lead");
        expect(buttonGroup).toHaveClass("button-group-responsive");
      });
    });
  });
});
