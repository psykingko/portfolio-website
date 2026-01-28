import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectCard from "@/components/ui/ProjectCard";

const mockProject = {
  title: "Test Project",
  description: "This is a test project description",
  techStack: ["React", "TypeScript", "Tailwind CSS"],
  thumbnail: "/test-image.jpg",
  links: {
    github: "https://github.com/test/project",
    demo: "https://test-project.com",
  },
  caseStudy: {
    problem: "Test problem description",
    approach: "Test approach description",
    outcome: "Test outcome description",
  },
};

describe("ProjectCard", () => {
  it("renders project information correctly", () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test project description")
    ).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
  });

  it("shows case study when expanded", () => {
    render(<ProjectCard {...mockProject} />);

    // Initially case study should not be visible
    expect(
      screen.queryByText("Test problem description")
    ).not.toBeInTheDocument();

    // Click to expand case study
    const expandButton = screen.getByText("View Case Study");
    fireEvent.click(expandButton);

    // Case study should now be visible
    expect(screen.getByText("Test problem description")).toBeInTheDocument();
    expect(screen.getByText("Test approach description")).toBeInTheDocument();
    expect(screen.getByText("Test outcome description")).toBeInTheDocument();
  });

  it("renders demo and github links", () => {
    render(<ProjectCard {...mockProject} />);

    const demoLinks = screen.getAllByText("Live Demo");
    const githubLinks = screen.getAllByText("GitHub");

    expect(demoLinks.length).toBeGreaterThan(0);
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it("handles missing links gracefully", () => {
    const projectWithoutLinks = {
      ...mockProject,
      links: {},
    };

    render(<ProjectCard {...projectWithoutLinks} />);

    expect(screen.queryByText("Live Demo")).not.toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
  });
});
