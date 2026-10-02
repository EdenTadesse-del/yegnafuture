import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-ink-950">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              Y
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-ink-50">
              YegnaFuture
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200 bg-white p-2 text-lg dark:border-ink-700 dark:bg-ink-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            🇪🇹 Ethiopian Curriculum
          </div>
          <h1 className="mt-3 text-2xl font-bold text-slate-800 dark:text-ink-50">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-ink-400">
            Start building your future today.
          </p>
        </div>

        <div className="card p-6">
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
  );
}