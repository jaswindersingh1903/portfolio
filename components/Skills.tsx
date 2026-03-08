import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-12">Proficiency</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                <span className="text-sm text-gray-500 font-mono">{skill.level}%</span>
              </div>
              <div className="w-full bg-zinc-900/50 rounded-full h-1.5 overflow-hidden border border-white/5">
                <div
                  className="bg-white h-full rounded-full transition-all duration-1000 ease-out opacity-70 group-hover:opacity-100"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
