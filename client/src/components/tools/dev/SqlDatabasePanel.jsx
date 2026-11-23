import { Database, Table2, Trash2, Check } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

/**
 * SqlDatabasePanel
 * ----------------------------------------------------------------
 * Sidebar for the SQL playground: lists every database the user has
 * created (CREATE DATABASE …), marks the active one (USE …), and the
 * tables/views inside. Clicking a table drops a ready-made SELECT
 * into the editor.
 */
export default function SqlDatabasePanel({ overview, onSelectTable, onReset }) {
  if (!overview) return null;

  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink dark:text-white">
          <Database className="size-4 text-mint-500" aria-hidden="true" /> Databases
        </div>
        <Button variant="secondary" size="sm" icon={Trash2} onClick={onReset} aria-label="Delete all databases">
          Reset all
        </Button>
      </div>

      <ul className="flex max-h-64 flex-col gap-3 overflow-auto text-sm">
        {overview.databases.map((db) => {
          const active = db.name === overview.current;
          return (
            <li key={db.name}>
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-ink dark:text-white">
                {active && <Check className="size-3.5 text-emerald-500" aria-label="Active database" />}
                {db.name}
                {active && <span className="font-sans text-[10px] font-medium text-emerald-600 dark:text-emerald-400">in use</span>}
              </div>
              {db.tables.length === 0 ? (
                <p className="ml-5 mt-1 text-xs text-ink-soft/60 dark:text-white/40">No tables yet</p>
              ) : (
                <ul className="ml-5 mt-1 flex flex-col gap-0.5">
                  {db.tables.map((t) => (
                    <li key={t.name}>
                      <button
                        type="button"
                        disabled={!active}
                        onClick={() => onSelectTable?.(t.name)}
                        title={active ? `Insert SELECT * FROM ${t.name}` : `Run USE ${db.name}; to query this table`}
                        className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 font-mono text-xs text-ink-soft hover:bg-mint-500/10 disabled:cursor-default disabled:hover:bg-transparent dark:text-white/60"
                      >
                        <Table2 className="size-3" aria-hidden="true" /> {t.name}
                        {t.type === 'view' && <span className="font-sans text-[10px] opacity-60">view</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[11px] leading-relaxed text-ink-soft/60 dark:text-white/40">
        Saved in this browser only{overview.persistWarning ? ' (storage is full or blocked — changes last until you close the tab)' : ''}.
      </p>
    </Card>
  );
}
