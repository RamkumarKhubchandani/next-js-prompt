export const day14 = {
  "day": 14,
  "title": "Conditional Types",
  "intro": "Ternary operators for types. <code>T extends U ? X : Y</code>. This is where TS becomes a programming language.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 14. Conditional Types. It's just a ternary: `Does A look like B?`."
      },
      {
        "type": "challenge",
        "instruction": "This type extracts the element type from an array. It uses `infer`.",
        "buggyCode": "// ❌ Hardcoded\ntype Flatten<T> = T[0];",
        "solutionCode": "// ✅ Generic inference\ntype Flatten<T> = T extends (infer I)[] ? I : T;",
        "verifyOutput": "extends (infer I)[]",
        "successMessage": "Generic magic! `infer I` asks TS to figure out what type is inside the array.",
        "hint": "Use `T extends (infer I)[] ? I : T`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The 'infer' keyword</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Used within conditional types to extract a type variable.\n</p>\n",
  "code": "// Day 14: Conditional Types\n\ntype IsString<T> = T extends string ? true : false;\n\ntype A = IsString<string>; // true\ntype B = IsString<number>; // false\n\n// Using infer to get array element type\ntype Flatten<T> = T extends Array<infer Item> ? Item : T;\n\ntype Str = Flatten<string[]>; // string\ntype Num = Flatten<number>; // number",
  "labSteps": [
    {
      "id": "ts-d14-lab",
      "title": "Extracting Args",
      "subtitle": "Recreating Parameters<T>",
      "teacherNote": "Use infer to get arguments.",
      "bugCode": "type MyParams<T> = T extends (...args: any[]) => any ? args : never; // Error",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "type MyParams<T> = T extends (...args: infer P) => any ? P : never;",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "We infer P from the function signature."
      ]
    }
  ]
};