/**
 * Dev-only test for the in-browser SQL engine (client/src/lib/runners/sqlEngine.js).
 * Runs real SQLite (sql.js) in Node — no mocks. Usage: npm run test:sql
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createSqlEngine, splitStatements } from '../client/src/lib/runners/sqlEngine.js';

const require = createRequire(import.meta.url);
const initSqlJs = require('sql.js');
const mem = new Map();
const storage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v), removeItem: (k) => mem.delete(k) };
const make = () => createSqlEngine({ initSql: () => initSqlJs(), storage });

let passed = 0;
const test = async (name, fn) => { await fn(); passed++; console.log('  ✔', name); };

await test('splitter handles quotes, comments, triggers', () => {
  assert.deepEqual(splitStatements("SELECT 'a;b'; -- c;d\nSELECT 2; /* x; */ SELECT 3"), ["SELECT 'a;b'", 'SELECT 2', 'SELECT 3']);
  const t = splitStatements('CREATE TRIGGER t AFTER INSERT ON a BEGIN UPDATE b SET x=1; UPDATE b SET y=2; END; SELECT 1;');
  assert.equal(t.length, 2);
});

const e = make();

await test('CREATE DATABASE / USE / CREATE TABLE / INSERT / SELECT', async () => {
  const r = await e.run(`
    CREATE DATABASE shop;
    USE shop;
    CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL, price DECIMAL(10,2)) ENGINE=InnoDB;
    INSERT INTO products (name, price) VALUES ('Pen', 1.5), ('Book', 12), ('Bag', 30);
    SELECT * FROM products WHERE price > 5 ORDER BY price DESC;
  `);
  assert.equal(r.status, 'success', r.stderr);
  const table = r.blocks.filter((b) => b.type === 'table').pop();
  assert.deepEqual(table.rows.map((x) => x[1]), ['Bag', 'Book']);
  assert.equal(r.sqlOverview.current, 'shop');
});

await test('SHOW DATABASES / SHOW TABLES / DESCRIBE', async () => {
  const r = await e.run('SHOW DATABASES; SHOW TABLES; DESCRIBE products;');
  assert.equal(r.status, 'success', r.stderr);
  assert.equal(r.blocks[0].rows.length, 2);
  assert.deepEqual(r.blocks[1].rows, [['products', 'table']]);
  assert.equal(r.blocks[2].rows[0][0], 'id');
});

await test('JOIN, GROUP BY, CTE, window function', async () => {
  const r = await e.run(`
    CREATE TABLE orders (id INTEGER PRIMARY KEY, product_id INT REFERENCES products(id), qty INT);
    INSERT INTO orders (product_id, qty) VALUES (1,5),(2,1),(1,2);
    WITH t AS (SELECT p.name, SUM(o.qty) AS total FROM orders o JOIN products p ON p.id=o.product_id GROUP BY p.name)
    SELECT name, total, RANK() OVER (ORDER BY total DESC) AS rnk FROM t;
  `);
  assert.equal(r.status, 'success', r.stderr);
  assert.deepEqual(r.blocks.at(-1).rows[0], ['Pen', 7, 1]);
});

await test('foreign keys are enforced', async () => {
  const r = await e.run('INSERT INTO orders (product_id, qty) VALUES (999, 1);');
  assert.equal(r.status, 'runtime_error');
  assert.match(r.stderr, /FOREIGN KEY/i);
});

await test('errors stop the script but earlier statements stay applied', async () => {
  const r = await e.run("INSERT INTO products (name, price) VALUES ('Cap', 4); SELECT * FROM nope; INSERT INTO products (name) VALUES ('X');");
  assert.equal(r.status, 'runtime_error');
  assert.match(r.stderr, /no such table/i);
  const c = await e.run('SELECT COUNT(*) FROM products WHERE name = \'Cap\'');
  assert.equal(c.blocks[0].rows[0][0], 1);
});

await test('triggers, views, ALTER, DROP', async () => {
  const r = await e.run(`
    CREATE TABLE log (msg TEXT);
    CREATE TRIGGER trg AFTER INSERT ON products BEGIN INSERT INTO log VALUES ('added ' || NEW.name); END;
    INSERT INTO products (name, price) VALUES ('Lamp', 9);
    CREATE VIEW cheap AS SELECT * FROM products WHERE price < 10;
    ALTER TABLE products ADD COLUMN stock INT DEFAULT 0;
    SELECT msg FROM log;
    DROP VIEW cheap;
  `);
  assert.equal(r.status, 'success', r.stderr);
  assert.equal(r.blocks.find((b) => b.columns?.[0] === 'msg').rows[0][0], 'added Lamp');
});

await test('persistence: a new engine instance restores databases', async () => {
  const e2 = make();
  const o = await e2.getOverview();
  assert.equal(o.current, 'shop');
  assert.ok(o.databases.find((d) => d.name === 'shop').tables.some((t) => t.name === 'products'));
});

await test('IF NOT EXISTS, duplicates, DROP DATABASE of current db', async () => {
  assert.equal((await e.run('CREATE DATABASE shop;')).status, 'runtime_error');
  assert.equal((await e.run('CREATE DATABASE IF NOT EXISTS shop;')).status, 'success');
  const r = await e.run('DROP DATABASE shop; SELECT DATABASE();');
  assert.equal(r.status, 'success', r.stderr);
  assert.equal(r.blocks.at(-1).rows[0][0], 'default');
  assert.equal((await e.run('USE shop;')).status, 'runtime_error');
});

await test('TRUNCATE and resetAll', async () => {
  await e.run('CREATE TABLE t (id INTEGER PRIMARY KEY AUTOINCREMENT, v INT); INSERT INTO t (v) VALUES (1),(2); TRUNCATE TABLE t; INSERT INTO t (v) VALUES (9);');
  const r = await e.run('SELECT id FROM t');
  assert.equal(r.blocks[0].rows[0][0], 1);
  const o = await e.resetAll();
  assert.equal(o.databases.length, 1);
  assert.equal(o.databases[0].tables.length, 0);
});

console.log(`\n${passed} tests passed`);
