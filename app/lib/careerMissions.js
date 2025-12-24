export const MISSIONS = [
    {
        id: 1,
        title: "Emergency: Fix the Typos",
        xp: 100,
        slackMessages: [
            {
                sender: "Sarah (CTO)",
                avatarColor: "bg-blue-600",
                time: "09:00 AM",
                text: "@channel Welcome to the team! 🚀\nWe have a small fire to put out. The marketing team just noticed a typo on the landing page title."
            },
            {
                sender: "Product Manager",
                avatarColor: "bg-purple-600",
                time: "09:05 AM",
                text: "Yeah, it says \"Welcom to NextCorp\" instead of \"Welcome\".\nCan someone fix this ASAP? It's in `App.js`."
            }
        ],
        files: {
            "/App.js": `import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
      <div className="text-center max-w-2xl px-4">
        {/* FIX ME: Typos below */}
        <h1 className="text-6xl font-bold text-blue-600 mb-4">Welcom to NextCorp</h1>
        <p className="text-xl text-gray-600 mb-8">Building the future, today.</p>
        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}`
        },
        validate: (code) => {
            return code.includes("Welcome to NextCorp");
        }
    },
    {
        id: 2,
        title: "The Rebrand",
        xp: 150,
        slackMessages: [
            {
                sender: "Designer (Alex)",
                avatarColor: "bg-pink-600",
                time: "11:30 AM",
                text: "Great job on the fix! 🎨\nNow, that \"Get Started\" button looks sad. It's just gray."
            },
            {
                sender: "Sarah (CTO)",
                avatarColor: "bg-blue-600",
                time: "11:32 AM",
                text: "We're switching to our brand color. Can you make the button `bg-purple-600` and text `white`? Also make it `rounded-full` for a modern look."
            }
        ],
        files: {
            "/App.js": `import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">Welcome to NextCorp</h1>
        <p className="text-xl text-gray-600 mb-8">Building the future, today.</p>
        {/* TASK: Update this button's styles */}
        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}`
        },
        validate: (code) => {
            return code.includes("bg-purple-600") && code.includes("text-white") && code.includes("rounded-full");
        }
    },
    {
        id: 3,
        title: "Modular Architecture",
        xp: 200,
        slackMessages: [
            {
                sender: "Sarah (CTO)",
                avatarColor: "bg-blue-600",
                time: "02:15 PM",
                text: "Okay, the app is growing. We need a proper Footer. Don't just write it in App.js."
            },
            {
                sender: "Product Manager",
                avatarColor: "bg-purple-600",
                time: "02:20 PM",
                text: "Please create a `Footer.js` component that says \"© 2024 NextCorp Inc\". Import and use it in `App.js`."
            }
        ],
        files: {
            "/App.js": `import React from "react";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between font-sans">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl px-4 mx-auto">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">Welcome to NextCorp</h1>
        <p className="text-xl text-gray-600 mb-8">Building the future, today.</p>
        <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition shadow-lg">
          Get Started
        </button>
      </div>
      {/* Use the Footer here */}
      <Footer />
    </div>
  );
}`,
            "/Footer.js": `import React from "react";

export default function Footer() {
  // TASK: Return a footer with the copyright text
  return (
    <div className="p-4 text-center text-gray-400">
      {/* Add copyright text here */}
    </div>
  );
}`
        },
        validate: (code, files) => {
            // Check if Footer.js contains the text and App.js imports it
            // Since Sandpack state management in our custom component might be complex, 
            // we'll focus on checking the content of the active file or simplified logic.
            // For this demo, we'll check App.js for the import/usage and Footer.js content if possible.
            // Actually, we passed the full state in CodeApp.
            const footerContent = files["/Footer.js"]?.code || "";
            return footerContent.includes("© 2024 NextCorp Inc");
        }
    }
];



