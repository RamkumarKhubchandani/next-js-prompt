import HomeClientPage from './HomeClientPage';

export const metadata = {
  title: "OutlineDev - Free Coding Bootcamp | React, Angular, Node.js & System Design",
  description: "Join the #1 Free Coding Mentorship platform. Master React, Angular, and Node.js with 1-on-1 expert guidance, resume building, and mock interviews.",
  alternates: {
    canonical: 'https://outlinedev.com',
  }
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
