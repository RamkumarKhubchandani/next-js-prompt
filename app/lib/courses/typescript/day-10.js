export const day10 = {
  "day": 10,
  "title": "Type Guards & Assertion Functions",
  "intro": "Sometimes you know more than TypeScript. Learn how to tell the compiler 'trust me, this is a string'.",
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) User-Defined Type Guards</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Functions that return <code>arg is Type</code>.\n</p>\n",
  "code": "// Day 10: Type Guards\n\ninterface Fish { swim: () => void }\ninterface Bird { fly: () => void }\n\nfunction isFish(pet: Fish | Bird): pet is Fish {\n  return (pet as Fish).swim !== undefined;\n}\n\nfunction move(pet: Fish | Bird) {\n  if (isFish(pet)) {\n    pet.swim(); // TS knows it's a Fish\n  } else {\n    pet.fly(); // TS knows it's a Bird\n  }\n}",
  "labSteps": [
    {
      "id": "ts-d10-lab",
      "title": "Assertion Functions",
      "subtitle": "Throwing if wrong",
      "teacherNote": "Write a function that asserts a condition.",
      "bugCode": "function assertIsString(val: any) { if (typeof val !== 'string') throw new Error(); }",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "function assertIsString(val: any): asserts val is string { if (typeof val !== 'string') throw new Error(); }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "The 'asserts' keyword tells TS that if this function returns, the type is confirmed."
      ]
    }
  ]
};