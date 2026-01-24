export const day16 = {
  "day": 16,
  "title": "Atomic State",
  "intro": "Breaking down complex state into atoms. Recoil-like patterns in Zustand.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 16. Atomic State. If your state is truly independent, use separate stores for each 'atom'."
      },
      {
        "type": "challenge",
        "instruction": "We have two independent atoms (`text` and `count`). Create a hook that combines them for convenience.",
        "buggyCode": "// ❌ Manual repetition\nconst text = useText();\nconst count = useCount();",
        "solutionCode": "// ✅ Composed Hook\nconst useApp = () => ({ text: useText(), count: useCount() });",
        "verifyOutput": "useText()",
        "successMessage": "Composition wins. You can build a 'facade' hook that aggregates multiple stores.",
        "hint": "Create a function that returns an object calling both hooks."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Atoms</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Instead of one big object, use many small stores.\n</p>\n",
  "code": "// Day 16: Atomic\nconst useTextState = create(() => \"hello\");\nconst useCountState = create(() => 0);\n\nfunction App() {\n  const text = useTextState();\n  const count = useCountState();\n}",
  "labSteps": [
    {
      "id": "zustand-d16-lab",
      "title": "Composition",
      "subtitle": "Combining atoms",
      "teacherNote": "Create a derived hook.",
      "bugCode": "// Manually calling both hooks everywhere",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "const useCombined = () => ({ text: useTextState(), count: useCountState() })",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Compose hooks for cleaner API."
      ]
    }
  ]
};