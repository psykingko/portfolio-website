"use client";

import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ContactSection from "../components/sections/ContactSection";
import { SITE_CONFIG } from "../utils/constants";

export default function Home() {
  const handleViewWork = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main id="main-content" className="bg-bg-peach">
        <HeroSection
          name={SITE_CONFIG.tagline}
          title={SITE_CONFIG.title}
          subtitle={SITE_CONFIG.description}
          ctaButtons={{
            primary: {
              text: "View Work",
              action: handleViewWork,
            },
            secondary: {
              text: "Download Résumé (PDF)",
              href: SITE_CONFIG.resumeUrl,
            },
          }}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <ContactSection />
      </main>
    </>
  );
}
