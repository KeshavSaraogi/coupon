const Database = require('better-sqlite3');
const db = new Database('redemptions.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS redemptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL,
    code TEXT NOT NULL,
    reward TEXT,
    timestamp TEXT,
    status TEXT DEFAULT 'pending'
  )
`).run();

module.exports = db;
