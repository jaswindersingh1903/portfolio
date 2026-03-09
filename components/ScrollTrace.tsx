import React, { useEffect, useRef, useState } from 'react';

// ── 3-D cartoon monkey (inline SVG with radial-gradient shading) ──────────────
const MonkeySVG: React.FC = () => (
  <svg
    width="52"
    height="72"
    viewBox="0 0 52 72"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible' }}
  >
    <defs>
      <radialGradient id="mk-head" cx="38%" cy="32%" r="62%">
        <stop offset="0%"   stopColor="#d4895c" />
        <stop offset="100%" stopColor="#7a3e18" />
      </radialGradient>
      <radialGradient id="mk-face" cx="50%" cy="38%" r="62%">
        <stop offset="0%"   stopColor="#f5d09a" />
        <stop offset="100%" stopColor="#c88a50" />
      </radialGradient>
      <radialGradient id="mk-body" cx="34%" cy="28%" r="70%">
        <stop offset="0%"   stopColor="#b06830" />
        <stop offset="100%" stopColor="#582810" />
      </radialGradient>
      <radialGradient id="mk-ear" cx="38%" cy="32%" r="62%">
        <stop offset="0%"   stopColor="#c87840" />
        <stop offset="100%" stopColor="#7a3e18" />
      </radialGradient>
    </defs>

    {/* Tail */}
    <path
      d="M 26 66 Q 47 62 50 49 Q 52 38 44 35"
      stroke="#7a3e18" fill="none" strokeWidth="3.5" strokeLinecap="round"
    />

    {/* Body */}
    <ellipse cx="26" cy="58" rx="13" ry="13" fill="url(#mk-body)" />

    {/* Left ear */}
    <circle cx="8"  cy="26" r="9"   fill="url(#mk-ear)" />
    <circle cx="8"  cy="26" r="5.5" fill="url(#mk-face)" />

    {/* Right ear */}
    <circle cx="44" cy="26" r="9"   fill="url(#mk-ear)" />
    <circle cx="44" cy="26" r="5.5" fill="url(#mk-face)" />

    {/* Head */}
    <circle cx="26" cy="26" r="20" fill="url(#mk-head)" />

    {/* Face patch */}
    <ellipse cx="26" cy="30" rx="12.5" ry="11" fill="url(#mk-face)" />

    {/* Eyes — sclera, iris, pupil, highlight */}
    <circle cx="19.5" cy="22" r="5"   fill="#28180a" />
    <circle cx="19.5" cy="22" r="3.5" fill="#5c2a10" />
    <circle cx="19.5" cy="22" r="2"   fill="#0a0502" />
    <circle cx="21"   cy="20.5" r="1.3" fill="rgba(255,255,255,0.92)" />

    <circle cx="32.5" cy="22" r="5"   fill="#28180a" />
    <circle cx="32.5" cy="22" r="3.5" fill="#5c2a10" />
    <circle cx="32.5" cy="22" r="2"   fill="#0a0502" />
    <circle cx="34"   cy="20.5" r="1.3" fill="rgba(255,255,255,0.92)" />

    {/* Nose */}
    <ellipse cx="26" cy="29.5" rx="4.5" ry="3.5" fill="#7a3818" />
    <circle cx="24.5" cy="29.5" r="1.2" fill="#280800" />
    <circle cx="27.5" cy="29.5" r="1.2" fill="#280800" />

    {/* Mouth */}
    <path
      d="M 21 35 Q 26 40 31 35"
      stroke="#7a3818" fill="none" strokeWidth="1.8" strokeLinecap="round"
    />

    {/* Left arm + hand — reaches UP to grip the line */}
    <path
      d="M 14 52 Q 5 40 9 26"
      stroke="#7a3e18" fill="none" strokeWidth="5" strokeLinecap="round"
    />
    <circle cx="9"  cy="24" r="4.5" fill="url(#mk-head)" />

    {/* Right arm + hand */}
    <path
      d="M 38 52 Q 47 40 43 26"
      stroke="#7a3e18" fill="none" strokeWidth="5" strokeLinecap="round"
    />
    <circle cx="43" cy="24" r="4.5" fill="url(#mk-head)" />
  </svg>
);

// ── ScrollTrace ───────────────────────────────────────────────────────────────
const ScrollTrace: React.FC = () => {
  const [paths, setPaths]         = useState<string[]>([]);
  const [docHeight, setDocHeight] = useState(0);
  const containerRef              = useRef<HTMLDivElement>(null);
  const glowPathRefs              = useRef<(SVGPathElement | null)[]>([]);

  // Monkey: outer div = translate to path point, inner div = 3-D physics
  const monkeyOuterRef = useRef<HTMLDivElement>(null);
  const monkeyInnerRef = useRef<HTMLDivElement>(null);

  // Scroll velocity
  const lastScrollYRef    = useRef(0);
  const scrollVelocityRef = useRef(0);

  const startX_Desktop = 120;
  const endX_Desktop   = 48;
  const startX_Mobile  = 60;
  const endX_Mobile    = 24;

  // ── Build SVG paths ─────────────────────────────────────────────────────────
  useEffect(() => {
    const updatePath = () => {
      const isMobile    = window.innerWidth < 768;
      const baseStartX  = isMobile ? startX_Mobile : startX_Desktop;
      const baseEndX    = isMobile ? endX_Mobile   : endX_Desktop;
      const heroSection = document.getElementById('home');
      const baseTurnY   = heroSection ? heroSection.offsetHeight - 100 : window.innerHeight - 100;
      const currentDocHeight = document.documentElement.scrollHeight;

      setDocHeight(currentDocHeight);

      const numberOfLines = 4;
      const spacing = 12;
      const radius  = 20;
      const safeBaseTurnY = Math.max(baseTurnY, 100);
      const newPaths: string[] = [];

      for (let i = 0; i < numberOfLines; i++) {
        const sx = baseStartX + i * spacing;
        const ex = baseEndX   + i * spacing;
        const ty = safeBaseTurnY + i * spacing;

        newPaths.push(`
          M ${sx} 0
          L ${sx} ${ty - radius}
          Q ${sx} ${ty} ${sx - radius} ${ty}
          L ${ex + radius} ${ty}
          Q ${ex} ${ty} ${ex} ${ty + radius}
          L ${ex} ${currentDocHeight}
        `);
      }

      setPaths(newPaths);
    };

    updatePath();
    const ro = new ResizeObserver(updatePath);
    ro.observe(document.body);
    window.addEventListener('resize', updatePath);
    return () => { ro.disconnect(); window.removeEventListener('resize', updatePath); };
  }, []);

  // ── Animation loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      const scrollY      = window.scrollY;
      const windowHeight = window.innerHeight;

      // Scroll velocity (px/frame)
      scrollVelocityRef.current = scrollY - lastScrollYRef.current;
      lastScrollYRef.current    = scrollY;

      const baseBeamPosition = scrollY + windowHeight * 0.3;
      const beamLength = 200;
      const totalLen   = 100_000;

      // ── Animate orange beams ────────────────────────────────────────────────
      glowPathRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const currentPos = baseBeamPosition - i * 60;
        ref.style.strokeDasharray  = `${beamLength} ${totalLen}`;
        ref.style.strokeDashoffset = `${-currentPos}`;
      });

      // ── 3-D Monkey ─────────────────────────────────────────────────────────
      const leadPath = glowPathRefs.current[0];
      if (leadPath && monkeyOuterRef.current && monkeyInnerRef.current) {
        try {
          const totalPathLen = leadPath.getTotalLength();
          const clampedPos   = Math.max(0, Math.min(totalPathLen, baseBeamPosition));

          // Exact XY where the hands grip the ray
          const pt = leadPath.getPointAtLength(clampedPos);

          // OUTER: pure positional translate so that hands (26, 24 in SVG) sit on pt
          // No direction rotation — the monkey always hangs DOWN (gravity)
          monkeyOuterRef.current.style.transform =
            `translate(${pt.x - 26}px, ${pt.y - 24}px)`;

          // INNER: 3-D physics layer
          const vel        = scrollVelocityRef.current;
          const clampedVel = Math.max(-20, Math.min(20, vel));
          const t          = performance.now();

          // Pendulum swing left-right (simulates inertia)
          const swingZ = Math.sin(t / 480) * 9;

          // Lean forward/back as you scroll fast
          const leanX  = clampedVel * 2.2;

          // Gentle depth wobble (looks 3-D)
          const wobbleY = Math.sin(t / 650) * 7;

          // Squash-stretch: stretch tall when scrolling fast
          const speed    = Math.abs(vel);
          const stretchY = 1 + Math.min(0.22, speed * 0.013);
          const squashX  = 1 - Math.min(0.10, speed * 0.006);

          monkeyInnerRef.current.style.transform =
            `perspective(180px) rotateZ(${swingZ}deg) rotateX(${-leanX}deg) rotateY(${wobbleY}deg) scaleX(${squashX}) scaleY(${stretchY})`;
        } catch (_) { /* path not yet measured */ }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [paths]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden"
      style={{ height: docHeight || '100%' }}
    >
      <svg className="w-full h-full" preserveAspectRatio="xMinYMin meet">
        <defs>
          <filter id="glow-blur">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((d, i) => (
          <React.Fragment key={i}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
            <path
              ref={(el) => { glowPathRefs.current[i] = el; }}
              d={d}
              fill="none"
              stroke="#f97316"
              strokeOpacity={1 - i * 0.2}
              strokeWidth={i === 0 ? 2 : 1.5}
              strokeLinecap="round"
              filter={i === 0 ? 'url(#glow-blur)' : undefined}
              className="will-change-[stroke-dashoffset]"
            />
          </React.Fragment>
        ))}
      </svg>

      {/* ── 3-D monkey hanging on the leading orange ray ── */}
      {/* Outer: positional translate only — hands lock onto path point */}
      <div
        ref={monkeyOuterRef}
        className="absolute top-0 left-0 pointer-events-none select-none"
        style={{ willChange: 'transform', zIndex: 2 }}
      >
        {/* Inner: 3-D physics (swing, lean, wobble, squash-stretch) */}
        <div
          ref={monkeyInnerRef}
          style={{
            transformOrigin: '26px 24px',   // pivot at the grip hands
            willChange: 'transform',
            filter:
              'drop-shadow(0 0 8px rgba(249,115,22,0.85))' +
              ' drop-shadow(0 4px 8px rgba(0,0,0,0.65))',
          }}
        >
          <MonkeySVG />
        </div>
      </div>
    </div>
  );
};

export default ScrollTrace;
