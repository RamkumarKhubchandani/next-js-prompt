export const day15 = {
  "day": 15,
  "title": "Multiple vs Single Store",
  "intro": "Redux enforces a single store. Zustand allows multiple. Which approach is better?",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Atomic Approach</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Zustand encourages multiple small stores (e.g., <code>useAuthStore</code>, <code>useCartStore</code>, <code>useSettingsStore</code>).\n    This improves code splitting and separation of concerns.\n</p>\n",
  "code": "// Day 15: Architecture\n\n// Store 1: Auth (Critical, small)\nconst useAuthStore = create(...);\n\n// Store 2: Dashboard (Large, lazy loaded)\nconst useDashboardStore = create(...);\n\n// Combining them?\n// Usually you don't need to. Just use both hooks.\nfunction App() {\n  const user = useAuthStore(s => s.user);\n  const widgets = useDashboardStore(s => s.widgets);\n}",
  "labSteps": [
    {
      "id": "zustand-d15-lab",
      "title": "Cross-Store Actions",
      "subtitle": "Thunk pattern",
      "teacherNote": "Action that affects both stores.",
      "bugCode": "// Importing one store into another's creator (Circular dependency)",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "export const logout = () => { useAuthStore.getState().reset(); useDataStore.getState().clear(); }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Define complex actions outside the stores."
      ]
    }
  ]
};