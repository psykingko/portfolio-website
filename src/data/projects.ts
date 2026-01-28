import { ProjectCardProps } from "@/components/ui/ProjectCard";

export const PROJECTS_DATA: ProjectCardProps[] = [
  {
    title: "Multi-Sentiment Analyzer",
    description:
      "An advanced sentiment analysis tool that processes text data using multiple NLP models to provide comprehensive emotional insights. Features real-time analysis, batch processing, and detailed sentiment breakdowns.",
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "NLP",
      "LSTM",
      "Sentiment Analysis",
      "Chart.js",
      "Tailwind CSS",
    ],
    thumbnail: "/projects/multi-sentiment-analyzer.jpg",
    links: {
      github: "https://github.com/singhashish9599/multi-sentiment-analyzer",
      demo: "https://multi-sentiment-analyzer-demo.vercel.app",
    },
  },
  {
    title: "Link Saver App",
    description:
      "A full-stack web application for organizing and managing bookmarks with advanced categorization, search functionality, and collaborative features. Built with modern web technologies for optimal performance.",
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Authentication",
      "Tailwind CSS",
      "Axios",
    ],
    thumbnail: "/projects/link-saver-app.jpg",
    links: {
      github: "https://github.com/singhashish9599/link-saver-app",
      demo: "https://link-saver-app-demo.vercel.app",
    },
  },
  {
    title: "Trading Analytics Platform",
    description:
      "A sophisticated financial analytics platform for tracking and analyzing trading performance with real-time data visualization, risk assessment, and portfolio optimization tools.",
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Chart.js",
      "WebSocket",
      "Docker",
    ],
    thumbnail: "/projects/trading-analytics-platform.jpg",
    links: {
      github: "https://github.com/singhashish9599/trading-analytics-platform",
      demo: "https://trading-analytics-demo.vercel.app",
    },
  },
  {
    title: "ChatterUp - Real-time Chat App",
    description:
      "A modern real-time chat application with WebSocket integration, user authentication, and responsive design. Features include message history, online status indicators, and emoji support.",
    techStack: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Express.js",
      "JWT Authentication",
      "Tailwind CSS",
    ],
    thumbnail:
      "https://via.placeholder.com/400x300/5634d6/ffffff?text=ChatterUp+Chat+App",
    links: {
      github: "https://github.com/singhashish9599/chatterUp",
      demo: "https://chatterup-demo.vercel.app",
    },
  },
  {
    title: "Employee Management System",
    description:
      "A comprehensive employee management system with role-based access control, attendance tracking, and performance analytics. Built for modern HR departments with scalability in mind.",
    techStack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "JWT Authentication",
      "Chart.js",
      "Tailwind CSS",
    ],
    thumbnail:
      "https://via.placeholder.com/400x300/ff6b35/ffffff?text=Employee+Management+System",
    links: {
      github: "https://github.com/singhashish9599/employee-mgmt-system",
    },
  },
  {
    title: "Personal Blog Platform",
    description:
      "A modern blog platform with content management system, SEO optimization, and responsive design. Features include markdown support, comment system, and social media integration.",
    techStack: [
      "Next.js",
      "React",
      "MongoDB",
      "Tailwind CSS",
      "Markdown",
      "SEO Optimization",
    ],
    thumbnail:
      "https://via.placeholder.com/400x300/4ecdc4/ffffff?text=Blog+Platform",
    links: {
      github: "https://github.com/singhashish9599/prernaBlog",
      demo: "https://prerna-blog-demo.vercel.app",
    },
  },
];

// Helper function to get projects by category or filter
export const getProjectsByTech = (tech: string): ProjectCardProps[] => {
  return PROJECTS_DATA.filter(project =>
    project.techStack.some(stack =>
      stack.toLowerCase().includes(tech.toLowerCase())
    )
  );
};

export const getFeaturedProjects = (): ProjectCardProps[] => {
  // Return first 3 projects as featured
  return PROJECTS_DATA.slice(0, 3);
};

export const getAllProjects = (): ProjectCardProps[] => {
  return PROJECTS_DATA;
};
