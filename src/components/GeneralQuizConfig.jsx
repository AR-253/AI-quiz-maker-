import React, { useState } from 'react';
import { BookOpen, Sparkles, Sliders, ArrowRight, FileText, Plus, Hash } from 'lucide-react';

const DIFFICULTIES = ["Beginner", "Basic", "Medium", "Advanced"];
const QUESTION_COUNTS = [5, 10, 15, 20];

export default function GeneralQuizConfig({
  currentUser,
  books,
  onGenerate,
  onOpenUploadModal,
  onBack
}) {
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id || '');
  const [difficulty, setDifficulty] = useState(currentUser?.level || 'Beginner');
  const [questionCount, setQuestionCount] = useState(10);
  const [scope, setScope] = useState('Entire Book');

  // Chapter & Page Range state
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(3);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(20);

  const [isGenerating, setIsGenerating] = useState(false);

  const selectedBook = books.find(b => b.id === selectedBookId) || books[0];

  const handleStart = async () => {
    setIsGenerating(true);
    await onGenerate({
      categoryType: 'general',
      learnerProfile: currentUser,
      sourceData: selectedBook,
      difficulty,
      questionCount,
      scope: {
        type: scope,
        startChapter: Number(startChapter),
        endChapter: Number(endChapter),
        startPage: Number(startPage),
        endPage: Number(endPage)
      }
    });
    setIsGenerating(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-400">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-slate-400 hover:text-white mb-2">
            ← Back to Categories
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-400" /> Configure General Quiz
          </h1>
          <p className="text-slate-300 text-xs mt-1">
            Learner: <span className="font-bold text-indigo-300">{currentUser?.avatar} {currentUser?.name}</span> (Age {currentUser?.age})
          </p>
        </div>
      </div>

      <div className="rounded-3xl glass-panel p-8 border border-white/15 space-y-6">
        
        {/* Book Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Select Book from Library
            </label>
            <button
              onClick={onOpenUploadModal}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Upload New Book
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {books.map((b) => {
              const isSel = b.id === selectedBookId;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBookId(b.id)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                    isSel
                      ? 'border-indigo-500 bg-indigo-950/50 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                      : 'border-white/10 glass-pill hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                      {b.fileType || 'PDF'}
                    </span>
                    <span className="text-[10px] text-slate-400">{b.pageCount || 100} pages</span>
                  </div>
                  <h4 className="font-bold text-white text-sm mt-2 line-clamp-1">{b.title}</h4>
                  <p className="text-xs text-slate-400">{b.author || 'Author'}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Select Difficulty Level
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DIFFICULTIES.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => setDifficulty(d)}
                className={`py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                  difficulty === d
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                    : 'glass-pill border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Number of Questions
          </label>
          <div className="flex items-center gap-3">
            {QUESTION_COUNTS.map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setQuestionCount(num)}
                className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                  questionCount === num
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                    : 'glass-pill border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {num} Questions
              </button>
            ))}
          </div>
        </div>

        {/* Scope Selection & Range Inputs */}
        <div className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Content Scope Range
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["Entire Book", "Specific Chapter", "Specific Pages"].map((sc) => (
              <button
                type="button"
                key={sc}
                onClick={() => setScope(sc)}
                className={`py-2.5 rounded-2xl text-xs font-semibold border cursor-pointer transition-all ${
                  scope === sc
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                    : 'glass-pill border-white/10 text-slate-400 hover:bg-white/5'
                }`}
              >
                {sc}
              </button>
            ))}
          </div>

          {/* Conditional Input Box for Specific Chapter */}
          {scope === "Specific Chapter" && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
                <Hash className="w-4 h-4 text-indigo-400" />
                <span>Specify Chapter Range for Questions:</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">From Chapter:</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={startChapter}
                    onChange={(e) => setStartChapter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-indigo-500/40 text-white text-xs font-bold focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">To Chapter:</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={endChapter}
                    onChange={(e) => setEndChapter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-indigo-500/40 text-white text-xs font-bold focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Conditional Input Box for Specific Pages */}
          {scope === "Specific Pages" && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
                <Hash className="w-4 h-4 text-indigo-400" />
                <span>Specify Page Number Range for Questions:</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">From Page:</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-indigo-500/40 text-white text-xs font-bold focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">To Page:</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={endPage}
                    onChange={(e) => setEndPage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-indigo-500/40 text-white text-xs font-bold focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleStart}
          disabled={isGenerating}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-base shadow-xl shadow-indigo-500/30 apple-btn flex items-center justify-center gap-2 mt-4 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>AI Analyzing & Generating Unique Quiz...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate AI Quiz Now
            </>
          )}
        </button>

      </div>

    </div>
  );
}
