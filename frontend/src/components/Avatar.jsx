export default function Avatar({ user, size = 40 }) {
  const src = user?.profile_picture;
  const initial = (user?.name || '?').charAt(0).toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={user?.name || 'Avatar'}
        style={{ width: size, height: size }}
        className="rounded-full object-cover ring-2 ring-white"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className="flex items-center justify-center rounded-full bg-blue-600 font-bold text-white"
    >
      {initial}
    </div>
  );
}