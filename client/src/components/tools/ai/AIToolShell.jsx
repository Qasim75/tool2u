import { Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import CodeInputPanel from '@/components/tools/dev/CodeInputPanel';
import CodeOutputPanel from '@/components/tools/dev/CodeOutputPanel';
import ErrorDisplay from '@/components/tools/dev/ErrorDisplay';
import { apiClient } from '@/lib/api/apiClient';

/**
 * AIToolShell
 * ----------------------------------------------------------------
 * Shared layout for every planned AI developer tool (explainer, bug
 * detector, reviewer, optimizer, doc generator, test generator).
 * Phase 1 only builds the shell: input panel, an action button, and
 * a result panel wired to `useApiRequest` + a `devToolsService`
 * function passed in by the caller.
 *
 * Until a backend is configured (`VITE_API_BASE_URL`), the action
 * button stays disabled with a "Coming soon" notice instead of
 * silently failing — this is intentional so Phase 1 ships no AI
 * functionality, per the brief.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.actionLabel e.g. 'Explain code'
 * @param {{ input: string, setInput: (v:string)=>void, output: string, error: string|null, isLoading: boolean }} props.state
 * @param {() => void} props.onRun
 * @param {string} [props.language]
 */
export default function AIToolShell({ title, actionLabel = 'Run', state, onRun, language }) {
  const backendReady = apiClient.isBackendConfigured();

  return (
    <div className="flex flex-col gap-6">
      {!backendReady && (
        <Card className="flex items-center gap-3 border-amber-300/60 bg-amber-50 p-4 dark:border-amber-400/20 dark:bg-amber-500/[0.06]">
          <Sparkles className="size-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {title} is coming soon — the interface is ready, and it will activate once the AI backend is connected.
          </p>
        </Card>
      )}

      <CodeInputPanel
        label="Your code"
        value={state.input}
        onChange={state.setInput}
        language={language}
        placeholder="Paste the code you'd like AI help with…"
        actions={[
          {
            label: state.isLoading ? 'Working…' : actionLabel,
            onClick: onRun,
            disabled: !backendReady || !state.input.trim(),
            isLoading: state.isLoading,
          },
        ]}
      />

      <ErrorDisplay message={state.error} title="AI request failed" />

      <CodeOutputPanel label="Result" value={state.output} isLoading={false} downloadFileName="ai-result.txt" />
    </div>
  );
}
