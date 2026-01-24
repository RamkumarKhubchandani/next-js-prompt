export const day02 = {
  "day": 2,
  "title": "Basic Types & Type Inference",
  "intro": "TypeScript is smart. You don't always need to tell it what type something is. Today we learn when to be explicit and when to let inference do the work.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 2. `any` is the enemy. It turns off the compiler. If you use `any`, you aren't writing TypeScript."
      },
      {
        "type": "challenge",
        "instruction": "This function argument has an implicit `any` type. Make it type-safe.",
        "buggyCode": "// ❌ Implicit 'any'\nfunction calculate(price) {\n  return price * 1.2;\n}",
        "solutionCode": "// ✅ Explicit type\nfunction calculate(price: number) {\n  return price * 1.2;\n}",
        "verifyOutput": ": number",
        "successMessage": "Simple but vital. Always type your function arguments. Return types can usually be inferred.",
        "hint": "Add `: number` after the argument name."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Type Inference</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    TypeScript can deduce types. If you initialize a variable, TS knows its type.\n    <strong>Rule of Thumb:</strong> Only annotate when TS cannot infer, or when you want to enforce a contract.\n</p>\n<div class=\"bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-8\">\n  <pre class=\"text-sm text-gray-700 dark:text-light-200\">\nlet x = 10; // TS knows x is number\n// x = \"hello\"; // Error!\n\n// Explicit annotation (often unnecessary here)\nlet y: number = 20; \n  </pre>\n</div>\n\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">2) The \"any\" type vs \"unknown\"</h3>\n<p class=\"mb-4 text-gray-600 dark:text-light-300\">\n    <code>any</code> turns off type checking. <code>unknown</code> is the type-safe counterpart.\n    Always prefer <code>unknown</code> if you don't know the type yet.\n</p>\n",
  "code": "// Day 2: Inference & Basic Types\n\n// 1. Inference\nlet userName = \"Alice\"; // Inferred as string\n// userName = 42; // Error\n\n// 2. Arrays\nlet scores = [10, 20, 30]; // Inferred as number[]\nscores.push(40);\n// scores.push(\"50\"); // Error\n\n// 3. Objects\nconst user = {\n  id: 1,\n  name: \"Bob\"\n}; // Inferred as { id: number; name: string }\n\n// 4. Any vs Unknown\nlet loose: any = 4;\nloose.toFixed(); // OK (but dangerous)\n\nlet safe: unknown = 4;\n// safe.toFixed(); // Error: Object is of type 'unknown'.\nif (typeof safe === 'number') {\n  safe.toFixed(); // OK (Narrowed)\n}",
  "labSteps": [
    {
      "id": "ts-d2-lab",
      "title": "Fixing 'any'",
      "subtitle": "Refactor to use specific types",
      "teacherNote": "Replace 'any' with the correct object shape.",
      "bugCode": "function printCoord(pt: any) { console.log(pt.x, pt.y); }",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "function printCoord(pt: { x: number; y: number }) { console.log(pt.x, pt.y); }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "We get autocomplete for .x and .y now."
      ]
    }
  ]
};