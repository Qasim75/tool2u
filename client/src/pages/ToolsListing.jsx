import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter, Search as SearchIcon } from 'lucide-react';
import SEO from '@/components/layouts/SEO';
import Search from '@/components/ui/Search';
import ToolCard from '@/components/ui/ToolCard';
import EmptyState from '@/components/ui/EmptyState';
import SectionTitle from '@/components/ui/SectionTitle';
import { CATEGORIES, TOOLS, searchTools } from '@/constants/tools';
import { cn } from '@/utils/cn';

// Fluid cubic-bezier curve
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Staggered Container Setup
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// Alternating Directional Entry Animations for Cards
const slideFromTop = {
  hidden: { opacity: 0, y: -25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: TRANSITION_EASE },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -35, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: TRANSITION_EASE },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 35, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: TRANSITION_EASE },
  },
};

const slideFromBottom = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: TRANSITION_EASE },
  },
};

const zoomFromBack = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: TRANSITION_EASE },
  },
};

const cardDirectionalVariants = [
  slideFromLeft,
  slideFromTop,
  slideFromRight,
  slideFromBottom,
  zoomFromBack,
];

export default function ToolsListing() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const activeCategory = categoryId || searchParams.get('category') || 'all';

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const filteredTools = useMemo(() => {
    let results = searchTools(query);
    if (activeCategory !== 'all') {
      results = results.filter((t) => t.category === activeCategory);
    }
    return results;
  }, [query, activeCategory]);

  const setCategory = (id) => {
    if (id === 'all') {
      navigate('/tools');
    } else {
      navigate(`/category/${id}`);
    }
  };

  const handleSearchChange = (value) => {
    setQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set('q', value);
    else next.delete('q');
    setSearchParams(next);
  };

  const suggestions = ['qr code', 'cgpa', 'password', 'json', 'image', 'bmi', 'word', 'color', 'pdf'];

  const category = CATEGORIES[activeCategory];
  const pageTitle = category ? `${category.label} Tools` : 'All Tools';
  const pageDescription = category
    ? `Explore our collection of free ${category.label} tools on Tool2U. Fast, private, and browser-based.`
    : 'Browse every free browser-based tool on Tool2U, filterable by category: Students, Developers, Productivity and Utilities.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filteredTools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: `https://tool2u.io${tool.path}`,
    })),
  };

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        path={categoryId ? `/category/${categoryId}` : '/tools'}
        jsonLd={jsonLd}
      />

      <section className="relative overflow-hidden py-14 sm:py-20">
        {/* Lightroom Ambient Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none h-96 w-full max-w-7xl opacity-35 blur-[130px] bg-gradient-to-r from-teal-500 via-mint-400 to-indigo-500 dark:opacity-20" />
        <div className="absolute top-1/3 left-10 pointer-events-none h-64 w-64 blur-[100px] bg-emerald-500/15 rounded-full" />
        <div className="absolute bottom-10 right-10 pointer-events-none h-64 w-64 blur-[100px] bg-indigo-500/15 rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: TRANSITION_EASE }}
          >
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-white/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-teal-700 dark:border-white/10 dark:bg-surface-dark-raised/80 dark:text-mint-400 shadow-sm">
              <Sparkles className="size-3.5 animate-pulse text-mint-500" />
              Comprehensive Workbench
            </div>

            <SectionTitle
              eyebrow={category ? 'Category' : 'Toolbox'}
              title={pageTitle}
              description={category ? `Browse all tools in the ${category.label} category.` : "Search or filter by category to find what you need."}
            />
          </motion.div>

          {/* Search & Filters Controls Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: TRANSITION_EASE }}
            className="mt-8 flex flex-col gap-5 rounded-3xl border border-ink/10 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-surface-dark-raised/40 shadow-sm"
          >
            {/* Search Component Wrapper */}
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teal-500 to-mint-400 opacity-0 group-hover:opacity-20 focus-within:opacity-30 transition duration-500 pointer-events-none" />
              <Search value={query} onChange={handleSearchChange} placeholder="Search 200+ tools… e.g. QR code, BMI, JSON" />
            </div>

            {/* Quick Suggestions Tags */}
            {!query && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-soft/60 dark:text-white/40 mr-1 flex items-center gap-1">
                  <SearchIcon className="size-3" /> Popular:
                </span>
                {suggestions.map((s, idx) => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSearchChange(s)}
                    className="rounded-full border border-ink/10 bg-white/80 px-3 py-1 text-xs font-medium text-ink-soft transition-all duration-200 hover:border-teal-500 hover:text-teal-700 dark:border-white/10 dark:bg-surface-dark dark:text-white/60 dark:hover:border-mint-400 dark:hover:text-mint-400 shadow-2xs"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Category Filter Pills */}
            <div className="pt-2 border-t border-ink/5 dark:border-white/5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft/60 dark:text-white/40 mr-2 flex items-center gap-1">
                <Filter className="size-3" /> Filter:
              </span>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory('all')}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200 shadow-2xs',
                  activeCategory === 'all'
                    ? 'border-teal-800 bg-teal-800 text-white dark:border-mint-500 dark:bg-mint-500 dark:text-teal-950 shadow-md'
                    : 'border-ink/10 bg-white/50 text-ink-soft hover:border-ink/20 dark:border-white/10 dark:bg-surface-dark/50 dark:text-white/60'
                )}
              >
                All
              </motion.button>

              {Object.values(CATEGORIES).map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-200 shadow-2xs',
                      isActive
                        ? 'border-transparent text-white shadow-md'
                        : 'border-ink/10 bg-white/50 text-ink-soft hover:border-ink/20 dark:border-white/10 dark:bg-surface-dark/50 dark:text-white/60'
                    )}
                    style={isActive ? { backgroundColor: cat.color } : undefined}
                  >
                    <span
                      className={cn("size-2 rounded-full transition-transform group-hover:scale-125", isActive ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" : "")}
                      style={isActive ? undefined : { backgroundColor: cat.color }}
                    />
                    {cat.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tools Grid Area */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              {filteredTools.length > 0 ? (
                <motion.div
                  key={activeCategory + query}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredTools.map((tool, idx) => {
                    const directionalVariant = cardDirectionalVariants[idx % cardDirectionalVariants.length];

                    return (
                      <motion.div key={tool.id} variants={directionalVariant} className="h-full">
                        <ToolCard tool={tool} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: TRANSITION_EASE }}
                >
                  <EmptyState
                    title="No tools match your search"
                    description="Try a different keyword or clear the category filter."
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  );
}