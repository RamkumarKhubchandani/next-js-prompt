import BlogAdmin from '../components/BlogAdmin';
export default function AdminLayout({ children }) {
    return (
      <div className="flex min-h-screen">
        
       <BlogAdmin />
      </div>
    );
  }