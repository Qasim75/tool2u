import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

/**
 * ToolToolbar
 * ----------------------------------------------------------------
 * Renders a row of action buttons from a plain config array instead
 * of every tool hand-rolling its own `<div className="flex gap-3">`
 * of buttons. Keeps spacing/variants consistent as more tools
 * (compiler run bar, AI "Analyze" bar, etc) are added.
 *
 * @param {Object} props
 * @param {Array<{
 *   key?: string,
 *   label: string,
 *   icon?: import('react').ComponentType,
 *   onClick: () => void,
 *   variant?: 'primary'|'secondary'|'ghost'|'danger',
 *   size?: 'sm'|'md'|'lg',
 *   disabled?: boolean,
 *   isLoading?: boolean,
 * }>} props.actions
 */
export default function ToolToolbar({ actions = [], className = '' }) {
  if (!actions.length) return null;
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {actions.map((action, i) => (
        <Button
          key={action.key || action.label || i}
          variant={action.variant || 'primary'}
          size={action.size || 'md'}
          icon={action.icon}
          onClick={action.onClick}
          disabled={action.disabled}
          isLoading={action.isLoading}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
