export const day27 = {
  day: 27,
  title: "🔥 Retry with Exponential Backoff",
  intro: "Production-grade API retry logic. Handle network failures gracefully with smart retry strategies.",
  content: `
<div class="bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 p-4 rounded-xl mb-6">
<h4 class="text-rose-400 font-bold mb-2">🎯 Real-World Essential</h4>
<p class="text-gray-600 dark:text-light-300">Every production app needs retry logic. AWS SDKs, Stripe, and all major APIs use exponential backoff. Master it!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 Exponential Backoff Concept</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-700 dark:text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                EXPONENTIAL BACKOFF TIMELINE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Attempt 1: ──X (fail)                                          │
│             └── Wait 1s ──┐                                     │
│                           │                                     │
│  Attempt 2: ──────────────X (fail)                              │
│                           └── Wait 2s ──┐                       │
│                                         │                       │
│  Attempt 3: ────────────────────────────X (fail)                │
│                                         └── Wait 4s ──┐         │
│                                                       │         │
│  Attempt 4: ──────────────────────────────────────────✓ SUCCESS │
│                                                                 │
│  Formula: delay = baseDelay * (2 ^ attemptNumber) + jitter      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Key Features</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxRetries</code> - Maximum retry attempts</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">baseDelay</code> - Initial delay in ms</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxDelay</code> - Cap the maximum delay</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">jitter</code> - Random variance to prevent thundering herd</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">retryOn</code> - Condition function for retry</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Why Jitter?</h3>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600 mb-6">
<p class="text-gray-600 dark:text-light-300 text-sm">Without jitter, if 1000 clients fail at the same time, they ALL retry at exactly 1s, 2s, 4s... This "thundering herd" can crash your server. Jitter adds randomness so retries spread out.</p>
</div>
            `,
  masteryChecklist: [
    {
      id: "d27-c1",
      text: "I can explain exponential backoff and why fixed retry intervals can overload a recovering service."
    },
    {
      id: "d27-c2",
      text: "I can explain jitter and the thundering herd problem."
    },
    {
      id: "d27-c3",
      text: "I can implement retry with maxRetries and a retryOn predicate (don’t retry 4xx)."
    },
    {
      id: "d27-c4",
      text: "I can handle abort/cancel so retries stop immediately when the user navigates away."
    },
    {
      id: "d27-c5",
      text: "I can reason about idempotency and when retries are dangerous (e.g., POST without idempotency key)."
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔄 RETRY WITH EXPONENTIAL BACKOFF                                   ║
║  Production-grade retry logic for API calls                          ║
╠══════════════════════════════════════════════════════════════════════╣
║  Features: Exponential delay, jitter, max delay, abort signal        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ FULL-FEATURED RETRY FUNCTION
// ═══════════════════════════════════════════════════════════════════
async function retryWithBackoff(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    jitter = true,
    retryOn = () => true, // Retry on any error by default
    onRetry = () => {},   // Callback before each retry
    signal = null         // AbortSignal support
  } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Check if aborted
      if (signal?.aborted) {
        throw new Error('Retry aborted');
      }
      
      return await fn(attempt);
      
    } catch (error) {
      lastError = error;
      
      // Check if we should retry
      if (attempt >= maxRetries || !retryOn(error, attempt)) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      let delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      
      // Add jitter (±25% randomness)
      if (jitter) {
        const jitterAmount = delay * 0.25;
        delay += Math.random() * jitterAmount * 2 - jitterAmount;
      }
      
      // Notify before retry
      onRetry({ attempt, delay, error });
      
      // Wait before retry
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, delay);
        
        // Handle abort during wait
        if (signal) {
          signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Retry aborted'));
          }, { once: true });
        }
      });
    }
  }
  
  throw lastError;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ SIMPLE VERSION (for interviews)
// ═══════════════════════════════════════════════════════════════════
async function simpleRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries) throw error;
      await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ FETCH WITH RETRY WRAPPER
// ═══════════════════════════════════════════════════════════════════
async function fetchWithRetry(url, options = {}, retryOptions = {}) {
  return retryWithBackoff(
    async () => {
      const response = await fetch(url, options);
      
      // Retry on server errors (5xx) but not client errors (4xx)
      if (response.status >= 500) {
        throw new Error(\`Server error: \${response.status}\`);
      }
      
      if (!response.ok) {
        throw new Error(\`HTTP error: \${response.status}\`);
      }
      
      return response;
    },
    {
      ...retryOptions,
      retryOn: (error) => {
        // Retry on network errors and 5xx
        return error.message.includes('Server error') || 
               error.message.includes('fetch');
      }
    }
  );
}

// ═══════════════════════════════════════════════════════════════════
// ✅ CONSOLE DEMO (iframe-friendly: no React/JSX)
// ═══════════════════════════════════════════════════════════════════
console.clear();

let attempt = 0;
async function flaky() {
  attempt++;
  // Fail first 2 attempts, succeed on 3rd
  if (attempt <= 2) throw new Error("Server error: 503");
  return { ok: true, attempt };
}

retryWithBackoff(flaky, {
  maxRetries: 4,
  baseDelay: 200,
  maxDelay: 2000,
  jitter: true,
  retryOn: (err) => String(err && err.message || "").includes("503"),
  onRetry: ({ attempt, delay, error }) => {
    console.log("retry", attempt, "delay(ms)", Math.round(delay), "error:", error.message);
  }
}).then(
  (res) => console.log("success:", res),
  (err) => console.log("failed:", err.message)
);`,
  recap: {
    takeaways: [
      "Exponential backoff reduces load while a service is recovering.",
      "Jitter prevents synchronized retries (thundering herd).",
      "Never retry everything: check status codes, idempotency, and abort signals.",
      "Design retry as a reusable utility: retryOn + onRetry hooks."
    ],
    commonMistakes: [
      "Retrying 4xx client errors (won't help).",
      "Retrying non-idempotent writes without idempotency keys.",
      "No jitter, causing burst retries that keep the system down."
    ],
    nextActions: [
      "Add an AbortController and cancel during the delay loop.",
      "Add per-error-type policies (network errors vs rate limits vs 5xx)."
    ]
  },
  comparison: {
    junior: `// ❌ No retry logic
async function fetchData() {
  const res = await fetch('/api/data');
  return res.json();
}
// Network blip = user sees error`,
    senior: `// ✅ Production retry with backoff
async function fetchData() {
  return retryWithBackoff(
    () => fetch('/api/data').then(r => r.json()),
    {
      maxRetries: 3,
      baseDelay: 1000,
      retryOn: (err) => err.name !== 'AbortError',
      onRetry: ({ attempt, delay }) => {
        console.log(\`Retry \${attempt} in \${delay}ms\`);
      }
    }
  );
}`
  },
  interview: {
    questions: [
      {
        q: "Why exponential backoff instead of fixed delay?",
        a: "Gives the server time to recover. If server is overloaded, hammering it every 1s makes it worse. Exponential delay (1s, 2s, 4s, 8s) reduces load progressively."
      },
      {
        q: "What is jitter and why use it?",
        a: "Random variance in delay timing. Prevents 'thundering herd' where many clients retry at exact same moment after a failure, potentially crashing the recovering server."
      },
      {
        q: "When should you NOT retry?",
        a: "Client errors (4xx) - request is invalid, retrying won't help. Idempotency issues - don't retry POST that might duplicate data. Auth errors - token is invalid."
      },
      {
        q: "How to handle abort during retry?",
        a: "Use AbortController. Pass signal to options, check signal.aborted before each attempt, and listen for abort event during delay to cancel the timeout."
      }
    ]
  }
};
