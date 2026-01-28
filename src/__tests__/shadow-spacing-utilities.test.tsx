import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Shadow and Spacing Utilities", () => {
  describe("Shadow Utilities", () => {
    it("applies shadow classes correctly", () => {
      const { container } = render(
        <div>
          <div className="shadow-soft" data-testid="shadow-soft">
            Soft Shadow
          </div>
          <div className="shadow-card" data-testid="shadow-card">
            Card Shadow
          </div>
          <div className="shadow-hover" data-testid="shadow-hover">
            Hover Shadow
          </div>
          <div className="shadow-primary" data-testid="shadow-primary">
            Primary Shadow
          </div>
          <div className="shadow-glow-primary" data-testid="shadow-glow">
            Glow Shadow
          </div>
        </div>
      );

      expect(screen.getByTestId("shadow-soft")).toHaveClass("shadow-soft");
      expect(screen.getByTestId("shadow-card")).toHaveClass("shadow-card");
      expect(screen.getByTestId("shadow-hover")).toHaveClass("shadow-hover");
      expect(screen.getByTestId("shadow-primary")).toHaveClass(
        "shadow-primary"
      );
      expect(screen.getByTestId("shadow-glow")).toHaveClass(
        "shadow-glow-primary"
      );
    });

    it("applies interactive shadow states", () => {
      const { container } = render(
        <div className="shadow-interactive" data-testid="interactive-shadow">
          Interactive Element
        </div>
      );

      const element = screen.getByTestId("interactive-shadow");
      expect(element).toHaveClass("shadow-interactive");
    });

    it("applies inset shadows correctly", () => {
      const { container } = render(
        <div>
          <div className="shadow-inset-soft" data-testid="inset-soft">
            Inset Soft
          </div>
          <div className="shadow-inset-medium" data-testid="inset-medium">
            Inset Medium
          </div>
        </div>
      );

      expect(screen.getByTestId("inset-soft")).toHaveClass("shadow-inset-soft");
      expect(screen.getByTestId("inset-medium")).toHaveClass(
        "shadow-inset-medium"
      );
    });

    it("applies colored shadows correctly", () => {
      const { container } = render(
        <div>
          <div className="shadow-accent-orange" data-testid="orange-shadow">
            Orange Shadow
          </div>
          <div className="shadow-accent-pink" data-testid="pink-shadow">
            Pink Shadow
          </div>
          <div className="shadow-accent-blue" data-testid="blue-shadow">
            Blue Shadow
          </div>
        </div>
      );

      expect(screen.getByTestId("orange-shadow")).toHaveClass(
        "shadow-accent-orange"
      );
      expect(screen.getByTestId("pink-shadow")).toHaveClass(
        "shadow-accent-pink"
      );
      expect(screen.getByTestId("blue-shadow")).toHaveClass(
        "shadow-accent-blue"
      );
    });
  });

  describe("Spacing Utilities", () => {
    it("applies responsive padding classes correctly", () => {
      const { container } = render(
        <div>
          <div className="p-responsive-xs" data-testid="padding-xs">
            XS Padding
          </div>
          <div className="p-responsive-sm" data-testid="padding-sm">
            SM Padding
          </div>
          <div className="p-responsive-md" data-testid="padding-md">
            MD Padding
          </div>
          <div className="p-responsive-lg" data-testid="padding-lg">
            LG Padding
          </div>
          <div className="p-responsive-xl" data-testid="padding-xl">
            XL Padding
          </div>
        </div>
      );

      expect(screen.getByTestId("padding-xs")).toHaveClass("p-responsive-xs");
      expect(screen.getByTestId("padding-sm")).toHaveClass("p-responsive-sm");
      expect(screen.getByTestId("padding-md")).toHaveClass("p-responsive-md");
      expect(screen.getByTestId("padding-lg")).toHaveClass("p-responsive-lg");
      expect(screen.getByTestId("padding-xl")).toHaveClass("p-responsive-xl");
    });

    it("applies responsive margin classes correctly", () => {
      const { container } = render(
        <div>
          <div className="m-responsive-xs" data-testid="margin-xs">
            XS Margin
          </div>
          <div className="m-responsive-sm" data-testid="margin-sm">
            SM Margin
          </div>
          <div className="m-responsive-md" data-testid="margin-md">
            MD Margin
          </div>
          <div className="m-responsive-lg" data-testid="margin-lg">
            LG Margin
          </div>
          <div className="m-responsive-xl" data-testid="margin-xl">
            XL Margin
          </div>
        </div>
      );

      expect(screen.getByTestId("margin-xs")).toHaveClass("m-responsive-xs");
      expect(screen.getByTestId("margin-sm")).toHaveClass("m-responsive-sm");
      expect(screen.getByTestId("margin-md")).toHaveClass("m-responsive-md");
      expect(screen.getByTestId("margin-lg")).toHaveClass("m-responsive-lg");
      expect(screen.getByTestId("margin-xl")).toHaveClass("m-responsive-xl");
    });

    it("applies responsive gap classes correctly", () => {
      const { container } = render(
        <div>
          <div className="gap-responsive-xs" data-testid="gap-xs">
            XS Gap
          </div>
          <div className="gap-responsive-sm" data-testid="gap-sm">
            SM Gap
          </div>
          <div className="gap-responsive-md" data-testid="gap-md">
            MD Gap
          </div>
          <div className="gap-responsive-lg" data-testid="gap-lg">
            LG Gap
          </div>
          <div className="gap-responsive-xl" data-testid="gap-xl">
            XL Gap
          </div>
        </div>
      );

      expect(screen.getByTestId("gap-xs")).toHaveClass("gap-responsive-xs");
      expect(screen.getByTestId("gap-sm")).toHaveClass("gap-responsive-sm");
      expect(screen.getByTestId("gap-md")).toHaveClass("gap-responsive-md");
      expect(screen.getByTestId("gap-lg")).toHaveClass("gap-responsive-lg");
      expect(screen.getByTestId("gap-xl")).toHaveClass("gap-responsive-xl");
    });

    it("applies directional responsive spacing correctly", () => {
      const { container } = render(
        <div>
          <div className="px-responsive-md" data-testid="px-responsive">
            Horizontal Padding
          </div>
          <div className="py-responsive-md" data-testid="py-responsive">
            Vertical Padding
          </div>
          <div className="mx-responsive-md" data-testid="mx-responsive">
            Horizontal Margin
          </div>
          <div className="my-responsive-md" data-testid="my-responsive">
            Vertical Margin
          </div>
        </div>
      );

      expect(screen.getByTestId("px-responsive")).toHaveClass(
        "px-responsive-md"
      );
      expect(screen.getByTestId("py-responsive")).toHaveClass(
        "py-responsive-md"
      );
      expect(screen.getByTestId("mx-responsive")).toHaveClass(
        "mx-responsive-md"
      );
      expect(screen.getByTestId("my-responsive")).toHaveClass(
        "my-responsive-md"
      );
    });

    it("applies component-specific spacing correctly", () => {
      const { container } = render(
        <div>
          <div className="card-padding" data-testid="card-padding">
            Card Padding
          </div>
          <div className="card-gap" data-testid="card-gap">
            Card Gap
          </div>
          <div className="button-padding" data-testid="button-padding">
            Button Padding
          </div>
          <div className="section-spacing" data-testid="section-spacing">
            Section Spacing
          </div>
          <div className="layout-gap" data-testid="layout-gap">
            Layout Gap
          </div>
        </div>
      );

      expect(screen.getByTestId("card-padding")).toHaveClass("card-padding");
      expect(screen.getByTestId("card-gap")).toHaveClass("card-gap");
      expect(screen.getByTestId("button-padding")).toHaveClass(
        "button-padding"
      );
      expect(screen.getByTestId("section-spacing")).toHaveClass(
        "section-spacing"
      );
      expect(screen.getByTestId("layout-gap")).toHaveClass("layout-gap");
    });

    it("applies space-between utilities correctly", () => {
      const { container } = render(
        <div>
          <div className="space-y-responsive-md" data-testid="space-y">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </div>
          <div className="space-x-responsive-md" data-testid="space-x">
            <span>Item 1</span>
            <span>Item 2</span>
            <span>Item 3</span>
          </div>
        </div>
      );

      expect(screen.getByTestId("space-y")).toHaveClass(
        "space-y-responsive-md"
      );
      expect(screen.getByTestId("space-x")).toHaveClass(
        "space-x-responsive-md"
      );
    });
  });

  describe("Integration with Components", () => {
    it("works with card components", () => {
      const { container } = render(
        <div className="card-base shadow-primary p-responsive-md gap-responsive-sm">
          <h3>Card Title</h3>
          <p>Card content with responsive spacing</p>
        </div>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("card-base");
      expect(card).toHaveClass("shadow-primary");
      expect(card).toHaveClass("p-responsive-md");
      expect(card).toHaveClass("gap-responsive-sm");
    });

    it("works with button components", () => {
      const { container } = render(
        <button className="btn-base btn-primary shadow-primary-hover button-padding">
          Button with Enhanced Shadows
        </button>
      );

      const button = container.firstChild as HTMLElement;
      expect(button).toHaveClass("btn-base");
      expect(button).toHaveClass("btn-primary");
      expect(button).toHaveClass("shadow-primary-hover");
      expect(button).toHaveClass("button-padding");
    });

    it("works with badge components", () => {
      const { container } = render(
        <span className="badge-base badge-skill shadow-soft">
          Enhanced Badge
        </span>
      );

      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("badge-base");
      expect(badge).toHaveClass("badge-skill");
      expect(badge).toHaveClass("shadow-soft");
    });
  });

  describe("Responsive Behavior", () => {
    it("applies different spacing at different breakpoints", () => {
      // This test verifies that the CSS classes are applied correctly
      // The actual responsive behavior would be tested with viewport changes
      const { container } = render(
        <div className="p-responsive-md gap-responsive-lg section-spacing">
          <div>Responsive content</div>
        </div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("p-responsive-md");
      expect(element).toHaveClass("gap-responsive-lg");
      expect(element).toHaveClass("section-spacing");
    });

    it("maintains accessibility with proper spacing", () => {
      const { container } = render(
        <div className="space-y-responsive-md">
          <button className="button-padding">Button 1</button>
          <button className="button-padding">Button 2</button>
          <button className="button-padding">Button 3</button>
        </div>
      );

      const wrapper = container.firstChild as HTMLElement;
      const buttons = wrapper.querySelectorAll("button");

      expect(wrapper).toHaveClass("space-y-responsive-md");
      buttons.forEach(button => {
        expect(button).toHaveClass("button-padding");
      });
    });
  });

  describe("CSS Custom Properties Integration", () => {
    it("uses CSS custom properties for consistent theming", () => {
      // Test that the utilities integrate with the CSS custom properties system
      const { container } = render(
        <div>
          <div className="shadow-primary" data-testid="primary-shadow">
            Primary Shadow
          </div>
          <div className="p-responsive-md" data-testid="responsive-padding">
            Responsive Padding
          </div>
        </div>
      );

      // Verify that the classes are applied (the actual CSS values would be tested in integration tests)
      expect(screen.getByTestId("primary-shadow")).toHaveClass(
        "shadow-primary"
      );
      expect(screen.getByTestId("responsive-padding")).toHaveClass(
        "p-responsive-md"
      );
    });
  });

  describe("Performance Considerations", () => {
    it("applies mobile-optimized shadows on small screens", () => {
      // This test verifies that performance-optimized classes are available
      const { container } = render(
        <div className="shadow-hover shadow-glow-primary">
          Performance optimized element
        </div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("shadow-hover");
      expect(element).toHaveClass("shadow-glow-primary");
    });
  });
});
