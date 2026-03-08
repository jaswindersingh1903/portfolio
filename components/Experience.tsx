import React from 'react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-12">Experience</h2>

        <div className="space-y-12">
          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="relative pl-8 border-l border-white/10 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/20 group-hover:bg-blue-500 group-hover:border-blue-400 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                <span className="text-sm font-mono text-gray-500">{exp.period}</span>
              </div>

              <div className="text-blue-400 text-sm font-medium mb-4">{exp.company}</div>

              <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-600 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
