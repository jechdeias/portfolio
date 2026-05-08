interface TagProps {
  label: string;
  className?: string;
}

export default function Tag({ label, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full bg-white border border-[var(--color-parchment-dark)] text-[var(--color-ink)] text-sm font-sans transition-transform duration-150 hover:scale-105 hover:-translate-y-0.5 cursor-default ${className}`}
    >
      {label}
    </span>
  );
}
