'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { checkAdminAuth } from '@/utils/checkAdminAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getUser } from '@/api-gateways/user';
import LoadingUI from '@/components/common/LoadingUi';


const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/blogpost', label: 'Create Blog' },
  { href: '/admin/admincreate', label: 'Create Admin' },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    getUser(
      (data) => {
        setUser(data);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch user data:", error);
        router.push(`/auth`);
      }
    )

  }, []);

  const { lang } = useParams();

  if (loading) return <LoadingUI />;

  return (
    <>
      {
        !loading &&
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
          <aside className="w-64 bg-white shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
            <nav className="space-y-2">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={`/${lang}${href}`}
                  className="block px-3 py-2 rounded-lg transition text-gray-700 hover:bg-blue-100 hover:text-blue-700"

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
      }
    </>
  );
}
