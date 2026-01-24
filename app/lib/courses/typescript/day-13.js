export const day13 = {
  "day": 13,
  "title": "Mapped Types",
  "intro": "Iterating over keys to create new types. The basis of many utility types.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 13. Mapped Types. You can iterate over types just like you iterate over arrays in JS."
      },
      {
        "type": "challenge",
        "instruction": "This mapped type creates a copy of `T`. Modify it to remove the `readonly` modifier from all properties.",
        "buggyCode": "// ❌ Keeps readonly\ntype Mutable<T> = {\n  [K in keyof T]: T[K];\n};",
        "solutionCode": "// ✅ Removes readonly\ntype Mutable<T> = {\n  -readonly [K in keyof T]: T[K];\n};",
        "verifyOutput": "-readonly",
        "successMessage": "Correct! `-readonly` strips the modifier. You can also use `-?` to make properties required.",
        "hint": "Add `-readonly` before the `[` bracket."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Syntax</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    <code>{ [K in Keys]: Type }</code>\n</p>\n",
  "code": "// Day 13: Mapped Types\n\ntype OptionsFlags<Type> = {\n  [Property in keyof Type]: boolean;\n};\n\ninterface FeatureFlags {\n  darkMode: () => void;\n  newUserProfile: () => void;\n}\n\n// Converts all properties to boolean\ntype FeatureOptions = OptionsFlags<FeatureFlags>;\n// { darkMode: boolean; newUserProfile: boolean; }",
  "labSteps": [
    {
      "id": "ts-d13-lab",
      "title": "Modifiers",
      "subtitle": "Removing readonly",
      "teacherNote": "Strip 'readonly' from properties.",
      "bugCode": "type Mutable<T> = { [P in keyof T]: T[P] }; // Keeps modifiers",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "type Mutable<T> = { -readonly [P in keyof T]: T[P] };",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "The '-' prefix removes the modifier."
      ]
    }
  ]
};