export const day06 = {
  "day": 6,
  "title": "Generics: The Power of Reusability",
  "intro": "Generics allow you to write code that works with a variety of types rather than a single one. It's the key to reusable components.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 6. Generics. Don't use `any`. If you lose the type information, you've failed. Use `<T>` to capture it."
      },
      {
        "type": "challenge",
        "instruction": "This function returns `any` because the input is `any`. Make it generic so it returns the same type as the input.",
        "buggyCode": "// ❌ Returns 'any'\nfunction identity(arg: any) {\n  return arg;\n}",
        "solutionCode": "// ✅ Preserves type\nfunction identity<T>(arg: T): T {\n  return arg;\n}",
        "verifyOutput": "<T>",
        "successMessage": "Generic power unlocked! Now `identity(10)` returns a number, and `identity('hi')` returns a string.",
        "hint": "Add `<T>` before the parenthesis and use `T` as the argument and return type."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) What are Generics?</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Think of generics as <strong>arguments for types</strong>.\n    Just as a function takes arguments to produce a value, a generic type takes type arguments to produce a type.\n</p>\n",
  "code": "// Day 6: Generics\n\n// 1. Generic Function\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nconst n = identity(10); // T is number\nconst s = identity(\"hello\"); // T is string\n\n// 2. Generic Interface\ninterface Box<T> {\n  value: T;\n}\n\nconst numberBox: Box<number> = { value: 42 };\nconst stringBox: Box<string> = { value: \"gift\" };",
  "labSteps": [
    {
      "id": "ts-d6-lab",
      "title": "Generic Array",
      "subtitle": "Building a stack",
      "teacherNote": "Make the class generic.",
      "bugCode": "class Stack { items: any[] = []; push(item: any) { this.items.push(item); } }",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "class Stack<T> { items: T[] = []; push(item: T) { this.items.push(item); } }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Now we can have a Stack<number> that only accepts numbers."
      ]
    }
  ]
};