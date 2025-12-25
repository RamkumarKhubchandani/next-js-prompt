export const day20 = {
  "day": 20,
  "title": "Monorepos & References",
  "intro": "Managing large codebases. Project References allow you to split a TS project into smaller, faster-to-compile pieces.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Project References</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Use <code>references</code> in tsconfig to link projects.\n</p>\n",
  "code": "// Day 20: Architecture\n\n// /packages/core/tsconfig.json\n{\n  \"compilerOptions\": { \"composite\": true }\n}\n\n// /packages/ui/tsconfig.json\n{\n  \"references\": [{ \"path\": \"../core\" }]\n}",
  "labSteps": [
    {
      "id": "ts-d20-lab",
      "title": "Build Mode",
      "subtitle": "tsc -b",
      "teacherNote": "Use build mode for references.",
      "bugCode": "tsc // Compiles only current folder",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "tsc -b // Builds all referenced projects",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Incremental builds are much faster."
      ]
    }
  ]
};