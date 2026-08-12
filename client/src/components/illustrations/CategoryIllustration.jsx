// Hand-drawn, line-art illustrations — one per tool category.
//
// These replace generic stock photography with lightweight inline SVG
// that matches the Tool2U "Swiss clarity + tactile depth" design
// system: currentColor outlines for the ink layer, the category's own
// accent color for the highlight shapes. No network request, no raster
// weight, crisp at any size, and themable for dark mode automatically.

const STROKE = 3;

function Base({ className, children, viewBox = '0 0 200 160' }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const ILLUSTRATIONS = {
  students: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <path d="M100 42 L172 68 L100 94 L28 68 Z" fill={`color-mix(in srgb, ${color} 22%, transparent)`} stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" />
      <path d="M56 80 V112 C56 120 76 128 100 128 C124 128 144 120 144 112 V80" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M172 68 V102" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      <circle cx="172" cy="110" r="5" fill={color} />
      <path d="M42 40 L48 34 L54 40" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="150" cy="34" r="3" fill={color} />
      <circle cx="164" cy="26" r="2" fill={color} />
    </Base>
  ),
  developers: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <rect x="26" y="32" width="148" height="96" rx="10" stroke="currentColor" strokeWidth={STROKE} fill="none" />
      <path d="M26 54 H174" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="40" cy="43" r="3" fill={color} />
      <circle cx="52" cy="43" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="64" cy="43" r="3" fill="currentColor" opacity="0.3" />
      <path d="M58 72 L44 88 L58 104" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 72 L106 88 L92 104" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M76 108 L86 68" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" opacity="0.55" />
      <path d="M124 72 H156" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" opacity="0.35" />
      <path d="M124 88 H148" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" opacity="0.35" />
      <path d="M124 104 H156" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" opacity="0.35" />
    </Base>
  ),
  productivity: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <rect x="52" y="26" width="96" height="118" rx="12" stroke="currentColor" strokeWidth={STROKE} fill="none" />
      <rect x="78" y="18" width="44" height="16" rx="6" fill={color} />
      <path d="M70 60 L82 72 L104 48" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M116 62 H132" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" opacity="0.4" />
      <path d="M70 92 L82 104 L104 80" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      <path d="M116 94 H132" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" opacity="0.3" />
      <circle cx="76" cy="120" r="6" stroke="currentColor" strokeWidth="2.5" opacity="0.35" />
      <path d="M116 120 H132" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" opacity="0.2" />
    </Base>
  ),
  utilities: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <path d="M120 40 A22 22 0 1 0 137 74 L160 97 L172 85 L149 62 A22 22 0 0 0 120 40 Z" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" fill={`color-mix(in srgb, ${color} 18%, transparent)`} />
      <circle cx="128" cy="58" r="7" fill={color} />
      <path d="M58 120 L38 100 A16 16 0 0 1 60 78 L64 82 L56 90 L66 100 L74 92 L78 96 A16 16 0 0 1 58 120 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <path d="M28 132 L46 114" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </Base>
  ),
  text: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <path d="M40 108 L64 44 L88 108" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 88 H80" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M112 108 V64 C112 56 120 52 128 52 C136 52 144 56 144 64 V108" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M112 84 H144" stroke={color} strokeWidth={STROKE} opacity="0.5" />
      <path d="M40 128 H160" stroke="currentColor" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" opacity="0.35" />
      <rect x="150" y="46" width="3" height="18" fill={color} opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.1;0.7" dur="1.6s" repeatCount="indefinite" />
      </rect>
    </Base>
  ),
  seo: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <circle cx="82" cy="70" r="34" stroke="currentColor" strokeWidth={STROKE} fill="none" />
      <path d="M106 94 L142 130" stroke="currentColor" strokeWidth={STROKE + 1} strokeLinecap="round" />
      <path d="M62 82 V64" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M78 82 V52" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M94 82 V70" stroke={color} strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <path d="M40 40 L48 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M150 40 L142 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </Base>
  ),
  image: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <rect x="28" y="34" width="144" height="104" rx="10" stroke="currentColor" strokeWidth={STROKE} fill="none" />
      <circle cx="62" cy="66" r="12" stroke={color} strokeWidth={STROKE} fill="none" />
      <path d="M28 122 L74 88 L102 108 L134 76 L172 112" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M134 76 L172 112 V128 H28 V122 Z" fill={`color-mix(in srgb, ${color} 16%, transparent)`} stroke="none" />
    </Base>
  ),
  pdf: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <path d="M52 24 H124 L152 52 V136 H52 Z" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" fill="none" />
      <path d="M124 24 V52 H152 Z" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" fill="none" />
      <rect x="68" y="76" width="56" height="26" rx="4" fill={color} />
      <text x="96" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="var(--font-display, sans-serif)">
        PDF
      </text>
      <path d="M68 116 H124" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
    </Base>
  ),
  security: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <path d="M100 24 L154 44 V80 C154 112 130 132 100 142 C70 132 46 112 46 80 V44 Z" stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="round" fill={`color-mix(in srgb, ${color} 18%, transparent)`} />
      <circle cx="100" cy="80" r="14" stroke={color} strokeWidth={STROKE} fill="none" />
      <path d="M100 92 V108" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
    </Base>
  ),
  calculators: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <rect x="58" y="20" width="84" height="120" rx="10" stroke="currentColor" strokeWidth={STROKE} fill="none" />
      <rect x="70" y="34" width="60" height="24" rx="4" fill={color} opacity="0.85" />
      <text x="100" y="52" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="var(--font-mono, monospace)">
        128.5
      </text>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={76 + col * 24}
            cy={78 + row * 16}
            r="5"
            fill={row === 0 && col === 2 ? color : 'currentColor'}
            opacity={row === 0 && col === 2 ? 1 : 0.25}
          />
        ))
      )}
    </Base>
  ),
  converters: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <rect x="26" y="46" width="56" height="56" rx="10" stroke="currentColor" strokeWidth={STROKE} fill="none" />
      <rect x="118" y="58" width="56" height="56" rx="10" stroke={color} strokeWidth={STROKE} fill={`color-mix(in srgb, ${color} 16%, transparent)`} />
      <path d="M86 60 H112" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M104 52 L112 60 L104 68" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M114 100 H88" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M96 92 L88 100 L96 108" stroke={color} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
    </Base>
  ),
  web: (color) => (
    <Base className="h-full w-full text-ink dark:text-white">
      <rect x="24" y="34" width="152" height="98" rx="10" stroke="currentColor" strokeWidth={STROKE} fill="none" />
      <path d="M24 56 H176" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="38" cy="45" r="3" fill={color} />
      <circle cx="50" cy="45" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="100" cy="94" r="28" stroke={color} strokeWidth={STROKE} fill="none" />
      <path d="M72 94 H128" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M100 66 C112 78 112 110 100 122 C88 110 88 78 100 66 Z" stroke={color} strokeWidth="2" opacity="0.6" fill="none" />
    </Base>
  ),
};

/**
 * CategoryIllustration — renders a unique vector illustration for a
 * category id (see CATEGORIES in constants/tools.js). Falls back to the
 * "utilities" illustration for any unmapped id, so it never renders empty.
 */
export default function CategoryIllustration({ category, color = '#2d7367', className = 'h-full w-full' }) {
  const render = ILLUSTRATIONS[category] || ILLUSTRATIONS.utilities;
  return render(color) && (
    <span className={className} role="img" aria-label={`${category} illustration`}>
      {render(color)}
    </span>
  );
}
