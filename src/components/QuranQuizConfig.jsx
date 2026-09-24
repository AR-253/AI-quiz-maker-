import React, { useState } from 'react';
import { Moon, ShieldCheck, Sparkles, BookOpen, AlertTriangle, ArrowRight, Hash } from 'lucide-react';
import { SURAH_LIST, AUTHENTIC_TRANSLATIONS } from '../data/quranData';

const DIFFICULTIES = ["Beginner", "Basic", "Medium", "Advanced"];
const QUESTION_COUNTS = [5, 10, 15, 20];

export default function QuranQuizConfig({
  currentUser,
  islamicBooks,
  onGenerate,
  onBack
}) {
  const [moduleType, setModuleType] = useState('quran'); // 'quran' | 'islamic-book'
  const [selectedSurahId, setSelectedSurahId] = useState(67); // Default Surah Al-Mulk
  const [selectedTranslation, setSelectedTranslation] = useState('saheeh');
  const [selectedIslamicBookId, setSelectedIslamicBookId] = useState(islamicBooks[0]?.id || 'isl_1');
  const [difficulty, setDifficulty] = useState(currentUser?.level || 'Beginner');
  const [questionCount, setQuestionCount] = useState(10);
  
  // Scope states
  const [scope, setScope] = useState('Entire Book');
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(5);

  const [isGenerating, setIsGenerating] = useState(false);

  const selectedSurah = SURAH_LIST.find(s => s.id === Number(selectedSurahId)) || SURAH_LIST[0];
  const selectedIslamicBook = islamicBooks.find(b => b.id === selectedIslamicBookId) || islamicBooks[0];

  const handleStart = async () => {
    setIsGenerating(true);
    await onGenerate({
      categoryType: moduleType === 'quran' ? 'quran' : 'islamic',
      learnerProfile: currentUser,
      sourceData: moduleType === 'quran' ? { surahId: selectedSurahId, surahName: selectedSurah.name } : selectedIslamicBook,
      difficulty,
      questionCount,
      translation: selectedTranslation,
      scope: {
        type: scope,
        startChapter: Number(startChapter),
        endChapter: Number(endChapter)
      }
    });
    setIsGenerating(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-400">
      
      {/* Header */}
      <div>
        <button onClick={onBack} className="text-xs font-semibold text-slate-400 hover:text-white mb-2 cursor-pointer">
          ← Back to Categories
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Verified Islamic Library Quiz
            </h1>
            <p className="text-xs text-slate-300">
              Learner: <span className="font-bold text-emerald-300">{currentUser?.avatar} {currentUser?.name}</span> (Age {currentUser?.age})
            </p>
          </div>
        </div>
      </div>

      {/* Safety Disclaimer Banner */}
      <div className="rounded-2xl p-4 bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200 text-xs leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Authenticity & Safety Protocol:</span> AI generation uses strictly pre-verified authentic Islamic texts and Saheeh translation sources. Questions are 100% factual and historically authentic.
        </div>
      </div>

      {/* Module Type Selector Tabs */}
      <div className="flex glass-panel p-1.5 rounded-2xl border border-white/10">
        <button
          onClick={() => setModuleType('quran')}
          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            moduleType === 'quran'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📖 Holy Quran (Surahs & Juz)
        </button>
        <button
          onClick={() => setModuleType('islamic-book')}
          className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            moduleType === 'islamic-book'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📚 Authentic Islamic Books (Seerah / Hadith)
        </button>
      </div>

      <div className="rounded-3xl glass-panel p-8 border border-emerald-500/30 space-y-6 bg-gradient-to-b from-emerald-950/10 to-slate-900/40">
        
        {moduleType === 'quran' ? (
          <>
            {/* Surah Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Holy Quran Surah
              </label>
              <select
                value={selectedSurahId}
                onChange={(e) => setSelectedSurahId(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-emerald-500/40 text-white font-bold text-sm focus:outline-none focus:border-emerald-400 cursor-pointer"
              >
                {SURAH_LIST.map((s) => (
                  <option key={s.id} value={s.id}>
                    Surah {s.id}: {s.name} ({s.arabic}) - {s.english} • {s.type} ({s.verses} Verses, Juz {s.juz})
                  </option>
                ))}
              </select>
            </div>

            {/* Surah Metadata Card */}
            <div className="p-4 rounded-2xl glass-pill border border-emerald-500/20 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-300 text-sm">Surah {selectedSurah.name} ({selectedSurah.arabic})</span>
                <p className="text-slate-400">{selectedSurah.english} • {selectedSurah.verses} Ayahs • {selectedSurah.type}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Juz {selectedSurah.juz}
              </span>
            </div>

            {/* Translation Source */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Verified Translation Source
              </label>
              <div className="grid grid-cols-3 gap-3">
                {AUTHENTIC_TRANSLATIONS.map((tr) => (
                  <button
                    type="button"
                    key={tr.id}
                    onClick={() => setSelectedTranslation(tr.id)}
                    className={`py-2.5 rounded-2xl text-xs font-semibold border cursor-pointer ${
                      selectedTranslation === tr.id
                        ? 'bg-emerald-600/40 border-emerald-400 text-emerald-200 font-bold'
                        : 'glass-pill border-white/10 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    {tr.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Islamic Books Selector */
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Curated Islamic Book
              </label>
              <div className="space-y-3">
                {islamicBooks.map((ib) => {
                  const isSel = ib.id === selectedIslamicBookId;
                  return (
                    <div
                      key={ib.id}
                      onClick={() => setSelectedIslamicBookId(ib.id)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                        isSel
                          ? 'border-emerald-500 bg-emerald-950/50 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500'
                          : 'border-white/10 glass-pill hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                          {ib.category}
                        </span>
                        <span className="text-[10px] text-slate-400">Verified Authentic</span>
                      </div>
                      <h4 className="font-bold text-white text-sm mt-2">{ib.title}</h4>
                      <p className="text-xs text-slate-400">Author: {ib.author}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scope Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Content Scope Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Entire Book", "Specific Chapter"].map((sc) => (
                  <button
                    type="button"
                    key={sc}
                    onClick={() => setScope(sc)}
                    className={`py-2.5 rounded-2xl text-xs font-semibold border cursor-pointer ${
                      scope === sc
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-600/30'
                        : 'glass-pill border-white/10 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>

              {scope === "Specific Chapter" && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3 mt-3 animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                    <Hash className="w-4 h-4 text-emerald-400" />
                    <span>Specify Chapter Range:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">From Chapter:</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={startChapter}
                        onChange={(e) => setStartChapter(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-white text-xs font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">To Chapter:</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={endChapter}
                        onChange={(e) => setEndChapter(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-white text-xs font-bold focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                    : 'glass-pill border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Question Count */}
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
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                    : 'glass-pill border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {num} Questions
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleStart}
          disabled={isGenerating}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-emerald-500/30 apple-btn flex items-center justify-center gap-2 mt-4 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Verified Quiz...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate Islamic Quiz
            </>
          )}
        </button>

      </div>

    </div>
  );
}
