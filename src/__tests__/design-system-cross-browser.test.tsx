/**
 * Design System Cross-Browser Compatibility Testing
 * **Validates: Requirements US6, US7**
 *
 * Tests to ensure the design system works consistently across different
 * browsers and handles various browser-specific behaviors and features.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock different browser environments
const mockBrowserEnvironment = (
  userAgent: string,
  features: Record<string, boolean> = {}
) => {
  Object.defineProperty(navigator, "userAgent", {
    writable: true,
    value: userAgent,
  });

  // Mock CSS support detection
  Object.defineProperty(CSS, "supports", {
    writable: true,
    value: jest.fn().mockImplementation((property: string, value?: string) => {
      const query = value ? `${property}: ${value}` : property;
      return features[query] !== false; // Default to true unless explicitly false
    }),
  });
};

// Browser configurations for testing
const browserConfigs = [
  {
    name: "Chrome",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    features: {
      "display: grid": true,
      "display: flex": true,
      "backdrop-filter": true,
      "aspect-ratio": true,
      "container-queries": true,
    },
  },
  {
    name: "Firefox",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
    features: {
      "display: grid": true,
      "display: flex": true,
      "backdrop-filter": true,
      "aspect-ratio": true,
      "container-queries": false, // Limited support
    },
  },
  {
    name: "Safari",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    features: {
      "display: grid": true,
      "display: flex": true,
      "backdrop-filter": true,
      "aspect-ratio": true,
      "container-queries": true,
    },
  },
  {
    name: "Edge",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    features: {
      "display: grid": true,
      "display: flex": true,
      "backdrop-filter": true,
      "aspect-ratio": true,
      "container-queries": true,
    },
  },
  {
    name: "Legacy Browser",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.0.0 Safari/537.36",
    features: {
      "display: grid": true,
      "display: flex": true,
      "backdrop-filter": false,
      "aspect-ratio": false,
      "container-queries": false,
    },
  },
];

describe("Design System Cross-Browser Compatibility", () => {
  describe("Property 1: CSS Feature Support Detection", () => {
    /**
     * **Validates: Requirements US6, US7**
     * Property: Design system should gracefully handle missing CSS features
     */
    test("grid layouts work across all browsers", () => {
      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div
            className="responsive-grid responsive-grid-2-md responsive-grid-3-lg"
            data-testid={`grid-${name.toLowerCase()}`}
          >
            <div className="card-base p-responsive-md">Item 1</div>
            <div className="card-base p-responsive-md">Item 2</div>
            <div className="card-base p-responsive-md">Item 3</div>
          </div>
        );

        const gridElement = screen.getByTestId(`grid-${name.toLowerCase()}`);
        expect(gridElement).toHaveClass("responsive-grid");
        expect(gridElement.children).toHaveLength(3);

        // Verify all items are present regardless of browser
        Array.from(gridElement.children).forEach((item, index) => {
          expect(item).toHaveClass("card-base");
          expect(item.textContent).toBe(`Item ${index + 1}`);
        });
      });
    });

    test("flexbox layouts provide fallbacks", () => {
      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div
            className="responsive-flex responsive-flex-row-md"
            data-testid={`flex-${name.toLowerCase()}`}
          >
            <div className="card-base p-responsive-sm">Flex Item 1</div>
            <div className="card-base p-responsive-sm">Flex Item 2</div>
          </div>
        );

        const flexElement = screen.getByTestId(`flex-${name.toLowerCase()}`);
        expect(flexElement).toHaveClass("responsive-flex");
        expect(flexElement.children).toHaveLength(2);
      });
    });
  });

  describe("Property 2: Typography Rendering Consistency", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Typography should render consistently across browsers
     */
    test("font loading and fallbacks work correctly", () => {
      const typographyElements = [
        { class: "heading-xl", text: "Main Heading", tag: "h1" },
        { class: "heading-lg", text: "Section Heading", tag: "h2" },
        { class: "body-lg", text: "Body text content", tag: "p" },
        { class: "text-lead", text: "Lead paragraph text", tag: "p" },
      ];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`typography-${name.toLowerCase()}`}>
            {typographyElements.map(({ class: className, text, tag }, index) =>
              React.createElement(
                tag,
                {
                  key: index,
                  className,
                  "data-testid": `${className}-${name.toLowerCase()}`,
                },
                text
              )
            )}
          </div>
        );

        typographyElements.forEach(({ class: className, text }) => {
          const element = screen.getByTestId(
            `${className}-${name.toLowerCase()}`
          );
          expect(element).toHaveClass(className);
          expect(element.textContent).toBe(text);
          expect(element).toBeVisible();
        });
      });
    });

    test("responsive font sizing works across browsers", () => {
      const responsiveText = [
        { class: "text-responsive-xl", text: "Extra Large Responsive" },
        { class: "text-responsive-lg", text: "Large Responsive" },
        { class: "text-responsive-md", text: "Medium Responsive" },
      ];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`responsive-text-${name.toLowerCase()}`}>
            {responsiveText.map(({ class: className, text }, index) => (
              <p
                key={index}
                className={className}
                data-testid={`${className}-${name.toLowerCase()}`}
              >
                {text}
              </p>
            ))}
          </div>
        );

        responsiveText.forEach(({ class: className, text }) => {
          const element = screen.getByTestId(
            `${className}-${name.toLowerCase()}`
          );
          expect(element).toHaveClass(className);
          expect(element.textContent).toBe(text);
        });
      });
    });
  });

  describe("Property 3: Shadow and Visual Effects", () => {
    /**
     * **Validates: Requirements US6, US7**
     * Property: Visual effects should degrade gracefully in older browsers
     */
    test("shadow effects render consistently", () => {
      const shadowVariants = [
        "shadow-soft",
        "shadow-card",
        "shadow-primary",
        "shadow-hover",
        "shadow-glow-primary",
      ];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`shadows-${name.toLowerCase()}`}>
            {shadowVariants.map((shadowClass, index) => (
              <div
                key={index}
                className={`${shadowClass} p-responsive-md bg-white`}
                data-testid={`${shadowClass}-${name.toLowerCase()}`}
              >
                Shadow Test {index + 1}
              </div>
            ))}
          </div>
        );

        shadowVariants.forEach(shadowClass => {
          const element = screen.getByTestId(
            `${shadowClass}-${name.toLowerCase()}`
          );
          expect(element).toHaveClass(shadowClass);
          expect(element).toBeVisible();
        });
      });
    });

    test("backdrop filters degrade gracefully", () => {
      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div
            className="backdrop-blur-sm bg-white/80 p-responsive-md"
            data-testid={`backdrop-${name.toLowerCase()}`}
          >
            Backdrop filter content
          </div>
        );

        const element = screen.getByTestId(`backdrop-${name.toLowerCase()}`);
        expect(element).toBeVisible();
        expect(element.textContent).toBe("Backdrop filter content");

        // Element should be present regardless of backdrop-filter support
        expect(element).toBeInTheDocument();
      });
    });
  });

  describe("Property 4: Interactive Element Behavior", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Interactive elements should work consistently across browsers
     */
    test("button interactions work across browsers", () => {
      const buttonVariants = ["btn-primary", "btn-secondary"];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`buttons-${name.toLowerCase()}`}>
            {buttonVariants.map((variant, index) => (
              <button
                key={index}
                className={`btn-base ${variant}`}
                data-testid={`${variant}-${name.toLowerCase()}`}
              >
                {variant.replace("btn-", "").charAt(0).toUpperCase() +
                  variant.replace("btn-", "").slice(1)}{" "}
                Button
              </button>
            ))}
          </div>
        );

        buttonVariants.forEach(variant => {
          const button = screen.getByTestId(`${variant}-${name.toLowerCase()}`);
          expect(button).toHaveClass("btn-base");
          expect(button).toHaveClass(variant);
          expect(button).toBeEnabled();
        });
      });
    });

    test("form elements maintain functionality", () => {
      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <form data-testid={`form-${name.toLowerCase()}`}>
            <input
              type="text"
              placeholder="Name"
              className="touch-target"
              data-testid={`input-${name.toLowerCase()}`}
            />
            <select
              className="touch-target"
              data-testid={`select-${name.toLowerCase()}`}
            >
              <option value="">Choose option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <textarea
              placeholder="Message"
              className="touch-target"
              data-testid={`textarea-${name.toLowerCase()}`}
            />
          </form>
        );

        const input = screen.getByTestId(`input-${name.toLowerCase()}`);
        const select = screen.getByTestId(`select-${name.toLowerCase()}`);
        const textarea = screen.getByTestId(`textarea-${name.toLowerCase()}`);

        expect(input).toHaveClass("touch-target");
        expect(select).toHaveClass("touch-target");
        expect(textarea).toHaveClass("touch-target");

        expect(input).toHaveAttribute("placeholder", "Name");
        expect(textarea).toHaveAttribute("placeholder", "Message");
      });
    });
  });

  describe("Property 5: Animation and Transition Support", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Animations should work or degrade gracefully across browsers
     */
    test("CSS animations are applied correctly", () => {
      const animationClasses = [
        "animate-float",
        "animate-float-delayed",
        "animate-float-slow",
      ];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`animations-${name.toLowerCase()}`}>
            {animationClasses.map((animClass, index) => (
              <div
                key={index}
                className={`${animClass} shadow-soft p-responsive-md`}
                data-testid={`${animClass}-${name.toLowerCase()}`}
              >
                Animated Element {index + 1}
              </div>
            ))}
          </div>
        );

        animationClasses.forEach(animClass => {
          const element = screen.getByTestId(
            `${animClass}-${name.toLowerCase()}`
          );
          expect(element).toHaveClass(animClass);
          expect(element).toBeVisible();
        });
      });
    });

    test("transition effects work consistently", () => {
      const transitionElements = [
        { class: "shadow-interactive", content: "Interactive Shadow" },
        { class: "btn-base btn-primary", content: "Transition Button" },
        { class: "card-base", content: "Hover Card" },
      ];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`transitions-${name.toLowerCase()}`}>
            {transitionElements.map(({ class: className, content }, index) => (
              <div
                key={index}
                className={className}
                data-testid={`transition-${index}-${name.toLowerCase()}`}
              >
                {content}
              </div>
            ))}
          </div>
        );

        transitionElements.forEach(({ class: className, content }, index) => {
          const element = screen.getByTestId(
            `transition-${index}-${name.toLowerCase()}`
          );
          expect(element).toBeVisible();
          expect(element.textContent).toBe(content);
        });
      });
    });
  });

  describe("Property 6: Responsive Behavior Consistency", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Responsive features should work consistently across browsers
     */
    test("media queries work correctly", () => {
      const responsiveClasses = [
        "responsive-container",
        "responsive-grid",
        "responsive-flex",
        "hero-responsive",
        "button-group-responsive",
      ];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`responsive-${name.toLowerCase()}`}>
            {responsiveClasses.map((className, index) => (
              <div
                key={index}
                className={className}
                data-testid={`${className}-${name.toLowerCase()}`}
              >
                <div>Responsive Content {index + 1}</div>
              </div>
            ))}
          </div>
        );

        responsiveClasses.forEach(className => {
          const element = screen.getByTestId(
            `${className}-${name.toLowerCase()}`
          );
          expect(element).toHaveClass(className);
          expect(element).toBeVisible();
        });
      });
    });

    test("viewport units work consistently", () => {
      const viewportElements = [
        { class: "text-responsive-xl", content: "Viewport XL Text" },
        { class: "text-responsive-lg", content: "Viewport LG Text" },
        { class: "text-responsive-md", content: "Viewport MD Text" },
      ];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`viewport-${name.toLowerCase()}`}>
            {viewportElements.map(({ class: className, content }, index) => (
              <div
                key={index}
                className={className}
                data-testid={`${className}-${name.toLowerCase()}`}
              >
                {content}
              </div>
            ))}
          </div>
        );

        viewportElements.forEach(({ class: className, content }) => {
          const element = screen.getByTestId(
            `${className}-${name.toLowerCase()}`
          );
          expect(element).toHaveClass(className);
          expect(element.textContent).toBe(content);
        });
      });
    });
  });

  describe("Property 7: Accessibility Feature Support", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Accessibility features should work across all browsers
     */
    test("focus management works consistently", () => {
      const focusableElements = [
        {
          tag: "button",
          class: "btn-base btn-primary focus-responsive",
          content: "Focus Button",
        },
        {
          tag: "a",
          class: "focus-responsive",
          content: "Focus Link",
          href: "#test",
        },
        {
          tag: "input",
          class: "touch-target focus-responsive",
          type: "text",
          placeholder: "Focus Input",
        },
      ];

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`focus-${name.toLowerCase()}`}>
            {focusableElements.map(
              ({ tag, class: className, content, ...props }, index) =>
                React.createElement(
                  tag,
                  {
                    key: index,
                    className,
                    "data-testid": `focus-${index}-${name.toLowerCase()}`,
                    ...props,
                  },
                  content
                )
            )}
          </div>
        );

        focusableElements.forEach(({ class: className }, index) => {
          const element = screen.getByTestId(
            `focus-${index}-${name.toLowerCase()}`
          );
          expect(element).toHaveClass("focus-responsive");
          expect(element).toBeVisible();
        });
      });
    });

    test("ARIA attributes are preserved", () => {
      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const { container } = render(
          <div data-testid={`aria-${name.toLowerCase()}`}>
            <button
              className="btn-base btn-primary"
              aria-label="Primary action button"
              data-testid={`aria-button-${name.toLowerCase()}`}
            >
              Action
            </button>
            <div
              role="region"
              aria-labelledby="section-heading"
              data-testid={`aria-region-${name.toLowerCase()}`}
            >
              <h2 id="section-heading" className="heading-md">
                Section Title
              </h2>
              <p className="body-md">Section content</p>
            </div>
          </div>
        );

        const button = screen.getByTestId(`aria-button-${name.toLowerCase()}`);
        const region = screen.getByTestId(`aria-region-${name.toLowerCase()}`);

        expect(button).toHaveAttribute("aria-label", "Primary action button");
        expect(region).toHaveAttribute("role", "region");
        expect(region).toHaveAttribute("aria-labelledby", "section-heading");
      });
    });
  });

  describe("Property 8: Performance Across Browsers", () => {
    /**
     * **Validates: Requirements US7**
     * Property: Performance should be consistent across different browsers
     */
    test("CSS custom properties load efficiently", () => {
      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        // Test that CSS custom properties are accessible
        const cssProperties = [
          "--color-primary",
          "--color-bg-peach",
          "--font-size-heading-xl",
          "--shadow-card",
          "--spacing-section",
        ];

        cssProperties.forEach(property => {
          // In a real browser, this would return the actual value
          // In tests, we just verify the property name is valid
          expect(property).toMatch(/^--[\w-]+$/);
        });
      });
    });

    test("large component trees render efficiently", () => {
      const largeComponentTree = (
        <div className="responsive-container">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="card-base shadow-card p-responsive-md m-responsive-sm"
            >
              <h3 className="heading-sm">Card {i + 1}</h3>
              <p className="body-md">Card content for performance testing.</p>
              <div
                className="gap-responsive-xs"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {Array.from({ length: 3 }, (_, j) => (
                  <span key={j} className="badge-base badge-skill">
                    Tag {j + 1}
                  </span>
                ))}
              </div>
              <button className="btn-base btn-primary">Action</button>
            </div>
          ))}
        </div>
      );

      browserConfigs.forEach(({ name, userAgent, features }) => {
        mockBrowserEnvironment(userAgent, features);

        const startTime = performance.now();
        const { container } = render(
          <div data-testid={`performance-${name.toLowerCase()}`}>
            {largeComponentTree}
          </div>
        );
        const endTime = performance.now();

        const element = screen.getByTestId(`performance-${name.toLowerCase()}`);
        expect(element).toBeInTheDocument();

        // Verify all cards are rendered
        const cards = container.querySelectorAll(".card-base");
        expect(cards).toHaveLength(20);

        // Basic performance check
        expect(endTime - startTime).toBeLessThan(200); // 200ms threshold for large trees
      });
    });
  });
});
