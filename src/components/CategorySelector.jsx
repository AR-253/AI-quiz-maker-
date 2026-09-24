import React from 'react';
import { BookOpen, Moon, ArrowRight, ShieldCheck, Sparkles, FileUp } from 'lucide-react';

export default function CategorySelector({ currentUser, onNavigate, onOpenUploadModal }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-400">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Step 1: Select Content Category
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          What do you want to create a quiz from?
        </h1>
        <p className="text-slate-300 text-sm">
          Generating quiz for <span className="text-indigo-400 font-bold">{currentUser?.avatar} {currentUser?.name}</span> (Level: {currentUser?.level})
        </p>
      </div>

      {/* Categories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Card 1: General Books */}
        <div 
          onClick={() => onNavigate('general-config')}
          className="group cursor-pointer rounded-3xl glass-panel p-8 border border-white/15 hover:border-indigo-500/60 glass-card-hover flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>

          <div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              User Document Upload
            </span>

            <h2 className="text-2xl font-bold text-white mt-4 group-hover:text-indigo-300 transition-colors">
              📖 General & Educational Books
            </h2>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Upload custom PDF, TXT, or DOCX documents (e.g. storybooks, science textbooks, history notes). The AI extracts key chapters and generates MCQs tailored to {currentUser?.name}'s age.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Configure General Quiz <ArrowRight className="w-4 h-4" />
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenUploadModal();
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl glass-pill hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-1.5"
            >
              <FileUp className="w-3.5 h-3.5 text-indigo-400" /> Upload File
            </button>
          </div>
        </div>

        {/* Card 2: Islamic Library & Quran */}
        <div 
          onClick={() => onNavigate('quran-config')}
          className="group cursor-pointer rounded-3xl glass-panel p-8 border border-emerald-500/30 hover:border-emerald-500/60 glass-card-hover flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-emerald-950/20 to-teal-950/20"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>

          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Moon className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Engine
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Authentic Text
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mt-4 group-hover:text-emerald-300 transition-colors">
              🕌 Verified Quran & Islamic Library
            </h2>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Factual AI quiz engine parsing verified authentic English, Urdu, and Hindi Quran translations (Surahs 1-114, 30 Juz) and authentic Hadith books.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Configure Quran & Islamic Quiz <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
