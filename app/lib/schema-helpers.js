/**
 * Generates Course Schema for a specific track.
 * @param {object} course - The course model object
 * @returns {object} schema.org course JSON-LD
 */
export function getCourseSchema(course) {
  if (!course) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title || course.id,
    "description": course.description || `Master ${course.title || course.id} step-by-day with dynamic labs, quizzes, and live mentorship.`,
    "provider": {
      "@type": "Organization",
      "name": "OutlineDev",
      "url": "https://www.outlinedev.com",
      "logo": "https://www.outlinedev.com/logo-outlinedev-icon.png",
      "@id": "https://www.outlinedev.com/#organization"
    },
    "hasCourseInstance": [
      {
        "@type": "CourseInstance",
        "courseMode": "Online",
        "courseWorkload": "PT10H",
        "instructor": {
          "@type": "Organization",
          "name": "OutlineDev Mentors"
        }
      }
    ]
  };
}

/**
 * Generates BlogPosting Schema for a dynamic or static tutorial.
 * @param {object} tutorial - The tutorial model object
 * @returns {object} schema.org BlogPosting JSON-LD
 */
export function getBlogPostingSchema(tutorial) {
  if (!tutorial) return null;
  const publishDate = tutorial.createdAt || new Date().toISOString();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.outlinedev.com/blogs/${tutorial.slug}`
    },
    "headline": tutorial.title,
    "description": tutorial.description,
    "image": tutorial.image || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1200",
    "datePublished": publishDate,
    "dateModified": publishDate,
    "author": {
      "@type": "Person",
      "name": tutorial.author || "OutlineDev Mentor"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OutlineDev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.outlinedev.com/logo-outlinedev-icon.png"
      },
      "@id": "https://www.outlinedev.com/#organization"
    }
  };
}

/**
 * Generates FAQPage Schema.
 * @param {Array} faqs - Array of objects with question/answer or q/a properties
 * @returns {object} schema.org FAQPage JSON-LD
 */
export function getFaqSchema(faqs) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question || faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer || faq.a
      }
    }))
  };
}
