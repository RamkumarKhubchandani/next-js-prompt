import { Header } from '../components/Header';

export default function DashboardLayout({ children }) {
    return (
        <div>
            <Header showNav={false} />
            <main>{children}</main>
        </div>
    );
}



