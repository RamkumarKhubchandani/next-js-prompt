import events from "./lib/events.json";
import { getAllTutorials } from "./lib/tutorials";

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
  "remote",
  "online",
  "bangalore",
  "pune",
  "hyderabad",
  "mumbai",
  "noida",
  "delhi",
  "gurgaon",
  "chennai",
  "london",
  "san-francisco",
  "new-york",
  "austin",
  "india",
  "usa",
  "uk"
];

export default async function sitemap() {
  const baseUrl = "https://www.outlinedev.com"; // Production URL
  const currentDate = new Date().toISOString().split('T')[0];

  // 1. Core Static Routes
  const staticRoutes = [
    { url: "/", changeFrequency: "daily", priority: 1.0 }, // Homepage
    { url: "/mentorship", changeFrequency: "weekly", priority: 0.9 },
    { url: "/mentors", changeFrequency: "weekly", priority: 0.9 },
    { url: "/events", changeFrequency: "daily", priority: 0.9 },
    { url: "/challenges", changeFrequency: "weekly", priority: 0.8 },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Low Value / Utility Routes (Indexable but low priority)
  const utilityRoutes = [
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const mentorRoutes = [];

  PHASE_1_SKILLS.forEach((skill) => {
    PHASE_1_LOCATIONS.forEach((location) => {
      // 3. Middle Tier: Standard Programmatic Pages (Volume) -> 0.7
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-mentors-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      });

      // 4. High Tier: Conversion Pages (Commercial Intent) -> 0.9
      mentorRoutes.push({
        url: `${baseUrl}/mentors/one-to-one-${skill}-tutors-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // 5. Hiring: Specific Commercial Pages -> 0.8
      if (["react", "nodejs", "typescript", "fullstack"].includes(skill)) {
        mentorRoutes.push({
          url: `${baseUrl}/mentors/hire-${skill}-developers-in-${location}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.8,
        });

        mentorRoutes.push({
          url: `${baseUrl}/mentors/freelance-${skill}-experts-in-${location}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      // 6. Long Tail -> 0.6
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-job-support-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.6,
      });

      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-interview-help-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });
  });

  // ---------------------------------------------------------
  // OFFICIAL EVENT ROUTES (The 4 Live Events)
  // ---------------------------------------------------------
  // These are core content, keep high
  const officialEventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 1.0,
  }));

  // ---------------------------------------------------------
  // DYNAMIC EVENT ROUTES (Lead Gen)
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
      // Lead Gen -> 0.8
      eventRoutes.push({
        url: `${baseUrl}/events/free-${topic}-${type}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  // 7. Dynamic & Static Blog Routes
  let blogRoutes = [];
  try {
    const tutorials = await getAllTutorials();
    blogRoutes = tutorials.map((t) => ({
      url: `${baseUrl}/blogs/${t.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating blog routes in sitemap:", error);
  }

  return [
    ...staticRoutes,
    ...utilityRoutes,
    ...officialEventRoutes,
    ...mentorRoutes,
    ...eventRoutes,
    ...blogRoutes
  ];
}
