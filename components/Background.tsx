import React, { useEffect, useMemo, useState } from 'react';

// ── Helpers ───────────────────────────────────────────────────────────────────
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// ── Star field (dark mode) ────────────────────────────────────────────────────
interface Star  { id: number; x: number; y: number; r: number; delay: number; dur: number }
interface Shoot { id: number; x: number; y: number; len: number; delay: number; dur: number }

const StarField: React.FC = () => {
  const stars = useMemo<Star[]>(() =>
    Array.from({ length: 120 }, (_, id) => ({
      id,
      x:     rand(0, 100),
      y:     rand(0, 100),
      r:     rand(0.4, 1.8),
      delay: rand(0, 6),
      dur:   rand(2.5, 5.5),
    })), []);

  // 7 shooting stars — each cycles 12-22 s, but only visible for ~10% of cycle
  const shoots = useMemo<Shoot[]>(() =>
    Array.from({ length: 7 }, (_, id) => ({
      id,
      x:     rand(5, 75),    // start x %
      y:     rand(2, 40),    // start y % (upper portion)
      len:   rand(100, 180), // tail px
      delay: rand(0, 22),    // stagger across cycle
      dur:   rand(12, 22),   // full cycle length
    })), []);

  return (
    <div className="absolute inset-0">
      {/* Twinkling stars via SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'hidden' }}>
        {stars.map(s => (
          <circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="white"
            style={{ animation: `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }}
          />
        ))}
      </svg>

      {/* Shooting stars via divs (gradient tail + CSS translate) */}
      {shoots.map(s => (
        <div
          key={s.id}
          style={{
            position:     'absolute',
            top:          `${s.y}%`,
            left:         `${s.x}%`,
            width:        `${s.len}px`,
            height:       '1.5px',
            borderRadius: '1px',
            background:   'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 100%)',
            transform:    'rotate(135deg)',
            transformOrigin: 'right center',
            opacity:      0,
            animation:    `shooting-star ${s.dur}s ease-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

// ── Cloud shape ───────────────────────────────────────────────────────────────
const CloudShape: React.FC<{ fill: string }> = ({ fill }) => (
  <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <ellipse cx="100" cy="62" rx="90"  ry="22" fill={fill} />
    <ellipse cx="70"  cy="48" rx="50"  ry="30" fill={fill} />
    <ellipse cx="120" cy="44" rx="55"  ry="34" fill={fill} />
    <ellipse cx="155" cy="56" rx="35"  ry="22" fill={fill} />
    <ellipse cx="45"  cy="58" rx="30"  ry="18" fill={fill} />
  </svg>
);

interface CloudDef { top: string; scale: number; dur: number; delay: number; opacity: number }

// ── Reduced cloud sizes (scale cut ~50% from original) ────────────────────────
const CLOUDS: CloudDef[] = [
  { top:  '6%', scale: 0.70, dur: 52, delay:   0, opacity: 0.88 },
  { top: '18%', scale: 0.45, dur: 40, delay: -14, opacity: 0.75 },
  { top: '30%', scale: 0.55, dur: 60, delay:  -6, opacity: 0.65 },
  { top: '10%', scale: 0.35, dur: 44, delay: -28, opacity: 0.55 },
  { top: '22%', scale: 0.80, dur: 70, delay: -38, opacity: 0.80 },
];

// ── Cloud layer (light mode) ──────────────────────────────────────────────────
const CloudLayer: React.FC = () => (
  <>
    {CLOUDS.map((c, i) => (
      <div
        key={i}
        style={{
          position:   'absolute',
          top:        c.top,
          left:       0,
          willChange: 'transform',
          animation:  `cloud-drift ${c.dur}s linear ${c.delay}s infinite`,
        }}
      >
        <div style={{ transform: `scale(${c.scale})`, transformOrigin: 'left center', opacity: c.opacity * 0.28 }}>
          <CloudShape fill="white" />
        </div>
      </div>
    ))}
  </>
);

// ── Bird SVG — stroke-based seagull with pivot-based wing flap ────────────────
// Each wing is drawn relative to the body centre via a translate <g>, then a
// nested <g> carries the CSS rotation so the pivot is always the body centre.
const BirdSVG: React.FC<{ color: string; flapDur: string }> = ({ color, flapDur }) => (
  <svg viewBox="0 0 64 28" width="64" height="28" xmlns="http://www.w3.org/2000/svg">
    {/* Tiny body */}
    <ellipse cx="32" cy="18" rx="2.8" ry="1.8" fill={color} />

    {/* Left wing — outer <g> moves origin to body; inner <g> rotates around that origin */}
    <g transform="translate(32, 18)">
      <g style={{ animation: `bird-wing-l ${flapDur} ease-in-out infinite alternate` }}>
        <path d="M 0 0 C -7 -9 -17 -11 -29 -7" stroke={color} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      </g>
    </g>

    {/* Right wing */}
    <g transform="translate(32, 18)">
      <g style={{ animation: `bird-wing-r ${flapDur} ease-in-out infinite alternate` }}>
        <path d="M 0 0 C 7 -9 17 -11 29 -7" stroke={color} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);

interface BirdDef {
  top: string; scale: number; dur: number; delay: number;
  opacity: number; flapDur: string; ltr?: boolean;
}

const BIRDS: BirdDef[] = [
  // flock of 3 — upper sky, right-to-left
  { top:  '7%', scale: 0.90, dur: 30, delay:   0, opacity: 0.80, flapDur: '0.55s' },
  { top:  '9%', scale: 0.70, dur: 30, delay:  -2, opacity: 0.70, flapDur: '0.50s' },
  { top:  '6%', scale: 0.55, dur: 30, delay:  -4, opacity: 0.65, flapDur: '0.48s' },
  // solo — mid sky, left-to-right (opposite direction)
  { top: '14%', scale: 1.00, dur: 38, delay: -10, opacity: 0.75, flapDur: '0.62s', ltr: true },
  // pair — lower
  { top: '22%', scale: 0.65, dur: 26, delay: -18, opacity: 0.65, flapDur: '0.46s' },
  { top: '24%', scale: 0.50, dur: 26, delay: -20, opacity: 0.60, flapDur: '0.44s' },
  // distant tiny solo
  { top: '11%', scale: 0.40, dur: 44, delay: -32, opacity: 0.50, flapDur: '0.40s', ltr: true },
  // high fast solo
  { top:  '3%', scale: 0.75, dur: 22, delay: -15, opacity: 0.72, flapDur: '0.52s' },
];

// ── Bird layer (light mode) ───────────────────────────────────────────────────
const BirdLayer: React.FC = () => {
  const birds = useMemo(() => BIRDS, []);
  return (
    <>
      {birds.map((b, i) => (
        <div
          key={i}
          style={{
            position:   'absolute',
            top:        b.top,
            left:       0,
            willChange: 'transform',
            animation:  `${b.ltr ? 'bird-drift-ltr' : 'bird-drift'} ${b.dur}s linear ${b.delay}s infinite`,
          }}
        >
          <div style={{ transform: `scale(${b.scale})`, transformOrigin: 'left center', opacity: b.opacity }}>
            <BirdSVG color="rgba(180, 255, 220, 0.88)" flapDur={b.flapDur} />
          </div>
        </div>
      ))}
    </>
  );
};

// ── Cloud layer (blue mode) — blue & white clouds on navy ────────────────────
const BLUE_CLOUDS: (CloudDef & { fill: string })[] = [
  { top:  '5%', scale: 0.75, dur: 58, delay:   0, opacity: 0.90, fill: 'rgba(255,255,255,0.9)' },
  { top: '16%', scale: 0.48, dur: 42, delay: -16, opacity: 0.75, fill: 'rgba(96,165,250,0.85)' },
  { top: '28%', scale: 0.60, dur: 64, delay:  -8, opacity: 0.70, fill: 'rgba(255,255,255,0.85)' },
  { top:  '8%', scale: 0.38, dur: 48, delay: -30, opacity: 0.60, fill: 'rgba(147,197,253,0.80)' },
  { top: '20%', scale: 0.85, dur: 74, delay: -42, opacity: 0.85, fill: 'rgba(255,255,255,0.90)' },
  { top: '38%', scale: 0.52, dur: 50, delay: -22, opacity: 0.65, fill: 'rgba(96,165,250,0.75)' },
];

const BlueCloudLayer: React.FC = () => (
  <>
    {BLUE_CLOUDS.map((c, i) => (
      <div
        key={i}
        style={{
          position:   'absolute',
          top:        c.top,
          left:       0,
          willChange: 'transform',
          animation:  `cloud-drift ${c.dur}s linear ${c.delay}s infinite`,
        }}
      >
        <div style={{ transform: `scale(${c.scale})`, transformOrigin: 'left center', opacity: c.opacity * 0.32 }}>
          <CloudShape fill={c.fill} />
        </div>
      </div>
    ))}
  </>
);

// ── Background ────────────────────────────────────────────────────────────────
const Background: React.FC = () => {
  const getTheme = () => document.documentElement.getAttribute('data-theme') ?? 'dark';
  const [currentTheme, setCurrentTheme] = useState(getTheme);
  const isLight = currentTheme === 'light';
  const isBlue  = currentTheme === 'blue';
  const [starOpacity, setStarOpacity] = useState(0.25);

  useEffect(() => {
    const mo = new MutationObserver(() => {
      setCurrentTheme(document.documentElement.getAttribute('data-theme') ?? 'dark');
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  // Fade stars in as user scrolls past the hero section
  useEffect(() => {
    const onScroll = () => {
      const heroHeight = document.getElementById('home')?.offsetHeight ?? window.innerHeight;
      const progress   = Math.min(1, window.scrollY / (heroHeight * 0.6));
      setStarOpacity(0.25 + progress * 0.75);   // 0.25 on hero → 1.0 below
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.15; }
          50%      { opacity: 1;    }
        }
        @keyframes shooting-star {
          0%    { transform: rotate(135deg) translateX(0);     opacity: 0; }
          2%    { opacity: 1; }
          14%   { transform: rotate(135deg) translateX(380px); opacity: 0; }
          15%,
          100%  { opacity: 0; }
        }
        @keyframes cloud-drift {
          from { transform: translateX(110vw);  }
          to   { transform: translateX(-320px); }
        }
        /* Birds drift right-to-left */
        @keyframes bird-drift {
          from { transform: translateX(110vw); }
          to   { transform: translateX(-80px); }
        }
        /* Birds drift left-to-right */
        @keyframes bird-drift-ltr {
          from { transform: translateX(-80px); }
          to   { transform: translateX(110vw); }
        }
        /* Wing flap — left wing rotates between tilted-up and tilted-down */
        @keyframes bird-wing-l {
          0%   { transform: rotate(-14deg); }
          100% { transform: rotate(20deg);  }
        }
        /* Right wing mirrors */
        @keyframes bird-wing-r {
          0%   { transform: rotate(14deg);  }
          100% { transform: rotate(-20deg); }
        }
      `}</style>

      {/* Imitation Game quote — barely visible watermark, bottom-right of hero */}
      <div
        className="fixed pointer-events-none"
        style={{ zIndex: 0, bottom: '5rem', right: '3rem' }}
        aria-hidden
      >
        <p
          className="text-[0.5rem] md:text-[0.85rem]"
          style={{
            fontFamily: 'Georgia, serif',
            color: 'white',
            opacity: 0.18,
            textAlign: 'right',
            lineHeight: 1.9,
            letterSpacing: '0.03em',
            userSelect: 'none',
          }}
        >
          Sometimes it is the people no one imagines anything of<br />
          who do the things that no one can imagine.
        </p>
      </div>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: isLight || isBlue ? 1 : starOpacity, transition: 'opacity 0.4s ease' }}
        aria-hidden
      >
        {isLight ? (
          <>
            <CloudLayer />
            <BirdLayer />
          </>
        ) : isBlue ? (
          <BlueCloudLayer />
        ) : (
          <StarField />
        )}
      </div>
    </>
  );
};

export default Background;
