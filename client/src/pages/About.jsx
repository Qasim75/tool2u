import { motion } from 'framer-motion';
import { ShieldCheck, Gauge, Users, Sparkles, Code2, Heart } from 'lucide-react';
import SEO from '@/components/layouts/SEO';
import SectionTitle from '@/components/ui/SectionTitle';

// Custom fluid cubic-bezier curve
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Stagger setup
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Directional Animations
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
  hidden: { opacity: 0, x: -50, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 50, filter: 'blur(6px)' },
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
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.35, ease: TRANSITION_EASE },
  },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Privacy first',
    description: 'Every tool runs entirely client-side. Nothing you enter is ever sent to a server or stored anywhere.',
    color: 'from-emerald-500/20 to-teal-500/10',
    iconColor: 'text-emerald-500 dark:text-mint-400',
  },
  {
    icon: Gauge,
    title: 'Speed over friction',
    description: 'No signups, no waiting, no ads standing between you and the tool you came for.',
    color: 'from-cyan-500/20 to-blue-500/10',
    iconColor: 'text-cyan-500 dark:text-cyan-400',
  },
  {
    icon: Users,
    title: 'Made for real tasks',
    description: 'Each tool solves a specific everyday problem for students, developers, professionals, and creators everywhere.',
    color: 'from-indigo-500/20 to-purple-500/10',
    iconColor: 'text-indigo-500 dark:text-indigo-400',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Tool2U — a free, privacy-friendly collection of browser tools built for students, developers and everyday tasks."
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Tool2U',
          url: 'https://tool2u.io/about',
        }}
      />

      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Lightroom Background Ambient Gloom & Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none h-96 w-[800px] opacity-30 blur-[130px] bg-gradient-to-r from-teal-500 via-mint-400 to-indigo-500 dark:opacity-20" />
        <div className="absolute top-1/3 left-10 pointer-events-none h-64 w-64 blur-[100px] bg-emerald-500/20 rounded-full" />
        <div className="absolute bottom-10 right-10 pointer-events-none h-64 w-64 blur-[100px] bg-indigo-500/20 rounded-full" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header Badge */}
            <motion.div variants={slideFromTop} className="text-center mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-white/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-teal-700 dark:border-white/10 dark:bg-surface-dark-raised/80 dark:text-mint-400 shadow-sm">
                <Sparkles className="size-3.5 animate-pulse" />
                Crafted for Utility
              </span>
            </motion.div>

            {/* Title Section */}
            <motion.div variants={slideFromTop}>
              <SectionTitle
                eyebrow="About us"
                title="Simple tools, built without the clutter"
                description="Tool2U started as a small toolbox of the calculators and generators we kept reaching for ourselves — and grew into a free set of browser tools anyone can use in seconds."
                align="center"
              />
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {VALUES.map((value, idx) => {
                const variant = idx % 3 === 0 ? slideFromLeft : idx % 3 === 1 ? slideFromBottom : slideFromRight;
                return (
                  <motion.div
                    key={value.title}
                    variants={variant}
                    className="h-full"
                  >
                    <motion.div
                      variants={cardHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      className="group relative h-full rounded-card border border-ink/10 bg-white/80 p-6 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-surface-dark-raised/80 hover:border-teal-500/40 dark:hover:border-mint-400/40 shadow-sm hover:shadow-xl"
                    >
                      {/* Gradient Backdrop Shine */}
                      <div className={`absolute inset-0 rounded-card bg-gradient-to-br ${value.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none`} />

                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block"
                        >
                          <value.icon className={`size-7 ${value.iconColor}`} aria-hidden="true" />
                        </motion.div>

                        <h3 className="mt-4 font-display font-bold text-ink dark:text-white text-lg group-hover:text-teal-700 dark:group-hover:text-mint-400 transition-colors">
                          {value.title}
                        </h3>

                        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft dark:text-white/60">
                          {value.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Text Paragraphs with Alternating Entry */}
            <motion.div
              variants={zoomFromBack}
              className="mt-14 rounded-card border border-ink/10 bg-white/60 p-8 backdrop-blur-md dark:border-white/10 dark:bg-surface-dark-raised/40 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Code2 className="size-32 text-ink dark:text-white" />
              </div>

              <div className="relative z-10 space-y-5 text-ink-soft dark:text-white/70 leading-relaxed text-base sm:text-lg">
                <motion.p variants={slideFromLeft}>
                  We believe a calculator, converter, or generator shouldn't require an account, a subscription,
                  or a trip to a server halfway across the world. Every tool on this site is built to run entirely
                  in your browser — fast, private, and free.
                </motion.p>

                <motion.p variants={slideFromRight}>
                  Tool2U is actively maintained and new tools are added based on what people actually need.
                  If there's something you'd like to see built, get in touch through the Contact page.
                </motion.p>
              </div>

              <div className="mt-6 pt-6 border-t border-ink/10 dark:border-white/10 flex items-center justify-between text-xs text-ink-soft dark:text-white/40">
                <span className="flex items-center gap-1">
                  Built with <Heart className="size-3.5 text-rose-500 fill-rose-500 animate-pulse" /> in Pakistan
                </span>
                <span>Zero Trackers • Client-Side Only</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}