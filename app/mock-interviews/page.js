import MockInterviewsPage from './MockInterviewsClient';

export const metadata = {
    title: 'Crush Your Technical Coding Interview | OutlineDev',
    description: 'Book free mock technical interviews with engineers from top tech companies. Algorithmic coding, system design, and frontend architecture practice rounds.',
    alternates: {
        canonical: 'https://www.outlinedev.com/mock-interviews',
    },
    openGraph: {
        title: 'Crush Your Technical Coding Interview | OutlineDev',
        description: 'Book free mock technical interviews with engineers from top tech companies. Algorithmic coding, system design, and frontend architecture practice rounds.',
        url: 'https://www.outlinedev.com/mock-interviews',
    }
};

export default function Page() {
    return <MockInterviewsPage />;
}
