export const day03 = {
  "day": 3,
  "title": "Updating State: Actions",
  "intro": "State updates in Zustand are immutable but simple. We explore the 'set' function and how to handle complex objects.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 3. Immutability. Zustand merges the top level, but it does NOT merge nested objects. You must spread them."
      },
      {
        "type": "challenge",
        "instruction": "This action accidentally deletes the `name` property because it replaces the entire `user` object. Fix it by spreading `state.user`.",
        "buggyCode": "// ❌ Deletes 'name'\nstate = { user: { name: 'Dan', age: 30 } }\nset(state => ({ user: { age: 31 } }))",
        "solutionCode": "// ✅ Preserves 'name'\nset(state => ({ \n  user: { ...state.user, age: 31 } \n}))",
        "verifyOutput": "...state.user",
        "successMessage": "Important! `set` only shallow merges the root. For nested state, you must manually spread (or use generic libraries like Immer).",
        "hint": "Use `{ ...state.user, age: 31 }`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Shallow Merging</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    <code>set</code> merges your changes at the top level. For nested state, you need to spread or use Immer.\n</p>\n",
  "code": "// Day 3: Updates\nconst useStore = create((set) => ({\n  user: { name: \"John\", age: 30 },\n  \n  // Shallow merge (works for top level)\n  updateName: (name) => set((state) => ({ \n    user: { ...state.user, name } \n  })),\n  \n  // Wrong way (overwrites user object completely if not careful)\n  // updateNameBad: (name) => set({ user: { name } }) // age is gone!\n}));",
  "labSteps": [
    {
      "id": "zustand-d3-lab",
      "title": "Nested Updates",
      "subtitle": "Spreading correctly",
      "teacherNote": "Update 'city' without losing 'street'.",
      "bugCode": "state = { address: { city: 'NY', street: '5th' } };\n// set({ address: { city: 'LA' } }) // Street is lost!",
      "bugFocus": {
        "fromLine": 2,
        "toLine": 2
      },
      "fixCode": "set(state => ({ address: { ...state.address, city: 'LA' } }))",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Always spread existing nested objects."
      ]
    }
  ]
};