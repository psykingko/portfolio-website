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
    caseStudy: {
      problem:
        "Traditional sentiment analysis tools often provide binary positive/negative results, lacking the nuance needed for complex emotional analysis. Businesses and researchers needed a more sophisticated tool that could identify multiple emotions and provide detailed insights from text data.",
      approach:
        "Developed a comprehensive sentiment analysis platform using multiple NLP models including LSTM networks and transformer-based models. Built a FastAPI backend for efficient processing and a React frontend for intuitive data visualization. Implemented real-time analysis capabilities and batch processing for large datasets.",
      outcome:
        "Successfully created a tool that can identify 8+ different emotions with 85%+ accuracy. The platform processes over 1000 text samples per minute and provides detailed analytics through interactive charts. Used by 50+ researchers and small businesses for social media monitoring and customer feedback analysis.",
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
    caseStudy: {
      problem:
        "Managing and organizing bookmarks across different browsers and devices is challenging. Users often lose important links or struggle to find them later. Existing bookmark managers lack advanced organization features and collaborative capabilities.",
      approach:
        "Built a full-stack application with React frontend and Node.js/Express backend. Implemented user authentication with JWT, created a flexible tagging system, and added search functionality with MongoDB text indexing. Designed an intuitive UI with drag-and-drop organization and sharing capabilities.",
      outcome:
        "Delivered a comprehensive bookmark management solution with 99.9% uptime. Features include real-time search, collaborative collections, and cross-device synchronization. The app handles 10,000+ bookmarks efficiently and has been adopted by 200+ users for personal and team bookmark management.",
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
    caseStudy: {
      problem:
        "Traders and investors need comprehensive tools to analyze their trading performance, assess risk, and optimize their portfolios. Existing solutions are either too expensive or lack the depth of analysis required for professional trading.",
      approach:
        "Developed a full-stack analytics platform with Python/FastAPI backend for data processing and React frontend for visualization. Integrated real-time market data feeds, implemented advanced statistical analysis algorithms, and created interactive dashboards with Chart.js. Used PostgreSQL for efficient data storage and Docker for deployment.",
      outcome:
        "Created a professional-grade analytics platform that processes real-time market data and provides comprehensive trading insights. The platform analyzes 100+ trading metrics, supports multiple asset classes, and helps users optimize their trading strategies with 15% average improvement in risk-adjusted returns.",
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
    caseStudy: {
      problem:
        "Many existing chat applications lack real-time responsiveness or have complex interfaces that hinder user experience. There was a need for a simple, fast, and reliable chat platform for small teams and communities.",
      approach:
        "Built a real-time chat application using Socket.io for WebSocket connections and React for the frontend. Implemented user authentication with JWT tokens, message persistence with MongoDB, and responsive design with Tailwind CSS. Added features like typing indicators, message timestamps, and emoji support.",
      outcome:
        "Created a highly responsive chat application with sub-100ms message delivery. The platform supports 500+ concurrent users with 99.8% uptime. Features include real-time messaging, user presence indicators, and cross-device synchronization. Successfully deployed and used by multiple small teams.",
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
    caseStudy: {
      problem:
        "Traditional HR systems are often complex, expensive, and lack modern user interfaces. Small to medium businesses needed an affordable, user-friendly solution for managing employee data, attendance, and performance metrics.",
      approach:
        "Developed a full-stack application with Next.js for server-side rendering and SEO optimization. Implemented role-based authentication, created intuitive dashboards for different user roles, and integrated analytics with Chart.js. Used MongoDB for flexible data storage and Express.js for robust API development.",
      outcome:
        "Delivered a comprehensive HR management solution that reduced administrative overhead by 40%. The system handles employee records, attendance tracking, and performance analytics for companies with up to 500 employees. Features include automated reporting, role-based access control, and mobile-responsive design.",
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
    caseStudy: {
      problem:
        "Content creators needed a fast, SEO-friendly blogging platform that was easy to manage and customize. Existing solutions were either too complex or lacked modern features like responsive design and performance optimization.",
      approach:
        "Built a static-site generated blog using Next.js for optimal performance and SEO. Implemented markdown support for easy content creation, created a responsive design with Tailwind CSS, and added features like tag-based filtering and social media sharing. Optimized for Core Web Vitals and accessibility.",
      outcome:
        "Created a high-performance blog platform with 95+ Lighthouse scores across all metrics. The platform loads in under 1 second and supports unlimited posts with automatic SEO optimization. Successfully deployed for multiple content creators with excellent user engagement metrics.",
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
