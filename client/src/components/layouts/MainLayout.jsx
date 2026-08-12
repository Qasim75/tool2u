import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import { cn } from '@/utils/cn';

export default function MainLayout() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink dark:bg-surface-dark dark:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-mint-500 focus:px-4 focus:py-2 focus:text-teal-950"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />

      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full bg-teal-800 text-white shadow-lg transition-all hover:bg-teal-700 dark:bg-mint-500 dark:text-teal-950 dark:hover:bg-mint-400",
          showBackToTop ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="size-6" />
      </button>
    </div>
  );
}
