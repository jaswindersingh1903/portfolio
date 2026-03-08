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
  exp: typeof EXPERIENCE[number];
  index: number;
  isCurrent: boolean;
}

const ExpItem: React.FC<ExpItemProps> = ({ exp, index, isCurrent }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ delay: index * 100 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="group relative p-6 rounded-xl border border-white/8 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-white/15 transition-all backdrop-blur-sm">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
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
        <p className="text-sm font-medium text-blue-400 mb-4">{exp.company}</p>

        {/* Bullets */}
        <ul className="space-y-2.5">
          {exp.description.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-gray-600 shrink-0" />
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

  return (
    <section id="experience" className="py-24 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10" />
      <div className="max-w-4xl mx-auto px-6">

        <div ref={headerRef} className={`mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">Experience</h2>
          <p className="text-gray-500 text-sm">7 years shipping production software</p>
        </div>

        <div className="space-y-4">
          {EXPERIENCE.map((exp, i) => (
            <ExpItem key={exp.id} exp={exp} index={i} isCurrent={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
