import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Define responsive breakpoints
    screens: {
      sm: "640px", // Mobile landscape
      md: "768px", // Tablet portrait
      lg: "1024px", // Tablet landscape
      xl: "1280px", // Desktop
      "2xl": "1536px", // Large desktop
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        bg: {
          beige: "var(--color-bg-beige)",
          white: "var(--color-bg-white)",
          card: "var(--color-bg-card)",
          "playful-white": "#FCFCFF", // Warm white with personality
          "tech-white": "#F7F8FE", // Cool tech white
          "paper-white": "#FAFAF7", // Paper-like white
        },
        accent: {
          red: "var(--color-accent-red)",
          teal: "var(--color-accent-teal)",
          lavender: "#E8E4FF", // Light lavender for blobs
          beige: "#FFE5D9", // Light beige for blobs
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          light: "var(--color-text-light)",
          muted: "var(--color-text-muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      fontSize: {
        "heading-xl": "var(--font-size-heading-xl)",
        "heading-lg": "var(--font-size-heading-lg)",
        "heading-md": "var(--font-size-heading-md)",
        "heading-sm": "var(--font-size-heading-sm)",
      },
      spacing: {
        section: "var(--spacing-section)",
        "section-gap": "var(--spacing-section-gap)",
        // Responsive spacing utilities
        "responsive-xs": "clamp(0.5rem, 1vw, 0.75rem)",
        "responsive-sm": "clamp(0.75rem, 1.5vw, 1rem)",
        "responsive-md": "clamp(1rem, 2vw, 1.5rem)",
        "responsive-lg": "clamp(1.5rem, 3vw, 2rem)",
        "responsive-xl": "clamp(2rem, 4vw, 3rem)",
        "responsive-2xl": "clamp(3rem, 5vw, 4rem)",
        "responsive-3xl": "clamp(4rem, 6vw, 6rem)",
        // Component-specific spacing
        "card-padding": "clamp(1rem, 2vw, 1.5rem)",
        "card-gap": "clamp(0.75rem, 1.5vw, 1rem)",
        "button-padding-x": "clamp(1rem, 2vw, 1.5rem)",
        "button-padding-y": "clamp(0.5rem, 1vw, 0.75rem)",
        "section-padding": "clamp(4rem, 8vw, 8rem)",
        "section-margin": "clamp(2rem, 4vw, 4rem)",
        // Layout spacing
        "layout-gap": "clamp(1rem, 2vw, 2rem)",
        "content-gap": "clamp(0.75rem, 1.5vw, 1.25rem)",
        "element-gap": "clamp(0.5rem, 1vw, 1rem)",
      },
      borderRadius: {
        card: "var(--radius-card)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        hover: "var(--shadow-hover)",
        subtle: "var(--shadow-subtle)",
        medium: "var(--shadow-medium)",
        strong: "var(--shadow-strong)",
        intense: "var(--shadow-intense)",
        primary: "var(--shadow-primary)",
        "primary-hover": "var(--shadow-primary-hover)",
        "accent-red": "var(--shadow-accent-red)",
        "accent-teal": "var(--shadow-accent-teal)",
        "inset-soft": "var(--shadow-inset-soft)",
        "inset-medium": "var(--shadow-inset-medium)",
        "glow-primary": "var(--shadow-glow-primary)",
        "glow-accent-red": "var(--shadow-glow-accent-red)",
        "glow-accent-teal": "var(--shadow-glow-accent-teal)",
      },
      maxWidth: {
        "container-sm": "var(--container-sm)",
        "container-md": "var(--container-md)",
        "container-lg": "var(--container-lg)",
        "container-xl": "var(--container-xl)",
        "container-2xl": "var(--container-2xl)",
      },
      // Responsive container utilities
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "2rem",
          "2xl": "2rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      transitionDuration: {
        "75": "var(--duration-75)",
        "100": "var(--duration-100)",
        "150": "var(--duration-150)",
        "200": "var(--duration-200)",
        "300": "var(--duration-300)",
        "500": "var(--duration-500)",
        "700": "var(--duration-700)",
        "1000": "var(--duration-1000)",
      },
      transitionTimingFunction: {
        custom: "var(--ease-custom)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite -2s",
        "float-slow": "float 8s ease-in-out infinite -4s",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
