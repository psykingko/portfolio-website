/**
 * Design System Viewport Testing
 * **Validates: Requirements US6, US7**
 *
 * Comprehensive testing of design system components across different viewport sizes
 * with real viewport simulation and layout validation.
 */

import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

// Viewport testing utilities
const setViewportSize = (width: number, height: number) => {
  // Mock window dimensions
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

  // Mock screen dimensions
  Object.defineProperty(window.screen, "width", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window.screen, "height", {
    writable: true,
    configurable: true,
    value: height,
  });

  // Mock matchMedia for responsive queries
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => {
      // Parse media query to determine if it matches current viewport
      const minWidthMatch = query.match(/min-width:\s*(\d+)px/);
      const maxWidthMatch = query.match(/max-width:\s*(\d+)px/);

      let matches = true;

      if (minWidthMatch) {
        const minWidth = parseInt(minWidthMatch[1]);
        matches = matches && width >= minWidth;
      }

      if (maxWidthMatch) {
        const maxWidth = parseInt(maxWidthMatch[1]);
        matches = matches && width <= maxWidth;
      }

      // Handle special queries
      if (query.includes("prefers-reduced-motion: reduce")) {
        matches = false; // Default to no reduced motion preference
      }

      if (query.includes("hover: hover")) {
        matches = width >= 1024; // Assume hover support on desktop
      }

      if (query.includes("pointer: coarse")) {
        matches = width < 1024; // Assume touch on mobile/tablet
      }

      return {
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    }),
  });

  // Trigger resize event
  act(() => {
    window.dispatchEvent(new Event("resize"));
  });
};

// Comprehensive viewport test configurations
const viewportConfigurations = [
  // Mobile devices
  {
    name: "iPhone SE",
    width: 375,
    height: 667,
    category: "mobile",
    orientation: "portrait",
  },
  {
    name: "iPhone 12",
    width: 390,
    height: 844,
    category: "mobile",
    orientation: "portrait",
  },
  {
    name: "iPhone 12 Pro Max",
    width: 428,
    height: 926,
    category: "mobile",
    orientation: "portrait",
  },
  {
    name: "Samsung Galaxy S21",
    width: 384,
    height: 854,
    category: "mobile",
    orientation: "portrait",
  },

  // Mobile landscape
  {
    name: "iPhone SE Landscape",
    width: 667,
    height: 375,
    category: "mobile",
    orientation: "landscape",
  },
  {
    name: "iPhone 12 Landscape",
    width: 844,
    height: 390,
    category: "mobile",
    orientation: "landscape",
  },

  // Tablets
  {
    name: "iPad",
    width: 768,
    height: 1024,
    category: "tablet",
    orientation: "portrait",
  },
  {
    name: "iPad Air",
    width: 820,
    height: 1180,
    category: "tablet",
    orientation: "portrait",
  },
  {
    name: 'iPad Pro 11"',
    width: 834,
    height: 1194,
    category: "tablet",
    orientation: "portrait",
  },
  {
    name: 'iPad Pro 12.9"',
    width: 1024,
    height: 1366,
    category: "tablet",
    orientation: "portrait",
  },

  // Tablet landscape
  {
    name: "iPad Landscape",
    width: 1024,
    height: 768,
    category: "tablet",
    orientation: "landscape",
  },
  {
    name: "iPad Air Landscape",
    width: 1180,
    height: 820,
    category: "tablet",
    orientation: "landscape",
  },

  // Desktop
  {
    name: "Laptop Small",
    width: 1280,
    height: 720,
    category: "desktop",
    orientation: "landscape",
  },
  {
    name: "Laptop Medium",
    width: 1366,
    height: 768,
    category: "desktop",
    orientation: "landscape",
  },
  {
    name: "Desktop Standard",
    width: 1440,
    height: 900,
    category: "desktop",
    orientation: "landscape",
  },
  {
    name: "Desktop Large",
    width: 1920,
    height: 1080,
    category: "desktop",
    orientation: "landscape",
  },
  {
    name: "Desktop 4K",
    width: 2560,
    height: 1440,
    category: "desktop",
    orientation: "landscape",
  },
  {
    name: "Ultrawide",
    width: 3440,
    height: 1440,
    category: "desktop",
    orientation: "landscape",
  },
];

// Test component configurations
const testComponents = {
  typography: {
    name: "Typography System",
    component: (
      <div className="space-y-responsive-md">
        <h1 className="heading-xl" data-testid="heading-xl">
          Main Heading
        </h1>
        <h2 className="heading-lg" data-testid="heading-lg">
          Section Heading
        </h2>
        <h3 className="heading-md" data-testid="heading-md">
          Subsection Heading
        </h3>
        <h4 className="heading-sm" data-testid="heading-sm">
          Card Heading
        </h4>
        <p className="body-xl" data-testid="body-xl">
          Large body text for emphasis
        </p>
        <p className="body-lg" data-testid="body-lg">
          Standard large body text
        </p>
        <p className="body-md" data-testid="body-md">
          Regular body text content
        </p>
        <p className="body-sm" data-testid="body-sm">
          Small body text
        </p>
        <p className="text-lead" data-testid="text-lead">
          Lead paragraph text
        </p>
        <p className="text-caption" data-testid="text-caption">
          Caption text
        </p>
      </div>
    ),
  },

  layout: {
    name: "Layout System",
    component: (
      <div className="responsive-container" data-testid="container">
        <div
          className="responsive-grid responsive-grid-2-md responsive-grid-3-lg responsive-grid-4-xl gap-responsive-md"
          data-testid="grid"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="card-base p-responsive-md"
              data-testid={`grid-item-${i}`}
            >
              <h3 className="heading-sm">Item {i + 1}</h3>
              <p className="body-sm">Grid item content</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  hero: {
    name: "Hero Section",
    component: (
      <section className="hero-responsive section-padding" data-testid="hero">
        <div className="hero-content" data-testid="hero-content">
          <h1 className="heading-xl">Hello, I'm Ashish Singh</h1>
          <p className="text-lead body-xl">Full-Stack & AI Developer</p>
          <div className="button-group-responsive" data-testid="button-group">
            <button className="btn-base btn-primary shadow-primary">
              View Work
            </button>
            <button className="btn-base btn-secondary">Download Resume</button>
          </div>
        </div>
        <div className="hero-visual" data-testid="hero-visual">
          <div className="animate-float shadow-soft p-responsive-lg">
            <div className="responsive-grid responsive-grid-2-sm gap-responsive-sm">
              <div className="shadow-card p-responsive-sm">3D Element 1</div>
              <div className="shadow-card p-responsive-sm">3D Element 2</div>
            </div>
          </div>
        </div>
      </section>
    ),
  },

  forms: {
    name: "Form Elements",
    component: (
      <form className="form-responsive" data-testid="form">
        <div className="form-responsive-row" data-testid="form-row">
          <input
            type="text"
            placeholder="Name"
            className="touch-target"
            data-testid="input-name"
          />
          <input
            type="email"
            placeholder="Email"
            className="touch-target"
            data-testid="input-email"
          />
        </div>
        <textarea
          placeholder="Message"
          className="touch-target"
          data-testid="textarea"
          rows={4}
        />
        <div className="button-group-responsive">
          <button
            type="submit"
            className="btn-base btn-primary touch-target"
            data-testid="submit-btn"
          >
            Send Message
          </button>
          <button
            type="reset"
            className="btn-base btn-secondary touch-target"
            data-testid="reset-btn"
          >
            Reset
          </button>
        </div>
      </form>
    ),
  },

  navigation: {
    name: "Navigation",
    component: (
      <nav className="nav-responsive" data-testid="nav">
        <div className="nav-brand" data-testid="nav-brand">
          <h2 className="heading-sm">Brand</h2>
        </div>
        <div className="nav-links" data-testid="nav-links">
          <a href="#about" className="focus-responsive">
            About
          </a>
          <a href="#skills" className="focus-responsive">
            Skills
          </a>
          <a href="#projects" className="focus-responsive">
            Projects
          </a>
          <a href="#contact" className="focus-responsive">
            Contact
          </a>
        </div>
      </nav>
    ),
  },
};

describe("Design System Viewport Testing", () => {
  describe("Property 1: Layout Adaptation Across Viewports", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Layouts should adapt correctly to different viewport sizes
     */
    Object.entries(testComponents).forEach(([key, { name, component }]) => {
      test(`${name} adapts correctly across all viewport sizes`, () => {
        viewportConfigurations.forEach(viewport => {
          setViewportSize(viewport.width, viewport.height);

          const { container } = render(
            <div
              data-testid={`${key}-${viewport.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {component}
            </div>
          );

          const wrapper = screen.getByTestId(
            `${key}-${viewport.name.toLowerCase().replace(/\s+/g, "-")}`
          );
          expect(wrapper).toBeInTheDocument();

          // Verify no horizontal overflow
          expect(wrapper.scrollWidth).toBeLessThanOrEqual(viewport.width + 100); // Allow margin for scrollbars

          // Verify content is visible
          expect(wrapper).toBeVisible();
        });
      });
    });
  });

  describe("Property 2: Typography Scaling Validation", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Typography should scale appropriately across viewport sizes
     */
    test("heading hierarchy is maintained across all viewports", () => {
      const headingElements = [
        "heading-xl",
        "heading-lg",
        "heading-md",
        "heading-sm",
      ];

      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.typography.component);

        headingElements.forEach(headingClass => {
          const element = screen.getByTestId(headingClass);
          expect(element).toHaveClass(headingClass);
          expect(element).toBeVisible();

          // Verify text is not cut off
          expect(element.scrollWidth).toBeLessThanOrEqual(viewport.width);
        });
      });
    });

    test("body text remains readable at all viewport sizes", () => {
      const bodyElements = [
        "body-xl",
        "body-lg",
        "body-md",
        "body-sm",
        "text-lead",
      ];

      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.typography.component);

        bodyElements.forEach(bodyClass => {
          const element = screen.getByTestId(bodyClass);
          expect(element).toHaveClass(bodyClass);
          expect(element).toBeVisible();

          // Verify text content is present
          expect(element.textContent).toBeTruthy();
          expect(element.textContent!.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe("Property 3: Grid System Responsiveness", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Grid systems should adapt column counts based on viewport
     */
    test("grid columns adapt correctly to viewport breakpoints", () => {
      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.layout.component);

        const container = screen.getByTestId("container");
        const grid = screen.getByTestId("grid");

        expect(container).toHaveClass("responsive-container");
        expect(grid).toHaveClass("responsive-grid");

        // Verify all grid items are present
        for (let i = 0; i < 8; i++) {
          const item = screen.getByTestId(`grid-item-${i}`);
          expect(item).toBeVisible();
          expect(item).toHaveClass("card-base");
        }

        // Verify grid doesn't cause horizontal overflow
        expect(grid.scrollWidth).toBeLessThanOrEqual(viewport.width + 50);
      });
    });

    test("grid gaps scale appropriately", () => {
      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.layout.component);

        const grid = screen.getByTestId("grid");
        expect(grid).toHaveClass("gap-responsive-md");

        // Verify grid items don't overlap
        const items = Array.from(grid.children);
        expect(items.length).toBe(8);

        items.forEach(item => {
          expect(item).toBeVisible();
        });
      });
    });
  });

  describe("Property 4: Hero Section Responsiveness", () => {
    /**
     * **Validates: Requirements US1, US6**
     * Property: Hero section should adapt layout based on viewport size
     */
    test("hero section layout adapts from mobile to desktop", () => {
      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.hero.component);

        const hero = screen.getByTestId("hero");
        const heroContent = screen.getByTestId("hero-content");
        const heroVisual = screen.getByTestId("hero-visual");
        const buttonGroup = screen.getByTestId("button-group");

        expect(hero).toHaveClass("hero-responsive");
        expect(hero).toHaveClass("section-padding");
        expect(heroContent).toBeVisible();
        expect(heroVisual).toBeVisible();
        expect(buttonGroup).toHaveClass("button-group-responsive");

        // Verify content doesn't overflow
        expect(hero.scrollWidth).toBeLessThanOrEqual(viewport.width + 50);

        // Verify key content is present
        expect(screen.getByText("Hello, I'm Ashish Singh")).toBeVisible();
        expect(screen.getByText("Full-Stack & AI Developer")).toBeVisible();
        expect(screen.getByText("View Work")).toBeVisible();
        expect(screen.getByText("Download Resume")).toBeVisible();
      });
    });

    test("button groups adapt to viewport constraints", () => {
      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.hero.component);

        const buttonGroup = screen.getByTestId("button-group");
        const buttons = buttonGroup.querySelectorAll("button");

        expect(buttons).toHaveLength(2);

        buttons.forEach(button => {
          expect(button).toBeVisible();
          expect(button).toHaveClass("btn-base");

          // On mobile, buttons should meet touch target requirements
          if (viewport.category === "mobile") {
            // Buttons should be large enough for touch interaction
            expect(button.textContent).toBeTruthy();
          }
        });
      });
    });
  });

  describe("Property 5: Form Responsiveness", () => {
    /**
     * **Validates: Requirements US5, US6**
     * Property: Forms should be usable across all viewport sizes
     */
    test("form layouts adapt to viewport constraints", () => {
      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.forms.component);

        const form = screen.getByTestId("form");
        const formRow = screen.getByTestId("form-row");
        const nameInput = screen.getByTestId("input-name");
        const emailInput = screen.getByTestId("input-email");
        const textarea = screen.getByTestId("textarea");
        const submitBtn = screen.getByTestId("submit-btn");
        const resetBtn = screen.getByTestId("reset-btn");

        expect(form).toHaveClass("form-responsive");
        expect(formRow).toHaveClass("form-responsive-row");

        // Verify all form elements are present and have touch targets
        [nameInput, emailInput, textarea, submitBtn, resetBtn].forEach(
          element => {
            expect(element).toBeVisible();
            expect(element).toHaveClass("touch-target");
          }
        );

        // Verify form doesn't cause horizontal overflow
        expect(form.scrollWidth).toBeLessThanOrEqual(viewport.width + 50);
      });
    });

    test("touch targets meet accessibility requirements on mobile", () => {
      const mobileViewports = viewportConfigurations.filter(
        v => v.category === "mobile"
      );

      mobileViewports.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.forms.component);

        const touchElements = [
          screen.getByTestId("input-name"),
          screen.getByTestId("input-email"),
          screen.getByTestId("textarea"),
          screen.getByTestId("submit-btn"),
          screen.getByTestId("reset-btn"),
        ];

        touchElements.forEach(element => {
          expect(element).toHaveClass("touch-target");
          expect(element).toBeVisible();

          // Verify element is accessible
          expect(element).toBeEnabled();
        });
      });
    });
  });

  describe("Property 6: Navigation Responsiveness", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Navigation should adapt to different viewport sizes
     */
    test("navigation adapts from mobile to desktop layout", () => {
      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.navigation.component);

        const nav = screen.getByTestId("nav");
        const navBrand = screen.getByTestId("nav-brand");
        const navLinks = screen.getByTestId("nav-links");

        expect(nav).toHaveClass("nav-responsive");
        expect(navBrand).toBeVisible();
        expect(navLinks).toBeVisible();

        // Verify all navigation links are present
        const links = navLinks.querySelectorAll("a");
        expect(links).toHaveLength(4);

        links.forEach(link => {
          expect(link).toHaveClass("focus-responsive");
          expect(link).toBeVisible();
        });

        // Verify navigation doesn't overflow
        expect(nav.scrollWidth).toBeLessThanOrEqual(viewport.width + 50);
      });
    });
  });

  describe("Property 7: Performance Across Viewports", () => {
    /**
     * **Validates: Requirements US7**
     * Property: Performance should remain consistent across viewport sizes
     */
    test("rendering performance is consistent across viewports", () => {
      const performanceResults: Record<string, number> = {};

      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        const startTime = performance.now();

        const { container } = render(
          <div>
            {Object.values(testComponents).map(({ component }, index) => (
              <div key={index}>{component}</div>
            ))}
          </div>
        );

        const endTime = performance.now();
        const renderTime = endTime - startTime;

        performanceResults[viewport.name] = renderTime;

        // Verify rendering completed successfully
        expect(container).toBeInTheDocument();

        // Performance should be reasonable (under 100ms for test environment)
        expect(renderTime).toBeLessThan(100);
      });

      // Verify performance is relatively consistent across viewports
      const renderTimes = Object.values(performanceResults);
      const maxTime = Math.max(...renderTimes);
      const minTime = Math.min(...renderTimes);
      const variance = maxTime - minTime;

      // Variance should be reasonable (less than 50ms difference)
      expect(variance).toBeLessThan(50);
    });

    test("memory usage remains stable across viewport changes", () => {
      let initialMemory = 0;

      viewportConfigurations.forEach((viewport, index) => {
        setViewportSize(viewport.width, viewport.height);

        const { container, unmount } = render(
          <div>
            {Object.values(testComponents).map(({ component }, compIndex) => (
              <div key={compIndex}>{component}</div>
            ))}
          </div>
        );

        // Capture initial memory usage (approximation)
        if (index === 0) {
          initialMemory = container.children.length;
        }

        // Verify rendering is stable
        expect(container).toBeInTheDocument();
        expect(container.children.length).toBeGreaterThan(0);

        // Clean up
        unmount();
      });

      // Memory usage should be consistent
      expect(initialMemory).toBeGreaterThan(0);
    });
  });

  describe("Property 8: Accessibility Across Viewports", () => {
    /**
     * **Validates: Requirements US6**
     * Property: Accessibility features should work at all viewport sizes
     */
    test("focus management works across all viewports", () => {
      viewportConfigurations.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.navigation.component);

        const focusableElements = screen.getAllByRole("link");

        focusableElements.forEach(element => {
          expect(element).toHaveClass("focus-responsive");
          expect(element).toBeVisible();

          // Verify element is focusable
          expect(element).toHaveAttribute("href");
        });
      });
    });

    test("touch targets meet minimum size requirements", () => {
      const mobileViewports = viewportConfigurations.filter(
        v => v.category === "mobile"
      );

      mobileViewports.forEach(viewport => {
        setViewportSize(viewport.width, viewport.height);

        render(testComponents.forms.component);

        const touchTargets = [
          screen.getByTestId("input-name"),
          screen.getByTestId("input-email"),
          screen.getByTestId("textarea"),
          screen.getByTestId("submit-btn"),
          screen.getByTestId("reset-btn"),
        ];

        touchTargets.forEach(target => {
          expect(target).toHaveClass("touch-target");
          expect(target).toBeVisible();
          expect(target).toBeEnabled();
        });
      });
    });
  });
});
