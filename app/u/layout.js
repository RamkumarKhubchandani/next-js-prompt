import { Header } from '../components/Header';

export default function PublicProfileLayout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
        </div>
    );
}

