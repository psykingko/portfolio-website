import React from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const ComponentShowcase: React.FC = () => {
  return (
    <div className="container-lg section-padding">
      <h1 className="heading-xl text-center mb-12">Component Showcase</h1>

      {/* Button Showcase */}
      <Card className="mb-8">
        <h2 className="heading-md mb-6">Button Components</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="primary" disabled>
            Disabled Button
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button href="#" variant="primary">
            Link Button
          </Button>
          <Button href="#" variant="secondary">
            Secondary Link
          </Button>
        </div>
      </Card>

      {/* Card Showcase */}
      <Card className="mb-8">
        <h2 className="heading-md mb-6">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card padding="sm">
            <h3 className="heading-sm mb-2">Small Padding</h3>
            <p className="body-md text-text-secondary">
              This card has small padding for compact layouts.
            </p>
          </Card>

          <Card padding="md">
            <h3 className="heading-sm mb-2">Medium Padding</h3>
            <p className="body-md text-text-secondary">
              This is the default card with medium padding.
            </p>
          </Card>

          <Card padding="lg">
            <h3 className="heading-sm mb-2">Large Padding</h3>
            <p className="body-md text-text-secondary">
              This card has large padding for spacious layouts.
            </p>
          </Card>
        </div>
      </Card>

      {/* Badge Showcase */}
      <Card className="mb-8">
        <h2 className="heading-md mb-6">Badge Components</h2>

        <div className="mb-6">
          <h3 className="heading-sm mb-3">Skill Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="skill">React</Badge>
            <Badge variant="skill">TypeScript</Badge>
            <Badge variant="skill">Node.js</Badge>
            <Badge variant="skill">Python</Badge>
            <Badge variant="skill">FastAPI</Badge>
            <Badge variant="skill">Tailwind CSS</Badge>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="heading-sm mb-3">Badge Variants</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="skill">Skill</Badge>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="heading-sm mb-3">Badge Sizes</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="sm">
              Small
            </Badge>
            <Badge variant="primary" size="md">
              Medium
            </Badge>
            <Badge variant="primary" size="lg">
              Large
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="heading-sm mb-3">Interactive Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="skill"
              onClick={() => alert("React clicked!")}
              aria-label="React skill badge"
            >
              React
            </Badge>
            <Badge
              variant="skill"
              onClick={() => alert("TypeScript clicked!")}
              aria-label="TypeScript skill badge"
            >
              TypeScript
            </Badge>
            <Badge
              variant="skill"
              onClick={() => alert("Node.js clicked!")}
              aria-label="Node.js skill badge"
            >
              Node.js
            </Badge>
          </div>
        </div>
      </Card>

      {/* Project Card Example */}
      <Card className="mb-8">
        <h2 className="heading-md mb-6">Project Card Example</h2>
        <Card as="article" className="max-w-md">
          <h3 className="heading-sm mb-3">Multi-Sentiment Analyzer</h3>
          <p className="body-md text-text-secondary mb-4">
            A machine learning application that analyzes sentiment in text using
            NLP techniques and deep learning models.
          </p>

          <div className="mb-4">
            <h4 className="body-sm font-semibold mb-2">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="skill" size="sm">
                Python
              </Badge>
              <Badge variant="skill" size="sm">
                FastAPI
              </Badge>
              <Badge variant="skill" size="sm">
                LSTM
              </Badge>
              <Badge variant="skill" size="sm">
                NLP
              </Badge>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="primary" size="sm">
              View Demo
            </Button>
            <Button variant="secondary" size="sm" href="#">
              GitHub
            </Button>
          </div>
        </Card>
      </Card>

      {/* Responsive Behavior Demo */}
      <Card>
        <h2 className="heading-md mb-6">Responsive Behavior</h2>
        <p className="body-lg mb-4">
          All components are designed to be responsive and work well across
          different screen sizes:
        </p>

        <ul className="body-md text-text-secondary space-y-2 mb-6">
          <li>• Buttons maintain minimum 44px touch targets on mobile</li>
          <li>• Cards stack appropriately on smaller screens</li>
          <li>• Badges wrap naturally in flex containers</li>
          <li>• Typography scales fluidly with viewport size</li>
        </ul>

        <div className="button-group-responsive">
          <Button variant="primary">Responsive Button 1</Button>
          <Button variant="secondary">Responsive Button 2</Button>
        </div>
      </Card>
    </div>
  );
};

export default ComponentShowcase;
