export const day12 = {
  "day": 12,
  "title": "EntityAdapter",
  "intro": "Managing normalized state (IDs and Entities) is common. EntityAdapter generates reducers and selectors for you.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Normalization</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Instead of arrays <code>[{ id: 1 }, { id: 2 }]</code>, use objects <code>{ ids: [1, 2], entities: { 1: {...}, 2: {...} } }</code>.\n    This makes lookups O(1).\n</p>\n",
  "code": "// Day 12: EntityAdapter\nimport { createEntityAdapter, createSlice } from '@reduxjs/toolkit';\n\nconst usersAdapter = createEntityAdapter();\n\nconst usersSlice = createSlice({\n  name: 'users',\n  initialState: usersAdapter.getInitialState(),\n  reducers: {\n    userAdded: usersAdapter.addOne,\n    usersReceived: usersAdapter.setAll,\n    userUpdated: usersAdapter.updateOne,\n  },\n});\n\nexport const { selectAll, selectById } = usersAdapter.getSelectors(state => state.users);",
  "labSteps": [
    {
      "id": "redux-d12-lab",
      "title": "Sorting",
      "subtitle": "Sorted adapter",
      "teacherNote": "Keep entities sorted by name.",
      "bugCode": "createEntityAdapter() // No sort",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "createEntityAdapter({ sortComparer: (a, b) => a.name.localeCompare(b.name) })",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "selectAll will now return sorted array."
      ]
    }
  ]
};