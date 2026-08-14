import HtmlCssInterviewPage from './HtmlCssInterviewClient';

export const metadata = {
    title: 'HTML & CSS Interview Questions & Answers | OutlineDev',
    description: 'Vetted interview questions on HTML5 semantic tags, CSS Flexbox/Grid, Responsive Design, Accessibility (a11y), and layout optimization.',
    alternates: {
        canonical: 'https://www.outlinedev.com/interview/html-css',
    },
    openGraph: {
        title: 'HTML & CSS Interview Questions & Answers | OutlineDev',
        description: 'Vetted interview questions on HTML5 semantic tags, CSS Flexbox/Grid, Responsive Design, Accessibility (a11y), and layout optimization.',
        url: 'https://www.outlinedev.com/interview/html-css',
    }
};

export default function Page() {
    return <HtmlCssInterviewPage />;
}
