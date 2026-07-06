import { Header } from '../components/Header';

export const metadata = {
    title: 'Student Dashboard | OutlineDev',
    description: 'Track your programming XP, daily focus goals, active roadmaps, and certifications.',
};

export default function DashboardLayout({ children }) {
    return (
        <div>
            <Header showNav={true} />
            <main>{children}</main>
        </div>
    );
}



