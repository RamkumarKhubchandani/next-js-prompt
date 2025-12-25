export const day29 = {
  day: 29,
  title: "Cloud Deployment (Containers, Registries, Runtime)",
  intro: "Deploying is just shipping a tested artifact to a runtime. Today we focus on practical, repeatable deployment.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Artifact flow: build image → push registry → deploy runtime.</li>
  <li>Why “build once, promote many” is critical.</li>
  <li>Runtime options: managed containers, PaaS, or Kubernetes.</li>
  <li>Operational basics: logs, metrics, alerting, and rollback.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Artifact Pipeline</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
CI builds image (myapp:sha)
  │
  ├─ push to registry
  └─ deploy same image tag to staging/prod
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Rollback = Deploy Previous Image</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If you deploy immutable artifacts, rollback is instant: choose the previous tag.
</p>
            `,
  code: `# Day 29: Container deployment flow (generic)

# Build locally (CI usually does this)
docker build -t myapp:dev .

# Tag + push to a registry (example names)
docker tag myapp:dev registry.example.com/myapp:abc123
docker push registry.example.com/myapp:abc123

# Deploy that tag in your runtime (PaaS/K8s/ECS/etc.)
# - update service to use image: registry.example.com/myapp:abc123
# - rollout
# - verify health/readiness
# - rollback by deploying the previous tag`,
  comparison: {
    junior: `// ❌ Mutable deployments
// build on server
// no artifact tracking
// rollback is painful`,
    senior: `// ✅ Immutable artifacts
// image tag = commit sha
// deploy exact tested artifact
// rollback = previous tag`
  },
  interview: {
    questions: [
      {
        q: "Why is deploying from a registry better than building on the server?",
        a: "It guarantees you deploy the tested artifact. Building on the server introduces untested differences and makes rollbacks and audits harder."
      },
      {
        q: "What is an immutable artifact?",
        a: "A build output that never changes once produced (e.g., Docker image tagged by commit SHA). It improves reproducibility and rollback."
      },
      {
        q: "What do you check after a production deploy?",
        a: "Health/readiness, error rate, p95 latency, key business metrics, and logs/traces for anomalies. Also confirm rollback path."
      }
    ]
  }
};
