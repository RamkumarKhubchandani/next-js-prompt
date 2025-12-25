export const day08 = {
  "day": 8,
  "title": "Computed State",
  "intro": "Deriving state from other state. Should you store it or calculate it? We explore the best patterns.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Derivation in Selector</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    The best way to handle computed state is to calculate it inside the selector.\n</p>\n",
  "code": "// Day 8: Computed\nconst useStore = create((set) => ({\n  firstName: 'John',\n  lastName: 'Doe',\n}));\n\n// Computed in component (Recommended)\nconst fullName = useStore((state) => `${state.firstName} ${state.lastName}`);\n\n// Computed in store (If complex)\nconst useStoreWithComputed = create((set, get) => ({\n  firstName: 'John',\n  lastName: 'Doe',\n  get fullName() {\n    return `${get().firstName} ${get().lastName}`;\n  }\n}));",
  "labSteps": [
    {
      "id": "zustand-d8-lab",
      "title": "Memoized Selectors",
      "subtitle": "Expensive calculations",
      "teacherNote": "Use useCallback or useShallow if needed.",
      "bugCode": "const expensive = useStore(s => s.items.filter(...)); // Runs on every render",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "const expensive = useStore(useShallow(s => s.items.filter(...)));",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "useShallow prevents rerenders if the result array content is the same."
      ]
    }
  ]
};