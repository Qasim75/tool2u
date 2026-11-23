import { useState, useEffect } from 'react';
import { Copy, RefreshCw, ShieldCheck } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useClipboard } from '@/hooks/useClipboard';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const { copy } = useClipboard();

  const generate = () => {
    const charSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let allowedChars = '';
    if (options.uppercase) allowedChars += charSets.uppercase;
    if (options.lowercase) allowedChars += charSets.lowercase;
    if (options.numbers) allowedChars += charSets.numbers;
    if (options.symbols) allowedChars += charSets.symbols;

    if (!allowedChars) return setPassword('');

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      generatedPassword += allowedChars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  useEffect(() => {
    generate();
  }, []);

  const getStrength = () => {
    if (!password) return { label: 'Empty', color: 'bg-ink/10', width: '0%' };
    let score = 0;
    if (password.length > 8) score++;
    if (password.length > 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 4) return { label: 'Good', color: 'bg-amber-500', width: '66%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  };

  const strength = getStrength();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
      <Card className="p-6">
        <div className="relative mb-6">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full rounded-xl border border-ink/10 bg-paper-dim px-4 py-4 pr-12 font-mono text-xl font-semibold tracking-wider text-ink dark:border-white/10 dark:bg-surface-dark dark:text-white"
          />
          <button
            onClick={generate}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink dark:text-white/50 dark:hover:text-white"
            aria-label="Regenerate password"
          >
            <RefreshCw className="size-5" />
          </button>
        </div>

        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-ink-soft dark:text-white/70">Strength: {strength.label}</span>
            <span className="font-mono text-ink-soft dark:text-white/50">{strength.width}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink/5 dark:bg-white/5">
            <div
              className={`h-full transition-all duration-500 ${strength.color}`}
              style={{ width: strength.width }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1"
            icon={Copy}
            onClick={() => copy(password, 'Password copied')}
            disabled={!password}
          >
            Copy Password
          </Button>
          <Button variant="secondary" icon={RefreshCw} onClick={generate}>
            Regenerate
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-semibold text-ink dark:text-white">Settings</h3>
        
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <label className="text-ink-soft dark:text-white/70">Length: {length}</label>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-ink/10 dark:bg-white/10"
          />
        </div>

        <div className="space-y-3">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setOptions((prev) => ({ ...prev, [key]: !prev[key] }))}
                className="size-4 rounded border-ink/20 text-teal-600 focus:ring-teal-500 dark:border-white/20 dark:bg-surface-dark"
              />
              <span className="text-sm capitalize text-ink dark:text-white/80">{key}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
