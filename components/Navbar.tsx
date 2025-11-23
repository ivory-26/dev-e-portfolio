import React, { useState, useEffect, useRef } from 'react';
import { PageView } from '../types';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Command, Sun, Moon } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';

interface NavbarProps {
  currentPage: PageView;
  setPage: (page: PageView) => void;
  currentTheme: 'light' | 'dark';
  toggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  setPage, 
  currentTheme, 
  toggleTheme,
  mobileNavOpen,
  setMobileNavOpen
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close the mobile menu whenever the viewport crosses into desktop layout
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileNavOpen(false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [setMobileNavOpen]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [currentPage, setMobileNavOpen]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
        isScrolled || mobileNavOpen
          ? 'bg-background/80 backdrop-blur-md border-border'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setPage(PageView.HOME)}
          className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Command className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-background" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-primary whitespace-nowrap">Port-<span className="text-secondary">e</span>-folio</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
          <div className="flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  currentPage === link.id || (link.id === PageView.BLOG && currentPage === PageView.BLOG_POST)
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-secondary hover:text-primary transition-colors hover:bg-surface flex-shrink-0"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <AnimatedButton 
            onClick={() => setPage(PageView.CONTACT)}
            className="px-4 py-2 text-sm rounded flex-shrink-0"
            variant="primary"
          >
            Hire Me
          </AnimatedButton>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={toggleTheme}
            className="text-primary p-2 rounded-full hover:bg-surface/80 transition-colors active:scale-95"
            aria-label="Toggle Theme"
          >
             {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="text-primary p-2 rounded-full hover:bg-surface/80 transition-colors active:scale-95"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
          >
            {mobileNavOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Nav */}
      <div 
        className={`md:hidden relative border-t border-border bg-background/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
          mobileNavOpen ? 'max-h-[60px] opacity-100' : 'max-h-0 opacity-0 border-t-transparent'
        }`}
      >
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-background via-background to-transparent px-2 flex items-center text-secondary hover:text-primary"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-4 py-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors flex-shrink-0 ${
                currentPage === link.id || (link.id === PageView.BLOG && currentPage === PageView.BLOG_POST)
                  ? 'text-primary bg-surface border border-border'
                  : 'text-secondary hover:text-primary hover:bg-surface/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-background via-background to-transparent px-2 flex items-center text-secondary hover:text-primary"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </nav>

  );
};