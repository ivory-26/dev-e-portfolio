import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Menu, X, Command, Sun, Moon } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';

interface NavbarProps {
  currentPage: PageView;
  setPage: (page: PageView) => void;
  currentTheme: 'light' | 'dark';
  toggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, currentTheme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: PageView.HOME, label: 'Home' },
    { id: PageView.PROJECTS, label: 'Projects' },
    { id: PageView.SKILLS, label: 'Skills' },
    { id: PageView.EXPERIENCE, label: 'Work Experience' },
    { id: PageView.BLOG, label: 'Blog' },
    { id: PageView.CONTACT, label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled || mobileMenuOpen
          ? 'bg-background/80 backdrop-blur-md border-border'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setPage(PageView.HOME)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Command className="w-4 h-4 text-background" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">Port-<span className="text-secondary">e</span>-folio</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`text-sm font-medium transition-colors duration-200 ${
                currentPage === link.id
                  ? 'text-primary'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-secondary hover:text-primary transition-colors hover:bg-surface"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <AnimatedButton 
            onClick={() => setPage(PageView.CONTACT)}
            className="px-4 py-2 text-sm rounded"
            variant="primary"
          >
            Hire Me
          </AnimatedButton>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="text-primary p-2"
          >
             {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 flex flex-col gap-4">
           {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setPage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left text-base font-medium py-2 ${
                currentPage === link.id
                  ? 'text-primary'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};