import SectionWrapper from "~/components/ui/SectionWrapper";
import Tag from "~/components/ui/Tag";
import Button from "~/components/ui/Button";
import { PROJECTS } from "~/data/portfolio";

export default function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <SectionWrapper id="projects">
      <h2
        className="text-4xl font-light text-[var(--color-ink)] mb-12 text-center"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Projects
      </h2>

      {/* Featured cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {featured.map((project) => (
          <article
            key={project.id}
            className="card-tilt rounded-2xl overflow-hidden bg-[var(--color-linen)] border border-[var(--color-parchment-dark)]"
          >
            {/* Video embed */}
            {project.videoUrl && (
              <div className="aspect-video bg-[var(--color-parchment-dark)]">
                <iframe
                  src={project.videoUrl}
                  title={project.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="p-6">
              <h3
                className="text-2xl font-light text-[var(--color-ink)] mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h3>
              <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.techStack.map((tech) => (
                  <Tag key={tech} label={tech} />
                ))}
              </div>

              <div className="flex gap-3">
                {project.githubUrl && (
                  <Button variant="ghost" href={project.githubUrl}>
                    GitHub
                  </Button>
                )}
                {project.demoUrl && (
                  <Button variant="primary" href={project.demoUrl}>
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Other projects — compact list */}
      {others.length > 0 && (
        <div className="border-t border-[var(--color-parchment-dark)] pt-8">
          <h3
            className="text-sm uppercase tracking-widest text-[var(--color-terracotta)] mb-6"
          >
            Other Work
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {others.map((project) => (
              <div
                key={project.id}
                className="p-5 rounded-xl bg-[var(--color-linen)] border border-[var(--color-parchment-dark)]"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4
                    className="text-lg font-light text-[var(--color-ink)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h4>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--color-sage-dark)] hover:text-[var(--color-ink)] transition-colors shrink-0 underline underline-offset-2"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
                <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Tag key={tech} label={tech} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
