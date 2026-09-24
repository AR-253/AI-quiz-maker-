import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';

const AVATARS = ["👦", "👧", "🧒", "👨‍🎓", "👩‍🎓", "🚀", "🦁", "🦉", "👑", "⭐"];
const LEVELS = ["Beginner", "Basic", "Medium", "Advanced"];

export default function LearnerModal({ isOpen, onClose, onSaveProfile }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(6);
  const [level, setLevel] = useState('Beginner');
  const [avatar, setAvatar] = useState('👦');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSaveProfile({ name, age: Number(age), level, avatar });
    setName('');
    setAge(6);
    setLevel('Beginner');
    setAvatar('👦');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Add Learner Profile</h2>
            <p className="text-xs text-slate-400">Create a learner profile to tailor AI question complexity</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Avatar Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Avatar
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av}
                  onClick={() => setAvatar(av)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-transform ${
                    avatar === av
                      ? 'bg-indigo-600 border-2 border-white scale-110 shadow-lg shadow-indigo-500/40'
                      : 'glass-pill hover:bg-white/10'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Learner Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Learner Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ahmed or Sara"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-900/80 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Age & Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Age: {age} Years
              </label>
              <input
                type="range"
                min="4"
                max="18"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Learning Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/30 apple-btn mt-4"
          >
            Create Profile
          </button>
        </form>

      </div>
    </div>
  );
}
