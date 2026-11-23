import { useCallback, useState } from 'react';

/**
 * useToolState
 * ----------------------------------------------------------------
 * Shared state shape for "input -> process -> output" tools
 * (formatters, validators, converters, minifiers, AI tools, etc).
 *
 * Every developer/AI tool page currently re-implements the same
 * `useState` trio (input, output, error/loading) by hand. This hook
 * centralizes that so new tools (Phase 2+) can plug in a processing
 * function without re-writing boilerplate, and so the shape stays
 * consistent across every tool for easier testing and reuse.
 *
 * This hook holds state only — it never executes or evaluates code.
 * Processing functions passed to `run` must be pure, synchronous,
 * client-safe transforms (e.g. JSON.stringify, string regex, a
 * bundled formatter library) or must call the API layer in
 * `lib/api/devToolsService.js` for anything that needs a backend.
 *
 * @param {Object} [options]
 * @param {string} [options.initialInput='']
 * @param {string} [options.initialOutput='']
 */
export function useToolState({ initialInput = '', initialOutput = '' } = {}) {
  const [input, setInput] = useState(initialInput);
  const [output, setOutput] = useState(initialOutput);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState(null); // e.g. { durationMs, warnings: [] }

  const reset = useCallback(() => {
    setInput(initialInput);
    setOutput(initialOutput);
    setError(null);
    setIsLoading(false);
    setMeta(null);
  }, [initialInput, initialOutput]);

  const clearOutput = useCallback(() => {
    setOutput(initialOutput);
    setError(null);
    setMeta(null);
  }, [initialOutput]);

  /**
   * Run a synchronous or async processor against the current input.
   * Standardizes loading/error handling so tool components stay declarative.
   *
   * @param {(input: string) => (string | Promise<string>)} processor
   */
  const run = useCallback(
    async (processor) => {
      if (!input.trim()) {
        setError('Please provide some input first.');
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const result = await processor(input);
        setOutput(result ?? '');
        return result;
      } catch (err) {
        setError(err?.message || 'Something went wrong while processing your input.');
      } finally {
        setIsLoading(false);
      }
    },
    [input]
  );

  return {
    input,
    setInput,
    output,
    setOutput,
    error,
    setError,
    isLoading,
    setIsLoading,
    meta,
    setMeta,
    run,
    reset,
    clearOutput,
  };
}

export default useToolState;
