import SectionWrapper from "~/components/ui/SectionWrapper";
import Tag from "~/components/ui/Tag";
import { SKILLS } from "~/data/portfolio";

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <h2
        className="text-4xl font-light text-[var(--color-ink)] mb-12 text-center"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Skills
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {SKILLS.map((category) => (
          <div key={category.label}>
            <h3
              className="text-sm uppercase tracking-widest text-[var(--color-terracotta)] mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <Tag
                  key={skill}
                  label={skill}
                  className={`stagger-${Math.min(i + 1, 6)}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
