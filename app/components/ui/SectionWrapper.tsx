import { useScrollReveal } from "~/hooks/useScrollReveal";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({ id, className = "", children }: SectionWrapperProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id={id}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`reveal ${isVisible ? "visible" : ""} max-w-5xl mx-auto px-6 py-20 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
