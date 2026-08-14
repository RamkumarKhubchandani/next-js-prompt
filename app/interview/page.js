import InterviewHub from './InterviewHubClient';

export const metadata = {
    title: 'Coding Interview Prep Hub | Vetted Developer Questions | OutlineDev',
    description: 'Prepare for technical interviews. Curated deep-dive questions and expert answers in React, Angular, JavaScript, TypeScript, and state management.',
    alternates: {
        canonical: 'https://www.outlinedev.com/interview',
    },
    openGraph: {
        title: 'Coding Interview Prep Hub | Vetted Developer Questions | OutlineDev',
        description: 'Prepare for technical interviews. Curated deep-dive questions and expert answers in React, Angular, JavaScript, TypeScript, and state management.',
        url: 'https://www.outlinedev.com/interview',
    }
};

export default function Page() {
    return <InterviewHub />;
}
