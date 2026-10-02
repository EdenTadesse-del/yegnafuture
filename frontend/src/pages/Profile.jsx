import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from '../components/Avatar.jsx';
import { useToast } from '../components/Toast.jsx';

const INTERESTS = [
  'Biology', 'Chemistry', 'Physics', 'Mathematics', 'English', 'Amharic',
  'History', 'Geography', 'Economics', 'Civics', 'ICT', 'Art', 'Music', 'Sports',
];

const FIELDS = [
  'Medicine & Health Sciences',
  'Engineering & Technology',
  'Computer Science & AI',
  'Business & Economics',
  'Natural Sciences & Research',
  'Social Sciences & Humanities',
  'Creative Arts & Design',
];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({
    name: user?.name || '',
    grade: user?.grade || 9,
    stream: user?.stream || '',
    school: user?.school || '',
    goals: user?.goals || '',
    selectedField: user?.selectedField || '',
    interests: user?.interests || [],
  });

  const needsStream = Number(form.grade) >= 11;

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const save = () => {
    if (needsStream && !form.stream) {
      toast.push('Please select a stream for Grade 11/12', 'error');
      return;
    }
    updateProfile({
      ...form,
      stream: needsStream ? form.stream : '',
    });
    toast.push('Profile updated!', 'success');
  };

  const onPictureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.push('Image must be under 2 MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      updateProfile({ profile_picture: ev.target.result });
      toast.push('Profile picture updated!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const initial = (form.name || '?').charAt(0).toUpperCase();

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">
          Manage your account and study preferences.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-wrap items-end gap-4">
            <div className="relative">
              <Avatar user={{ ...user, ...form }} size={96} />
              <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-blue-600 p-2 text-white shadow-lg transition hover:bg-blue-700">
                📷
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPictureUpload}
                />
              </label>
            </div>

            <div className="flex-1 pb-2">
              <h2 className="text-xl font-bold text-slate-800 dark:text-ink-50">
                {form.name || initial}
              </h2>
              <p className="text-sm text-slate-500 dark:text-ink-400">
                {user?.email}
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <span className="chip">Grade {form.grade}</span>
                {needsStream && form.stream && (
                  <span className="chip">{form.stream}</span>
                )}
                {form.school && <span className="chip">{form.school}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">
          Account information
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Full name</label>
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

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

          {needsStream && (
            <div className="sm:col-span-2">
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
                </button>
              </div>
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="label">School</label>
            <input
              className="input"
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              placeholder="e.g. Addis Ketema Secondary School"
            />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">
          Interests
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-ink-400">
          Pick subjects you enjoy. This helps suggest career fields.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {INTERESTS.map((interest) => {
            const active = form.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800'
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">
          Field of interest
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-ink-400">
          Which field would you like to explore?
        </p>

        <select
          className="input mt-3"
          value={form.selectedField}
          onChange={(e) => setForm({ ...form, selectedField: e.target.value })}
        >
          <option value="">Not decided yet</option>
          {FIELDS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">Goals</h3>
        <textarea
          className="input mt-3"
          rows={3}
          value={form.goals}
          onChange={(e) => setForm({ ...form, goals: e.target.value })}
          placeholder="What do you want to achieve this year?"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={save} className="btn-primary">
          Save changes
        </button>
      </div>
    </div>
  );
}