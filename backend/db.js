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
    ai_score INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

try {
  // If the table already existed from before, add the column gracefully
  db.exec("ALTER TABLE enquiries ADD COLUMN ai_score INTEGER DEFAULT 0;");
} catch(e) {
  // Column likely already exists
}

function saveEnquiry({ name, email, phone, message, conversation, source, ai_score }) {
  const stmt = db.prepare(`
    INSERT INTO enquiries (name, email, phone, message, conversation, source, ai_score)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    name || '', 
    email || '', 
    phone || '', 
    message || '', 
    conversation || '', 
    source || 'chatbot',
    ai_score || 0
  );
  return result.lastInsertRowid;
}

module.exports = {
  db,
  saveEnquiry
};
