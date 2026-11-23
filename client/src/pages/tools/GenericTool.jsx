import { useState, useCallback, useEffect } from 'react';
import { Copy, Eraser, Play, Download, Upload, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useClipboard } from '@/hooks/useClipboard';
import { toast } from 'react-hot-toast';

// ============ Utility Functions ============
const processTextTool = (toolId, input) => {
  if (!input) return '';
  switch (toolId) {
    case 'reverse-text':
      return input.split('').reverse().join('');
    case 'remove-duplicate-lines':
      return [...new Set(input.split('\n'))].join('\n');
    case 'remove-extra-spaces':
      return input.replace(/[ \t]+/g, ' ').replace(/^ | $/gm, '').trim();
    case 'text-sorter':
    case 'line-sorter':
      return input.split('\n').sort((a, b) => a.localeCompare(b)).join('\n');
    case 'sentence-counter':
      return `Sentences: ${input.split(/[.!?]+/).filter(Boolean).length}`;
    case 'paragraph-counter':
      return `Paragraphs: ${input.split(/\n\s*\n/).filter(Boolean).length}`;
    case 'line-counter':
      return `Lines: ${input.split('\n').length}`;
    case 'character-counter':
      return `Characters (with spaces): ${input.length}\nCharacters (without spaces): ${input.replace(/\s/g, '').length}`;
    case 'base64-encode':
      try { return btoa(unescape(encodeURIComponent(input))); } catch (e) { return 'Error: Invalid input for Base64 encoding'; }
    case 'base64-decode':
      try { return decodeURIComponent(escape(atob(input))); } catch (e) { return 'Error: Invalid Base64 input'; }
    case 'url-encode':
      return encodeURIComponent(input);
    case 'url-decode':
      try { return decodeURIComponent(input); } catch (e) { return 'Error: Invalid URL-encoded input'; }
    case 'html-encode':
      return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    case 'html-decode':
      return input.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    case 'rot13-encoder':
      return input.replace(/[a-zA-Z]/g, (c) =>
        String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)
      );
    case 'text-to-binary':
      return input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    case 'binary-to-text':
      try {
        return input.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
      } catch (e) { return 'Error: Invalid binary input. Use space-separated 8-bit binary.'; }
    case 'text-to-hex':
      return input.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    case 'hex-to-text':
      try {
        return input.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');
      } catch (e) { return 'Error: Invalid hex input. Use space-separated hex values.'; }
    case 'text-uppercase':
      return input.toUpperCase();
    case 'text-lowercase':
      return input.toLowerCase();
    case 'text-title-case':
      return input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    case 'text-sentence-case':
      return input.replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case 'text-alternating-case':
      return input.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
    case 'emoji-remover':
      return input.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, '');
    case 'html-to-text':
      return input.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    case 'url-extractor': {
      const urls = input.match(/https?:\/\/[^\s<>"]+/g) || [];
      return urls.length > 0 ? urls.join('\n') : 'No URLs found in the text.';
    }
    case 'email-extractor': {
      const emails = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      return emails.length > 0 ? [...new Set(emails)].join('\n') : 'No email addresses found in the text.';
    }
    case 'text-shuffle':
      return input.split('\n').sort(() => Math.random() - 0.5).join('\n');
    case 'text-indent':
      return input.split('\n').map(line => '  ' + line).join('\n');
    case 'leetspeak-generator': {
      const leetMap = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'g': '9', 'b': '8' };
      return input.toLowerCase().split('').map(c => leetMap[c] || c).join('');
    }
    case 'strikethrough-text':
      return input.split('').join('\u0336') + '\u0336';
    case 'upside-down-text': {
      const flipMap = { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ʃ', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', '.': '˙', ',': '\'', '?': '¿', '!': '¡' };
      return input.toLowerCase().split('').map(c => flipMap[c] || c).reverse().join('');
    }
    case 'word-frequency-analyzer': {
      const words = input.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
      const freq = {};
      words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
      return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([w, c]) => `${w}: ${c}`).join('\n') || 'No words found.';
    }
    case 'content-length-checker': {
      const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
      const charCount = input.length;
      const readTime = Math.ceil(wordCount / 200);
      return `Words: ${wordCount}\nCharacters: ${charCount}\nEstimated reading time: ${readTime} min\n\nSEO Recommendation: ${wordCount < 300 ? 'Too short — aim for 1500+ words for better ranking' : wordCount < 1500 ? 'Good start — consider expanding to 1500+ words' : 'Great length for SEO!'}`;
    }
    case 'html-minifier':
      return input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').replace(/<!--[\s\S]*?-->/g, '').trim();
    case 'css-minifier':
      return input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').replace(/;}/g, '}').trim();
    case 'js-minifier':
      return input.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1').trim();
    case 'sql-formatter': {
      const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX'];
      let formatted = input.toUpperCase().replace(/\s+/g, ' ');
      keywords.forEach(kw => { formatted = formatted.replace(new RegExp(`\\b${kw}\\b`, 'g'), `\n${kw}`); });
      return formatted.trim();
    }
    case 'csv-to-json': {
      try {
        const lines = input.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        const result = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          const obj = {};
          headers.forEach((h, i) => { obj[h] = values[i] || ''; });
          return obj;
        });
        return JSON.stringify(result, null, 2);
      } catch (e) { return `Error: ${e.message}`; }
    }
    case 'uuid-generator': {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }
    default:
      return input;
  }
};

export default function GenericTool({ toolId }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const { copy } = useClipboard();

  // Instant live-transform for light text formatting tools
  const isInstantTool = [
    'text-uppercase',
    'text-lowercase',
    'reverse-text',
    'remove-extra-spaces',
    'character-counter',
    'line-counter'
  ].includes(toolId);

  useEffect(() => {
    if (isInstantTool && input) {
      setOutput(processTextTool(toolId, input));
    }
  }, [input, toolId, isInstantTool]);

  const process = useCallback(() => {
    const result = processTextTool(toolId, input);
    setOutput(result);
    if (result && !result.startsWith('Error:')) {
      toast.success('Processed successfully!');
    } else if (result.startsWith('Error:')) {
      toast.error(result);
    } else {
      toast.error('Could not process input. Please check your data.');
    }
  }, [toolId, input]);

  const handleCopy = () => {
    if (!output) return;
    copy(output, 'Copied!');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${toolId}-output.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('File downloaded!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setInput(ev.target.result);
        toast.success('File loaded!');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Input Card */}
      <Card className="p-6 transition-all duration-200 hover:shadow-md">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-ink-soft dark:text-white/70">
            Input Text
          </label>
          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-teal-500/20 bg-teal-50/50 px-2.5 py-1 text-xs font-medium text-teal-700 transition-colors hover:bg-teal-100 dark:bg-teal-950/30 dark:text-mint-400 dark:hover:bg-teal-900/40"
          >
            <Upload className="size-3.5" />
            Upload file
            <input
              type="file"
              accept=".txt,.json,.csv,.html,.css,.js,.xml,.md,.sql"
              onChange={handleFileUpload}
              className="hidden"
            />
          </motion.label>
        </div>

        <textarea
          rows={7}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full resize-y rounded-xl border border-ink/10 bg-white px-4 py-3 font-mono text-sm text-ink transition-all focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-surface-dark dark:text-white dark:focus:border-mint-400"
          placeholder="Type or paste content here..."
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button icon={Play} onClick={process} disabled={!input.trim()}>
              Process Output
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              icon={Eraser}
              onClick={() => { setInput(''); setOutput(''); }}
              disabled={!input && !output}
            >
              Clear
            </Button>
          </motion.div>
        </div>
      </Card>

      {/* Output Card with Reveal Animation */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Card className="relative p-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-ink-soft dark:text-white/70">
                  Output Result
                </label>
                <div className="flex gap-2">
                  <motion.div whileTap={{ scale: 0.92 }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={isCopied ? CheckCircle2 : Copy}
                      onClick={handleCopy}
                    >
                      {isCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </motion.div>

                  <motion.div whileTap={{ scale: 0.92 }}>
                    <Button variant="secondary" size="sm" icon={Download} onClick={handleDownload}>
                      Download
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="relative mt-2">
                <pre className="max-h-[400px] w-full overflow-auto rounded-xl border border-ink/10 bg-paper-dim p-4 font-mono text-sm text-ink whitespace-pre-wrap break-words dark:border-white/10 dark:bg-surface-dark dark:text-white">
                  {output}
                </pre>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}