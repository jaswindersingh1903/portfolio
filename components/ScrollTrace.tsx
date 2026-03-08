import React, { useEffect, useRef, useState } from 'react';

const ScrollTrace: React.FC = () => {
  const [paths, setPaths] = useState<string[]>([]);
  const [docHeight, setDocHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowPathRefs = useRef<(SVGPathElement | null)[]>([]);

  // Configuration for the trace lines
  const startX_Desktop = 120; // Start further in (Hero section)
  const endX_Desktop = 48;    // Align with other section borders (left-12 is 3rem = 48px)
  const startX_Mobile = 60;
  const endX_Mobile = 24;     // (left-6 is 1.5rem = 24px)

  useEffect(() => {
    const updatePath = () => {
      const isMobile = window.innerWidth < 768;
      const baseStartX = isMobile ? startX_Mobile : startX_Desktop;
      const baseEndX = isMobile ? endX_Mobile : endX_Desktop;
      
      const heroSection = document.getElementById('home');
      // Calculate where the turn should happen (bottom of Hero)
      const baseTurnY = heroSection ? heroSection.offsetHeight - 100 : window.innerHeight - 100;
      const currentDocHeight = document.documentElement.scrollHeight;
      
      setDocHeight(currentDocHeight);

      // SVG Path Logic:
      // Generate 4 parallel lines
      const numberOfLines = 4;
      const spacing = 12; // px spacing between lines
      const radius = 20; // Rounded corners
      const safeBaseTurnY = Math.max(baseTurnY, 100);

      const newPaths: string[] = [];

      for (let i = 0; i < numberOfLines; i++) {
        // Shift each line outward (Right) and downward to create a nested corner effect
        const currentStartX = baseStartX + (i * spacing);
        const currentEndX = baseEndX + (i * spacing);
        const currentTurnY = safeBaseTurnY + (i * spacing);

        const d = `
          M ${currentStartX} 0 
          L ${currentStartX} ${currentTurnY - radius}
          Q ${currentStartX} ${currentTurnY} ${currentStartX - radius} ${currentTurnY}
          L ${currentEndX + radius} ${currentTurnY}
          Q ${currentEndX} ${currentTurnY} ${currentEndX} ${currentTurnY + radius}
          L ${currentEndX} ${currentDocHeight}
        `;
        newPaths.push(d);
      }
      
      setPaths(newPaths);
    };

    // Initial update
    updatePath();
    
    // Observers to handle dynamic content resizing
    const resizeObserver = new ResizeObserver(updatePath);
    resizeObserver.observe(document.body);
    window.addEventListener('resize', updatePath);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePath);
    };
  }, []);

  // Animation Loop for the "Glow Beam"
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // We want the beam to travel visually with the user's viewport.
      // Position the beam center at roughly 30% down the viewport.
      const baseBeamPosition = scrollY + (windowHeight * 0.3);
      const beamLength = 200; // Length of the glowing trail
      const totalLen = 100000; // Arbitrary large number
      
      glowPathRefs.current.forEach((ref, i) => {
        if (!ref) return;

        // Stagger the beams slightly for a flowing data effect
        // Line 0 is the leader, others follow slightly behind or ahead
        const stagger = i * 60; // Distance stagger
        const currentPos = baseBeamPosition - stagger;

        ref.style.strokeDasharray = `${beamLength} ${totalLen}`;
        ref.style.strokeDashoffset = `${-currentPos}`;
      });
      
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [paths]);

  return (
    <div 
      ref={containerRef}
      className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden"
      style={{ height: docHeight || '100%' }}
    >
       <svg 
         className="w-full h-full" 
         preserveAspectRatio="xMinYMin meet"
       >
          <defs>
            <filter id="glow-blur">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {paths.map((d, i) => (
            <React.Fragment key={i}>
              {/* Background Track (Faint Line) */}
              <path 
                d={d} 
                fill="none" 
                stroke="rgba(255,255,255,0.02)" 
                strokeWidth="1" 
              />

              {/* The Traveling Beam */}
              <path 
                ref={(el) => { glowPathRefs.current[i] = el; }}
                d={d} 
                fill="none" 
                stroke="#f97316"
                strokeOpacity={1 - (i * 0.2)} // Fade out outer lines: 1.0, 0.8, 0.6, 0.4
                strokeWidth={i === 0 ? 2 : 1.5}
                strokeLinecap="round"
                filter={i === 0 ? "url(#glow-blur)" : undefined} // Only blur the main line for performance and emphasis
                className="will-change-[stroke-dashoffset]"
              />
            </React.Fragment>
          ))}
       </svg>
    </div>
  );
};

export default ScrollTrace;