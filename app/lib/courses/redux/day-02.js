export const day02 = {
  "day": 2,
  "title": "Slices: Reducers & Actions",
  "intro": "The Slice is the heart of RTK. It combines the reducer and action creators into one concise file.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Anatomy of a Slice</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    <code>createSlice</code> takes a name, initial state, and a reducers object. It returns the reducer and auto-generated actions.\n</p>\n",
  "code": "// Day 2: Slices\nimport { createSlice } from '@reduxjs/toolkit';\n\nconst todoSlice = createSlice({\n  name: 'todos',\n  initialState: [],\n  reducers: {\n    addTodo: (state, action) => {\n      state.push({ id: Date.now(), text: action.payload, completed: false });\n    },\n    toggleTodo: (state, action) => {\n      const todo = state.find(t => t.id === action.payload);\n      if (todo) {\n        todo.completed = !todo.completed;\n      }\n    }\n  }\n});\n\nexport const { addTodo, toggleTodo } = todoSlice.actions;\nexport default todoSlice.reducer;",
  "labSteps": [
    {
      "id": "redux-d2-lab",
      "title": "Payloads",
      "subtitle": "Using action.payload",
      "teacherNote": "Access the data passed to the action.",
      "bugCode": "addTodo: (state, action) => { state.push(action); } // Pushes the whole action object!",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "addTodo: (state, action) => { state.push(action.payload); }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "The data is always in .payload"
      ]
    }
  ]
};