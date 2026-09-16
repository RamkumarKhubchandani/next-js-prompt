export const metadata = {
    title: 'Coding Challenges & Bug Squash Arena | Master JavaScript & React Debugging',
    description: 'Solve real-world debugging challenges, fix broken code in React, JavaScript, and TypeScript, and climb the developer leaderboard with live 1:1 mentorship guidance.',
    keywords: [
        'coding challenges',
        'javascript debugging',
        'react coding practice',
        'typescript challenges',
        'bug squash arena',
        'frontend coding interview prep',
        'interactive coding problems'
    ],
    alternates: {
        canonical: 'https://www.outlinedev.com/challenges',
    },
    openGraph: {
        title: 'Bug Squash Arena | Real-World Developer Challenges',
        description: 'Practice fixing real-world production bugs in React, TypeScript, and Node.js.',
        url: 'https://www.outlinedev.com/challenges',
        images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'],
    }
};

export default function ChallengesLayout({ children }) {
    return children;
}
