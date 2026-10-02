import { useState } from 'react';
import Empty from '../components/Empty.jsx';
import { useToast } from '../components/Toast.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const LINKS = {
  khan: 'https://www.khanacademy.org',
  gutenberg: 'https://www.gutenberg.org',
  fcc: 'https://www.freecodecamp.org',
  openstax: 'https://openstax.org',
  mitocw: 'https://ocw.mit.edu',
};

const BOOKS = [
  // ────── Natural Science Stream ──────
  { id: 1, title: 'Biology — Grade 9', author: 'MoE Ethiopia', subject: 'Biology', grade: 9, stream: 'General', url: LINKS.openstax, description: 'Cell biology, classification, ecology. Free OpenStax textbook.' },
  { id: 2, title: 'Biology — Grade 10', author: 'MoE Ethiopia', subject: 'Biology', grade: 10, stream: 'General', url: LINKS.khan, description: 'Genetics, human biology, ecology. Khan Academy lessons.' },
  { id: 3, title: 'Biology — Grade 11', author: 'MoE Ethiopia', subject: 'Biology', grade: 11, stream: 'Natural Science', url: LINKS.openstax, description: 'Grade 11 Biology for the Natural Science stream.' },
  { id: 4, title: 'Biology — Grade 12', author: 'MoE Ethiopia', subject: 'Biology', grade: 12, stream: 'Natural Science', url: LINKS.khan, description: 'Grade 12 Biology. EUEE preparation.' },
  { id: 5, title: 'Chemistry — Grade 9', author: 'MoE Ethiopia', subject: 'Chemistry', grade: 9, stream: 'General', url: LINKS.openstax, description: 'Matter, atoms, periodic table.' },
  { id: 6, title: 'Chemistry — Grade 10', author: 'MoE Ethiopia', subject: 'Chemistry', grade: 10, stream: 'General', url: LINKS.khan, description: 'Bonding, reactions, energy.' },
  { id: 7, title: 'Chemistry — Grade 11', author: 'MoE Ethiopia', subject: 'Chemistry', grade: 11, stream: 'Natural Science', url: LINKS.openstax, description: 'Grade 11 Chemistry.' },
  { id: 8, title: 'Chemistry — Grade 12', author: 'MoE Ethiopia', subject: 'Chemistry', grade: 12, stream: 'Natural Science', url: LINKS.khan, description: 'Organic and electrochemistry.' },
  { id: 9, title: 'Physics — Grade 9', author: 'MoE Ethiopia', subject: 'Physics', grade: 9, stream: 'General', url: LINKS.openstax, description: 'Measurement, motion, forces.' },
  { id: 10, title: 'Physics — Grade 10', author: 'MoE Ethiopia', subject: 'Physics', grade: 10, stream: 'General', url: LINKS.khan, description: 'Waves, electricity, magnetism.' },
  { id: 11, title: 'Physics — Grade 11', author: 'MoE Ethiopia', subject: 'Physics', grade: 11, stream: 'Natural Science', url: LINKS.openstax, description: 'Grade 11 Physics.' },
  { id: 12, title: 'Physics — Grade 12', author: 'MoE Ethiopia', subject: 'Physics', grade: 12, stream: 'Natural Science', url: LINKS.mitocw, description: 'Modern physics, electromagnetism.' },

  // ────── Mathematics ──────
  { id: 13, title: 'Mathematics — Grade 9', author: 'MoE Ethiopia', subject: 'Mathematics', grade: 9, stream: 'General', url: LINKS.khan, description: 'Sets, equations, geometry.' },
  { id: 14, title: 'Mathematics — Grade 10', author: 'MoE Ethiopia', subject: 'Mathematics', grade: 10, stream: 'General', url: LINKS.khan, description: 'Trigonometry, statistics, functions.' },
  { id: 15, title: 'Mathematics — Grade 11', author: 'MoE Ethiopia', subject: 'Mathematics', grade: 11, stream: 'Both', url: LINKS.khan, description: 'Calculus foundations, algebra.' },
  { id: 16, title: 'Mathematics — Grade 12', author: 'MoE Ethiopia', subject: 'Mathematics', grade: 12, stream: 'Both', url: LINKS.mitocw, description: 'Calculus, vectors, complex numbers.' },

  // ────── English ──────
  { id: 17, title: 'English — Grade 9', author: 'MoE Ethiopia', subject: 'English', grade: 9, stream: 'General', url: LINKS.gutenberg, description: 'Reading, writing, grammar.' },
  { id: 18, title: 'English — Grade 10', author: 'MoE Ethiopia', subject: 'English', grade: 10, stream: 'General', url: LINKS.gutenberg, description: 'Comprehension, composition, literature.' },
  { id: 19, title: 'English — Grade 11', author: 'MoE Ethiopia', subject: 'English', grade: 11, stream: 'Both', url: LINKS.gutenberg, description: 'Grade 11 English. Public-domain classics.' },
  { id: 20, title: 'English — Grade 12', author: 'MoE Ethiopia', subject: 'English', grade: 12, stream: 'Both', url: LINKS.gutenberg, description: 'EUEE preparation. Free literature.' },

  // ────── Amharic ──────
  { id: 21, title: 'Amharic — Grade 9', author: 'MoE Ethiopia', subject: 'Amharic', grade: 9, stream: 'General', url: LINKS.gutenberg, description: 'የ9ኛ ክፍል አማርኛ. Ethiopian literature.' },
  { id: 22, title: 'Amharic — Grade 10', author: 'MoE Ethiopia', subject: 'Amharic', grade: 10, stream: 'General', url: LINKS.gutenberg, description: 'የ10ኛ ክፍል አማርኛ.' },

  // ────── Civics ──────
  { id: 23, title: 'Civics & Ethics — Grade 9', author: 'MoE Ethiopia', subject: 'Civics', grade: 9, stream: 'General', url: LINKS.khan, description: 'Democracy, rule of law, ethics.' },
  { id: 24, title: 'Civics & Ethics — Grade 10', author: 'MoE Ethiopia', subject: 'Civics', grade: 10, stream: 'General', url: LINKS.khan, description: 'Citizenship and civic responsibility.' },

  // ────── Social Science Stream ──────
  { id: 25, title: 'Geography — Grade 9', author: 'MoE Ethiopia', subject: 'Geography', grade: 9, stream: 'General', url: LINKS.khan, description: 'Map skills, climate, population.' },
  { id: 26, title: 'Geography — Grade 10', author: 'MoE Ethiopia', subject: 'Geography', grade: 10, stream: 'General', url: LINKS.khan, description: 'Ethiopian regions, resources.' },
  { id: 27, title: 'Geography — Grade 11', author: 'MoE Ethiopia', subject: 'Geography', grade: 11, stream: 'Social Science', url: LINKS.khan, description: 'Grade 11 Geography.' },
  { id: 28, title: 'Geography — Grade 12', author: 'MoE Ethiopia', subject: 'Geography', grade: 12, stream: 'Social Science', url: LINKS.khan, description: 'EUEE preparation.' },
  { id: 29, title: 'History — Grade 9', author: 'MoE Ethiopia', subject: 'History', grade: 9, stream: 'General', url: LINKS.khan, description: 'Ancient civilizations, Ethiopian history.' },
  { id: 30, title: 'History — Grade 10', author: 'MoE Ethiopia', subject: 'History', grade: 10, stream: 'General', url: LINKS.khan, description: 'Modern Ethiopian and world history.' },
  { id: 31, title: 'History — Grade 11', author: 'MoE Ethiopia', subject: 'History', grade: 11, stream: 'Social Science', url: LINKS.khan, description: 'Grade 11 History.' },
  { id: 32, title: 'History — Grade 12', author: 'MoE Ethiopia', subject: 'History', grade: 12, stream: 'Social Science', url: LINKS.khan, description: 'EUEE preparation.' },
  { id: 33, title: 'Economics — Grade 11', author: 'MoE Ethiopia', subject: 'Economics', grade: 11, stream: 'Social Science', url: LINKS.openstax, description: 'Micro and macroeconomics.' },
  { id: 34, title: 'Economics — Grade 12', author: 'MoE Ethiopia', subject: 'Economics', grade: 12, stream: 'Social Science', url: LINKS.openstax, description: 'Development economics, EUEE prep.' },

  // ────── ICT ──────
  { id: 35, title: 'ICT — Grade 9', author: 'MoE Ethiopia', subject: 'ICT', grade: 9, stream: 'General', url: LINKS.fcc, description: 'Computer basics, programming foundations.' },
  { id: 36, title: 'ICT — Grade 10', author: 'MoE Ethiopia', subject: 'ICT', grade: 10, stream: 'General', url: LINKS.fcc, description: 'Databases, networks, web basics.' },

  // ────── Free Open Resources ──────
  { id: 37, title: 'Khan Academy — Math', author: 'Khan Academy', subject: 'Mathematics', grade: 9, stream: 'Both', url: LINKS.khan, description: 'Free math video lessons for every grade.' },
  { id: 38, title: 'Khan Academy — Biology', author: 'Khan Academy', subject: 'Biology', grade: 10, stream: 'Natural Science', url: 'https://www.khanacademy.org/science/biology', description: 'Free biology lessons.' },
  { id: 39, title: 'Project Gutenberg', author: 'Project Gutenberg', subject: 'English', grade: 9, stream: 'Both', url: LINKS.gutenberg, description: '70,000+ free public-domain books.' },
  { id: 40, title: 'freeCodeCamp', author: 'freeCodeCamp', subject: 'ICT', grade: 10, stream: 'Both', url: LINKS.fcc, description: 'Free interactive coding curriculum.' },
  { id: 41, title: 'OpenStax Textbooks', author: 'OpenStax', subject: 'Biology', grade: 11, stream: 'Natural Science', url: LINKS.openstax, description: 'Free peer-reviewed textbooks.' },
  { id: 42, title: 'MIT OpenCourseWare', author: 'MIT', subject: 'Mathematics', grade: 12, stream: 'Both', url: LINKS.mitocw, description: 'Free MIT lecture notes and videos.' },
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

  const openBook = (book) => {
    setProgress(book.id, Math.max(reading[book.id] || 0, 10));
    window.open(book.url, '_blank', 'noopener,noreferrer');
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

          <select className="input" value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">All grades</option>
            {[9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>

          <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select className="input" value={stream} onChange={(e) => setStream(e.target.value)}>
            <option value="">All streams</option>
            <option value="General">General (Grade 9–10)</option>
            <option value="Natural Science">Natural Science</option>
            <option value="Social Science">Social Science</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Empty icon="📖" title="No resources found" message="Try adjusting your filters." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <div key={b.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between">
                <span className="badge bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  {b.author}
                </span>
                <button onClick={() => toggleBookmark(b.id)} className="text-lg" title="Bookmark">
                  {bookmarks[b.id] ? '🔖' : '📑'}
                </button>
              </div>

              <h3 className="mt-3 font-bold text-slate-800 dark:text-ink-50">{b.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-ink-300">{b.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="chip">Grade {b.grade}</span>
                <span className="chip">{b.subject}</span>
                {b.stream && b.stream !== 'General' && <span className="chip">{b.stream}</span>}
              </div>

              {reading[b.id] > 0 && (
                <div className="mt-3">
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-ink-800">
                    <div className="h-full bg-green-500 transition-all" style={{ width: `${reading[b.id]}%` }} />
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => openBook(b)} className="btn-primary flex-1 text-sm">
                  Open textbook
                </button>
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
          All textbooks link to reliable free educational platforms: Khan Academy,
          OpenStax, Project Gutenberg, freeCodeCamp, and MIT OpenCourseWare. Every
          link opens in a new tab and is completely legal and free to use. These
          cover the Ethiopian Grade 9–12 curriculum for both Natural and Social
          Science streams.
        </p>
      </div>
    </div>
  );
}