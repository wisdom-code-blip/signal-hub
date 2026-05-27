'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// ─── Inline SVG Icons ─────────────────────────────────────────────
const Icons = {
  Dashboard: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  ),
  Search: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  History: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Star: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Wallet: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  // Provider icons
  Chart: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  Add: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Money: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Withdraw: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

// ─── Nav configs ──────────────────────────────────────────────────
const buyerNav = [
  { name: 'Dashboard', href: '/dashboard', icon: Icons.Dashboard },
  { name: 'Marketplace', href: '/marketplace', icon: Icons.Search },
  { name: 'My Purchases', href: '/dashboard/purchases', icon: Icons.History },
  { name: 'Watchlist', href: '/dashboard/watchlist', icon: Icons.Star },
  { name: 'Wallet', href: '/dashboard/wallet', icon: Icons.Wallet },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Icons.Bell },
  { name: 'Settings', href: '/dashboard/settings', icon: Icons.Settings },
];

const providerNav = [
  { name: 'Dashboard', href: '/provider', icon: Icons.Dashboard },
  { name: 'My Signals', href: '/provider/signals', icon: Icons.Chart },
  { name: 'Create Signal', href: '/provider/create-signal', icon: Icons.Add },
  { name: 'Earnings', href: '/provider/earnings', icon: Icons.Money },
  { name: 'Withdraw', href: '/provider/withdraw', icon: Icons.Withdraw },
  { name: 'Analytics', href: '/provider/analytics', icon: Icons.Analytics },
  { name: 'Notifications', href: '/provider/notifications', icon: Icons.Bell },
  { name: 'Settings', href: '/provider/settings', icon: Icons.Settings },
];

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: Icons.Dashboard },
  { name: 'Users', href: '/admin/users', icon: Icons.Users },
  { name: 'Providers', href: '/admin/providers', icon: Icons.Analytics },
  { name: 'Signals', href: '/admin/signals', icon: Icons.Chart },
  { name: 'Settings', href: '/admin/settings', icon: Icons.Settings },
];

// ─── Layout ───────────────────────────────────────────────────────
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.role;
  const nav = role === 'admin' ? adminNav : role === 'provider' ? providerNav : buyerNav;

  const isActive = (href: string) => {
    const exactRoutes = ['/dashboard', '/provider', '/admin'];
    if (exactRoutes.includes(href)) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const displayName = user?.name || user?.email?.split('@')[0] || 'User';
  const displayInitial = displayName.charAt(0).toUpperCase();
  const notifHref = role === 'provider' ? '/provider/notifications' : '/dashboard/notifications';

  return (
    <div className="min-h-screen bg-[#080808] flex">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed top-0 left-0 z-30 w-64 h-full flex flex-col
        bg-[#0a0a0a] border-r border-[#1a1a1a]
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[#1a1a1a]">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-orange-500/30 flex-shrink-0">
            S
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-white">Signal</span>
            <span className="text-orange-500">Hub</span>
          </span>
        </div>

        {/* Role badge */}
        <div className="px-5 py-3 border-b border-[#1a1a1a]">
          <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${
            role === 'admin' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
            : role === 'provider' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
          }`}>
            {role === 'admin' ? '⚙ Admin' : role === 'provider' ? '📡 Provider' : '📈 Buyer'}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-mono text-sm ${
                  active
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20'
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
                {item.name === 'Notifications' && (
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User + Sign Out */}
        <div className="px-3 pb-4 pt-3 border-t border-[#1a1a1a] space-y-2">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#111] border border-[#1a1a1a]">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {displayInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{displayName}</p>
              <p className="text-zinc-600 text-[10px] font-mono capitalize">{role || 'buyer'}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-mono text-sm"
          >
            <Icons.Logout />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top navbar */}
        <header className="sticky top-0 z-10 bg-[#080808]/95 backdrop-blur-xl border-b border-[#1a1a1a] px-4 sm:px-6 h-14 flex items-center justify-between flex-shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-400 transition-all"
          >
            <Icons.Menu />
          </button>

          {/* Page path breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-600">
            <span className="text-orange-500">SignalHub</span>
            <span>/</span>
            <span className="text-zinc-400 capitalize">{pathname.split('/').filter(Boolean).join(' / ')}</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Notification bell */}
            <Link
              href={notifHref}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
            >
              <Icons.Bell />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#080808]" />
            </Link>

            {/* Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              {displayInitial}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}