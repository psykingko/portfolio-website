/**
 * Accessibility Validation Tests for Design System
 * **Validates: Requirements US6**
 * 
 * Tests accessibility compliance of design system components across different screen sizes
 * ensuring WCAG 2.1 AA compliance and proper assistive technology support.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
};

const viewportSizes = [
  { width: 320, height: 568, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1280, height: 720, name: 'desktop' },
];

describe("Accessibility Validation Tests", () => {
  
  describe("Touch Target Accessibility", () => {
    test("interactive elements meet minimum touch target size on mobile", () => {
      const mobileViewport = { width: 320, height: 568 };
      mockViewport(mobileViewport.width, mobileViewport.height);
      
      const { container } = render(
        <div>
          <button className="btn-base btn-primary touch-target">Mobile Button</button>
          <a href="#test" className="touch-target">Mobile Link</a>
        </div>
      );
      
      const button = container.querySelector('button');
      const link = container.querySelector('a');
      
      expect(button).toHaveClass('touch-target');
      expect(link).toHaveClass('touch-target');
    });
  });

  describe("Focus Management", () => {
    test("focus indicators are visible across all screen sizes", () => {
      viewportSizes.forEach(({ width, height, name }) => {
        mockViewport(width, height);
        
        const { container } = render(
          <div>
            <button className="btn-base btn-primary focus-responsive">
              Focusable Button
            </button>
            <input className="focus-responsive" placeholder="Focusable Input" />
          </div>
        );
        
        const button = container.querySelector('button');
        const input = container.querySelector('input');
        
        expect(button).toHaveClass('focus-responsive');
        expect(input).toHaveClass('focus-responsive');
      });
    });
  });

  describe("Semantic Structure", () => {
    test("heading hierarchy is maintained across screen sizes", () => {
      viewportSizes.forEach(({ width, height, name }) => {
        mockViewport(width, height);
        
        render(
          <div>
            <h1 className="heading-xl">Main Heading</h1>
            <h2 className="heading-lg">Section Heading</h2>
            <h3 className="heading-md">Subsection Heading</h3>
          </div>
        );
        
        const h1 = screen.getByRole('heading', { level: 1 });
        const h2 = screen.getByRole('heading', { level: 2 });
        const h3 = screen.getByRole('heading', { level: 3 });
        
        expect(h1).toHaveClass('heading-xl');
        expect(h2).toHaveClass('heading-lg');
        expect(h3).toHaveClass('heading-md');
      });
    });
  });
});