import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, TrendingUp, Flame } from 'lucide-react';
import { cn } from '@/utils/cn';
import { TOOLS, searchTools, getBestMatch, PRIORITY_TOOL_IDS } from '@/constants/tools';

// Trending chips shown before the user types anything.
// The priority tool(s) (e.g. Online Code Editor) always lead this list.
const TRENDING_IDS = [
  ...PRIORITY_TOOL_IDS,
  'qr-code-generator',
  'cgpa-calculator',
  'word-counter',
  'json-formatter',
  'password-generator',
  'age-calculator',
];

const MAX_RESULTS = 7;

export default function Search({
  value,
  onChange,
  placeholder = 'Search tools…',
  className = '',
  autoFocus = false,
  onNavigate,
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const trendingTools = useMemo(
    () => TRENDING_IDS.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean),
    []
  );

  const results = useMemo(() => {
    if (!value.trim()) return [];
    return searchTools(value).slice(0, MAX_RESULTS);
  }, [value]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToTool = (tool) => {
    setOpen(false);
    onChange('');
    if (onNavigate) onNavigate(tool, value);
    navigate(tool.path);
  };

  const handleKeyDown = (e) => {
    const list = value.trim() ? results : trendingTools;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, list.length - 1));
      setOpen(true);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // If a suggestion is highlighted, open it directly.
      if (activeIndex >= 0 && list[activeIndex]) {
        goToTool(list[activeIndex]);
        return;
      }
      // Otherwise, if the typed text confidently identifies one tool,
      // open that tool directly instead of just filtering the list.
      const match = value.trim() ? getBestMatch(value) : null;
      if (match) {
        goToTool(match);
      } else {
        setOpen(false);
        if (onNavigate) onNavigate(null, value);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const showTrending = open && !value;
  const showResults = open && value.trim().length > 0;

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <SearchIcon
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft/50 dark:text-white/40"
        aria-hidden="true"
      />
      <input
        type="search"
        role="searchbox"
        value={value}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label={placeholder}
        aria-autocomplete="list"
        aria-expanded={open}
        className={cn(
          'h-13 w-full rounded-2xl border border-ink/10 bg-white py-3.5 pl-11 pr-11 text-base text-ink shadow-sm',
          'placeholder:text-ink-soft/50 dark:bg-surface-dark-raised dark:text-white dark:border-white/10 dark:placeholder:text-white/30',
          'transition-shadow focus:outline-none focus:ring-2 focus:ring-mint-500/60'
        )}
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            setOpen(false);
          }}
          aria-label="Clear search"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-soft/60 hover:bg-ink/5 dark:text-white/40 dark:hover:bg-white/10"
        >
          <X className="size-4" />
        </button>
      )}

      {(showTrending || showResults) && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-ink/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-surface-dark-raised">
          {showTrending && (
            <>
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-soft/50 dark:text-white/30">
                Popular Tools
              </div>
              <div className="flex flex-col gap-1">
                {trendingTools.map((tool, i) => (
                  <SuggestionRow
                    key={tool.id}
                    tool={tool}
                    active={activeIndex === i}
                    onClick={() => goToTool(tool)}
                    onMouseEnter={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            </>
          )}

          {showResults && (
            results.length > 0 ? (
              <>
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-ink-soft/50 dark:text-white/30">
                  {results.length === 1 ? 'Best match' : 'Matching tools'}
                </div>
                <div className="flex flex-col gap-1">
                  {results.map((tool, i) => (
                    <SuggestionRow
                      key={tool.id}
                      tool={tool}
                      active={activeIndex === i}
                      onClick={() => goToTool(tool)}
                      onMouseEnter={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="px-3 py-4 text-center text-sm text-ink-soft/60 dark:text-white/40">
                No tools found for "{value}"
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

function SuggestionRow({ tool, active, onClick, onMouseEnter }) {
  const Icon = tool.icon;
  const isHot = tool.hot || tool.priority;
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors',
        active
          ? 'bg-mint-500/10 text-ink dark:bg-mint-500/15 dark:text-white'
          : 'text-ink-soft hover:bg-ink/5 hover:text-ink dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white'
      )}
    >
      {Icon ? (
        <Icon className="size-3.5 shrink-0 text-mint-500" aria-hidden="true" />
      ) : (
        <TrendingUp className="size-3.5 shrink-0 text-mint-500" aria-hidden="true" />
      )}
      <span className="flex-1 truncate">{tool.name}</span>
      {isHot && (
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
          <Flame className="size-3" aria-hidden="true" />
          Hot
        </span>
      )}
    </button>
  );
}
