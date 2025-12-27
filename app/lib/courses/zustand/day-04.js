export const day04 = {
  "day": 4,
  "title": "Selecting State: Performance",
  "intro": "The secret to Zustand's speed is Selectors. Learn how to subscribe to only the data you need to prevent unnecessary re-renders.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Auto-Selectors</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    By default, Zustand detects strict equality (===). If you return a new object, it will re-render.\n</p>\n",
  "code": "// Day 4: Selectors\n\n// 1. Good: Primitive (Re-renders only if 'bears' changes)\nconst bears = useStore((state) => state.bears);\n\n// 2. Bad: New Object (Re-renders EVERY time)\nconst { bears, fish } = useStore((state) => ({ \n  bears: state.bears, \n  fish: state.fish \n})); \n\n// 3. Fix for #2: shallow comparison\nimport { useShallow } from 'zustand/react/shallow';\nconst { bears, fish } = useStore(\n  useShallow((state) => ({ bears: state.bears, fish: state.fish }))\n);",
  "labSteps": [
    {
      "id": "zustand-d4-lab",
      "title": "Fixing Rerenders",
      "subtitle": "Atomic Selection",
      "teacherNote": "Select only what you need.",
      "bugCode": "const state = useStore(); // Selects EVERYTHING",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "const count = useStore(s => s.count); // Selects only count",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "The component won't re-render if other state changes."
      ]
    }
  ]
};