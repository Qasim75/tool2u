/**
 * sqlEngine.js
 * ----------------------------------------------------------------
 * A real SQL playground engine that runs 100% in the browser using
 * SQLite compiled to WebAssembly (sql.js). No server, no API keys,
 * nothing leaves the user's device.
 *
 * Why SQLite? It supports the full everyday SQL surface: CREATE /
 * ALTER / DROP TABLE, INSERT / UPDATE / DELETE, SELECT with JOINs,
 * GROUP BY, subqueries, CTEs (WITH), window functions, views,
 * indexes, triggers, transactions, PRAGMA ...
 *
 * SQLite itself has no "CREATE DATABASE" / "USE" / "SHOW ..." —
 * those are MySQL/Postgres client-level concepts. This engine adds
 * them on top, so a script like the one below just works:
 *
 *   CREATE DATABASE shop;  USE shop;  CREATE TABLE ...;  SHOW TABLES;
 *
 * Every database is its own isolated SQLite instance. They persist
 * in localStorage (best effort) so work survives a page refresh.
 *
 * The engine is dependency-injected (`initSql`, `storage`) so it can
 * be unit-tested in Node without a browser — see
 * scripts/test-sql-engine.mjs.
 */

const DEFAULT_DB = 'default';
const STORAGE_KEY = 'tool2u.sql.databases.v1';
const MAX_DISPLAY_ROWS = 500;
const NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;

export class SqlError extends Error {}

// ---------------------------------------------------------------
// Statement splitter — respects quotes, comments and trigger bodies
// ---------------------------------------------------------------
export function splitStatements(sql) {
  const statements = [];
  let cur = '';
  let i = 0;
  const n = sql.length;

  const push = () => {
    const s = cur.trim();
    if (s) statements.push(s);
    cur = '';
  };

  while (i < n) {
    const ch = sql[i];
    const next = sql[i + 1];

    // -- line comment
    if (ch === '-' && next === '-') {
      while (i < n && sql[i] !== '\n') i++;
      cur += ' ';
      continue;
    }
    // # line comment (MySQL style) — only at the start of a line
    if (ch === '#' && /(^|\n)\s*$/.test(cur)) {
      while (i < n && sql[i] !== '\n') i++;
      continue;
    }
    // /* block comment */
    if (ch === '/' && next === '*') {
      i += 2;
      while (i < n && !(sql[i] === '*' && sql[i + 1] === '/')) i++;
      i += 2;
      cur += ' ';
      continue;
    }
    // quoted strings / identifiers
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      cur += ch;
      i++;
      while (i < n) {
        cur += sql[i];
        if (sql[i] === quote) {
          if (sql[i + 1] === quote) {
            cur += sql[i + 1];
            i += 2;
            continue;
          }
          i++;
          break;
        }
        i++;
      }
      continue;
    }
    if (ch === ';') {
      // A trigger body contains ';' — only split once we've seen its closing END.
      const isTrigger = /^\s*create\s+(temp(orary)?\s+)?trigger\b/i.test(cur);
      if (isTrigger && !/\bend\s*$/i.test(cur)) {
        cur += ch;
        i++;
        continue;
      }
      push();
      i++;
      continue;
    }
    cur += ch;
    i++;
  }
  push();
  return statements;
}

// ---------------------------------------------------------------
// Dialect helpers — make common MySQL / Postgres DDL run on SQLite
// ---------------------------------------------------------------
function adaptDialect(stmt) {
  if (!/^\s*create\s+(temp(orary)?\s+)?table\b/i.test(stmt)) return stmt;
  let s = stmt;
  // MySQL:  id INT AUTO_INCREMENT PRIMARY KEY  ->  INTEGER PRIMARY KEY AUTOINCREMENT
  s = s.replace(
    /\b(?:tiny|small|medium|big)?int(?:eger)?(?:\s*\(\s*\d+\s*\))?(?:\s+unsigned)?(\s+not\s+null)?(\s+primary\s+key)?\s+auto_increment(\s+primary\s+key)?(\s+not\s+null)?/gi,
    'INTEGER PRIMARY KEY AUTOINCREMENT'
  );
  // Postgres: id SERIAL / BIGSERIAL [PRIMARY KEY]
  s = s.replace(/\b(?:big|small)?serial\b(\s+primary\s+key)?/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT');
  // MySQL table options:  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ...
  s = s.replace(/\)\s*(?:engine|default\s+charset|charset|collate|auto_increment)\s*=[^;]*$/i, ')');
  return s;
}

function firstKeyword(stmt) {
  const m = stmt.match(/^\s*\(?\s*([A-Za-z]+)/);
  return m ? m[1].toLowerCase() : '';
}

// ---------------------------------------------------------------
// Base64 helpers for persistence
// ---------------------------------------------------------------
function bytesToBase64(bytes) {
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}
function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function formatCell(v) {
  if (v instanceof Uint8Array) return `<blob ${v.length} bytes>`;
  return v;
}

// ---------------------------------------------------------------
// Engine
// ---------------------------------------------------------------
/**
 * @param {{ initSql: () => Promise<any>, storage?: { getItem(k:string):string|null, setItem(k:string,v:string):void, removeItem(k:string):void } | null }} deps
 */
export function createSqlEngine({ initSql, storage = null }) {
  let SQL = null;
  let dbs = null; // Map<string, Database>
  let current = DEFAULT_DB;
  let persistWarning = false;

  function openDb(bytes) {
    const db = bytes ? new SQL.Database(bytes) : new SQL.Database();
    db.run('PRAGMA foreign_keys = ON;');
    return db;
  }

  async function ensureReady() {
    if (dbs) return;
    SQL = await initSql();
    dbs = new Map();

    try {
      const raw = storage?.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        for (const [name, b64] of Object.entries(saved.databases || {})) {
          try {
            dbs.set(name, openDb(base64ToBytes(b64)));
          } catch {
            /* skip a corrupt database, keep the rest */
          }
        }
        if (saved.current && dbs.has(saved.current)) current = saved.current;
      }
    } catch {
      /* corrupt storage — start fresh */
    }
    if (!dbs.has(DEFAULT_DB)) dbs.set(DEFAULT_DB, openDb());
    if (!dbs.has(current)) current = DEFAULT_DB;
  }

  function persist() {
    if (!storage) return;
    try {
      const databases = {};
      for (const [name, db] of dbs) {
        databases[name] = bytesToBase64(db.export());
        // sql.js's export() closes & reopens the connection, which resets
        // per-connection PRAGMAs — turn foreign-key enforcement back on.
        db.run('PRAGMA foreign_keys = ON;');
      }
      storage.setItem(STORAGE_KEY, JSON.stringify({ current, databases }));
      persistWarning = false;
    } catch {
      // Quota exceeded / storage blocked — the session still works in memory.
      persistWarning = true;
    }
  }

  function listTables(db) {
    const res = db.exec(
      "SELECT name, type FROM sqlite_master WHERE type IN ('table','view') AND name NOT LIKE 'sqlite_%' ORDER BY type, name"
    );
    if (!res.length) return [];
    return res[0].values.map(([name, type]) => ({ name, type }));
  }

  function overview() {
    return {
      current,
      persistWarning,
      databases: [...dbs.keys()].sort().map((name) => ({
        name,
        tables: listTables(dbs.get(name)),
      })),
    };
  }

  function normalizeName(raw) {
    const name = raw.replace(/^[`"']|[`"']$/g, '').toLowerCase();
    if (!NAME_RE.test(name)) {
      throw new SqlError(`Invalid database name "${raw}". Use letters, numbers and underscores only.`);
    }
    return name;
  }

  // ---- MySQL/Postgres-style commands SQLite doesn't have ----
  // Returns a block, an array of blocks, or null if `stmt` is plain SQL.
  function handleCustom(stmt) {
    const s = stmt.replace(/;+\s*$/, '').trim();
    let m;

    if ((m = s.match(/^create\s+(?:database|schema)\s+(if\s+not\s+exists\s+)?(\S+)$/i))) {
      const name = normalizeName(m[2]);
      if (dbs.has(name)) {
        if (m[1]) return { type: 'message', text: `Database "${name}" already exists — skipped.` };
        throw new SqlError(`Can't create database "${name}"; database exists. Use CREATE DATABASE IF NOT EXISTS.`);
      }
      dbs.set(name, openDb());
      return { type: 'message', text: `Database "${name}" created. Run USE ${name}; to switch to it.` };
    }

    if ((m = s.match(/^drop\s+(?:database|schema)\s+(if\s+exists\s+)?(\S+)$/i))) {
      const name = normalizeName(m[2]);
      if (!dbs.has(name)) {
        if (m[1]) return { type: 'message', text: `Database "${name}" doesn't exist — skipped.` };
        throw new SqlError(`Can't drop database "${name}"; database doesn't exist.`);
      }
      dbs.get(name).close();
      dbs.delete(name);
      if (name === DEFAULT_DB) dbs.set(DEFAULT_DB, openDb());
      const switched = current === name;
      if (switched) current = DEFAULT_DB;
      return {
        type: 'message',
        text: `Database "${name}" dropped.${switched ? ` Now using "${DEFAULT_DB}".` : ''}`,
      };
    }

    if ((m = s.match(/^(?:use|\\c|connect)\s+(\S+)$/i))) {
      const name = normalizeName(m[1]);
      if (!dbs.has(name)) throw new SqlError(`Unknown database "${name}". Create it first: CREATE DATABASE ${name};`);
      current = name;
      return { type: 'message', text: `Database changed to "${name}".` };
    }

    if (/^show\s+(?:databases|schemas)$/i.test(s)) {
      return {
        type: 'table',
        title: 'Databases',
        columns: ['Database', 'Tables', 'Current'],
        rows: [...dbs.keys()].sort().map((name) => [name, listTables(dbs.get(name)).length, name === current ? '✔' : '']),
      };
    }

    if (/^show\s+(?:full\s+)?tables$/i.test(s) || /^\.tables$/i.test(s)) {
      return {
        type: 'table',
        title: `Tables in "${current}"`,
        columns: ['Table', 'Type'],
        rows: listTables(dbs.get(current)).map((t) => [t.name, t.type]),
      };
    }

    if (/^select\s+(?:database|schema)\s*\(\s*\)(?:\s+as\s+\S+)?$/i.test(s)) {
      return { type: 'table', title: 'Current database', columns: ['database()'], rows: [[current]] };
    }

    if ((m = s.match(/^(?:describe|desc|show\s+(?:full\s+)?columns\s+(?:from|in))\s+(\S+)$/i))) {
      const table = m[1].replace(/^[`"']|[`"']$/g, '');
      const res = dbs.get(current).exec(`PRAGMA table_info("${table.replace(/"/g, '""')}")`);
      if (!res.length) throw new SqlError(`Table "${table}" doesn't exist in database "${current}".`);
      return {
        type: 'table',
        title: `Structure of ${table}`,
        columns: ['Field', 'Type', 'Null', 'Key', 'Default'],
        rows: res[0].values.map(([, name, type, notnull, dflt, pk]) => [
          name,
          type || '',
          notnull ? 'NO' : 'YES',
          pk ? 'PRI' : '',
          dflt,
        ]),
      };
    }

    if ((m = s.match(/^show\s+create\s+table\s+(\S+)$/i))) {
      const table = m[1].replace(/^[`"']|[`"']$/g, '');
      const res = dbs.get(current).exec('SELECT sql FROM sqlite_master WHERE name = ? AND type = ?', [table, 'table']);
      if (!res.length) throw new SqlError(`Table "${table}" doesn't exist in database "${current}".`);
      return { type: 'table', title: `CREATE TABLE ${table}`, columns: ['Create Table'], rows: [[res[0].values[0][0]]] };
    }

    if ((m = s.match(/^truncate\s+(?:table\s+)?(\S+)$/i))) {
      const table = m[1].replace(/^[`"']|[`"']$/g, '');
      const db = dbs.get(current);
      db.run(`DELETE FROM "${table.replace(/"/g, '""')}"`);
      try {
        db.run('DELETE FROM sqlite_sequence WHERE name = ?', [table]);
      } catch {
        /* table has no AUTOINCREMENT — nothing to reset */
      }
      return { type: 'message', text: `Table "${table}" truncated.` };
    }

    if (/^(?:show\s+variables|select\s+version\s*\(\s*\))$/i.test(s)) {
      const v = dbs.get(current).exec('SELECT sqlite_version()');
      return { type: 'table', title: 'Engine', columns: ['engine', 'version'], rows: [['SQLite', v[0].values[0][0]]] };
    }

    return null;
  }

  function friendlyError(err) {
    let msg = err?.message || String(err);
    msg = msg.replace(/^Error:\s*/, '');
    return msg;
  }

  /**
   * Runs a whole SQL script. Statements before an error stay applied
   * (same as most SQL clients); output produced so far is returned
   * alongside the error.
   */
  async function run(script) {
    await ensureReady();
    const started = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const statements = splitStatements(script);
    const blocks = [];
    let error = null;
    let failedStatement = null;
    let executed = 0;
    let resultCount = 0;

    for (const stmt of statements) {
      try {
        const custom = handleCustom(stmt);
        if (custom) {
          blocks.push(custom);
          if (custom.type === 'table') resultCount++;
          executed++;
          continue;
        }

        const db = dbs.get(current);
        const sql = adaptDialect(stmt);
        const results = db.exec(sql);
        executed++;

        if (results.length) {
          for (const r of results) {
            resultCount++;
            const total = r.values.length;
            blocks.push({
              type: 'table',
              title: `Result ${resultCount}`,
              columns: r.columns,
              rows: r.values.slice(0, MAX_DISPLAY_ROWS).map((row) => row.map(formatCell)),
              totalRows: total,
              truncated: total > MAX_DISPLAY_ROWS,
            });
          }
        } else {
          const kw = firstKeyword(sql);
          if (['insert', 'update', 'delete', 'replace'].includes(kw)) {
            const n = db.getRowsModified();
            blocks.push({ type: 'message', text: `${kw.toUpperCase()} OK — ${n} row${n === 1 ? '' : 's'} affected.` });
          } else {
            blocks.push({ type: 'message', text: `${kw.toUpperCase() || 'Statement'} executed successfully.` });
          }
        }
      } catch (err) {
        error = friendlyError(err);
        failedStatement = stmt;
        break;
      }
    }

    persist();

    const elapsed = Math.round((typeof performance !== 'undefined' ? performance.now() : Date.now()) - started);
    return {
      status: error ? 'runtime_error' : 'success',
      label: error ? 'SQL error' : 'Query executed',
      statusDescription: error ? 'SQL error' : 'OK',
      blocks,
      stdout: '',
      stderr: error
        ? `${error}${failedStatement ? `\n\nIn statement:\n${failedStatement.length > 300 ? failedStatement.slice(0, 300) + '…' : failedStatement}` : ''}`
        : '',
      compileOutput: '',
      exitCode: error ? 1 : 0,
      executionTimeMs: elapsed,
      memoryKb: null,
      statementsExecuted: executed,
      runtime: { name: 'SQLite (WebAssembly, in your browser)', fileName: 'query.sql' },
      sqlOverview: overview(),
    };
  }

  async function getOverview() {
    await ensureReady();
    return overview();
  }

  async function resetAll() {
    await ensureReady();
    for (const db of dbs.values()) db.close();
    dbs.clear();
    dbs.set(DEFAULT_DB, openDb());
    current = DEFAULT_DB;
    try {
      storage?.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    return overview();
  }

  return { run, getOverview, resetAll };
}
