export const day11 = {
  "day": 11,
  "title": "Middleware",
  "intro": "Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Custom Middleware</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Useful for logging, crash reporting, or async logic (like Thunks/Sagas).\n</p>\n",
  "code": "// Day 11: Middleware\n\nconst loggerMiddleware = store => next => action => {\n  console.log('dispatching', action);\n  let result = next(action);\n  console.log('next state', store.getState());\n  return result;\n};\n\nconst store = configureStore({\n  reducer: rootReducer,\n  middleware: (getDefaultMiddleware) => \n    getDefaultMiddleware().concat(loggerMiddleware),\n});",
  "labSteps": [
    {
      "id": "redux-d11-lab",
      "title": "Analytics",
      "subtitle": "Tracking actions",
      "teacherNote": "Send event on specific action.",
      "bugCode": "// Checking action type string manually",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "if (action.type === 'user/login') { track('login'); }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Middleware sees every action."
      ]
    }
  ]
};