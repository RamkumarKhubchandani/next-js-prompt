import { Header } from '../components/Header';

export const metadata = {
    title: "Project Showcase | OutlineDev",
    description: "Explore top-tier projects built by the OutlineDev community. From AI agents to 3D portfolios, see what our students are building.",
    alternates: {
        canonical: 'https://outlinedev.com/showcase',
    }
};

export default function ShowcaseLayout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}



