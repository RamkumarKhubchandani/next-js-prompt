export const day03 = {
  "day": 3,
  "title": "Configuring the Store",
  "intro": "Connecting your slices to the store. configureStore sets up the Redux DevTools and middleware automatically.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Store Setup</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Import your slice reducers and pass them to <code>configureStore</code>.\n</p>\n",
  "code": "// Day 3: Store\nimport { configureStore } from '@reduxjs/toolkit';\nimport todoReducer from './todoSlice';\nimport userReducer from './userSlice';\n\nexport const store = configureStore({\n  reducer: {\n    todos: todoReducer,\n    user: userReducer\n  }\n});\n\n// Types for TS\nexport type RootState = ReturnType<typeof store.getState>;\nexport type AppDispatch = typeof store.dispatch;",
  "labSteps": [
    {
      "id": "redux-d3-lab",
      "title": "Adding Reducers",
      "subtitle": "Combining reducers",
      "teacherNote": "Add a new slice to the store.",
      "bugCode": "reducer: todoReducer // Wrong if you have multiple",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "reducer: { todos: todoReducer, auth: authReducer }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "The keys here determine the state shape."
      ]
    }
  ]
};