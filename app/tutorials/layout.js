import { Header } from '../components/Header';

export default function TutorialsLayout({ children }) {
    return (
        <div>
            <Header showNav={false} />
            <main>{children}</main>
        </div>
    );
}
