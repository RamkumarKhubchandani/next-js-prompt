import { Header } from '../components/Header';

export default function DashboardLayout({ children }) {
    return (
        <div>
            <Header showNav={true} />
            <main>{children}</main>
        </div>
    );
}



