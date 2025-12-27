export const day19 = {
  "day": 19,
  "title": "Publishing Packages",
  "intro": "Preparing your TS code for NPM. Emitting declarations, source maps, and handling CommonJS vs ESM.",
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