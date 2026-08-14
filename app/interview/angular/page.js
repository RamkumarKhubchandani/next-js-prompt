import AngularInterviewPage from './AngularInterviewClient';

export const metadata = {
    title: 'Angular Interview Questions & Answers | OutlineDev',
    description: 'Master Angular interview preparation. Vetted technical interview questions on Dependency Injection, RxJS, Change Detection, Signals, and NgModules.',
    alternates: {
        canonical: 'https://www.outlinedev.com/interview/angular',
    },
    openGraph: {
        title: 'Angular Interview Questions & Answers | OutlineDev',
        description: 'Master Angular interview preparation. Vetted technical interview questions on Dependency Injection, RxJS, Change Detection, Signals, and NgModules.',
        url: 'https://www.outlinedev.com/interview/angular',
    }
};

export default function Page() {
    return <AngularInterviewPage />;
}
