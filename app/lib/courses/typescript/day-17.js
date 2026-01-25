export const day17 = {
  "day": 17,
  "title": "Mixins",
  "intro": "Composition over inheritance. Mixins let you combine behavior from multiple classes into one.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 17. Mixins. TypeScript needs a specific type signature to understand that a class is being extended dynamically."
      },
      {
        "type": "challenge",
        "instruction": "This mixin loses type information because `any` is used. Use a generic constructor type.",
        "buggyCode": "// ❌ Returns 'any'\nfunction Jumpable(Base: any) {\n  return class extends Base {\n    jump() {}\n  }\n}",
        "solutionCode": "// ✅ Preserves types\ntype Constructor = new (...args: any[]) => {};\n\nfunction Jumpable<TBase extends Constructor>(Base: TBase) {\n  return class extends Base {\n    jump() {}\n  }\n}",
        "verifyOutput": "new (...args: any[]) => {}",
        "successMessage": "You nailed it. By defining a `Constructor` type, TS knows what `Base` is and correctly infers the resulting class shape.",
        "hint": "Define `type Constructor = new ...`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Pattern</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    A function that takes a class and returns a new class extending it.\n</p>\n",
  "code": "// Day 17: Mixins\n\ntype Constructor = new (...args: any[]) => {};\n\nfunction Jumpable<TBase extends Constructor>(Base: TBase) {\n  return class extends Base {\n    jump() {\n      console.log(\"Jump!\");\n    }\n  };\n}\n\nclass Sprite {\n  x = 0;\n  y = 0;\n}\n\nconst Player = Jumpable(Sprite);\nconst p = new Player();\np.jump();",
  "labSteps": [
    {
      "id": "ts-d17-lab",
      "title": "Multiple Mixins",
      "subtitle": "Stacking behavior",
      "teacherNote": "Combine Jumpable and Duckable.",
      "bugCode": "const Player = Jumpable(Sprite); // Missing Duckable",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "const Player = Duckable(Jumpable(Sprite));",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Mixins chain together."
      ]
    }
  ]
};