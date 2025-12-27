export const day11 = {
  "day": 11,
  "title": "Utility Types: The Basics",
  "intro": "TypeScript ships with powerful utilities to transform types. Learn Partial, Pick, Omit, and Record to avoid repetition.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Partial & Required</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    <code>Partial&lt;T&gt;</code> makes all properties optional. <code>Required&lt;T&gt;</code> makes them all required.\n</p>\n",
  "code": "// Day 11: Utility Types\n\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// 1. Partial (Good for updates)\nfunction updateUser(id: number, fields: Partial<User>) {\n  // fields.name is string | undefined\n}\n\n// 2. Pick (Select subset)\ntype UserPreview = Pick<User, \"id\" | \"name\">;\n\n// 3. Omit (Remove subset)\ntype UserInput = Omit<User, \"id\">;\n\n// 4. Record (Map type)\ntype Roles = \"admin\" | \"user\" | \"guest\";\nconst permissions: Record<Roles, number> = {\n  admin: 100,\n  user: 10,\n  guest: 1\n};",
  "labSteps": [
    {
      "id": "ts-d11-lab",
      "title": "Readonly",
      "subtitle": "Immutability",
      "teacherNote": "Make the User immutable.",
      "bugCode": "type ReadonlyUser = User; // Still mutable",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "type ReadonlyUser = Readonly<User>;",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Now you cannot assign to any property."
      ]
    }
  ]
};