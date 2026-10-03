import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import ThemeSwitch from '../components/ThemeSwitch.jsx';

export default function Login() {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isDark = theme === 'dark';

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
      {/* ─── LEFT BRAND PANEL (desktop only) ─── */}
      <div
        className={`relative hidden flex-1 flex-col justify-between overflow-hidden p-12 lg:flex ${
          isDark ? 'bg-ink-950' : 'bg-white'
        }`}
      >
        {/* Playful animated background blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 animate-blob rounded-full bg-blue-400/40 blur-3xl dark:bg-blue-500/30" />
          <div className="animation-delay-2000 absolute right-0 top-1/3 h-80 w-80 animate-blob rounded-full bg-purple-400/40 blur-3xl dark:bg-purple-500/30" />
          <div className="animation-delay-4000 absolute bottom-0 left-1/4 h-72 w-72 animate-blob rounded-full bg-amber-300/40 blur-3xl dark:bg-amber-500/20" />
          <div className="animation-delay-6000 absolute -right-20 bottom-1/4 h-64 w-64 animate-blob rounded-full bg-emerald-300/40 blur-3xl dark:bg-emerald-500/20" />
        </div>

        {/* Top: logo + theme switch */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/yegnafuture-logo.png"
              alt="YegnaFuture"
              className="h-16 w-16 rounded-2xl object-contain"
            />
            <span className="text-xl font-bold text-slate-800 dark:text-ink-50">
              YegnaFuture
            </span>
          </div>
          <ThemeSwitch theme={theme} onToggle={toggleTheme} />
        </div>

        {/* Middle: hero content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
            🇪🇹 Built for the Ethiopian Curriculum
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-ink-50">
            Your journey.
            <br />
            Your future.
          </h1>

          <p className="mt-4 max-w-md text-slate-600 dark:text-ink-300">
            The learning platform for Ethiopian Grade 9–12 students. Discover your
            field, follow a personalized path to university, and study the national
            curriculum with AI support.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 text-sm text-slate-600 dark:text-ink-300">
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

        {/* Bottom: copyright */}
        <p className="relative z-10 text-xs text-slate-400 dark:text-ink-500">
          © {new Date().getFullYear()} YegnaFuture · Made for Ethiopian students
        </p>
      </div>

      {/* ─── RIGHT FORM PANEL ─── */}
      <div
        className={`flex flex-1 items-center justify-center p-6 ${
          isDark ? 'bg-ink-950' : 'bg-slate-50'
        }`}
      >
        <div className="w-full max-w-sm">
          {/* Mobile header (logo + switch) */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <img
              src="/yegnafuture-logo.png"
              alt="YegnaFuture"
              className="h-16 w-16 object-contain"
            />
            <ThemeSwitch theme={theme} onToggle={toggleTheme} />
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