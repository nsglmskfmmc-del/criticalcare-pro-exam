
import React, { useState, useEffect, useCallback } from 'react';
import { QuizState, Question } from '../types';
import { Timer, ArrowRight, ArrowLeft, Send, CheckCircle } from 'lucide-react';

interface QuizViewProps {
  state: QuizState;
  onFinish: (finalState: QuizState) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ state: initialState, onFinish }) => {
  const [state, setState] = useState<QuizState>(initialState);
  
  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 0 || prev.isComplete) {
          clearInterval(timer);
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-finish if time runs out
  useEffect(() => {
    if (state.timeRemaining === 0 && !state.isComplete) {
      handleFinish();
    }
  }, [state.timeRemaining]);

  const handleAnswer = (optionIndex: number) => {
    const newUserAnswers = [...state.userAnswers];
    newUserAnswers[state.currentQuestionIndex] = optionIndex;
    setState(prev => ({ ...prev, userAnswers: newUserAnswers }));
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    }
  };

  const prevQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    }
  };

  const handleFinish = () => {
    let score = 0;
    state.questions.forEach((q, idx) => {
      if (state.userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    
    onFinish({ ...state, isComplete: true, score });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const progress = ((state.currentQuestionIndex + 1) / state.questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Quiz Header Info */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-20 z-40">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
            {state.currentQuestionIndex + 1}/{state.questions.length}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Knowledge Area</p>
            <p className="text-sm font-semibold text-slate-700">{currentQuestion.category}</p>
          </div>
        </div>

        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono font-bold ${
          state.timeRemaining < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-700'
        }`}>
          <Timer className="w-4 h-4" />
          <span>{formatTime(state.timeRemaining)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-4">
             <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wide">
               Question Scenario
             </span>
             <h3 className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed">
               {currentQuestion.question}
             </h3>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start space-x-4 ${
                  state.userAnswers[state.currentQuestionIndex] === idx
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100'
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold border-2 ${
                  state.userAnswers[state.currentQuestionIndex] === idx
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-300 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={`text-lg ${state.userAnswers[state.currentQuestionIndex] === idx ? 'text-indigo-900 font-medium' : 'text-slate-600'}`}>
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={prevQuestion}
            disabled={state.currentQuestionIndex === 0}
            className="flex items-center space-x-2 text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-semibold px-4 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {state.currentQuestionIndex === state.questions.length - 1 ? (
            <button
              onClick={handleFinish}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Submit Exam</span>
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg active:scale-95"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
