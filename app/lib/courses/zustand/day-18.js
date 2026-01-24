export const day18 = {
  "day": 18,
  "title": "State Machines",
  "intro": "Implementing finite state machines (FSM) inside Zustand for predictable transitions.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 18. State Machines. Sometimes `isLoading` boolean isn't enough. You need `idle` -> `loading` -> `success`."
      },
      {
        "type": "challenge",
        "instruction": "This reducer allows a transition from `error` to `success` without `loading`, which is a bug. Fix the logic.",
        "buggyCode": "case 'error':\n  if (action === 'SUCCESS') return { status: 'success' }; // ❌ magic fix?",
        "solutionCode": "case 'error':\n  if (action === 'RETRY') return { status: 'loading' }; // ✅ must retry first",
        "verifyOutput": "status: 'loading'",
        "successMessage": "Correct. FSMs force you to define *explicit* paths. You can't just jump from error to success without retrying.",
        "hint": "Change the return state to `loading`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Reducer Pattern</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    You can use a reducer inside Zustand to enforce transitions.\n</p>\n",
  "code": "// Day 18: FSM\nconst useStore = create((set) => ({\n  status: 'idle',\n  dispatch: (action) => set((state) => reducer(state, action)),\n}));\n\nfunction reducer(state, action) {\n  switch (state.status) {\n    case 'idle':\n      if (action === 'FETCH') return { status: 'loading' };\n      break;\n    // ...\n  }\n  return state;\n}",
  "labSteps": [
    {
      "id": "zustand-d18-lab",
      "title": "XState",
      "subtitle": "Using XState",
      "teacherNote": "Connect XState machine.",
      "bugCode": "// Manual FSM is hard to maintain",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "// Use xstate middleware (community)",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "For complex logic, use a real FSM library."
      ]
    }
  ]
};