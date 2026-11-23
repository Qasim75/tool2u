import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text, successMessage = 'Copied to clipboard') => {
      if (!text) {
        toast.error('Nothing to copy yet');
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success(successMessage);
        window.setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch {
        toast.error('Could not copy — try selecting the text manually');
        return false;
      }
    },
    [resetDelay]
  );

  return { copied, copy };
}
