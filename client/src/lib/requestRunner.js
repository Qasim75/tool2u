/**
 * requestRunner.js
 * ----------------------------------------------------------------
 * Framework-free lifecycle manager behind `useApiRequest`. Kept separate
 * (and dependency-free) so the tricky parts can be unit-tested in Node:
 *
 *  - only the LATEST request may update state (no stale results from an
 *    older run, a cancelled run, or a run started before Clear / language
 *    change, even if that runner can't actually be aborted — e.g. SQL)
 *  - an older request finishing can never switch the loading flag off while
 *    a newer one is still running
 *  - an AbortError on the *current* request (e.g. a client-side timeout) is
 *    reported as an error instead of being silently swallowed
 */
export function createRequestRunner({ onStart, onSuccess, onError, onSettled, onCancel }) {
  let current = null; // { id, controller }
  let counter = 0;

  const isCurrent = (id) => current !== null && current.id === id;

  async function run(requestFn, ...args) {
    current?.controller.abort();
    const id = ++counter;
    const controller = new AbortController();
    current = { id, controller };
    onStart?.();

    try {
      const result = await requestFn(...args, { signal: controller.signal });
      if (!isCurrent(id)) return undefined;
      onSuccess?.(result);
      return result;
    } catch (err) {
      if (!isCurrent(id)) return undefined; // cancelled / superseded: stay silent
      onError?.({
        message: err?.message || 'Request failed. Please try again.',
        status: err?.status ?? null,
        code: err?.code ?? 'unknown_error',
      });
      return undefined;
    } finally {
      if (isCurrent(id)) {
        current = null;
        onSettled?.();
      }
    }
  }

  /** Aborts the in-flight request (if any) and ignores whatever it eventually returns. */
  function cancel() {
    if (!current) return false;
    current.controller.abort();
    current = null;
    onCancel?.();
    return true;
  }

  return { run, cancel, isRunning: () => current !== null };
}
