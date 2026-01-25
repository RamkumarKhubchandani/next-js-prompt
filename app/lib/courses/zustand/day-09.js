export const day09 = {
  "day": 9,
  "title": "Zustand Outside React",
  "intro": "Zustand stores are just vanilla JS objects. You can use them in utility functions, event listeners, or anywhere else.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 9. Vanilla JS Usage. You can use Zustand outside of components. It's just a variable."
      },
      {
        "type": "challenge",
        "instruction": "This non-React function crashes because `useStore()` throws an error when used outside a component (Hooks rule). Use `getState()` instead.",
        "buggyCode": "// ❌ Helper function\nfunction logCount() {\n  const count = useStore().count; // Error: Hooks can only be called inside components\n  console.log(count);\n}",
        "solutionCode": "// ✅ Vanilla Access\nfunction logCount() {\n  const count = useStore.getState().count;\n  console.log(count);\n}",
        "verifyOutput": "useStore.getState()",
        "successMessage": "You got it. `getState()` is your backdoor to access state in events, intervals, and API helpers.",
        "hint": "Replace call to hook with `useStore.getState().count`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) getState and setState</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Every hook created by <code>create</code> has <code>.getState()</code> and <code>.setState()</code> methods attached to it.\n</p>\n",
  "code": "// Day 9: Vanilla Usage\nconst useStore = create(() => ({ count: 0 }));\n\n// 1. Read\nconst count = useStore.getState().count;\n\n// 2. Write\nuseStore.setState({ count: 1 });\n\n// 3. Subscribe\nconst unsub = useStore.subscribe((state) => {\n  console.log(\"New count:\", state.count);\n});",
  "labSteps": [
    {
      "id": "zustand-d9-lab",
      "title": "Auth Token",
      "subtitle": "Using store in API client",
      "teacherNote": "Inject token from store into fetch.",
      "bugCode": "// How to get token inside a non-React function?",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "const token = useAuthStore.getState().token;",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Very useful for Axios interceptors."
      ]
    }
  ]
};