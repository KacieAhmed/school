import { useState } from 'react';

export default function Quiz({ questions, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  function handleSelect(questionIndex, optionIndex) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  }

  function handleSubmit() {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    const finalScore = Math.round((correct / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    onComplete(finalScore >= 70);
  }

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="bg-surface rounded-xl border border-surface-light p-6">
      <h3 className="text-xl font-bold text-heading mb-6">Quiz</h3>

      {questions.map((q, qi) => (
        <div key={qi} className="mb-6">
          <p className="text-text font-medium mb-3">
            {qi + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((option, oi) => {
              let optionStyle = 'border-surface-light hover:border-primary/50';
              if (submitted) {
                if (oi === q.correctIndex) {
                  optionStyle = 'border-success bg-success/10';
                } else if (answers[qi] === oi && oi !== q.correctIndex) {
                  optionStyle = 'border-red-500 bg-red-500/10';
                }
              } else if (answers[qi] === oi) {
                optionStyle = 'border-primary bg-primary/10';
              }

              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(qi, oi)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-sm cursor-pointer bg-transparent text-text ${optionStyle}`}
                >
                  <span className="text-muted mr-2">{String.fromCharCode(65 + oi)}.</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full py-3 rounded-lg font-medium transition-all cursor-pointer border-none text-white ${
            allAnswered
              ? 'bg-primary hover:bg-primary/80'
              : 'bg-surface-light text-muted cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      ) : (
        <div className={`p-4 rounded-lg text-center ${score >= 70 ? 'bg-success/10 border border-success/20' : 'bg-red-500/10 border border-red-500/20'}`}>
          <p className="text-lg font-bold text-heading mb-1">
            Score: {score}%
          </p>
          <p className={`text-sm ${score >= 70 ? 'text-success' : 'text-red-400'}`}>
            {score >= 70
              ? 'Congratulations! You passed the quiz!'
              : 'You need 70% to pass. Review the lesson and try again.'}
          </p>
        </div>
      )}
    </div>
  );
}
