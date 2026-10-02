import { useState } from 'react';
import Empty from '../components/Empty.jsx';
import Modal from '../components/Modal.jsx';
import { useToast } from '../components/Toast.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const PRIORITY_COLORS = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-slate-300',
};

export default function Tasks() {
  const toast = useToast();
  const [tasks, setTasks] = useLocalStorage('yf_tasks', []);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'medium',
  });

  const addTask = () => {
    if (!form.title.trim()) {
      toast.push('Task title is required', 'error');
      return;
    }

    const newTask = {
      id: Date.now(),
      ...form,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setForm({ title: '', description: '', due_date: '', priority: 'medium' });
    setShowAdd(false);
    toast.push('Task added!', 'success');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    if (!confirm('Delete this task?')) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.push('Task deleted', 'info');
  };

  const activeTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => {
      if (a.due_date && b.due_date) return new Date(a.due_date) - new Date(b.due_date);
      if (a.due_date) return -1;
      if (b.due_date) return 1;
      return 0;
    });

  const doneTasks = tasks.filter((t) => t.completed);

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Tasks</h1>
          <p className="page-subtitle">
            {activeTasks.length} active · {doneTasks.length} completed
          </p>
        </div>

        <button onClick={() => setShowAdd(true)} className="btn-primary">
          + Add task
        </button>
      </div>

      {tasks.length === 0 ? (
        <Empty
          icon="✅"
          title="No tasks yet"
          message="Add your first task to stay on track."
          action={
            <button onClick={() => setShowAdd(true)} className="btn-primary">
              + Add task
            </button>
          }
        />
      ) : (
        <div className="space-y-6">
          {activeTasks.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-ink-400">
                Active
              </h2>
              <div className="space-y-2">
                {activeTasks.map((t) => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
          )}

          {doneTasks.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-ink-400">
                Completed
              </h2>
              <div className="space-y-2">
                {doneTasks.map((t) => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add a task"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={addTask}>
              Add task
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
              placeholder="What do you need to do?"
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              className="input"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Optional details"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Due date</label>
              <input
                type="date"
                className="input"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Priority</label>
              <select
                className="input"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function TaskRow({ task, onToggle, onDelete }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 cursor-pointer accent-blue-600"
      />

      <span className={`h-2 w-2 rounded-full ${PRIORITY_COLORS[task.priority]}`} />

      <div className="min-w-0 flex-1">
        <div
          className={`font-medium ${
            task.completed
              ? 'text-slate-400 line-through dark:text-ink-500'
              : 'text-slate-700 dark:text-ink-100'
          }`}
        >
          {task.title}
        </div>
        {task.description && (
          <div className="text-xs text-slate-400 dark:text-ink-500">
            {task.description}
          </div>
        )}
      </div>

      {task.due_date && (
        <span className="hidden text-xs text-slate-400 dark:text-ink-500 sm:inline">
          {new Date(task.due_date).toLocaleDateString()}
        </span>
      )}

      <button
        onClick={() => onDelete(task.id)}
        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
      >
        🗑
      </button>
    </div>
  );
}
