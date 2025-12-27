export const day00 = {
  day: 0,
  title: "Day 0: Professional Full‑Stack Setup (Zero to Production Parity)",
  intro: "The fastest way to become senior is to stop “winging” setup. Today you’ll build a repeatable environment: correct Node version, clean package manager, Docker databases, secrets, and a professional workflow.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Achieve Today</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">One Node version</span> per project (no “works on my machine”).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">One package manager</span> with deterministic installs (lockfiles you can trust).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Databases in Docker</span> (wipe/reset in seconds, same version as prod).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Secrets done right</span> (dotenv locally, secret manager in prod).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Professional workflow</span>: lint/format scripts, git hygiene, and API tooling.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Node.js Version Discipline (nvm)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Senior teams don’t “install Node” once. They <span class="text-brand-primary font-bold">pin versions</span> so every machine and CI runs the same runtime.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
# macOS/Linux: install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Windows: install nvm-windows (recommended)
# https://github.com/coreybutler/nvm-windows

# Install the latest LTS Node.js
nvm install --lts
nvm use --lts

# Verify
node -v
npm -v
</code></pre>
</div>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
  <p class="text-blue-800 dark:text-blue-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Pro move:</span> add a <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-2 py-1 rounded">.nvmrc</code> file to every repo (example: <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-2 py-1 rounded">lts/*</code> or <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-2 py-1 rounded">20.11.1</code>).
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Package Manager Hygiene (Corepack + pnpm)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
The “bug” is often your dependency tree. Use a lockfile + pinned toolchain so installs are identical across machines.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
# Corepack ships with modern Node and lets you pin package managers per project.
corepack enable

# Example: use pnpm (fast + space efficient)
corepack prepare pnpm@9.15.0 --activate
pnpm -v

# Deterministic install
pnpm install --frozen-lockfile
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Local Databases via Docker Compose (Production Parity)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Installing databases directly on your laptop creates version drift. Containers give you <span class="text-brand-primary font-bold">resettable, consistent</span> environments.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
# docker-compose.yml (example)
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: app
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:
</code></pre>
</div>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
# Start services
docker compose up -d

# Inspect
docker compose ps
docker logs -f &lt;container_name&gt;

# Reset ONLY data (nuclear option)
docker compose down -v
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Environment Variables & Secrets (No Leaks)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Use <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-2 py-1 rounded">.env</code> locally, but <span class="text-yellow-600 dark:text-yellow-400 font-bold">never commit secrets</span>. In production, use a secret manager (AWS SSM/Secrets Manager, GCP Secret Manager, etc.).
</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Rule:</span> if a value can damage you when leaked (DB password, JWT secret, API key), it must not be in Git history.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">5) API Testing Tools (Professional Debugging)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Postman</span>: best for teams, environments, collections, pre-request scripts.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Insomnia</span>: lightweight and fast, great for developers.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">curl</span>: the universal tool (works in CI, servers, and minimal environments).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ Day 0 Checklist</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li>Node pinned via nvm (and <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">.nvmrc</code> present).</li>
    <li>Package manager pinned via Corepack (lockfile committed).</li>
    <li>Docker Compose running Postgres + Redis locally.</li>
    <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">.env</code> used locally, secrets never committed.</li>
    <li>API client installed + can hit a health endpoint.</li>
  </ul>
</div>
                `,
  code: `/**
 * Day 0: Setup Validator (Node script)
 * Run: node setup-check.js
 *
 * What it teaches:
 * - Validate required environment variables
 * - Print toolchain versions (debugging in CI)
 * - Fail fast with actionable errors
 */

const required = [
  'NODE_ENV',
  'DATABASE_URL',
  'REDIS_URL',
  'JWT_ACCESS_SECRET',
];

const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === '');

console.log('✅ Node:', process.version);
console.log('✅ Platform:', process.platform, process.arch);
console.log('✅ NODE_ENV:', process.env.NODE_ENV);

if (missing.length) {
  console.error('\n❌ Missing required env vars:');
  for (const k of missing) console.error(' -', k);
  console.error('\nTip: create a .env (local) and load it with dotenv in dev.');
  process.exit(1);
}

console.log('\n✅ Environment looks good. Ready for Day 1 (Event Loop).');`,
  video: "tlB8487q",
  comparison: {
    junior: `// ❌ “Local setup” (fragile)
// 1) Install Node once, never check version
// 2) npm install (no frozen lockfile)
// 3) Install Postgres locally (unknown version)
// 4) Store secrets in code or commit .env
// 5) Debug issues by guessing`,
    senior: `// ✅ “Production parity” (repeatable)
// 1) Pin Node with nvm + .nvmrc
// 2) Pin package manager with Corepack
// 3) Run Postgres/Redis via docker compose
// 4) Use dotenv locally, secret manager in prod
// 5) Validate env + fail fast (setup-check.js)`
  },
  interview: {
    questions: [
      {
        q: "Why do senior teams pin Node.js versions per repo?",
        a: "Because Node versions change runtime behavior (ESM, TLS defaults, OpenSSL, fetch, V8 optimizations). Pinning makes local, CI, and production consistent and prevents heisenbugs caused by version drift."
      },
      {
        q: "Why use Docker Compose for databases instead of installing Postgres/Mongo locally?",
        a: "Compose provides isolated, reproducible environments with explicit versions. You can reset state quickly, onboard teammates faster, and match production more closely (same major versions + config patterns)."
      },
      {
        q: "What’s the difference between config and secrets?",
        a: "Config is safe to commit (ports, feature flags, non-sensitive defaults). Secrets can cause damage if leaked (passwords, API keys, JWT signing keys) and must be stored outside Git (dotenv locally, secret manager in production)."
      }
    ]
  }
};
