import Button from "~/components/ui/Button";
import IvyStem from "~/components/ui/IvyStem";
import { PERSONAL } from "~/data/portfolio";

// Deterministic pseudo-random — same on server and client (no hydration mismatch)
function pr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 88 }, (_, i) => ({
  id: i,
  cx: pr(i * 3 + 1) * 100,
  cy: pr(i * 3 + 2) * 78,
  r: 0.6 + pr(i * 3 + 3) * 2.0,
  op: 0.28 + pr(i * 7) * 0.72,
  dur: `${2.2 + pr(i * 11) * 4.2}s`,
  delay: `-${pr(i * 13) * 5}s`,
  glow: i % 9 === 0,
}));

export default function Hero() {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center text-center overflow-hidden">

      {/* ── Stars ─────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        <defs>
          <radialGradient id="glow-star" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f9f5ec" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f9f5ec" stopOpacity="0" />
          </radialGradient>
        </defs>
        {STARS.map((s) => (
          <g key={s.id}>
            {s.glow && (
              <circle cx={s.cx} cy={s.cy} r={s.r * 3.5} fill="url(#glow-star)" opacity={0.25} />
            )}
            <circle
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="#f9f5ec"
              className="star-twinkle"
              style={
                {
                  "--s-op": s.op,
                  "--s-dur": s.dur,
                  "--s-delay": s.delay,
                  opacity: s.op,
                } as React.CSSProperties
              }
            />
          </g>
        ))}
      </svg>

      {/* ── Moon ────────────────────────────────────────── */}
      <svg
        className="hero-moon z-10"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="moon-body" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#f5f0e2" />
            <stop offset="60%" stopColor="#e8e0cc" />
            <stop offset="100%" stopColor="#cfc6b0" />
          </radialGradient>
          <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="30%" stopColor="#c9862a" stopOpacity="0" />
            <stop offset="100%" stopColor="#c9862a" stopOpacity="0.18" />
          </radialGradient>
        </defs>
        <circle cx={60} cy={60} r={58} fill="url(#moon-glow)" className="moon-halo" />
        <circle cx={60} cy={60} r={42} fill="url(#moon-body)" />
        <circle cx={44} cy={52} r={5}   fill="#cfc6b0" opacity={0.35} />
        <circle cx={72} cy={40} r={3.5} fill="#cfc6b0" opacity={0.28} />
        <circle cx={65} cy={68} r={4}   fill="#cfc6b0" opacity={0.22} />
        <circle cx={38} cy={72} r={2.5} fill="#cfc6b0" opacity={0.18} />
      </svg>

      {/* ── Ivy — left ───────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 z-10">
        <IvyStem side="left" />
      </div>

      {/* ── Ivy — right ──────────────────────────────────── */}
      <div className="absolute bottom-0 right-0 z-10">
        <IvyStem side="right" />
      </div>

      {/* ── Tree line + cabin silhouette ─────────────────── */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
        viewBox="0 0 1200 160"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="window-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c9862a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c9862a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="
            M 0 160 L 0 118
            L 18 118 L 38 82  L 58 118
            L 78 108 L 102 62 L 126 108
            L 148 100 L 175 50 L 202 100
            L 228 112 L 260 70 L 292 112
            L 318 118 L 348 80 L 378 118
            L 410 115
            L 428 115 L 428 100 L 462 78 L 496 100 L 496 115
            L 530 115
            L 558 112 L 590 68 L 622 112
            L 652 100 L 680 52 L 708 100
            L 738 108 L 768 72 L 798 108
            L 828 115 L 862 82 L 896 115
            L 928 108 L 960 58 L 992 108
            L 1028 118 L 1060 86 L 1092 118
            L 1120 112 L 1148 72 L 1176 112
            L 1200 118 L 1200 160 Z
          "
          fill="#0f1220"
        />
        <ellipse cx={462} cy={95} rx={28} ry={20} fill="url(#window-glow)" />
        <rect x={452} y={88} width={20} height={14} rx={2} fill="#c9862a" opacity={0.92} />
        <line x1={462} y1={88} x2={462} y2={102} stroke="#0f1220" strokeWidth={1} opacity={0.5} />
        <line x1={452} y1={95} x2={472} y2={95}  stroke="#0f1220" strokeWidth={1} opacity={0.5} />
      </svg>

      {/* ── Night-to-parchment fade ───────────────────────── */}
      <div className="hero-fade" />

      {/* ── Text content ─────────────────────────────────── */}
      <div className="relative z-40 px-6">
        <h1
          className="hero-name hero-name-text text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-4"
        >
          {PERSONAL.name}
        </h1>
        <p className="hero-tagline hero-tagline-text text-xl md:text-2xl italic mb-10">
          {PERSONAL.tagline}
        </p>
        <div className="hero-buttons flex items-center justify-center gap-4 flex-wrap">
          <Button variant="primary" href="#projects">View My Work</Button>
          <Button variant="ghost" href="#contact">Get in Touch</Button>
        </div>
      </div>
    </section>
  );
}
