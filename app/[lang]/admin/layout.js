'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';


const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }) {
  const { lang } = useParams();

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
        <nav className="space-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={`/${lang}${href}`}
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 bg-gray-50 rounded-l-3xl shadow-inner">
        {children}
      </main>
    </div>
  );
}
