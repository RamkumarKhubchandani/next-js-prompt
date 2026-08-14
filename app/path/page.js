import PathIndexPage from './PathIndexClient';

export const metadata = {
    title: 'Structured Coding Paths & Bootcamps | OutlineDev',
    description: 'Choose your learning track. Each course is structured day-by-day with checkpoints, interactive labs, sandbox environments and 1:1 mentorship.',
    alternates: {
        canonical: 'https://www.outlinedev.com/path',
    },
    openGraph: {
        title: 'Structured Coding Paths & Bootcamps | OutlineDev',
        description: 'Choose your learning track. Each course is structured day-by-day with checkpoints, interactive labs, sandbox environments and 1:1 mentorship.',
        url: 'https://www.outlinedev.com/path',
    }
};

export default function Page() {
    return <PathIndexPage />;
}
