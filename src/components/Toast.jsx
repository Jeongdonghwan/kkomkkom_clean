export default function Toast({ message }) {
  const visible = Boolean(message);
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-1/2 bottom-10 -translate-x-1/2 bg-ink text-white px-6 py-3.5 rounded-full font-bold z-[90] pointer-events-none transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {message}
    </div>
  );
}
