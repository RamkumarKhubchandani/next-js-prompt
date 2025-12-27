export const day31 = {
  day: 31,
  title: "Kubernetes Essentials (Deploy a Node API Properly)",
  intro: "You don’t need to be a platform engineer, but you must understand how your app runs in a cluster: deployments, services, ingress, and probes.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Pods, Deployments, Services, and Ingress (the core building blocks).</li>
  <li>ConfigMaps vs Secrets (and how apps consume both).</li>
  <li>Health probes: liveness vs readiness (and why they prevent outages).</li>
  <li>Horizontal scaling: replicas + HPA basics.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Mental Model</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Deployment → creates ReplicaSet → creates Pods
Service    → stable virtual IP → routes to Pods
Ingress    → HTTP routing + TLS at the edge
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Probes Prevent Bad Rollouts</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
If your app boots but can’t talk to the DB yet, readiness should fail so traffic doesn’t hit it.
If your app is stuck/hung, liveness restarts it.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Config & Secrets</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">ConfigMap</span>: non-sensitive config (feature flags, public settings).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Secret</span>: credentials/keys (still be careful—treat as sensitive).</li>
</ul>
            `,
  code: `# Day 31: Minimal Kubernetes manifests (conceptual)

apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: registry.example.com/myapp:abc123
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"
          readinessProbe:
            httpGet:
              path: /readyz
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 10

---
apiVersion: v1
kind: Service
metadata:
  name: api-svc
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 3000`,
  comparison: {
    junior: `// ❌ "It runs locally" deploy
// - no readiness probes
// - no rolling updates configured
// - secrets in image or repo
// - manual restarts`,
    senior: `// ✅ Production Kubernetes basics
// - readiness + liveness endpoints
// - immutable images (tagged by SHA)
// - config/secrets injected at runtime
// - replicas + safe rollouts`
  },
  interview: {
    questions: [
      {
        q: "Deployment vs Service in Kubernetes?",
        a: "Deployment manages the desired number of Pods (replicas) and rolling updates. Service provides a stable virtual IP/DNS name and load-balances traffic to matching Pods."
      },
      {
        q: "Readiness vs liveness probes?",
        a: "Readiness gates traffic (is the app ready to serve?). Liveness restarts the container if it’s stuck/unhealthy. Mixing them up can cause outages or restart loops."
      },
      {
        q: "Why use an Ingress?",
        a: "Ingress provides HTTP routing and TLS termination at the edge, mapping external traffic to internal Services using host/path rules."
      }
    ]
  }
};
