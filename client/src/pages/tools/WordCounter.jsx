import { useMemo, useState } from 'react';
import { Copy, Eraser, Type } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { useClipboard } from '@/hooks/useClipboard';
import { analyzeText, formatDuration } from '@/utils/wordStats';

const STAT_LABELS = [
  { key: 'wordCount', label: 'Words' },
  { key: 'charCount', label: 'Characters' },
  { key: 'charCountNoSpaces', label: 'Chars (no spaces)' },
  { key: 'paragraphCount', label: 'Paragraphs' },
  { key: 'sentenceCount', label: 'Sentences' },
];

export default function WordCounter() {
  const [text, setText] = useState('');
  const { copy } = useClipboard();
  const stats = useMemo(() => analyzeText(text), [text]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
      <Card className="flex flex-col p-6">
        <label htmlFor="word-counter-input" className="mb-2 text-sm font-medium text-ink-soft dark:text-white/70">
          Your text
        </label>
        <textarea
          id="word-counter-input"
          rows={14}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here…"
          className="w-full flex-1 resize-none rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/60 dark:border-white/10 dark:bg-surface-dark dark:text-white"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant="secondary"
            icon={Copy}
            onClick={() => copy(text, 'Text copied')}
            disabled={!text}
          >
            Copy text
          </Button>
          <Button variant="ghost" icon={Eraser} onClick={() => setText('')} disabled={!text}>
            Clear
          </Button>
        </div>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-2">
          {STAT_LABELS.map(({ key, label }) => (
            <div key={key}>
              <p className="text-xs uppercase tracking-wide text-ink-soft/70 dark:text-white/40">{label}</p>
              <p className="font-mono-num text-2xl font-semibold text-ink dark:text-white">{stats[key]}</p>
            </div>
          ))}
        </Card>

        <Card className="grid grid-cols-2 gap-4 p-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-soft/70 dark:text-white/40">Reading time</p>
            <p className="font-mono-num text-lg font-semibold text-ink dark:text-white">
              {formatDuration(stats.readingTimeMinutes)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-soft/70 dark:text-white/40">Speaking time</p>
            <p className="font-mono-num text-lg font-semibold text-ink dark:text-white">
              {formatDuration(stats.speakingTimeMinutes)}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <p className="mb-3 text-sm font-semibold text-ink dark:text-white">Most used words</p>
          {stats.mostUsedWords.length > 0 ? (
            <ul className="flex flex-col gap-2.5">
              {stats.mostUsedWords.map((w) => (
                <li key={w.word} className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft dark:text-white/60">{w.word}</span>
                  <span className="font-mono-num text-ink dark:text-white">
                    {w.count} · {w.density.toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={Type} title="No keywords yet" description="Start typing to see word frequency." />
          )}
        </Card>
      </div>
    </div>
  );
}
