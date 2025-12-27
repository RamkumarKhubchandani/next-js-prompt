export const day15 = {
  "day": 15,
  "title": "Template Literal Types",
  "intro": "Manipulating string types. You can concatenate, capitalize, and pattern match strings at the type level.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) String Manipulation</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    TS can construct string types dynamically.\n</p>\n",
  "code": "// Day 15: Template Literals\n\ntype World = \"world\";\ntype Greeting = `hello ${World}`; // \"hello world\"\n\ntype Color = \"red\" | \"blue\";\ntype Quantity = \"one\" | \"two\";\n\ntype Item = `${Color}-${Quantity}`;\n// \"red-one\" | \"red-two\" | \"blue-one\" | \"blue-two\"\n\n// Key Remapping\ntype Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]\n};\n\ninterface Person {\n  name: string;\n  age: number;\n}\n\ntype PersonGetters = Getters<Person>;\n// { getName: () => string; getAge: () => number; }",
  "labSteps": [
    {
      "id": "ts-d15-lab",
      "title": "Event Names",
      "subtitle": "Generating handlers",
      "teacherNote": "Create 'onChanged' types.",
      "bugCode": "type Handlers = { [K in keyof Props]: (val: Props[K]) => void }",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "type Handlers = { [K in keyof Props as `on${Capitalize<string & K>}Changed`]: (val: Props[K]) => void }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "Powerful for library authors."
      ]
    }
  ]
};