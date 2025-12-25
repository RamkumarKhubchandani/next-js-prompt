export const day24 = {
  day: 24,
  title: "Real-time UI (WebSockets + RxJS + Backpressure)",
  intro: "Build real-time features without melting the UI: streams, throttling, and proper teardown.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Real-time Rule</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">Throttle UI updates. Aggregate events. Clean up subscriptions on destroy.</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Don’t Render Every Packet</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If you render on every message, the UI will stutter. Batch or throttle updates and render at human-friendly intervals.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Teardown is Required</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Real-time streams live forever. Use async pipe or explicit teardown so sockets and subscriptions don’t leak.
</p>
            `,
  code: `// Stream pattern:
// wsMessages$.pipe(throttleTime(100), scan(reducer, initialState))`,
  comparison: {
    junior: "// ❌ render every event",
    senior: "// ✅ throttle + aggregate + teardown"
  },
  interview: {
    questions: [
      {
        q: "What is backpressure?",
        a: "A strategy to prevent producers from overwhelming consumers. In UI, it means throttling/buffering so rendering keeps up."
      },
      {
        q: "How do you avoid memory leaks with streams?",
        a: "Use async pipe, takeUntil(destroy$), or framework-integrated teardown patterns."
      },
      {
        q: "When to use WebSockets vs polling?",
        a: "WebSockets for frequent real-time updates; polling for low-frequency updates or simpler infra."
      }
    ]
  }
};
