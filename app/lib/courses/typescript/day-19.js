export const day19 = {
  "day": 19,
  "title": "Publishing Packages",
  "intro": "Preparing your TS code for NPM. Emitting declarations, source maps, and handling CommonJS vs ESM.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 19. Publishing. If you ship a TS library without type definitions, you are shipping a broken library."
      },
      {
        "type": "challenge",
        "instruction": "This `package.json` is missing the types entry, so consumers won't get autocomplete. Add it.",
        "buggyCode": "{\n  \"name\": \"my-lib\",\n  \"main\": \"dist/index.js\"\n}",
        "solutionCode": "{\n  \"name\": \"my-lib\",\n  \"main\": \"dist/index.js\",\n  \"types\": \"dist/index.d.ts\"\n}",
        "verifyOutput": "\"types\":",
        "successMessage": "Crucial. The `types` (or `typings`) field tells TS where to find your `.d.ts` files.",
        "hint": "Add the `\"types\"` field pointing to the `.d.ts` file."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) tsconfig.json</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Ensure <code>declaration: true</code> is set so consumers get type hints.\n</p>\n",
  "code": "// Day 19: Publishing\n// tsconfig.json\n{\n  \"compilerOptions\": {\n    \"module\": \"commonjs\",\n    \"target\": \"es5\",\n    \"declaration\": true,\n    \"outDir\": \"./dist\"\n  }\n}\n\n// package.json\n{\n  \"name\": \"my-lib\",\n  \"main\": \"dist/index.js\",\n  \"types\": \"dist/index.d.ts\"\n}",
  "labSteps": [
    {
      "id": "ts-d19-lab",
      "title": "Exports",
      "subtitle": "Controlling visibility",
      "teacherNote": "Don't export internal types.",
      "bugCode": "export interface Internal { ... }",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "interface Internal { ... } // Not exported",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Only export what the user needs."
      ]
    }
  ]
};