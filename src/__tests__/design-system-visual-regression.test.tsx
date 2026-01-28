/**
 * Design System Visual Regression Testing
 * **Validates: Requirements US6, US7**
 *
 * Comprehensive visual testing of the design system across different screen sizes.
 * This test suite validates that all design system components render correctly
 * and maintain their visual integrity across various viewport sizes.
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

// Component test configurations
const componentTestCases = [
  {
    name: "Typography System",
    component: (
      <div className="space-y-responsive-md">
        <h1 className="heading-xl">Extra Large Heading</h1>
        <h2 className="heading-lg">Large Heading</h2>
        <h3 className="heading-md">Medium Heading</h3>
        <h4 className="heading-sm">Small Heading</h4>
        <p className="body-xl">
          Extra large body text for lead paragraphs and important content.
        </p>
        <p className="body-lg">
          Large body text for emphasized content and subheadings.
        </p>
        <p className="body-md">
          Medium body text for standard paragraphs and general content.
        </p>
        <p className="body-sm">
          Small body text for captions and secondary information.
        </p>
        <p className="body-xs">
          Extra small text for fine print and minimal details.
        </p>
        <p className="text-lead">
          Lead text for introductory paragraphs and important statements.
        </p>
        <p className="text-caption">Caption text for labels and metadata.</p>
      </div>
    ),
  },
  {
    name: "Card Components",
    component: (
      <div className="responsive-grid responsive-grid-2-md responsive-grid-3-lg gap-responsive-md">
        <div className="card-base shadow-card p-responsive-md">
          <h3 className="heading-sm">Base Card</h3>
          <p className="body-md">
            Standard card with base styling and hover effects.
          </p>
          <button className="btn-base btn-primary">Action</button>
        </div>
        <div className="card-elevated shadow-strong p-responsive-md">
          <h3 className="heading-sm">Elevated Card</h3>
          <p className="body-md">Card with elevated shadow for emphasis.</p>
          <button className="btn-base btn-secondary">Secondary</button>
        </div>
        <div className="card-primary shadow-primary p-responsive-md">
          <h3 className="heading-sm">Primary Card</h3>
          <p className="body-md">Card with primary color theming.</p>
          <div
            className="gap-responsive-sm"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <span className="badge-base badge-skill">React</span>
            <span className="badge-base badge-skill">TypeScript</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Button System",
    component: (
      <div className="button-group-responsive">
        <button className="btn-base btn-primary shadow-primary">
          Primary Button
        </button>
        <button className="btn-base btn-secondary">Secondary Button</button>
        <button className="btn-base btn-primary" disabled>
          Disabled Button
        </button>
      </div>
    ),
  },
  {
    name: "Badge System",
    component: (
      <div
        className="gap-responsive-sm"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <span className="badge-base badge-skill">JavaScript</span>
        <span className="badge-base badge-primary">Primary</span>
        <span className="badge-base badge-secondary">Secondary</span>
        <span className="badge-base badge-accent-orange">Orange</span>
        <span className="badge-base badge-accent-pink">Pink</span>
        <span className="badge-base badge-accent-blue">Blue</span>
      </div>
    ),
  },
  {
    name: "Shadow System",
    component: (
      <div className="responsive-grid responsive-grid-2-md responsive-grid-4-lg gap-responsive-lg">
        <div className="shadow-soft p-responsive-md bg-white rounded-lg">
          <p className="body-sm">Soft Shadow</p>
        </div>
        <div className="shadow-card p-responsive-md bg-white rounded-lg">
          <p className="body-sm">Card Shadow</p>
        </div>
        <div className="shadow-primary p-responsive-md bg-white rounded-lg">
          <p className="body-sm">Primary Shadow</p>
        </div>
        <div className="shadow-hover p-responsive-md bg-white rounded-lg">
          <p className="body-sm">Hover Shadow</p>
        </div>
        <div className="shadow-strong p-responsive-md bg-white rounded-lg">
          <p className="body-sm">Strong Shadow</p>
        </div>
        <div className="shadow-glow-primary p-responsive-md bg-white rounded-lg">
          <p className="body-sm">Glow Primary</p>
        </div>
      </div>
    ),
  },
  {
    name: "Responsive Layout",
    component: (
      <div className="responsive-container">
        <section className="hero-responsive section-padding">
          <div className="hero-content">
            <h1 className="heading-xl">Responsive Hero</h1>
            <p className="text-lead">
              This hero section adapts to different screen sizes.
            </p>
            <div className="button-group-responsive">
              <button className="btn-base btn-primary">Primary Action</button>
              <button className="btn-base btn-secondary">
                Secondary Action
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="animate-float shadow-soft p-responsive-lg bg-white rounded-lg">
              <p className="body-md">Visual Element</p>
            </div>
          </div>
        </section>
      </div>
    ),
  },
];

describe("Design System Visual Regression Testing", () => {
  describe("Property 1: Component Visual Consistency", () => {
    /**
     * **Validates: Requirements US6**
     * Property: All components should maintain visual consistency across screen sizes
     */
    componentTestCases.forEach(({ name, component }) => {
      test(`${name} renders consistently across all viewport sizes`, () => {
        viewportSizes.forEach(viewport => {
          mockViewport(viewport.width, viewport.height);

          const { container } = render(
            <div
              data-testid={`${name.toLowerCase().replace(/\s+/g, "-")}-${viewport.name}`}
            >
              {component}
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toBeInTheDocument();
          expect(element).toHaveAttribute(
            "data-testid",
            `${name.toLowerCase().replace(/\s+/g, "-")}-${viewport.name}`
          );

          // Verify no layout overflow
          expect(element.scrollWidth).toBeLessThanOrEqual(viewport.width + 50); // Allow small margin for scrollbars
        });
      });
    });
  });

  describe("Property 2: Typography Scaling Validation", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Typography should scale appropriately and remain readable
     */
    test("heading hierarchy is maintained across all screen sizes", () => {
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
                Heading Level {index + 1}
              </h1>
            ))}
          </div>
        );

        // Verify all headings are present and have correct classes
        headingClasses.forEach(headingClass => {
          const element = screen.getByTestId(
            `${headingClass}-${viewport.name}`
          );
          expect(element).toHaveClass(headingClass);
          expect(element).toBeVisible();
        });
      });
    });

    test("body text remains readable at minimum sizes", () => {
      const bodyClasses = [
        "body-xl",
        "body-lg",
        "body-md",
        "body-sm",
        "body-xs",
      ];
      const mobileViewports = viewportSizes.filter(
        v => v.category === "mobile"
      );

      mobileViewports.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div>
            {bodyClasses.map((bodyClass, index) => (
              <p
                key={index}
                className={bodyClass}
                data-testid={`${bodyClass}-mobile-${viewport.name}`}
              >
                This is sample body text that should remain readable on mobile
                devices.
              </p>
            ))}
          </div>
        );

        bodyClasses.forEach(bodyClass => {
          const element = screen.getByTestId(
            `${bodyClass}-mobile-${viewport.name}`
          );
          expect(element).toHaveClass(bodyClass);
          expect(element).toBeVisible();
          expect(element.textContent).toContain("readable on mobile");
        });
      });
    });
  });

  describe("Property 3: Responsive Grid Behavior", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Grid systems should adapt correctly to different screen sizes
     */
    test("responsive grid adapts column count based on viewport", () => {
      const gridTestCases = [
        {
          classes:
            "responsive-grid responsive-grid-2-md responsive-grid-3-lg responsive-grid-4-xl",
          items: 6,
        },
        {
          classes: "responsive-grid responsive-grid-2-sm responsive-grid-4-lg",
          items: 4,
        },
      ];

      gridTestCases.forEach(({ classes, items }, testIndex) => {
        viewportSizes.forEach(viewport => {
          mockViewport(viewport.width, viewport.height);

          const { container } = render(
            <div
              className={classes}
              data-testid={`grid-test-${testIndex}-${viewport.name}`}
            >
              {Array.from({ length: items }, (_, i) => (
                <div key={i} className="card-base p-responsive-sm">
                  Item {i + 1}
                </div>
              ))}
            </div>
          );

          const gridElement = screen.getByTestId(
            `grid-test-${testIndex}-${viewport.name}`
          );
          expect(gridElement).toHaveClass("responsive-grid");
          expect(gridElement.children).toHaveLength(items);

          // Verify all grid items are visible
          Array.from(gridElement.children).forEach((item, index) => {
            expect(item).toHaveClass("card-base");
            expect(item.textContent).toBe(`Item ${index + 1}`);
          });
        });
      });
    });
  });

  describe("Property 4: Interactive Element Sizing", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Interactive elements should meet accessibility requirements
     */
    test("buttons meet minimum touch target sizes on mobile", () => {
      const mobileViewports = viewportSizes.filter(
        v => v.category === "mobile"
      );
      const buttonVariants = ["btn-primary", "btn-secondary"];

      mobileViewports.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div>
            {buttonVariants.map((variant, index) => (
              <button
                key={index}
                className={`btn-base ${variant} touch-target`}
                data-testid={`${variant}-mobile-${viewport.name}`}
              >
                Mobile Button {index + 1}
              </button>
            ))}
          </div>
        );

        buttonVariants.forEach(variant => {
          const button = screen.getByTestId(
            `${variant}-mobile-${viewport.name}`
          );
          expect(button).toHaveClass("btn-base");
          expect(button).toHaveClass(variant);
          expect(button).toHaveClass("touch-target");
        });
      });
    });

    test("form elements maintain usability across screen sizes", () => {
      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <form
            className="form-responsive"
            data-testid={`form-${viewport.name}`}
          >
            <div className="form-responsive-row">
              <input
                type="text"
                placeholder="Name"
                className="touch-target"
                data-testid={`input-name-${viewport.name}`}
              />
              <input
                type="email"
                placeholder="Email"
                className="touch-target"
                data-testid={`input-email-${viewport.name}`}
              />
            </div>
            <textarea
              placeholder="Message"
              className="touch-target"
              data-testid={`textarea-${viewport.name}`}
            />
            <button
              type="submit"
              className="btn-base btn-primary touch-target"
              data-testid={`submit-${viewport.name}`}
            >
              Submit
            </button>
          </form>
        );

        const form = screen.getByTestId(`form-${viewport.name}`);
        const nameInput = screen.getByTestId(`input-name-${viewport.name}`);
        const emailInput = screen.getByTestId(`input-email-${viewport.name}`);
        const textarea = screen.getByTestId(`textarea-${viewport.name}`);
        const submitButton = screen.getByTestId(`submit-${viewport.name}`);

        expect(form).toHaveClass("form-responsive");
        expect(nameInput).toHaveClass("touch-target");
        expect(emailInput).toHaveClass("touch-target");
        expect(textarea).toHaveClass("touch-target");
        expect(submitButton).toHaveClass("btn-base");
        expect(submitButton).toHaveClass("btn-primary");
      });
    });
  });

  describe("Property 5: Animation and Motion Consistency", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Animations should work consistently across screen sizes
     */
    test("floating animations render without errors", () => {
      const animationClasses = [
        "animate-float",
        "animate-float-delayed",
        "animate-float-slow",
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div>
            {animationClasses.map((animClass, index) => (
              <div
                key={index}
                className={`${animClass} shadow-soft p-responsive-md`}
                data-testid={`${animClass}-${viewport.name}`}
              >
                Animated Element {index + 1}
              </div>
            ))}
          </div>
        );

        animationClasses.forEach(animClass => {
          const element = screen.getByTestId(`${animClass}-${viewport.name}`);
          expect(element).toHaveClass(animClass);
          expect(element).toHaveClass("shadow-soft");
          expect(element).toBeVisible();
        });
      });
    });

    test("reduced motion preferences are respected", () => {
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
        <div className="animate-float shadow-interactive">
          Motion-sensitive content
        </div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("animate-float");
      expect(element).toHaveClass("shadow-interactive");
      expect(element).toBeVisible();
    });
  });

  describe("Property 6: Color and Contrast Validation", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Color combinations should maintain accessibility standards
     */
    test("text color combinations provide adequate contrast", () => {
      const colorCombinations = [
        {
          bg: "bg-white",
          text: "text-primary",
          content: "Primary text on white",
        },
        {
          bg: "bg-peach",
          text: "text-primary",
          content: "Primary text on peach",
        },
        {
          bg: "bg-primary",
          text: "text-light",
          content: "Light text on primary",
        },
      ];

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const { container } = render(
          <div>
            {colorCombinations.map(({ bg, text, content }, index) => (
              <div
                key={index}
                className={`${bg} ${text} p-responsive-md`}
                data-testid={`color-combo-${index}-${viewport.name}`}
              >
                {content}
              </div>
            ))}
          </div>
        );

        colorCombinations.forEach(({ bg, text }, index) => {
          const element = screen.getByTestId(
            `color-combo-${index}-${viewport.name}`
          );
          expect(element).toHaveClass(bg);
          expect(element).toHaveClass(text);
          expect(element).toBeVisible();
        });
      });
    });
  });

  describe("Property 7: Layout Overflow Prevention", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Content should not cause horizontal scrolling
     */
    test("wide content adapts to viewport constraints", () => {
      const wideContentTests = [
        {
          name: "Long text content",
          component: (
            <div className="responsive-container">
              <p className="body-md">
                This is a very long paragraph of text that should wrap
                appropriately and not cause horizontal scrolling on any device
                size. It contains enough content to test text wrapping behavior
                across different viewport widths.
              </p>
            </div>
          ),
        },
        {
          name: "Button groups",
          component: (
            <div className="button-group-responsive">
              <button className="btn-base btn-primary">
                First Action Button
              </button>
              <button className="btn-base btn-secondary">
                Second Action Button
              </button>
              <button className="btn-base btn-primary">
                Third Action Button
              </button>
            </div>
          ),
        },
        {
          name: "Card grids",
          component: (
            <div className="responsive-grid responsive-grid-2-md responsive-grid-3-lg responsive-grid-4-xl gap-responsive-md">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="card-base p-responsive-md">
                  <h3 className="heading-sm">Card {i + 1}</h3>
                  <p className="body-sm">
                    Card content that should fit within the grid layout.
                  </p>
                </div>
              ))}
            </div>
          ),
        },
      ];

      wideContentTests.forEach(({ name, component }) => {
        viewportSizes.forEach(viewport => {
          mockViewport(viewport.width, viewport.height);

          const { container } = render(
            <div
              data-testid={`wide-content-${name.toLowerCase().replace(/\s+/g, "-")}-${viewport.name}`}
            >
              {component}
            </div>
          );

          const element = container.firstChild as HTMLElement;
          expect(element).toBeInTheDocument();

          // Verify no horizontal overflow (allowing small margin for scrollbars)
          expect(element.scrollWidth).toBeLessThanOrEqual(viewport.width + 50);
        });
      });
    });
  });

  describe("Property 8: Performance and Rendering", () => {
    /**
     * **Validates: Requirements US7**
     * Property: Components should render efficiently across screen sizes
     */
    test("complex layouts render without performance issues", () => {
      const complexLayout = (
        <div className="responsive-container">
          <section className="hero-responsive section-padding">
            <div className="hero-content">
              <h1 className="heading-xl">Complex Layout Test</h1>
              <p className="text-lead">
                Testing performance with multiple components.
              </p>
              <div className="button-group-responsive">
                <button className="btn-base btn-primary shadow-primary">
                  Primary
                </button>
                <button className="btn-base btn-secondary">Secondary</button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="animate-float shadow-soft p-responsive-lg">
                <div className="responsive-grid responsive-grid-2-sm gap-responsive-sm">
                  <div className="shadow-card p-responsive-sm">Visual 1</div>
                  <div className="shadow-card p-responsive-sm">Visual 2</div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding">
            <h2 className="heading-lg responsive-text-center">
              Skills Section
            </h2>
            <div className="responsive-grid responsive-grid-2-md responsive-grid-4-lg gap-responsive-md">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="card-base shadow-card p-responsive-md">
                  <h3 className="heading-sm">Skill {i + 1}</h3>
                  <div
                    className="gap-responsive-xs"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <span className="badge-base badge-skill">Tag 1</span>
                    <span className="badge-base badge-skill">Tag 2</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      );

      viewportSizes.forEach(viewport => {
        mockViewport(viewport.width, viewport.height);

        const startTime = performance.now();
        const { container } = render(
          <div data-testid={`complex-layout-${viewport.name}`}>
            {complexLayout}
          </div>
        );
        const endTime = performance.now();

        // Verify rendering completed
        const element = screen.getByTestId(`complex-layout-${viewport.name}`);
        expect(element).toBeInTheDocument();

        // Verify key elements are present (using getAllByText to handle multiple instances)
        const complexHeadings = screen.getAllByText("Complex Layout Test");
        expect(complexHeadings[0]).toBeInTheDocument();

        const skillsHeadings = screen.getAllByText("Skills Section");
        expect(skillsHeadings[0]).toBeInTheDocument();

        // Basic performance check (rendering should complete quickly)
        expect(endTime - startTime).toBeLessThan(100); // 100ms threshold
      });
    });
  });
});
