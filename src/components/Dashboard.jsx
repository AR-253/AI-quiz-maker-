import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Moon, 
  TrendingUp, 
  Award, 
  Clock, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Play, 
  BarChart3,
  BookMarked,
  User
} from 'lucide-react';

export default function Dashboard({
  currentUser,
  analytics,
  onNavigate,
  onOpenUploadModal,
  quizzesHistory,
  onReviewQuiz,
  onOpenEditProfile
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Hero Banner */}
      <div className="hero-banner relative overflow-hidden rounded-3xl p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Welcome back, {currentUser?.name || "Learner"}!
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready for your next learning quiz?
            </h1>
            <p className="hero-subtitle text-sm mt-2 max-w-xl">
              Log in Account: <span className="font-bold underline">{currentUser?.avatar} {currentUser?.name}</span> (Age {currentUser?.age || 10} • {currentUser?.level} Level). Upload books or choose from the Quran & Islamic Library.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('quiz-category')}
              className="btn-primary px-6 py-3 rounded-2xl font-bold text-sm shadow-xl apple-btn flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4" /> Create New Quiz
            </button>
            <button
              onClick={onOpenUploadModal}
              className="btn-secondary px-5 py-3 rounded-2xl font-semibold text-sm apple-btn flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Upload PDF Book
            </button>
          </div>
        </div>
      </div>

      {/* Main Feature Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General Educational Books */}
        <div 
          onClick={() => onNavigate('general-config')}
          className="group cursor-pointer rounded-3xl glass-panel p-6 border border-white/10 hover:border-indigo-500/50 glass-card-hover relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
            📖 General & Educational Books
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Upload custom PDFs, TXT, or DOCX documents. Our AI extracts text content and builds tailored MCQ quizzes based on {currentUser?.name}'s level.
          </p>
          <div className="mt-6 flex items-center text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
            Select Book & Generate Quiz <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Islamic Library & Quran */}
        <div 
          onClick={() => onNavigate('quran-config')}
          className="group cursor-pointer rounded-3xl glass-panel p-6 border border-emerald-500/30 hover:border-emerald-500/60 glass-card-hover relative overflow-hidden bg-gradient-to-br from-emerald-950/20 to-teal-950/20"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <Moon className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
              🕌 Verified Quran & Islamic Library
            </h3>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Verified
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Generate factual quizzes from pre-loaded authentic Quran translations (Surahs 1-114, Juz) or curated Hadith & Seerah books with exact verse citations.
          </p>
          <div className="mt-6 flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
            Open Quran & Islamic Module <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl glass-panel p-4 border border-white/10">
          <div className="flex items-center gap-3 text-indigo-400 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Quizzes</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{analytics?.totalQuizzes || 0}</p>
        </div>

        <div className="rounded-2xl glass-panel p-4 border border-white/10">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Score</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{analytics?.avgScorePercent || 0}%</p>
        </div>

        <div className="rounded-2xl glass-panel p-4 border border-white/10">
          <div className="flex items-center gap-3 text-purple-400 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Questions Answered</span>
          </div>
          <p className="text-2xl font-extrabold text-white">{analytics?.totalQuestionsAnswered || 0}</p>
        </div>

        <div className="rounded-2xl glass-panel p-4 border border-white/10">
          <div className="flex items-center gap-3 text-amber-400 mb-2">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Level</span>
          </div>
          <p className="text-lg font-bold text-white mt-1">{currentUser?.level || 'Beginner'}</p>
        </div>
      </div>

      {/* Recent Quiz History */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" /> Recent Quiz Activity ({currentUser?.name})
          </h3>
          <button 
            onClick={() => onNavigate('analytics')}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
          >
            View Full Report →
          </button>
        </div>

        {quizzesHistory && quizzesHistory.length > 0 ? (
          <div className="space-y-3">
            {quizzesHistory.slice(0, 4).map((q) => (
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
                    Attempted by <span className="font-semibold text-slate-200">{q.userName || currentUser?.name}</span> • {new Date(q.attemptedAt).toLocaleDateString()}
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
            <BookMarked className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold">No quizzes attempted yet for {currentUser?.name}.</p>
            <p className="text-xs text-slate-500 mt-1">Select a category above to take your first AI Quiz!</p>
          </div>
        )}
      </div>

    </div>
  );
}
