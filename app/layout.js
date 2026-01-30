import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './Providers';
import { ThemeProvider } from "./components/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import XPNotification from "./components/public/XPNotification";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://outlinedev.com'), // Updated domain
  title: {
    default: "OutlineDev | Master React, Node & System Design | Elite Mentorship",
    template: "%s | OutlineDev - The Career Roadmap"
  },
  description: "Outline your path to Senior Engineer. Join OutlineDev for 1-on-1 Mentorship, Code Reviews, and tailored Career Roadmaps. Learn React, Angular, Node.js, and System Design.",
  keywords: [
    "outline dev",
    "coding mentorship",
    "developer bootcamp",
    "learn react",
    "senior engineer roadmap",
    "system design interview",
    "full stack developer",
    "1 on 1 coding mentor",
    "career outline",
    "resume review"
  ],
  authors: [{ name: "OutlineDev Mentors" }],
  creator: "OutlineDev",
  publisher: "OutlineDev",
  icons: {
    icon: `/favicon.svg?v=${new Date().getTime()}`,
  },
  openGraph: {
    title: "OutlineDev | Master React, Node & System Design",
    description: "Outline your path to Senior Engineer. 1-on-1 Mentorship & Career Roadmaps.",
    url: 'https://outlinedev.com',
    siteName: 'OutlineDev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "OutlineDev | Master React, Node & System Design",
    description: "Outline your path to Senior Engineer. 1-on-1 Mentorship & Career Roadmaps.",
    creator: "@outlinedev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Master SEO Schema - The "Secret Sauce"
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "OutlineDev Career Platform",
        "url": "https://outlinedev.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://outlinedev.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "EducationalOrganization",
        "name": "OutlineDev",
        "url": "https://outlinedev.com",
        "logo": "https://outlinedev.com/logo-outlinedev-transparent.png", // Updated to our new logo
        "sameAs": [
          "https://twitter.com/outlinedev",
          "https://linkedin.com/company/outlinedev",
          "https://github.com/outlinedev"
        ],
        "description": "The world's premium Coding Mentorship platform offering 1-on-1 guidance and Career Outlines.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "category": "Education"
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider session={session}>
          <ThemeProvider>
            {children}
            <XPNotification />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
