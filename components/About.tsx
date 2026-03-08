import React from 'react';
import { PROFILE } from '../constants';
import { Code, Server, Database, Globe, Zap, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4">About Me</h2>
          <p className="text-gray-400 max-w-2xl text-lg">{PROFILE.about}</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Main Card */}
          <div className="md:col-span-2 row-span-2 p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors group backdrop-blur-md">
            <div className="h-full flex flex-col justify-between">
              <div>
                <Globe className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Global Perspective</h3>
                <p className="text-gray-400 leading-relaxed">
                  Based in {PROFILE.location}, I build software that scales globally. My approach combines technical excellence with user-centric design principles to deliver products that perform under pressure.
                </p>
              </div>
              <div className="mt-8 relative h-32 w-full overflow-hidden rounded-lg border border-white/5 bg-black/50">
                {/* Abstract visualization */}
                <div className="absolute inset-0 bg-grid opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>

          {/* Stat Card 1 */}
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-md">
            <Zap className="w-6 h-6 text-yellow-500 mb-3" />
            <h3 className="text-lg font-medium text-white">Performance First</h3>
            <p className="text-sm text-gray-500 mt-2">Optimizing specific metrics like Core Web Vitals to ensure lightning fast load times.</p>
          </div>

          {/* Stat Card 2 */}
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-md">
            <Cpu className="w-6 h-6 text-purple-500 mb-3" />
            <h3 className="text-lg font-medium text-white">Modern Stack</h3>
            <p className="text-sm text-gray-500 mt-2">Leveraging the latest in React Server Components and Edge Computing.</p>
          </div>

          {/* Tech Stack Strip */}
          <div className="md:col-span-3 p-8 rounded-2xl bg-zinc-900/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
            <span className="text-gray-400 font-medium">Core Technologies:</span>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
               <div className="flex items-center gap-2 text-gray-300"><Code size={18} /> React</div>
               <div className="flex items-center gap-2 text-gray-300"><Server size={18} /> Node.js</div>
               <div className="flex items-center gap-2 text-gray-300"><Database size={18} /> PostgreSQL</div>
               <div className="flex items-center gap-2 text-gray-300"><Globe size={18} /> Next.js</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
