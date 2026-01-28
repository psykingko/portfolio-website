interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  author: string;
  url: string;
  image: string;
}

export const seoConfig: SEOConfig = {
  title: "Ashish Singh - Full Stack & AI Developer",
  description:
    "Full Stack & AI Developer specializing in React, Node.js, FastAPI, and NLP. Building scalable web applications and ML-powered systems.",
  keywords:
    "Full Stack Developer, AI Developer, React, Node.js, FastAPI, NLP, Machine Learning",
  author: "Ashish Singh",
  url: "https://ashishsingh.dev",
  image: "/og-image.jpg",
};

export const generateMetaTags = (customConfig?: Partial<SEOConfig>) => {
  const config = { ...seoConfig, ...customConfig };

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    author: config.author,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url,
      images: [
        {
          url: config.image,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.image],
    },
  };
};

export const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ashish Singh",
    jobTitle: "Full Stack & AI Developer",
    email: "singhashish9599@gmail.com",
    telephone: "+91 9599717790",
    url: "https://ashishsingh.dev",
    sameAs: [
      "https://linkedin.com/in/ashish-singh",
      "https://github.com/ashish-singh",
    ],
    knowsAbout: ["React", "Node.js", "FastAPI", "Machine Learning", "NLP"],
  };
};
