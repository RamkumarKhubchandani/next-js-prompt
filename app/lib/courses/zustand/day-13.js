export const day13 = {
  "day": 13,
  "title": "Transient Updates",
  "intro": "For high-performance needs (like animations), you don't want to re-render React components on every frame. Enter Transient Updates.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Direct Mutation</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Instead of binding state to the view, subscribe to changes and update the DOM directly (refs).\n</p>\n",
  "code": "// Day 13: Transient\nconst useStore = create(set => ({ count: 0, inc: ... }));\n\nfunction Counter() {\n  const ref = useRef(null);\n  \n  useEffect(() => {\n    // Subscribe without re-rendering component\n    return useStore.subscribe(state => {\n      if (ref.current) {\n        ref.current.innerText = state.count;\n      }\n    });\n  }, []);\n\n  return <div ref={ref} />;\n}",
  "labSteps": [
    {
      "id": "zustand-d13-lab",
      "title": "Animation Loop",
      "subtitle": "60fps updates",
      "teacherNote": "Update store without React render.",
      "bugCode": "const x = useStore(s => s.x); // Rerenders 60 times/sec",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "// Use subscribe inside useEffect as shown above",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "React is bypassed for the update."
      ]
    }
  ]
};