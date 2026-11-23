import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { createSqlEngine } from './sqlEngine';

function safeStorage() {
  try {
    const s = window.localStorage;
    s.getItem('__t'); // throws if blocked
    return s;
  } catch {
    return null;
  }
}

const engine = createSqlEngine({
  initSql: () => initSqlJs({ locateFile: () => wasmUrl }),
  storage: safeStorage(),
});

export const runSql = ({ code }) => engine.run(code);
export const getSqlOverview = () => engine.getOverview();
export const resetSqlDatabases = () => engine.resetAll();
