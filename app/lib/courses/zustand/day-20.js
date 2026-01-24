export const day20 = {
  "day": 20,
  "title": "Enterprise Architecture",
  "intro": "Structuring a large-scale application with Zustand. Folder structure, testing strategy, and best practices.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 20. Architecture. Don't export your store directly. Export a hook facade."
      },
      {
        "type": "challenge",
        "instruction": "This code exports the raw store, allowing any component to mutate it arbitrarily. Fix it by exporting a custom hook that checks inputs.",
        "buggyCode": "// ❌ Leaking implementation details\nexport const useStore = create(...);",
        "solutionCode": "// ✅ Facade pattern\nconst useStoreBase = create(...);\nexport const useStore = () => useStoreBase(s => s.publicData);",
        "verifyOutput": "useStoreBase",
        "successMessage": "Excellent. Facades behave like an API layer for your state, protecting your components from breaking changes in the store structure.",
        "hint": "Rename the original store to `useStoreBase` (not exported) and create a wrapper."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Facade Pattern</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Hide the store behind a custom hook facade to decouple components from Zustand.\n</p>\n",
  "code": "// Day 20: Architecture\n\n// internal store\nconst _useStore = create(...);\n\n// public facade\nexport function useCounter() {\n  const count = _useStore(s => s.count);\n  const inc = _useStore(s => s.inc);\n  return { count, inc };\n}",
  "labSteps": [
    {
      "id": "zustand-d20-lab",
      "title": "Feature Folders",
      "subtitle": "Colocation",
      "teacherNote": "Keep store near usage.",
      "bugCode": "/stores/allStores.js",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "/features/cart/cartStore.js",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Scales better than a central folder."
      ]
    }
  ]
};