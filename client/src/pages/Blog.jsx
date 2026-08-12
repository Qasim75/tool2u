import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, BookOpen, Sparkles, FolderOpen, ArrowRight } from 'lucide-react';
import SEO from '@/components/layouts/SEO';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/constants/blog';
import { cn } from '@/utils/cn';

// Smooth cubic-bezier transition
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Staggered Container Setup
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Alternating Directional Entry Animations
const slideFromTop = {
  hidden: { opacity: 0, y: -30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const slideFromBottom = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const zoomFromBack = {
  hidden: { opacity: 0, scale: 0.82, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const cardDirectionalVariants = [
  slideFromLeft,
  slideFromTop,
  slideFromRight,
  slideFromBottom,
  zoomFromBack,
];

const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    transition: { duration: 0.35, ease: TRANSITION_EASE },
  },
};

export default function Blog() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <>
      <SEO
        title="Blog"
        description="Read the latest articles on SEO, web development, productivity, and online tools."
        path="/blog"
      />

      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Ambient Lightroom Glow & Background Spots */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none h-96 w-full max-w-7xl opacity-35 blur-[130px] bg-gradient-to-r from-teal-500 via-mint-400 to-indigo-500 dark:opacity-20" />
        <div className="absolute top-1/3 right-10 pointer-events-none h-72 w-72 blur-[110px] bg-emerald-500/15 rounded-full" />
        <div className="absolute bottom-10 left-10 pointer-events-none h-72 w-72 blur-[110px] bg-indigo-500/15 rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: TRANSITION_EASE }}
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-white/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-teal-700 dark:border-white/10 dark:bg-surface-dark-raised/80 dark:text-mint-400 shadow-sm">
              <BookOpen className="size-3.5 animate-pulse" />
              Reader Hub & Knowledge Center
            </div>
            <SectionTitle
              eyebrow="Articles"
              title="Tool2U Blog"
              description="Insights, guides, and practical tips to help you build, optimize, and work smarter."
              align="center"
            />
          </motion.div>

          {/* Main Layout Grid */}
          <div className="mt-12 flex flex-col gap-10 lg:flex-row">

            {/* Articles Grid */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {filteredPosts.length > 0 ? (
                  <motion.div
                    key={activeCategory + query}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-8 md:grid-cols-2"
                  >
                    {filteredPosts.map((post, idx) => {
                      const directionalVariant = cardDirectionalVariants[idx % cardDirectionalVariants.length];

                      return (
                        <motion.div key={post.slug} variants={directionalVariant} className="h-full">
                          <motion.div
                            variants={cardHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            className="h-full"
                          >
                            <Card className="overflow-hidden flex flex-col h-full rounded-2xl border border-ink/10 bg-white/80 dark:border-white/10 dark:bg-surface-dark-raised/80 backdrop-blur-md hover:border-teal-500/40 dark:hover:border-mint-400/40 shadow-sm hover:shadow-2xl transition-all duration-300 group">
                              {/* Image Section */}
                              <Link to={`/blog/${post.slug}`} className="relative h-52 w-full overflow-hidden block">
                                <motion.img
                                  src={post.image}
                                  alt={post.title}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute top-4 left-4">
                                  <span className="inline-flex items-center gap-1 rounded-md bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-teal-800 dark:bg-slate-900/90 dark:text-mint-400 shadow-md">
                                    <Sparkles className="size-3 text-mint-500" />
                                    {post.category}
                                  </span>
                                </div>
                              </Link>

                              {/* Content Section */}
                              <div className="p-6 flex flex-col flex-1">
                                <Link to={`/blog/${post.slug}`}>
                                  <h3 className="mb-3 text-xl font-bold text-ink dark:text-white group-hover:text-teal-700 dark:group-hover:text-mint-400 transition-colors leading-snug">
                                    {post.title}
                                  </h3>
                                </Link>

                                <p className="mb-6 text-sm text-ink-soft dark:text-white/60 line-clamp-3 leading-relaxed">
                                  {post.excerpt}
                                </p>

                                {/* Footer Metadata */}
                                <div className="mt-auto flex items-center justify-between border-t border-ink/5 pt-4 dark:border-white/5 text-xs text-ink-soft dark:text-white/40">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="size-3.5 text-teal-600 dark:text-mint-400" />
                                    {post.date}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <User className="size-3.5 text-teal-600 dark:text-mint-400" />
                                    {post.author}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-ink/20 dark:border-white/20 bg-white/40 dark:bg-surface-dark/40 backdrop-blur-md"
                  >
                    <FolderOpen className="size-16 text-teal-600/40 dark:text-mint-400/40 mb-4 animate-bounce" />
                    <h3 className="text-xl font-bold text-ink dark:text-white">No articles found</h3>
                    <p className="mt-2 text-sm text-ink-soft dark:text-white/60 max-w-sm">
                      We couldn't find any posts matching "{query}". Try searching for something else or clear filters.
                    </p>
                    <button
                      onClick={() => { setQuery(''); setActiveCategory('All'); }}
                      className="mt-6 text-sm font-semibold text-teal-700 dark:text-mint-400 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar Container */}
            <aside className="w-full lg:w-80 flex flex-col gap-8">
              {/* Search Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: TRANSITION_EASE }}
              >
                <Card className="p-6 rounded-2xl border border-ink/10 bg-white/80 dark:border-white/10 dark:bg-surface-dark-raised/80 backdrop-blur-md shadow-sm relative group overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 to-mint-400 opacity-60" />
                  <h4 className="mb-4 font-semibold text-ink dark:text-white flex items-center gap-2">
                    <Search className="size-4 text-teal-600 dark:text-mint-400" />
                    Search Articles
                  </h4>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft/50 dark:text-white/40" />
                    <input
                      type="text"
                      placeholder="Search topics, keywords..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full rounded-xl border border-ink/10 bg-paper-dim/60 py-2.5 pl-10 pr-4 text-sm focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none dark:border-white/10 dark:bg-surface-dark dark:text-white transition-all"
                    />
                  </div>
                </Card>
              </motion.div>

              {/* Categories Navigation */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: TRANSITION_EASE }}
              >
                <Card className="p-6 rounded-2xl border border-ink/10 bg-white/80 dark:border-white/10 dark:bg-surface-dark-raised/80 backdrop-blur-md shadow-sm">
                  <h4 className="mb-4 font-semibold text-ink dark:text-white flex items-center justify-between">
                    <span>Categories</span>
                    <span className="text-xs text-ink-soft/60 dark:text-white/40 font-normal">
                      {BLOG_CATEGORIES.length + 1} topics
                    </span>
                  </h4>
                  <div className="flex flex-col gap-2">
                    {['All', ...BLOG_CATEGORIES].map((cat) => {
                      const isActive = activeCategory === cat;
                      return (
                        <motion.button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          whileTap={{ scale: 0.97 }}
                          className={cn(
                            "group flex items-center justify-between text-left text-sm py-2 px-3.5 rounded-xl font-medium transition-all duration-200",
                            isActive
                              ? "bg-teal-700 text-white dark:bg-mint-500 dark:text-teal-950 shadow-md"
                              : "text-ink-soft hover:bg-ink/5 dark:text-white/70 dark:hover:bg-white/5"
                          )}
                        >
                          <span>{cat}</span>
                          <ArrowRight className={cn(
                            "size-3.5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0",
                            isActive && "opacity-100 translate-x-0"
                          )} />
                        </motion.button>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}