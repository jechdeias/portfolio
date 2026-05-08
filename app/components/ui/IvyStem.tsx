import { useEffect, useRef, useState } from "react";

// 5-lobed ivy leaf. Attachment point at (0,0) = bottom-centre.
// Leaf body extends upward ~26px, width ~34px.
const LEAF_PATH =
  "M 0,0 C-4,-6-11,-4-14,-11 C-17,-18-12,-25-6,-22 C-2,-20 0,-24 0,-26 C 0,-24 2,-20 6,-22 C12,-25 17,-18 14,-11 C11,-4 4,-6 0,0 Z";

// tx/ty = translate to position on vine (left-stem coordinates)
// rot   = rotation angle so leaf points naturally away from vine
// sc    = size scale (1.0 = full)
// delay = ms after animation start (matches when vine reaches that point)
const LEAF_DEFS = [
  // cluster 1 — right side, low on vine
  { tx: 62, ty: 436, rot: 48,   sc: 1.3, delay: 380  },
  { tx: 82, ty: 422, rot: 68,   sc: 1.0, delay: 430  },
  // cluster 2 — left side
  { tx: 12, ty: 378, rot: -145, sc: 1.4, delay: 680  },
  { tx: -4, ty: 360, rot: -168, sc: 1.0, delay: 730  },
  // cluster 3 — right side
  { tx: 66, ty: 314, rot: 42,   sc: 1.3, delay: 1000 },
  { tx: 90, ty: 298, rot: 58,   sc: 1.1, delay: 1050 },
  { tx: 104,ty: 285, rot: 72,   sc: 0.9, delay: 1090 },
  // cluster 4 — left side
  { tx: 10, ty: 256, rot: -140, sc: 1.2, delay: 1300 },
  { tx: -6, ty: 238, rot: -162, sc: 1.0, delay: 1350 },
  // cluster 5 — right side
  { tx: 70, ty: 194, rot: 40,   sc: 1.4, delay: 1650 },
  { tx: 92, ty: 178, rot: 54,   sc: 1.0, delay: 1700 },
  // cluster 6 — left side
  { tx: 12, ty: 138, rot: -138, sc: 1.2, delay: 1960 },
  { tx: -4, ty: 120, rot: -160, sc: 0.9, delay: 2010 },
  // top — right
  { tx: 68, ty: 80,  rot: 36,   sc: 1.1, delay: 2240 },
  { tx: 46, ty: 66,  rot: 20,   sc: 0.8, delay: 2280 },
] as const;

// Branch stems rendered at same time as their leaf cluster
const BRANCH_DEFS = [
  { d: "M 62 438 C 75 430,84 426,86 418",          leafIdx: 0 },
  { d: "M 35 378 C 22 372,10 364,8 352",            leafIdx: 2 },
  { d: "M 62 316 C 76 308,92 300,100 290",          leafIdx: 4 },
  { d: "M 38 256 C 22 248,8 238,4 226",             leafIdx: 7 },
  { d: "M 65 194 C 80 184,98 178,105 166",          leafIdx: 9 },
  { d: "M 42 138 C 24 130,8 120,4 108",             leafIdx: 11 },
];

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  amber: boolean;
}

const VINE_DURATION = 2400; // ms for full stroke draw

export default function IvyStem({
  side,
  className = "",
}: {
  side: "left" | "right";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const triggered = useRef(false);

  const [leafStates, setLeafStates] = useState<boolean[]>(
    () => new Array(LEAF_DEFS.length).fill(false)
  );
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          animate();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();

    function animate() {
      const path = pathRef.current;
      if (!path) return;

      const len = path.getTotalLength();

      // Vine stroke draw
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          path.style.transition = `stroke-dashoffset ${VINE_DURATION}ms cubic-bezier(0.4,0,0.2,1)`;
          path.style.strokeDashoffset = "0";
        })
      );

      // Stagger leaf appearances
      LEAF_DEFS.forEach((def, i) => {
        setTimeout(() => {
          setLeafStates((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, def.delay);
      });

      // Spawn sparkles: mix of path-sampled + leaf-adjacent points
      const pts: Sparkle[] = [];

      // Along the vine path
      for (let i = 0; i < 16; i++) {
        const t = 0.04 + Math.random() * 0.92;
        const pt = path.getPointAtLength(t * len);
        pts.push({
          id: i,
          x: pt.x + (Math.random() - 0.5) * 28,
          y: pt.y + (Math.random() - 0.5) * 28,
          delay: t * VINE_DURATION * 0.84 + Math.random() * 220,
          size: 7 + Math.random() * 8,
          amber: Math.random() < 0.28,
        });
      }

      // Near leaf tips (every other leaf cluster)
      LEAF_DEFS.forEach((def, i) => {
        if (i % 2 === 0) {
          pts.push({
            id: 16 + i,
            x: def.tx + (Math.random() - 0.5) * 18,
            y: def.ty - 14 + (Math.random() - 0.5) * 14,
            delay: def.delay + 120 + Math.random() * 280,
            size: 5 + Math.random() * 6,
            amber: Math.random() < 0.4,
          });
        }
      });

      setSparkles(pts);
    }
  }, []);

  const flip = side === "right";

  return (
    <div
      ref={containerRef}
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: 200, height: 500 }}
    >
      <svg
        viewBox="0 0 200 500"
        width={200}
        height={500}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
        aria-hidden="true"
      >
        {/* Main sinuous vine */}
        <path
          ref={pathRef}
          d="M 45 500 C 70 480,80 458,60 438 C 40 418,15 400,38 380 C 61 360,82 338,62 316 C 42 294,15 277,38 258 C 61 239,85 218,65 196 C 45 174,18 158,42 140 C 66 122,88 102,68 82 C 48 62,25 48,45 32"
          stroke="#3d5c3a"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Short branch stems */}
        {BRANCH_DEFS.map((b, i) => (
          <path
            key={i}
            d={b.d}
            stroke="#3d5c3a"
            strokeWidth="1.1"
            strokeLinecap="round"
            style={{
              opacity: leafStates[b.leafIdx] ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />
        ))}

        {/* Ivy leaves */}
        {LEAF_DEFS.map((def, i) => (
          <g
            key={i}
            transform={`translate(${def.tx} ${def.ty}) rotate(${def.rot})`}
          >
            <path
              d={LEAF_PATH}
              fill="#3d5c3a"
              opacity={0.88}
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100%",
                transform: leafStates[i] ? `scale(${def.sc})` : "scale(0)",
                transition:
                  "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
            {/* Subtle lighter highlight vein */}
            <path
              d="M 0,0 L 0,-22"
              stroke="#5a8a55"
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity={leafStates[i] ? 0.45 : 0}
              style={{ transition: "opacity 0.4s ease 0.2s" }}
            />
          </g>
        ))}
      </svg>

      {/* Sparkle particles — positioned in container coords */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="ivy-sparkle"
          style={{
            left: flip ? 200 - s.x : s.x,
            top: s.y,
            animationDelay: `${s.delay}ms`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg viewBox="0 0 12 12" width={s.size} height={s.size}>
            <path
              d="M6 0.5 L7.1 4.9 L11.5 6 L7.1 7.1 L6 11.5 L4.9 7.1 L0.5 6 L4.9 4.9 Z"
              fill={s.amber ? "#c9862a" : "#f9f5ec"}
              opacity={s.amber ? 0.88 : 0.95}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
