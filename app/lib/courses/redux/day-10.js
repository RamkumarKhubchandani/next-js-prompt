export const day10 = {
  "day": 10,
  "title": "RTK Query: Optimistic Updates",
  "intro": "Make your app feel instant. Update the UI immediately before the server responds, and rollback if it fails.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) onQueryStarted</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Use this lifecycle method to manually update the cache.\n</p>\n",
  "code": "// Day 10: Optimistic UI\nupdatePost: builder.mutation({\n  query: ({ id, ...patch }) => ({\n    url: `post/${id}`,\n    method: 'PATCH',\n    body: patch,\n  }),\n  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {\n    const patchResult = dispatch(\n      api.util.updateQueryData('getPost', id, (draft) => {\n        Object.assign(draft, patch);\n      })\n    );\n    try {\n      await queryFulfilled;\n    } catch {\n      patchResult.undo();\n    }\n  },\n}),",
  "labSteps": [
    {
      "id": "redux-d10-lab",
      "title": "Undo Patch",
      "subtitle": "Rollback on error",
      "teacherNote": "Ensure we undo if the request fails.",
      "bugCode": "// No try/catch block around queryFulfilled",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "catch { patchResult.undo(); }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Crucial for data consistency."
      ]
    }
  ]
};