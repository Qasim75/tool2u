import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/layouts/SEO';
import ToolCard from '@/components/ui/ToolCard';
import EmptyState from '@/components/ui/EmptyState';
import SectionTitle from '@/components/ui/SectionTitle';
import { CATEGORIES, TOOLS, getToolsByCategory } from '@/constants/tools';
import { Link as LinkIcon, Sparkles, ChevronRight, Layers } from 'lucide-react';
import CategoryIllustration from '@/components/illustrations/CategoryIllustration';

// Fluid cubic-bezier curve
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Staggered Container Setup
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = CATEGORIES[categoryId];

  const tools = useMemo(() => getToolsByCategory(categoryId), [categoryId]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category ? `${category.label} Tools` : 'Tools',
    itemListElement: tools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: `https://tool2u.io${tool.path}`,
      description: tool.description,
    })),
  };

  if (!category) {
    return <EmptyState title="Category not found" description="The category you're looking for doesn't exist." />;
  }

  const relatedCategories = Object.values(CATEGORIES)
    .filter((c) => c.id !== categoryId)
    .slice(0, 4);

  return (
    <>
      <SEO
        title={`${category.label} Tools — Free Online ${category.shortDesc}`}
        description={category.description}
        path={`/category/${categoryId}`}
        jsonLd={jsonLd}
      />

      {/* Category Header */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper-dim/40 dark:border-white/10 dark:bg-white/[0.02]">
        {/* Category Accent Dynamic Ambient Glow */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none h-80 w-full max-w-5xl opacity-25 blur-[120px] rounded-full"
          style={{ backgroundColor: category.color }}
        />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 relative z-10">

          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: TRANSITION_EASE }}
            className="flex items-center gap-2 text-xs font-semibold text-ink-soft dark:text-white/50"
          >
            <Link to="/" className="hover:text-ink dark:hover:text-white transition-colors">Home</Link>
            <ChevronRight className="size-3 opacity-50" />
            <Link to="/tools" className="hover:text-ink dark:hover:text-white transition-colors">Tools</Link>
            <ChevronRight className="size-3 opacity-50" />
            <span className="text-ink dark:text-white font-bold flex items-center gap-1.5">
              <span className="size-2 rounded-full inline-block" style={{ backgroundColor: category.color }} />
              {category.label}
            </span>
          </motion.div>

          {/* Title Area */}
          <div className="mt-6 flex items-start justify-between gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: TRANSITION_EASE }}
              className="flex items-start gap-5"
            >
              <span
                className="mt-1.5 size-4 rounded-full shrink-0 shadow-[0_0_12px_currentColor]"
                style={{ backgroundColor: category.color, color: category.color }}
                aria-hidden="true"
              />
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl dark:text-white">
                  {category.label} Tools
                </h1>
                <p className="mt-3 max-w-2xl text-base sm:text-lg text-ink-soft dark:text-white/60 leading-relaxed">
                  {category.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 dark:border-white/10 dark:bg-surface-dark-raised/80 px-3.5 py-1.5 text-xs font-semibold text-ink dark:text-white shadow-xs">
                  <Layers className="size-3.5 text-teal-600 dark:text-mint-400" />
                  <span>{tools.length} tool{tools.length !== 1 ? 's' : ''} available</span>
                </div>
              </div>
            </motion.div>

            {/* Illustration Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: TRANSITION_EASE }}
              className="hidden size-28 shrink-0 items-center justify-center rounded-3xl sm:flex border border-white/20 shadow-lg relative group overflow-hidden"
              style={{ backgroundColor: `color-mix(in srgb, ${category.color} 15%, transparent)` }}
            >
              <div
                className="absolute inset-0 opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40"
                style={{ backgroundColor: category.color }}
              />
              <CategoryIllustration category={category.id} color={category.color} className="h-24 w-24 relative z-10 transition-transform duration-500 group-hover:scale-110" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <SectionTitle
          eyebrow="Collection"
          title={`${category.label} Tools`}
          description={`Browse all ${tools.length} free ${category.label.toLowerCase()} tools.`}
        />

        {tools.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {tools.map((tool, idx) => {
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
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <EmptyState
              title="No tools in this category yet"
              description="We're working on adding more tools. Check back soon!"
            />
          </motion.div>
        )}
      </section>

      {/* Related Categories Section */}
      <section className="relative border-t border-ink/10 bg-paper-dim/30 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Explore" title="Other categories" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4"
          >
            {relatedCategories.map((cat, idx) => (
              <motion.div key={cat.id} variants={slideFromBottom}>
                <Link
                  to={`/category/${cat.id}`}
                  className="group flex items-center gap-3 rounded-card border border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-xl dark:border-white/10 dark:bg-surface-dark-raised dark:hover:border-mint-400/40"
                >
                  <span className="size-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: cat.color, color: cat.color }} aria-hidden="true" />
                  <span className="font-semibold text-ink dark:text-white group-hover:text-teal-700 dark:group-hover:text-mint-400 transition-colors">
                    {cat.label}
                  </span>
                  <LinkIcon className="ml-auto size-4 text-ink-soft/40 transition-transform group-hover:translate-x-1 group-hover:text-teal-600 dark:text-white/40 dark:group-hover:text-mint-400" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}