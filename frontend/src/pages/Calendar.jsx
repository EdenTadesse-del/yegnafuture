import { useState } from 'react';
import Modal from '../components/Modal.jsx';
import { useToast } from '../components/Toast.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const EVENT_TYPES = {
  study: { icon: '📚', color: 'bg-blue-500' },
  exam: { icon: '📝', color: 'bg-red-500' },
  deadline: { icon: '⏰', color: 'bg-orange-500' },
  personal: { icon: '📌', color: 'bg-purple-500' },
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function Calendar() {
  const toast = useToast();
  const today = new Date();
  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [events, setEvents] = useLocalStorage('yf_events', []);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [form, setForm] = useState({
    title: '',
    type: 'study',
    time: '',
  });

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const dateStr = (day) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const eventsForDay = (day) => events.filter((e) => e.date === dateStr(day));

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));
  const goToday = () =>
    setCurrent(new Date(today.getFullYear(), today.getMonth(), 1));

  const openAddForDay = (day) => {
    setSelectedDate(dateStr(day));
    setForm({ title: '', type: 'study', time: '' });
    setShowAdd(true);
  };

  const openAddGeneric = () => {
    setSelectedDate(new Date().toISOString().slice(0, 10));
    setForm({ title: '', type: 'study', time: '' });
    setShowAdd(true);
  };

  const addEvent = () => {
    if (!form.title.trim() || !selectedDate) {
      toast.push('Title and date are required', 'error');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: form.title.trim(),
      type: form.type,
      time: form.time,
      date: selectedDate,
    };

    setEvents([...events, newEvent]);
    setShowAdd(false);
    toast.push('Event added!', 'success');
  };

  const removeEvent = (id) => {
    if (!confirm('Delete this event?')) return;
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.push('Event deleted', 'info');
  };

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const upcoming = events
    .filter((e) => new Date(e.date) >= new Date(today.toDateString()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Calendar</h1>
          <p className="page-subtitle">
            Tasks, exams, study sessions, and personal events.
          </p>
        </div>

        <div className="flex gap-2">
          <button onClick={goToday} className="btn-secondary">
            Today
          </button>
          <button onClick={openAddGeneric} className="btn-primary">
            + Add event
          </button>
        </div>
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth} className="btn-ghost">
            ←
          </button>
          <h2 className="text-lg font-bold text-slate-800 dark:text-ink-50">
            {MONTHS[month]} {year}
          </h2>
          <button onClick={nextMonth} className="btn-ghost">
            →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 dark:text-ink-400">
          {DAYS.map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => (
            <div
              key={i}
              onClick={() => day && openAddForDay(day)}
              className={`min-h-[80px] cursor-pointer rounded-xl border p-2 text-xs transition ${
                day
                  ? 'border-slate-100 bg-white hover:border-blue-300 dark:border-ink-800 dark:bg-ink-900 dark:hover:border-blue-500'
                  : 'border-transparent'
              } ${
                isToday(day)
                  ? 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-500/10'
                  : ''
              }`}
            >
              {day && (
                <>
                  <div
                    className={`mb-1 font-semibold ${
                      isToday(day)
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-slate-700 dark:text-ink-200'
                    }`}
                  >
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {eventsForDay(day)
                      .slice(0, 2)
                      .map((e) => (
                        <div
                          key={e.id}
                          className={`flex items-center gap-1 truncate rounded px-1 py-0.5 text-[10px] text-white ${
                            EVENT_TYPES[e.type]?.color || 'bg-slate-500'
                          }`}
                        >
                          <span>{EVENT_TYPES[e.type]?.icon}</span>
                          <span className="truncate">{e.title}</span>
                        </div>
                      ))}
                    {eventsForDay(day).length > 2 && (
                      <div className="text-[10px] text-slate-400 dark:text-ink-500">
                        +{eventsForDay(day).length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 dark:text-ink-50">
            Upcoming events
          </h3>
          <span className="text-xs text-slate-400 dark:text-ink-500">
            {upcoming.length} total
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {upcoming.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-sm text-slate-400 dark:border-ink-800 dark:text-ink-500">
              No upcoming events. Click a day on the calendar to add one.
            </p>
          ) : (
            upcoming.map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5 dark:border-ink-800"
              >
                <span className="text-lg">{EVENT_TYPES[e.type]?.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-slate-700 dark:text-ink-100">
                    {e.title}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-ink-500">
                    {new Date(e.date).toLocaleDateString(undefined, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {e.time && ` · ${e.time}`}
                  </div>
                </div>
                <button
                  onClick={() => removeEvent(e.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add an event"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={addEvent}>
              Add event
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Biology exam"
              autoFocus
            />
          </div>

          <div>
            <label className="label">Date</label>
            <input
              type="date"
              className="input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Type</label>
              <select
                className="input"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="study">📚 Study session</option>
                <option value="exam">📝 Exam</option>
                <option value="deadline">⏰ Deadline</option>
                <option value="personal">📌 Personal</option>
              </select>
            </div>

            <div>
              <label className="label">Time (optional)</label>
              <input
                type="time"
                className="input"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}