import React, { useState } from 'react';
import { ArrowRight, RefreshCw, CheckCircle } from 'lucide-react';

const FunTest = ({ test, t, onBack }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: option }
  const [showResult, setShowResult] = useState(false);

  const isMultiQuestion = !!test.questions;
  const currentQuestion = isMultiQuestion ? test.questions[currentQIndex] : test;
  const totalQuestions = isMultiQuestion ? test.questions.length : 1;

  const handleOptionClick = (option) => {
    if (isMultiQuestion) {
       const newAnswers = { ...answers, [currentQIndex]: option };
       setAnswers(newAnswers);

       if (currentQIndex < totalQuestions - 1) {
         setTimeout(() => setCurrentQIndex(currentQIndex + 1), 250);
       } else {
         setShowResult(true);
       }
    } else {
       // Single question mode
       setAnswers({ 0: option });
       setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans text-slate-800">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=3786&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
             <div className="relative z-10">
                <h2 className="text-xl font-bold mb-1">{test.title}</h2>
                <p className="text-indigo-100 text-xs opacity-80">{t.ui.deep_analysis}</p>
             </div>
          </div>

          <div className="p-8 space-y-8">
            {isMultiQuestion ? (
                // Multi-question result view
                Object.keys(answers).map((qIndex) => {
                    const q = test.questions[qIndex];
                    const answer = answers[qIndex];
                    return (
                        <div key={qIndex} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                            <h4 className="font-bold text-slate-900 mb-2 text-sm">{q.question}</h4>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center">
                                        {answer.id}
                                    </span>
                                    <span className="font-bold text-indigo-900 text-sm">{answer.label}</span>
                                </div>
                                <div className="text-xs text-slate-600 leading-relaxed pl-8">
                                    <span className="font-bold block mb-1 text-slate-800">{answer.result.title}</span>
                                    {answer.result.desc}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                // Single question result view
                <div className="text-center">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        {answers[0].id}
                    </div>
                    <h3 className="text-lg font-bold text-indigo-900 mb-2">{answers[0].result.title}</h3>
                    <p className="text-sm text-slate-500 mb-6">{answers[0].label}</p>
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm leading-relaxed text-slate-700 text-left">
                        {answers[0].result.desc}
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={resetTest}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-200"
              >
                <RefreshCw className="w-4 h-4" />
                {t.ui.restart}
              </button>
              <button
                onClick={onBack}
                className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                {t.ui.back}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px]">
        <div className="relative h-48 bg-gray-200">
            <img src={test.image} alt={test.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h2 className="text-white font-bold text-xl leading-tight text-shadow">{test.title}</h2>
            </div>
            <button
                onClick={onBack}
                className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
            >
                <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
        </div>

        <div className="p-8 flex-1 flex flex-col">
          {isMultiQuestion && (
             <div className="mb-4 text-xs font-bold text-indigo-600 tracking-wider uppercase">
                {t.ui.question_progress.replace('{current}', currentQIndex + 1).replace('{total}', totalQuestions)}
             </div>
          )}

          <p className="text-lg font-medium text-slate-800 mb-8 leading-relaxed">
            {currentQuestion.question}
          </p>

          <div className="space-y-3 mt-auto">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-200 flex items-center gap-3 group active:scale-[0.99]"
              >
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {opt.id}
                </span>
                <span className="font-medium text-sm text-slate-600 group-hover:text-indigo-900">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunTest;
