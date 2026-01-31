"use client";

import React from "react";
import ScrollReveal from "../animations/ScrollReveal";
import SketchUnderline from "../animations/SketchUnderline";

interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle?: string;
  underlineColor?: string;
  underlineWidth?: string;
  className?: string;
}

/**
 * SectionHeader Component
 *
 * A reusable section header component that provides consistent styling
 * across all portfolio sections. Includes animated title, sketch underline,
 * and optional subtitle.
 *
 * @param id - The HTML id for the heading element (for accessibility and navigation)
 * @param title - The main heading text
 * @param subtitle - Optional subtitle text displayed below the underline
 * @param underlineColor - Color of the sketch underline (default: #1b2651)
 * @param underlineWidth - Width of the sketch underline (default: 120px)
 * @param className - Additional CSS classes to apply to the container
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  title,
  subtitle,
  underlineColor = "#1b2651",
  underlineWidth = "120px",
  className = "",
}) => {
  return (
    <ScrollReveal direction="down" delay={0.05}>
      <div className={`text-center mb-16 ${className}`}>
        <h2 id={id} className="heading-lg text-primary mb-6">
          {title}
        </h2>
        <SketchUnderline
          color={underlineColor}
          width={underlineWidth}
          className="mb-6"
        />
        {subtitle && (
          <p className="text-lead text-text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
};

export default SectionHeader;
