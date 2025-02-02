"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const topics = [
  { id: 'basics', title: 'JavaScript Basics', slug: 'basics' },
  { id: 'functions', title: 'Functions & Scope', slug: 'functions-and-scope' },
  { id: 'objects', title: 'Objects & Classes', slug: 'objects-and-classes' },
  { id: 'async', title: 'Async Programming', slug: 'async-programming' },
  // Add more topics
];

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="fixed w-64 h-full bg-white border-r border-gray-200 p-4">
      <nav>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link
                href={`/javascript-tutorials/${topic.slug}`}
                className={`block p-2 rounded-lg hover:bg-gray-100 ${
                  pathname === `/javascript-tutorials/${topic.slug}`
                    ? 'bg-gray-100 font-medium'
                    : ''
                }`}
              >
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}