import SectionWrapper from "~/components/ui/SectionWrapper";
import Button from "~/components/ui/Button";
import BotanicalDivider from "~/components/ui/BotanicalDivider";
import { PERSONAL } from "~/data/portfolio";

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="text-center max-w-xl mx-auto">
        <BotanicalDivider className="mb-10" />

        <h2
          className="text-4xl font-light text-[var(--color-ink)] mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let's Talk
        </h2>
        <p className="text-[var(--color-ink-muted)] leading-relaxed mb-8">
          Whether it's a project, a question, or just a hello — my inbox is always open.
        </p>

        <Button variant="primary" href={`mailto:${PERSONAL.email}`}>
          Say Hello
        </Button>

        <div className="flex justify-center gap-6 mt-8">
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-sage-dark)] transition-colors underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-sage-dark)] transition-colors underline underline-offset-4"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
