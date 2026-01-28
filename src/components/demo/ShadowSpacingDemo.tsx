import React from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

/**
 * Demo component showcasing the shadow and spacing utilities
 * This component demonstrates the comprehensive shadow and spacing system
 */
const ShadowSpacingDemo: React.FC = () => {
  return (
    <div className="p-responsive-xl space-y-responsive-lg">
      <div className="text-center space-y-responsive-md">
        <h1 className="heading-xl">Shadow & Spacing Utilities Demo</h1>
        <p className="body-lg text-text-secondary">
          Comprehensive shadow and spacing system for consistent visual
          hierarchy
        </p>
      </div>

      {/* Shadow Demonstrations */}
      <section className="space-y-responsive-md">
        <h2 className="heading-lg">Shadow System</h2>

        <div className="responsive-grid responsive-grid-3-lg gap-responsive-md">
          <Card className="shadow-subtle">
            <h3 className="heading-sm">Subtle Shadow</h3>
            <p className="body-md">Minimal elevation for subtle depth</p>
          </Card>

          <Card className="shadow-card">
            <h3 className="heading-sm">Card Shadow</h3>
            <p className="body-md">Standard shadow for most components</p>
          </Card>

          <Card className="shadow-strong">
            <h3 className="heading-sm">Strong Shadow</h3>
            <p className="body-md">Enhanced depth for elevated elements</p>
          </Card>
        </div>

        <div className="responsive-grid responsive-grid-3-lg gap-responsive-md">
          <Card className="shadow-primary">
            <h3 className="heading-sm">Primary Shadow</h3>
            <p className="body-md">Themed shadow with primary color</p>
          </Card>

          <Card className="shadow-accent-orange">
            <h3 className="heading-sm">Orange Shadow</h3>
            <p className="body-md">Accent shadow with orange tint</p>
          </Card>

          <Card className="shadow-glow-primary">
            <h3 className="heading-sm">Glow Effect</h3>
            <p className="body-md">Glowing shadow for special elements</p>
          </Card>
        </div>
      </section>

      {/* Interactive Shadows */}
      <section className="space-y-responsive-md">
        <h2 className="heading-lg">Interactive Shadows</h2>

        <div className="responsive-flex responsive-flex-row-md gap-responsive-md">
          <Button variant="primary" className="shadow-interactive">
            Interactive Button
          </Button>

          <Card className="shadow-interactive cursor-pointer">
            <h3 className="heading-sm">Interactive Card</h3>
            <p className="body-md">Hover to see shadow transition</p>
          </Card>
        </div>
      </section>

      {/* Spacing Demonstrations */}
      <section className="space-y-responsive-md">
        <h2 className="heading-lg">Spacing System</h2>

        <div className="space-y-responsive-sm">
          <h3 className="heading-md">Responsive Padding</h3>
          <div className="responsive-grid responsive-grid-3-lg gap-responsive-sm">
            <div className="bg-bg-card border border-primary/20 p-responsive-xs">
              <span className="body-sm">XS Padding</span>
            </div>
            <div className="bg-bg-card border border-primary/20 p-responsive-md">
              <span className="body-sm">MD Padding</span>
            </div>
            <div className="bg-bg-card border border-primary/20 p-responsive-xl">
              <span className="body-sm">XL Padding</span>
            </div>
          </div>
        </div>

        <div className="space-y-responsive-sm">
          <h3 className="heading-md">Component-Specific Spacing</h3>
          <div className="responsive-flex responsive-flex-row-md gap-responsive-md">
            <div className="card-base card-padding">
              <span className="body-sm">Card Padding</span>
            </div>
            <button className="btn-base btn-primary button-padding">
              Button Padding
            </button>
            <div className="bg-bg-card border border-primary/20 section-spacing">
              <span className="body-sm">Section Spacing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Badge Demonstrations */}
      <section className="space-y-responsive-md">
        <h2 className="heading-lg">Enhanced Badges</h2>

        <div className="responsive-flex responsive-flex-row-md gap-responsive-sm">
          <Badge variant="skill" className="shadow-soft">
            React
          </Badge>
          <Badge variant="primary" className="shadow-primary">
            TypeScript
          </Badge>
          <Badge className="badge-accent-orange shadow-accent-orange">
            Next.js
          </Badge>
          <Badge className="badge-accent-blue shadow-accent-blue">
            Tailwind
          </Badge>
        </div>
      </section>

      {/* Layout Examples */}
      <section className="space-y-responsive-md">
        <h2 className="heading-lg">Layout Examples</h2>

        <Card className="shadow-card p-responsive-lg">
          <div className="space-y-responsive-md">
            <h3 className="heading-md">Project Card Example</h3>
            <p className="body-md">
              This card demonstrates how the spacing and shadow utilities work
              together to create consistent, responsive layouts.
            </p>

            <div className="space-y-responsive-sm">
              <div className="responsive-flex responsive-flex-row-md gap-responsive-sm">
                <Badge variant="skill" className="shadow-subtle">
                  JavaScript
                </Badge>
                <Badge variant="skill" className="shadow-subtle">
                  React
                </Badge>
                <Badge variant="skill" className="shadow-subtle">
                  CSS
                </Badge>
              </div>

              <div className="responsive-flex responsive-flex-row-md gap-responsive-sm">
                <Button variant="primary" className="shadow-primary">
                  View Project
                </Button>
                <Button variant="secondary" className="shadow-subtle">
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Performance Notes */}
      <section className="space-y-responsive-md">
        <h2 className="heading-lg">Performance Features</h2>

        <Card className="shadow-card p-responsive-md">
          <div className="space-y-responsive-sm">
            <h3 className="heading-sm">Mobile Optimizations</h3>
            <ul className="body-md space-y-responsive-xs">
              <li>• Simplified shadows on mobile for better performance</li>
              <li>• Responsive spacing using clamp() functions</li>
              <li>• Hardware-accelerated shadow properties</li>
              <li>• Reduced motion support for accessibility</li>
            </ul>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ShadowSpacingDemo;
