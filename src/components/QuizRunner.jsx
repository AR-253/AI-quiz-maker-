import React, { useState, useEffect } from 'react';
import { Clock, Bookmark, AlertTriangle, ChevronLeft, ChevronRight, CheckCircle, Sparkles, Flag, Printer } from 'lucide-react';
import PrintableWorksheetModal from './PrintableWorksheetModal';

export default function QuizRunner({ quizData, currentUser, onSubmitQuiz, onCancel }) {
  const { questions, disclaimer, title, categoryType } = quizData;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionString }
  const [bookmarked, setBookmarked] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionText) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionText
    }));
  };

  const toggleBookmark = (qId) => {
    setBookmarked((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    onSubmitQuiz({
      answers: userAnswers,
      timeTakenSeconds: timerSeconds
    });
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Bar */}
      <div className="rounded-3xl glass-panel p-4 sm:p-6 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 uppercase">
              {categoryType} QUIZ
            </span>
            <span className="text-xs text-slate-400 font-medium">{title}</span>
          </div>
          <h1 className="text-xl font-extrabold text-white mt-1">
            Question {currentIndex + 1} of {totalQuestions}
          </h1>
        </div>

        {/* Right Info Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 apple-btn cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print Worksheet
          </button>

          <div className="flex items-center gap-2 glass-pill px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-slate-200">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>{formatTime(timerSeconds)}</span>
          </div>

          <div className="glass-pill px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-indigo-300">
            {currentUser?.avatar} {currentUser?.name}
          </div>

          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 cursor-pointer"
          >
            Quit Exam
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-white/10 p-0.5">
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Quran Auto-Disclaimer Banner */}
      {disclaimer && (
        <div className="rounded-2xl p-4 bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-amber-200 text-xs leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{disclaimer}</span>
        </div>
      )}

      {/* Question Card */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/15 space-y-6">
        
        <div className="flex items-start justify-between gap-4">
          <div>
            {/* Surah/Ayah Citation if applicable */}
            {currentQuestion.surahAyahRef && (
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-3">
                📖 Verified Reference: {currentQuestion.surahAyahRef}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          <button
            onClick={() => toggleBookmark(currentQuestion.id)}
            className={`p-2.5 rounded-2xl transition-colors ${
              bookmarked[currentQuestion.id]
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'glass-pill text-slate-400 hover:text-white'
            }`}
            title="Bookmark for review"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((optionText, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            const isSelected = userAnswers[currentQuestion.id] === optionText;

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(optionText)}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                    : 'glass-pill border-white/10 hover:border-white/25 hover:bg-white/5 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm transition-all ${
                      isSelected
                        ? 'bg-indigo-500 text-white shadow-md'
                        : 'bg-white/10 text-slate-300 group-hover:bg-white/20'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="font-semibold text-sm sm:text-base">{optionText}</span>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-500'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Question Footer Controls */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-5 py-3 rounded-2xl glass-pill text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg apple-btn flex items-center gap-1"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-extrabold shadow-xl shadow-emerald-500/30 apple-btn flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" /> Submit Quiz
            </button>
          )}
        </div>

      </div>

      {/* Submit Modal Confirmation */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-panel p-6 border border-white/20 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-extrabold text-white">Ready to Submit Quiz?</h3>
            <p className="text-slate-300 text-xs">
              You answered <span className="font-bold text-emerald-400">{answeredCount}</span> out of <span className="font-bold text-white">{totalQuestions}</span> questions.
            </p>

            {answeredCount < totalQuestions && (
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-semibold">
                ⚠️ You have {totalQuestions - answeredCount} unanswered questions!
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 rounded-2xl glass-pill text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Continue Test
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 apple-btn cursor-pointer"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Worksheet Modal */}
      <PrintableWorksheetModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        quizData={quizData}
        currentUser={currentUser}
      />

    </div>
  );
}
