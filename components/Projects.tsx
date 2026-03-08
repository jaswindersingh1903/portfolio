import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ProjectCardProps {
  project: Project;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, hoveredIndex, setHoveredIndex, featured }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ delay: index * 80 });
  const isHovered    = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      data-hovered={isHovered ? 'true' : undefined}
      className={`group relative rounded-xl border bg-zinc-900/40 overflow-hidden flex flex-col transition-all duration-500 ease-out backdrop-blur-sm ${
        featured ? 'md:flex-row' : ''
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${
        isHovered
          ? 'scale-[1.02] z-20 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10'
          : 'border-white/10'
      } ${
        isAnyHovered && !isHovered ? 'opacity-40 blur-[1px] brightness-75' : ''
      }`}
    >
      {/* Image */}
      <div className={`overflow-hidden bg-zinc-800 relative ${featured ? 'md:w-2/5 aspect-video md:aspect-auto' : 'aspect-video w-full'}`}>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-75'}`}
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-60'}`} />
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold rounded bg-white/10 border border-white/20 text-white backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 flex flex-col flex-1 relative z-10 ${featured ? 'md:p-8 justify-center' : ''}`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className={`font-semibold leading-snug transition-colors duration-300 ${featured ? 'text-xl' : 'text-lg'} ${isHovered ? 'text-white' : 'text-gray-200'}`}>
            {project.title}
          </h3>
          <div className={`flex gap-1.5 shrink-0 ml-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
            {project.liveLink && project.liveLink !== '#' && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition-all" title="Live Demo">
                <ArrowUpRight size={14} />
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition-all" title="View Code">
                <Github size={14} />
              </a>
            )}
          </div>
        </div>

        <p className={`text-sm mb-5 leading-relaxed transition-colors duration-300 ${featured ? 'line-clamp-4' : 'line-clamp-3'} ${isHovered ? 'text-gray-300' : 'text-gray-500'}`}>
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.technologies.map(tech => (
            <span key={tech}
              className={`px-2 py-1 text-[10px] uppercase tracking-wider font-medium rounded border transition-colors duration-300 ${
                isHovered ? 'bg-white/10 text-gray-200 border-white/20' : 'bg-white/5 text-gray-500 border-white/5'
              }`}>
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
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const featured  = PROJECTS[0];
  const remaining = PROJECTS.slice(1);

  return (
    <section id="projects" className="py-24 border-t border-white/5 relative z-10">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] -z-10" />
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className={`mb-12 flex items-end justify-between transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4">Selected Work</h2>
            <p className="text-gray-400">A showcase of projects pushing boundaries.</p>
          </div>
          <a href="https://github.com/jaswindersingh1903" target="_blank"
            className="hidden md:flex items-center text-sm text-gray-400 hover:text-white transition-colors gap-1.5">
            View GitHub <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Featured card */}
        <div className="mb-6" onMouseLeave={() => setHoveredIndex(null)}>
          <ProjectCard
            project={featured}
            index={0}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            featured
          />
        </div>

        {/* Remaining — always 3 cols so the row is complete */}
        <div className="grid md:grid-cols-3 gap-6" onMouseLeave={() => setHoveredIndex(null)}>
          {remaining.map((project, i) => (
            <ProjectCard
              key={i + 1}
              project={project}
              index={i + 1}
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
