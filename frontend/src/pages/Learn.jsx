import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Empty from '../components/Empty.jsx';
import Modal from '../components/Modal.jsx';
import { useToast } from '../components/Toast.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

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
  const toast = useToast();
  const [grade, setGrade] = useState(user?.grade || 9);
  const [stream, setStream] = useState(user?.stream || 'Natural Science');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');

  const [notes, setNotes] = useLocalStorage('yf_notes', {});
  const [assignments, setAssignments] = useLocalStorage('yf_assignments', {});

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

  const noteKey = (subject) => `${grade}-${stream || 'general'}-${subject}`;

  const saveNote = (subject, text) => {
    setNotes((prev) => ({ ...prev, [noteKey(subject)]: text }));
    toast.push('Note saved!', 'success');
  };

  const addAssignment = (subject, { title, image }) => {
    const key = noteKey(subject);
    setAssignments((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { id: Date.now(), title, image, date: new Date().toISOString() }],
    }));
    toast.push('Assignment saved!', 'success');
  };

  const deleteAssignment = (subject, id) => {
    const key = noteKey(subject);
    setAssignments((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((a) => a.id !== id),
    }));
    toast.push('Assignment deleted', 'info');
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
          {subjects.map((s) => {
            const key = noteKey(s.name);
            const hasNote = notes[key] && notes[key].trim().length > 0;
            const assignmentCount = (assignments[key] || []).length;

            return (
              <button
                key={s.name}
                onClick={() => {
                  setSelectedSubject(s);
                  setActiveTab('notes');
                }}
                className="card-hover p-5 text-left"
              >
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

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {hasNote && (
                    <span className="chip bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-300">
                      📝 Has note
                    </span>
                  )}
                  {assignmentCount > 0 && (
                    <span className="chip bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
                      📸 {assignmentCount} assignment{assignmentCount > 1 ? 's' : ''}
                    </span>
                  )}
                  {!hasNote && assignmentCount === 0 && (
                    <span className="chip">Open to add notes</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="card p-5">
        <h3 className="font-bold text-slate-800 dark:text-ink-50">
          📖 About the Ethiopian curriculum
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-ink-300">
          Grades 9 and 10 cover general subjects for all students. Grades 11 and 12
          split into <strong>Natural Science</strong> (Biology, Chemistry, Physics,
          Maths) and <strong>Social Science</strong> (Geography, History, Economics).
          Click any subject to take notes and save assignment photos.
        </p>
      </div>

      {selectedSubject && (
        <SubjectModal
          subject={selectedSubject}
          grade={grade}
          stream={stream}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          note={notes[noteKey(selectedSubject.name)] || ''}
          onSaveNote={saveNote}
          assignments={assignments[noteKey(selectedSubject.name)] || []}
          onAddAssignment={addAssignment}
          onDeleteAssignment={deleteAssignment}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
}

function SubjectModal({
  subject,
  grade,
  stream,
  activeTab,
  setActiveTab,
  note,
  onSaveNote,
  assignments,
  onAddAssignment,
  onDeleteAssignment,
  onClose,
}) {
  const toast = useToast();
  const [noteText, setNoteText] = useState(note);
  const [assignTitle, setAssignTitle] = useState('');
  const [assignImage, setAssignImage] = useState('');

  const pickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.push('Image must be under 3 MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setAssignImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const submitAssignment = () => {
    if (!assignTitle.trim() || !assignImage) {
      toast.push('Title and image are required', 'error');
      return;
    }
    onAddAssignment(subject.name, { title: assignTitle.trim(), image: assignImage });
    setAssignTitle('');
    setAssignImage('');
  };

  return (
    <Modal
      open={!!subject}
      onClose={onClose}
      title={`${subject.icon} ${subject.name}`}
      wide
      footer={
        <button className="btn-secondary" onClick={onClose}>
          Close
        </button>
      }
    >
      <div className="mb-4 flex gap-2 border-b border-slate-100 dark:border-ink-800">
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 text-sm font-medium transition ${
            activeTab === 'notes'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-ink-400'
          }`}
        >
          📝 Notes
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2 text-sm font-medium transition ${
            activeTab === 'assignments'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-ink-400'
          }`}
        >
          📸 Assignments ({assignments.length})
        </button>
      </div>

      {activeTab === 'notes' && (
        <div className="space-y-3">
          <p className="text-sm text-slate-500 dark:text-ink-400">
            Write your notes for {subject.name} — Grade {grade}
            {stream ? ` · ${stream}` : ''}. They're saved automatically to this device.
          </p>

          <textarea
            className="input"
            rows={10}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={`Write your ${subject.name} notes here...`}
          />

          <div className="flex justify-end">
            <button
              className="btn-primary"
              onClick={() => onSaveNote(subject.name, noteText)}
            >
              💾 Save note
            </button>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-dashed border-slate-200 p-4 dark:border-ink-700">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-ink-200">
              Add new assignment
            </h4>

            <div className="mt-3 space-y-3">
              <input
                className="input"
                placeholder="Title (e.g. Chapter 3 quiz)"
                value={assignTitle}
                onChange={(e) => setAssignTitle(e.target.value)}
              />

              <label className="block cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:bg-slate-100 dark:border-ink-700 dark:bg-ink-800 dark:hover:bg-ink-700">
                {assignImage ? (
                  <img
                    src={assignImage}
                    alt="Assignment preview"
                    className="mx-auto max-h-48 rounded-lg object-contain"
                  />
                ) : (
                  <div>
                    <div className="text-3xl">📸</div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-ink-300">
                      Click to upload a picture of your assignment or result
                    </div>
                    <div className="text-xs text-slate-400 dark:text-ink-500">
                      JPG, PNG — max 3 MB
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={pickImage}
                />
              </label>

              {assignImage && (
                <button
                  onClick={() => setAssignImage('')}
                  className="btn-ghost w-full text-sm text-red-500"
                >
                  Remove image
                </button>
              )}

              <button onClick={submitAssignment} className="btn-primary w-full">
                Save assignment
              </button>
            </div>
          </div>

          {assignments.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-slate-700 dark:text-ink-200">
                Saved assignments ({assignments.length})
              </h4>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {assignments.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-xl border border-slate-200 p-2 dark:border-ink-700"
                  >
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                    <div className="mt-2 truncate text-xs font-medium text-slate-700 dark:text-ink-200">
                      {a.title}
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-ink-500">
                      {new Date(a.date).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => onDeleteAssignment(subject.name, a.id)}
                      className="mt-1 w-full rounded-lg py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}