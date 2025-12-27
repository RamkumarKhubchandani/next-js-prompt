export const day16 = {
  "day": 16,
  "title": "Decorators",
  "intro": "Metaprogramming in TypeScript. Decorators allow you to annotate and modify classes and members at design time.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Class Decorators</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Functions that receive the constructor of the class.\n</p>\n",
  "code": "// Day 16: Decorators\n\nfunction Sealed(constructor: Function) {\n  Object.seal(constructor);\n  Object.seal(constructor.prototype);\n}\n\n@Sealed\nclass BugReport {\n  type = \"report\";\n  title: string;\n  constructor(t: string) {\n    this.title = t;\n  }\n}",
  "labSteps": [
    {
      "id": "ts-d16-lab",
      "title": "Method Decorator",
      "subtitle": "Logging",
      "teacherNote": "Log every call.",
      "bugCode": "// No logging",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "@LogMethod \n method() { ... }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Decorators wrap the original method."
      ]
    }
  ]
};