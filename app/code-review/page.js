import CodeReviewPage from './CodeReviewClient';

export const metadata = {
    title: 'Expert Code Review & PR Audits | OutlineDev',
    description: 'Get your pull requests and code reviewed by senior software engineers. Identify performance bottlenecks, security flaws, and architectural optimizations.',
    alternates: {
        canonical: 'https://www.outlinedev.com/code-review',
    },
    openGraph: {
        title: 'Expert Code Review & PR Audits | OutlineDev',
        description: 'Get your pull requests and code reviewed by senior software engineers. Identify performance bottlenecks, security flaws, and architectural optimizations.',
        url: 'https://www.outlinedev.com/code-review',
    }
};

export default function Page() {
    return <CodeReviewPage />;
}
