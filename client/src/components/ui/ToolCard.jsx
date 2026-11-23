import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import Card from '@/components/ui/Card';
import { CATEGORIES } from '@/constants/tools';
import { useUser } from '@/context/UserContext';
import { cn } from '@/utils/cn';

export default function ToolCard({ tool, variant = 'default' }) {
  const Icon = tool.icon;
  const category = CATEGORIES[tool.category];
  const { favorites, toggleFavorite } = useUser();
  const isFavorite = favorites.includes(tool.id);
  const isFlagship = variant === 'flagship';

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool.id);
  };

  return (
    <Card
      as={Link}
      to={tool.path}
      hover
      className={cn(
        "group relative flex flex-col focus-visible:ring-2 focus-visible:ring-mint-500",
        isFlagship ? "gap-5 p-7 sm:flex-row sm:items-center sm:gap-7" : "gap-4 p-6"
      )}
      style={{ '--tag-color': category.color }}
    >
      {/* category tag */}
      <span
        className="absolute inset-x-0 top-0 h-1 rounded-t-card"
        style={{ backgroundColor: category.color }}
        aria-hidden="true"
      />

      {/* Flagship badge */}
      {isFlagship && (
        <span className="absolute -top-3 left-6 rounded-full bg-teal-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-mint-400 dark:bg-mint-500 dark:text-teal-950">
          ★ Most popular
        </span>
      )}

      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex items-center justify-center rounded-xl",
            isFlagship ? "size-14 shrink-0" : "size-11"
          )}
          style={{ backgroundColor: `color-mix(in srgb, ${category.color} 16%, transparent)` }}
        >
          <Icon className={cn(isFlagship ? "size-7" : "size-5")} style={{ color: category.color }} aria-hidden="true" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "rounded-full p-1.5 transition-colors hover:bg-ink/5 dark:hover:bg-white/5",
              isFavorite ? "text-amber-500" : "text-ink-soft/30 dark:text-white/20"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={cn("size-4", isFavorite && "fill-current")} />
          </button>
          <ArrowUpRight
            className="size-5 text-ink-soft/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink dark:group-hover:text-white"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className={cn(
          "font-display font-semibold text-ink dark:text-white",
          isFlagship ? "text-xl" : "text-lg"
        )}>
          {tool.name}
        </h3>
        <p className={cn(
          "leading-relaxed text-ink-soft dark:text-white/55",
          isFlagship ? "text-base" : "line-clamp-2 text-sm"
        )}>
          {tool.description}
        </p>
      </div>

      <span
        className="mt-auto inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
        style={{ color: category.color }}
      >
        {category.label}
      </span>
    </Card>
  );
}
