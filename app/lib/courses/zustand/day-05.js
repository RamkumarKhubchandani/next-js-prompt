export const day05 = {
  "day": 5,
  "title": "Async Actions",
  "intro": "Zustand doesn't need middleware for async. Just make your actions async!",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Async is Native</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Simply mark your function as <code>async</code> and <code>await</code> your fetch. Call <code>set</code> when done.\n</p>\n",
  "code": "// Day 5: Async\nconst useStore = create((set) => ({\n  data: null,\n  loading: false,\n  error: null,\n  \n  fetchData: async () => {\n    set({ loading: true });\n    try {\n      const res = await fetch('/api/data');\n      const data = await res.json();\n      set({ data, loading: false });\n    } catch (error) {\n      set({ error, loading: false });\n    }\n  }\n}));",
  "labSteps": [
    {
      "id": "zustand-d5-lab",
      "title": "Async Flow",
      "subtitle": "Loading states",
      "teacherNote": "Ensure loading is set to true first.",
      "bugCode": "fetch: async () => { const d = await get(); set({ data: d }); } // No loading state",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "fetch: async () => { set({ loading: true }); const d = await get(); set({ data: d, loading: false }); }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "UI needs to know when we are loading."
      ]
    }
  ]
};