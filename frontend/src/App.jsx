import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Learn from './pages/Learn.jsx';
import Library from './pages/Library.jsx';
import Fields from './pages/Fields.jsx';
import Tutor from './pages/Tutor.jsx';
import Tasks from './pages/Tasks.jsx';
import Calendar from './pages/Calendar.jsx';
import Journal from './pages/Journal.jsx';
import Profile from './pages/Profile.jsx';

function Protected({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Layout>{children}</Layout>;
}

const wrap = (el) => <Protected>{el}</Protected>;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={wrap(<Dashboard />)} />
      <Route path="/learn" element={wrap(<Learn />)} />
      <Route path="/library" element={wrap(<Library />)} />
      <Route path="/fields" element={wrap(<Fields />)} />
      <Route path="/tutor" element={wrap(<Tutor />)} />
      <Route path="/tasks" element={wrap(<Tasks />)} />
      <Route path="/calendar" element={wrap(<Calendar />)} />
      <Route path="/journal" element={wrap(<Journal />)} />
      <Route path="/profile" element={wrap(<Profile />)} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}