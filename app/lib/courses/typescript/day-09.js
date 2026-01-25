export const day09 = {
  "day": 9,
  "title": "Discriminated Unions",
  "intro": "The single most important pattern in TypeScript. How to handle multiple related shapes safely using a common 'tag'.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 9. Discriminated Unions. This is how you avoid `any` when dealing with Redux actions or API responses."
      },
      {
        "type": "challenge",
        "instruction": "Accessing `.radius` fails because `Square` doesn't have it. Use the `kind` property to discriminate.",
        "buggyCode": "// ❌ Error: Property 'radius' does not exist on type 'Square'.\ntype Shape = { kind: 'circle', radius: number } | { kind: 'square', size: number };\nfunction area(s: Shape) {\n  return Math.PI * s.radius ** 2;\n}",
        "solutionCode": "// ✅ Discriminated\nfunction area(s: Shape) {\n  if (s.kind === 'circle') {\n    return Math.PI * s.radius ** 2;\n  }\n  return s.size ** 2;\n}",
        "verifyOutput": "s.kind ===",
        "successMessage": "Boom! By checking `kind`, TS narrows the type to `Circle`, making `.radius` safe to access.",
        "hint": "Check `if (s.kind === 'circle')`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) The Pattern</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    1. Create interfaces with a common literal property (the \"discriminant\").\n    2. Union them together.\n    3. Switch on the discriminant.\n</p>\n",
  "code": "// Day 9: Discriminated Unions\n\ninterface Circle {\n  kind: \"circle\";\n  radius: number;\n}\n\ninterface Square {\n  kind: \"square\";\n  sideLength: number;\n}\n\ntype Shape = Circle | Square;\n\nfunction getArea(shape: Shape) {\n  switch (shape.kind) {\n    case \"circle\":\n      return Math.PI * shape.radius ** 2; // TS knows it's a Circle\n    case \"square\":\n      return shape.sideLength ** 2; // TS knows it's a Square\n  }\n}",
  "labSteps": [
    {
      "id": "ts-d9-lab",
      "title": "Adding a Shape",
      "subtitle": "Exhaustiveness checking",
      "teacherNote": "Add a Triangle and see if the switch handles it.",
      "bugCode": "// Add Triangle to Shape, but forget to handle it in switch",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "case 'triangle': return 0.5 * shape.base * shape.height;",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "If you use 'never' checking, TS will warn you about missing cases."
      ]
    }
  ]
};