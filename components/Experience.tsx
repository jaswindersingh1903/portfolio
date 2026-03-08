import React from 'react';
import { EXPERIENCE } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Highlights numbers and % in bullet text
function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\d+%|\d+x|\d+\+?(?:\s(?:years?|months?|clients?|features?|APIs?))?)/g);
  return (
    <>
      {parts.map((part, i) =>
        /\d/.test(part) ? (
          <span key={i} className="text-white font-medium">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

interface ExpItemProps {
  exp: (typeof EXPERIENCE)[number];
  index: number;
  isCurrent: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const ExpItem: React.FC<ExpItemProps> = ({ exp, index, isCurrent, position }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ delay: index * 100 });

  const connectors = {
    'top-left': { right: true, bottom: true },
    'top-right': { left: true, bottom: true },
    'bottom-left': { right: true, top: true },
    'bottom-right': { left: true, top: true },
  };

  const conn = connectors[position];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="group relative p-5 lg:p-6 rounded-xl border border-white/8 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-white/15 transition-all backdrop-blur-sm h-full">
        {/* Connector lines for journey visualization */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Horizontal connector */}
          {conn.right && (
            <div className="absolute -right-3 top-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500/40 to-transparent" />
          )}
          {conn.left && (
            <div className="absolute -left-3 top-1/2 w-6 h-0.5 bg-gradient-to-l from-blue-500/40 to-transparent" />
          )}
          {/* Vertical connector */}
          {conn.bottom && (
            <div className="absolute left-1/2 -bottom-3 h-6 w-0.5 bg-gradient-to-b from-blue-500/40 to-transparent" />
          )}
          {conn.top && (
            <div className="absolute left-1/2 -top-3 h-6 w-0.5 bg-gradient-to-t from-blue-500/40 to-transparent" />
          )}
          {/* Center dot */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500/60 group-hover:bg-blue-400 transition-colors" />
        </div>

        {/* Timeline indicator */}
        <div className="absolute -left-3 top-6 w-2 h-2 rounded-full bg-blue-500/60 group-hover:bg-blue-400 transition-colors" />

        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base lg:text-lg font-semibold text-white">{exp.role}</h3>
            {isCurrent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-green-500/10 border border-green-500/30 text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Current
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-gray-500 shrink-0 mt-0.5">{exp.period}</span>
        </div>

        {/* Company */}
        <p className="text-sm font-medium text-blue-400 mb-3">{exp.company}</p>

        {/* Bullets */}
        <ul className="space-y-2">
          {exp.description.slice(0, 3).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs lg:text-sm text-gray-400 leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
              <HighlightedText text={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  // Split experience into 4 quadrants for 2x2 grid
  const gridPositions: ExpItemProps['position'][] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

  return (
    <section id="experience" className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10" />
      {/* Background journey line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent hidden md:block -translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-6">
        <div ref={headerRef} className={`mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">Experience</h2>
          <p className="text-gray-500 text-sm">7 years shipping production software</p>
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden space-y-4">
          {EXPERIENCE.map((exp, i) => (
            <ExpItem key={exp.id} exp={exp} index={i} isCurrent={i === 0} position="top-left" />
          ))}
        </div>

        {/* Desktop: 2x2 grid with journey connectors */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {EXPERIENCE.slice(0, 4).map((exp, i) => (
            <ExpItem
              key={exp.id}
              exp={exp}
              index={i}
              isCurrent={i === 0}
              position={gridPositions[i]}
            />
          ))}
        </div>

        {/* Additional experiences if more than 4 */}
        {EXPERIENCE.length > 4 && (
          <div className="mt-6 md:hidden space-y-4">
            {EXPERIENCE.slice(4).map((exp, i) => (
              <ExpItem key={exp.id} exp={exp} index={i + 4} isCurrent={false} position="top-left" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
