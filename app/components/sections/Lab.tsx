import SectionWrapper from "~/components/ui/SectionWrapper";
import Tag from "~/components/ui/Tag";
import { LAB_EXPERIMENTS } from "~/data/portfolio";

export default function Lab() {
  return (
    <SectionWrapper id="lab">
      <h2
        className="text-4xl font-light text-[var(--color-ink)] mb-4 text-center"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Lab Notebook
      </h2>
      <p className="text-center text-[var(--color-ink-muted)] text-sm mb-12">
        Experiments, explorations, and things I built to understand.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {LAB_EXPERIMENTS.map((exp) => (
          <article
            key={exp.title}
            className="p-6 rounded-2xl bg-[var(--color-linen)] border border-[var(--color-parchment-dark)]"
          >
            {/* Tool badge */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-mono mb-4"
              style={{
                backgroundColor: "var(--color-terracotta-light)",
                color: "var(--color-ink)",
              }}
            >
              {exp.tool}
            </span>

            <h3
              className="text-xl font-light text-[var(--color-ink)] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {exp.title}
            </h3>

            <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed mb-4">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {exp.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            {exp.repoUrl && exp.repoUrl !== "#" && (
              <a
                href={exp.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--color-sage-dark)] hover:text-[var(--color-ink)] transition-colors underline underline-offset-2"
              >
                View repo ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
