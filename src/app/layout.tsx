import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import LayoutClient from "@/components/layout/LayoutClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ashish Singh - Full Stack & AI Developer",
  description:
    "Full Stack & AI Developer specializing in React, Node.js, FastAPI, and NLP. Building scalable web applications and ML-powered systems.",
  keywords: [
    "Full Stack Developer",
    "AI Developer",
    "React",
    "Node.js",
    "FastAPI",
    "NLP",
    "Machine Learning",
    "Web Development",
  ],
  authors: [{ name: "Ashish Singh" }],
  creator: "Ashish Singh",
  publisher: "Ashish Singh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Ashish Singh - Full Stack & AI Developer",
    description:
      "Full Stack & AI Developer specializing in React, Node.js, FastAPI, and NLP. Building scalable web applications and ML-powered systems.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Ashish Singh Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Singh - Full Stack & AI Developer",
    description:
      "Full Stack & AI Developer specializing in React, Node.js, FastAPI, and NLP.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [{ rel: "manifest", url: "/favicon/site.webmanifest" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#1b2651" />
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-bg-beige`}
      >
        <LayoutClient>
          {/* Skip links for accessibility - moved here for better positioning */}
          <a
            href="#main-content"
            className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:no-underline"
          >
            Skip to main content
          </a>
          <a
            href="#navigation"
            className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:no-underline"
          >
            Skip to navigation
          </a>

          {/* Page wrapper with proper semantic structure */}
          <div className="flex flex-col min-h-screen">
            {/* Site header with navigation */}
            <Header />

            {/* Main content area */}
            <main
              id="main-content"
              className="flex-1 focus:outline-none"
              role="main"
              aria-label="Main content"
              tabIndex={-1}
            >
              {/* Content wrapper for consistent spacing and proper document flow */}
              <div className="relative">
                {/* This div ensures proper content flow and spacing */}
                <div className="min-h-screen pt-20">{children}</div>
              </div>
            </main>
          </div>
        </LayoutClient>
      </body>
    </html>
  );
}
