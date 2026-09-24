import React from 'react';
import { BarChart3, TrendingUp, Award, BookOpen, Moon, Clock, CheckCircle2, RefreshCw } from 'lucide-react';

export default function ProgressAnalytics({ currentUser, analytics, quizzesHistory, onReviewQuiz }) {
  const {
    totalQuizzes,
    avgScorePercent,
    totalQuestionsAnswered,
    totalCorrect,
    categoryBreakdown
  } = analytics;

  const userQuizzes = quizzesHistory || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-400">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-indigo-400" /> Learner Progress Report
        </h1>
        <p className="text-slate-300 text-xs mt-1">
          Detailed performance analytics for <span className="font-bold text-indigo-300">{currentUser?.avatar} {currentUser?.name}</span> (Age {currentUser?.age} • Level {currentUser?.level})
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-3xl glass-panel p-6 border border-white/10">
          <div className="flex items-center gap-3 text-indigo-400 mb-2">
            <Award className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Quizzes</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{totalQuizzes}</p>
          <p className="text-xs text-slate-400 mt-1">Completed by {currentUser?.name}</p>
        </div>

        <div className="rounded-3xl glass-panel p-6 border border-white/10">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Accuracy Rate</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{avgScorePercent}%</p>
          <p className="text-xs text-emerald-400 font-semibold mt-1">Overall Average</p>
        </div>

        <div className="rounded-3xl glass-panel p-6 border border-white/10">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Questions Answered</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{totalQuestionsAnswered}</p>
          <p className="text-xs text-purple-300 font-semibold mt-1">{totalCorrect || 0} Correct</p>
        </div>

        <div className="rounded-3xl glass-panel p-6 border border-white/10">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <Clock className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mastery Level</span>
          </div>
          <p className="text-xl font-bold text-white mt-1">{currentUser?.level}</p>
          <p className="text-xs text-slate-400 mt-1">Target Age: {currentUser?.age} Years</p>
        </div>
      </div>

      {/* Category Mastery Breakdown */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
        <h2 className="text-lg font-bold text-white">Category Mastery Breakdown</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl glass-pill border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">General Books</h4>
                <p className="text-xs text-slate-400">{categoryBreakdown?.general || 0} Quizzes</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-500/30">
              Active
            </span>
          </div>

          <div className="p-4 rounded-2xl glass-pill border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Quran Engine</h4>
                <p className="text-xs text-slate-400">{categoryBreakdown?.quran || 0} Quizzes</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Verified
            </span>
          </div>

          <div className="p-4 rounded-2xl glass-pill border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Islamic Books</h4>
                <p className="text-xs text-slate-400">{categoryBreakdown?.islamic || 0} Quizzes</p>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/30">
              Authentic
            </span>
          </div>
        </div>
      </div>

      {/* Full History Table */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
        <h2 className="text-lg font-bold text-white">Full Quiz Attempt History ({currentUser?.name})</h2>

        {userQuizzes && userQuizzes.length > 0 ? (
          <div className="space-y-3">
            {userQuizzes.map((q) => (
              <div 
                key={q.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl glass-pill hover:bg-white/5 transition-all gap-3 border border-white/5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{q.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 uppercase font-semibold">
                      {q.categoryType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Attempted on {new Date(q.attemptedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-white">{q.score} / {q.totalQuestions}</span>
                    <span className="text-xs text-emerald-400 font-bold ml-2">
                      ({Math.round((q.score / q.totalQuestions) * 100)}%)
                    </span>
                  </div>
                  <button
                    onClick={() => onReviewQuiz(q)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-xs font-semibold border border-indigo-500/30 apple-btn"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <p className="text-sm font-semibold">No quizzes recorded yet for {currentUser?.name}.</p>
          </div>
        )}
      </div>

    </div>
  );
}
