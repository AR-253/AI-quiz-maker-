-- SQL Schema for QuizAI Enterprise Application

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learner_profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    level TEXT NOT NULL, -- Beginner, Basic, Medium, Advanced
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS books (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    author TEXT,
    category TEXT,
    file_type TEXT,
    page_count INTEGER,
    extracted_text TEXT,
    processing_status TEXT DEFAULT 'READY', -- UPLOADING, PROCESSING, READY, FAILED
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS quran_verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surah_number INTEGER NOT NULL,
    surah_name TEXT NOT NULL,
    ayah_number INTEGER NOT NULL,
    arabic_text TEXT NOT NULL,
    translation_source TEXT NOT NULL,
    translation_text TEXT NOT NULL,
    juz INTEGER NOT NULL,
    revelation_place TEXT NOT NULL -- Makkah, Madinah
);

CREATE TABLE IF NOT EXISTS islamic_books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL, -- Hadith, Seerah, Tafseer, Fiqh
    extracted_text TEXT NOT NULL,
    verified_by TEXT DEFAULT 'Admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    learner_profile_id TEXT NOT NULL,
    category_type TEXT NOT NULL, -- general, quran, islamic
    source_title TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    total_questions INTEGER NOT NULL,
    score INTEGER DEFAULT 0,
    time_taken_seconds INTEGER DEFAULT 0,
    disclaimer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (learner_profile_id) REFERENCES learner_profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    quiz_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    options_json TEXT NOT NULL, -- JSON array of 4 options
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    surah_ayah_ref TEXT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);
