import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="text-6xl">🧭</div>
      <h1 className="mt-4 text-3xl font-bold text-slate-800">Page not found</h1>
      <p className="mt-2 text-slate-500">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back to Dashboard
      </Link>
    </div>
  );
}