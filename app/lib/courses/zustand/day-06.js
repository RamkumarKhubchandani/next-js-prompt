export const day06 = {
  "day": 6,
  "title": "Slices Pattern",
  "intro": "As your app grows, one giant store file becomes unmanageable. Learn how to split your store into small, independent slices.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 6. Slices. If your store has 200 lines, split it. Zustand slices allow you to combine multiple `create` calls into one."
      },
      {
        "type": "challenge",
        "instruction": "This slice pattern is incorrect. The `create` function expects a single object, but we are passing multiple arguments. Combine them using the spread syntax.",
        "buggyCode": "// ❌ Invalid syntax\nconst useStore = create(createBearSlice, createFishSlice);",
        "solutionCode": "// ✅ Correct Slices Pattern\nconst useStore = create((...a) => ({\n  ...createBearSlice(...a),\n  ...createFishSlice(...a),\n}));",
        "verifyOutput": "...createBearSlice",
        "successMessage": "Perfect. We use spread syntax `...` to merge the objects returned by each slice creator into one big state object.",
        "hint": "Use `(...a) => ({ ...slice1(...a), ...slice2(...a) })`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Creating Slices</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    A slice is just a function that returns a part of the state object.\n    You merge them together in the main create function.\n</p>\n",
  "code": "// Day 6: Slices\nimport { create } from 'zustand';\n\n// Slice 1\nconst createBearSlice = (set) => ({\n  bears: 0,\n  addBear: () => set((state) => ({ bears: state.bears + 1 })),\n});\n\n// Slice 2\nconst createFishSlice = (set) => ({\n  fishes: 0,\n  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),\n});\n\n// Combine\nconst useStore = create((...a) => ({\n  ...createBearSlice(...a),\n  ...createFishSlice(...a),\n}));",
  "labSteps": [
    {
      "id": "zustand-d6-lab",
      "title": "Shared State",
      "subtitle": "Cross-slice interaction",
      "teacherNote": "Update both slices at once.",
      "bugCode": "// How to update bears AND fishes?",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "eatFish: () => set(state => ({ bears: state.bears + 1, fishes: state.fishes - 1 }))",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Slices are merged, so 'set' has access to the whole state."
      ]
    }
  ]
};