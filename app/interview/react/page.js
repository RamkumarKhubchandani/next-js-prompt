import ReactInterviewPage from './ReactInterviewClient';

export const metadata = {
    title: 'React Interview Questions & Answers | OutlineDev',
    description: 'Crush your React interview. In-depth questions and working code sandbox examples on Hooks, Fiber internals, Reconciliation, SSR, and styling.',
    alternates: {
        canonical: 'https://www.outlinedev.com/interview/react',
    },
    openGraph: {
        title: 'React Interview Questions & Answers | OutlineDev',
        description: 'Crush your React interview. In-depth questions and working code sandbox examples on Hooks, Fiber internals, Reconciliation, SSR, and styling.',
        url: 'https://www.outlinedev.com/interview/react',
    }
};

export default function Page() {
    return <ReactInterviewPage />;
}
