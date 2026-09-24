import React, { useState } from 'react';
import { Sparkles, User, Mail, Lock, ShieldCheck, ArrowRight, UserPlus, LogIn, CheckCircle2, Brain, BookOpen, Award, Zap } from 'lucide-react';
import { storageService } from '../services/storageService';
import authBg from '../assets/auth_bg.jpg';

const AVATARS = ["👦", "👧", "🧒", "👨‍🎓", "👩‍🎓", "🚀", "🦁", "🦉", "👑", "⭐"];
const LEVELS = ["Beginner", "Basic", "Medium", "Advanced"];

export default function AuthScreen({ onLoginSuccess }) {
  const [activeMode, setActiveMode] = useState('login'); // 'login' | 'register'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(8);
  const [level, setLevel] = useState('Beginner');
  const [avatar, setAvatar] = useState('👦');
  const [registerError, setRegisterError] = useState('');

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }

    const res = storageService.login(loginEmail, loginPassword);
    if (res.success) {
      onLoginSuccess(res.user);
    } else {
      setLoginError(res.message);
    }
  };

  // Handle Quick Demo Login
  const handleQuickLogin = (emailStr) => {
    const res = storageService.login(emailStr, 'password123');
    if (res.success) {
      onLoginSuccess(res.user);
    }
  };

  // Handle Register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterError('');

    if (!name.trim() || !email.trim() || !password) {
      setRegisterError('Please fill in all required fields.');
      return;
    }

    const res = storageService.register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      age: Number(age),
      level,
      avatar
    });

    if (res.success) {
      onLoginSuccess(res.user);
    } else {
      setRegisterError(res.message);
    }
  };

  const demoUsers = storageService.getAllUsers();

  return (
    <div className="auth-scope min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      {/* 1. HIGH-TECH AI GENERATED BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-pulse-glow transition-all duration-1000 opacity-65 pointer-events-none"
        style={{ backgroundImage: `url(${authBg})` }}
      />

      {/* 2. ATMOSPHERIC DARK GRADIENT OVERLAY & BLUR MASK */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070913]/85 via-[#0b0f19]/70 to-[#070913]/90 backdrop-blur-[2px] pointer-events-none" />

      {/* 3. CYBER GRID OVERLAY PATTERN */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 4. GLOWING AURORA LIGHT ORBS */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-600/35 via-cyan-500/25 to-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-gradient-to-br from-purple-600/35 via-pink-500/25 to-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-float-reverse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>

      {/* 5. FLOATING BACKGROUND BADGES (DECORATIVE) */}
      <div className="hidden lg:flex absolute top-10 left-12 items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/70 border border-white/20 backdrop-blur-xl text-xs font-bold text-indigo-300 shadow-2xl animate-float-slow pointer-events-none">
        <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>Instant AI Quiz Generator</span>
      </div>

      <div className="hidden lg:flex absolute top-20 right-14 items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/70 border border-white/20 backdrop-blur-xl text-xs font-bold text-emerald-300 shadow-2xl animate-float-reverse-slow pointer-events-none">
        <BookOpen className="w-4 h-4 text-emerald-400" />
        <span>Quran & Book Library</span>
      </div>

      <div className="hidden lg:flex absolute bottom-14 left-14 items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/70 border border-white/20 backdrop-blur-xl text-xs font-bold text-purple-300 shadow-2xl animate-float-reverse-slow pointer-events-none">
        <Brain className="w-4 h-4 text-purple-400" />
        <span>Adaptive Difficulty Levels</span>
      </div>

      <div className="hidden lg:flex absolute bottom-10 right-12 items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/70 border border-white/20 backdrop-blur-xl text-xs font-bold text-pink-300 shadow-2xl animate-float-slow pointer-events-none">
        <Award className="w-4 h-4 text-pink-400" />
        <span>Per-User Analytics & History</span>
      </div>

      {/* 6. MAIN AUTH CARD CONTAINER */}
      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Brand Logo Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-70 animate-pulse-glow"></div>
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-2xl border border-white/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2 drop-shadow-md">
              QuizAI <span className="text-[10px] uppercase font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40 text-indigo-200 border border-white/30 tracking-wider shadow-lg">PRO MAX</span>
            </h1>
            <p className="text-xs text-slate-300 mt-1 font-medium drop-shadow">Smart AI Learning Platform • User Authentication</p>
          </div>
        </div>

        {/* Auth Mode Toggle Pill */}
        <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-white/20 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => { setActiveMode('login'); setLoginError(''); }}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'login'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/50 border border-white/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
          <button
            onClick={() => { setActiveMode('register'); setRegisterError(''); }}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'register'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/50 border border-white/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <UserPlus className="w-4 h-4" /> Create Account
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeMode === 'login' && (
          <div className="auth-card-glass rounded-3xl p-7 space-y-6 relative overflow-hidden transition-all duration-300">
            {/* Top Glowing Edge Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Welcome Back</h2>
              <p className="text-xs text-slate-300 mt-1">Sign in to access your AI quizzes & progress dashboard</p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0"></span>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. ahmed@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="auth-input w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="auth-input w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold text-xs shadow-xl shadow-indigo-500/40 apple-btn flex items-center justify-center gap-2 mt-2 border border-white/30 cursor-pointer"
              >
                Sign In to Account <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Login Accounts */}
            <div className="border-t border-white/15 pt-4 mt-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center justify-between">
                <span>Quick Demo Accounts:</span>
                <span className="text-[10px] text-indigo-300 font-medium">One-click instant login</span>
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {demoUsers.slice(0, 4).map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleQuickLogin(u.email)}
                    className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-900/80 hover:bg-indigo-900/50 text-left border border-white/15 hover:border-indigo-400/50 transition-all text-xs group cursor-pointer"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">{u.avatar}</span>
                    <div className="overflow-hidden">
                      <p className="font-bold text-white leading-tight truncate group-hover:text-indigo-300 transition-colors">{u.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{u.level}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* REGISTER FORM */}
        {activeMode === 'register' && (
          <div className="auth-card-glass rounded-3xl p-7 space-y-5 relative overflow-hidden transition-all duration-300">
            {/* Top Glowing Edge Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Create New Account</h2>
              <p className="text-xs text-slate-300 mt-1">Enter your details to create your personalized learner profile</p>
            </div>

            {registerError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0"></span>
                {registerError}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Avatar Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Select Profile Avatar
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATARS.map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setAvatar(av)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                        avatar === av
                          ? 'bg-indigo-600 border-2 border-white scale-110 shadow-lg shadow-indigo-500/50'
                          : 'bg-slate-900/80 hover:bg-slate-800 border border-white/15'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmed Khan or Sara"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="auth-input w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. ahmed@quizai.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="Choose a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-medium"
                  />
                </div>
              </div>

              {/* Age & Learning Level */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1">
                    Age (Years - No Limit)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="auth-input w-full px-3.5 py-2 rounded-2xl text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-1">
                    Learning Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="auth-input w-full px-3 py-2.5 rounded-2xl text-xs font-semibold"
                  >
                    {LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold text-xs shadow-xl shadow-indigo-500/40 apple-btn flex items-center justify-center gap-2 mt-4 border border-white/30 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Create Account & Start Learning
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
