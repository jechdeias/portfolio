import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "~/hooks/useScrollReveal";

// Small ivy leaf for the garland (attachment at origin, points upward)
const SMALL_LEAF =
  "M 0,0 C-2,-3-6,-2-8,-6 C-10,-10-7,-14-3,-12 C-1,-11 0,-13 0,-14 C 0,-13 1,-11 3,-12 C7,-14 10,-10 8,-6 C6,-2 2,-3 0,0 Z";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  amber: boolean;
}

// Leaf positions along the horizontal garland (viewBox 0 0 220 54, vine at y=28)
const LEAVES = [
  { tx: 22,  ty: 26, rot: -80,  sc: 1.1, delay: 200  }, // left, pointing up
  { tx: 42,  ty: 30, rot: 100,  sc: 0.9, delay: 380  }, // pointing down
  { tx: 62,  ty: 24, rot: -75,  sc: 1.2, delay: 560  }, // up
  { tx: 82,  ty: 32, rot: 105,  sc: 0.8, delay: 720  }, // down
  // centre gap for flower at x=110
  { tx: 138, ty: 32, rot: 75,   sc: 0.8, delay: 980  }, // down (mirror)
  { tx: 158, ty: 24, rot: -105, sc: 1.2, delay: 1140 }, // up
  { tx: 178, ty: 30, rot: 80,   sc: 0.9, delay: 1300 }, // down
  { tx: 198, ty: 26, rot: -100, sc: 1.1, delay: 1460 }, // up
] as const;

const VINE_DURATION = 1700;

export default function BotanicalDivider({ className = "" }: { className?: string }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });
  const pathRef = useRef<SVGPathElement>(null);
  const triggered = useRef(false);

  const [leafStates, setLeafStates] = useState<boolean[]>(
    () => new Array(LEAVES.length).fill(false)
  );
  const [flowerVisible, setFlowerVisible] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!isVisible || triggered.current) return;
    triggered.current = true;

    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        path.style.transition = `stroke-dashoffset ${VINE_DURATION}ms cubic-bezier(0.4,0,0.2,1)`;
        path.style.strokeDashoffset = "0";
      })
    );

    // Leaves
    LEAVES.forEach((leaf, i) => {
      setTimeout(() => {
        setLeafStates((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, leaf.delay);
    });

    // Flower
    setTimeout(() => setFlowerVisible(true), VINE_DURATION * 0.55);

    // Sparkles along vine
    const pts: Sparkle[] = [];
    for (let i = 0; i < 12; i++) {
      const t = 0.05 + Math.random() * 0.9;
      const pt = path.getPointAtLength(t * len);
      pts.push({
        id: i,
        x: pt.x + (Math.random() - 0.5) * 20,
        y: pt.y + (Math.random() - 0.5) * 20,
        delay: t * VINE_DURATION * 0.88 + Math.random() * 180,
        size: 5 + Math.random() * 6,
        amber: Math.random() < 0.35,
      });
    }
    setSparkles(pts);
  }, [isVisible]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative flex justify-center py-2 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="220"
        height="54"
        viewBox="0 0 220 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal vine */}
        <path
          ref={pathRef}
          d="M 5 28 C 35 22,65 34,95 28 C 115 24,105 28,110 28 C 115 28,105 24,125 28 C 155 34,185 22,215 28"
          stroke="#3d5c3a"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Ivy leaves */}
        {LEAVES.map((leaf, i) => (
          <g key={i} transform={`translate(${leaf.tx} ${leaf.ty}) rotate(${leaf.rot})`}>
            <path
              d={SMALL_LEAF}
              fill="#3d5c3a"
              opacity={0.85}
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100%",
                transform: leafStates[i] ? `scale(${leaf.sc})` : "scale(0)",
                transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          </g>
        ))}

        {/* Centre daisy */}
        <g transform="translate(110 27)">
          {/* 8 petals */}
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse
              key={i}
              cx={0}
              cy={-8}
              rx={2.5}
              ry={5.5}
              fill="#f4ede0"
              transform={`rotate(${i * 45})`}
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100%",
                opacity: flowerVisible ? 0.92 : 0,
                transition: `opacity 0.4s ease ${0.05 * i}s`,
              }}
            />
          ))}
          {/* Amber centre */}
          <circle
            cx={0}
            cy={0}
            r={3.2}
            fill="#c9862a"
            style={{
              opacity: flowerVisible ? 1 : 0,
              transition: "opacity 0.35s ease 0.3s",
            }}
          />
        </g>
      </svg>

      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="ivy-sparkle"
          style={{
            insetInlineStart: `calc(50% - 110px + ${s.x}px)`,
            insetBlockStart: s.y,
            animationDelay: `${s.delay}ms`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg viewBox="0 0 12 12" width={s.size} height={s.size}>
            <path
              d="M6 0.5 L7.1 4.9 L11.5 6 L7.1 7.1 L6 11.5 L4.9 7.1 L0.5 6 L4.9 4.9 Z"
              fill={s.amber ? "#c9862a" : "#3d5c3a"}
              opacity={s.amber ? 0.9 : 0.7}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
