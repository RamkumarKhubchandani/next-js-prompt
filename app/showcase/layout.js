import { Header } from '../components/Header';

export default function ShowcaseLayout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}

