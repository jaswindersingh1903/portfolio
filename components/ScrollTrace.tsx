import React, { useEffect, useRef, useState } from 'react';

// ── Moon SVG (dark mode) ──────────────────────────────────────────────────────
const MoonSVG: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
    <defs>
      <radialGradient id="mn-body" cx="35%" cy="28%" r="68%">
        <stop offset="0%"   stopColor="#ffffff" />
        <stop offset="55%"  stopColor="#c8c8c8" />
        <stop offset="100%" stopColor="#404040" />
      </radialGradient>
      <radialGradient id="mn-crater1" cx="40%" cy="35%" r="60%">
        <stop offset="0%"   stopColor="#b0b0b0" />
        <stop offset="100%" stopColor="#202020" />
      </radialGradient>
      <radialGradient id="mn-crater2" cx="38%" cy="32%" r="60%">
        <stop offset="0%"   stopColor="#a8a8a8" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </radialGradient>
      <radialGradient id="mn-crater3" cx="38%" cy="32%" r="60%">
        <stop offset="0%"   stopColor="#b8b8b8" />
        <stop offset="100%" stopColor="#222222" />
      </radialGradient>
      <radialGradient id="mn-shine" cx="30%" cy="22%" r="55%">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    <circle cx="26" cy="26" r="22" fill="url(#mn-body)" />
    <path d="M 26 4 A 22 22 0 0 1 26 48 A 14 14 0 0 0 26 4 Z" fill="rgba(0,0,0,0.35)" />
    <circle cx="18" cy="20" r="5.5" fill="url(#mn-crater1)" />
    <circle cx="18" cy="20" r="5.5" fill="rgba(0,0,0,0.10)" />
    <circle cx="19" cy="19" r="1.5" fill="rgba(255,255,255,0.30)" />
    <circle cx="31" cy="32" r="4"   fill="url(#mn-crater2)" />
    <circle cx="31" cy="32" r="4"   fill="rgba(0,0,0,0.12)" />
    <circle cx="31.8" cy="31.2" r="1" fill="rgba(255,255,255,0.28)" />
    <circle cx="22" cy="34" r="2.8" fill="url(#mn-crater3)" />
    <circle cx="22" cy="34" r="2.8" fill="rgba(0,0,0,0.10)" />
    <circle cx="34" cy="18" r="2"   fill="url(#mn-crater3)" />
    <circle cx="34" cy="18" r="2"   fill="rgba(0,0,0,0.10)" />
    <ellipse cx="17" cy="14" rx="7" ry="5" fill="url(#mn-shine)" />
  </svg>
);

// ── Sun SVG (light mode) ──────────────────────────────────────────────────────
const SunSVG: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
    <defs>
      <radialGradient id="sn-body" cx="35%" cy="28%" r="68%">
        <stop offset="0%"   stopColor="#fff7c0" />
        <stop offset="45%"  stopColor="#fdd835" />
        <stop offset="100%" stopColor="#e65100" />
      </radialGradient>
      <radialGradient id="sn-shine" cx="28%" cy="22%" r="52%">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.70)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>

    {/* Rays — 8 evenly spaced */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle  = (i * 45 * Math.PI) / 180;
      const inner  = 17;
      const outer  = 27;
      const x1 = 28 + Math.cos(angle) * inner;
      const y1 = 28 + Math.sin(angle) * inner;
      const x2 = 28 + Math.cos(angle) * outer;
      const y2 = 28 + Math.sin(angle) * outer;
      return (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#f9a825" strokeWidth="3.5" strokeLinecap="round" />
      );
    })}

    {/* Main disc */}
    <circle cx="28" cy="28" r="15" fill="url(#sn-body)" />

    {/* Specular highlight */}
    <ellipse cx="21" cy="21" rx="6" ry="4.5" fill="url(#sn-shine)" />
  </svg>
);

// ── ScrollTrace ───────────────────────────────────────────────────────────────
const ScrollTrace: React.FC = () => {
  const [paths, setPaths]         = useState<string[]>([]);
  const [docHeight, setDocHeight] = useState(0);
  const [isLight, setIsLight]     = useState(
    () => document.documentElement.getAttribute('data-theme') === 'light'
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const glowPathRefs = useRef<(SVGPathElement | null)[]>([]);

  const bodyOuterRef = useRef<HTMLDivElement>(null);
  const bodyInnerRef = useRef<HTMLDivElement>(null);

  const startX_Desktop = 120;
  const endX_Desktop   = 48;
  const startX_Mobile  = 60;
  const endX_Mobile    = 24;

  // ── Watch data-theme attribute ───────────────────────────────────────────────
  useEffect(() => {
    const mo = new MutationObserver(() => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  // ── Build SVG paths ──────────────────────────────────────────────────────────
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

  // ── Animation loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      const scrollY      = window.scrollY;
      const windowHeight = window.innerHeight;

      const baseBeamPosition = scrollY + windowHeight * 0.3;
      const beamLength = 200;
      const totalLen   = 100_000;

      glowPathRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const currentPos = baseBeamPosition - i * 60;
        ref.style.strokeDasharray  = `${beamLength} ${totalLen}`;
        ref.style.strokeDashoffset = `${-currentPos}`;
      });

      const leadPath = glowPathRefs.current[0];
      if (leadPath && bodyOuterRef.current && bodyInnerRef.current) {
        try {
          const totalPathLen = leadPath.getTotalLength();
          const clampedPos   = Math.max(0, Math.min(totalPathLen, baseBeamPosition));
          const pt           = leadPath.getPointAtLength(clampedPos);

          // Centre the 52×52 (moon) or 56×56 (sun) icon on the path point
          const half = isLight ? 28 : 26;

          // Slow orbit: small elliptical revolution around the path point
          const t        = performance.now();
          const orbitR   = 6;                            // orbit radius px
          const orbitSpd = t / 7000;                    // one revolution ~44 s
          const ox = Math.cos(orbitSpd * Math.PI * 2) * orbitR;
          const oy = Math.sin(orbitSpd * Math.PI * 2) * orbitR * 0.5;

          bodyOuterRef.current.style.transform =
            `translate(${pt.x - half + ox}px, ${pt.y - half + oy}px)`;

          // Slow self-spin: scroll-driven (1 spin / 2400 px) + continuous (~80 s/rev)
          const scrollSpin = (scrollY / 2400) * 360;
          const timeSpin   = (t / 80000) * 360;
          bodyInnerRef.current.style.transform = `rotate(${scrollSpin + timeSpin}deg)`;
        } catch (_) { /* path not yet measured */ }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [paths, isLight]);

  // Glow colour per theme
  const glowFilter = isLight
    ? 'blur(1.2px) drop-shadow(0 0 10px rgba(253,216,53,0.95)) drop-shadow(0 0 24px rgba(249,168,37,0.60)) drop-shadow(0 4px 8px rgba(0,0,0,0.35))'
    : 'blur(1.2px) drop-shadow(0 0 10px rgba(255,255,255,0.80)) drop-shadow(0 0 22px rgba(200,200,200,0.40)) drop-shadow(0 4px 8px rgba(0,0,0,0.65))';

  const pivotPx = isLight ? '28px' : '26px';

  // ── Render ───────────────────────────────────────────────────────────────────
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

      {/* ── Moon (dark) / Sun (light) rolling on the leading ray ── */}
      <div
        ref={bodyOuterRef}
        className="absolute top-0 left-0 pointer-events-none select-none"
        style={{ willChange: 'transform', zIndex: 2 }}
      >
        <div
          ref={bodyInnerRef}
          style={{
            transformOrigin: `${pivotPx} ${pivotPx}`,
            willChange: 'transform',
            filter: glowFilter,
          }}
        >
          {isLight ? <SunSVG /> : <MoonSVG />}
        </div>
      </div>
    </div>
  );
};

export default ScrollTrace;
