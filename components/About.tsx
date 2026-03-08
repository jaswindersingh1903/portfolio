import React from 'react';
import { PROFILE } from '../constants';
import { Code, Server, GitBranch, Globe, Zap, Users, Brain } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading + text left, cards right */}
        <div className="flex flex-col md:flex-row gap-12 mb-8">

          {/* Left: heading + about text */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4">About Me</h2>
            <p className="text-gray-400 text-lg leading-relaxed">{PROFILE.about}</p>
          </div>

          {/* Right: three cards */}
          <div className="md:w-1/2 grid grid-cols-1 gap-4">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-md">
              <Brain className="w-6 h-6 text-blue-500 mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">Agentic AI development</h3>
              <p className="text-sm text-gray-500">3 years building autonomous AI workflows with Claude Code and MCP — cutting deployment time by 40%.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-md">
              <Zap className="w-6 h-6 text-yellow-500 mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">10x performance gains</h3>
              <p className="text-sm text-gray-500">Legacy migrations, Webpack optimization, and Redis caching — proven track record of measurable speed improvements.</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-md">
              <Globe className="w-6 h-6 text-purple-500 mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">Full vertical ownership</h3>
              <p className="text-sm text-gray-500">7 years across healthcare, analytics, and SaaS — API design, frontend, cloud deployment, and everything in between.</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Strip */}
        <div className="p-8 rounded-2xl bg-zinc-900/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <span className="text-gray-400 font-medium">Core Technologies:</span>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="flex items-center gap-2 text-gray-300"><Code size={18} /> React / TypeScript</div>
            <div className="flex items-center gap-2 text-gray-300"><Server size={18} /> Node.js / Python / PHP</div>
            <div className="flex items-center gap-2 text-gray-300"><Brain size={18} /> Claude Code / MCP</div>
            <div className="flex items-center gap-2 text-gray-300"><GitBranch size={18} /> Azure / Docker</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
