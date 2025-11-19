import React from 'react';
import { Github, Twitter, Instagram, Gamepad2, BarChart3 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border py-12 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-secondary text-sm">
          © 2025 Sahil Karpe. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/ivory-26" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
            <Github size={20} />
          </a>
          <a href="https://twitter.com/sahil_karpe07" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
            <Twitter size={20} />
          </a>
          <a href="https://instagram.com/sahil_26.01" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://www.kaggle.com/sahilkarpe" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
            <BarChart3 size={20} />
          </a>
           <a href="https://discord.gg/Q7Sem7St" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
            <Gamepad2 size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};