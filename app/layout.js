import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './Providers';
import { ThemeProvider } from "./components/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import XPNotification from "./components/public/XPNotification";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://jsprompt.com'), // Replace with actual domain
  title: {
    default: "Free Coding Bootcamp | Master React, Angular & System Design | 100% Free Mentorship",
    template: "%s | JSPrompt - #1 Free Coding Platform"
  },
  description: "The world's first fully free 1-on-1 Mentorship & Coding Bootcamps. Learn React, Angular, Node.js, and System Design step-by-step. Includes Free Resume Builder, Interview Prep, and Live 5-Person Agile Squads. Start your developer career today.",
  keywords: [
    "free coding bootcamp",
    "learn react free",
    "angular masterclass",
    "resume builder",
    "interview preparation",
    "system design course",
    "javascript tutorial",
    "coding for beginners",
    "full stack developer training",
    "free programming classes",
    "1 on 1 coding mentorship",
    "coding metrics",
    "agile squad experience",
    "coding for kids",
    "senior developer training"
  ],
  authors: [{ name: "JSPrompt Mentors" }],
  creator: "JSPrompt",
  publisher: "JSPrompt",
  icons: {
    icon: `/favicon.svg?v=${new Date().getTime()}`,
  },
  openGraph: {
    title: "Free Coding Bootcamp | Master React, Angular & System Design",
    description: "Unlock your potential with 100% Free Learning. Step-by-step roadmaps, Resume Building, and Interview Prep. Join the revolution.",
    url: 'https://jsprompt.com',
    siteName: 'JSPrompt',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Coding Bootcamp | Master React, Angular & System Design",
    description: "Unlock your potential with 100% Free Learning. Step-by-step roadmaps, Resume Building, and Interview Prep. Join the revolution.",
    creator: "@jsprompt",
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
        "name": "JSPrompt Free Coding Bootcamp",
        "url": "https://jsprompt.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://jsprompt.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "EducationalOrganization",
        "name": "JSPrompt",
        "url": "https://jsprompt.com",
        "logo": "https://jsprompt.com/logo.png",
        "sameAs": [
          "https://twitter.com/jsprompt",
          "https://linkedin.com/company/jsprompt",
          "https://github.com/jsprompt"
        ],
        "description": "The world's #1 Free Coding Mentorship platform offering 1-on-1 guidance, Resume Building, and Interview Prep.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "category": "Free"
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
