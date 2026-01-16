
import React, { useState, useEffect, useCallback } from 'react';
import { QuizConfig, QuizState, Category, Difficulty, Question } from './types';
import { INITIAL_QUESTIONS } from './constants';
import { generateAIQuestions, getAIFeedback } from './services/geminiService';
import SetupView from './components/SetupView';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import { Activity, ShieldCheck, HeartPulse } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'setup' | 'quiz' | 'results'>('setup');
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string>('');

  const startQuiz = async (newConfig: QuizConfig) => {
    setLoading(true);
    setConfig(newConfig);
    
    try {
      // For demo purposes, we mix initial and AI questions or just use AI if available
      let questions: Question[] = [];
      try {
        questions = await generateAIQuestions(newConfig.categories, newConfig.difficulty, newConfig.questionCount);
      } catch (e) {
        console.warn("Failed to fetch AI questions, falling back to static questions.");
        questions = INITIAL_QUESTIONS.filter(q => 
          newConfig.categories.includes(q.category) && q.difficulty === newConfig.difficulty
        ).slice(0, newConfig.questionCount);
        
        if (questions.length === 0) {
          questions = INITIAL_QUESTIONS.slice(0, newConfig.questionCount);
        }
      }

      setQuizState({
        questions,
        currentQuestionIndex: 0,
        userAnswers: new Array(questions.length).fill(null),
        timeRemaining: newConfig.timeLimitMinutes * 60,
        isComplete: false,
        score: 0
      });
      setView('quiz');
    } catch (error) {
      alert("Error starting quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (finalState: QuizState) => {
    setLoading(true);
    setQuizState(finalState);
    setView('results');
    
    try {
      const feedback = await getAIFeedback(finalState.score, finalState.questions.length, config?.categories || []);
      setAiFeedback(feedback);
    } catch (e) {
      setAiFeedback("Great job completing the exam. Review your results below.");
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setView('setup');
    setQuizState(null);
    setConfig(null);
    setAiFeedback('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Activity className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">CriticalCare<span className="text-indigo-600">Pro</span></h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium text-slate-500">
            <div className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Evidence-Based</span>
            </div>
            <div className="flex items-center space-x-1">
              <HeartPulse className="w-4 h-4 text-red-500" />
              <span>Clinical Scenarios</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {loading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium animate-pulse">Generating your exam environment...</p>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto w-full px-4 py-8">
          {view === 'setup' && <SetupView onStart={startQuiz} />}
          {view === 'quiz' && quizState && (
            <QuizView 
              state={quizState} 
              onFinish={handleFinish} 
            />
          )}
          {view === 'results' && quizState && (
            <ResultView 
              state={quizState} 
              feedback={aiFeedback}
              onReset={resetQuiz}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>© 2024 CriticalCare Pro Education. All content reviewed by AI for clinical accuracy.</p>
          <p className="mt-1">For educational purposes only. Always follow local hospital protocols.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
