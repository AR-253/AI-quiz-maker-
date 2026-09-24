import React, { useState } from 'react';
import { BookOpen, Moon, Search, FileText, Play, Plus, Eye } from 'lucide-react';

export default function BookLibrary({
  generalBooks,
  islamicBooks,
  onNavigate,
  onOpenUploadModal
}) {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'islamic'
  const [searchQuery, setSearchQuery] = useState('');
  const [previewBook, setPreviewBook] = useState(null);

  const booksList = activeTab === 'general' ? generalBooks : islamicBooks;
  const filteredBooks = booksList.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.author && b.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-400">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-400" /> Book Library
          </h1>
          <p className="text-slate-300 text-xs mt-1">Manage user-uploaded educational books & verified Islamic books</p>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 apple-btn flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Upload New Book
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex glass-panel p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'general'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📖 General Books ({generalBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('islamic')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'islamic'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🕌 Islamic Library ({islamicBooks.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/80 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="rounded-3xl glass-panel p-6 border border-white/10 glass-card-hover flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-indigo-300 uppercase">
                  {book.fileType || 'PDF'} • {book.pageCount || 100} Pages
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {book.processingStatus || 'READY'}
                </span>
              </div>

              <h3 className="font-bold text-white text-lg line-clamp-1">{book.title}</h3>
              <p className="text-xs text-slate-400 mt-1">Author: {book.author || 'Unknown'}</p>

              <p className="text-xs text-slate-300 mt-3 line-clamp-3 bg-black/30 p-3 rounded-xl border border-white/5 italic">
                "{book.extractedText || 'Extracted book text content ready for AI analysis...'}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setPreviewBook(book)}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Preview Text
              </button>

              <button
                onClick={() => onNavigate(activeTab === 'general' ? 'general-config' : 'quran-config')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md apple-btn flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Quiz Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Text Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl glass-panel p-6 border border-white/20 relative">
            <button
              onClick={() => setPreviewBook(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-2">{previewBook.title} - Extracted Content</h3>
            <div className="max-h-96 overflow-y-auto bg-slate-950/80 p-4 rounded-2xl border border-white/10 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
              {previewBook.extractedText}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
