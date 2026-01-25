export const day08 = {
  "day": 8,
  "title": "Computed State",
  "intro": "Deriving state from other state. Should you store it or calculate it? We explore the best patterns.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 8. Computed Values. Don't store `fullName` if you already have `firstName` and `lastName`. Derive it."
      },
      {
        "type": "challenge",
        "instruction": "We are wasting memory by storing `total` in the state. Calculate it in the selector instead.",
        "buggyCode": "// ❌ Redundant State\nconst useStore = create((set) => ({\n  price: 10,\n  tax: 2,\n  total: 12,\n  updatePrice: (p) => set({ price: p, total: p + 2 }) // Duplicated logic\n}));",
        "solutionCode": "// ✅ Derived Calculation\nconst useStore = create((set) => ({ price: 10, tax: 2 }));\n// Selector derives it:\nconst total = useStore(s => s.price + s.tax);",
        "verifyOutput": "useStore(s => s.price + s.tax)",
        "successMessage": "Efficiency! Storing derived state leads to synchronization bugs. Always verify 'can I calculate this?' before storing it.",
        "hint": "Remove `total` from the store and put the calculation inside `useStore(s => ...)`."
      }
    ]
  },
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