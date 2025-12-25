export const day03 = {
  "day": 3,
  "title": "Updating State: Actions",
  "intro": "State updates in Zustand are immutable but simple. We explore the 'set' function and how to handle complex objects.",
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