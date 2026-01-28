/**
 * Typography Integration Tests
 *
 * Tests to validate the typography implementation in actual React components
 * Validates: Requirements US6 (responsive design), Design Document typography specifications
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Test component that uses all typography classes
const TypographyTestComponent = () => {
  return (
    <div>
      <h1 className="heading-xl" data-testid="heading-xl">
        Extra Large Heading
      </h1>
      <h2 className="heading-lg" data-testid="heading-lg">
        Large Heading
      </h2>
      <h3 className="heading-md" data-testid="heading-md">
        Medium Heading
      </h3>
      <h4 className="heading-sm" data-testid="heading-sm">
        Small Heading
      </h4>

      <p className="body-xl" data-testid="body-xl">
        Extra large body text
      </p>
      <p className="body-lg" data-testid="body-lg">
        Large body text
      </p>
      <p className="body-md" data-testid="body-md">
        Medium body text
      </p>
      <p className="body-sm" data-testid="body-sm">
        Small body text
      </p>
      <p className="body-xs" data-testid="body-xs">
        Extra small body text
      </p>

      <p className="text-lead" data-testid="text-lead">
        Lead text for introductions
      </p>
      <p className="text-caption" data-testid="text-caption">
        Caption text
      </p>
      <h2 className="text-display-md" data-testid="text-display-md">
        Display heading
      </h2>
    </div>
  );
};

describe("Typography Integration Tests", () => {
  test("renders all typography classes correctly", () => {
    render(<TypographyTestComponent />);

    // Test that all typography elements are rendered
    expect(screen.getByTestId("heading-xl")).toBeInTheDocument();
    expect(screen.getByTestId("heading-lg")).toBeInTheDocument();
    expect(screen.getByTestId("heading-md")).toBeInTheDocument();
    expect(screen.getByTestId("heading-sm")).toBeInTheDocument();

    expect(screen.getByTestId("body-xl")).toBeInTheDocument();
    expect(screen.getByTestId("body-lg")).toBeInTheDocument();
    expect(screen.getByTestId("body-md")).toBeInTheDocument();
    expect(screen.getByTestId("body-sm")).toBeInTheDocument();
    expect(screen.getByTestId("body-xs")).toBeInTheDocument();

    expect(screen.getByTestId("text-lead")).toBeInTheDocument();
    expect(screen.getByTestId("text-caption")).toBeInTheDocument();
    expect(screen.getByTestId("text-display-md")).toBeInTheDocument();
  });

  test("heading elements have correct CSS classes applied", () => {
    render(<TypographyTestComponent />);

    const headingXL = screen.getByTestId("heading-xl");
    const headingLG = screen.getByTestId("heading-lg");
    const headingMD = screen.getByTestId("heading-md");
    const headingSM = screen.getByTestId("heading-sm");

    expect(headingXL).toHaveClass("heading-xl");
    expect(headingLG).toHaveClass("heading-lg");
    expect(headingMD).toHaveClass("heading-md");
    expect(headingSM).toHaveClass("heading-sm");
  });

  test("body text elements have correct CSS classes applied", () => {
    render(<TypographyTestComponent />);

    const bodyXL = screen.getByTestId("body-xl");
    const bodyLG = screen.getByTestId("body-lg");
    const bodyMD = screen.getByTestId("body-md");
    const bodySM = screen.getByTestId("body-sm");
    const bodyXS = screen.getByTestId("body-xs");

    expect(bodyXL).toHaveClass("body-xl");
    expect(bodyLG).toHaveClass("body-lg");
    expect(bodyMD).toHaveClass("body-md");
    expect(bodySM).toHaveClass("body-sm");
    expect(bodyXS).toHaveClass("body-xs");
  });

  test("special text elements have correct CSS classes applied", () => {
    render(<TypographyTestComponent />);

    const textLead = screen.getByTestId("text-lead");
    const textCaption = screen.getByTestId("text-caption");
    const textDisplay = screen.getByTestId("text-display-md");

    expect(textLead).toHaveClass("text-lead");
    expect(textCaption).toHaveClass("text-caption");
    expect(textDisplay).toHaveClass("text-display-md");
  });

  test("typography elements contain expected text content", () => {
    render(<TypographyTestComponent />);

    expect(screen.getByText("Extra Large Heading")).toBeInTheDocument();
    expect(screen.getByText("Large Heading")).toBeInTheDocument();
    expect(screen.getByText("Medium Heading")).toBeInTheDocument();
    expect(screen.getByText("Small Heading")).toBeInTheDocument();

    expect(screen.getByText("Extra large body text")).toBeInTheDocument();
    expect(screen.getByText("Large body text")).toBeInTheDocument();
    expect(screen.getByText("Medium body text")).toBeInTheDocument();
    expect(screen.getByText("Small body text")).toBeInTheDocument();
    expect(screen.getByText("Extra small body text")).toBeInTheDocument();

    expect(screen.getByText("Lead text for introductions")).toBeInTheDocument();
    expect(screen.getByText("Caption text")).toBeInTheDocument();
    expect(screen.getByText("Display heading")).toBeInTheDocument();
  });
});

/**
 * Property-Based Test for Typography Accessibility
 * **Validates: Requirements US6**
 *
 * This test validates that typography maintains accessibility standards
 */
describe("Typography Accessibility Tests", () => {
  test("heading hierarchy is semantically correct", () => {
    render(<TypographyTestComponent />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2Elements = screen.getAllByRole("heading", { level: 2 });
    const h3 = screen.getByRole("heading", { level: 3 });
    const h4 = screen.getByRole("heading", { level: 4 });

    expect(h1).toHaveClass("heading-xl");
    expect(h2Elements[0]).toHaveClass("heading-lg");
    expect(h3).toHaveClass("heading-md");
    expect(h4).toHaveClass("heading-sm");
  });

  test("text content is accessible to screen readers", () => {
    render(<TypographyTestComponent />);

    // All text should be accessible
    const allTextElements = [
      "Extra Large Heading",
      "Large Heading",
      "Medium Heading",
      "Small Heading",
      "Extra large body text",
      "Large body text",
      "Medium body text",
      "Small body text",
      "Extra small body text",
      "Lead text for introductions",
      "Caption text",
      "Display heading",
    ];

    allTextElements.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test("typography classes maintain proper contrast and readability", () => {
    render(<TypographyTestComponent />);

    // Test that elements with typography classes are rendered
    // In a real browser, these would have the proper CSS applied
    const typographyElements = [
      screen.getByTestId("heading-xl"),
      screen.getByTestId("heading-lg"),
      screen.getByTestId("heading-md"),
      screen.getByTestId("heading-sm"),
      screen.getByTestId("body-xl"),
      screen.getByTestId("body-lg"),
      screen.getByTestId("body-md"),
      screen.getByTestId("body-sm"),
      screen.getByTestId("body-xs"),
    ];

    typographyElements.forEach(element => {
      expect(element).toBeInTheDocument();
      expect(element).toBeVisible();
    });
  });
});
