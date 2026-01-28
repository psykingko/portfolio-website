import React from "react";
import { cn } from "@/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  as?: "button" | "a";
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  disabled = false,
  className = "",
  type = "button",
  as,
  target,
  rel,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}) => {
  // Base classes from design system
  const baseClasses = "btn-base";

  // Variant classes
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost:
      "bg-transparent text-primary border-none shadow-none hover:bg-primary hover:bg-opacity-10",
  };

  // Size classes - using responsive touch targets on mobile
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Disabled state classes
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  );

  // Common props for both button and anchor
  const commonProps = {
    className: classes,
    "aria-label": ariaLabel,
    "aria-disabled": disabled,
    "aria-expanded": ariaExpanded,
    "aria-controls": ariaControls,
  };

  // Determine component type
  const shouldRenderAsAnchor = as === "a" || (href && !disabled);

  if (shouldRenderAsAnchor) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
