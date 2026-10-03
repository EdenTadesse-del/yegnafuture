import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Avatar from './Avatar.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';

const NAV = [
  { to: '/', label: 'Home',  end: true },
  { to: '/learn', label: 'Learn', },
  { to: '/library', label: 'Library',  },
  { to: '/fields', label: 'Explore Fields',  },
  { to: '/tutor', label: 'AI Tutor',  },
  { to: '/tasks', label: 'Tasks', icon: '' },
  { to: '/calendar', label: 'Calendar', icon: '📅' },
  { to: '/journal', label: 'Journal', icon: '📓' },
  { to: '/profile', label: 'Profile', icon: '' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    if (!confirm('Log out of YegnaFuture?')) return;
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-ink-950">
      {/* ─── SIDEBAR ─── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform dark:border-ink-800 dark:bg-ink-900 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header with logo + subtle blob */}
        <div className="relative flex h-20 items-center gap-2 overflow-hidden border-b border-slate-100 px-4 dark:border-ink-800">
          <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-200/40 blur-2xl dark:bg-blue-500/15" />

          <img
            src="/yegnafuture-logo.png"
            alt="YegnaFuture"
            className="relative h-14 w-14 rounded-xl object-contain"
          />
          <div className="relative">
            <div className="text-sm font-bold text-slate-800 dark:text-ink-50">
              YegnaFuture
            </div>
            <div className="text-[10px] text-slate-400 dark:text-ink-500">
              Learn · Grow · Build Your Future
            </div>
          </div>
        </div>

        <nav
          className="flex flex-col gap-0.5 overflow-y-auto p-3"
          style={{ height: 'calc(100vh - 5rem)' }}
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-ink-300 dark:hover:bg-ink-800'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 dark:border-ink-800">
              <Avatar user={user} size={36} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-700 dark:text-ink-100">
                  {user?.name}
                </div>
                <div className="truncate text-xs text-slate-400 dark:text-ink-500">
                  {user?.stream
                    ? `Grade ${user.grade} · ${user.stream}`
                    : `Grade ${user?.grade ?? '—'}`}
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Log out"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-ink-800"
              >
                ⏻
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ─── MAIN ─── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header with subtle animated background */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 overflow-hidden border-b border-slate-200 bg-white px-4 dark:border-ink-800 dark:bg-ink-900 lg:px-8">
          {/* Small blobs behind the header */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-12 -top-8 h-32 w-32 rounded-full bg-blue-200/20 blur-2xl dark:bg-blue-500/10" />
            <div className="absolute right-1/4 -top-10 h-32 w-32 rounded-full bg-purple-200/20 blur-2xl dark:bg-purple-500/10" />
          </div>

          <button
            className="relative rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-ink-800 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="text-slate-600 dark:text-ink-200">☰</span>
          </button>

          {/* Mobile logo */}
          <img
            src="/yegnafuture-logo.png"
            alt="YegnaFuture"
            className="relative h-11 w-11 object-contain lg:hidden"
          />

          <div className="relative ml-auto flex items-center gap-3">
            <ThemeSwitch theme={theme} onToggle={toggleTheme} />

            <span className="hidden text-sm text-slate-500 dark:text-ink-300 sm:inline">
              Hi, {user?.name?.split(' ')[0]} 👋
            </span>

            <Avatar user={user} size={34} />
          </div>
        </header>

        {/* Main content with subtle backdrop blobs */}
        <main className="relative flex-1 overflow-hidden px-4 py-6 lg:px-8 lg:py-8">
          {/* Background blobs behind all page content */}
          <div className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute -left-32 top-10 h-80 w-80 animate-blob rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-500/10" />
            <div className="animation-delay-2000 absolute right-0 top-1/3 h-72 w-72 animate-blob rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-500/10" />
            <div className="animation-delay-4000 absolute bottom-0 left-1/3 h-72 w-72 animate-blob rounded-full bg-amber-200/30 blur-3xl dark:bg-amber-500/10" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}