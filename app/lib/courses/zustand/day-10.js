export const day10 = {
  "day": 10,
  "title": "Testing Zustand",
  "intro": "How to write unit tests for your store logic using Jest or Vitest. Mocking and resetting state between tests.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Resetting State</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Since stores are global singletons, state persists between tests. You must reset it.\n</p>\n",
  "code": "// Day 10: Testing\nimport { act, renderHook } from '@testing-library/react';\nimport { create } from 'zustand';\n\nconst useStore = create((set) => ({\n  count: 0,\n  inc: () => set((s) => ({ count: s.count + 1 })),\n}));\n\ntest('should increment', () => {\n  const { result } = renderHook(() => useStore());\n  \n  act(() => {\n    result.current.inc();\n  });\n  \n  expect(result.current.count).toBe(1);\n});",
  "labSteps": [
    {
      "id": "zustand-d10-lab",
      "title": "Mocking",
      "subtitle": "Creating a mock store",
      "teacherNote": "Use a creator function for tests.",
      "bugCode": "// Importing the global store directly in tests can be flaky",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "const createTestStore = () => create(...); // Create fresh store per test",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Isolation is key for reliable tests."
      ]
    }
  ]
};