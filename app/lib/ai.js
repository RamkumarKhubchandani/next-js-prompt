const questions = {
    JavaScript: [
        { question: "What is the difference between `let`, `const`, and `var`?", options: ["No difference", "Scope and reassignability", "Only naming conventions", "Used for different data types"], answer: 1 },
        { question: "Explain the concept of 'hoisting' in JavaScript.", options: ["Lifting variables to the top of their scope", "A way to organize code", "A CSS property", "An asynchronous pattern"], answer: 0 },
        // ... 13 more JavaScript questions
    ],
    TypeScript: [
        { question: "What is a major benefit of using TypeScript over JavaScript?", options: ["It runs faster", "Static type checking", "It has more built-in functions", "It's easier to write"], answer: 1 },
        { question: "How do you define an interface in TypeScript?", options: ["class MyInterface {}", "function MyInterface() {}", "interface MyInterface {}", "type MyInterface = {}"], answer: 2 },
        // ... 13 more TypeScript questions
    ],
    React: [
        { question: "What is the Virtual DOM?", options: ["A copy of the real DOM in memory", "A browser feature", "A way to style components", "A database for React"], answer: 0 },
        { question: "What is the purpose of `useEffect` hook?", options: ["To fetch data", "To handle side effects", "To create state", "To style components"], answer: 1 },
        // ... 13 more React questions
    ],
    // ... questions for Angular, Vue, Node.js, MongoDB, Python, Redux
};

export const getQuestionsForTech = (techs) => {
    let selectedQuestions = [];
    techs.forEach(tech => {
        if (questions[tech]) {
            selectedQuestions = [...selectedQuestions, ...questions[tech]];
        }
    });
    // For now, let's just return a subset to keep the quiz length reasonable
    return selectedQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
};
