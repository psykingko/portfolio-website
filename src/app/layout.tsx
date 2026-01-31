import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import LayoutClient from "@/components/layout/LayoutClient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashish Singh - Full Stack & AI Developer",
  description:
    "Full Stack & AI Developer specializing in React, Node.js, FastAPI, and NLP. Building scalable web applications and ML-powered systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1b2651" />
        <meta name="color-scheme" content="light" />
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
