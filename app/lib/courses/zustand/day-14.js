export const day14 = {
  "day": 14,
  "title": "Subscribe & Side Effects",
  "intro": "Reacting to state changes outside of components. Logging, analytics, or syncing with other libraries.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 14. Side Effects. You can listen to specific state slices changes outside of React."
      },
      {
        "type": "challenge",
        "instruction": "This subscription fires on *every* state change. Optimize it to only fire when `token` changes.",
        "buggyCode": "// ❌ Fires too often\nuseStore.subscribe((state) => console.log('Token:', state.token));",
        "solutionCode": "// ✅ Selective subscription\nuseStore.subscribe((state) => state.token, (token) => console.log('Token:', token));",
        "verifyOutput": "useStore.subscribe((state) => state.token",
        "successMessage": "Precision. By passing a selector as the first argument, the callback (second argument) only runs when the selected value changes.",
        "hint": "Pass two arguments to subscribe: a selector and a callback."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The subscribe method</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    <code>useStore.subscribe(selector, callback)</code> allows you to listen to specific changes.\n</p>\n",
  "code": "// Day 14: Subscribe\n\n// Log whenever 'user' changes\nconst unsub = useStore.subscribe(\n  (state) => state.user,\n  (user, previousUser) => {\n    console.log(\"User changed from\", previousUser, \"to\", user);\n    analytics.identify(user.id);\n  }\n);",
  "labSteps": [
    {
      "id": "zustand-d14-lab",
      "title": "Syncing Stores",
      "subtitle": "Connecting two stores",
      "teacherNote": "Update Store B when Store A changes.",
      "bugCode": "// Manual sync in components",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "useStoreA.subscribe(s => s.token, token => useStoreB.setState({ token }))",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Reactive glue code."
      ]
    }
  ]
};