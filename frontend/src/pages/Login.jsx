import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white lg:flex">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-bold backdrop-blur">
              Y
            </div>
            <span className="text-lg font-bold">YegnaFuture</span>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-white/20 bg-white/10 p-2 text-lg backdrop-blur transition hover:bg-white/20"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            🇪🇹 Built for the Ethiopian Curriculum
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight">
            Your journey.
            <br />
            Your future.
          </h1>
          <p className="mt-4 max-w-md text-white/85">
            The learning platform for Ethiopian Grade 9–12 students. Discover your
            field, follow a personalized path to university, and study the national
            curriculum with AI support.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold">📚</div>
              National Curriculum
            </div>
            <div>
              <div className="text-2xl font-bold">🧭</div>
              Natural & Social Streams
            </div>
            <div>
              <div className="text-2xl font-bold">🎓</div>
              University Roadmap
            </div>
          </div>
        </div>

        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} YegnaFuture · Made for Ethiopian students
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-slate-50 p-6 dark:bg-ink-950">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                Y
              </div>
              <span className="text-lg font-bold text-slate-800 dark:text-ink-50">
                YegnaFuture
              </span>
            </div>
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-slate-200 bg-white p-2 dark:border-ink-700 dark:bg-ink-800"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-ink-50">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-ink-400">
            Log in to continue your journey.
          </p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                required
                className="input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                required
                className="input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={busy} className="btn-primary w-full">
              {busy ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-ink-400">
            New to YegnaFuture?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}