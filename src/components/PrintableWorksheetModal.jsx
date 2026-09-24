import React, { useState } from 'react';
import { Printer, X, Eye, EyeOff, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export default function PrintableWorksheetModal({ isOpen, onClose, quizData, currentUser }) {
  const [showAnswerKey, setShowAnswerKey] = useState(true);

  if (!isOpen || !quizData) return null;

  const { title, categoryType, questions = [] } = quizData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto printable-modal-wrapper">
      
      {/* Modal Container */}
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative my-auto border border-slate-200 printable-area">
        
        {/* Action Controls Header (Hidden during Print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 print:hidden">
          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700 uppercase tracking-wider">
              🖨️ Printable Kids Worksheet & Exam Sheet
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Paper Test & Printable View</h2>
            <p className="text-xs text-slate-500">Ready for home study, classroom practice, or PDF saving</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              {showAnswerKey ? <EyeOff className="w-4 h-4 text-purple-600" /> : <Eye className="w-4 h-4 text-purple-600" />}
              {showAnswerKey ? "Hide Answer Key" : "Show Answer Key"}
            </button>

            <button
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- PRINTABLE PAPER WORKSHEET CONTENT --- */}
        <div className="space-y-8 font-sans printable-sheet">
          
          {/* Printable Sheet Header */}
          <div className="border-b-2 border-slate-800 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {title || "Kids Learning & Practice Worksheet"}
                </h1>
                <p className="text-xs font-bold text-purple-700 uppercase tracking-widest mt-0.5">
                  Subject: {categoryType?.toUpperCase()} • Quiz AI Academic Series
                </p>
              </div>
              <div className="text-right">
                <div className="w-12 h-12 rounded-2xl border-2 border-purple-600 flex items-center justify-center font-black text-purple-600 text-lg ml-auto">
                  A+
                </div>
              </div>
            </div>

            {/* Student Name / Date Fill-in Line */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-200 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <span>Student Name:</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-400 pb-0.5">
                  {currentUser?.name || ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Date:</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-400 pb-0.5">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>Score:</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-400 pb-0.5 text-right">
                  ______ / {questions.length}
                </span>
              </div>
            </div>
          </div>

          {/* Worksheet Questions */}
          <div className="space-y-6">
            {questions.map((q, idx) => {
              // Check if question is a simple math problem (e.g. 3+3=)
              const isMathFillIn = q.question.includes('=') || q.question.includes('+') || q.question.includes('-');

              return (
                <div key={q.id || idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 print:bg-white print:border-slate-300 page-break-inside-avoid">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>

                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h3>

                      {q.surahAyahRef && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {q.surahAyahRef}
                        </span>
                      )}

                      {/* Fill in the blank box for Kids Math (3+3 = _____) */}
                      {isMathFillIn && (
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-600">Answer:</span>
                          <div className="w-36 h-10 border-2 border-dashed border-purple-400 rounded-xl bg-white flex items-center justify-center font-bold text-slate-800 text-sm">
                            _________________
                          </div>
                        </div>
                      )}

                      {/* 4 Options Boxes for Multiple Choice */}
                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                          {q.options.map((opt, optIdx) => {
                            const optionLetter = String.fromCharCode(65 + optIdx);
                            const isAnswer = opt === q.correctAnswer || optIdx === q.correctIndex;

                            return (
                              <div
                                key={optIdx}
                                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-3 transition-colors ${
                                  showAnswerKey && isAnswer
                                    ? 'bg-purple-100 border-purple-400 text-purple-900 font-bold'
                                    : 'bg-white border-slate-300 text-slate-800'
                                }`}
                              >
                                <span className={`w-6 h-6 rounded-lg border text-[11px] font-extrabold flex items-center justify-center ${
                                  showAnswerKey && isAnswer
                                    ? 'bg-purple-600 text-white border-purple-600'
                                    : 'bg-slate-100 text-slate-700 border-slate-300'
                                }`}>
                                  {optionLetter}
                                </span>
                                <span>{opt}</span>
                                {showAnswerKey && isAnswer && (
                                  <CheckCircle2 className="w-4 h-4 text-purple-600 ml-auto shrink-0 print:inline-block" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Answer Key Footer Table (Optional) */}
          {showAnswerKey && (
            <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-300">
              <h4 className="text-xs font-extrabold text-purple-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Teacher / Parent Answer Key
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {questions.map((q, idx) => {
                  const correctVal = q.correctAnswer || (q.options ? q.options[q.correctIndex || 0] : "N/A");
                  return (
                    <div key={idx} className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-slate-800 font-medium">
                      <span className="font-bold text-purple-700 mr-1.5">Q{idx + 1}:</span>
                      {correctVal}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Printable Footer */}
          <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400 font-medium">
            Generated with AI Quiz Maker • Smart Educational Worksheets for Kids & Academics
          </div>

        </div>

      </div>

    </div>
  );
}
