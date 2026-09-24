import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RefreshCw, Home, BookOpen, AlertCircle } from 'lucide-react';

export default function QuizResult({ resultData, currentUser, onRetake, onBackToDashboard }) {
  const {
    title,
    categoryType,
    score,
    totalQuestions,
    scorePercent,
    questions,
    userAnswers,
    timeTakenSeconds
  } = resultData;

  const isPassed = scorePercent >= 60;

  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isPassed]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Top Score Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-8 border border-white/20 text-center space-y-6 bg-gradient-to-b from-indigo-900/40 via-purple-900/20 to-slate-900/60 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-indigo-400" /> Quiz Completed 🎉
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {isPassed ? "Great Job!" : "Keep Practicing!"}
          </h1>
          <p className="text-slate-300 text-xs mt-1">
            Learner: <span className="font-bold text-white">{currentUser?.avatar} {currentUser?.name}</span> • Time Taken: {formatTime(timeTakenSeconds || 120)}
          </p>
        </div>

        {/* Score Wheel */}
        <div className="w-36 h-36 mx-auto rounded-full bg-slate-950/80 border-4 border-indigo-500/40 flex flex-col items-center justify-center shadow-inner relative">
          <span className="text-4xl font-extrabold text-white">{scorePercent}%</span>
          <span className="text-xs text-indigo-300 font-bold mt-0.5">{score} / {totalQuestions} Correct</span>
        </div>

        {/* Status Badge */}
        <div>
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
            isPassed
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            {isPassed ? "PASSED WITH EXCELLENCE" : "NEEDS IMPROVEMENT"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onRetake}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg apple-btn flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Retake Quiz
          </button>
          <button
            onClick={onBackToDashboard}
            className="px-6 py-3 rounded-2xl glass-pill hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/15 apple-btn flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-indigo-400" /> Back to Dashboard
          </button>
        </div>
      </div>

      {/* Answer Review Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" /> Detailed Answer Review
        </h2>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            
            // Check if correct choice
            const isCorrect = userChoice === q.correctAnswer || (q.correctIndex !== undefined && q.options[q.correctIndex] === userChoice);

            return (
              <div
                key={q.id}
                className={`rounded-3xl glass-panel p-6 border transition-all ${
                  isCorrect
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-red-500/30 bg-red-950/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Question {idx + 1}</span>
                    {q.surahAyahRef && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {q.surahAyahRef}
                      </span>
                    )}
                  </div>

                  <span className={`flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full ${
                    isCorrect
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base mt-2 leading-relaxed">
                  {q.question}
                </h3>

                {/* Answers Breakdown */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-400">Your Answer:</span>
                    <span className={`font-bold ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                      {userChoice || "No answer selected"}
                    </span>
                  </div>

                  {!isCorrect && (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-slate-400">Correct Answer:</span>
                      <span className="font-bold text-emerald-300">
                        {q.correctAnswer || q.options[q.correctIndex || 0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Explanation Box */}
                {q.explanation && (
                  <div className="mt-4 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
                    <span className="font-bold text-indigo-300">💡 Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
