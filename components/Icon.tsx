export default function Icon({ name, className = '', size = 24 }: { name: string; className?: string; size?: number }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: `${size}px` }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
