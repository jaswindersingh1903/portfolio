import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, hoveredIndex, setHoveredIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`group relative rounded-xl border bg-zinc-900/40 overflow-hidden flex flex-col transition-all duration-500 ease-out backdrop-blur-sm
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}

        /* Interaction States */
        ${isHovered
          ? 'scale-105 z-20 border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/10'
          : 'border-white/10 shadow-none'
        }
        ${isAnyHovered && !isHovered
          ? 'scale-95 blur-[2px] opacity-40 grayscale-[0.8] brightness-75'
          : 'scale-100 opacity-100'
        }
      `}
      style={{ transitionDelay: isAnyHovered ? '0ms' : `${index * 100}ms` }}
    >
      <div className="aspect-video w-full overflow-hidden bg-zinc-800 relative">
         {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700
                ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-80'}
              `}
            />
         )}
         <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-40' : 'opacity-60'}`}></div>
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-lg font-semibold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-200'}`}>
            {project.title}
          </h3>
          <div className={`flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
            {project.liveLink && (
               <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition-all" title="Live Demo"><ArrowUpRight size={16} /></a>
            )}
             {project.githubLink && (
               <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition-all" title="View Code"><Github size={16} /></a>
            )}
          </div>
        </div>

        <p className={`text-sm mb-6 line-clamp-3 transition-colors duration-300 ${isHovered ? 'text-gray-300' : 'text-gray-500'}`}>
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded border transition-colors duration-300
                ${isHovered
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-white/5 text-gray-500 border-white/5'
                }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 border-t border-white/5 relative z-10">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10"></div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 flex items-end justify-between">
           <div>
             <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4">Selected Work</h2>
             <p className="text-gray-400">A showcase of projects pushing boundaries.</p>
           </div>
           <a href="https://github.com" target="_blank" className="hidden md:flex items-center text-sm text-gray-400 hover:text-white transition-colors">
             View GitHub <Github className="ml-2 w-4 h-4" />
           </a>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          onMouseLeave={() => setHoveredIndex(null)} // Safety clear
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
