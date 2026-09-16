import events from "./lib/events.json";
import { getAllTutorials } from "./lib/tutorials";

const PHASE_1_SKILLS = [
  "javascript",
  "react",
  "typescript",
  "nodejs",
  "nextjs",
  "angular",
  "vue",
  "svelte",
  "react-native",
  "playwright",
  "mongodb",
  "frontend-engineering",
  "website-design",
  "job-support",
  "fullstack",
  "html-css",
  "tailwind",
  "redux",
  "python"
];

const PHASE_1_LOCATIONS = [
  "online",
  "remote",
  "near-me",
  "san-francisco",
  "new-york",
  "seattle",
  "austin",
  "boston",
  "chicago",
  "los-angeles",
  "dallas",
  "london",
  "manchester",
  "berlin",
  "amsterdam",
  "dublin",
  "paris",
  "stockholm",
  "zurich",
  "toronto",
  "vancouver",
  "montreal",
  "singapore",
  "sydney",
  "melbourne",
  "dubai",
  "tokyo",
  "bangalore",
  "hyderabad",
  "pune",
  "gurgaon",
  "noida",
  "chennai",
  "mumbai",
  "delhi",
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
    { url: "/blogs", changeFrequency: "daily", priority: 0.9 },
    { url: "/tutorials", changeFrequency: "daily", priority: 0.9 },
    { url: "/mentorship", changeFrequency: "weekly", priority: 0.9 },
    { url: "/job-support", changeFrequency: "daily", priority: 0.9 },
    { url: "/services", changeFrequency: "weekly", priority: 0.9 },
    { url: "/mentors", changeFrequency: "weekly", priority: 0.9 },
    { url: "/become-mentor", changeFrequency: "weekly", priority: 0.9 },
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
      // 3. High Intent: 1-on-1 Tutors / Mentors -> 0.9
      mentorRoutes.push({
        url: `${baseUrl}/mentors/one-to-one-${skill}-tutors-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // 4. Job Support & On-the-Job Sprint Assistance -> 0.9
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-job-support-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // 5. Commercial Hiring & Freelance Consulting -> 0.8
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

      // 6. Interview Preparation & Mock Interviews -> 0.8
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-interview-help-in-${location}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
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
