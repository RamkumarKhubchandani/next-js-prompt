export const day05 = {
  "day": 5,
  "title": "Immer & Immutability",
  "intro": "Redux state must be immutable. RTK uses Immer to let you write 'mutating' logic that is safely converted.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Magic of Immer</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    You can write <code>state.push()</code> or <code>state.x = 123</code> inside <code>createSlice</code>.\n    Immer tracks these changes and produces a new immutable state.\n</p>\n",
  "code": "// Day 5: Immer\nconst slice = createSlice({\n  name: 'test',\n  initialState: { items: [] },\n  reducers: {\n    // Mutable syntax (OK in RTK)\n    addItem: (state, action) => {\n      state.items.push(action.payload);\n    },\n    // Immutable syntax (Classic Redux - also OK)\n    addItemOld: (state, action) => {\n      return {\n        ...state,\n        items: [...state.items, action.payload]\n      };\n    }\n  }\n});",
  "labSteps": [
    {
      "id": "redux-d5-lab",
      "title": "Direct Mutation",
      "subtitle": "Simplifying updates",
      "teacherNote": "Use assignment instead of spread.",
      "bugCode": "return { ...state, value: 123 };",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "state.value = 123;",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Much cleaner code with Immer."
      ]
    }
  ]
};