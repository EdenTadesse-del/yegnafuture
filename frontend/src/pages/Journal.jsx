import { useRef, useState } from 'react';
import Empty from '../components/Empty.jsx';
import Modal from '../components/Modal.jsx';
import { useToast } from '../components/Toast.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const MOODS = [
  { id: 'great', emoji: '😄', label: 'Great' },
  { id: 'good', emoji: '🙂', label: 'Good' },
  { id: 'okay', emoji: '😐', label: 'Okay' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'stressed', emoji: '😰', label: 'Stressed' },
];

const DEFAULT_BACKGROUNDS = [
  { id: 'none', name: 'None', css: '' },
  { id: 'blue', name: 'Blue', css: 'linear-gradient(135deg, #3b82f6, #1e40af)' },
  { id: 'purple', name: 'Purple', css: 'linear-gradient(135deg, #a855f7, #6b21a8)' },
  { id: 'sunset', name: 'Sunset', css: 'linear-gradient(135deg, #f97316, #dc2626)' },
  { id: 'forest', name: 'Forest', css: 'linear-gradient(135deg, #10b981, #065f46)' },
  { id: 'night', name: 'Night', css: 'linear-gradient(135deg, #1e293b, #0f172a)' },
  { id: 'pink', name: 'Pink', css: 'linear-gradient(135deg, #ec4899, #9d174d)' },
  { id: 'gold', name: 'Gold', css: 'linear-gradient(135deg, #f59e0b, #92400e)' },
];

// Reusable background wrapper used in cards AND modals
function BackgroundBox({ pageStyle, hasBg, children, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={pageStyle}
    >
      {hasBg && (
        <div className="absolute inset-0 rounded-2xl bg-white/85 dark:bg-ink-950/85" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export default function Journal() {
  const toast = useToast();
  const [entries, setEntries] = useLocalStorage('yf_journal', []);
  const [pageBg, setPageBg] = useLocalStorage('yf_journal_bg', 'none');
  const [customBg, setCustomBg] = useLocalStorage('yf_journal_custom_bg', '');

  const [showEditor, setShowEditor] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    mood: 'good',
    date: new Date().toISOString().slice(0, 10),
  });

  const bgFileRef = useRef(null);

  const selectedBg = DEFAULT_BACKGROUNDS.find((b) => b.id === pageBg);
  const pageStyle = customBg
    ? {
        backgroundImage: `url(${customBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : selectedBg?.css
    ? { backgroundImage: selectedBg.css }
    : {};
  const hasBg = Object.keys(pageStyle).length > 0;

  const openNew = () => {
    setEditing(null);
    setForm({
      title: '',
      content: '',
      mood: 'good',
      date: new Date().toISOString().slice(0, 10),
    });
    setShowEditor(true);
  };

  const openEdit = (entry) => {
    setEditing(entry);
    setForm({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      date: entry.date,
    });
    setShowEditor(true);
  };

  const save = () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.push('Title and content are required', 'error');
      return;
    }

    if (editing) {
      setEntries((prev) =>
        prev.map((e) => (e.id === editing.id ? { ...e, ...form } : e))
      );
      toast.push('Entry updated', 'success');
    } else {
      setEntries([{ id: Date.now(), ...form }, ...entries]);
      toast.push('Entry saved', 'success');
    }

    setShowEditor(false);
    setEditing(null);
  };

  const remove = (id) => {
    if (!confirm('Delete this entry?')) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast.push('Entry deleted', 'info');
  };

  const uploadCustomBg = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.push('Image must be under 3 MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomBg(ev.target.result);
      setPageBg('custom');
      setShowBgPicker(false);
      toast.push('Background changed!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const applyBg = (id) => {
    setPageBg(id);
    if (id !== 'custom') setCustomBg('');
    setShowBgPicker(false);
    toast.push('Background changed!', 'success');
  };

  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Journal</h1>
          <p className="page-subtitle">
            Your private diary. Only you can see these entries.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowBgPicker(true)}
            className="btn-secondary"
            title="Change background"
          >
            🎨 Background
          </button>
          <button onClick={openNew} className="btn-primary">
            + New entry
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <Empty
          icon="📓"
          title="No journal entries yet"
          message="Write your first entry to get started."
          action={
            <button onClick={openNew} className="btn-primary">
              + New entry
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {sorted.map((e) => {
            const mood = MOODS.find((m) => m.id === e.mood) || MOODS[1];
            return (
              <div
                key={e.id}
                className="card-hover relative overflow-hidden p-5"
                style={pageStyle}
              >
                {hasBg && (
                  <div className="absolute inset-0 bg-white/85 dark:bg-ink-950/85" />
                )}

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{mood.emoji}</span>
                    <div>
                      <div className="text-xs text-slate-400 dark:text-ink-500">
                        {new Date(e.date).toLocaleDateString(undefined, {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-ink-400">
                        {mood.label}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-3 font-bold text-slate-800 dark:text-ink-50">
                    {e.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-ink-300">
                    {e.content}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setViewing(e)}
                      className="btn-secondary flex-1 text-sm"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => openEdit(e)}
                      className="btn-secondary text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(e.id)}
                      className="btn-ghost text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── EDITOR MODAL ─── */}
      <Modal
        open={showEditor}
        onClose={() => setShowEditor(false)}
        title={editing ? 'Edit entry' : 'New journal entry'}
        wide
        footer={
          <>
            <button className="btn-secondary" onClick={() => setShowEditor(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={save}>
              {editing ? 'Save changes' : 'Save entry'}
            </button>
          </>
        }
      >
        <BackgroundBox pageStyle={pageStyle} hasBg={hasBg} className="p-5">
          <div className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                className="input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="What's on your mind?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Date</label>
                <input
                  type="date"
                  className="input"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Mood</label>
                <select
                  className="input"
                  value={form.mood}
                  onChange={(e) => setForm({ ...form, mood: e.target.value })}
                >
                  {MOODS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.emoji} {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Content</label>
              <textarea
                className="input"
                rows={8}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Dear journal..."
              />
            </div>
          </div>
        </BackgroundBox>
      </Modal>

      {/* ─── VIEW MODAL ─── */}
      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title={viewing?.title}
        wide
        footer={
          <button className="btn-secondary" onClick={() => setViewing(null)}>
            Close
          </button>
        }
      >
        {viewing && (
          <BackgroundBox pageStyle={pageStyle} hasBg={hasBg} className="p-5">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-ink-400">
              <span className="text-2xl">
                {MOODS.find((m) => m.id === viewing.mood)?.emoji}
              </span>
              {new Date(viewing.date).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <p className="mt-4 whitespace-pre-wrap text-slate-700 dark:text-ink-200">
              {viewing.content}
            </p>
          </BackgroundBox>
        )}
      </Modal>

      {/* ─── BACKGROUND PICKER ─── */}
      <Modal
        open={showBgPicker}
        onClose={() => setShowBgPicker(false)}
        title="Choose journal background"
        footer={
          <button className="btn-secondary" onClick={() => setShowBgPicker(false)}>
            Close
          </button>
        }
      >
        <p className="mb-4 text-sm text-slate-500 dark:text-ink-400">
          Pick a gradient or upload your own image. It applies to your journal
          cards and to the write, edit, and read windows.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {DEFAULT_BACKGROUNDS.map((bg) => (
            <button
              key={bg.id}
              onClick={() => applyBg(bg.id)}
              className={`h-20 rounded-xl border-2 transition ${
                pageBg === bg.id
                  ? 'border-blue-500 scale-105'
                  : 'border-transparent hover:border-slate-300'
              }`}
              style={
                bg.css
                  ? { backgroundImage: bg.css }
                  : {
                      backgroundImage:
                        'repeating-linear-gradient(45deg, #e2e8f0, #e2e8f0 8px, #f1f5f9 8px, #f1f5f9 16px)',
                    }
              }
              title={bg.name}
            >
              <span className="sr-only">{bg.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-ink-800">
          <label className="btn-secondary cursor-pointer w-full justify-center">
            📷 Upload custom image
            <input
              ref={bgFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadCustomBg}
            />
          </label>
          {customBg && (
            <div className="mt-3">
              <div
                className="h-20 rounded-xl"
                style={{
                  backgroundImage: `url(${customBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <button
                onClick={() => {
                  setCustomBg('');
                  setPageBg('none');
                }}
                className="btn-ghost mt-2 w-full text-sm text-red-500"
              >
                Remove custom background
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}