export const day02 = {
  "day": 2,
  "title": "Creating Your First Store",
  "intro": "Let's build a real store. We'll look at the 'create' function, state initialization, and consuming it in components.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 2. Updates. The `set` function is your precision tool. Always check if you need the *previous* state."
      },
      {
        "type": "challenge",
        "instruction": "This action fails because `bears` is not in scope. Use the callback form of `set` to access the current state.",
        "buggyCode": "// ❌ 'bears' is undefined here\ninc: () => set({ bears: bears + 1 })",
        "solutionCode": "// ✅ Access state via callback\ninc: () => set((state) => ({ bears: state.bears + 1 }))",
        "verifyOutput": "state.bears",
        "successMessage": "Spot on. To update based on previous state (incrementing, toggling), pass a callback to `set`.",
        "hint": "Use `set((state) => ({ ... }))`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Store Pattern</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Zustand stores are hooks. You don't need a provider.\n    State and Actions live together.\n</p>\n",
  "code": "// Day 2: First Store\nimport { create } from 'zustand';\n\ninterface BearState {\n  bears: number;\n  increase: (by: number) => void;\n}\n\nconst useStore = create<BearState>((set) => ({\n  bears: 0,\n  increase: (by) => set((state) => ({ bears: state.bears + by })),\n}));\n\n// Component\nfunction App() {\n  const bears = useStore((state) => state.bears);\n  const increase = useStore((state) => state.increase);\n  \n  return <button onClick={() => increase(1)}>{bears}</button>;\n}",
  "labSteps": [
    {
      "id": "zustand-d2-lab",
      "title": "Adding Actions",
      "subtitle": "Reset Action",
      "teacherNote": "Add a reset function.",
      "bugCode": "// Store has no reset\nconst useStore = create(set => ({ count: 0 }));",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 2
      },
      "fixCode": "const useStore = create(set => ({ count: 0, reset: () => set({ count: 0 }) }));",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Actions are just functions in the store."
      ]
    }
  ]
};