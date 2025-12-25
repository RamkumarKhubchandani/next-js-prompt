export const day07 = {
  "day": 7,
  "title": "Loading & Error States",
  "intro": "Managing the lifecycle of an async request. Best practices for tracking loading status and displaying errors.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Standard Pattern</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Use an enum or string union for status: <code>'idle' | 'loading' | 'succeeded' | 'failed'</code>.\n</p>\n",
  "code": "// Day 7: Async Lifecycle\nconst slice = createSlice({\n  name: 'posts',\n  initialState: {\n    status: 'idle',\n    error: null\n  },\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchPosts.pending, (state) => {\n        state.status = 'loading';\n      })\n      .addCase(fetchPosts.fulfilled, (state) => {\n        state.status = 'succeeded';\n      })\n      .addCase(fetchPosts.rejected, (state, action) => {\n        state.status = 'failed';\n        state.error = action.error.message;\n      });\n  }\n});",
  "labSteps": [
    {
      "id": "redux-d7-lab",
      "title": "Resetting Status",
      "subtitle": "Cleanup",
      "teacherNote": "Add an action to reset error.",
      "bugCode": "// Error persists forever",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "reducers: { resetError: (state) => { state.status = 'idle'; state.error = null; } }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Always provide a way to clear errors."
      ]
    }
  ]
};