import SectionWrapper from "~/components/ui/SectionWrapper";
import { PERSONAL } from "~/data/portfolio";

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
        {/* Avatar placeholder */}
        <div className="flex justify-center md:justify-start">
          <img
            src="/me.png"
            alt="Jehdeiah Shane G. Par"
            className="w-48 h-48 rounded-full object-cover"
            style={{ border: "2px solid var(--color-sage-light)" }}
          />
        </div>

        {/* Bio */}
        <div>
          <h2
            className="text-4xl font-light text-[var(--color-ink)] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About Me
          </h2>
          {PERSONAL.bio.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-[var(--color-ink-muted)] leading-relaxed text-base mb-4 last:mb-0"
            >
              {para}
            </p>
          ))}

          {/* Social links */}
          <div className="flex gap-4 mt-6">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-sage-dark)] hover:text-[var(--color-ink)] transition-colors underline underline-offset-4"
            >
              GitHub
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-sage-dark)] hover:text-[var(--color-ink)] transition-colors underline underline-offset-4"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="text-sm text-[var(--color-sage-dark)] hover:text-[var(--color-ink)] transition-colors underline underline-offset-4"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
