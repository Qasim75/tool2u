import { useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Wifi } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import EmptyState from '@/components/ui/EmptyState';
import { useClipboard } from '@/hooks/useClipboard';
import { downloadDataUrl } from '@/utils/download';
import { QR_TYPES, buildQrPayload, validateQrFields } from '@/utils/qr';
import { cn } from '@/utils/cn';

const INITIAL_FIELDS = {
  url: '',
  text: '',
  phone: '',
  email: '',
  subject: '',
  body: '',
  ssid: '',
  password: '',
  security: 'WPA',
  hidden: false,
};

export default function QrCodeGenerator() {
  const [type, setType] = useState('url');
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [qrImage, setQrImage] = useState(null);
  const [payload, setPayload] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { copy } = useClipboard();

  const setField = (key, value) => setFields((prev) => ({ ...prev, [key]: value }));

  const handleGenerate = async () => {
    const validationErrors = validateQrFields(type, fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setQrImage(null);
      return;
    }

    const value = buildQrPayload(type, fields);
    setIsGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(value, {
        width: 320,
        margin: 2,
        color: { dark: '#1b1f23', light: '#ffffff' },
      });
      setQrImage(dataUrl);
      setPayload(value);
    } catch {
      setErrors({ general: 'Could not generate a QR code for this input.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!qrImage) return;
    downloadDataUrl(`qr-${type}-${Date.now()}.png`, qrImage);
  };

  const handleCopyText = () => {
    if (!payload) return;
    copy(payload, 'Encoded text copied');
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Card className="p-6">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="QR code type">
          {QR_TYPES.map((qrType) => (
            <button
              key={qrType.id}
              role="tab"
              aria-selected={type === qrType.id}
              onClick={() => {
                setType(qrType.id);
                setErrors({});
                setQrImage(null);
              }}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                type === qrType.id
                  ? 'border-transparent bg-cat-utilities text-white'
                  : 'border-ink/10 text-ink-soft hover:border-ink/20 dark:border-white/10 dark:text-white/60'
              )}
            >
              {qrType.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {type === 'url' && (
            <Input
              label="URL"
              placeholder="https://example.com"
              value={fields.url}
              onChange={(e) => setField('url', e.target.value)}
              error={errors.url}
            />
          )}

          {type === 'text' && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="qr-text" className="text-sm font-medium text-ink-soft dark:text-white/70">
                Text
              </label>
              <textarea
                id="qr-text"
                rows={4}
                placeholder="Any message to encode…"
                value={fields.text}
                onChange={(e) => setField('text', e.target.value)}
                className="w-full resize-none rounded-xl border border-ink/10 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-mint-500 focus:outline-none focus:ring-2 focus:ring-mint-500/60 dark:border-white/10 dark:bg-surface-dark dark:text-white"
              />
              {errors.text && <p className="text-xs font-medium text-red-500" role="alert">{errors.text}</p>}
            </div>
          )}

          {type === 'phone' && (
            <Input
              label="Phone number"
              placeholder="+92 300 1234567"
              value={fields.phone}
              onChange={(e) => setField('phone', e.target.value)}
              error={errors.phone}
            />
          )}

          {type === 'email' && (
            <>
              <Input
                label="Email address"
                type="email"
                placeholder="someone@example.com"
                value={fields.email}
                onChange={(e) => setField('email', e.target.value)}
                error={errors.email}
              />
              <Input
                label="Subject (optional)"
                placeholder="Subject line"
                value={fields.subject}
                onChange={(e) => setField('subject', e.target.value)}
              />
              <Input
                label="Body (optional)"
                placeholder="Pre-filled message"
                value={fields.body}
                onChange={(e) => setField('body', e.target.value)}
              />
            </>
          )}

          {type === 'wifi' && (
            <>
              <Input
                label="Network name (SSID)"
                placeholder="MyHomeWiFi"
                value={fields.ssid}
                onChange={(e) => setField('ssid', e.target.value)}
                error={errors.ssid}
              />
              <Select
                label="Security"
                value={fields.security}
                onChange={(e) => setField('security', e.target.value)}
              >
                <option value="WPA">WPA / WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No password</option>
              </Select>
              {fields.security !== 'nopass' && (
                <Input
                  label="Password"
                  type="text"
                  placeholder="WiFi password"
                  value={fields.password}
                  onChange={(e) => setField('password', e.target.value)}
                  error={errors.password}
                  icon={Wifi}
                />
              )}
            </>
          )}

          {errors.general && <p className="text-xs font-medium text-red-500" role="alert">{errors.general}</p>}
        </div>

        <Button className="mt-5" icon={QrCode} onClick={handleGenerate} isLoading={isGenerating}>
          Generate QR code
        </Button>
      </Card>

      <Card className="flex flex-col items-center justify-center gap-4 p-6">
        {qrImage ? (
          <>
            <img
              src={qrImage}
              alt="Generated QR code"
              className="aspect-square w-full max-w-[280px] rounded-xl border border-ink/10 bg-white p-3 dark:border-white/10"
            />
            <div className="flex w-full gap-3">
              <Button variant="secondary" icon={Download} onClick={handleDownload} className="flex-1">
                Download PNG
              </Button>
              <Button variant="secondary" icon={Copy} onClick={handleCopyText} className="flex-1">
                Copy text
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            icon={QrCode}
            title="Your QR code will appear here"
            description="Fill in the details on the left and click Generate."
          />
        )}
      </Card>
    </div>
  );
}
