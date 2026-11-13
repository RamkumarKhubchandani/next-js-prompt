import { safeJsonLd } from '@/app/lib/schema-helpers';
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './Providers';
import { ThemeProvider } from "./components/ThemeProvider";
import XPNotification from "./components/public/XPNotification";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ActivityTracker from "./components/ActivityTracker";
import WhatsAppWidget from "./components/WhatsAppWidget";
import ExitIntentModal from "./components/public/ExitIntentModal";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://www.outlinedev.com'),
  title: {
    default: "OutlineDev | Free Agentic Coding Bootcamp & Mentorship",
    template: "%s | OutlineDev"
  },
  description: "Join the #1 Free Agentic Coding Bootcamp. Master React, Node.js, and Full Stack with 1-on-1 expert mentorship and certification. 100% free.",
  keywords: [
    "free agentic coding bootcamp",
    "javascript course",
    "react mentorship",
    "angular course",
    "nodejs tutorial",
    "node.js training",
    "ai automation tutorial",
    "full stack developer",
    "system design interview",
    "1 on 1 coding mentor",
    "coding certification india",
    "learn javascript online",
    "outline dev",
    "agentic coding",
  ],
  authors: [{ name: "OutlineDev Mentors" }],
  creator: "OutlineDev",
  publisher: "OutlineDev",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo-outlinedev-icon.png', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: '/favicon.ico',
    apple: '/logo-outlinedev-icon.png',
  },
  openGraph: {
    title: "OutlineDev | Free Coding Bootcamp & 1-on-1 Mentorship",
    description: "Join the #1 Free Coding Mentorship platform. Master JavaScript, React, Angular & Full Stack with 1-on-1 expert guidance, mock interviews and certification.",
    url: 'https://www.outlinedev.com/',
    siteName: 'OutlineDev',
    images: [
      {
        url: 'https://www.outlinedev.com/brand/linkedin-banner-final.png',
        width: 1200,
        height: 630,
        alt: 'OutlineDev - Free Coding Bootcamp & Mentorship',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "OutlineDev | Free Coding Bootcamp & 1-on-1 Mentorship",
    description: "Master JavaScript, React, Angular & Full Stack with 1-on-1 expert guidance, mock interviews and certification — 100% free.",
    images: ['https://www.outlinedev.com/brand/linkedin-banner-final.png'],
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


export default function RootLayout({ children }) {
  // Master SEO Schema - Enhanced for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Website Schema with Search Box
      {
        "@type": "WebSite",
        "name": "OutlineDev",
        "alternateName": "OutlineDev",
        "url": "https://www.outlinedev.com"
      },
      // 2. Organization Schema (Enhanced for Logo & Knowledge Panel)
      {
        "@type": ["EducationalOrganization", "Organization"],
        "@id": "https://www.outlinedev.com/#organization",
        "name": "OutlineDev",
        "legalName": "OutlineDev",
        "url": "https://www.outlinedev.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.outlinedev.com/logo-outlinedev-icon.png",
          "width": 512,
          "height": 512,
          "caption": "OutlineDev Logo"
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://www.outlinedev.com/brand/linkedin-banner-final.png",
          "width": 1200,
          "height": 630
        },
        "description": "OutlineDev is a free coding mentorship platform. We provide 1-on-1 expert guidance, career roadmaps, and comprehensive courses in React, Angular, Node.js, Python, Vue, Agentic AI and System Design.",
        "slogan": "Outline Your Path to Senior Engineer",
        "sameAs": [
          "https://www.linkedin.com/company/outlinedev",
          "https://www.instagram.com/outlinedev.io/"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8237320942",
          "contactType": "Customer Service",
          "email": "hi@outlinedev.com",
          "areaServed": "Worldwide",
          "availableLanguage": ["English", "Hindi"]
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "category": "Education"
        }
      },
      // 3. Educational Service Schema
      {
        "@type": "Service",
        "serviceType": "Coding Mentorship",
        "provider": {
          "@id": "https://www.outlinedev.com/#organization"
        },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Coding Courses",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "React Masterclass",
                "description": "Complete React course from basics to advanced"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "Angular Complete Guide",
                "description": "Master Angular from fundamentals to production"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "System Design Interview Prep",
                "description": "Comprehensive system design preparation for FAANG"
              }
            }
          ]
        }
      },
      // 4. Person Schema (Lead Mentor)
      {
        "@type": "Person",
        "name": "Ramkumar Khubchandani",
        "jobTitle": "Principal Engineer",
        "description": "Ramkumar Khubchandani is a software engineer with 12+ years of industry experience. He specializes in frontend and full-stack development — including HTML, React, Node.js, and MongoDB — with a focus on AI-integrated frontend engineering. He provides 1-on-1 mentorship to developers worldwide through OutlineDev.",
        "knowsAbout": ["HTML", "React", "Full Stack Development", "Node.js", "MongoDB", "AI Frontend Development"],
        "sameAs": ["https://www.linkedin.com/in/ramkumar-khubchandani-b7097a81/"]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <GoogleAnalytics />
        <AuthProvider>
          <ThemeProvider>
            {children}
            <XPNotification />
            <WhatsAppWidget />
            <ExitIntentModal />
            <Suspense fallback={null}>
              <ActivityTracker />
            </Suspense>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
