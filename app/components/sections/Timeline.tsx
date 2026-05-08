import { useScrollReveal } from "~/hooks/useScrollReveal";
import SectionWrapper from "~/components/ui/SectionWrapper";
import { TIMELINE } from "~/data/portfolio";

const TYPE_COLORS: Record<string, string> = {
  internship: "var(--color-sage)",
  "part-time": "var(--color-sage-light)",
  "full-time": "var(--color-sage-dark)",
  volunteer: "var(--color-terracotta)",
  org: "var(--color-rose)",
};

function TimelineItem({ entry, index }: { entry: (typeof TIMELINE)[number]; index: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal stagger-${Math.min(index + 1, 6)} relative pl-10`}
    >
      {/* Dot */}
      <span
        className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-parchment)] ${isVisible ? "dot-pulse" : ""}`}
        style={{ backgroundColor: TYPE_COLORS[entry.type] ?? "var(--color-sage)" }}
      />

      {/* Content */}
      <div className="mb-10">
        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <h3
            className="text-xl font-light text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {entry.role}
          </h3>
          <span className="text-[var(--color-ink-muted)] text-sm">— {entry.org}</span>
        </div>

        <p className="text-xs text-[var(--color-terracotta)] mb-2 font-mono">
          {entry.startDate} – {entry.endDate}
        </p>

        <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">
          {entry.description}
        </p>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <SectionWrapper id="timeline">
      <h2
        className="text-4xl font-light text-[var(--color-ink)] mb-12 text-center"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Experience
      </h2>

      {/* Vertical line */}
      <div className="relative max-w-2xl mx-auto">
        <div
          className="absolute left-[6px] top-2 bottom-2 w-px"
          style={{ backgroundColor: "var(--color-parchment-dark)" }}
        />
        {TIMELINE.map((entry, i) => (
          <TimelineItem key={`${entry.org}-${entry.startDate}`} entry={entry} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
