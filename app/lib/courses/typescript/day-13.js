export const day13 = {
  "day": 13,
  "title": "Mapped Types",
  "intro": "Iterating over keys to create new types. The basis of many utility types.",
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