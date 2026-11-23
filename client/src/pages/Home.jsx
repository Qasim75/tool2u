import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Zap, SmartphoneNfc, Sparkles, ChevronDown,
  ArrowRight, Star, Clock, BookOpen, ArrowUpRight,
} from 'lucide-react';
import SEO from '@/components/layouts/SEO';
import Search from '@/components/ui/Search';
import ToolCard from '@/components/ui/ToolCard';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger';
import HeroBackground from '@/components/motion/HeroBackground';
import ToolsMarquee from '@/components/motion/ToolsMarquee';
import { wordItem } from '@/lib/motion';
import { TOOLS, CATEGORIES, getToolById, getBestMatch } from '@/constants/tools';
import { FAQS } from '@/constants/faq';
import { BLOG_POSTS } from '@/constants/blog';
import { cn } from '@/utils/cn';
import { useUser } from '@/context/UserContext';
import heroImage from '@/assets/hero.png';

const HERO_IMAGE = heroImage;
const CATEGORY_IMAGES = {};
const BENEFITS = [
  {
    title: 'Lightning fast',
    description: 'Most tools open instantly in your browser without waiting on a server.',
    icon: Zap,
  },
  {
    title: 'Private by design',
    description: 'Your input stays local whenever possible, so your data never needs to leave the device.',
    icon: ShieldCheck,
  },
  {
    title: 'Works everywhere',
    description: 'Use the tools smoothly on desktop, tablet, or phone with responsive layouts.',
    icon: SmartphoneNfc,
  },
  {
    title: 'Clean and focused',
    description: 'Every utility is designed to be simple, distraction-free, and easy to reuse.',
    icon: Sparkles,
  },
];

// Premium Custom Ease Curve
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Hero Section Container Stagger Setup
const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// Alternating Directional Animations for Text & UI Elements
const slideFromTop = {
  hidden: { opacity: 0, y: -40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -50, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const slideFromBottom = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const zoomFromBack = {
  hidden: { opacity: 0, scale: 0.82, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: TRANSITION_EASE },
  },
};

// Custom Staggered Directional Variants for Headline Words
const wordDirectionalVariants = [
  slideFromLeft,
  slideFromTop,
  slideFromRight,
  slideFromBottom,
  zoomFromBack,
];

const heroHeadingContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const HERO_HEADLINE_LEAD = 'Everyday tools, built for your';

const cardHoverVariants = {
  rest: { y: 0, scale: 1, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
  hover: {
    y: -7,
    scale: 1.015,
    transition: { duration: 0.35, ease: TRANSITION_EASE },
  },
  tap: { scale: 0.98 },
};

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink/10 py-4 dark:border-white/10 overflow-hidden transition-colors hover:border-teal-500/30">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left group cursor-pointer"
      >
        <span className="font-medium text-ink transition-colors group-hover:text-teal-700 dark:text-white dark:group-hover:text-mint-400">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: TRANSITION_EASE }}
          className="shrink-0 text-ink-soft dark:text-white/50"
        >
          <ChevronDown className="size-5" aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: TRANSITION_EASE }}
          >
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft dark:text-white/55">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { favorites, recentlyUsed } = useUser();

  const featuredTools = useMemo(() => TOOLS.filter((t) => t.featured), []);
  const popularTools = useMemo(() => TOOLS.filter((t) => t.popular), []);
  const newTools = useMemo(() => TOOLS.filter((t) => t.new), []);

  const heroReelTools = useMemo(() => {
    const seen = new Set();
    const combined = [...popularTools, ...featuredTools];
    const unique = combined.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });
    return unique.slice(0, 14);
  }, [popularTools, featuredTools]);

  const favoriteToolsList = useMemo(
    () => favorites.map((id) => getToolById(id)).filter(Boolean),
    [favorites]
  );

  const recentToolsList = useMemo(
    () => recentlyUsed.map((id) => getToolById(id)).filter(Boolean),
    [recentlyUsed]
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const match = getBestMatch(query);
    if (match) {
      navigate(match.path);
    } else {
      navigate(`/tools?q=${encodeURIComponent(query)}`);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tool2U',
    url: 'https://tool2u.io',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tool2u.io/tools?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SEO
        title="Free Online Tools for Everyday Work"
        description="Tool2U is a free collection of 200+ fast, privacy-friendly browser tools: CGPA calculator, QR code generator, WhatsApp link generator, word counter, JSON converters, image tools, SEO utilities and more."
        path="/"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink/10">
        {/* Ambient Lighting & Glow FX */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 pointer-events-none h-96 w-full max-w-7xl opacity-40 blur-[120px] bg-gradient-to-r from-teal-500 via-mint-400 to-indigo-500 dark:opacity-20" />
        <HeroBackground image={HERO_IMAGE} />

        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-28 lg:px-8 relative z-10"
        >
          {/* Top Badge - Slide From Top */}
          <motion.span
            variants={slideFromTop}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-white/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-ink-soft dark:border-white/10 dark:bg-surface-dark-raised/80 dark:text-white/70 shadow-sm transition-transform hover:scale-105"
          >
            <span className="size-1.5 rounded-full bg-mint-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            200+ free tools, zero signup
          </motion.span>

          {/* Heading - Directional Word Stagger (Left, Top, Right, Bottom, Back Zoom) */}
          <motion.h1
            variants={heroHeadingContainer}
            className="text-3xl font-bold tracking-tight text-ink sm:text-6xl dark:text-white leading-tight"
          >
            {HERO_HEADLINE_LEAD.split(' ').map((word, i) => {
              const directionalVariant = wordDirectionalVariants[i % wordDirectionalVariants.length];
              return (
                <motion.span
                  key={i}
                  variants={directionalVariant}
                  className="inline-block will-change-transform"
                >
                  {word}&nbsp;
                </motion.span>
              );
            })}
            <motion.span
              variants={zoomFromBack}
              className="inline-block will-change-transform text-gradient-shimmer bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-mint-400 to-emerald-500"
            >
              browser workbench
            </motion.span>
          </motion.h1>

          {/* Subtitle - Slide From Left */}
          <motion.p
            variants={slideFromLeft}
            className="mx-auto mt-6 max-w-xl text-lg text-ink-soft dark:text-white/60 leading-relaxed"
          >
            Calculate your CGPA, generate a QR code, convert JSON to CSV, compress images,
            and much more — instantly, privately, and completely free. No account, no ads, no server round-trip.
          </motion.p>

          {/* Search Bar - Slide From Right */}
          <motion.form
            variants={slideFromRight}
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-8 max-w-lg relative group"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teal-500 to-mint-400 opacity-20 blur group-hover:opacity-40 transition duration-500 pointer-events-none" />
            <div className="relative">
              <Search
                value={query}
                onChange={setQuery}
                placeholder="Search 200+ tools… e.g. QR code, BMI, JSON"
                onNavigate={(tool, typed) => {
                  if (!tool && typed && typed.trim()) {
                    navigate(`/tools?q=${encodeURIComponent(typed)}`);
                  }
                }}
              />
            </div>
          </motion.form>

          {/* Marquee Reel - Zoom From Back */}
          <motion.div
            variants={zoomFromBack}
            className="mt-8 w-full"
          >
            <ToolsMarquee tools={heroReelTools} />
          </motion.div>
        </motion.div>
      </section>

      {/* Personalized sections */}
      {(favoriteToolsList.length > 0 || recentToolsList.length > 0) && (
        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {favoriteToolsList.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideFromLeft}
              >
                <div className="mb-6 flex items-center gap-2">
                  <Star className="size-5 text-amber-500 fill-amber-500 animate-bounce" />
                  <h2 className="text-xl font-bold text-ink dark:text-white">Your Favorites</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {favoriteToolsList.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </motion.div>
            )}
            {recentToolsList.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideFromRight}
              >
                <div className="mb-6 flex items-center gap-2">
                  <Clock className="size-5 text-teal-600 dark:text-mint-400" />
                  <h2 className="text-xl font-bold text-ink dark:text-white">Recently Used</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {recentToolsList.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Popular tools */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Most used"
          title="Popular tools"
          description="The tools people reach for the most, ready in one click."
        />
        <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularTools.map((tool, index) => (
            <StaggerItem key={tool.id} className={index === 0 ? 'sm:col-span-2' : ''}>
              <ToolCard tool={tool} variant={index === 0 ? 'flagship' : undefined} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* New tools */}
      {newTools.length > 0 && (
        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-ink/5 dark:border-white/5">
          <SectionTitle
            eyebrow="Just added"
            title="New tools"
            description={`${newTools.length} fresh tools to help you work faster and smarter.`}
          />
          <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {newTools.slice(0, 8).map((tool) => (
              <StaggerItem key={tool.id}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          {newTools.length > 8 && (
            <div className="mt-8 text-center">
              <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-600 dark:text-mint-400 dark:hover:text-mint-500 transition-transform hover:translate-x-1">
                See all {newTools.length} new tools →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Categories with upgraded Motion Card interaction & Glow */}
      <section className="relative border-y border-ink/10 bg-paper-dim/40 dark:border-white/10 dark:bg-white/[0.02] overflow-hidden">
        {/* Soft Ambient Light Spot */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none h-64 w-64 blur-[100px] bg-teal-500/10 rounded-full" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle eyebrow="Browse by need" title="Tool categories" />
          <StaggerGroup className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <StaggerItem key={cat.id}>
                <motion.div
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="h-full"
                >
                  <Link
                    to={`/category/${cat.id}`}
                    className="group relative flex flex-col gap-3 h-full overflow-hidden rounded-card border border-ink/10 bg-white p-6 transition-all duration-300 dark:border-white/10 dark:bg-surface-dark-raised hover:border-teal-500/40 dark:hover:border-mint-400/40 shadow-sm hover:shadow-md"
                  >
                    {CATEGORY_IMAGES[key] && (
                      <div className="absolute inset-0">
                        <img
                          src={CATEGORY_IMAGES[key]}
                          alt=""
                          className="h-full w-full object-cover opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.15]"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="relative z-10">
                      <motion.span
                        className="size-3 rounded-full block mb-3 shadow-[0_0_10px_currentColor]"
                        style={{ backgroundColor: cat.color, color: cat.color }}
                        whileHover={{ scale: 1.5, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      />
                      <span className="font-display font-semibold text-ink dark:text-white block group-hover:text-teal-700 dark:group-hover:text-mint-400 transition-colors">
                        {cat.label}
                      </span>
                      <span className="text-xs text-ink-soft dark:text-white/50 mt-1 block">
                        {TOOLS.filter((t) => t.category === cat.id).length} tool
                        {TOOLS.filter((t) => t.category === cat.id).length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Featured tools */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="All tools"
          title="Featured tools"
          description="Everything currently available on Tool2U."
        />
        <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTools.slice(0, 12).map((tool) => (
            <StaggerItem key={tool.id}>
              <ToolCard tool={tool} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-10 flex justify-center">
          <Link to="/tools">
            <Button variant="secondary" icon={ArrowRight}>
              View all {TOOLS.length} tools
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative border-y border-ink/10 bg-teal-800 dark:border-white/10 dark:bg-surface-dark-raised overflow-hidden">
        {/* Background Radial Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-700/40 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            eyebrow="Why Tool2U"
            title="Built to be fast, private and simple"
            inverted
          />
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit, idx) => (
              <StaggerItem key={benefit.title}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: TRANSITION_EASE }}
                  className="flex flex-col gap-3 rounded-card border border-white/10 bg-white/5 p-6 h-full backdrop-blur-md transition-colors hover:bg-white/10 hover:border-white/20 shadow-lg"
                >
                  <benefit.icon className="size-6 text-mint-400" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{benefit.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-ink/5 dark:border-white/5">
        <div className="flex items-end justify-between">
          <SectionTitle
            eyebrow="Learn"
            title="From the blog"
            description="Tips, guides, and insights to help you work smarter."
          />
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-600 dark:text-mint-400 dark:hover:text-mint-500 transition-transform hover:translate-x-1"
          >
            View all <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <StaggerGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <StaggerItem key={post.slug}>
              <motion.div
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="h-full"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block h-full overflow-hidden rounded-card border border-ink/10 bg-white dark:border-white/10 dark:bg-surface-dark-raised transition-all hover:border-teal-500/30"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4, ease: TRANSITION_EASE }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-teal-700 dark:text-mint-400">
                      {post.category}
                    </span>
                    <h3 className="mt-1.5 font-display font-semibold text-ink line-clamp-2 group-hover:text-teal-700 dark:text-white dark:group-hover:text-mint-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft line-clamp-2 dark:text-white/55">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/blog" className="text-sm font-medium text-teal-700 hover:text-teal-600 dark:text-mint-400">
            View all blog posts →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 border-t border-ink/5 dark:border-white/5">
        <SectionTitle eyebrow="FAQ" title="Common questions" align="center" className="mx-auto" />
        <div className="mt-8">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={zoomFromBack}
          className="relative overflow-hidden rounded-3xl bg-teal-800 p-12 dark:bg-mint-500 shadow-2xl"
        >
          {/* Ambient Lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-900 via-teal-800 to-mint-600 dark:from-mint-600 dark:to-teal-400 opacity-90" />
          <div className="absolute inset-0 grid-paper opacity-10" aria-hidden="true" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white dark:text-teal-950 sm:text-4xl">
              Ready to work smarter?
            </h2>
            <p className="mt-4 text-lg text-white/80 dark:text-teal-950/80 max-w-xl mx-auto">
              Start using our {TOOLS.length}+ free tools today. No signup, no fees, no tracking.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/tools">
                <Button
                  size="lg"
                  variant="ghost"
                  className="!bg-transparent !text-black border border-black/25 hover:!bg-teal-700 hover:!text-black hover:!border-teal-700 shadow-none transition-all duration-200 hover:scale-105"
                >
                  Explore all tools
                </Button>
              </Link>
              <Link to="/blog">
                <Button
                  size="lg"
                  variant="ghost"
                  className="!bg-transparent !text-black border border-black/25 hover:!bg-teal-700 hover:!text-black hover:!border-teal-700 shadow-none transition-all duration-200 hover:scale-105"
                >
                  Read the blog
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}