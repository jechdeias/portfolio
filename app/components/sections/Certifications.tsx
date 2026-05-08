import { useState } from "react";
import SectionWrapper from "~/components/ui/SectionWrapper";
import { CERTIFICATIONS } from "~/data/portfolio";

export default function Certifications() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <SectionWrapper id="certs">
      <h2
        className="text-4xl font-light text-[var(--color-ink)] mb-12 text-center"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Certifications
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.title}
            className="rounded-2xl overflow-hidden bg-[var(--color-linen)] border border-[var(--color-parchment-dark)] flex flex-col cursor-pointer group transition-shadow hover:shadow-lg"
            onClick={() => cert.image && setLightbox(cert.image)}
          >
            {cert.image && (
              <div className="overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <div className="p-5 flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-terracotta)]">
                {cert.issuer}
              </p>
              <h3
                className="text-base font-light text-[var(--color-ink)] leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {cert.title}
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">{cert.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Certificate"
            className="max-w-4xl w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-6 text-white text-3xl leading-none"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}
