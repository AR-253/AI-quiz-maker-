import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

// SQLite Database Setup
const dbPath = path.join(__dirname, 'quizai.db');
const db = new Database(dbPath);

// Execute Schema Script
const schemaSql = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf-8');
db.exec(schemaSql);

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'QuizAI Express Engine', timestamp: new Date().toISOString() });
});

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const id = `usr_${Date.now()}`;
  try {
    const stmt = db.prepare('INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)');
    stmt.run(id, name, email, password || 'hashed_pw');
    res.json({ success: true, user: { id, name, email } });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const stmt = db.prepare('SELECT id, name, email FROM users WHERE email = ?');
  const user = stmt.get(email);
  if (user) {
    res.json({ success: true, user, token: 'mock-jwt-token-xyz' });
  } else {
    res.json({ success: true, user: { id: 'usr_demo', name: 'Ali', email }, token: 'mock-jwt-token-demo' });
  }
});

// Profiles API
app.get('/api/profiles', (req, res) => {
  const stmt = db.prepare('SELECT * FROM learner_profiles');
  const profiles = stmt.all();
  res.json(profiles);
});

app.post('/api/profiles', (req, res) => {
  const { userId = 'usr_demo', name, age, level, avatar } = req.body;
  const id = `prof_${Date.now()}`;
  const stmt = db.prepare('INSERT INTO learner_profiles (id, user_id, name, age, level, avatar) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(id, userId, name, age, level, avatar || '👦');
  res.json({ id, userId, name, age, level, avatar });
});

// Books API
app.get('/api/books', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM books ORDER BY created_at DESC');
    const rows = stmt.all();
    const formatted = rows.map(r => ({
      id: r.id,
      userId: r.user_id,
      title: r.title,
      author: r.author || 'Uploaded Document',
      category: r.category || 'General',
      fileType: r.file_type || 'PDF',
      pageCount: r.page_count || 10,
      extractedText: r.extracted_text || '',
      processingStatus: r.processing_status || 'READY',
      uploadedAt: r.created_at ? r.created_at.split('T')[0] : new Date().toISOString().split('T')[0]
    }));
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching books from SQL DB:", err);
    res.status(500).json({ error: 'Failed to fetch books from database' });
  }
});

app.post('/api/books/upload', (req, res) => {
  const { id, userId = 'usr_demo', title, author, category, fileType, pageCount, extractedText } = req.body;
  const bookId = id || `gen_${Date.now()}`;
  try {
    const stmt = db.prepare('INSERT OR REPLACE INTO books (id, user_id, title, author, category, file_type, page_count, extracted_text, processing_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    stmt.run(bookId, userId, title, author || 'Uploaded', category || 'General', fileType || 'PDF', pageCount || 10, extractedText || '', 'READY');
    res.json({ success: true, id: bookId, title, processingStatus: 'READY' });
  } catch (err) {
    console.error("Failed to insert book to DB:", err);
    res.status(500).json({ error: 'Failed to save book to SQL database' });
  }
});

// Quizzes API
app.get('/api/quizzes', (req, res) => {
  const stmt = db.prepare('SELECT * FROM quizzes ORDER BY created_at DESC');
  res.json(stmt.all());
});

app.listen(PORT, () => {
  console.log(`⚡ QuizAI Express SQL Backend running on http://localhost:${PORT}`);
});
