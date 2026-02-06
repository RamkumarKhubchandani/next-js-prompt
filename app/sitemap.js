import events from "./lib/events.json";

const PHASE_1_SKILLS = [
  "javascript",
  "react",
  "angular",
  "nodejs",
  "nextjs",
  "mongodb",
  "vue",
  "playwright",
  "typescript",
  "react-native",
  "svelte",
  "html-css",
  "tailwind",
  "fullstack"
];

const PHASE_1_LOCATIONS = [
  "pune",
  "mumbai",
  "bangalore",
  "hyderabad",
  "noida",
  "london",
  "san-francisco",
  "new-york",
  "berlin",
  "online"
];

export default function sitemap() {
  const baseUrl = "https://outlinedev.com"; // Production URL
  const currentDate = new Date().toISOString().split('T')[0];

  // Base routes - Added /events
  const routes = [
    "",
    "/mentorship",
    "/mentors",
    "/events",
    "/login",
    "/register",
    "/challenges",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 1,
  }));

  const mentorRoutes = [];

  PHASE_1_SKILLS.forEach((skill) => {
    PHASE_1_LOCATIONS.forEach((location) => {
      // 1. Standard: javascript-mentors-in-london (Volume)
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-mentors-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // 2. High Intent: one-to-one-javascript-teacher-in-london (Conversion)
      mentorRoutes.push({
        url: `${baseUrl}/mentors/one-to-one-${skill}-tutors-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // 3. Hiring: hire-react-developers-in-san-francisco (Commercial)
      // Only for major tech
      if (["react", "nodejs", "typescript", "fullstack"].includes(skill)) {
        mentorRoutes.push({
          url: `${baseUrl}/mentors/hire-${skill}-developers-in-${location}`,
          lastModified: currentDate,
          changeFrequency: "daily",
          priority: 1.0,
        });

        mentorRoutes.push({
          url: `${baseUrl}/mentors/freelance-${skill}-experts-in-${location}`,
          lastModified: currentDate,
          changeFrequency: "daily",
          priority: 0.95,
        });
      }

      // 4. Job Support: job-support-for-java-in-bangalore (High Demand)
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-job-support-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // 5. Interview Help: interview-help-for-javascript
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-interview-help-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    });
  });

  // ---------------------------------------------------------
  // OFFICIAL EVENT ROUTES (The 4 Live Events)
  // ---------------------------------------------------------
  // We prioritize these real event pages
  const officialEventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 1.0,
  }));

  // ---------------------------------------------------------
  // DYNAMIC EVENT ROUTES (Lead Gen for Search Intent)
  // ---------------------------------------------------------
  const eventRoutes = [];

  // Suffixes that map to "Events"
  const EVENT_TYPES = [
    "workshop",
    "masterclass",
    "bootcamp",
    "webinar"
  ];

  PHASE_1_SKILLS.forEach((topic) => {
    EVENT_TYPES.forEach((type) => {
      // e.g. /events/free-react-workshop
      eventRoutes.push({
        url: `${baseUrl}/events/free-${topic}-${type}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    });
  });

  return [...routes, ...officialEventRoutes, ...mentorRoutes, ...eventRoutes];
}
