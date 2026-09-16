export const metadata = {
    title: 'Developer Skill Assessment Quiz | Test Your React, Node.js & TypeScript Skills',
    description: 'Assess your technical coding knowledge in JavaScript, React, Angular, Node.js, and Full Stack. Get instant skill ratings and 1-on-1 mentorship recommendations.',
    keywords: [
        'developer skill quiz',
        'react coding assessment',
        'javascript technical quiz',
        'frontend developer skill test',
        'nodejs quiz',
        'coding assessment for engineers'
    ],
    alternates: {
        canonical: 'https://www.outlinedev.com/ai-quiz',
    },
    openGraph: {
        title: 'Developer Skill Assessment Quiz | OutlineDev',
        description: 'Take an interactive coding quiz to evaluate your React, TypeScript, and Full Stack capabilities.',
        url: 'https://www.outlinedev.com/ai-quiz',
        images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'],
    }
};

export default function AiQuizLayout({ children }) {
    return children;
}
