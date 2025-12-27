export const day08 = {
  day: 8,
  title: "Docker & Containerization",
  intro: "Package your code with its environment.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>What a container actually is (and what it isn’t).</li>
  <li>How to write a production Dockerfile (small, secure, cache-friendly).</li>
  <li>docker-compose for local dev parity.</li>
  <li>Common production issues: env vars, ports, health checks, and logging.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Key Idea</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Docker packages your app + its dependencies into an image. The image runs the same on your laptop, CI, and production.
This eliminates “works on my machine” at deployment time.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Multi‑Stage Builds (Smaller + Safer)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Use one stage to build, another to run. Final image contains only what’s needed to execute.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Stage 1 (deps/build)                 Stage 2 (runtime)
┌───────────────────────┐           ┌───────────────────────┐
│ node:xx + dev deps    │  ─────▶   │ node:xx-slim          │
│ install, build        │           │ copy dist + prod deps │
└───────────────────────┘           └───────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Cache Like a Senior</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Docker caching is layer-based. Copy dependency manifests first (<code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">package.json</code>, lockfile),
install, then copy the rest. This makes rebuilds fast.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Security Basics</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Run as <span class="text-yellow-600 dark:text-yellow-400 font-bold">non-root</span> where possible.</li>
  <li>Prefer <span class="text-yellow-600 dark:text-yellow-400 font-bold">slim</span> base images for smaller attack surface.</li>
  <li>Don’t bake secrets into images. Use env vars / secret managers.</li>
  <li>Add a health endpoint and (optionally) a container <span class="text-yellow-600 dark:text-yellow-400 font-bold">HEALTHCHECK</span>.</li>
</ul>
            `,
  code: `# Day 8: Production-friendly Dockerfile (multi-stage)
# NOTE: adjust build/start commands to your project.

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# If you have TypeScript:
# RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy only what's needed
COPY --from=builder /app .
USER app

EXPOSE 3000
CMD ["node", "index.js"]

# .dockerignore (recommended)
# node_modules
# .git
# .env
# dist

# docker-compose.yml (local parity example)
# services:
#   api:
#     build: .
#     ports: ["3000:3000"]
#     environment:
#       - DATABASE_URL=postgres://postgres:postgres@postgres:5432/app
#   postgres:
#     image: postgres:16
#     environment:
#       POSTGRES_PASSWORD=postgres
#       POSTGRES_DB=app
#     ports: ["5432:5432"]`,
  comparison: {
    junior: `// ❌ “Ship from laptop”
// - SSH into server
// - git pull
// - npm install
// - pm2 restart
// - hope nothing breaks`,
    senior: `// ✅ Image-based deploy
// - Build once (CI): Docker image
// - Promote same artifact: dev → staging → prod
// - Rollback = deploy previous image tag`
  },
  interview: {
    questions: [
      {
        q: "Container vs VM?",
        a: "Containers share the host OS kernel (lightweight, fast start). VMs run a full OS (heavier, stronger isolation). Containers are great for packaging + deployment; VMs are still common under the hood."
      },
      {
        q: "Why use multi-stage Docker builds?",
        a: "To keep the final image small and secure by excluding build tools/dev dependencies. It also improves caching and reduces attack surface."
      },
      {
        q: "What should go into .dockerignore and why?",
        a: "Anything that should not be in the build context (node_modules, .git, local logs, .env). Smaller context = faster builds and fewer accidental leaks."
      }
    ]
  }
};
