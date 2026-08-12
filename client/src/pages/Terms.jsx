import { motion } from 'framer-motion';
import { FileText, CheckCircle2, Wrench, AlertTriangle, ShieldAlert, Ban, RefreshCw, Mail } from 'lucide-react';
import SEO from '@/components/layouts/SEO';
import SectionTitle from '@/components/ui/SectionTitle';

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

// Directional Animations
const slideFromLeft = {
  hidden: { opacity: 0, x: -35, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 35, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: TRANSITION_EASE },
  },
};

const zoomFromBack = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

const SECTIONS = [
  {
    icon: CheckCircle2,
    title: '1. Acceptance of terms',
    content: `By using Tool2U, you agree to these terms. If you do not agree, please discontinue use of the site.`,
    variant: slideFromLeft,
  },
  {
    icon: Wrench,
    title: '2. Use of tools',
    content: `All tools are provided free of charge, "as is," without warranty of any kind. Results (such as GPA calculations or generated QR codes) are provided for convenience and should be verified independently where accuracy is critical — for example, official academic transcripts.`,
    variant: slideFromRight,
  },
  {
    icon: AlertTriangle,
    title: '3. No warranty',
    content: `We make reasonable efforts to keep tools accurate and available, but we do not guarantee uninterrupted access or error-free results.`,
    variant: slideFromLeft,
  },
  {
    icon: ShieldAlert,
    title: '4. Limitation of liability',
    content: `Tool2U is not liable for any direct or indirect damages arising from use of, or inability to use, the tools provided on this site.`,
    variant: slideFromRight,
  },
  {
    icon: Ban,
    title: '5. Acceptable use',
    content: `You agree not to use the site to generate content that is illegal, harmful, or infringes on the rights of others (for example, generating misleading WhatsApp links or QR codes intended to deceive).`,
    variant: slideFromLeft,
  },
  {
    icon: RefreshCw,
    title: '6. Changes to these terms',
    content: `We may revise these terms at any time. Continued use of the site means you accept the current terms.`,
    variant: slideFromRight,
  },
];

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the terms of service for using Tool2U's free browser-based tools."
        path="/terms"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Terms of Service',
          url: 'https://tool2u.io/terms',
        }}
      />

      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Ambient Lightroom Glow & Background Spots */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none h-96 w-full max-w-5xl opacity-30 blur-[130px] bg-gradient-to-r from-teal-500 via-mint-400 to-indigo-500 dark:opacity-20" />
        <div className="absolute top-1/3 left-10 pointer-events-none h-64 w-64 blur-[100px] bg-emerald-500/15 rounded-full" />
        <div className="absolute bottom-10 right-10 pointer-events-none h-64 w-64 blur-[100px] bg-indigo-500/15 rounded-full" />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: TRANSITION_EASE }}
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-white/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-teal-700 dark:border-white/10 dark:bg-surface-dark-raised/80 dark:text-mint-400 shadow-sm">
              <FileText className="size-3.5 text-teal-600 dark:text-mint-400" />
              Terms & Conditions Agreement
            </div>

            <SectionTitle 
              eyebrow="Legal" 
              title="Terms of Service" 
              description="Last updated: August 2026" 
              align="center"
            />
          </motion.div>

          {/* Terms Clause List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 space-y-6"
          >
            {SECTIONS.map((sec) => (
              <motion.div
                key={sec.title}
                variants={sec.variant}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl border border-ink/10 bg-white/80 p-6 sm:p-7 backdrop-blur-xl dark:border-white/10 dark:bg-surface-dark-raised/80 shadow-xs hover:border-teal-500/40 dark:hover:border-mint-400/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-mint-400 group-hover:scale-110 transition-transform">
                    <sec.icon className="size-5" />
                  </div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-ink dark:text-white group-hover:text-teal-700 dark:group-hover:text-mint-400 transition-colors">
                    {sec.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-ink-soft dark:text-white/70 pl-11">
                  {sec.content}
                </p>
              </motion.div>
            ))}

            {/* Contact Section 7 */}
            <motion.div
              variants={zoomFromBack}
              whileHover={{ y: -3 }}
              className="group relative rounded-2xl border border-ink/10 bg-white/80 p-6 sm:p-7 backdrop-blur-xl dark:border-white/10 dark:bg-surface-dark-raised/80 shadow-xs hover:border-teal-500/40 dark:hover:border-mint-400/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-mint-400 group-hover:scale-110 transition-transform">
                  <Mail className="size-5" />
                </div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-ink dark:text-white group-hover:text-teal-700 dark:group-hover:text-mint-400 transition-colors">
                  7. Contact
                </h2>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-ink-soft dark:text-white/70 pl-11">
                Questions about these terms can be sent through the{' '}
                <a 
                  href="/contact" 
                  className="font-semibold text-teal-700 underline hover:text-teal-600 dark:text-mint-400 dark:hover:text-mint-300 transition-colors"
                >
                  Contact page
                </a>
                .
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
}