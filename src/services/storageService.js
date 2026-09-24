import { PRELOADED_GENERAL_BOOKS, PRELOADED_ISLAMIC_BOOKS } from '../data/sampleBooks';

const STORAGE_KEYS = {
  USERS: 'quizai_registered_users',
  CURRENT_USER: 'quizai_current_logged_user',
  GENERAL_BOOKS: 'quizai_general_books',
  ISLAMIC_BOOKS: 'quizai_islamic_books',
  QUIZZES: 'quizai_quizzes_history',
  SETTINGS: 'quizai_settings'
};

// Default registered users for quick demo & initial testing
const DEFAULT_USERS = [
  {
    id: "usr_ahmed",
    name: "Ahmed",
    email: "ahmed@example.com",
    password: "password123",
    age: 6,
    level: "Beginner",
    avatar: "👦",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr_sara",
    name: "Sara",
    email: "sara@example.com",
    password: "password123",
    age: 10,
    level: "Medium",
    avatar: "👧",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr_ali",
    name: "Ali Khan",
    email: "ali@example.com",
    password: "password123",
    age: 15,
    level: "Advanced",
    avatar: "👨‍🎓",
    createdAt: new Date().toISOString()
  }
];

export const storageService = {
  // --- USER AUTHENTICATION ---
  getAllUsers() {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (data) return JSON.parse(data);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  },

  getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (data) return JSON.parse(data);
    // Default to Ahmed if no user logged in initially
    const defaultUser = DEFAULT_USERS[0];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
    return defaultUser;
  },

  register(userData) {
    const users = this.getAllUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    
    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  login(email, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, message: 'User account not found. Please register first.' };
    }

    if (user.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { success: true, user };
  },

  updateUser(updatedUserData) {
    const users = this.getAllUsers();
    const index = users.findIndex(u => u.id === updatedUserData.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUserData };
    } else {
      users.push(updatedUserData);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUserData));
    return { success: true, user: updatedUserData };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // --- BOOKS MANAGEMENT ---
  saveGeneralBooks(books) {
    if (!Array.isArray(books)) return;
    // Truncate long extracted text per book to max 15,000 chars for LocalStorage size safety
    const sanitized = books.map(book => {
      const safeText = book.extractedText 
        ? (book.extractedText.length > 15000 ? book.extractedText.substring(0, 15000) : book.extractedText)
        : "";
      return { ...book, extractedText: safeText };
    });

    try {
      localStorage.setItem(STORAGE_KEYS.GENERAL_BOOKS, JSON.stringify(sanitized));
    } catch (err) {
      console.warn("LocalStorage quota warning when saving books:", err);
      // Fallback: compress text length to 4000 chars if localStorage is getting full
      const compressed = sanitized.map(b => ({
        ...b,
        extractedText: b.extractedText ? b.extractedText.substring(0, 4000) : ""
      }));
      try {
        localStorage.setItem(STORAGE_KEYS.GENERAL_BOOKS, JSON.stringify(compressed));
      } catch (e) {
        console.error("Critical LocalStorage quota exceeded:", e);
      }
    }
    return sanitized;
  },

  getGeneralBooks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GENERAL_BOOKS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Storage read error:", e);
    }
    this.saveGeneralBooks(PRELOADED_GENERAL_BOOKS);
    return PRELOADED_GENERAL_BOOKS;
  },

  addGeneralBook(bookData) {
    const books = this.getGeneralBooks();
    
    const safeText = bookData.extractedText 
      ? (bookData.extractedText.length > 25000 ? bookData.extractedText.substring(0, 25000) : bookData.extractedText)
      : "";

    const newBook = {
      id: bookData.id || `gen_${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      processingStatus: "READY",
      ...bookData,
      extractedText: safeText
    };

    // Replace if exists, else prepend
    const existingIndex = books.findIndex(b => b.id === newBook.id || (b.title && b.title === newBook.title));
    if (existingIndex !== -1) {
      books[existingIndex] = { ...books[existingIndex], ...newBook };
    } else {
      books.unshift(newBook);
    }

    this.saveGeneralBooks(books);

    // Async sync to Express SQLite Backend API if available
    try {
      fetch('/api/books/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
      }).catch(e => console.log("SQL sync fallback: LocalStorage used (server offline or static host)"));
    } catch (e) {}

    return newBook;
  },

  async syncBooksWithBackend() {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) return this.getGeneralBooks();
      const sqlBooks = await response.json();
      
      if (Array.isArray(sqlBooks) && sqlBooks.length > 0) {
        const localBooks = this.getGeneralBooks();
        
        // Merge SQL books with LocalStorage books seamlessly
        const mergedMap = new Map();
        localBooks.forEach(b => {
          if (b.id || b.title) mergedMap.set(b.id || b.title, b);
        });
        sqlBooks.forEach(b => {
          const key = b.id || b.title;
          const existing = mergedMap.get(key) || {};
          mergedMap.set(key, { ...existing, ...b });
        });
        
        const mergedList = Array.from(mergedMap.values());
        this.saveGeneralBooks(mergedList);
        return mergedList;
      }
    } catch (err) {
      console.log("SQL backend sync unavailable (running on static host / backend offline).");
    }
    return this.getGeneralBooks();
  },

  getIslamicBooks() {
    const data = localStorage.getItem(STORAGE_KEYS.ISLAMIC_BOOKS);
    if (data) return JSON.parse(data);
    localStorage.setItem(STORAGE_KEYS.ISLAMIC_BOOKS, JSON.stringify(PRELOADED_ISLAMIC_BOOKS));
    return PRELOADED_ISLAMIC_BOOKS;
  },

  // --- QUIZ HISTORY PER USER ---
  getQuizzes() {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    return data ? JSON.parse(data) : [];
  },

  getQuizzesForUser(userId) {
    const quizzes = this.getQuizzes();
    return quizzes.filter(q => q.userId === userId || q.learnerProfileId === userId);
  },

  saveQuizAttempt(quizResult) {
    const quizzes = this.getQuizzes();
    const record = {
      id: `quiz_${Date.now()}`,
      attemptedAt: new Date().toISOString(),
      ...quizResult
    };
    quizzes.unshift(record);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
    return record;
  },

  // --- PROGRESS ANALYTICS PER USER ---
  getUserAnalytics(userId) {
    const userQuizzes = this.getQuizzesForUser(userId);
    const totalAttempted = userQuizzes.length;
    
    if (totalAttempted === 0) {
      return {
        totalQuizzes: 0,
        avgScorePercent: 0,
        totalQuestionsAnswered: 0,
        categoryBreakdown: { general: 0, quran: 0, islamic: 0 },
        recentQuizzes: []
      };
    }

    const totalQuestions = userQuizzes.reduce((acc, q) => acc + (q.totalQuestions || 0), 0);
    const totalCorrect = userQuizzes.reduce((acc, q) => acc + (q.score || 0), 0);
    const avgScorePercent = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    const categoryBreakdown = {
      general: userQuizzes.filter(q => q.categoryType === 'general').length,
      quran: userQuizzes.filter(q => q.categoryType === 'quran').length,
      islamic: userQuizzes.filter(q => q.categoryType === 'islamic').length
    };

    return {
      totalQuizzes: totalAttempted,
      avgScorePercent,
      totalQuestionsAnswered: totalQuestions,
      totalCorrect,
      categoryBreakdown,
      recentQuizzes: userQuizzes.slice(0, 5)
    };
  }
};
