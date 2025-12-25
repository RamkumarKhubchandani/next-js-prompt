export const day12 = {
  "day": 12,
  "title": "SSR & Hydration",
  "intro": "Using Zustand with Next.js. Handling the hydration mismatch error and ensuring server state matches client state.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Mismatch Problem</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    If the server renders \"0 bears\" but localStorage has \"5 bears\", React will throw a hydration error.\n</p>\n",
  "code": "// Day 12: SSR\nimport { useState, useEffect } from 'react';\n\n// Custom hook to safely hydrate\nconst useStore = create(...)\n\nfunction useHydratedStore(selector) {\n  const [hydrated, setHydrated] = useState(false);\n  const result = useStore(selector);\n\n  useEffect(() => {\n    setHydrated(true);\n  }, []);\n\n  return hydrated ? result : null;\n}",
  "labSteps": [
    {
      "id": "zustand-d12-lab",
      "title": "Skip Hydration",
      "subtitle": "Persist middleware option",
      "teacherNote": "Prevent hydration on init.",
      "bugCode": "persist(..., { name: 'store' }) // Hydrates immediately",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "persist(..., { name: 'store', skipHydration: true })",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "You must manually call rehydrate() later."
      ]
    }
  ]
};