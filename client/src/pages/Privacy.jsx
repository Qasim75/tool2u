import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff, HardDrive, BarChart3, ExternalLink, RefreshCw, Mail } from 'lucide-react';
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
    icon: Lock,
    title: '1. Overview',
    content: `Tool2U ("we", "our", "the site") provides free browser-based tools. This policy explains what information is, and isn't, collected when you use the site.`,
    variant: slideFromLeft,
  },
  {
    icon: EyeOff,
    title: '2. Data you enter into tools',
    content: `All tools on Tool2U — including the CGPA calculator, QR code generator, WhatsApp link generator, word counter, and JSON to CSV converter — run entirely inside your browser using client-side JavaScript. Text, numbers, and files you enter are processed locally on your device and are never uploaded to our servers or any third party.`,
    variant: slideFromRight,
  },
  {
    icon: HardDrive,
    title: '3. Local storage',
    content: `We may use your browser's local storage to remember your dark mode preference. This information stays on your device and is never transmitted anywhere.`,
    variant: slideFromLeft,
  },
  {
    icon: BarChart3,
    title: '4. Analytics and cookies',
    content: `We may use privacy-respecting, aggregated analytics to understand overall site traffic (for example, which pages are visited). This does not include the content of anything you type into a tool.`,
    variant: slideFromRight,
  },
  {
    icon: ExternalLink,
    title: '5. Third-party links',
    content: `Some tools may generate links to third-party services (for example, a WhatsApp chat link). Once you click such a link, that third party's own privacy policy applies.`,
    variant: slideFromLeft,
  },
  {
    icon: RefreshCw,
    title: '6. Changes to this policy',
    content: `We may update this policy from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated policy.`,
    variant: slideFromRight,
  },
];

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read the Tool2U privacy policy. All tools run client-side in your browser — we do not collect, store, or transmit the data you enter into any tool."
        path="/privacy"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy',
          url: 'https://tool2u.io/privacy',
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
              <ShieldCheck className="size-3.5 text-emerald-500" />
              100% Client-Side Privacy Guaranteed
            </div>

            <SectionTitle
              eyebrow="Legal"
              title="Privacy Policy"
              description="Last updated: August 2026"
              align="center"
            />
          </motion.div>

          {/* Policy Section List */}
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
                Questions about this policy can be sent through the{' '}
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