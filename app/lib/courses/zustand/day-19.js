export const day19 = {
  "day": 19,
  "title": "Performance",
  "intro": "Profiling your store. Identifying unnecessary re-renders and optimizing selectors.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Profiler</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Use React DevTools Profiler to see which components render when state changes.\n</p>\n",
  "code": "// Day 19: Optimization\n// Use transient updates for animations\n// Use shallow for object selection\n// Split stores for code splitting",
  "labSteps": [
    {
      "id": "zustand-d19-lab",
      "title": "Batched Updates",
      "subtitle": "React 18",
      "teacherNote": "React 18 batches automatically.",
      "bugCode": "unstable_batchedUpdates(() => { set1(); set2(); })",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "set1(); set2(); // Auto-batched in React 18",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "No need for manual batching anymore."
      ]
    }
  ]
};