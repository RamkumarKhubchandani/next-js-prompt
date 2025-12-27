export const day20 = {
  "day": 20,
  "title": "Enterprise Architecture",
  "intro": "Structuring a large-scale application with Zustand. Folder structure, testing strategy, and best practices.",
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