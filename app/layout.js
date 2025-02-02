import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "JSPrompt",
//   description: "A prompt for JavaScript developers",
// };

export const metadata = {
  metadataBase: new URL('https://jsprompt.vercel.app'),
  title: {
    default: 'JSPrompt - Expert JavaScript & MERN Stack Training | 1-on-1 Mentoring Worldwide',
    template: '%s | JSPrompt - Global JavaScript Training'
  },
  description: 'Expert JavaScript, React, Node.js & MERN Stack training with personalized 1-on-1 mentoring, group sessions, and job support worldwide. Learn from an industry expert with hands-on experience in React, Angular, Vue, MongoDB, and Playwright testing.',
  keywords: [
    // Primary Keywords (High Search Volume)
    'JavaScript tutorial',
    'JavaScript course',
    'MERN stack training',
    'React js training',
    'Node.js tutorial',
    'MongoDB tutorial',
    'JavaScript mentor',
    'learn JavaScript online',

    // Location-based Keywords
    'online JavaScript training',
    'remote JavaScript mentor',
    'global JavaScript tutor',
    'international coding bootcamp',
    'worldwide programming courses',

    // Service-specific Keywords
    'one-on-one JavaScript training',
    'private JavaScript tutoring',
    'JavaScript group classes',
    'JavaScript job support',
    'MERN stack mentoring',
    'frontend development training',

    // Technology Stack Keywords
    'React.js courses',
    'Angular training',
    'Vue.js tutorials',
    'Playwright testing training',
    'Webpack optimization',
    'full stack JavaScript',
    'MongoDB database training',

    // Career-focused Keywords
    'JavaScript interview preparation',
    'frontend developer training',
    'MERN stack developer course',
    'JavaScript career guidance',
    'web development mentoring',
    'coding interview practice',

    // Long-tail Keywords
    'learn JavaScript from scratch online',
    'professional JavaScript mentoring services',
    'personal JavaScript trainer online',
    'MERN stack project guidance',
    'JavaScript code review help',
    'real-world JavaScript projects training'
  ].join(', '),
  openGraph: {
    title: 'JSPrompt - Global JavaScript & MERN Stack Expert Training',
    description: 'Transform your programming career with expert 1-on-1 JavaScript and MERN stack training. Personalized mentoring, group sessions, and job support available worldwide.',
    url: 'https://jsprompt.vercel.app/',
    siteName: 'JSPrompt',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://jsprompt.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JSPrompt - JavaScript Training Worldwide'
      }
    ]
  }
};

// Add this schema markup in your page
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "JSPrompt",
  "description": "Global JavaScript and MERN Stack training provider offering personalized mentoring and job support",
  "url": "https://jsprompt.com",
  "teaches": [
    "JavaScript Programming",
    "React Development",
    "Node.js Development",
    "MongoDB",
    "MERN Stack",
    "Angular",
    "Vue.js",
    "Playwright Testing",
    "Webpack Configuration"
  ],
  "courseMode": [
    "online",
    "one-on-one",
    "group"
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "Beginners to Advanced Developers"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "Contact for pricing",
    "priceCurrency": "USD"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <Script
          id="schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
