import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Empty from '../components/Empty.jsx';

const CURRICULUM = {
  9: {
    type: 'general',
    subjects: [
      { name: 'Mathematics', icon: '📐', code: 'Math' },
      { name: 'Biology', icon: '🧬', code: 'Bio' },
      { name: 'Chemistry', icon: '⚗️', code: 'Chem' },
      { name: 'Physics', icon: '🔭', code: 'Phys' },
      { name: 'English', icon: '📖', code: 'Eng' },
      { name: 'Amharic', icon: '🇪🇹', code: 'Amh' },
      { name: 'Civics & Ethics', icon: '⚖️', code: 'Civics' },
      { name: 'Geography', icon: '🌍', code: 'Geo' },
      { name: 'History', icon: '🏛️', code: 'Hist' },
      { name: 'ICT', icon: '💻', code: 'ICT' },
      { name: 'Physical Education', icon: '⚽', code: 'PE' },
    ],
  },
  10: {
    type: 'general',
    subjects: [
      { name: 'Mathematics', icon: '📐', code: 'Math' },
      { name: 'Biology', icon: '🧬', code: 'Bio' },
      { name: 'Chemistry', icon: '⚗️', code: 'Chem' },
      { name: 'Physics', icon: '🔭', code: 'Phys' },
      { name: 'English', icon: '📖', code: 'Eng' },
      { name: 'Amharic', icon: '🇪🇹', code: 'Amh' },
      { name: 'Civics & Ethics', icon: '⚖️', code: 'Civics' },
      { name: 'Geography', icon: '🌍', code: 'Geo' },
      { name: 'History', icon: '🏛️', code: 'Hist' },
      { name: 'ICT', icon: '💻', code: 'ICT' },
      { name: 'Physical Education', icon: '⚽', code: 'PE' },
    ],
  },
  11: {
    'Natural Science': [
      { name: 'Mathematics', icon: '📐', code: 'Math' },
      { name: 'Biology', icon: '🧬', code: 'Bio' },
      { name: 'Chemistry', icon: '⚗️', code: 'Chem' },
      { name: 'Physics', icon: '🔭', code: 'Phys' },
      { name: 'English', icon: '📖', code: 'Eng' },
      { name: 'Amharic', icon: '🇪🇹', code: 'Amh' },
      { name: 'Civics & Ethics', icon: '⚖️', code: 'Civics' },
      { name: 'ICT', icon: '💻', code: 'ICT' },
      { name: 'Physical Education', icon: '⚽', code: 'PE' },
    ],
    'Social Science': [
      { name: 'Mathematics', icon: '📐', code: 'Math' },
      { name: 'Geography', icon: '🌍', code: 'Geo' },
      { name: 'History', icon: '🏛️', code: 'Hist' },
      { name: 'Economics', icon: '📊', code: 'Econ' },
      { name: 'English', icon: '📖', code: 'Eng' },
      { name: 'Amharic', icon: '🇪🇹', code: 'Amh' },
      { name: 'Civics & Ethics', icon: '⚖️', code: 'Civics' },
      { name: 'ICT', icon: '💻', code: 'ICT' },
      { name: 'Physical Education', icon: '⚽', code: 'PE' },
    ],
  },
  12: {
    'Natural Science': [
      { name: 'Mathematics', icon: '📐', code: 'Math' },
      { name: 'Biology', icon: '🧬', code: 'Bio' },
      { name: 'Chemistry', icon: '⚗️', code: 'Chem' },
      { name: 'Physics', icon: '🔭', code: 'Phys' },
      { name: 'English', icon: '📖', code: 'Eng' },
      { name: 'Amharic', icon: '🇪🇹', code: 'Amh' },
      { name: 'Civics & Ethics', icon: '⚖️', code: 'Civics' },
      { name: 'ICT', icon: '💻', code: 'ICT' },
    ],
    'Social Science': [
      { name: 'Mathematics', icon: '📐', code: 'Math' },
      { name: 'Geography', icon: '🌍', code: 'Geo' },
      { name: 'History', icon: '🏛️', code: 'Hist' },
      { name: 'Economics', icon: '📊', code: 'Econ' },
      { name: 'English', icon: '📖', code: 'Eng' },
      { name: 'Amharic', icon: '🇪🇹', code: 'Amh' },
      { name: 'Civics & Ethics', icon: '⚖️', code: 'Civics' },
      { name: 'ICT', icon: '💻', code: 'ICT' },
    ],
  },
};

export default function Learn() {
  const { user, updateProfile } = useAuth();
  const [grade, setGrade] = useState(user?.grade || 9);
  const [stream, setStream] = useState(user?.stream || 'Natural Science');

  const isUpperGrade = grade >= 11;
  const data = CURRICULUM[grade];
  const subjects = isUpperGrade ? data?.[stream] || [] : data?.subjects || [];

  const changeGrade = (g) => {
    setGrade(g);
    if (g < 11) updateProfile({ grade: g, stream: '' });
    else updateProfile({ grade: g, stream });
  };

  const changeStream = (s) => {
    setStream(s);
    if (isUpperGrade) updateProfile({ stream: s });
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Learn</h1>
          <p className="page-subtitle">
            Ethiopian national curriculum — Grade {grade}
            {isUpperGrade && ` · ${stream}`}
          </p>
        </div>

        <select
          className="input w-auto"
          value={grade}
          onChange={(e) => changeGrade(Number(e.target.value))}
        >
          {[9, 10, 11, 12].map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>
      </div>

      {isUpperGrade && (
        <div className="card p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-ink-200">
              Stream:
            </span>
            <button
              onClick={() => changeStream('Natural Science')}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                stream === 'Natural Science'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                  : 'border-slate-200 hover:border-slate-300 dark:border-ink-700 dark:hover:border-ink-600 dark:text-ink-200'
              }`}
            >
              🔬 Natural Science
            </button>
            <button
              onClick={() => changeStream('Social Science')}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                stream === 'Social Science'
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                  : 'border-slate-200 hover:border-slate-300 dark:border-ink-700 dark:hover:border-ink-600 dark:text-ink-200'
              }`}
            >
              📜 Social Science
            </button>
          </div>
        </div>
      )}

      {subjects.length === 0 ? (
        <Empty
          icon="📚"
          title="No subjects yet"
          message="Pick a stream to see your subjects."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <div key={s.name} className="card-hover p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl dark:bg-blue-500/10">
                  {s.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold text-slate-800 dark:text-ink-50">
                    {s.name}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-ink-500">
                    Grade {grade} · {s.code}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-ink-300">Progress</span>
                  <span className="text-slate-400 dark:text-ink-500">Not started</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-ink-800">
                  <div className="h-full w-0 bg-blue-600" />
                </div>
              </div>

              <button className="btn-secondary mt-4 w-full text-sm">
                Open subject
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="card p-5">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">
          📖 About the Ethiopian curriculum
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-ink-300">
          The Ethiopian secondary school curriculum runs from Grade 9 to Grade 12.
          Grades 9 and 10 cover general subjects for all students. In Grades 11 and
          12, students choose between <strong>Natural Science</strong> (Biology,
          Chemistry, Physics, Mathematics) and <strong>Social Science</strong>{' '}
          (Geography, History, Economics). The Grade 12 national exam determines
          university placement.
        </p>
      </div>
    </div>
  );
}