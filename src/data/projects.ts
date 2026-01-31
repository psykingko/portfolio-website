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
    thumbnail: "/projects/multi_sentiment.png",
    links: {
      github: "https://github.com/singhashish9599/multi-sentiment-analyzer",
      demo: "https://multi-sentiment-analyzer-demo.vercel.app",
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
    thumbnail: "/projects/voices.png",
    links: {
      github: "https://github.com/singhashish9599/prernaBlog",
      demo: "https://prerna-blog-demo.vercel.app",
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
    thumbnail: "/projects/linksaver.png",
    links: {
      github: "https://github.com/singhashish9599/link-saver-app",
      demo: "https://link-saver-app-demo.vercel.app",
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
