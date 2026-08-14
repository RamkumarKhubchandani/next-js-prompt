import MockInterviewPage from './MockInterviewClient';

export const metadata = {
    title: 'Mock Technical Interview Prep | OutlineDev',
    description: 'Schedule mock technical interviews with engineers from top tech companies. Algo/DS, System Design, and stack specific practice rounds.',
    alternates: {
        canonical: 'https://www.outlinedev.com/interview/mock',
    },
    openGraph: {
        title: 'Mock Technical Interview Prep | OutlineDev',
        description: 'Schedule mock technical interviews with engineers from top tech companies. Algo/DS, System Design, and stack specific practice rounds.',
        url: 'https://www.outlinedev.com/interview/mock',
    }
};

export default function Page() {
    return <MockInterviewPage />;
}
