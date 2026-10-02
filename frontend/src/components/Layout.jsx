import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Avatar from './Avatar.jsx';

const NAV = [
  { to: '/', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/learn', label: 'Learn', icon: '📚' },
  { to: '/library', label: 'Library', icon: '📖' },
  { to: '/fields', label: 'Explore Fields', icon: '🧭' },
  { to: '/tutor', label: 'AI Tutor', icon: '🤖' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
  { to: '/calendar', label: 'Calendar', icon: '📅' },
  { to: '/journal', label: 'Journal', icon: '📓' },
  { to: '/profile', label: 'Profile', icon: '👤' },
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
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform dark:border-ink-800 dark:bg-ink-900 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-5 dark:border-ink-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            Y
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-ink-50">
              YegnaFuture
            </div>
            <div className="text-[10px] text-slate-400 dark:text-ink-500">
              Your journey. Your future.
            </div>
          </div>
        </div>

        <nav
          className="flex flex-col gap-0.5 overflow-y-auto p-3"
          style={{ height: 'calc(100vh - 4rem)' }}
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

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-ink-800 dark:bg-ink-900 lg:px-8">
          <button
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-ink-800 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="text-slate-600 dark:text-ink-200">☰</span>
          </button>

          <div className="font-bold text-slate-800 dark:text-ink-50 lg:hidden">
            YegnaFuture
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
              className="rounded-xl border border-slate-200 bg-white p-2 text-lg transition hover:bg-slate-50 dark:border-ink-700 dark:bg-ink-800 dark:hover:bg-ink-700"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <span className="hidden text-sm text-slate-500 dark:text-ink-300 sm:inline">
              Hi, {user?.name?.split(' ')[0]} 👋
            </span>

            <Avatar user={user} size={34} />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}