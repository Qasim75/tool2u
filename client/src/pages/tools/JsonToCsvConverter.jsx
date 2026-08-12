import { useRef, useState } from 'react';
import { Upload, CheckCircle2, FileDown, Copy, Eraser, Eye, EyeOff } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ErrorState from '@/components/ui/ErrorState';
import { useClipboard } from '@/hooks/useClipboard';
import { parseJsonSafely, jsonToCsv } from '@/utils/jsonToCsv';
import { downloadTextFile } from '@/utils/download';

export default function JsonToCsvConverter() {
  const [rawJson, setRawJson] = useState('');
  const [error, setError] = useState('');
  const [csv, setCsv] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const { copy } = useClipboard();

  const handleValidate = () => {
    if (!rawJson.trim()) {
      setError('Paste or upload some JSON first.');
      return false;
    }
    const { error: parseError } = parseJsonSafely(rawJson);
    if (parseError) {
      setError(`Invalid JSON: ${parseError}`);
      return false;
    }
    setError('');
    return true;
  };

  const handleConvert = () => {
    if (!handleValidate()) {
      setCsv('');
      return;
    }
    const { data } = parseJsonSafely(rawJson);
    try {
      const result = jsonToCsv(data);
      setCsv(result);
      setError('');
    } catch (err) {
      setError(err.message);
      setCsv('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawJson(String(reader.result || ''));
      setCsv('');
      setError('');
    };
    reader.onerror = () => setError('Could not read that file. Please try again.');
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClear = () => {
    setRawJson('');
    setCsv('');
    setError('');
    setShowPreview(false);
  };

  const prettyJson = (() => {
    const { data } = parseJsonSafely(rawJson);
    if (!data) return null;
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return null;
    }
  })();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="flex flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="json-input" className="text-sm font-medium text-ink-soft dark:text-white/70">
            Paste JSON
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview((v) => !v)}
              disabled={!prettyJson}
              className="flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-ink disabled:opacity-40 dark:text-white/50 dark:hover:text-white"
            >
              {showPreview ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              {showPreview ? 'Raw' : 'Pretty preview'}
            </button>
          </div>
        </div>

        <textarea
          id="json-input"
          rows={14}
          value={showPreview && prettyJson ? prettyJson : rawJson}
          onChange={(e) => {
            setRawJson(e.target.value);
            setCsv('');
          }}
          readOnly={showPreview}
          placeholder='[{ "name": "Ali", "age": 21 }, { "name": "Sara", "age": 23 }]'
          className="w-full flex-1 resize-none rounded-xl border border-ink/10 bg-white px-4 py-3 font-mono-num text-sm leading-relaxed text-ink placeholder:text-ink-soft/50 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/60 dark:border-white/10 dark:bg-surface-dark dark:text-white"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="secondary" icon={Upload} onClick={() => fileInputRef.current?.click()}>
            Upload JSON file
          </Button>
          <Button variant="secondary" icon={CheckCircle2} onClick={handleValidate}>
            Validate
          </Button>
          <Button icon={FileDown} onClick={handleConvert}>
            Convert to CSV
          </Button>
          <Button variant="ghost" icon={Eraser} onClick={handleClear}>
            Clear
          </Button>
        </div>

        {error && <p className="mt-3 text-xs font-medium text-red-500" role="alert">{error}</p>}
      </Card>

      <Card className="flex flex-col p-6">
        <p className="mb-2 text-sm font-medium text-ink-soft dark:text-white/70">CSV output</p>
        {csv ? (
          <>
            <pre className="max-h-[360px] flex-1 overflow-auto rounded-xl border border-ink/10 bg-paper-dim px-4 py-3 font-mono-num text-xs leading-relaxed text-ink dark:border-white/10 dark:bg-white/5 dark:text-white">
{csv}
            </pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                icon={FileDown}
                onClick={() => downloadTextFile(`converted-${Date.now()}.csv`, csv, 'text/csv')}
              >
                Download CSV
              </Button>
              <Button variant="secondary" icon={Copy} onClick={() => copy(csv, 'CSV copied')}>
                Copy CSV
              </Button>
            </div>
          </>
        ) : error ? (
          <ErrorState title="Conversion failed" description={error} onRetry={handleConvert} />
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-ink/15 py-16 text-center text-sm text-ink-soft dark:border-white/15 dark:text-white/40">
            Your converted CSV will appear here.
          </div>
        )}
      </Card>
    </div>
  );
}
