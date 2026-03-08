import React from 'react';
import { GraduationCap, MapPin, Calendar, Users } from 'lucide-react';
import { EDUCATION } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface EduCardProps {
  edu: (typeof EDUCATION)[number];
  index: number;
}

const EduCard: React.FC<EduCardProps> = ({ edu, index }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ delay: index * 180 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="group relative p-6 lg:p-8 rounded-2xl border border-white/[0.08] bg-zinc-900/50 hover:bg-zinc-900/70 hover:border-white/[0.14] transition-all duration-300 backdrop-blur-sm overflow-hidden h-full">
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-purple-500/[0.05]" />

        {/* Institution badge + meta */}
        <div className="flex items-start gap-4 mb-5">
          {/* Logo placeholder */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base lg:text-lg font-semibold text-white leading-snug mb-1">
              {edu.institution}
            </h3>
            <p className="text-sm text-indigo-400 font-medium leading-snug">{edu.degree}</p>
          </div>
        </div>

        {/* Period + location */}
        <div className="flex flex-wrap gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
            <Calendar className="w-3 h-3" />
            {edu.year}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
            <MapPin className="w-3 h-3" />
            {edu.location}
          </span>
          {edu.activities.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
              <Users className="w-3 h-3" />
              {edu.activities.join(', ')}
            </span>
          )}
        </div>

        {/* Highlights */}
        <ul className="space-y-2.5 mb-5">
          {edu.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs lg:text-sm text-gray-400 leading-relaxed">
              <span className="mt-[7px] w-1 h-1 rounded-full bg-indigo-500/60 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
          {edu.skills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium text-gray-400 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Education: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  return (
    <section id="education" className="py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black/20 -z-10" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/[0.04] rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-14 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-block text-xs font-mono text-indigo-400 tracking-[0.2em] uppercase mb-3">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">
            Education
          </h2>
          <p className="text-gray-500 text-sm">
            Formal training in computer science & software engineering
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, i) => (
            <EduCard key={edu.institution} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
