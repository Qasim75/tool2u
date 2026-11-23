import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, Gift, Clock, Sparkles, Hourglass, RotateCcw } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Fluid cubic-bezier curve
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

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();

    if (birth > now) return; // Ignore future dates

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Exact Next Birthday Calculation
    let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (now > nextBirthday) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const diffTime = Math.abs(nextBirthday - now);
    const nextBdayDaysTotal = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nextBdayMonths = Math.floor(nextBdayDaysTotal / 30.4375);
    const nextBdayDaysRem = Math.floor(nextBdayDaysTotal % 30.4375);

    // Total Lifespan Stats
    const totalDaysLived = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    const totalHoursLived = Math.floor((now - birth) / (1000 * 60 * 60));

    setAge({
      years,
      months,
      days,
      nextBdayMonths,
      nextBdayDaysRem,
      totalDaysLived,
      totalHoursLived,
    });
  };

  const handleReset = () => {
    setBirthDate('');
    setAge(null);
  };

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-2 items-start"
    >
      {/* Input Form Card */}
      <motion.div variants={slideFromLeft}>
        <Card className="p-6 sm:p-8 rounded-3xl border border-ink/10 bg-white/80 dark:border-white/10 dark:bg-surface-dark-raised/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 via-mint-400 to-emerald-500 opacity-80" />

          <div className="flex items-center gap-2 mb-6 text-xs font-semibold text-teal-700 dark:text-mint-400">
            <Sparkles className="size-4 animate-pulse" />
            <span>Age & Time Engine</span>
          </div>

          <label htmlFor="birthdate" className="mb-2 block text-sm font-semibold text-ink dark:text-white">
            Select Date of Birth
          </label>

          <div className="flex flex-col gap-5">
            <input
              type="date"
              id="birthdate"
              max={todayStr}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-2xl border border-ink/10 bg-white/90 px-4 py-3.5 text-ink font-medium focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none dark:border-white/10 dark:bg-surface-dark dark:text-white shadow-2xs transition-all"
            />

            <div className="flex items-center gap-3">
              <Button
                icon={Calculator}
                onClick={calculateAge}
                disabled={!birthDate}
                className="flex-1 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-600 hover:to-emerald-500 text-white font-semibold py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 disabled:opacity-40"
              >
                Calculate Age
              </Button>

              {birthDate && (
                <button
                  onClick={handleReset}
                  className="p-3.5 rounded-2xl border border-ink/10 bg-paper-dim dark:border-white/10 dark:bg-surface-dark text-ink-soft hover:text-ink dark:text-white/60 dark:hover:text-white transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="size-5" />
                </button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Result Display Dashboard */}
      <AnimatePresence mode="wait">
        {age ? (
          <motion.div
            key="result"
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="p-6 sm:p-8 rounded-3xl border border-ink/10 bg-white/80 dark:border-white/10 dark:bg-surface-dark-raised/80 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-mint-400 to-teal-500 opacity-80" />

              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft/70 dark:text-white/50 mb-6 flex items-center justify-center gap-1.5">
                <Clock className="size-3.5 text-teal-600 dark:text-mint-400" />
                Your Current Age
              </p>

              {/* Main Age Stats Grid */}
              <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-teal-50/60 dark:bg-white/5 border border-teal-500/10 dark:border-white/5 mb-6">
                <div className="flex flex-col items-center">
                  <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-700 via-emerald-600 to-mint-500 bg-clip-text text-transparent dark:from-mint-300 dark:to-emerald-400">
                    {age.years}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink-soft dark:text-white/50">Years</p>
                </div>

                <div className="flex flex-col items-center border-x border-ink/10 dark:border-white/10 px-2">
                  <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-700 via-emerald-600 to-mint-500 bg-clip-text text-transparent dark:from-mint-300 dark:to-emerald-400">
                    {age.months}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink-soft dark:text-white/50">Months</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-700 via-emerald-600 to-mint-500 bg-clip-text text-transparent dark:from-mint-300 dark:to-emerald-400">
                    {age.days}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-ink-soft dark:text-white/50">Days</p>
                </div>
              </div>

              {/* Extra Analytics Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/80 dark:bg-surface-dark border border-ink/5 dark:border-white/5 text-xs text-ink-soft dark:text-white/70">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Gift className="size-4 text-rose-500 animate-bounce" /> Next Birthday
                  </span>
                  <span className="font-bold text-teal-700 dark:text-mint-400">
                    {age.nextBdayMonths} mos {age.nextBdayDaysRem} days
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-ink-soft dark:text-white/60">
                  <div className="p-2.5 rounded-xl bg-white/60 dark:bg-surface-dark/60 border border-ink/5 dark:border-white/5 flex items-center justify-between">
                    <span className="flex items-center gap-1"><Hourglass className="size-3 text-teal-600 dark:text-mint-400" /> Total Days</span>
                    <span className="font-bold text-ink dark:text-white">{age.totalDaysLived.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/60 dark:bg-surface-dark/60 border border-ink/5 dark:border-white/5 flex items-center justify-between">
                    <span className="flex items-center gap-1"><Clock className="size-3 text-teal-600 dark:text-mint-400" /> Total Hours</span>
                    <span className="font-bold text-ink dark:text-white">{age.totalHoursLived.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            variants={zoomFromBack}
            initial="hidden"
            animate="visible"
          >
            <Card className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-dashed border-ink/20 dark:border-white/20 bg-white/40 dark:bg-surface-dark/40 backdrop-blur-md">
              <div className="p-4 rounded-full bg-teal-500/10 text-teal-600 dark:text-mint-400 mb-4 animate-pulse">
                <Calendar className="size-8" />
              </div>
              <h3 className="text-base font-bold text-ink dark:text-white">Awaiting Birth Date</h3>
              <p className="mt-1.5 text-xs text-ink-soft dark:text-white/50 max-w-xs">
                Select your birth date above to reveal detailed age metrics and birthday countdowns.
              </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}