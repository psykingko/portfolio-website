// Component type definitions for the design system

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export interface CardProps extends BaseComponentProps {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "default" | "flat" | "elevated" | "gradient";
  as?: "div" | "article" | "section";
}

export interface BadgeProps extends BaseComponentProps {
  variant?:
    | "default"
    | "skill"
    | "primary"
    | "secondary"
    | "accent-orange"
    | "accent-blue";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  interactive?: boolean;
  icon?: React.ReactNode;
}

// Skill-specific badge props for the skills section
export interface SkillBadgeProps extends Omit<BadgeProps, "variant"> {
  skill: string;
  category?: "languages" | "frameworks" | "tools" | "libraries";
  proficiency?: number;
  icon?: React.ReactNode;
}

// Project card specific props
export interface ProjectCardProps extends CardProps {
  title: string;
  description: string;
  techStack: string[];
  thumbnail?: string;
  links: {
    github?: string;
    demo?: string;
  };
  caseStudy?: {
    problem: string;
    approach: string;
    outcome: string;
  };
}

// Animation-related types
export interface AnimationProps {
  animate?: boolean;
  delay?: number;
  duration?: number;
  easing?: string;
}

// Responsive behavior types
export interface ResponsiveProps {
  responsive?: boolean;
  breakpoints?: {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
  };
}

// Accessibility props
export interface AccessibilityProps {
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  role?: string;
  tabIndex?: number;
}

// Combined props for complex components
export interface InteractiveComponentProps
  extends
    BaseComponentProps,
    AnimationProps,
    ResponsiveProps,
    AccessibilityProps {}
