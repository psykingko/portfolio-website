require("@testing-library/jest-dom");

// Mock CSS custom properties for testing
Object.defineProperty(document.documentElement, "style", {
  value: {
    getPropertyValue: jest.fn(property => {
      const mockValues = {
        "--color-primary": "#5634d6",
        "--color-bg-peach": "#f9ede3",
        "--font-size-heading-xl": "clamp(3rem, 8vw, 5rem)",
        "--font-size-heading-lg": "clamp(2rem, 5vw, 3rem)",
        "--font-size-heading-md": "clamp(1.5rem, 4vw, 2rem)",
        "--font-size-heading-sm": "clamp(1.25rem, 3vw, 1.5rem)",
        "--font-size-body-xl": "clamp(1.125rem, 3vw, 1.25rem)",
        "--font-size-body-lg": "clamp(1rem, 2.5vw, 1.125rem)",
        "--font-size-body-md": "clamp(0.875rem, 2.5vw, 1rem)",
        "--font-size-body-sm": "clamp(0.75rem, 2vw, 0.875rem)",
        "--font-size-body-xs": "clamp(0.625rem, 1.5vw, 0.75rem)",
        "--shadow-card": "0 8px 32px rgba(0, 0, 0, 0.08)",
        "--shadow-soft": "0 4px 20px rgba(86, 52, 214, 0.1)",
        "--spacing-section": "clamp(4rem, 8vw, 8rem)",
        "--radius-card": "1.5rem",
        "--line-height-tight": "1.25",
        "--line-height-snug": "1.375",
        "--line-height-normal": "1.5",
        "--line-height-relaxed": "1.625",
        "--line-height-loose": "2",
        "--font-display":
          "Poppins, Inter, system-ui, -apple-system, sans-serif",
        "--font-sans": "Inter, system-ui, -apple-system, sans-serif",
      };
      return mockValues[property] || "";
    }),
    setProperty: jest.fn(),
  },
});

// Mock getComputedStyle for CSS custom properties
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = jest.fn(element => {
  const style = originalGetComputedStyle(element);
  return {
    ...style,
    getPropertyValue: jest.fn(property => {
      const mockValues = {
        "--color-primary": "#5634d6",
        "--color-bg-peach": "#f9ede3",
        "--font-size-heading-xl": "clamp(3rem, 8vw, 5rem)",
        "--font-size-heading-lg": "clamp(2rem, 5vw, 3rem)",
        "--font-size-heading-md": "clamp(1.5rem, 4vw, 2rem)",
        "--font-size-heading-sm": "clamp(1.25rem, 3vw, 1.5rem)",
        "--font-size-body-xl": "clamp(1.125rem, 3vw, 1.25rem)",
        "--font-size-body-lg": "clamp(1rem, 2.5vw, 1.125rem)",
        "--font-size-body-md": "clamp(0.875rem, 2.5vw, 1rem)",
        "--font-size-body-sm": "clamp(0.75rem, 2vw, 0.875rem)",
        "--font-size-body-xs": "clamp(0.625rem, 1.5vw, 0.75rem)",
        "--shadow-card": "0 8px 32px rgba(0, 0, 0, 0.08)",
        "--shadow-soft": "0 4px 20px rgba(86, 52, 214, 0.1)",
        "--spacing-section": "clamp(4rem, 8vw, 8rem)",
        "--radius-card": "1.5rem",
      };
      return mockValues[property] || "";
    }),
  };
});

// Mock performance.now for performance tests
global.performance = global.performance || {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
};

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
