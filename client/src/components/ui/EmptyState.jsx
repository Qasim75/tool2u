import { Inbox } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-ink/15 bg-white/60 px-6 py-14 text-center dark:border-white/15 dark:bg-white/[0.02]">
      <div className="rounded-full bg-ink/5 p-3 dark:bg-white/5">
        <Icon className="size-6 text-ink-soft dark:text-white/50" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-ink dark:text-white">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-ink-soft dark:text-white/50">{description}</p>
      )}
      {action}
    </div>
  );
}
