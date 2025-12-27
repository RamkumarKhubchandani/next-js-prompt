export const day11 = {
  "day": 11,
  "title": "Context vs Zustand",
  "intro": "When should you actually use Context? We clarify the boundaries between Prop Drilling, Context, and Zustand.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Rule</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Use Context for <strong>Dependency Injection</strong> (e.g., theming, localization) where updates are rare.\n    Use Zustand for <strong>Application State</strong> (e.g., data, UI state) where updates are frequent.\n</p>\n",
  "code": "// Day 11: Comparison\n\n// Context: Good for static/rare data\nconst ThemeContext = createContext('light');\n\n// Zustand: Good for high-frequency updates\nconst useMousePosition = create((set) => ({\n  x: 0, \n  y: 0,\n  move: (x, y) => set({ x, y })\n}));",
  "labSteps": [
    {
      "id": "zustand-d11-lab",
      "title": "Prop Drilling",
      "subtitle": "Identifying the problem",
      "teacherNote": "Refactor props to store.",
      "bugCode": "<A user={user}><B user={user}><C user={user} /></B></A>",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "// In C:\nconst user = useStore(s => s.user);",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Components become independent."
      ]
    }
  ]
};