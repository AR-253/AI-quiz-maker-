import React from 'react';
import { Sparkles, User, LogOut, Moon, Sun } from 'lucide-react';

export default function Header({ 
  currentUser, 
  onLogout,
  onNavigate, 
  activeTab,
  theme,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight brand-logo-title">QuizAI</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full pro-max-badge">
                PRO MAX
              </span>
            </div>
            <p className="text-xs -mt-1 font-medium header-subtitle">Smart AI Learning Platform</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 glass-pill p-1 rounded-full border border-white/10">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('quiz-category')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'quiz-category' || activeTab === 'general-config' || activeTab === 'quran-config'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Generate Quiz
          </button>
          <button
            onClick={() => onNavigate('library')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'library'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Book Library
          </button>
          <button
            onClick={() => onNavigate('analytics')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Progress Report
          </button>
        </nav>

        {/* User Account & Theme Controls */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-full glass-pill border border-white/10 hover:border-indigo-500/50 transition-all text-slate-300 hover:text-white cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* User Account Info */}
          <div className="flex items-center gap-2 glass-pill px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-lg">{currentUser?.avatar || "👦"}</span>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-white leading-tight">{currentUser?.name}</p>
              <p className="text-[10px] text-indigo-300 font-medium">Age {currentUser?.age || 10} • {currentUser?.level}</p>
            </div>
          </div>

          {/* Log Out Button */}
          <button
            onClick={onLogout}
            title="Log Out"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill border border-rose-500/30 hover:bg-rose-500/10 text-rose-300 hover:text-rose-200 text-xs font-semibold transition-all apple-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>

        </div>

      </div>
    </header>
  );
}
