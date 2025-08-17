"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, PlusCircle } from "lucide-react";

const adminNav = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Manage Posts", href: "/admin/posts", icon: Newspaper },
  { name: "Add New Post", href: "/admin/posts/new", icon: PlusCircle },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="fixed w-64 h-full bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
            {adminNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                    pathname === item.href ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 ml-64">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
}