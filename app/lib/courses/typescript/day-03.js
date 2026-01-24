export const day03 = {
  "day": 3,
  "title": "Interfaces vs Types",
  "intro": "The age-old question: Interface or Type Alias? Today we settle it and explore how to define the shape of your data.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 3. Interface vs Type. They are 95% similar. The 5% difference is 'Declaration Merging'. Interfaces merge, Types don't."
      },
      {
        "type": "challenge",
        "instruction": "This code errors because you can't define the same Type twice. Change it to `interface` so they merge together.",
        "buggyCode": "// ❌ Types don't merge\ntype User = { name: string };\ntype User = { age: number };",
        "solutionCode": "// ✅ Interfaces merge\ninterface User { name: string; }\ninterface User { age: number; }",
        "verifyOutput": "interface User",
        "successMessage": "Correct! Interfaces are 'open' (mergeable), which is why libraries use them. Types are 'closed'.",
        "hint": "Change `type` to `interface` and remove the `=` sign."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Interfaces</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Interfaces are strictly for defining <strong>object shapes</strong>. They support <strong>declaration merging</strong> (you can add to them later).\n</p>\n\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">2) Type Aliases</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Types are more flexible. They can define primitives, unions, intersections, and tuples.\n    <code>type ID = string | number;</code>\n</p>\n",
  "code": "// Day 3: Interfaces vs Types\n\n// 1. Interface (Open for extension)\ninterface User {\n  name: string;\n}\ninterface User {\n  age: number;\n}\nconst u: User = { name: \"A\", age: 10 }; // Merged!\n\n// 2. Type (Closed)\ntype Point = {\n  x: number;\n  y: number;\n};\n// type Point = { z: number }; // Error: Duplicate identifier\n\n// 3. Union Types (Only possible with 'type')\ntype Status = \"loading\" | \"success\" | \"error\";\n",
  "labSteps": [
    {
      "id": "ts-d3-lab",
      "title": "Extending Types",
      "subtitle": "Interface vs Intersection",
      "teacherNote": "See how we extend definitions.",
      "bugCode": "interface A { x: number } \n// How to make B have x AND y using type?",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 2
      },
      "fixCode": "type B = A & { y: number };",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Intersection types (&) combine shapes."
      ]
    }
  ]
};