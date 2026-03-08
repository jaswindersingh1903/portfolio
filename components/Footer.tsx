import React from 'react';
import { PROFILE } from '../constants';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>

        <div className="flex items-center text-sm text-gray-500">
          <span>Built with React & Tailwind</span>
          <Heart className="w-4 h-4 text-red-500 mx-1 fill-current" />
          <span>by Jaswinder</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
