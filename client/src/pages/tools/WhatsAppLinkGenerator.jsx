import { useState } from 'react';
import QRCode from 'qrcode';
import { MessageCircle, Copy, ExternalLink, QrCode as QrCodeIcon, Download } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useClipboard } from '@/hooks/useClipboard';
import { downloadDataUrl } from '@/utils/download';
import { COUNTRY_CODES, buildWhatsAppLink, validateWhatsAppNumber } from '@/utils/whatsapp';

export default function WhatsAppLinkGenerator() {
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [link, setLink] = useState('');
  const [qrImage, setQrImage] = useState(null);
  const { copy } = useClipboard();

  const handleGenerate = async () => {
    const validationError = validateWhatsAppNumber(phoneNumber);
    setError(validationError || '');
    if (validationError) {
      setLink('');
      setQrImage(null);
      return;
    }
    const generatedLink = buildWhatsAppLink(countryCode, phoneNumber, message);
    setLink(generatedLink);
    setQrImage(null);
  };

  const handleGenerateQr = async () => {
    if (!link) return;
    const dataUrl = await QRCode.toDataURL(link, {
      width: 280,
      margin: 2,
      color: { dark: '#1b1f23', light: '#ffffff' },
    });
    setQrImage(dataUrl);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
          <Select label="Country code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </Select>
          <Input
            label="Phone number"
            placeholder="300 1234567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={error}
          />
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <label htmlFor="wa-message" className="text-sm font-medium text-ink-soft dark:text-white/70">
            Message (optional)
          </label>
          <textarea
            id="wa-message"
            rows={3}
            placeholder="Hi! I'd like to know more about…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-xl border border-ink/10 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/60 dark:border-white/10 dark:bg-surface-dark dark:text-white"
          />
        </div>

        <Button className="mt-5" icon={MessageCircle} onClick={handleGenerate}>
          Generate link
        </Button>
      </Card>

      {link && (
        <Card className="relative overflow-hidden p-6">
          <span className="absolute inset-x-0 top-0 h-1 bg-cat-productivity" aria-hidden="true" />
          <p className="text-sm font-medium text-ink-soft dark:text-white/55">Your WhatsApp link</p>
          <p className="mt-1 break-all rounded-lg bg-paper-dim px-3.5 py-2.5 font-mono-num text-sm text-ink dark:bg-white/5 dark:text-white">
            {link}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" icon={Copy} onClick={() => copy(link, 'Link copied')}>
              Copy link
            </Button>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Button icon={ExternalLink}>Open WhatsApp</Button>
            </a>
            <Button variant="secondary" icon={QrCodeIcon} onClick={handleGenerateQr}>
              Generate QR
            </Button>
          </div>

          {qrImage && (
            <div className="mt-6 flex flex-col items-center gap-3 border-t border-ink/10 pt-6 dark:border-white/10">
              <img
                src={qrImage}
                alt="QR code for WhatsApp chat link"
                className="w-full max-w-[200px] rounded-xl border border-ink/10 bg-white p-3 dark:border-white/10"
              />
              <Button
                variant="ghost"
                size="sm"
                icon={Download}
                onClick={() => downloadDataUrl(`whatsapp-qr-${Date.now()}.png`, qrImage)}
              >
                Download PNG
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
