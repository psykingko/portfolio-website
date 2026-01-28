/**
 * Responsive Demo Component
 *
 * This component demonstrates the responsive breakpoint system in action.
 * It shows how different utilities work across various screen sizes.
 */

"use client";

import React from "react";
import {
  useBreakpoint,
  useDeviceType,
  useResponsiveValue,
} from "../../hooks/useResponsive";

const ResponsiveDemo: React.FC = () => {
  const breakpoint = useBreakpoint();
  const { deviceType, isMobile, isTablet, isDesktop } = useDeviceType();

  const gridColumns = useResponsiveValue({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 6,
  });

  const containerPadding = useResponsiveValue({
    xs: "1rem",
    sm: "1.5rem",
    md: "2rem",
    lg: "2.5rem",
    xl: "3rem",
    "2xl": "3rem",
  });

  const headingSize = useResponsiveValue({
    xs: "text-2xl",
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl",
    "2xl": "text-7xl",
  });

  return (
    <div className="min-h-screen bg-bg-peach p-4">
      {/* Header */}
      <div className="responsive-container mb-8">
        <h1
          className={`${headingSize} font-display font-bold text-primary mb-4`}
        >
          Responsive Breakpoint Demo
        </h1>
        <p className="text-lg text-text-secondary">
          This demo shows how the responsive breakpoint system adapts to
          different screen sizes.
        </p>
      </div>

      {/* Current Breakpoint Info */}
      <div className="responsive-container mb-8">
        <div className="card-base">
          <h2 className="heading-md mb-4">Current Viewport Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold text-primary">Breakpoint</h3>
              <p className="text-2xl font-bold">{breakpoint}</p>
            </div>
            <div className="p-4 bg-accent-orange/10 rounded-lg">
              <h3 className="font-semibold text-accent-orange">Device Type</h3>
              <p className="text-2xl font-bold">{deviceType}</p>
            </div>
            <div className="p-4 bg-accent-blue/10 rounded-lg">
              <h3 className="font-semibold text-accent-blue">Grid Columns</h3>
              <p className="text-2xl font-bold">{gridColumns}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Device Type Indicators */}
      <div className="responsive-container mb-8">
        <div className="card-base">
          <h2 className="heading-md mb-4">Device Detection</h2>
          <div className="flex flex-wrap gap-4">
            <div
              className={`px-4 py-2 rounded-full ${isMobile ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              Mobile: {isMobile ? "Yes" : "No"}
            </div>
            <div
              className={`px-4 py-2 rounded-full ${isTablet ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              Tablet: {isTablet ? "Yes" : "No"}
            </div>
            <div
              className={`px-4 py-2 rounded-full ${isDesktop ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              Desktop: {isDesktop ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Grid Demo */}
      <div className="responsive-container mb-8">
        <div className="card-base">
          <h2 className="heading-md mb-4">Responsive Grid System</h2>
          <div className="responsive-grid responsive-grid-2-sm responsive-grid-3-md responsive-grid-4-lg responsive-grid-5-xl responsive-grid-6-2xl">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center text-white font-bold text-xl"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Typography */}
      <div className="responsive-container mb-8">
        <div className="card-base">
          <h2 className="heading-md mb-4">Responsive Typography</h2>
          <div className="space-y-4">
            <h1 className="heading-xl">Extra Large Heading</h1>
            <h2 className="heading-lg">Large Heading</h2>
            <h3 className="heading-md">Medium Heading</h3>
            <h4 className="heading-sm">Small Heading</h4>
            <p className="body-lg">
              Large body text that scales responsively across different screen
              sizes.
            </p>
            <p className="body-md">
              Medium body text with optimal line height for readability.
            </p>
            <p className="body-sm">
              Small body text for secondary information and captions.
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Layout Demo */}
      <div className="responsive-container mb-8">
        <div className="card-base">
          <h2 className="heading-md mb-4">Responsive Layout</h2>
          <div className="hero-responsive">
            <div className="hero-content">
              <h3 className="heading-lg mb-4">Hero Content</h3>
              <p className="body-lg mb-6">
                This layout switches from vertical stacking on mobile to
                horizontal layout on desktop. The content and visual sections
                adapt their proportions based on screen size.
              </p>
              <div className="button-group-responsive">
                <button className="btn-base btn-primary">Primary Action</button>
                <button className="btn-base btn-secondary">
                  Secondary Action
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="aspect-square bg-gradient-to-br from-accent-pink to-accent-orange rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <p className="font-semibold">Visual Element</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Cards */}
      <div className="responsive-container mb-8">
        <div className="card-base">
          <h2 className="heading-md mb-4">Responsive Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div
                key={item}
                className="card-responsive bg-white rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300"
              >
                <div className="card-media mb-4">
                  <div className="aspect-responsive-card bg-gradient-to-br from-primary to-accent-blue rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                    {item}
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="heading-sm mb-2">Card Title {item}</h3>
                  <p className="body-sm text-text-secondary">
                    This card demonstrates responsive behavior with adaptive
                    layouts and spacing.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Utilities Demo */}
      <div className="responsive-container mb-8">
        <div className="card-base">
          <h2 className="heading-md mb-4">Responsive Utilities</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Visibility Classes</h3>
              <div className="flex flex-wrap gap-2">
                <span className="show-mobile-only px-3 py-1 bg-green-500 text-white rounded">
                  Mobile Only
                </span>
                <span className="hide-mobile px-3 py-1 bg-blue-500 text-white rounded">
                  Hidden on Mobile
                </span>
                <span className="show-tablet-up px-3 py-1 bg-purple-500 text-white rounded">
                  Tablet & Up
                </span>
                <span className="show-desktop-up px-3 py-1 bg-orange-500 text-white rounded">
                  Desktop & Up
                </span>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">Responsive Spacing</h3>
              <div
                className="bg-primary/20 rounded-lg flex items-center justify-center text-primary font-semibold"
                style={{ padding: containerPadding }}
              >
                Padding adapts to screen size: {containerPadding}
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold mb-2">Touch Targets</h3>
              <div className="flex flex-wrap gap-4">
                <button className="touch-target bg-primary text-white rounded-lg">
                  Touch Target
                </button>
                <button className="touch-target-large bg-accent-orange text-white rounded-lg">
                  Large Touch Target
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakpoint Reference */}
      <div className="responsive-container">
        <div className="card-base">
          <h2 className="heading-md mb-4">Breakpoint Reference</h2>
          <div className="overflow-responsive">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 font-semibold">Breakpoint</th>
                  <th className="py-2 font-semibold">Min Width</th>
                  <th className="py-2 font-semibold">Device Type</th>
                  <th className="py-2 font-semibold">Container Max Width</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono">xs</td>
                  <td className="py-2">0px</td>
                  <td className="py-2">Mobile Portrait</td>
                  <td className="py-2">100%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono">sm</td>
                  <td className="py-2">640px</td>
                  <td className="py-2">Mobile Landscape</td>
                  <td className="py-2">640px</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono">md</td>
                  <td className="py-2">768px</td>
                  <td className="py-2">Tablet Portrait</td>
                  <td className="py-2">768px</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono">lg</td>
                  <td className="py-2">1024px</td>
                  <td className="py-2">Tablet Landscape</td>
                  <td className="py-2">1024px</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono">xl</td>
                  <td className="py-2">1280px</td>
                  <td className="py-2">Desktop</td>
                  <td className="py-2">1280px</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono">2xl</td>
                  <td className="py-2">1536px</td>
                  <td className="py-2">Large Desktop</td>
                  <td className="py-2">1536px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDemo;
