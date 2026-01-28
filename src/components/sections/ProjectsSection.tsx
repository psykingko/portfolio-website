"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectCard, { ProjectCardProps } from "@/components/ui/ProjectCard";
import { getAllProjects } from "@/data/projects";
import { cn } from "@/utils";
import ScrollReveal from "../animations/ScrollReveal";
import { HoverLift, HoverScale } from "../animations/MicroInteractions";
import SectionDivider from "../animations/SectionDivider";
import OrganicBlob from "../animations/OrganicBlob";
import SketchUnderline from "../animations/SketchUnderline";

interface ProjectsSectionProps {
  projects?: ProjectCardProps[];
  className?: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = getAllProjects(),
  className = "",
}) => {
  return (
    <section
      id="projects"
      className={cn(
        "projects-section section-padding bg-gradient-to-br from-bg-playful-white to-accent-lavender/20 relative overflow-hidden",
        className
      )}
      aria-labelledby="projects-heading"
    >
      {/* Organic Blobs */}
      <OrganicBlob
        color="#5634d6"
        opacity={0.08}
        size="xl"
        position={{ top: "5%", left: "-10%" }}
        blur={true}
      />
      <OrganicBlob
        color="#FF6B35"
        opacity={0.06}
        size="lg"
        position={{ bottom: "15%", right: "-8%" }}
        blur={true}
      />

      <div className="container-xl relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="down" delay={0.05}>
          <div className="text-center mb-20">
            <h2
              id="projects-heading"
              className="heading-lg text-text-primary mb-6"
            >
              Featured Projects
            </h2>
            <SketchUnderline color="#FF6B35" width="160px" className="mb-8" />
            <p className="text-lead text-text-secondary max-w-2xl mx-auto">
              A showcase of my recent work in full-stack development, AI/ML, and
              web applications. Each project demonstrates different aspects of
              my technical expertise and problem-solving approach.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="projects-grid">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-8 md:gap-10 lg:gap-10">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.title}
                direction="up"
                delay={0.2 + index * 0.1}
              >
                <HoverLift intensity="medium" className="flex h-full">
                  <ProjectCard {...project} className="w-full" />
                </HoverLift>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* View More Projects Link */}
        {projects.length >= 3 && (
          <ScrollReveal direction="fade" delay={0.2}>
            <div className="text-center mt-16">
              <HoverScale intensity="subtle">
                <a
                  href="https://github.com/singhashish9599"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200 body-lg font-medium group"
                  aria-label="View more projects on GitHub"
                >
                  View More Projects on GitHub
                  <motion.svg
                    className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </motion.svg>
                </a>
              </HoverScale>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Section Divider */}
      <SectionDivider variant="geometric" color="#5634d6" />
    </section>
  );
};

export default ProjectsSection;
