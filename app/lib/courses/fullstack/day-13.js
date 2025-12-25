export const day13 = {
  day: 13,
  title: "Load Balancing & NGINX",
  intro: "Distribute traffic across multiple servers.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Load balancer vs reverse proxy (and where NGINX fits).</li>
  <li>Health checks, timeouts, and retries (the “stability knobs”).</li>
  <li>Sticky sessions (when needed) vs stateless services (ideal).</li>
  <li>Rate limiting and basic edge security.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) NGINX as Reverse Proxy</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
NGINX can terminate TLS, compress responses, cache, rate limit, and distribute traffic across upstream servers.
It becomes the “edge” in front of your Node instances.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
Internet → NGINX (TLS, rate limit) → Node A
                            └────→ Node B
                            └────→ Node C
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Timeouts (Prevent Hanging Requests)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
In production, “infinite” timeouts create resource leaks. Always set sensible timeouts at the proxy and the app.
</p>
            `,
  code: `# Day 13: NGINX reverse proxy + load balancing (example)

upstream app_servers {
  least_conn;
  server 10.0.0.1:3000 max_fails=3 fail_timeout=10s;
  server 10.0.0.2:3000 max_fails=3 fail_timeout=10s;
}

server {
  listen 80;
  server_name example.com;

  # Basic rate limit (protect your app)
  limit_req_zone $binary_remote_addr zone=perip:10m rate=10r/s;

  location / {
    limit_req zone=perip burst=20 nodelay;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Request-Id $request_id;

    proxy_connect_timeout 3s;
    proxy_send_timeout 30s;
    proxy_read_timeout 30s;

    proxy_pass http://app_servers;
  }
}`,
  comparison: {
    junior: `// ❌ Single Point of Failure
// One server crashes
// Website is Down`,
    senior: `// ✅ Load Balancer
// Detects server crash
// Routes traffic to healthy servers`
  },
  interview: {
    questions: [
      {
        q: "Round Robin vs Least Connections?",
        a: "Round robin distributes evenly in order. Least connections is better when requests have variable duration because it sends traffic to the least-busy server."
      },
      {
        q: "Why add timeouts at the reverse proxy?",
        a: "To prevent hung upstream connections from consuming resources indefinitely. Timeouts protect the system and improve failure behavior under load."
      },
      {
        q: "What headers should a proxy add for apps behind it?",
        a: "X-Forwarded-For / X-Real-IP for client IP, X-Request-Id for tracing, and Host for correct routing; plus TLS termination implies forwarding scheme (X-Forwarded-Proto)."
      }
    ]
  }
};
