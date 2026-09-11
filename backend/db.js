const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'enquiries.db');
const db = new Database(dbPath);

// Initialize database table
db.exec(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    conversation TEXT,
    source TEXT,
    status TEXT DEFAULT 'New',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

function saveEnquiry({ name, email, phone, message, conversation, source }) {
  const stmt = db.prepare(`
    INSERT INTO enquiries (name, email, phone, message, conversation, source)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    name || '', 
    email || '', 
    phone || '', 
    message || '', 
    conversation || '', 
    source || 'chatbot'
  );
  return result.lastInsertRowid;
}

module.exports = {
  db,
  saveEnquiry
};
