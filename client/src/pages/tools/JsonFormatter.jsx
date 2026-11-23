import { useState } from 'react';
import { Copy, Eraser, Check, XCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useClipboard } from '@/hooks/useClipboard';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const { copy } = useClipboard();

  const formatJson = (spaces = 2) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="json-input" className="text-sm font-medium text-ink-soft dark:text-white/70">
            JSON Input
          </label>
          {error ? (
            <span className="flex items-center gap-1 text-xs font-medium text-red-500">
              <XCircle className="size-3" /> Invalid JSON
            </span>
          ) : input.trim() ? (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
              <Check className="size-3" /> Valid JSON
            </span>
          ) : null}
        </div>
        
        <textarea
          id="json-input"
          rows={12}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here…"
          className={`w-full flex-1 resize-none rounded-xl border bg-white px-4 py-3 font-mono text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 dark:bg-surface-dark dark:text-white ${
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-ink/10 focus:border-mint-500 focus:ring-mint-500/60 dark:border-white/10'
          }`}
        />

        {error && (
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => formatJson(2)} disabled={!input}>Format (2 spaces)</Button>
          <Button onClick={() => formatJson(4)} disabled={!input}>Format (4 spaces)</Button>
          <Button onClick={minifyJson} disabled={!input}>Minify</Button>
          <div className="h-8 w-px bg-ink/10 dark:bg-white/10 mx-1 hidden sm:block" />
          <Button
            variant="secondary"
            icon={Copy}
            onClick={() => copy(input, 'JSON copied')}
            disabled={!input || error}
          >
            Copy
          </Button>
          <Button variant="ghost" icon={Eraser} onClick={() => { setInput(''); setError(null); }}>
            Clear
          </Button>
        </div>
      </Card>
    </div>
  );
}
