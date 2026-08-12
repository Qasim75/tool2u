import Select from '@/components/ui/Select';
import { SUPPORTED_LANGUAGES } from '@/config/devToolsRegistry';

/**
 * LanguageSelector
 * ----------------------------------------------------------------
 * Thin wrapper around the existing `Select` UI component, scoped to
 * the language list every code tool will need (compiler, formatters,
 * AI tools). Pass `languages` to restrict the list for a specific
 * tool (e.g. a CSS-only formatter); defaults to every supported
 * language.
 */
export default function LanguageSelector({
  value,
  onChange,
  languages = SUPPORTED_LANGUAGES,
  label = 'Language',
  containerClassName,
  ...props
}) {
  return (
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      containerClassName={containerClassName}
      {...props}
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </Select>
  );
}
