interface ButtonProps {
  variant: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ variant, href, onClick, children, className = "" }: ButtonProps) {
  const base =
    "btn-sweep inline-flex items-center justify-center px-7 py-3 rounded-full font-sans text-base tracking-wide transition-all duration-200 cursor-pointer";

  const styles = {
    primary: "bg-[var(--color-sage)] text-[var(--color-parchment)] hover:bg-[var(--color-sage-dark)]",
    ghost: "border border-[var(--color-ink-muted)]/50 text-[var(--color-ink-muted)] hover:border-[var(--color-sage)] hover:text-[var(--color-sage-dark)]",
  };

  const classes = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
