export default function ThemeSwitch({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      title={isDark ? 'Light mode' : 'Dark mode'}
      aria-label="Toggle theme"
      className={`relative inline-flex h-9 w-[68px] items-center rounded-full border transition-colors ${
        isDark
          ? 'border-ink-700 bg-ink-800'
          : 'border-slate-300 bg-slate-100'
      }`}
    >
      <span
        className={`absolute flex h-7 w-7 items-center justify-center rounded-full shadow-md transition-all duration-300 ${
          isDark
            ? 'translate-x-[36px] bg-ink-950 text-yellow-300'
            : 'translate-x-[3px] bg-white text-amber-500'
        }`}
      >
        {isDark ? (
          // Moon icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Sun icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="5" />
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            />
          </svg>
        )}
      </span>
    </button>
  );
}