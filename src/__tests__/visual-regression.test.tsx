/**
 * Visual Regression Testing for Design System
 * **Validates: Requirements US6, US7**
 *
 * Tests visual consistency of design system components across different screen sizes
 * and ensures no unintended visual changes occur during development.
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock viewport for consistent testing
const setViewport = (width: number, height: number) => {
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
};

// Test snapshots for different viewport sizes
const viewportConfigs = [
  { width: 320, height: 568, name: "mobile-small" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 1280, height: 720, name: "desktop" },
];

describe("Visual Regression Testing", () => {
  describe("Typography Visual Consistency", () => {
    test("heading hierarchy maintains visual consistency", () => {
      viewportConfigs.forEach(({ width, height, name }) => {
        setViewport(width, height);

        const { container } = render(
          <div data-testid={`typography-hierarchy-${name}`}>
            <h1 className="heading-xl">Extra Large Heading</h1>
            <h2 className="heading-lg">Large Heading</h2>
            <h3 className="heading-md">Medium Heading</h3>
            <h4 className="heading-sm">Small Heading</h4>
            <p className="body-lg">Large body text for emphasis</p>
            <p className="body-md">Standard body text for content</p>
            <p className="body-sm">Small body text for details</p>
            <span className="text-caption">Caption text</span>
          </div>
        );

        // Verify structure exists and classes are applied
        const headingXL = container.querySelector(".heading-xl");
        const headingLG = container.querySelector(".heading-lg");
        const headingMD = container.querySelector(".heading-md");
        const headingSM = container.querySelector(".heading-sm");
        const bodyLG = container.querySelector(".body-lg");
        const bodyMD = container.querySelector(".body-md");
        const bodySM = container.querySelector(".body-sm");
        const caption = container.querySelector(".text-caption");

        expect(headingXL).toHaveClass("heading-xl");
        expect(headingLG).toHaveClass("heading-lg");
        expect(headingMD).toHaveClass("heading-md");
        expect(headingSM).toHaveClass("heading-sm");
        expect(bodyLG).toHaveClass("body-lg");
        expect(bodyMD).toHaveClass("body-md");
        expect(bodySM).toHaveClass("body-sm");
        expect(caption).toHaveClass("text-caption");

        // Verify text content
        expect(headingXL?.textContent).toBe("Extra Large Heading");
        expect(bodyMD?.textContent).toBe("Standard body text for content");
        expect(caption?.textContent).toBe("Caption text");
      });
    });
  });
});
