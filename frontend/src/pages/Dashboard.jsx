import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks] = useLocalStorage('yf_tasks', []);
  const [journal] = useLocalStorage('yf_journal', []);
  const [events] = useLocalStorage('yf_events', []);
  const [bookmarks] = useLocalStorage('yf_bookmarks', {});
  const [reading] = useLocalStorage('yf_reading', {});

  const activeTasks = tasks.filter((t) => !t.completed);
  const doneTasks = tasks.filter((t) => t.completed);
  const bookmarksCount = Object.values(bookmarks).filter(Boolean).length;
  const readingCount = Object.entries(reading).filter(
    ([, percent]) => percent > 0 && percent < 100
  ).length;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const streamLabel =
    user?.grade >= 11 && user?.stream
      ? `Grade ${user.grade} · ${user.stream}`
      : `Grade ${user?.grade ?? '—'}`;

  return (
    <div className="space-y-6 animate-in">
      {/* ─── HERO BANNER with playful blobs ─── */}
      <div className="card relative overflow-hidden">
        {/* Blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 animate-blob rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-500/25" />
          <div className="animation-delay-2000 absolute right-10 -top-10 h-64 w-64 animate-blob rounded-full bg-purple-400/30 blur-3xl dark:bg-purple-500/25" />
          <div className="animation-delay-4000 absolute bottom-0 left-1/3 h-72 w-72 animate-blob rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/20" />
          <div className="animation-delay-6000 absolute -right-20 bottom-0 h-64 w-64 animate-blob rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-500/20" />
        </div>

        <div className="relative z-10 px-6 py-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
            🇪🇹 Ethiopian Curriculum
          </div>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-ink-50">
            {greeting}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-slate-600 dark:text-ink-300">
            {streamLabel}
            {user?.school && ` · ${user.school}`}
          </p>
        </div>

        {/* Stats grid */}
        <div className="relative z-10 grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100 dark:divide-ink-800 dark:border-ink-800 md:grid-cols-4">
          <div className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-ink-500">
              Active tasks
            </div>
            <div className="mt-1 text-xl font-bold text-slate-800 dark:text-ink-50">
              {activeTasks.length}
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-ink-500">
              Completed
            </div>
            <div className="mt-1 text-xl font-bold text-slate-800 dark:text-ink-50">
              {doneTasks.length}
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-ink-500">
              Books reading
            </div>
            <div className="mt-1 text-xl font-bold text-slate-800 dark:text-ink-50">
              {readingCount}
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-ink-500">
              Bookmarks
            </div>
            <div className="mt-1 text-xl font-bold text-slate-800 dark:text-ink-50">
              {bookmarksCount}
            </div>
          </div>
        </div>
      </div>

      {/* ─── QUICK ACTIONS ─── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Link to="/learn" className="card-hover relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/60 blur-2xl dark:bg-blue-500/15" />
          <div className="relative flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-500/10">
              📚
            </span>
            <div className="flex-1">
              <div className="font-semibold text-slate-800 dark:text-ink-50">
                Learn
              </div>
              <div className="text-sm text-slate-500 dark:text-ink-400">
                Study the national curriculum
              </div>
            </div>
            <span className="text-slate-300 dark:text-ink-600">→</span>
          </div>
        </Link>

        <Link to="/library" className="card-hover relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-100/60 blur-2xl dark:bg-amber-500/15" />
          <div className="relative flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-2xl dark:bg-amber-500/10">
              📖
            </span>
            <div className="flex-1">
              <div className="font-semibold text-slate-800 dark:text-ink-50">
                Library
              </div>
              <div className="text-sm text-slate-500 dark:text-ink-400">
                MoE textbooks & free resources
              </div>
            </div>
            <span className="text-slate-300 dark:text-ink-600">→</span>
          </div>
        </Link>

        <Link to="/fields" className="card-hover relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-100/60 blur-2xl dark:bg-purple-500/15" />
          <div className="relative flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-2xl dark:bg-purple-500/10">
              🧭
            </span>
            <div className="flex-1">
              <div className="font-semibold text-slate-800 dark:text-ink-50">
                Explore Fields
              </div>
              <div className="text-sm text-slate-500 dark:text-ink-400">
                Find your future career
              </div>
            </div>
            <span className="text-slate-300 dark:text-ink-600">→</span>
          </div>
        </Link>
      </div>

      {/* ─── TASKS + JOURNAL ─── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-100/50 blur-3xl dark:bg-green-500/10" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-800 dark:text-ink-50">
                Upcoming tasks
              </h2>
              <Link
                to="/tasks"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                View all
              </Link>
            </div>

            <div className="mt-4">
              {activeTasks.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-sm text-slate-400 dark:border-ink-800 dark:text-ink-500">
                  No active tasks. Add one to get started.
                </p>
              ) : (
                <ul className="space-y-2">
                  {activeTasks.slice(0, 5).map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white/60 px-3 py-2.5 backdrop-blur dark:border-ink-800 dark:bg-ink-900/40"
                    >
                      <span
                        className={`h-2 w-2 flex-shrink-0 rounded-full ${
                          t.priority === 'high'
                            ? 'bg-red-500'
                            : t.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-slate-300'
                        }`}
                      />
                      <span className="flex-1 truncate text-sm text-slate-700 dark:text-ink-200">
                        {t.title}
                      </span>
                      {t.due_date && (
                        <span className="text-xs text-slate-400 dark:text-ink-500">
                          {new Date(t.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="card relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-pink-100/50 blur-3xl dark:bg-pink-500/10" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-800 dark:text-ink-50">
                Recent journal
              </h2>
              <Link
                to="/journal"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Open
              </Link>
            </div>

            <div className="mt-4">
              {journal.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-sm text-slate-400 dark:border-ink-800 dark:text-ink-500">
                  No journal entries yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {journal.slice(0, 3).map((e) => (
                    <li
                      key={e.id}
                      className="rounded-xl border border-slate-100 bg-white/60 px-3 py-2.5 backdrop-blur dark:border-ink-800 dark:bg-ink-900/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate text-sm font-medium text-slate-700 dark:text-ink-200">
                          {e.title}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-ink-500">
                          {new Date(e.date).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MORE SHORTCUTS ─── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/tutor" className="card-hover relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-100/50 blur-2xl dark:bg-indigo-500/15" />
          <div className="relative">
            <div className="text-2xl">🤖</div>
            <div className="mt-2 font-semibold text-slate-800 dark:text-ink-50">
              AI Tutor
            </div>
            <div className="text-sm text-slate-500 dark:text-ink-400">
              Ask any question
            </div>
          </div>
        </Link>

        <Link to="/calendar" className="card-hover relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-100/50 blur-2xl dark:bg-orange-500/15" />
          <div className="relative">
            <div className="text-2xl">📅</div>
            <div className="mt-2 font-semibold text-slate-800 dark:text-ink-50">
              Calendar
            </div>
            <div className="text-sm text-slate-500 dark:text-ink-400">
              {events.length} events scheduled
            </div>
          </div>
        </Link>

        <Link to="/profile" className="card-hover relative overflow-hidden p-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-100/50 blur-2xl dark:bg-rose-500/15" />
          <div className="relative">
            <div className="text-2xl">👤</div>
            <div className="mt-2 font-semibold text-slate-800 dark:text-ink-50">
              Profile
            </div>
            <div className="text-sm text-slate-500 dark:text-ink-400">
              Manage your info
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}