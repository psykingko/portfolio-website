import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutSection from "../components/sections/AboutSection";

// Mock the constants to avoid import issues
jest.mock("../utils/constants", () => ({
  CONTACT_INFO: {
    email: "singhashish9599@gmail.com",
    phone: "+91 9599717790",
    linkedin: "https://linkedin.com/in/ashish-singh",
    github: "https://github.com/ashish-singh",
  },
  SITE_CONFIG: {
    name: "Ashish Singh",
    title: "Full Stack & AI Developer",
  },
}));

describe("AboutSection", () => {
  it("renders the about section with correct heading", () => {
    render(<AboutSection />);

    const heading = screen.getByRole("heading", { name: /about me/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute("id", "about-heading");
  });

  it("displays professional summary content", () => {
    render(<AboutSection />);

    expect(screen.getByText(/Full Stack & AI Developer/)).toBeInTheDocument();
    expect(screen.getByText(/React, Node.js, FastAPI/)).toBeInTheDocument();
    expect(
      screen.getByText(/Master of Computer Applications/)
    ).toBeInTheDocument();
  });

  it("displays contact information", () => {
    render(<AboutSection />);

    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    expect(screen.getByText("singhashish9599@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("+91 9599717790")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<AboutSection />);

    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "about-heading");
    expect(section).toHaveAttribute("id", "about");
  });

  it("includes social media links", () => {
    render(<AboutSection />);

    const linkedinLink = screen.getByLabelText("Visit LinkedIn profile");
    const githubLink = screen.getByLabelText("Visit GitHub profile");

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/ashish-singh"
    );
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/ashish-singh"
    );
  });

  it("has proper email and phone links", () => {
    render(<AboutSection />);

    const emailLink = screen.getByLabelText(
      "Send email to singhashish9599@gmail.com"
    );
    const phoneLink = screen.getByLabelText("Call +91 9599717790");

    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:singhashish9599@gmail.com"
    );
    expect(phoneLink).toHaveAttribute("href", "tel:+91 9599717790");
  });
});
