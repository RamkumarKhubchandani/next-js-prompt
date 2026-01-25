export const day11 = {
  "day": 11,
  "title": "Context vs Zustand",
  "intro": "When should you actually use Context? We clarify the boundaries between Prop Drilling, Context, and Zustand.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 11. Context vs. Zustand. Context is for static dependencies (like theme, currency). Zustand is for high-velocity data."
      },
      {
        "type": "challenge",
        "instruction": "This Context usage will cause the entire app to re-render whenever the mouse moves. Move it to a Zustand store.",
        "buggyCode": "// ❌ Context causing re-renders\nconst MouseContext = createContext({ x: 0, y: 0 });\nfunction App() {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  // ... listener updates pos ...\n  return <MouseContext.Provider value={pos}><HeavyComponent /></MouseContext.Provider>;\n}",
        "solutionCode": "// ✅ Zustand optimized\nconst useMouse = create((set) => ({ x: 0, y: 0, move: ... }));\nfunction App() {\n  return <HeavyComponent />; // No provider, no parent re-render\n}",
        "verifyOutput": "create((set) =>",
        "successMessage": "Exactly. By moving high-frequency updates to Zustand, we avoid the 'Context Provider re-renders everything' trap.",
        "hint": "Replace `createContext` with `create(...)`."
      }
    ]
  },
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