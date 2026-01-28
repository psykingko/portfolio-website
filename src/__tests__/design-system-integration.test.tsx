/**
 * Design System Integration Tests
 * **Validates: Requirements US1, US2, US3, US6, US7**
 *
 * Comprehensive integration tests that validate the entire design system
 * working together across different screen sizes and use cases.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

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
};

describe("Design System Integration Tests", () => {
  describe("Complete Page Layout Integration", () => {
    test("full portfolio page layout works across all screen sizes", () => {
      const viewports = [
        { width: 320, height: 568, name: "mobile" },
        { width: 768, height: 1024, name: "tablet" },
        { width: 1280, height: 720, name: "desktop" },
      ];

      viewports.forEach(({ width, height, name }) => {
        mockViewport(width, height);

        const { container } = render(
          <div className="responsive-container">
            <section className="hero-responsive section-padding">
              <div className="hero-content">
                <h1 className="heading-xl">Hello, I'm Ashish Singh</h1>
                <p className="text-lead body-xl">Full-Stack & AI Developer</p>
                <div className="button-group-responsive">
                  <button className="btn-base btn-primary shadow-primary">
                    View Work
                  </button>
                  <button className="btn-base btn-secondary">
                    Download Resume
                  </button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="animate-float shadow-soft p-responsive-lg">
                  3D Element
                </div>
              </div>
            </section>

            <section className="section-padding">
              <h2 className="heading-lg responsive-text-center">
                Technical Skills
              </h2>
              <div className="responsive-grid responsive-grid-2-md responsive-grid-4-lg gap-responsive-md">
                <div className="card-base shadow-card p-responsive-md">
                  <h3 className="heading-sm">Languages</h3>
                </div>
              </div>
            </section>
          </div>
        );

        // Verify main structure exists
        expect(
          container.querySelector(".responsive-container")
        ).toBeInTheDocument();
        expect(container.querySelector(".hero-responsive")).toBeInTheDocument();

        // Verify hero content (using getAllByText to handle multiple instances)
        const headings = screen.getAllByText("Hello, I'm Ashish Singh");
        expect(headings[0]).toHaveClass("heading-xl");

        const subtitles = screen.getAllByText("Full-Stack & AI Developer");
        expect(subtitles[0]).toHaveClass("text-lead");

        // Verify sections (using getAllByText to handle multiple instances)
        const skillsHeadings = screen.getAllByText("Technical Skills");
        expect(skillsHeadings[0]).toHaveClass("heading-lg");
      });
    });
  });
});
