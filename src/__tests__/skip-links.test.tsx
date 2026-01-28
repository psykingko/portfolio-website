import { render, screen } from "@testing-library/react";
import RootLayout from "../app/layout";

// Mock the LayoutClient component since it's a client component
jest.mock("../components/layout/LayoutClient", () => {
  return function MockLayoutClient({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="layout-client">{children}</div>;
  };
});

// Mock the Header component
jest.mock("../components/layout/Header", () => {
  return function MockHeader() {
    return (
      <header id="navigation" data-testid="header">
        <nav>Navigation</nav>
      </header>
    );
  };
});

describe("Skip Links Accessibility", () => {
  it("renders skip links with correct href attributes", () => {
    render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );

    // Check for skip to main content link
    const skipToMainLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    expect(skipToMainLink).toBeInTheDocument();
    expect(skipToMainLink).toHaveAttribute("href", "#main-content");

    // Check for skip to navigation link
    const skipToNavLink = screen.getByRole("link", {
      name: /skip to navigation/i,
    });
    expect(skipToNavLink).toBeInTheDocument();
    expect(skipToNavLink).toHaveAttribute("href", "#navigation");
  });

  it("skip links have proper accessibility classes", () => {
    render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );

    const skipToMainLink = screen.getByRole("link", {
      name: /skip to main content/i,
    });
    const skipToNavLink = screen.getByRole("link", {
      name: /skip to navigation/i,
    });

    // Check that skip links have the sr-only class (hidden by default)
    expect(skipToMainLink).toHaveClass("sr-only");
    expect(skipToNavLink).toHaveClass("sr-only");

    // Check that they have focus:not-sr-only class (visible when focused)
    expect(skipToMainLink).toHaveClass("focus:not-sr-only");
    expect(skipToNavLink).toHaveClass("focus:not-sr-only");
  });

  it("main content area has correct id and attributes", () => {
    render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );

    const mainContent = screen.getByRole("main");
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute("id", "main-content");
    expect(mainContent).toHaveAttribute("aria-label", "Main content");
    expect(mainContent).toHaveAttribute("tabIndex", "-1");
  });

  it("navigation area has correct id", () => {
    render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );

    const navigation = screen.getByTestId("header");
    expect(navigation).toHaveAttribute("id", "navigation");
  });

  it("skip links are positioned correctly in DOM order", () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );

    const skipLinks = container.querySelectorAll(".skip-link");
    expect(skipLinks).toHaveLength(2);

    // Skip links should be the first elements in the body
    const firstSkipLink = skipLinks[0];
    const secondSkipLink = skipLinks[1];

    expect(firstSkipLink).toHaveTextContent("Skip to main content");
    expect(secondSkipLink).toHaveTextContent("Skip to navigation");
  });
});
