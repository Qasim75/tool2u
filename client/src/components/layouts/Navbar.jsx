import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import { NAV_LINKS, SITE } from '@/constants/site';
import { CATEGORIES } from '@/constants/tools';
import { cn } from '@/utils/cn';

function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
          'text-ink-soft hover:bg-ink/5 hover:text-ink hover:shadow-sm',
          'dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white',
          open && 'bg-ink/5 text-ink shadow-sm dark:bg-white/10 dark:text-white'
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Categories
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-ink/10 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-surface-dark-raised"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {Object.values(CATEGORIES).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-ink/5 dark:hover:bg-white/5"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="font-medium text-ink dark:text-white">{cat.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-2 border-t border-ink/10 pt-2 dark:border-white/10">
              <Link
                to="/tools"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50 dark:text-mint-400 dark:hover:bg-teal-900/30"
              >
                <Sparkles className="size-4" />
                View all tools
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-200',
        scrolled
          ? 'border-ink/10 bg-paper/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-surface-dark/90'
          : 'border-ink/5 bg-paper/70 backdrop-blur-xl dark:border-white/5 dark:bg-surface-dark/70'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to="/" aria-label={`${SITE.name} Home`} className="flex items-center gap-1.5 font-display text-base font-bold text-ink sm:gap-2 sm:text-lg dark:text-white">
          <img
            src="/favicon.svg"
            alt={`${SITE.name} Logo`}
            className="size-8 shrink-0 sm:size-9"
          />
          <span className="truncate">{SITE.name}</span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-ink/5 text-ink shadow-sm dark:bg-white/10 dark:text-white'
                    : 'text-ink-soft hover:bg-ink/5 hover:text-ink hover:shadow-sm dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <CategoryDropdown />
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/tools"
            className="hidden items-center gap-1.5 rounded-lg border border-ink/10 px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-mint-500/50 hover:text-ink dark:border-white/10 dark:text-white/60 dark:hover:border-mint-500/50 dark:hover:text-white lg:flex"
          >
            <Search className="size-4" />
            Search tools
          </Link>
          <DarkModeToggle />
          <button
            className="flex size-10 items-center justify-center rounded-xl border border-ink/10 text-ink-soft md:hidden dark:border-white/10 dark:text-white/70"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-ink/10 md:hidden dark:border-white/10"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3.5 py-2.5 text-base font-medium',
                      isActive
                        ? 'bg-ink/5 text-ink dark:bg-white/10 dark:text-white'
                        : 'text-ink-soft dark:text-white/60'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-1 border-t border-ink/10 pt-2 dark:border-white/10">
                <p className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink-soft/60 dark:text-white/30">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-1 pt-1">
                  {Object.values(CATEGORIES).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-ink/5 dark:hover:bg-white/5"
                    >
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-ink-soft dark:text-white/70">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
