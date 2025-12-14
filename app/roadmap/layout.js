import { Header } from '../components/Header';

export default function RoadmapLayout({ children }) {
  return (
    <div>
      <Header showNav={false} />
      <main>{children}</main>
    </div>
  );
}



