import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from '../components/Avatar.jsx';
import { useToast } from '../components/Toast.jsx';

const ALL_INTERESTS = [
  'Biology', 'Chemistry', 'Physics', 'Mathematics', 'English', 'Amharic',
  'History', 'Geography', 'Economics', 'Civics', 'ICT', 'Art', 'Music', 'Sports',
];

const FIELDS = [
  'Medicine', 'Nursing', 'Pharmacy', 'Dentistry', 'Midwifery', 'Public Health',
  'Veterinary Medicine', 'Physiotherapy', 'Medical Laboratory Science', 'Radiology',
  'Optometry', 'Anesthesia', 'Surgery', 'Pediatrics', 'Psychiatry',
  'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering',
  'Software Engineering', 'Computer Science', 'Chemical Engineering',
  'Aerospace Engineering', 'Biomedical Engineering', 'Environmental Engineering',
  'Mining Engineering', 'Petroleum Engineering', 'Agricultural Engineering',
  'Industrial Engineering', 'Marine Engineering', 'Surveying & Geomatics',
  'Architecture', 'Construction Management',
  'Data Science', 'Artificial Intelligence', 'Cybersecurity', 'Information Systems',
  'Networking', 'Web Development', 'Mobile App Development', 'Game Development',
  'Cloud Computing', 'Robotics', 'Database Administration', 'DevOps Engineering',
  'UI/UX Design',
  'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Statistics', 'Geology',
  'Environmental Science', 'Biotechnology', 'Microbiology', 'Astronomy',
  'Meteorology', 'Oceanography', 'Zoology', 'Botany', 'Materials Science',
  'Business Administration', 'Accounting', 'Finance', 'Marketing', 'Entrepreneurship',
  'Economics', 'Human Resource Management', 'Supply Chain Management',
  'Banking & Insurance', 'International Business', 'Project Management',
  'Public Administration',
  'Law', 'Political Science', 'International Relations', 'Sociology', 'Psychology',
  'History', 'Geography', 'Anthropology', 'Archaeology', 'Social Work',
  'Criminology', 'Education & Teaching', 'Journalism',
  'Graphic Design', 'Interior Design', 'Fashion Design', 'Film & Media',
  'Photography', 'Music', 'Fine Arts', 'Theatre & Drama', 'Animation',
  'Writing & Literature',
  'Agriculture', 'Animal Science', 'Plant Science', 'Food Science',
  'Tourism & Hospitality',
];

// Map each field to related subjects (interests)
const FIELD_SUBJECTS = {
  Medicine: ['Biology', 'Chemistry', 'Physics'],
  Nursing: ['Biology', 'Chemistry', 'English'],
  Pharmacy: ['Chemistry', 'Biology', 'Mathematics'],
  Dentistry: ['Biology', 'Chemistry', 'Physics'],
  Midwifery: ['Biology', 'Chemistry', 'English'],
  'Public Health': ['Biology', 'Civics', 'Mathematics'],
  'Veterinary Medicine': ['Biology', 'Chemistry', 'Physics'],
  Physiotherapy: ['Biology', 'Physics', 'English'],
  'Medical Laboratory Science': ['Biology', 'Chemistry', 'Mathematics'],
  Radiology: ['Physics', 'Biology', 'Mathematics'],
  Optometry: ['Biology', 'Physics', 'Chemistry'],
  Anesthesia: ['Biology', 'Chemistry', 'Physics'],
  Surgery: ['Biology', 'Chemistry', 'Physics'],
  Pediatrics: ['Biology', 'Chemistry', 'English'],
  Psychiatry: ['Biology', 'Civics', 'English'],

  'Civil Engineering': ['Mathematics', 'Physics', 'Chemistry'],
  'Mechanical Engineering': ['Mathematics', 'Physics', 'Chemistry'],
  'Electrical Engineering': ['Mathematics', 'Physics', 'Chemistry'],
  'Software Engineering': ['Mathematics', 'ICT', 'Physics'],
  'Computer Science': ['Mathematics', 'ICT', 'Physics'],
  'Chemical Engineering': ['Chemistry', 'Mathematics', 'Physics'],
  'Aerospace Engineering': ['Mathematics', 'Physics', 'Chemistry'],
  'Biomedical Engineering': ['Biology', 'Physics', 'Mathematics'],
  'Environmental Engineering': ['Chemistry', 'Biology', 'Mathematics'],
  'Mining Engineering': ['Chemistry', 'Physics', 'Mathematics'],
  'Petroleum Engineering': ['Chemistry', 'Physics', 'Mathematics'],
  'Agricultural Engineering': ['Biology', 'Chemistry', 'Mathematics'],
  'Industrial Engineering': ['Mathematics', 'Physics', 'Economics'],
  'Marine Engineering': ['Mathematics', 'Physics', 'Chemistry'],
  'Surveying & Geomatics': ['Mathematics', 'Geography', 'Physics'],
  Architecture: ['Mathematics', 'Physics', 'Art'],
  'Construction Management': ['Mathematics', 'Physics', 'Economics'],

  'Data Science': ['Mathematics', 'ICT', 'Physics'],
  'Artificial Intelligence': ['Mathematics', 'ICT', 'Physics'],
  Cybersecurity: ['Mathematics', 'ICT', 'Physics'],
  'Information Systems': ['Mathematics', 'ICT', 'Economics'],
  Networking: ['Mathematics', 'ICT', 'Physics'],
  'Web Development': ['ICT', 'Mathematics', 'English'],
  'Mobile App Development': ['ICT', 'Mathematics', 'Physics'],
  'Game Development': ['ICT', 'Mathematics', 'Physics'],
  'Cloud Computing': ['ICT', 'Mathematics', 'Physics'],
  Robotics: ['Mathematics', 'Physics', 'ICT'],
  'Database Administration': ['ICT', 'Mathematics', 'English'],
  'DevOps Engineering': ['ICT', 'Mathematics', 'Physics'],
  'UI/UX Design': ['ICT', 'Art', 'English'],

  Biology: ['Biology', 'Chemistry', 'Mathematics'],
  Chemistry: ['Chemistry', 'Mathematics', 'Physics'],
  Physics: ['Physics', 'Mathematics', 'Chemistry'],
  Mathematics: ['Mathematics', 'Physics', 'ICT'],
  Statistics: ['Mathematics', 'ICT', 'Economics'],
  Geology: ['Geography', 'Chemistry', 'Physics'],
  'Environmental Science': ['Biology', 'Chemistry', 'Geography'],
  Biotechnology: ['Biology', 'Chemistry', 'Mathematics'],
  Microbiology: ['Biology', 'Chemistry', 'Mathematics'],
  Astronomy: ['Physics', 'Mathematics', 'Chemistry'],
  Meteorology: ['Physics', 'Mathematics', 'Geography'],
  Oceanography: ['Biology', 'Chemistry', 'Geography'],
  Zoology: ['Biology', 'Chemistry', 'Geography'],
  Botany: ['Biology', 'Chemistry', 'Geography'],
  'Materials Science': ['Chemistry', 'Physics', 'Mathematics'],

  'Business Administration': ['Economics', 'Mathematics', 'English'],
  Accounting: ['Mathematics', 'Economics', 'English'],
  Finance: ['Mathematics', 'Economics', 'English'],
  Marketing: ['English', 'Economics', 'ICT'],
  Entrepreneurship: ['Economics', 'Mathematics', 'English'],
  Economics: ['Economics', 'Mathematics', 'Geography'],
  'Human Resource Management': ['Economics', 'Civics', 'English'],
  'Supply Chain Management': ['Mathematics', 'Economics', 'Geography'],
  'Banking & Insurance': ['Mathematics', 'Economics', 'English'],
  'International Business': ['Economics', 'English', 'Geography'],
  'Project Management': ['Mathematics', 'Economics', 'English'],
  'Public Administration': ['Civics', 'Economics', 'English'],

  Law: ['Civics', 'English', 'History'],
  'Political Science': ['Civics', 'History', 'English'],
  'International Relations': ['Civics', 'History', 'English'],
  Sociology: ['Civics', 'History', 'English'],
  Psychology: ['Biology', 'Civics', 'English'],
  History: ['History', 'Geography', 'English'],
  Geography: ['Geography', 'History', 'English'],
  Anthropology: ['History', 'Biology', 'English'],
  Archaeology: ['History', 'Geography', 'English'],
  'Social Work': ['Civics', 'Biology', 'English'],
  Criminology: ['Civics', 'History', 'English'],
  'Education & Teaching': ['English', 'Mathematics', 'Physics'],
  Journalism: ['English', 'History', 'Civics'],

  'Graphic Design': ['ICT', 'English', 'Art'],
  'Interior Design': ['Art', 'Mathematics', 'English'],
  'Fashion Design': ['Art', 'English', 'ICT'],
  'Film & Media': ['English', 'ICT', 'History'],
  Photography: ['Art', 'ICT', 'English'],
  Music: ['Music', 'English', 'History'],
  'Fine Arts': ['Art', 'History', 'English'],
  'Theatre & Drama': ['English', 'History', 'Art'],
  Animation: ['ICT', 'Art', 'Mathematics'],
  'Writing & Literature': ['English', 'History', 'Amharic'],

  Agriculture: ['Biology', 'Chemistry', 'Geography'],
  'Animal Science': ['Biology', 'Chemistry', 'Mathematics'],
  'Plant Science': ['Biology', 'Chemistry', 'Geography'],
  'Food Science': ['Chemistry', 'Biology', 'Mathematics'],
  'Tourism & Hospitality': ['English', 'Geography', 'Economics'],
};

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

  const bannerRef = useRef(null);
  const avatarRef = useRef(null);

  const needsStream = Number(form.grade) >= 11;

  // Auto-populate interests when the user picks a field
  const setField = (field) => {
    const relatedSubjects = FIELD_SUBJECTS[field] || [];
    setForm((prev) => ({
      ...prev,
      selectedField: field,
      interests: Array.from(new Set([...prev.interests, ...relatedSubjects])),
    }));
    if (field) toast.push(`Related subjects added`, 'info');
  };

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

  const onBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.push('Banner must be under 4 MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateProfile({ banner_picture: ev.target.result });
      toast.push('Banner updated!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const onAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.push('Profile picture must be under 2 MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateProfile({ profile_picture: ev.target.result });
      toast.push('Profile picture updated!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const relatedSubjects = FIELD_SUBJECTS[form.selectedField] || [];
  const bannerSrc = user?.banner_picture;

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">
          Manage your account, field of interest, and study preferences.
        </p>
      </div>

      {/* YouTube-style banner + avatar */}
      <div className="card overflow-hidden">
        <div
          className="relative h-40 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 sm:h-52"
          style={
            bannerSrc
              ? {
                  backgroundImage: `url(${bannerSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          <label className="absolute right-3 top-3 cursor-pointer rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-black/60">
            📷 Change banner
            <input
              ref={bannerRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onBannerUpload}
            />
          </label>
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-14 flex flex-wrap items-end gap-4">
            <div className="relative">
              <Avatar user={{ ...user, ...form }} size={112} />
              <label className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-blue-600 p-2 text-white shadow-lg transition hover:bg-blue-700">
                📷
                <input
                  ref={avatarRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onAvatarUpload}
                />
              </label>
            </div>

            <div className="flex-1 pb-2">
              <h2 className="text-xl font-bold text-slate-800 dark:text-ink-50">
                {form.name || 'Unnamed'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-ink-400">
                {user?.email}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="chip">Grade {form.grade}</span>
                {needsStream && form.stream && <span className="chip">{form.stream}</span>}
                {form.school && <span className="chip">{form.school}</span>}
                {form.selectedField && (
                  <span className="chip bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200">
                    🎯 {form.selectedField}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account info */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">Account information</h3>

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

      {/* Field of interest — dropdown with 100 fields */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">
          🎯 Field of interest
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-ink-400">
          Pick a career field — we'll add the related subjects below.
        </p>

        <select
          className="input mt-3"
          value={form.selectedField}
          onChange={(e) => setField(e.target.value)}
        >
          <option value="">Not decided yet</option>
          {FIELDS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        {form.selectedField && relatedSubjects.length > 0 && (
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
            <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
              Related subjects for {form.selectedField}
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {relatedSubjects.map((s) => (
                <span key={s} className="chip bg-white dark:bg-ink-900">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interests */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">
          ⭐ Interests
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-ink-400">
          Pick subjects you enjoy. Related subjects are added automatically when you choose a field.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {ALL_INTERESTS.map((interest) => {
            const active = form.interests.includes(interest);
            const isRelated = relatedSubjects.includes(interest);
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
                {isRelated && !active && (
                  <span className="ml-1 text-xs text-blue-500">•</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Goals */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">🎯 Goals</h3>
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
          💾 Save changes
        </button>
      </div>
    </div>
  );
}