export const day17 = {
  "day": 17,
  "title": "SSR with Redux",
  "intro": "Hydrating state from the server. Next.js integration with next-redux-wrapper.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) HYDRATE Action</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    You need to handle a special HYDRATE action to merge server state into client state.\n</p>\n",
  "code": "// Day 17: SSR\nimport { HYDRATE } from 'next-redux-wrapper';\n\nconst reducer = (state, action) => {\n  if (action.type === HYDRATE) {\n    return { ...state, ...action.payload };\n  }\n  return combinedReducer(state, action);\n};",
  "labSteps": [
    {
      "id": "redux-d17-lab",
      "title": "Server Actions",
      "subtitle": "Dispatching on server",
      "teacherNote": "Dispatch in getServerSideProps.",
      "bugCode": "// Dispatching in component only",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "store.dispatch(fetchUser()); // In gSSP",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Pre-fills the store before render."
      ]
    }
  ]
};