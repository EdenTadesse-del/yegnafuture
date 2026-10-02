import { useState } from 'react';
import Empty from '../components/Empty.jsx';
import { useToast } from '../components/Toast.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const MoE = 'https://etextbook.moe.gov.et';

const BOOKS = [
  {
    id: 1,
    title: 'Biology — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Official Ethiopian Grade 9 Biology textbook. Cell biology, classification, ecology.',
    url: MoE,
    grade: 9,
    subject: 'Biology',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 2,
    title: 'Biology — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 Biology. Genetics, human biology, and ecology.',
    url: MoE,
    grade: 10,
    subject: 'Biology',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 3,
    title: 'Biology — Grade 11',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 11 Biology for the Natural Science stream.',
    url: MoE,
    grade: 11,
    subject: 'Biology',
    stream: 'Natural Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 4,
    title: 'Biology — Grade 12',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 12 Biology for the Natural Science stream. EUEE preparation.',
    url: MoE,
    grade: 12,
    subject: 'Biology',
    stream: 'Natural Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 5,
    title: 'Chemistry — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 9 Chemistry. Matter, atoms, the periodic table.',
    url: MoE,
    grade: 9,
    subject: 'Chemistry',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 6,
    title: 'Chemistry — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 Chemistry. Bonding, reactions, energy changes.',
    url: MoE,
    grade: 10,
    subject: 'Chemistry',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 7,
    title: 'Chemistry — Grade 11',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 11 Chemistry for the Natural Science stream.',
    url: MoE,
    grade: 11,
    subject: 'Chemistry',
    stream: 'Natural Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 8,
    title: 'Chemistry — Grade 12',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 12 Chemistry. Organic chemistry, electrochemistry.',
    url: MoE,
    grade: 12,
    subject: 'Chemistry',
    stream: 'Natural Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 9,
    title: 'Physics — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 9 Physics. Measurement, motion, forces, energy.',
    url: MoE,
    grade: 9,
    subject: 'Physics',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 10,
    title: 'Physics — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 Physics. Waves, electricity, magnetism.',
    url: MoE,
    grade: 10,
    subject: 'Physics',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 11,
    title: 'Physics — Grade 11',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 11 Physics for the Natural Science stream.',
    url: MoE,
    grade: 11,
    subject: 'Physics',
    stream: 'Natural Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 12,
    title: 'Physics — Grade 12',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 12 Physics. Modern physics, electromagnetism.',
    url: MoE,
    grade: 12,
    subject: 'Physics',
    stream: 'Natural Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 13,
    title: 'Mathematics — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 9 Mathematics. Sets, equations, geometry.',
    url: MoE,
    grade: 9,
    subject: 'Mathematics',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 14,
    title: 'Mathematics — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 Mathematics. Trigonometry, statistics, functions.',
    url: MoE,
    grade: 10,
    subject: 'Mathematics',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 15,
    title: 'Mathematics — Grade 11',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 11 Mathematics. Calculus foundations, algebra.',
    url: MoE,
    grade: 11,
    subject: 'Mathematics',
    stream: 'Natural Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 16,
    title: 'Mathematics — Grade 12',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 12 Mathematics. Calculus, vectors, complex numbers.',
    url: MoE,
    grade: 12,
    subject: 'Mathematics',
    stream: 'Natural Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 17,
    title: 'English — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 9 English. Reading, writing, grammar, speaking.',
    url: MoE,
    grade: 9,
    subject: 'English',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 18,
    title: 'English — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 English. Comprehension, composition, literature.',
    url: MoE,
    grade: 10,
    subject: 'English',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 19,
    title: 'English — Grade 11',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 11 English for both streams.',
    url: MoE,
    grade: 11,
    subject: 'English',
    stream: 'Both',
    license: 'MoE Ethiopia',
  },
  {
    id: 20,
    title: 'English — Grade 12',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 12 English. EUEE preparation.',
    url: MoE,
    grade: 12,
    subject: 'English',
    stream: 'Both',
    license: 'MoE Ethiopia',
  },
  {
    id: 21,
    title: 'Amharic — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'የ9ኛ ክፍል አማርኛ መማሪያ መጽሐፍ (Ethiopian Grade 9 Amharic).',
    url: MoE,
    grade: 9,
    subject: 'Amharic',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 22,
    title: 'Amharic — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'የ10ኛ ክፍል አማርኛ መማሪያ መጽሐፍ (Ethiopian Grade 10 Amharic).',
    url: MoE,
    grade: 10,
    subject: 'Amharic',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 23,
    title: 'Civics & Ethical Education — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 9 Civics. Democracy, rule of law, ethics.',
    url: MoE,
    grade: 9,
    subject: 'Civics',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 24,
    title: 'Civics & Ethical Education — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 Civics. Citizenship and civic responsibility.',
    url: MoE,
    grade: 10,
    subject: 'Civics',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 25,
    title: 'Geography — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 9 Geography. Map skills, climate, population.',
    url: MoE,
    grade: 9,
    subject: 'Geography',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 26,
    title: 'Geography — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 Geography. Ethiopian regions, resources.',
    url: MoE,
    grade: 10,
    subject: 'Geography',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 27,
    title: 'Geography — Grade 11',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 11 Geography for the Social Science stream.',
    url: MoE,
    grade: 11,
    subject: 'Geography',
    stream: 'Social Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 28,
    title: 'Geography — Grade 12',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 12 Geography. EUEE preparation.',
    url: MoE,
    grade: 12,
    subject: 'Geography',
    stream: 'Social Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 29,
    title: 'History — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 9 History. Ancient civilizations, Ethiopian history.',
    url: MoE,
    grade: 9,
    subject: 'History',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 30,
    title: 'History — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 History. Modern Ethiopian and world history.',
    url: MoE,
    grade: 10,
    subject: 'History',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 31,
    title: 'History — Grade 11',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 11 History for the Social Science stream.',
    url: MoE,
    grade: 11,
    subject: 'History',
    stream: 'Social Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 32,
    title: 'History — Grade 12',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 12 History. EUEE preparation.',
    url: MoE,
    grade: 12,
    subject: 'History',
    stream: 'Social Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 33,
    title: 'Economics — Grade 11',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 11 Economics. Micro and macroeconomics.',
    url: MoE,
    grade: 11,
    subject: 'Economics',
    stream: 'Social Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 34,
    title: 'Economics — Grade 12',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 12 Economics. Development economics, EUEE prep.',
    url: MoE,
    grade: 12,
    subject: 'Economics',
    stream: 'Social Science',
    license: 'MoE Ethiopia',
  },
  {
    id: 35,
    title: 'ICT — Grade 9',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 9 ICT. Computer basics, programming foundations.',
    url: MoE,
    grade: 9,
    subject: 'ICT',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 36,
    title: 'ICT — Grade 10',
    author: 'Ministry of Education, Ethiopia',
    description: 'Ethiopian Grade 10 ICT. Databases, networks, web basics.',
    url: MoE,
    grade: 10,
    subject: 'ICT',
    stream: 'General',
    license: 'MoE Ethiopia',
  },
  {
    id: 37,
    title: 'Khan Academy — Mathematics',
    author: 'Khan Academy',
    description: 'Free video lessons and practice aligned with global math standards.',
    url: 'https://www.khanacademy.org/math',
    grade: 9,
    subject: 'Mathematics',
    stream: 'Both',
    license: 'Free',
  },
  {
    id: 38,
    title: 'Khan Academy — Biology',
    author: 'Khan Academy',
    description: 'Free biology lessons from cells to evolution.',
    url: 'https://www.khanacademy.org/science/biology',
    grade: 10,
    subject: 'Biology',
    stream: 'Natural Science',
    license: 'Free',
  },
  {
    id: 39,
    title: 'Project Gutenberg — Free eBooks',
    author: 'Project Gutenberg',
    description: 'Over 70,000 free public-domain books. Great for English reading practice.',
    url: 'https://www.gutenberg.org/',
    grade: 9,
    subject: 'English',
    stream: 'Both',
    license: 'Public Domain',
  },
  {
    id: 40,
    title: 'freeCodeCamp — Learn to Code',
    author: 'freeCodeCamp',
    description: 'Free interactive coding curriculum — perfect for ICT study.',
    url: 'https://www.freecodecamp.org/',
    grade: 10,
    subject: 'ICT',
    stream: 'Both',
    license: 'Free',
  },
];

export default function Library() {
  const toast = useToast();
  const [bookmarks, setBookmarks] = useLocalStorage('yf_bookmarks', {});
  const [reading, setReading] = useLocalStorage('yf_reading', {});

  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [stream, setStream] = useState('');

  const subjects = [...new Set(BOOKS.map((b) => b.subject))];

  const filtered = BOOKS.filter((b) => {
    if (search && !b.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (grade && b.grade !== Number(grade)) return false;
    if (subject && b.subject !== subject) return false;
    if (stream && b.stream !== stream && b.stream !== 'Both') return false;
    return true;
  });

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      toast.push(next[id] ? 'Bookmarked!' : 'Bookmark removed', 'success');
      return next;
    });
  };

  const setProgress = (id, percent) => {
    setReading((prev) => ({ ...prev, [id]: percent }));
  };

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="page-title">Reading Library</h1>
        <p className="page-subtitle">
          Ethiopian Ministry of Education textbooks and free open resources.
        </p>
      </div>

      <div className="card p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            className="input"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">All grades</option>
            {[9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
          >
            <option value="">All streams</option>
            <option value="General">General (Grade 9–10)</option>
            <option value="Natural Science">Natural Science</option>
            <option value="Social Science">Social Science</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Empty
          icon="📖"
          title="No resources found"
          message="Try adjusting your filters or search term."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <div key={b.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between">
                <span className="badge bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  {b.license}
                </span>
                <button
                  onClick={() => toggleBookmark(b.id)}
                  className="text-lg"
                  title="Bookmark"
                >
                  {bookmarks[b.id] ? '🔖' : '📑'}
                </button>
              </div>

              <h3 className="mt-3 font-bold text-slate-800 dark:text-ink-50">
                {b.title}
              </h3>
              <p className="text-xs text-slate-400 dark:text-ink-500">{b.author}</p>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-ink-300">
                {b.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="chip">Grade {b.grade}</span>
                <span className="chip">{b.subject}</span>
                {b.stream && b.stream !== 'General' && (
                  <span className="chip">{b.stream}</span>
                )}
              </div>

              {reading[b.id] > 0 && (
                <div className="mt-3">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-ink-800">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${reading[b.id]}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 text-sm"
                  onClick={() => setProgress(b.id, Math.max(reading[b.id] || 0, 10))}
                >
                  Open textbook
                </a>
                <select
                  className="input w-auto py-2 text-xs"
                  value={reading[b.id] || 0}
                  onChange={(e) => setProgress(b.id, Number(e.target.value))}
                >
                  <option value={0}>0%</option>
                  <option value={25}>25%</option>
                  <option value={50}>50%</option>
                  <option value={75}>75%</option>
                  <option value={100}>Done</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card p-5">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">
          🇪🇹 About these resources
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-ink-300">
          All textbooks link to the official <strong>Ethiopian Ministry of
          Education e-textbook portal</strong> (etextbook.moe.gov.et) where the
          national curriculum books are freely available. Additional open resources
          are from Khan Academy, Project Gutenberg, and freeCodeCamp — all free and
          legal to use.
        </p>
      </div>
    </div>
  );
}