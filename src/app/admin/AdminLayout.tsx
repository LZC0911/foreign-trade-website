"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, LogOut, Menu, X, Globe } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/customers?page=1&pageSize=1', {
          credentials: 'include',
        });
        if (res.ok) {
          setAuthenticated(true);
        } else {
          router.push('/admin');
        }
      } catch {
        router.push('/admin');
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/customers', label: 'Customers', icon: Users },
  ];

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-[#c9a64a] text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060912] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0d1320] border-r border-[#c9a64a]/10 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#c9a64a]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#c9a64a] flex items-center justify-center">
                <span className="text-[#c9a64a] font-bold text-lg">A</span>
              </div>
              <div>
                <div className="text-[#e8edf5] font-semibold tracking-wider">APEX Admin</div>
                <div className="text-[#c9a64a] text-[10px] tracking-[2px] uppercase">Control Panel</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-[#c9a64a]/10 text-[#c9a64a] border border-[#c9a64a]/30'
                    : 'text-[#8b95a7] hover:bg-white/5 hover:text-[#e8edf5]'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* External Link */}
          <div className="p-4 border-t border-[#c9a64a]/10 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#8b95a7] hover:text-[#c9a64a] hover:bg-white/5 rounded-lg transition-all"
            >
              <Globe size={18} />
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#8b95a7] hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#0d1320]/95 backdrop-blur border-b border-[#c9a64a]/10 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              className="lg:hidden text-[#c9a64a]"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="text-[#e8edf5] font-semibold">
              {navItems.find((i) => i.href === pathname)?.label || 'Admin'}
            </div>
            <div className="w-10 h-10 bg-[#c9a64a]/10 border border-[#c9a64a]/30 rounded-full flex items-center justify-center text-[#c9a64a] font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
