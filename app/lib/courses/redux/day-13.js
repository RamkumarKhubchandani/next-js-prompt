export const day13 = {
  "day": 13,
  "title": "Selectors & Reselect",
  "intro": "Memoizing derived data. If you calculate expensive data in mapStateToProps or useSelector, you need Reselect.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) createSelector</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    RTK re-exports <code>createSelector</code> from the reselect library.\n    It only re-calculates if input selectors change.\n</p>\n",
  "code": "// Day 13: Reselect\nimport { createSelector } from '@reduxjs/toolkit';\n\nconst selectItems = state => state.items;\nconst selectFilter = state => state.filter;\n\nexport const selectVisibleItems = createSelector(\n  [selectItems, selectFilter],\n  (items, filter) => {\n    // Expensive filtering logic\n    console.log(\"Filtering...\");\n    return items.filter(item => item.includes(filter));\n  }\n);",
  "labSteps": [
    {
      "id": "redux-d13-lab",
      "title": "Composition",
      "subtitle": "Chaining selectors",
      "teacherNote": "Use a selector as input to another.",
      "bugCode": "// Duplicating logic",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "const selectCount = createSelector(selectVisibleItems, items => items.length);",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Selectors are composable."
      ]
    }
  ]
};