import React from 'react';
import { EXPERIENCE } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\d+%|\d+x|\d+\+?(?:\s(?:years?|months?|clients?|features?|APIs?))?)/g);
  return (
    <>
      {parts.map((part, i) =>
        /\d/.test(part) ? (
          <span key={i} className="text-white font-semibold">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

interface CardProps {
  exp: (typeof EXPERIENCE)[number];
  isCurrent: boolean;
  align: 'left' | 'right';
}

const ExperienceCard: React.FC<CardProps> = ({ exp, isCurrent, align }) => (
  <div className="group relative p-5 lg:p-6 rounded-2xl border border-white/[0.08] bg-zinc-900/50 hover:bg-zinc-900/70 hover:border-white/[0.14] transition-all duration-300 backdrop-blur-sm overflow-hidden w-full">
    {/* Hover glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-500/[0.06] via-transparent to-purple-500/[0.06]" />

    {/* Period + badge */}
    <div className={`flex items-center gap-2 mb-3 flex-wrap ${align === 'right' ? 'justify-end' : ''}`}>
      <span className="text-xs font-mono text-gray-500 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
        {exp.period}
      </span>
      {isCurrent && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-green-500/10 border border-green-500/30 text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Now
        </span>
      )}
    </div>

    <h3 className={`text-base lg:text-lg font-semibold text-white mb-0.5 ${align === 'right' ? 'text-right' : ''}`}>
      {exp.role}
    </h3>
    <p className={`text-sm font-medium text-blue-400 mb-4 ${align === 'right' ? 'text-right' : ''}`}>
      {exp.company}
    </p>

    <ul className="space-y-2">
      {exp.description.slice(0, 3).map((item, i) => (
        <li
          key={i}
          className={`flex items-start gap-2 text-xs lg:text-sm text-gray-400 leading-relaxed ${align === 'right' ? 'flex-row-reverse' : ''}`}
        >
          <span className="mt-[7px] w-1 h-1 rounded-full bg-blue-500/50 shrink-0" />
          <span className={align === 'right' ? 'text-right' : ''}>
            <HighlightedText text={item} />
          </span>
        </li>
      ))}
    </ul>
  </div>
);

interface TimelineItemProps {
  exp: (typeof EXPERIENCE)[number];
  index: number;
  isCurrent: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ exp, index, isCurrent }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ delay: index * 160 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_2.5rem_1fr] items-start mb-10 md:mb-14 transition-opacity duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Left card area — desktop only, even index */}
      <div
        className={`hidden md:flex items-start justify-end pr-8 transition-all duration-700 ease-out ${
          isVisible ? 'translate-x-0' : '-translate-x-8'
        }`}
      >
        {isLeft && <ExperienceCard exp={exp} isCurrent={isCurrent} align="right" />}
      </div>

      {/* Center: node */}
      <div className="flex flex-col items-center pt-1">
        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
            isCurrent
              ? 'bg-green-500/10 border border-green-500/40 shadow-[0_0_20px_rgba(74,222,128,0.28)]'
              : 'bg-blue-500/10 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
          }`}
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isCurrent
                ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]'
                : 'bg-blue-500'
            }`}
          />
          {isCurrent && (
            <div className="absolute inset-0 rounded-full border border-green-400/20 animate-ping" />
          )}
        </div>
      </div>

      {/* Right card area */}
      <div
        className={`pl-6 md:pl-8 transition-all duration-700 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-8'
        }`}
      >
        {/* Mobile: always visible */}
        <div className="md:hidden">
          <ExperienceCard exp={exp} isCurrent={isCurrent} align="left" />
        </div>
        {/* Desktop: odd index only */}
        {!isLeft && (
          <div className="hidden md:block">
            <ExperienceCard exp={exp} isCurrent={isCurrent} align="left" />
          </div>
        )}
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black/20 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Career Path
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">
            The Journey
          </h2>
          <p className="text-gray-500 text-sm">
            7 years shipping production software across healthcare, analytics &amp; SaaS
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — mobile */}
          <div className="absolute left-5 top-5 bottom-8 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent pointer-events-none md:hidden" />
          {/* Vertical line — desktop */}
          <div className="absolute left-1/2 -translate-x-px top-5 bottom-8 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent pointer-events-none hidden md:block" />

          {EXPERIENCE.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} isCurrent={i === 0} />
          ))}

          {/* End cap */}
          <div className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_2.5rem_1fr]">
            <div className="hidden md:block" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border border-gray-700 bg-zinc-900 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-gray-600" />
              </div>
              <span className="text-[10px] font-mono text-gray-600">2018</span>
            </div>
            <div className="hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
