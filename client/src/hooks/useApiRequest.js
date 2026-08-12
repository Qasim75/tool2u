import { useCallback, useRef, useState } from 'react';

/**
 * useApiRequest
 * ----------------------------------------------------------------
 * Generic async-request hook for future backend-powered tools
 * (the online compiler, AI code explainer/reviewer/etc). Nothing in
 * Phase 1 calls a real backend yet — this only standardizes the
 * loading/error/data/cancel contract so Phase 2+ can wire in
 * `lib/api/devToolsService.js` calls without inventing new state
 * patterns per tool.
 *
 * @template T
 * @param {(...args: any[]) => Promise<T>} requestFn
 */
export function useApiRequest(requestFn) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(null);

  const execute = useCallback(
    async (...args) => {
      // Cancel any in-flight request for this hook instance.
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const result = await requestFn(...args, { signal: controller.signal });
        setData(result);
        return result;
      } catch (err) {
        if (err?.name === 'AbortError') return undefined;
        const normalized = {
          message: err?.message || 'Request failed. Please try again.',
          status: err?.status ?? null,
          code: err?.code ?? 'unknown_error',
        };
        setError(normalized);
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [requestFn]
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { data, error, isLoading, execute, cancel, reset };
}

export default useApiRequest;
