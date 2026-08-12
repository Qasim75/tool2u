import { useCallback, useMemo, useState } from 'react';
import { Play, Square, Eraser, RotateCcw, Copy, Download, ShieldCheck } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import SectionTitle from '@/components/ui/SectionTitle';
import CodeMirrorEditor from '@/components/tools/dev/CodeMirrorEditor';
import LanguageSelector from '@/components/tools/dev/LanguageSelector';
import ExecutionResultPanel from '@/components/tools/dev/ExecutionResultPanel';
import ErrorDisplay from '@/components/tools/dev/ErrorDisplay';
import { useClipboard } from '@/hooks/useClipboard';
import { useApiRequest } from '@/hooks/useApiRequest';
import { compileCode } from '@/lib/api/devToolsService';
import {
  CODE_EDITOR_LANGUAGES,
  CODE_EDITOR_LANGUAGE_OPTIONS,
  EXECUTABLE_LANGUAGES,
  getLanguageById,
} from '@/config/codeEditorLanguages';
import {
  ONLINE_CODE_EDITOR_INTRO,
  ONLINE_CODE_EDITOR_HOW_TO,
  ONLINE_CODE_EDITOR_USE_CASES,
} from '@/constants/onlineCodeEditorContent';
import { TOOL_FAQS } from '@/constants/faq';
import toast from 'react-hot-toast';

const DEFAULT_LANGUAGE = 'javascript';

export default function OnlineCodeEditor() {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [code, setCode] = useState(getLanguageById(DEFAULT_LANGUAGE).starter);
  const [stdin, setStdin] = useState('');
  const [wasStopped, setWasStopped] = useState(false);

  const { copy } = useClipboard();
  const { data, error, isLoading, execute, cancel, reset: resetRequest } = useApiRequest(compileCode);

  const activeLanguage = getLanguageById(language);
  const isExecutable = activeLanguage.executable;

  const handleLanguageChange = useCallback(
    (nextId) => {
      const previous = getLanguageById(language);
      // Only swap in the new starter snippet if the editor still holds the
      // previous language's starter (or is empty) — never overwrite real work.
      const isUnmodified = code.trim() === '' || code.trim() === previous.starter.trim();
      setLanguage(nextId);
      if (isUnmodified) {
        setCode(getLanguageById(nextId).starter);
      }
      setWasStopped(false);
      resetRequest();
    },
    [language, code, resetRequest]
  );

  const handleRun = useCallback(() => {
    if (!isExecutable) {
      toast.error(`Running ${activeLanguage.label} isn't supported yet — try one of the runnable languages below.`);
      return;
    }
    if (!code.trim()) {
      toast.error('Write some code first');
      return;
    }
    setWasStopped(false);
    execute({ language, code, stdin });
  }, [code, language, stdin, execute, isExecutable, activeLanguage.label]);

  const handleStop = useCallback(() => {
    setWasStopped(true);
    cancel();
  }, [cancel]);

  const handleClear = useCallback(() => {
    setCode('');
    setWasStopped(false);
    resetRequest();
  }, [resetRequest]);

  const handleReset = useCallback(() => {
    setCode(getLanguageById(language).starter);
    setStdin('');
    setWasStopped(false);
    resetRequest();
  }, [language, resetRequest]);

  const handleDownload = useCallback(() => {
    if (!code.trim()) {
      toast.error('Nothing to download yet');
      return;
    }
    const lang = getLanguageById(language);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${lang.fileExtension}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded');
  }, [code, language]);

  const faqs = TOOL_FAQS['online-code-editor'] || [];

  const toolbarActions = useMemo(
    () => [
      isLoading
        ? { key: 'stop', label: 'Stop', icon: Square, onClick: handleStop, variant: 'danger' }
        : { key: 'run', label: 'Run', icon: Play, onClick: handleRun, variant: 'primary', disabled: !isExecutable },
      { key: 'clear', label: 'Clear', icon: Eraser, onClick: handleClear, variant: 'secondary' },
      { key: 'reset', label: 'Reset', icon: RotateCcw, onClick: handleReset, variant: 'secondary' },
      { key: 'copy', label: 'Copy', icon: Copy, onClick: () => copy(code, 'Code copied!'), variant: 'secondary' },
      { key: 'download', label: 'Download', icon: Download, onClick: handleDownload, variant: 'secondary' },
    ],
    [isLoading, isExecutable, handleStop, handleRun, handleClear, handleReset, handleDownload, copy, code]
  );

  return (
    <div className="flex flex-col gap-10">
      {/* ---------- Editor workspace ---------- */}
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <LanguageSelector
            value={language}
            onChange={handleLanguageChange}
            languages={CODE_EDITOR_LANGUAGE_OPTIONS}
            containerClassName="w-full sm:w-56"
          />
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1.5 text-xs font-medium text-ink-soft dark:border-white/10 dark:text-white/60">
            <ShieldCheck className="size-3.5 text-emerald-500" aria-hidden="true" />
            Code runs in an isolated sandbox — never on your device
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          {/* Code editor + toolbar */}
          <div className="flex flex-col gap-4">
            <CodeMirrorEditor
              value={code}
              onChange={setCode}
              language={language}
              minHeight="380px"
              ariaLabel="Code editor"
            />
            <div className="flex flex-wrap gap-2.5">
              {toolbarActions.map((action) => (
                <Button
                  key={action.key}
                  variant={action.variant}
                  icon={action.icon}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  aria-label={action.label}
                >
                  {action.label}
                </Button>
              ))}
            </div>
            {!isExecutable && (
              <p className="text-xs text-ink-soft/70 dark:text-white/40">
                Running isn&apos;t available for {activeLanguage.label} yet. Runnable languages:{' '}
                {EXECUTABLE_LANGUAGES.map((l) => l.label).join(', ')}.
              </p>
            )}
          </div>

          {/* Program input + execution result */}
          <div className="flex flex-col gap-4">
            <Card className="p-5">
              <label htmlFor="stdin" className="mb-2 block text-sm font-medium text-ink-soft dark:text-white/70">
                Program input <span className="font-normal text-ink-soft/60 dark:text-white/40">(stdin, optional)</span>
              </label>
              <textarea
                id="stdin"
                rows={4}
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Values your program reads from standard input…"
                spellCheck={false}
                className="w-full resize-y rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 font-mono text-sm text-ink placeholder:text-ink-soft/50 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/60 dark:border-white/10 dark:bg-surface-dark dark:text-white"
              />
            </Card>

            {isLoading ? (
              <ExecutionResultPanel status="running" />
            ) : wasStopped ? (
              <Card className="border-ink/10 bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.02]">
                <p className="text-sm text-ink-soft dark:text-white/55">
                  Stopped waiting for a result. Note: this cancels the request from your browser's side — the
                  sandboxed job on the server may finish shortly after on its own, within its own time limit.
                </p>
              </Card>
            ) : error ? (
              <>
                <ExecutionResultPanel status="error" result={{ stderr: error.message }} />
                <ErrorDisplay message={error.message} title="Execution failed" />
              </>
            ) : data ? (
              <ExecutionResultPanel status={data.status} result={data} />
            ) : (
              <EmptyState icon={Play} title="No output yet" description="Click Run to execute your code in the sandbox." />
            )}
          </div>
        </div>
      </div>

      {/* ---------- SEO / explanatory content ---------- */}
      <div className="flex flex-col gap-10 border-t border-ink/10 pt-10 dark:border-white/10">
        <section>
          <SectionTitle eyebrow={ONLINE_CODE_EDITOR_INTRO.eyebrow} title={ONLINE_CODE_EDITOR_INTRO.title} />
          <div className="mt-4 flex max-w-3xl flex-col gap-3 text-sm leading-relaxed text-ink-soft dark:text-white/60">
            {ONLINE_CODE_EDITOR_INTRO.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle eyebrow={ONLINE_CODE_EDITOR_HOW_TO.eyebrow} title={ONLINE_CODE_EDITOR_HOW_TO.title} />
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {ONLINE_CODE_EDITOR_HOW_TO.steps.map((step, i) => (
              <li key={step.title} className="flex gap-3 rounded-card border border-ink/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-mint-500/15 text-xs font-semibold text-teal-700 dark:bg-mint-500/20 dark:text-mint-400">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink dark:text-white">{step.title}</p>
                  <p className="mt-1 text-sm text-ink-soft dark:text-white/55">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTitle eyebrow="Supported languages" title="Languages you can write and run" />
          <div className="mt-4 flex flex-wrap gap-2">
            {CODE_EDITOR_LANGUAGES.map((lang) => (
              <span
                key={lang.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft dark:border-white/10 dark:bg-surface-dark-raised dark:text-white/60"
              >
                {lang.label}
                {lang.executable && <span className="size-1.5 rounded-full bg-emerald-500" title="Runnable" aria-hidden="true" />}
              </span>
            ))}
          </div>
          <p className="mt-3 max-w-2xl text-sm text-ink-soft/80 dark:text-white/45">
            <span className="inline-flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" /> Runnable</span> languages
            execute in a sandboxed, isolated environment. The rest are fully editable with syntax highlighting; more
            languages are added by extending a single configuration file.
          </p>
        </section>

        <section>
          <SectionTitle eyebrow={ONLINE_CODE_EDITOR_USE_CASES.eyebrow} title={ONLINE_CODE_EDITOR_USE_CASES.title} />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {ONLINE_CODE_EDITOR_USE_CASES.items.map((item) => (
              <div key={item.title} className="rounded-card border border-ink/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                <p className="text-sm font-semibold text-ink dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm text-ink-soft dark:text-white/55">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {faqs.length > 0 && (
          <section>
            <SectionTitle eyebrow="FAQ" title="Frequently asked questions" />
            <div className="mt-5 flex max-w-3xl flex-col divide-y divide-ink/10 dark:divide-white/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-500/60 dark:text-white">
                    {faq.question}
                    <span className="shrink-0 text-ink-soft/60 transition-transform duration-150 group-open:rotate-45 dark:text-white/40" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/55">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
