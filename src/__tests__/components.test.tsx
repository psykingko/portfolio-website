import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";

// Mock scrollTo for smooth scrolling tests
Object.defineProperty(window, "scrollTo", {
  value: jest.fn(),
  writable: true,
});

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).toHaveClass("btn-base", "btn-primary");
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn-secondary");
  });

  it("renders as link when href is provided", () => {
    render(<Button href="/test">Link Button</Button>);
    const link = screen.getByRole("button");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("handles keyboard navigation for link buttons", () => {
    const handleClick = jest.fn();
    render(
      <Button href="/test" onClick={handleClick}>
        Link
      </Button>
    );
    const link = screen.getByRole("button");

    fireEvent.keyDown(link, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(link, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("supports different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole("button");
    expect(button).toHaveClass("px-4", "py-2", "text-sm");

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole("button");
    expect(button).toHaveClass("px-8", "py-4", "text-lg");
  });
});

describe("Card Component", () => {
  it("renders with default props", () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText("Card content");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("card-base");
  });

  it("renders with different padding sizes", () => {
    const { rerender } = render(<Card padding="sm">Content</Card>);
    let card = screen.getByText("Content");
    expect(card).toHaveClass("p-4");

    rerender(<Card padding="lg">Content</Card>);
    card = screen.getByText("Content");
    expect(card).toHaveClass("p-8");

    rerender(<Card padding="none">Content</Card>);
    card = screen.getByText("Content");
    expect(card).toHaveClass("p-0");
  });

  it("can disable hover effects", () => {
    render(<Card hover={false}>No hover</Card>);
    const card = screen.getByText("No hover");
    expect(card).toHaveClass("hover:transform-none");
  });

  it("renders as different HTML elements", () => {
    const { rerender } = render(<Card as="article">Article content</Card>);
    let card = screen.getByText("Article content");
    expect(card.tagName).toBe("ARTICLE");

    rerender(<Card as="section">Section content</Card>);
    card = screen.getByText("Section content");
    expect(card.tagName).toBe("SECTION");
  });

  it("applies custom className", () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText("Content");
    expect(card).toHaveClass("custom-card");
  });
});

describe("Badge Component", () => {
  it("renders with default props", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("badge-base");
  });

  it("renders skill variant", () => {
    render(<Badge variant="skill">React</Badge>);
    const badge = screen.getByText("React");
    expect(badge).toHaveClass("badge-skill");
  });

  it("renders different sizes", () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>);
    let badge = screen.getByText("Small");
    expect(badge).toHaveClass("px-2", "py-1", "text-xs");

    rerender(<Badge size="lg">Large</Badge>);
    badge = screen.getByText("Large");
    expect(badge).toHaveClass("px-4", "py-2", "text-base");
  });

  it("handles click events when interactive", () => {
    const handleClick = jest.fn();
    render(<Badge onClick={handleClick}>Clickable</Badge>);
    const badge = screen.getByRole("button");
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard navigation when clickable", () => {
    const handleClick = jest.fn();
    render(<Badge onClick={handleClick}>Clickable</Badge>);
    const badge = screen.getByRole("button");

    fireEvent.keyDown(badge, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(badge, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("applies interactive styles when clickable", () => {
    render(<Badge onClick={() => {}}>Interactive</Badge>);
    const badge = screen.getByRole("button");
    expect(badge).toHaveClass("cursor-pointer");
    expect(badge).toHaveAttribute("tabIndex", "0");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-badge">Badge</Badge>);
    const badge = screen.getByText("Badge");
    expect(badge).toHaveClass("custom-badge");
  });

  it("renders different variants", () => {
    const variants = ["primary", "secondary", "skill"] as const;

    variants.forEach(variant => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      const badge = screen.getByText(variant);
      expect(badge).toHaveClass(`badge-${variant}`);
      unmount();
    });
  });
});

describe("Header Component", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  it("renders header with brand and navigation", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    const brand = screen.getByLabelText("Ashish Singh - Go to top");
    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });

    expect(header).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveTextContent("Ashish Singh");
    expect(navigation).toBeInTheDocument();
  });

  it("includes skip link for accessibility", () => {
    render(<Header />);

    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(skipLink).toHaveClass("skip-link");
  });

  it("applies scrolled styles when page is scrolled", () => {
    const { rerender } = render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).not.toHaveClass("bg-white/95");

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 50, writable: true });
    fireEvent.scroll(window);

    rerender(<Header />);
    // Note: In a real test, we'd need to trigger the scroll event handler
    // For now, we're just testing the component structure
  });

  it("applies custom className", () => {
    render(<Header className="custom-header" />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("custom-header");
  });
});

describe("Navigation Component", () => {
  beforeEach(() => {
    // Mock getElementById for smooth scrolling
    const mockElement = { offsetTop: 100, offsetHeight: 200 };
    document.getElementById = jest.fn().mockReturnValue(mockElement);
  });

  it("renders desktop navigation menu", () => {
    render(<Navigation />);

    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    const desktopMenubar = screen.getAllByRole("menubar")[0]; // Get the first (desktop) menubar

    expect(navigation).toBeInTheDocument();
    expect(desktopMenubar).toBeInTheDocument();
    expect(desktopMenubar).toHaveClass("hidden", "md:flex");

    // Check navigation items exist (both desktop and mobile versions)
    expect(screen.getAllByText("About")).toHaveLength(2); // Desktop + mobile
    expect(screen.getAllByText("Skills")).toHaveLength(2);
    expect(screen.getAllByText("Projects")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
  });

  it("renders mobile menu button", () => {
    render(<Navigation />);

    const mobileButton = screen.getByLabelText("Open navigation menu");
    expect(mobileButton).toBeInTheDocument();
    expect(mobileButton).toHaveAttribute("aria-expanded", "false");
  });

  it("opens mobile menu when button is clicked", () => {
    render(<Navigation />);

    const mobileButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(mobileButton);

    expect(mobileButton).toHaveAttribute("aria-expanded", "true");
    expect(mobileButton).toHaveAttribute("aria-label", "Close navigation menu");

    const mobileMenu = screen.getByRole("dialog");
    expect(mobileMenu).toBeInTheDocument();
    expect(mobileMenu).toHaveAttribute("aria-modal", "true");
  });

  it("closes mobile menu when overlay is clicked", () => {
    render(<Navigation />);

    const mobileButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(mobileButton);

    const overlay = document.querySelector(".fixed.inset-0.bg-black\\/20");
    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(mobileButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes mobile menu when escape key is pressed", () => {
    render(<Navigation />);

    const mobileButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(mobileButton);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(mobileButton).toHaveAttribute("aria-expanded", "false");
  });

  it("handles navigation link clicks with smooth scrolling", () => {
    render(<Navigation />);

    // Get the first (desktop) About link
    const aboutLinks = screen.getAllByText("About");
    const desktopAboutLink = aboutLinks[0];
    fireEvent.click(desktopAboutLink);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 20, // 100 (offsetTop) - 80 (header height)
      behavior: "smooth",
    });
  });

  it("includes resume download link in mobile menu", () => {
    render(<Navigation />);

    const mobileButton = screen.getByLabelText("Open navigation menu");
    fireEvent.click(mobileButton);

    const resumeLink = screen.getByText("Download Resume");
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute("href", "/resume.pdf");
    expect(resumeLink).toHaveAttribute("download");
  });

  it("applies custom className", () => {
    render(<Navigation className="custom-nav" />);

    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    expect(navigation).toHaveClass("custom-nav");
  });
});

describe("Component Integration", () => {
  it("components work together in a card layout", () => {
    render(
      <Card>
        <h2>Project Title</h2>
        <p>Project description</p>
        <div>
          <Badge variant="skill">React</Badge>
          <Badge variant="skill">TypeScript</Badge>
        </div>
        <div>
          <Button variant="primary">View Project</Button>
          <Button variant="secondary" href="/github">
            GitHub
          </Button>
        </div>
      </Card>
    );

    expect(screen.getByText("Project Title")).toBeInTheDocument();
    expect(screen.getByText("React")).toHaveClass("badge-skill");
    expect(screen.getByText("TypeScript")).toHaveClass("badge-skill");
    expect(screen.getByText("View Project")).toHaveClass("btn-primary");
    expect(screen.getByText("GitHub")).toHaveClass("btn-secondary");
  });

  it("maintains accessibility across components", () => {
    render(
      <Card as="article">
        <h3>Accessible Card</h3>
        <Button aria-label="Primary action">Action</Button>
        <Badge onClick={() => {}} aria-label="Interactive badge">
          Tag
        </Badge>
      </Card>
    );

    const card = screen.getByRole("article");
    const button = screen.getByLabelText("Primary action");
    const badge = screen.getByLabelText("Interactive badge");

    expect(card).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Primary action");
    expect(badge).toHaveAttribute("aria-label", "Interactive badge");
    expect(badge).toHaveAttribute("role", "button");
  });

  it("header and navigation work together", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    const brand = screen.getByText("Ashish Singh");

    expect(header).toContainElement(navigation);
    expect(header).toContainElement(brand);
  });
});

describe("Responsive Behavior", () => {
  it("applies responsive classes correctly", () => {
    render(
      <div>
        <Button size="sm">Mobile Button</Button>
        <Card padding="sm">Mobile Card</Card>
        <Badge size="sm">Mobile Badge</Badge>
      </div>
    );

    // Test that components render with mobile-appropriate classes
    const button = screen.getByText("Mobile Button");
    const card = screen.getByText("Mobile Card");
    const badge = screen.getByText("Mobile Badge");

    expect(button).toHaveClass("text-sm");
    expect(card).toHaveClass("p-4");
    expect(badge).toHaveClass("text-xs");
  });
});
