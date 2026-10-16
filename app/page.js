import HomeClientPage from './HomeClientPage';

export const metadata = {
  title: "OutlineDev | 1-on-1 Dev Mentoring, Job Support & Hire a Developer",
  description: "1-on-1 mentoring, job support and interview prep for React, Node.js and full-stack developers, plus freelance development. Free intro call.",
  alternates: {
    canonical: 'https://www.outlinedev.com/',
  },
  keywords: [
    "free coding bootcamp",
    "javascript mentorship",
    "react course",
    "angular tutorial",
    "nodejs training",
    "full stack developer",
    "system design interview",
    "1 on 1 coding mentor",
    "coding certification",
    "learn javascript online",
    "free programming course india",
  ],
  openGraph: {
    title: "OutlineDev | 1-on-1 Dev Mentoring, Job Support & Hire a Developer",
    description: "1-on-1 mentoring, job support and interview prep for React, Node.js and full-stack developers, plus freelance development. Free intro call.",
    url: 'https://www.outlinedev.com/',
    siteName: 'OutlineDev',
    images: [
      {
        url: 'https://www.outlinedev.com/brand/linkedin-banner-final.png',
        width: 1200,
        height: 630,
        alt: 'OutlineDev - Free Coding Bootcamp & Mentorship for JavaScript, React, Angular, Node.js',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "OutlineDev | 1-on-1 Dev Mentoring, Job Support & Hire a Developer",
    description: "1-on-1 mentoring, job support and interview prep for React, Node.js and full-stack developers, plus freelance development. Free intro call.",
    images: ['https://www.outlinedev.com/brand/linkedin-banner-final.png'],
    creator: "@outlinedev",
  },
};

export default function Page() {
  // FAQ Schema for "People Also Ask" Dominance
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is OutlineDev really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The first intro call is free. Mentoring sessions, job support and freelance work are paid, with rates agreed directly."
        }
      },
      {
        "@type": "Question",
        "name": "How does the 1-on-1 mentorship work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book a 1-on-1 session with a senior engineer. We inspect your code, help debug complex issues, guide project architecture, and provide career and interview preparation."
        }
      },
      {
        "@type": "Question",
        "name": "Can beginners join?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We welcome beginners and self-taught developers, guiding you step-by-step from core fundamentals in HTML, CSS, and JavaScript through modern React and full-stack development."
        }
      }
    ]
  };



  // Breadcrumb Schema for Homepage
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.outlinedev.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeClientPage />
    </>
  );
}
