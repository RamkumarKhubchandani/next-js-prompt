import { Header } from '../components/Header';

export default function ShopLayout({ children }) {
    return (
        <div>
            <Header showNav={false} />
            <main>{children}</main>
        </div>
    );
}
