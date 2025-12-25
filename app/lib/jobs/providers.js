function getUtcDateKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function classifyWorkplace(text = "") {
  const t = String(text).toLowerCase();
  if (t.includes("hybrid")) return "hybrid";
  if (t.includes("remote") || t.includes("work from home") || t.includes("wfh")) return "remote";
  return "onsite";
}

function classifyRole(title = "") {
  const t = String(title).toLowerCase();
  if (t.includes("full stack") || t.includes("fullstack")) return "fullstack";
  if (t.includes("backend") || t.includes("back-end") || t.includes("node")) return "backend";
  if (t.includes("frontend") || t.includes("front-end") || t.includes("react") || t.includes("ui")) return "frontend";
  return "unknown";
}

function stripHtml(html = "") {
  return String(html)
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSalaryString(min, max, currency = "") {
  if (!min && !max) return "";
  const c = currency ? `${currency} ` : "";
  if (min && max) return `${c}${Math.round(min)} - ${Math.round(max)}`;
  if (min) return `${c}${Math.round(min)}+`;
  return `${c}Up to ${Math.round(max)}`;
}

// Adzuna supports a limited set of countries. Fall back to US if unsupported.
const ADZUNA_SUPPORTED = new Set([
  "AU","AT","BE","BR","CA","CH","DE","ES","FR","GB","IN","IT","MX","NL","NZ","PL","RU","SG","US","ZA",
]);

export function resolveCountry(raw) {
  const c = String(raw || "US").toUpperCase();
  // normalize some common ones
  if (c === "UK") return "GB";
  return c.length === 2 ? c : "US";
}

export function toAdzunaCountry(country) {
  const c = resolveCountry(country);
  return ADZUNA_SUPPORTED.has(c) ? c : "US";
}

export async function fetchFromAdzuna({ country, role, limit = 30 }) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) return { source: "adzuna", jobs: [], meta: { enabled: false } };

  const cc = toAdzunaCountry(country).toLowerCase();
  const what =
    role === "frontend"
      ? "frontend OR react OR javascript OR ui engineer"
      : role === "backend"
        ? "backend OR node OR api OR server"
        : role === "fullstack"
          ? "full stack OR fullstack OR node OR react"
          : "frontend OR full stack OR backend OR react OR node OR typescript";

  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: String(Math.min(Math.max(limit, 10), 50)),
    what,
    "content-type": "application/json",
    sort_by: "date",
  });

  const url = `https://api.adzuna.com/v1/api/jobs/${cc}/search/1?${params.toString()}`;
  let res;
  try {
    res = await fetch(url, { headers: { accept: "application/json" } });
  } catch (e) {
    return {
      source: "adzuna",
      jobs: [],
      meta: {
        enabled: true,
        url,
        fetchError: String(e?.cause?.code || e?.code || e?.message || e),
      },
    };
  }
  if (!res.ok) {
    return { source: "adzuna", jobs: [], meta: { enabled: true, status: res.status, url } };
  }

  const data = await res.json();
  const dateKey = getUtcDateKey();

  const jobs = (data?.results || []).map((j) => {
    const title = j?.title || "Untitled";
    const company = j?.company?.display_name || "Unknown";
    const location = j?.location?.display_name || "";
    const desc = stripHtml(j?.description || "");
    const workplace = classifyWorkplace(`${location} ${title} ${desc}`);
    return {
      source: "adzuna",
      sourceId: String(j?.id || ""),
      dateKey,
      country: resolveCountry(country),
      workplace,
      role: classifyRole(title),
      title,
      company,
      logo: "",
      location: location || "Unknown",
      type: j?.contract_time ? String(j.contract_time) : "Full-time",
      salary: toSalaryString(j?.salary_min, j?.salary_max, j?.salary_currency),
      tags: Array.isArray(j?.category?.tag) ? j.category.tag : [],
      description: desc,
      postedAt: j?.created ? new Date(j.created) : new Date(),
      applyLink: j?.redirect_url || "",
    };
  });

  return { source: "adzuna", jobs, meta: { enabled: true, url, count: jobs.length } };
}

export async function fetchFromRemotive({ country, role, limit = 30 }) {
  const q =
    role === "frontend"
      ? "frontend react"
      : role === "backend"
        ? "backend node"
        : role === "fullstack"
          ? "fullstack react node"
          : "react typescript node frontend backend";

  const url = `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(q)}`;
  let res;
  try {
    res = await fetch(url, { headers: { accept: "application/json" } });
  } catch (e) {
    return {
      source: "remotive",
      jobs: [],
      meta: { url, fetchError: String(e?.cause?.code || e?.code || e?.message || e) },
    };
  }
  if (!res.ok) return { source: "remotive", jobs: [], meta: { status: res.status, url } };
  const data = await res.json();
  const dateKey = getUtcDateKey();
  const c = resolveCountry(country);

  let jobs = (data?.jobs || []).map((j) => {
    const title = j?.title || "Untitled";
    const desc = stripHtml(j?.description || "");
    const locReq = j?.candidate_required_location || "Worldwide";
    const workplace = "remote";
    return {
      source: "remotive",
      sourceId: String(j?.id || j?.url || ""),
      dateKey,
      country: c,
      workplace,
      role: classifyRole(title),
      title,
      company: j?.company_name || "Unknown",
      logo: j?.company_logo_url || "",
      location: `Remote (${locReq})`,
      type: j?.job_type || "Full-time",
      salary: j?.salary || "",
      tags: Array.isArray(j?.tags) ? j.tags.slice(0, 8) : [],
      description: desc,
      postedAt: j?.publication_date ? new Date(j.publication_date) : new Date(),
      applyLink: j?.url || "",
    };
  });

  // If user country is known, prefer jobs that mention that country OR worldwide.
  // This is best-effort; remotive is remote-only.
  if (c) {
    const needle = c === "US" ? "United States" : c === "IN" ? "India" : "";
    if (needle) {
      const preferred = jobs.filter((j) => j.location.toLowerCase().includes(needle.toLowerCase()) || j.location.toLowerCase().includes("worldwide"));
      if (preferred.length >= 8) jobs = preferred;
    }
  }

  jobs = jobs.slice(0, Math.min(Math.max(limit, 10), 50));
  return { source: "remotive", jobs, meta: { url, count: jobs.length } };
}

export function filterJobs(jobs, { workplace = "all", role = "all", q = "" }) {
  const needle = String(q || "").trim().toLowerCase();
  return jobs.filter((j) => {
    if (workplace !== "all" && j.workplace !== workplace) return false;
    if (role !== "all" && j.role !== role) return false;
    if (!needle) return true;
    const hay = `${j.title} ${j.company} ${j.location} ${(j.tags || []).join(" ")} ${j.description || ""}`.toLowerCase();
    return hay.includes(needle);
  });
}


