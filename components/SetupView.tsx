
import React, { useState } from 'react';
import { QuizConfig, Category, Difficulty } from '../types';
import { Settings, Play, CheckCircle2, AlertCircle } from 'lucide-react';

interface SetupViewProps {
  onStart: (config: QuizConfig) => void;
}

const SetupView: React.FC<SetupViewProps> = ({ onStart }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(Object.values(Category));
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [count, setCount] = useState(10);
  const [time, setTime] = useState(15);

  const toggleCategory = (cat: Category) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleStart = () => {
    onStart({
      categories: selectedCategories,
      difficulty,
      questionCount: count,
      timeLimitMinutes: time
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">Prepare for Excellence</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Customize your critical care simulation. Choose topics and difficulty to challenge your clinical judgment.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
        {/* Categories */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-slate-800">Knowledge Domains</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  selectedCategories.includes(cat)
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="font-medium">{cat}</span>
                {selectedCategories.includes(cat) ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300" />
                )}
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Difficulty */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Clinical Difficulty</h3>
            <div className="flex space-x-2">
              {Object.values(Difficulty).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-3 px-2 rounded-lg text-sm font-semibold transition-all ${
                    difficulty === d
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </section>

          {/* Settings */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Exam Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Items</label>
                <select 
                  value={count} 
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full bg-slate-100 border-none rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  {[5, 10, 20, 30].map(n => <option key={n} value={n}>{n} Questions</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Time Limit</label>
                <select 
                  value={time} 
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full bg-slate-100 border-none rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  {[5, 10, 15, 30, 60].map(t => <option key={t} value={t}>{t} Minutes</option>)}
                </select>
              </div>
            </div>
          </section>
        </div>

        <button
          onClick={handleStart}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-xl shadow-indigo-200 active:scale-95"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Launch Examination</span>
        </button>

        <div className="flex items-start space-x-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <p>This exam uses Gemini Flash AI to dynamically generate NCLEX-style scenarios based on your selections for a unique study session every time.</p>
        </div>
      </div>
    </div>
  );
};

export default SetupView;
