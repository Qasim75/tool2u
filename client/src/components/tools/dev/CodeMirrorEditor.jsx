import { useEffect, useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from '@/hooks/useTheme';
import { getLanguageById } from '@/config/codeEditorLanguages';
import { cn } from '@/utils/cn';

/**
 * CodeMirrorEditor
 * ----------------------------------------------------------------
 * Syntax-highlighted code editor for the Online Code Editor tool.
 * Wraps `@uiw/react-codemirror` (CodeMirror 6) and:
 *   - loads only the selected language's parser on demand
 *   - follows the site's light/dark theme automatically
 *   - never executes, imports, or evaluates the code it displays —
 *     it is a pure text editor with highlighting.
 *
 * This is intentionally a separate component from the lightweight
 * `components/tools/dev/CodeEditor.jsx` textarea, which stays as-is
 * for simple, non-highlighted tools (formatters, minifiers, etc).
 */
export default function CodeMirrorEditor({
  value,
  onChange,
  language = 'javascript',
  readOnly = false,
  minHeight = '360px',
  className = '',
  ariaLabel = 'Code editor',
}) {
  const { theme } = useTheme();
  const [extension, setExtension] = useState(null);
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoadingLanguage(true);
    const lang = getLanguageById(language);

    lang
      .loadExtension()
      .then((ext) => {
        if (!cancelled) setExtension(() => ext);
      })
      .catch(() => {
        // If a specific language parser fails to load (e.g. offline),
        // fall back to plain-text editing rather than breaking the editor.
        if (!cancelled) setExtension(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingLanguage(false);
      });

    return () => {
      cancelled = true;
    };
  }, [language]);

  const extensions = useMemo(() => {
    const list = [EditorView.lineWrapping];
    if (extension) list.push(extension);
    return list;
  }, [extension]);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-ink/10 bg-white dark:border-white/10 dark:bg-surface-dark',
        'focus-within:border-mint-500 focus-within:ring-2 focus-within:ring-mint-500/60',
        isLoadingLanguage && 'opacity-90',
        className
      )}
      role="group"
      aria-label={ariaLabel}
      aria-busy={isLoadingLanguage}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={theme === 'dark' ? oneDark : 'light'}
        extensions={extensions}
        readOnly={readOnly}
        minHeight={minHeight}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          indentOnInput: true,
        }}
        className="font-mono text-sm"
      />
    </div>
  );
}
