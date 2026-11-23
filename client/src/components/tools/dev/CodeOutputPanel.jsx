import { Copy, Download } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { useClipboard } from '@/hooks/useClipboard';

/**
 * CodeOutputPanel
 * ----------------------------------------------------------------
 * Standard "output" card: label, copy/download actions, loading and
 * empty states. Generalizes the output block already used in
 * `pages/tools/GenericTool.jsx` so future tools (compiler output,
 * AI results) share the same shell.
 */
export default function CodeOutputPanel({
  label = 'Output',
  value,
  isLoading = false,
  loadingLabel = 'Processing…',
  downloadFileName = 'output.txt',
  emptyHint,
  className = '',
}) {
  const { copy } = useClipboard();

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <Loader label={loadingLabel} />
      </Card>
    );
  }

  if (!value) {
    return emptyHint ? (
      <Card className={`p-6 text-center text-sm text-ink-soft dark:text-white/50 ${className}`}>{emptyHint}</Card>
    ) : null;
  }

  return (
    <Card className={`p-6 ${className}`}>
      <label className="mb-2 block text-sm font-medium text-ink-soft dark:text-white/70">{label}</label>
      <div className="relative">
        <pre className="w-full overflow-x-auto whitespace-pre-wrap rounded-xl border border-ink/10 bg-paper-dim p-4 font-mono text-sm text-ink dark:border-white/10 dark:bg-surface-dark dark:text-white">
          {value}
        </pre>
        <div className="absolute right-2 top-2 flex gap-1.5">
          <Button variant="secondary" size="sm" icon={Copy} onClick={() => copy(value, 'Copied!')}>
            Copy
          </Button>
          <Button variant="secondary" size="sm" icon={Download} onClick={handleDownload}>
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
}
