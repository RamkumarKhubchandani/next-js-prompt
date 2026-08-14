import JSInterviewPage from './JSInterviewClient';

export const metadata = {
    title: 'JavaScript Interview Questions & Answers | OutlineDev',
    description: 'Vetted questions on closures, prototypes, event loop, V8 internals, async/await, promises, and functional JS design patterns.',
    alternates: {
        canonical: 'https://www.outlinedev.com/interview/javascript',
    },
    openGraph: {
        title: 'JavaScript Interview Questions & Answers | OutlineDev',
        description: 'Vetted questions on closures, prototypes, event loop, V8 internals, async/await, promises, and functional JS design patterns.',
        url: 'https://www.outlinedev.com/interview/javascript',
    }
};

export default function Page() {
    return <JSInterviewPage />;
}
