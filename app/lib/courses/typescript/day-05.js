export const day05 = {
  "day": 5,
  "title": "Classes & Access Modifiers",
  "intro": "TypeScript adds true OOP features to JS classes: public, private, protected, and readonly.",
  "aiSession": {
    "enabled": true,
    "steps": [
      {
        "type": "talk",
        "message": "Day 5. Classes. TypeScripts `private` keyword is a lie at runtime. JS `#private` is real."
      },
      {
        "type": "challenge",
        "instruction": "The `private` keyword only hides `secret` at compile time. Switch to specific JavaScript private fields (`#`) for runtime privacy.",
        "buggyCode": "// ❌ Visible at runtime\nclass Vault {\n  private secret = \"123\";\n}",
        "solutionCode": "// ✅ True privacy\nclass Vault {\n  #secret = \"123\";\n}",
        "verifyOutput": "#secret",
        "successMessage": "Secure! Runtime private fields (`#`) prevent access even if someone uses `(vault as any).secret`.",
        "hint": "Replace `private secret` with `#secret`."
      }
    ]
  },
  "content": "\n<h3 class=\"text-xl font-bold text-gray-900 dark:text-white mb-4\">1) Access Modifiers</h3>\n<p class=\"mb-6 text-gray-600 dark:text-light-300\">\n    Control who can see your properties. <code>private</code> is checked at compile time (and now runtime with #private).\n</p>\n",
  "code": "// Day 5: Classes\n\nclass Player {\n  public name: string;\n  private health: number;\n  protected readonly maxHealth: number = 100;\n\n  constructor(name: string) {\n    this.name = name;\n    this.health = 100;\n  }\n\n  takeDamage(amount: number) {\n    this.health -= amount;\n  }\n}\n\nconst p = new Player(\"Hero\");\np.name = \"Hero 2\"; // OK\n// p.health = 0; // Error: private\n// p.maxHealth = 200; // Error: readonly\n",
  "labSteps": [
    {
      "id": "ts-d5-lab",
      "title": "Parameter Properties",
      "subtitle": "Shorthand constructors",
      "teacherNote": "Reduce boilerplate.",
      "bugCode": "class C { x: number; constructor(x: number) { this.x = x; } }",
      "bugFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "fixCode": "class C { constructor(public x: number) {} }",
      "fixFocus": {
        "fromLine": 1,
        "toLine": 1
      },
      "whatToNotice": [
        "It creates and assigns the property automatically."
      ]
    }
  ]
};