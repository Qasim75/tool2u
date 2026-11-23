import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRequestRunner } from '@/lib/requestRunner';

/**
 * useApiRequest
 * ----------------------------------------------------------------
 * Generic async-request hook: standardizes the loading/error/data/cancel
 * contract. The request lifecycle (latest-request-wins, cancel, reset) lives
 * in `lib/requestRunner.js`; this hook only mirrors it into React state.
 *
 * @template T
 * @param {(...args: any[]) => Promise<T>} requestFn
 */
export function useApiRequest(requestFn) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runner = useMemo(
    () =>
      createRequestRunner({
        onStart: () => {
          setIsLoading(true);
          setError(null);
        },
        onSuccess: (result) => setData(result),
        onError: (normalized) => setError(normalized),
        onSettled: () => setIsLoading(false),
        onCancel: () => setIsLoading(false),
      }),
    []
  );

  // Abort anything still running when the component unmounts.
  useEffect(() => () => runner.cancel(), [runner]);

  const requestFnRef = useRef(requestFn);
  requestFnRef.current = requestFn;

  const execute = useCallback((...args) => runner.run((...a) => requestFnRef.current(...a), ...args), [runner]);

  const cancel = useCallback(() => runner.cancel(), [runner]);

  const reset = useCallback(() => {
    runner.cancel(); // also invalidates any in-flight request so it can't repopulate `data` later
    setData(null);
    setError(null);
    setIsLoading(false);
  }, [runner]);

  return { data, error, isLoading, execute, cancel, reset };
}

export default useApiRequest;
