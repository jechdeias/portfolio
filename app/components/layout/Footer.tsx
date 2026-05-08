import { PERSONAL } from "~/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t text-center py-5 text-sm text-[var(--color-ink-muted)]"
      style={{ borderColor: "color-mix(in srgb, var(--color-ink) 10%, transparent)" }}
    >
      © {year} {PERSONAL.name}. Crafted with care.
    </footer>
  );
}
