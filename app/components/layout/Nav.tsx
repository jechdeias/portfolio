import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About",          href: "#about"    },
  { label: "Skills",         href: "#skills"   },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certs"    },
  { label: "Lab",            href: "#lab"      },
  { label: "Experience",     href: "#timeline" },
  { label: "Contact",        href: "#contact"  },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Nav() {
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-parchment) 92%, transparent)",
        backdropFilter: "blur(8px)",
        borderColor: "color-mix(in srgb, var(--color-ink) 10%, transparent)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-2xl text-[var(--color-ink)] hover:text-[var(--color-sage-dark)] transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Portfolio
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            return (
              <li key={id}>
                <a
                  href={href}
                  className={`nav-link text-base text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors pb-0.5 ${
                    activeId === id ? "active" : ""
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2 text-[var(--color-ink)]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 pb-4 gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="block text-base text-[var(--color-ink-muted)] hover:text-[var(--color-sage-dark)] transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
