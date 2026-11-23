import { Upload } from 'lucide-react';
import Card from '@/components/ui/Card';
import CodeEditor from '@/components/tools/dev/CodeEditor';
import ErrorDisplay from '@/components/tools/dev/ErrorDisplay';
import ToolToolbar from '@/components/tools/dev/ToolToolbar';

/**
 * CodeInputPanel
 * ----------------------------------------------------------------
 * Standard "input" card used across developer tools: label, optional
 * file upload, code editor, inline error, and an action toolbar.
 * Generalizes the pattern already duplicated across
 * `pages/tools/JsonFormatter.jsx` and `pages/tools/GenericTool.jsx`
 * so new tools compose it instead of copy-pasting markup.
 */
export default function CodeInputPanel({
  label = 'Input',
  value,
  onChange,
  language,
  placeholder,
  rows,
  error,
  actions = [],
  onFileUpload,
  acceptFileTypes = '.txt,.json,.csv,.html,.css,.js,.xml,.md,.sql',
  className = '',
}) {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file || !onFileUpload) return;
    const reader = new FileReader();
    reader.onload = (ev) => onFileUpload(String(ev.target?.result ?? ''));
    reader.readAsText(file);
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-ink-soft dark:text-white/70">{label}</label>
        {onFileUpload && (
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-teal-700 hover:text-teal-600 dark:text-mint-400">
            <Upload className="size-3.5" />
            Upload file
            <input type="file" accept={acceptFileTypes} onChange={handleFile} className="hidden" />
          </label>
        )}
      </div>

      <CodeEditor value={value} onChange={onChange} language={language} placeholder={placeholder} rows={rows} error={!!error} />

      <ErrorDisplay message={error} />

      {actions.length > 0 && (
        <div className="mt-4">
          <ToolToolbar actions={actions} />
        </div>
      )}
    </Card>
  );
}
