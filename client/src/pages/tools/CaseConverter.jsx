import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Eraser, Type, Sparkles, Hash, AlignLeft, Check, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useClipboard } from '@/hooks/useClipboard';

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

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const { copy } = useClipboard();

  // Live Analytics Metrics
  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200);
    return { chars, words, sentences, readingTime };
  }, [text]);

  const convert = (type) => {
    if (!text) return;
    let result = '';

    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'slug':
        result = text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
        break;
      case 'camel':
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, (c) => c.toLowerCase());
        break;
      case 'pascal':
        result = text
          .toLowerCase()
          .replace(new RegExp(`(?:^|\\s+|-|_)+(\\w)`, 'g'), (m, c) => c.toUpperCase());
        break;
      case 'snake':
        result = text
          .trim()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '_')
          .toLowerCase();
        break;
      case 'toggle':
        result = text
          .split('')
          .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
          .join('');
        break;
      default:
        result = text;
    }
    setText(result);
  };

  const handleCopy = () => {
    copy(text, 'Text copied');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      <Card className="flex flex-col p-6 sm:p-8 rounded-3xl border border-ink/10 bg-white/80 dark:border-white/10 dark:bg-surface-dark-raised/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 via-mint-400 to-emerald-500 opacity-80" />

        {/* Header Badge */}
        <motion.div variants={slideFromLeft} className="flex items-center justify-between mb-4">
          <label htmlFor="case-input" className="text-sm font-bold text-ink dark:text-white flex items-center gap-2">
            <Type className="size-4 text-teal-600 dark:text-mint-400" />
            Input & Format Editor
          </label>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 dark:text-mint-400 bg-teal-50 dark:bg-white/5 px-2.5 py-1 rounded-full border border-teal-500/10 dark:border-white/5">
            <Sparkles className="size-3" /> Real-time Transformer
          </span>
        </motion.div>

        {/* Text Area */}
        <motion.div variants={zoomFromBack} className="relative">
          <textarea
            id="case-input"
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here…"
            className="w-full resize-none rounded-2xl border border-ink/10 bg-white/90 p-4 text-sm leading-relaxed text-ink placeholder:text-ink-soft/40 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 focus:outline-none dark:border-white/10 dark:bg-surface-dark dark:text-white shadow-2xs transition-all font-sans"
          />
        </motion.div>

        {/* Live Metrics Stats Strip */}
        <motion.div 
          variants={slideFromLeft}
          className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-2xl bg-teal-50/60 dark:bg-white/5 border border-teal-500/10 dark:border-white/5 text-xs text-ink-soft dark:text-white/60 font-medium"
        >
          <div className="flex items-center gap-1.5">
            <Hash className="size-3.5 text-teal-600 dark:text-mint-400" />
            <span>Characters:</span>
            <strong className="text-ink dark:text-white font-bold">{stats.chars}</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <AlignLeft className="size-3.5 text-teal-600 dark:text-mint-400" />
            <span>Words:</span>
            <strong className="text-ink dark:text-white font-bold">{stats.words}</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <Type className="size-3.5 text-teal-600 dark:text-mint-400" />
            <span>Sentences:</span>
            <strong className="text-ink dark:text-white font-bold">{stats.sentences}</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-teal-600 dark:text-mint-400" />
            <span>Read time:</span>
            <strong className="text-ink dark:text-white font-bold">{stats.readingTime} min</strong>
          </div>
        </motion.div>

        {/* Converter Action Buttons */}
        <motion.div variants={slideFromBottom} className="mt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-soft/60 dark:text-white/40 mb-3 block">
            Transform Cases:
          </span>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => convert('upper')} disabled={!text} className="text-xs font-bold rounded-xl">
              UPPERCASE
            </Button>
            <Button onClick={() => convert('lower')} disabled={!text} className="text-xs font-bold rounded-xl">
              lowercase
            </Button>
            <Button onClick={() => convert('title')} disabled={!text} className="text-xs font-bold rounded-xl">
              Title Case
            </Button>
            <Button onClick={() => convert('sentence')} disabled={!text} className="text-xs font-bold rounded-xl">
              Sentence case
            </Button>
            <Button onClick={() => convert('slug')} disabled={!text} className="text-xs font-bold rounded-xl">
              URL Slug
            </Button>
            <Button onClick={() => convert('camel')} disabled={!text} variant="secondary" className="text-xs font-bold rounded-xl">
              camelCase
            </Button>
            <Button onClick={() => convert('pascal')} disabled={!text} variant="secondary" className="text-xs font-bold rounded-xl">
              PascalCase
            </Button>
            <Button onClick={() => convert('snake')} disabled={!text} variant="secondary" className="text-xs font-bold rounded-xl">
              snake_case
            </Button>
            <Button onClick={() => convert('toggle')} disabled={!text} variant="secondary" className="text-xs font-bold rounded-xl">
              tOGGLE cASE
            </Button>
          </div>
        </motion.div>

        {/* Bottom Actions Bar */}
        <motion.div variants={slideFromRight} className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5 dark:border-white/10">
          <Button
            variant="secondary"
            icon={copied ? Check : Copy}
            onClick={handleCopy}
            disabled={!text}
            className="rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-600 hover:to-emerald-500 text-white font-semibold shadow-md active:scale-95 disabled:opacity-40"
          >
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </Button>

          <Button 
            variant="ghost" 
            icon={Eraser} 
            onClick={() => setText('')} 
            disabled={!text}
            className="rounded-xl text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-colors"
          >
            Clear Text
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
}