export const day20 = {
  "day": 20,
  "title": "Domain Driven Design",
  "intro": "Structuring Redux for large teams. Feature-based slices, selectors, and types.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Feature Folders</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Group everything related to a feature (slice, selectors, thunks, components) in one folder.\n    \"Ducks\" pattern or \"Feature Slices\".\n</p>\n",
  "code": "// Day 20: DDD\n// /features/users/\n//   - userSlice.ts\n//   - userSelectors.ts\n//   - userThunks.ts\n//   - UserList.tsx",
  "labSteps": [
    {
      "id": "redux-d20-lab",
      "title": "Public API",
      "subtitle": "index.ts",
      "teacherNote": "Export only what is needed.",
      "bugCode": "import { internalHelper } from './users/internal';",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "import { UserList } from './users';",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Enforce boundaries with index files."
      ]
    }
  ]
};