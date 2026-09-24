import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CategorySelector from './components/CategorySelector';
import GeneralQuizConfig from './components/GeneralQuizConfig';
import QuranQuizConfig from './components/QuranQuizConfig';
import QuizRunner from './components/QuizRunner';
import QuizResult from './components/QuizResult';
import BookLibrary from './components/BookLibrary';
import ProgressAnalytics from './components/ProgressAnalytics';
import BookUploadModal from './components/BookUploadModal';
import AuthScreen from './components/AuthScreen';
import { storageService } from './services/storageService';
import { generateQuizAI } from './services/aiGenerator';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [generalBooks, setGeneralBooks] = useState([]);
  const [islamicBooks, setIslamicBooks] = useState([]);
  const [quizzesHistory, setQuizzesHistory] = useState([]);

  // Theme State ('dark' | 'light')
  const [theme, setTheme] = useState(() => localStorage.getItem('quiz_theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('quiz_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Active Quiz State
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Initial Load from Storage Service
  useEffect(() => {
    const user = storageService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadUserData(user.id);
    }
  }, []);

  const loadUserData = (userId) => {
    setGeneralBooks(storageService.getGeneralBooks());
    setIslamicBooks(storageService.getIslamicBooks());
    setQuizzesHistory(storageService.getQuizzesForUser(userId));
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    loadUserData(user.id);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    storageService.logout();
    setCurrentUser(null);
  };

  const handleUploadSuccess = (newBookData) => {
    storageService.addGeneralBook(newBookData);
    setGeneralBooks(storageService.getGeneralBooks());
  };

  // Generate Quiz Trigger
  const handleGenerateQuiz = async (quizConfig) => {
    const { categoryType, learnerProfile, sourceData, difficulty, questionCount, scope, translation } = quizConfig;
    
    const userToUse = learnerProfile || currentUser;

    const aiOutput = await generateQuizAI({
      categoryType,
      learnerProfile: userToUse,
      sourceData,
      difficulty,
      questionCount,
      scope,
      translation
    });

    const quizTitle = categoryType === 'quran' 
      ? `Surah ${sourceData?.surahName || 'Quran'}` 
      : sourceData?.title || 'Educational Quiz';

    const quizSession = {
      id: `quiz_${Date.now()}`,
      title: quizTitle,
      categoryType,
      difficulty,
      questions: aiOutput.questions,
      disclaimer: aiOutput.disclaimer || null,
      totalQuestions: aiOutput.questions.length,
      sourceData,
      userId: currentUser.id,
      userName: currentUser.name,
      learnerProfileId: currentUser.id
    };

    setCurrentQuiz(quizSession);
    setActiveTab('quiz-runner');
  };

  // Submit Quiz Answers
  const handleSubmitQuiz = ({ answers, timeTakenSeconds }) => {
    const questions = currentQuiz.questions;
    let correctCount = 0;

    questions.forEach(q => {
      const userChoice = answers[q.id];
      const isCorrect = userChoice === q.correctAnswer || (q.correctIndex !== undefined && q.options[q.correctIndex] === userChoice);
      if (isCorrect) correctCount++;
    });

    const totalQuestions = questions.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    const resultRecord = {
      ...currentQuiz,
      score: correctCount,
      totalQuestions,
      scorePercent,
      userAnswers: answers,
      timeTakenSeconds,
      userId: currentUser.id,
      userName: currentUser.name
    };

    // Save to persistent storage
    storageService.saveQuizAttempt(resultRecord);
    setQuizzesHistory(storageService.getQuizzesForUser(currentUser.id));

    setLastResult(resultRecord);
    setActiveTab('quiz-result');
  };

  // If user is not logged in, render Auth Screen
  if (!currentUser) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const analytics = storageService.getUserAnalytics(currentUser.id);

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Glass Header */}
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={setActiveTab}
        activeTab={activeTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'dashboard' && (
          <Dashboard
            currentUser={currentUser}
            analytics={analytics}
            onNavigate={setActiveTab}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            quizzesHistory={quizzesHistory}
            onReviewQuiz={(quizRecord) => {
              setLastResult(quizRecord);
              setActiveTab('quiz-result');
            }}
          />
        )}

        {activeTab === 'quiz-category' && (
          <CategorySelector
            currentUser={currentUser}
            onNavigate={setActiveTab}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        )}

        {activeTab === 'general-config' && (
          <GeneralQuizConfig
            currentUser={currentUser}
            books={generalBooks}
            onGenerate={handleGenerateQuiz}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onBack={() => setActiveTab('quiz-category')}
          />
        )}

        {activeTab === 'quran-config' && (
          <QuranQuizConfig
            currentUser={currentUser}
            islamicBooks={islamicBooks}
            onGenerate={handleGenerateQuiz}
            onBack={() => setActiveTab('quiz-category')}
          />
        )}

        {activeTab === 'quiz-runner' && currentQuiz && (
          <QuizRunner
            quizData={currentQuiz}
            currentUser={currentUser}
            onSubmitQuiz={handleSubmitQuiz}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'quiz-result' && lastResult && (
          <QuizResult
            resultData={lastResult}
            currentUser={currentUser}
            onRetake={() => {
              handleGenerateQuiz({
                categoryType: lastResult.categoryType,
                learnerProfile: currentUser,
                sourceData: lastResult.sourceData,
                difficulty: lastResult.difficulty,
                questionCount: lastResult.totalQuestions
              });
            }}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'library' && (
          <BookLibrary
            generalBooks={generalBooks}
            islamicBooks={islamicBooks}
            onNavigate={setActiveTab}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <ProgressAnalytics
            currentUser={currentUser}
            analytics={analytics}
            quizzesHistory={quizzesHistory}
            onReviewQuiz={(quizRecord) => {
              setLastResult(quizRecord);
              setActiveTab('quiz-result');
            }}
          />
        )}

      </main>

      {/* Upload Modal */}
      <BookUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-6 text-center text-xs text-slate-500">
        QuizAI Platform • Smart AI Learning Engine with Per-User Account History
      </footer>

    </div>
  );
}
