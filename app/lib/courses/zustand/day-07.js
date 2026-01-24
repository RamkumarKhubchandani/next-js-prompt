export const day07 = {
  "day": 7,
  "title": "Middleware: Persist & DevTools",
  "intro": "Zustand has a powerful middleware system. We'll learn how to persist state to localStorage and connect to Redux DevTools.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 7. Persist Middleare. Saving state to LocalStorage is usually hard. In Zustand, it's one line of code."
      },
      {
        "type": "challenge",
        "instruction": "This usage of `persist` is incorrect because it's missing the required `name` option, which acts as the keys in localStorage.",
        "buggyCode": "// ❌ Missing name\nconst useStore = create(persist((set) => ({ bears: 0 }), {}));",
        "solutionCode": "// ✅ Required name\nconst useStore = create(persist((set) => ({ bears: 0 }), { name: 'bear-storage' }));",
        "verifyOutput": "name: 'bear-storage'",
        "successMessage": "Correct! The `name` is crucial—it matches the key in localStorage. Without it, persist doesn't work.",
        "hint": "Add `{ name: 'some-unique-name' }` as the second argument."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Persist Middleware</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Automatically save your store to localStorage, sessionStorage, or AsyncStorage.\n</p>\n",
  "code": "// Day 7: Middleware\nimport { create } from 'zustand';\nimport { persist, devtools } from 'zustand/middleware';\n\nconst useStore = create(\n  devtools(\n    persist(\n      (set) => ({\n        bears: 0,\n        increase: () => set((state) => ({ bears: state.bears + 1 })),\n      }),\n      {\n        name: 'bear-storage', // unique name\n      }\n    )\n  )\n);",
  "labSteps": [
    {
      "id": "zustand-d7-lab",
      "title": "Partial Persistence",
      "subtitle": "Saving only some fields",
      "teacherNote": "Don't save 'loading' state.",
      "bugCode": "persist(..., { name: 'store' }) // Saves everything",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "persist(..., { name: 'store', partialize: (state) => ({ bears: state.bears }) })",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Use 'partialize' to whitelist fields."
      ]
    }
  ]
};