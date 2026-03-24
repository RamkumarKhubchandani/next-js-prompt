import HomeClientPage from './HomeClientPage';

export const metadata = {
  title: "OutlineDev | Free Agentic Coding Bootcamp & Mentorship",
  description: "Join the #1 Free Agentic Coding Bootcamp. Master React, Node.js, and Full Stack with 1-on-1 expert mentorship and certification. 100% free.",
  alternates: {
    canonical: 'https://outlinedev.com/',
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
    title: "OutlineDev | Free Coding Bootcamp & Mentorship",
    description: "Master JavaScript, React, Angular, Node.js & Full Stack. 1-on-1 expert mentorship, mock interviews & global certification — 100% free.",
    url: 'https://outlinedev.com/',
    siteName: 'OutlineDev',
    images: [
      {
        url: 'https://outlinedev.com/brand/linkedin-banner-final.png',
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
    title: "OutlineDev | Free Coding Bootcamp & Mentorship",
    description: "Master JavaScript, React, Angular, Node.js & Full Stack. 1-on-1 expert mentorship — 100% free.",
    images: ['https://outlinedev.com/brand/linkedin-banner-final.png'],
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
          "text": "Yes! OutlineDev is 100% free for students, juniors, and professionals. We believe high-quality engineering mentorship should be accessible to everyone."
        }
      },
      {
        "@type": "Question",
        "name": "How does the 1-on-1 mentorship work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book unlimited 1-on-1 sessions with senior engineers. We inspect your code, help debug issues, and provide career guidance relevant to Silicon Valley standards."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer certificates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, upon completing our tracks for React, Angular, or System Design, you receive a verifiable Global Certification to boost your LinkedIn profile."
        }
      },
      {
        "@type": "Question",
        "name": "Can beginners join?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We have specialized tracks for coding for kids, absolute beginners, and university students, starting from HTML/CSS all the way to Advanced System Design."
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
        "item": "https://outlinedev.com"
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
