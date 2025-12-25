export const day19 = {
  "day": 19,
  "title": "Performance Tuning",
  "intro": "Handling large datasets. Normalization, batching, and avoiding unnecessary renders.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Batching</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Redux notifies subscribers after every dispatch. Use <code>batch(() => { ... })</code> to group updates.\n</p>\n",
  "code": "// Day 19: Performance\nimport { batch } from 'react-redux';\n\nfunction handleClick() {\n  batch(() => {\n    dispatch(increment());\n    dispatch(increment());\n  }); // Only 1 notify\n}",
  "labSteps": [
    {
      "id": "redux-d19-lab",
      "title": "Shallow Equality",
      "subtitle": "useSelector optimization",
      "teacherNote": "Use shallowEqual for objects.",
      "bugCode": "useSelector(s => ({ a: s.a, b: s.b })) // New object every time",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "useSelector(s => ({ a: s.a, b: s.b }), shallowEqual)",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Prevents rerender if props haven't changed."
      ]
    }
  ]
};