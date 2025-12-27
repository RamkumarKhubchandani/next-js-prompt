export const day16 = {
  "day": 16,
  "title": "Code Splitting",
  "intro": "Injecting reducers on the fly. Don't load the entire admin reducer for a guest user.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) replaceReducer</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    The store has a <code>replaceReducer</code> method. Use it to add new slices dynamically.\n</p>\n",
  "code": "// Day 16: Code Splitting\n\nconst store = configureStore({ reducer: staticReducers });\n\nfunction injectReducer(key, asyncReducer) {\n  store.asyncReducers[key] = asyncReducer;\n  store.replaceReducer(createReducer(store.asyncReducers));\n}",
  "labSteps": [
    {
      "id": "redux-d16-lab",
      "title": "Reducer Manager",
      "subtitle": "Utility",
      "teacherNote": "Use a manager to handle injection.",
      "bugCode": "// Manual replacement is error prone",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "const manager = createReducerManager(initialReducers);",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "See Redux docs for full implementation."
      ]
    }
  ]
};