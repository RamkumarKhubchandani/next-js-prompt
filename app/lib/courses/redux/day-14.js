export const day14 = {
  "day": 14,
  "title": "Testing Logic",
  "intro": "Testing reducers and selectors is easy because they are pure functions. Testing thunks requires mocking.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Testing Reducers</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Pass an initial state and an action, assert the new state.\n</p>\n",
  "code": "// Day 14: Testing\nimport reducer, { addTodo } from './todoSlice';\n\ntest('should handle initial state', () => {\n  expect(reducer(undefined, { type: 'unknown' })).toEqual([]);\n});\n\ntest('should handle addTodo', () => {\n  const previousState = [];\n  const nextState = reducer(previousState, addTodo('Run'));\n  expect(nextState[0].text).toEqual('Run');\n});",
  "labSteps": [
    {
      "id": "redux-d14-lab",
      "title": "Testing Selectors",
      "subtitle": "Pure functions",
      "teacherNote": "Test the selector logic.",
      "bugCode": "// Testing component instead of selector",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "expect(selectVisibleItems({ items: ['a'], filter: 'a' })).toEqual(['a'])",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Unit test business logic in isolation."
      ]
    }
  ]
};