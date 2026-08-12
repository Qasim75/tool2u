import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquare, Sparkles, ShieldCheck, Clock, HeartHandshake } from 'lucide-react';
import SEO from '@/components/layouts/SEO';
import SectionTitle from '@/components/ui/SectionTitle';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

// Custom fluid curve
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
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: TRANSITION_EASE },
  },
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Message ready — we'll get back to you soon!");
    reset();
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with the Tool2U team — questions, feedback, or tool requests are welcome."
        path="/contact"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Tool2U',
          url: 'https://tool2u.io/contact',
        }}
      />

      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Ambient Lightroom Glow & Background Spots */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none h-96 w-full max-w-5xl opacity-35 blur-[130px] bg-gradient-to-r from-teal-500 via-mint-400 to-indigo-500 dark:opacity-20" />
        <div className="absolute top-1/3 left-10 pointer-events-none h-64 w-64 blur-[100px] bg-emerald-500/15 rounded-full" />
        <div className="absolute bottom-10 right-10 pointer-events-none h-64 w-64 blur-[100px] bg-indigo-500/15 rounded-full" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: TRANSITION_EASE }}
            className="text-center"
          >
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-white/70 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-teal-700 dark:border-white/10 dark:bg-surface-dark-raised/80 dark:text-mint-400 shadow-sm">
              <Sparkles className="size-3.5 animate-pulse text-mint-500" />
              Direct Channel
            </div>

            <SectionTitle
              eyebrow="Get in touch"
              title="Contact us"
              description="Have feedback, found a bug, or want a new tool built? Send us a message."
              align="center"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start"
          >
            {/* Form Glassmorphic Container */}
            <motion.div
              variants={zoomFromBack}
              className="rounded-3xl border border-ink/10 bg-white/80 p-6 sm:p-8 backdrop-blur-xl dark:border-white/10 dark:bg-surface-dark-raised/80 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 via-mint-400 to-emerald-500 opacity-80" />

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6 relative z-10">
                
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <motion.div variants={slideFromLeft}>
                    <Input
                      label="Full name"
                      placeholder="Ali Khan"
                      error={errors.name?.message}
                      {...register('name', { required: 'Please enter your name' })}
                    />
                  </motion.div>

                  <motion.div variants={slideFromRight}>
                    <Input
                      label="Email address"
                      type="email"
                      icon={Mail}
                      placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register('email', {
                        required: 'Please enter your email',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                      })}
                    />
                  </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div variants={slideFromBottom}>
                  <Input
                    label="Subject"
                    placeholder="Tool suggestion, bug report, etc."
                    error={errors.subject?.message}
                    {...register('subject', { required: 'Please add a subject' })}
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div variants={slideFromBottom} className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-semibold text-ink-soft dark:text-white/80 flex items-center justify-between">
                    <span>Message</span>
                    <span className="text-[10px] text-ink-soft/50 dark:text-white/40 font-normal">Min 10 chars</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us what's on your mind…"
                    aria-invalid={!!errors.message}
                    className="w-full resize-none rounded-xl border border-ink/10 bg-white/90 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/40 transition-all duration-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-surface-dark dark:text-white dark:placeholder:text-white/30 shadow-2xs"
                    {...register('message', { 
                      required: 'Please write a message', 
                      minLength: { value: 10, message: 'Message should be at least 10 characters' } 
                    })}
                  />
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-xs font-semibold text-rose-500 mt-1" 
                      role="alert"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Action Button */}
                <motion.div variants={slideFromBottom} className="pt-2">
                  <Button 
                    type="submit" 
                    isLoading={isSubmitting} 
                    icon={Send} 
                    className="w-full sm:w-auto bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-600 hover:to-emerald-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-transform active:scale-95"
                  >
                    Send message
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Sidebar Contact Info & Trust Badges */}
            <motion.aside variants={slideFromRight} className="flex flex-col gap-4">
              <div className="rounded-3xl border border-ink/10 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-surface-dark-raised/80 shadow-sm space-y-6">
                <h4 className="font-bold text-ink dark:text-white text-base flex items-center gap-2">
                  <MessageSquare className="size-4 text-teal-600 dark:text-mint-400" />
                  Quick Info
                </h4>

                <div className="space-y-4 text-xs font-medium text-ink-soft dark:text-white/70">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-teal-50/60 dark:bg-white/5 border border-teal-500/10 dark:border-white/5">
                    <Clock className="size-4 text-teal-600 dark:text-mint-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink dark:text-white block">Fast Response</span>
                      <p className="mt-0.5 text-ink-soft/70 dark:text-white/50">We usually respond within 24-48 hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-teal-50/60 dark:bg-white/5 border border-teal-500/10 dark:border-white/5">
                    <ShieldCheck className="size-4 text-teal-600 dark:text-mint-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink dark:text-white block">100% Privacy</span>
                      <p className="mt-0.5 text-ink-soft/70 dark:text-white/50">Your email is never shared or stored in mailing lists.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-teal-50/60 dark:bg-white/5 border border-teal-500/10 dark:border-white/5">
                    <HeartHandshake className="size-4 text-teal-600 dark:text-mint-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-ink dark:text-white block">Community Driven</span>
                      <p className="mt-0.5 text-ink-soft/70 dark:text-white/50">Tool suggestions directly shape our next updates!</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

          </motion.div>
        </div>
      </section>
    </>
  );
}