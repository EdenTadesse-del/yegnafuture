import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import ThemeSwitch from '../components/ThemeSwitch.jsx';

export default function Register() {
  const { register } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    grade: 9,
    stream: '',
    school: '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isDark = theme === 'dark';
  const needsStream = Number(form.grade) >= 11;

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (needsStream && !form.stream) {
      setError('Please select Natural or Social Science stream for Grade 11/12');
      return;
    }

    setBusy(true);
    try {
      await register({
        ...form,
        grade: Number(form.grade),
        stream: needsStream ? form.stream : '',
      });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed');
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
            🇪🇹 Ethiopian Curriculum · Grades 9–12
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-ink-50">
            Join YegnaFuture.
            <br />
            Shape your tomorrow.
          </h1>

          <p className="mt-4 max-w-md text-slate-600 dark:text-ink-300">
            Create a free account and start your journey. Learn the national
            curriculum, take notes, save assignments, explore 100 career fields,
            and plan your path to university.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 text-sm text-slate-600 dark:text-ink-300">
            <div>
              <div className="text-2xl font-bold">📝</div>
              Take notes per subject
            </div>
            <div>
              <div className="text-2xl font-bold">📸</div>
              Save assignment photos
            </div>
            <div>
              <div className="text-2xl font-bold">🚀</div>
              Explore 100 fields
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
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <img
              src="/yegnafuture-logo.png"
              alt="YegnaFuture"
              className="h-16 w-16 object-contain"
            />
            <ThemeSwitch theme={theme} onToggle={toggleTheme} />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-ink-50">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-ink-400">
            Start building your future today.
          </p>

          <div className="card mt-6 p-6">
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="label">Full name</label>
                <input
                  required
                  className="input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Abebe Kebede"
                />
              </div>

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
                  minLength={6}
                  className="input"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="At least 6 characters"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Grade</label>
                  <select
                    className="input"
                    value={form.grade}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        grade: Number(e.target.value),
                        stream: Number(e.target.value) >= 11 ? form.stream : '',
                      })
                    }
                  >
                    {[9, 10, 11, 12].map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">School</label>
                  <input
                    className="input"
                    value={form.school}
                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                    placeholder="School name"
                  />
                </div>
              </div>

              {needsStream && (
                <div>
                  <label className="label">Stream (Grade 11–12)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, stream: 'Natural Science' })}
                      className={`rounded-xl border p-3 text-left transition ${
                        form.stream === 'Natural Science'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                          : 'border-slate-200 hover:border-slate-300 dark:border-ink-700 dark:hover:border-ink-600'
                      }`}
                    >
                      <div className="text-lg">🔬</div>
                      <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-ink-100">
                        Natural Science
                      </div>
                      <div className="text-xs text-slate-500 dark:text-ink-400">
                        Biology, Chemistry, Physics, Maths
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, stream: 'Social Science' })}
                      className={`rounded-xl border p-3 text-left transition ${
                        form.stream === 'Social Science'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                          : 'border-slate-200 hover:border-slate-300 dark:border-ink-700 dark:hover:border-ink-600'
                      }`}
                    >
                      <div className="text-lg">📜</div>
                      <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-ink-100">
                        Social Science
                      </div>
                      <div className="text-xs text-slate-500 dark:text-ink-400">
                        History, Geography, Economics
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" disabled={busy} className="btn-primary w-full">
                {busy ? 'Creating account...' : 'Create account'}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-ink-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}