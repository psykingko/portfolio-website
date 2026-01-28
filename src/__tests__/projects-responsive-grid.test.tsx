import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { PROJECTS_DATA } from "@/data/projects";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

describe("ProjectsSection Responsive Grid", () => {
  it("renders projects section with correct structure", () => {
    render(<ProjectsSection />);

    // Check if the section exists
    const projectsSection = screen.getByRole("region", {
      name: /featured projects/i,
    });
    expect(projectsSection).toBeInTheDocument();

    // Check if the heading exists
    const heading = screen.getByRole("heading", { name: /featured projects/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders all projects from data", () => {
    render(<ProjectsSection />);

    // Check if all projects are rendered
    PROJECTS_DATA.forEach(project => {
      const projectTitle = screen.getByText(project.title);
      expect(projectTitle).toBeInTheDocument();
    });
  });

  it("has responsive grid classes", () => {
    const { container } = render(<ProjectsSection />);

    // Check if the grid container has responsive classes
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1");
    expect(gridContainer).toHaveClass("md:grid-cols-2");
    expect(gridContainer).toHaveClass("lg:grid-cols-3");
  });

  it("renders GitHub link when provided", () => {
    render(<ProjectsSection />);

    // Find projects with GitHub links
    const projectsWithGithub = PROJECTS_DATA.filter(
      project => project.links.github
    );

    // Check if GitHub links are rendered (they appear in the overlay and buttons)
    projectsWithGithub.forEach(project => {
      const githubLinks = screen.getAllByLabelText(
        new RegExp(`view ${project.title} source code`, "i")
      );
      expect(githubLinks.length).toBeGreaterThan(0);
    });
  });

  it("renders demo link when provided", () => {
    render(<ProjectsSection />);

    // Find projects with demo links
    const projectsWithDemo = PROJECTS_DATA.filter(
      project => project.links.demo
    );

    // Check if demo links are rendered
    projectsWithDemo.forEach(project => {
      const demoLinks = screen.getAllByLabelText(
        new RegExp(`view ${project.title} live demo`, "i")
      );
      expect(demoLinks.length).toBeGreaterThan(0);
    });
  });

  it("renders tech stack badges", () => {
    render(<ProjectsSection />);

    // Check if tech stack items are rendered
    PROJECTS_DATA.forEach(project => {
      project.techStack.forEach(tech => {
        const techBadge = screen.getByText(tech);
        expect(techBadge).toBeInTheDocument();
      });
    });
  });

  it("has proper accessibility attributes", () => {
    render(<ProjectsSection />);

    // Check if section has proper ARIA label
    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "projects-heading");

    // Check if projects are rendered as articles
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(PROJECTS_DATA.length);
  });
});
