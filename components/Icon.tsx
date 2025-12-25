export default function Icon({ name, className = '', size = 24, fill = false }: { name: string; className?: string; size?: number; fill?: boolean }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0"
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
