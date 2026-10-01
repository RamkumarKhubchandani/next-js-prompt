import events from "./lib/events.json";
import { getAllTutorials } from "./lib/tutorials";
import { getSkillContent, getLocationContent } from "./lib/seo-content";

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
  "python",
  "ai-frontend",
  "web-development"
];

const PHASE_1_LOCATIONS = [
  // Existing 38 locations (Preserved 100%)
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
  "uk",

  // High-Value Global Tech Hubs (Expanded)
  "silicon-valley",
  "san-jose",
  "denver",
  "atlanta",
  "phoenix",
  "houston",
  "philadelphia",
  "munich",
  "frankfurt",
  "hamburg",
  "madrid",
  "barcelona",
  "milan",
  "rome",
  "vienna",
  "warsaw",
  "prague",
  "copenhagen",
  "brussels",
  "lisbon",
  "geneva",
  "calgary",
  "ottawa",
  "brisbane",
  "perth",
  "auckland",
  "hong-kong",
  "seoul",
  "bangkok",
  "kuala-lumpur",
  "jakarta",
  "abu-dhabi",
  "riyadh",
  "tel-aviv",
  "cairo",
  "johannesburg",
  "lagos",
  "ahmedabad",
  "kolkata",
  "jaipur",
  "indore",
  "chandigarh",
  "jamnagar",
  "kochi"
];

export default async function sitemap() {
  const baseUrl = "https://www.outlinedev.com"; // Production URL
  const currentDate = new Date().toISOString().split('T')[0];
  const MENTOR_PAGES_LAST_MODIFIED = "2026-09-01";

  // 1. Core Static Routes
  const staticRoutes = [
    { url: "/", changeFrequency: "daily", priority: 1.0 }, // Homepage
    { url: "/blogs", changeFrequency: "daily", priority: 0.9 },
    { url: "/tutorials", changeFrequency: "daily", priority: 0.9 },
    { url: "/mentorship", changeFrequency: "weekly", priority: 0.9 },
    { url: "/job-support", changeFrequency: "daily", priority: 0.9 },
    { url: "/services", changeFrequency: "weekly", priority: 0.9 },
    { url: "/mock-interviews", changeFrequency: "weekly", priority: 0.9 },
    { url: "/resume-audit", changeFrequency: "weekly", priority: 0.9 },
    { url: "/mentors", changeFrequency: "weekly", priority: 0.9 },
    { url: "/become-mentor", changeFrequency: "weekly", priority: 0.9 },
    { url: "/events", changeFrequency: "daily", priority: 0.9 },
    { url: "/challenges", changeFrequency: "weekly", priority: 0.8 },
    { url: "/ai-quiz", changeFrequency: "weekly", priority: 0.8 },
    { url: "/career", changeFrequency: "weekly", priority: 0.8 },
    { url: "/code-review", changeFrequency: "weekly", priority: 0.8 },
    { url: "/pricing", changeFrequency: "weekly", priority: 0.8 },
    { url: "/developer-toolkit-2026", changeFrequency: "weekly", priority: 0.9 },
    { url: "/coding-classes-for-beginners", changeFrequency: "weekly", priority: 0.9 },
    { url: "/bca-mca-training-jamnagar", changeFrequency: "weekly", priority: 0.9 },
    { url: "/hire/react-developer", changeFrequency: "weekly", priority: 0.8 },
    { url: "/hire/nextjs-developer", changeFrequency: "weekly", priority: 0.8 },
    { url: "/hire/full-stack-developer", changeFrequency: "weekly", priority: 0.8 },
    { url: "/hire/typescript-developer", changeFrequency: "weekly", priority: 0.8 },
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
      const skillC = getSkillContent(skill);
      const locC = getLocationContent(location);
      if (skillC.isFallback || locC.isFallback) return;

      // 3. High Intent: 1-on-1 Tutors / Mentors -> 0.9
      mentorRoutes.push({
        url: `${baseUrl}/mentors/one-to-one-${skill}-tutors-in-${location}`,
        lastModified: MENTOR_PAGES_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // Standard mentors variation -> 0.9
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-mentors-in-${location}`,
        lastModified: MENTOR_PAGES_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // Teacher variation -> 0.9
      mentorRoutes.push({
        url: `${baseUrl}/mentors/one-to-one-${skill}-teachers-in-${location}`,
        lastModified: MENTOR_PAGES_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.9,
      });
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-teachers-in-${location}`,
        lastModified: MENTOR_PAGES_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // 4. Job Support & On-the-Job Sprint Assistance -> 0.9
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-job-support-in-${location}`,
        lastModified: MENTOR_PAGES_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.9,
      });

      // 5. Commercial Hiring & Freelance Consulting -> 0.8
      mentorRoutes.push({
        url: `${baseUrl}/mentors/hire-${skill}-developers-in-${location}`,
        lastModified: MENTOR_PAGES_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      mentorRoutes.push({
        url: `${baseUrl}/mentors/freelance-${skill}-experts-in-${location}`,
        lastModified: MENTOR_PAGES_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // 6. Interview Preparation & Mock Interviews -> 0.8
      mentorRoutes.push({
        url: `${baseUrl}/mentors/${skill}-interview-help-in-${location}`,
        lastModified: MENTOR_PAGES_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  // ---------------------------------------------------------
  // OFFICIAL EVENT ROUTES (The 4 Live Events)
  // ---------------------------------------------------------
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

  const EVENT_TYPES = [
    "workshop",
    "masterclass",
    "bootcamp",
    "webinar"
  ];

  PHASE_1_SKILLS.forEach((topic) => {
    EVENT_TYPES.forEach((type) => {
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
