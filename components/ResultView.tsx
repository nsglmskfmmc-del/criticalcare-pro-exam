
import React from 'react';
import { QuizState } from '../types';
import { Trophy, RotateCcw, CheckCircle2, XCircle, ChevronDown, Info } from 'lucide-react';

interface ResultViewProps {
  state: QuizState;
  feedback: string;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ state, feedback, onReset }) => {
  const percentage = Math.round((state.score / state.questions.length) * 100);
  const isPassing = percentage >= 80;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Score Header */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-200 overflow-hidden text-center p-8 md:p-12 space-y-6">
        <div className="flex justify-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-inner ${
            isPassing ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
          }`}>
            <Trophy className="w-12 h-12" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-900">{percentage}%</h2>
          <p className="text-lg font-semibold text-slate-500">
            You scored {state.score} out of {state.questions.length} correct
          </p>
          <div className="flex justify-center">
             <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest ${
               isPassing ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
             }`}>
               {isPassing ? 'Passing Grade' : 'Remediation Required'}
             </span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-100">
           <div className="flex items-center space-x-2 mb-3 text-indigo-600">
              <Info className="w-5 h-5" />
              <h3 className="font-bold">AI Clinical Analysis</h3>
           </div>
           <p className="text-slate-600 leading-relaxed italic">
             "{feedback}"
           </p>
        </div>

        <button
          onClick={onReset}
          className="flex items-center space-x-2 mx-auto text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>New Examination</span>
        </button>
      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-800 px-2">Clinical Review</h3>
        <div className="space-y-4">
          {state.questions.map((q, idx) => {
            const userAnswer = state.userAnswers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <div 
                key={q.id}
                className={`bg-white rounded-2xl border transition-all ${
                  isCorrect ? 'border-green-200' : 'border-red-200'
                }`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-slate-800 text-lg leading-snug pr-8">
                      {idx + 1}. {q.question}
                    </h4>
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, oIdx) => (
                      <div 
                        key={oIdx}
                        className={`p-3 rounded-lg text-sm border ${
                          oIdx === q.correctAnswer 
                            ? 'bg-green-50 border-green-200 text-green-800 font-medium'
                            : oIdx === userAnswer 
                              ? 'bg-red-50 border-red-200 text-red-800'
                              : 'bg-slate-50 border-slate-100 text-slate-500'
                        }`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Clinical Rationale</p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {q.rationale}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultView;
