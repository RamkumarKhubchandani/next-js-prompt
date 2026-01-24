export const day17 = {
  "day": 17,
  "title": "Integrations",
  "intro": "Using Zustand with Immer, React Query, and other libraries.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 17. Immer Middleware. If you hate spreading objects (`...state.nested.obj`), Immer lets you mutate state directly."
      },
      {
        "type": "challenge",
        "instruction": "This reducer tries to mutate state but without Immer, it does nothing or crashes. Wrap it in `immer`.",
        "buggyCode": "// ❌ Mutation without Immer\nconst useStore = create((set) => ({\n  inc: () => set(state => { state.count++ })\n}));",
        "solutionCode": "// ✅ Mutation with Immer\nconst useStore = create(immer((set) => ({\n  inc: () => set(state => { state.count++ })\n})));",
        "verifyOutput": "immer((set)",
        "successMessage": "Magic. `immer` wraps your store so you can write mutable logic that produces immutable updates.",
        "hint": "Import `immer` and wrap the creator function: `create(immer(...))`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Immer Middleware</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Simplify nested updates.\n</p>\n",
  "code": "// Day 17: Immer\nimport { immer } from 'zustand/middleware/immer';\n\nconst useStore = create(\n  immer((set) => ({\n    nested: { obj: { count: 0 } },\n    inc: () =>\n      set((state) => {\n        state.nested.obj.count += 1; // Mutation allowed!\n      }),\n  }))\n);",
  "labSteps": [
    {
      "id": "zustand-d17-lab",
      "title": "React Query",
      "subtitle": "Syncing server state",
      "teacherNote": "Store query result in Zustand?",
      "bugCode": "// Storing everything in Zustand",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "// Use React Query for cache, Zustand for filters/UI state",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Don't duplicate server cache."
      ]
    }
  ]
};