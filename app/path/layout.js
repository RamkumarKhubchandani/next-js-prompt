import { Header } from '../components/Header';

export default function PathLayout({ children }) {
    return (
        <div>
            <Header showNav={true} />
            <main>{children}</main>
        </div>
    );
}
