export const day04 = {
  "day": 4,
  "title": "Hooks: useSelector & useDispatch",
  "intro": "How to interact with the store from React components. Reading state and dispatching actions.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) useSelector</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Extract data from the Redux store state. It subscribes to the store and re-renders when the selected data changes.\n</p>\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">2) useDispatch</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Returns the dispatch function to send actions to the store.\n</p>\n",
  "code": "// Day 4: Hooks\nimport { useSelector, useDispatch } from 'react-redux';\nimport { increment } from './counterSlice';\n\nexport function Counter() {\n  const count = useSelector((state) => state.counter.value);\n  const dispatch = useDispatch();\n\n  return (\n    <button onClick={() => dispatch(increment())}>\n      {count}\n    </button>\n  );\n}",
  "labSteps": [
    {
      "id": "redux-d4-lab",
      "title": "Dispatching",
      "subtitle": "Triggering actions",
      "teacherNote": "Don't forget to call the action creator.",
      "bugCode": "dispatch(increment); // Wrong: passing function definition",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "dispatch(increment()); // Correct: passing action object",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "You must invoke the action creator."
      ]
    }
  ]
};