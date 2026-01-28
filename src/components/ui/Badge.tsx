import React from "react";
import { cn } from "@/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "skill" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  "aria-label"?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
  interactive = false,
  "aria-label": ariaLabel,
}) => {
  // Base classes from design system
  const baseClasses = "badge-base";

  // Variant classes - using CSS classes that match the design system
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    skill: "badge-skill", // Uses the design system skill badge styles
    primary: "badge-primary", // Use the CSS class from components.css
    secondary: "badge-secondary", // Use the CSS class from components.css
  };

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm", // Default from design system
    lg: "px-4 py-2 text-base",
  };

  // Interactive classes for clickable badges
  const interactiveClasses =
    interactive || onClick
      ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      : "";

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    interactiveClasses,
    className
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <span
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
};

export default Badge;
