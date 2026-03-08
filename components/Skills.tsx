import React from 'react';
import { SKILLS } from '../constants';

const CATEGORY_ORDER = ['Frontend', 'Backend', 'AI', 'DevOps', 'Tools'];

const Skills: React.FC = () => {
  const grouped = CATEGORY_ORDER.map(cat => ({
    category: cat,
    skills: SKILLS.filter(s => s.category === cat),
  }));

  return (
    <section id="skills" className="py-24 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-12">Tech Stack</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {grouped.map(({ category, skills }) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">{category}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-md bg-zinc-900/70 border border-white/10 text-sm text-gray-300 hover:border-white/30 hover:text-white transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
