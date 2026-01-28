import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import IsometricScene from "../components/animations/IsometricScene";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
}));

describe("IsometricScene Component", () => {
  it("renders without crashing", () => {
    render(<IsometricScene />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
  });

  it("has correct aria-label for accessibility", () => {
    render(<IsometricScene />);
    const svgElement = screen.getByLabelText(
      "Animated isometric 3D scene with floating geometric shapes"
    );
    expect(svgElement).toBeInTheDocument();
  });

  it("respects reduced motion preferences", () => {
    render(<IsometricScene prefersReducedMotion />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-isometric-class";
    render(<IsometricScene className={customClass} />);
    const container = screen.getByRole("img").closest(".isometric-scene");
    expect(container).toHaveClass(customClass);
  });

  it("contains SVG gradient definitions", () => {
    render(<IsometricScene />);
    const svgElement = screen.getByRole("img");

    // Check for gradient definitions
    const primaryGradient = svgElement.querySelector("#primaryGradient");
    const orangeGradient = svgElement.querySelector("#orangeGradient");
    const pinkGradient = svgElement.querySelector("#pinkGradient");
    const blueGradient = svgElement.querySelector("#blueGradient");

    expect(primaryGradient).toBeInTheDocument();
    expect(orangeGradient).toBeInTheDocument();
    expect(pinkGradient).toBeInTheDocument();
    expect(blueGradient).toBeInTheDocument();
  });

  it("contains shadow filter definitions", () => {
    render(<IsometricScene />);
    const svgElement = screen.getByRole("img");

    // Check for filter definitions
    const softShadow = svgElement.querySelector("#softShadow");
    const glowEffect = svgElement.querySelector("#glowEffect");

    expect(softShadow).toBeInTheDocument();
    expect(glowEffect).toBeInTheDocument();
  });

  it("contains isometric geometric shapes", () => {
    render(<IsometricScene />);
    const svgElement = screen.getByRole("img");

    // Check for various geometric shapes
    const paths = svgElement.querySelectorAll("path");
    const circles = svgElement.querySelectorAll("circle");
    const ellipses = svgElement.querySelectorAll("ellipse");
    const rects = svgElement.querySelectorAll("rect");

    expect(paths.length).toBeGreaterThan(0);
    expect(circles.length).toBeGreaterThan(0);
    expect(ellipses.length).toBeGreaterThan(0);
    expect(rects.length).toBeGreaterThan(0);
  });

  it("has floating CSS elements for additional depth", () => {
    const { container } = render(<IsometricScene />);

    // Check for floating particle elements
    const floatingElements = container.querySelectorAll(
      ".absolute.top-1\\/4, .absolute.top-3\\/4, .absolute.top-1\\/2"
    );

    expect(floatingElements.length).toBeGreaterThan(0);
  });
});
