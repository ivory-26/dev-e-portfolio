import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { PageView } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<number | null>(null);

  // Initialize theme from localStorage or system preference could be added here
  // For now, default to dark as per request, but allow toggle.

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle URL query parameters for blog posts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const blogPostId = params.get('blogpost');
    if (blogPostId) {
      setSelectedBlogPostId(parseInt(blogPostId, 10));
      setCurrentPage(PageView.BLOG_POST);
    }
  }, []);

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // If the browser doesn't support View Transitions, just toggle state
    if (!(document as any).startViewTransition) {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    });

    await transition.ready;

    // Animate the new view expanding from the click position
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case PageView.HOME:
        return <Home setPage={setCurrentPage} setSelectedBlogPostId={setSelectedBlogPostId} />;
      case PageView.PROJECTS:
        return <Projects />;
      case PageView.SKILLS:
        return <Skills />;
      case PageView.EXPERIENCE:
        return <Experience />;
      case PageView.BLOG:
        return <Blog setSelectedBlogPostId={setSelectedBlogPostId} setPage={setCurrentPage} />;
      case PageView.BLOG_POST:
        return selectedBlogPostId ? (
          <BlogPost 
            postId={selectedBlogPostId} 
            toggleTheme={toggleTheme} 
            currentTheme={theme}
            onBackClick={() => setCurrentPage(PageView.BLOG)}
          />
        ) : (
          <Blog setSelectedBlogPostId={setSelectedBlogPostId} setPage={setCurrentPage} />
        );
      case PageView.CONTACT:
        return <Contact />;
      default:
        return <Home setPage={setCurrentPage} setSelectedBlogPostId={setSelectedBlogPostId} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary font-sans selection:bg-accent selection:text-black transition-colors duration-300">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none grid-bg opacity-30 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          currentPage={currentPage} 
          setPage={setCurrentPage} 
          currentTheme={theme}
          toggleTheme={toggleTheme}
          mobileNavOpen={mobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
        />
        
        <main className={`flex-grow transition-all duration-300 ${mobileNavOpen ? 'md:mt-0 mt-[60px]' : ''}`}>
          {renderPage()}
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default App;