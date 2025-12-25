export const day09 = {
  day: 9,
  title: "CI/CD Pipelines",
  intro: "Automate testing and deployment.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>How CI/CD prevents “hero deployments”.</li>
  <li>Pipeline stages: lint → test → build → security scan → deploy.</li>
  <li>Blue/Green & canary deployments (risk reduction).</li>
  <li>Secrets in CI and environment promotion (dev → staging → prod).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Pipeline is the Product</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If your pipeline is weak, production reliability is weak. Mature teams treat CI/CD as a first-class system.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) A Practical CI/CD Flow</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
Commit / PR
  │
  ├─ Lint + Typecheck
  ├─ Unit tests
  ├─ Build (artifact / Docker image)
  ├─ Security scan (deps / image)
  └─ Deploy (staging) → approval → deploy (prod)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Promotion > Rebuild</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Senior teams build once and promote the same artifact. If you rebuild for prod, you’re deploying something untested.
</p>
            `,
  code: `# Day 9: GitHub Actions (example)
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
  push:
    branches: [ "main" ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint --if-present
      - run: npm test --if-present

  build_docker:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t myapp:\${{ github.sha }} .
      # push to registry here (GHCR/ECR/DockerHub) in real pipeline`,
  comparison: {
    junior: `// ❌ Deploying from Local
// "Hey, I'm deploying, don't touch dev!"
// *Uploads uncommitted code*`,
    senior: `// ✅ Automated pipeline
// PR -> tests + build
// main -> deploy staging
// prod deploy uses the same tested artifact`
  },
  interview: {
    questions: [
      {
        q: "What is Blue/Green Deployment?",
        a: "Two identical environments. Deploy to Green, validate, then switch traffic from Blue to Green instantly. Rollback = switch back."
      },
      {
        q: "What’s the difference between CI and CD?",
        a: "CI validates changes automatically (tests/build). CD automates delivery/deployment to environments with gates/approvals as needed."
      },
      {
        q: "Why 'build once, promote many'?",
        a: "It ensures production runs the exact artifact that passed tests in CI. Rebuilding in prod can introduce untested differences (dependencies, build flags, etc.)."
      }
    ]
  }
};
