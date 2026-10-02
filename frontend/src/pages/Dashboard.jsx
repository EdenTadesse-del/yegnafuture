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
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const streamLabel =
    user?.grade >= 11 && user?.stream
      ? `Grade ${user.grade} · ${user.stream}`
      : `Grade ${user?.grade ?? '—'}`;

  return (
    <div className="space-y-6 animate-in">
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-6 py-7 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            🇪🇹 Ethiopian Curriculum
          </div>
          <h1 className="mt-3 text-2xl font-bold">
            {greeting}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-white/85">
            {streamLabel}
            {user?.school && ` · ${user.school}`}
          </p>
        </div>

        <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-ink-800 md:grid-cols-4">
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

      <div className="grid gap-4 lg:grid-cols-3">
        <Link to="/learn" className="card-hover p-5">
          <div className="flex items-center gap-4">
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

        <Link to="/library" className="card-hover p-5">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-2xl dark:bg-yellow-500/10">
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

        <Link to="/fields" className="card-hover p-5">
          <div className="flex items-center gap-4">
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
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
                    className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5 dark:border-ink-800"
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

        <div className="card p-5">
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
                    className="rounded-xl border border-slate-100 px-3 py-2.5 dark:border-ink-800"
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

      <div className="grid gap-4 sm:grid-cols-3">
        <Link to="/tutor" className="card-hover p-5">
          <div className="text-2xl">🤖</div>
          <div className="mt-2 font-semibold text-slate-800 dark:text-ink-50">
            AI Tutor
          </div>
          <div className="text-sm text-slate-500 dark:text-ink-400">
            Ask any question
          </div>
        </Link>

        <Link to="/calendar" className="card-hover p-5">
          <div className="text-2xl">📅</div>
          <div className="mt-2 font-semibold text-slate-800 dark:text-ink-50">
            Calendar
          </div>
          <div className="text-sm text-slate-500 dark:text-ink-400">
            {events.length} events scheduled
          </div>
        </Link>

        <Link to="/profile" className="card-hover p-5">
          <div className="text-2xl">👤</div>
          <div className="mt-2 font-semibold text-slate-800 dark:text-ink-50">
            Profile
          </div>
          <div className="text-sm text-slate-500 dark:text-ink-400">
            Manage your info
          </div>
        </Link>
      </div>
    </div>
  );
}