import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

const STORAGE_KEY = "hjerteskærm_quiz_scores";

function saveScore(score, total) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push({ score, total, date: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return existing;
  } catch {
    return [{ score, total }];
  }
}

function getPercentile(score, total) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (all.length <= 1) return 50;
    const myRatio = score / total;
    const beaten = all.filter((s) => s.score / s.total < myRatio).length;
    return Math.round((beaten / (all.length - 1)) * 100);
  } catch {
    return 50;
  }
}

// SCREENS
const SCREEN_INTRO = "intro";
const SCREEN_QUESTION = "question";
const SCREEN_EXPLANATION = "explanation";
const SCREEN_RESULTS = "results";

function QuizOverlay({ onClose, visible }) {
  const { language, visible: langVisible } = useLanguage();
  const t = translations[language].quiz;

  const [screen, setScreen] = useState(SCREEN_INTRO);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [percentile, setPercentile] = useState(50);

  const question = t.questions[currentQ];
  const isCorrect = selectedAnswer === question?.correct;

  const handleStart = () => {
    setScreen(SCREEN_QUESTION);
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === question.correct) {
      setScore((s) => s + 1);
    }
    setTimeout(() => setScreen(SCREEN_EXPLANATION), 600);
  };

  const handleNext = () => {
    const nextQ = currentQ + 1;
    if (nextQ >= t.questions.length) {
      const finalScore = isCorrect ? score : score;
      saveScore(finalScore, t.questions.length);
      setPercentile(getPercentile(finalScore, t.questions.length));
      setScreen(SCREEN_RESULTS);
    } else {
      setCurrentQ(nextQ);
      setSelectedAnswer(null);
      setScreen(SCREEN_QUESTION);
    }
  };

  const handlePlayAgain = () => {
    setScreen(SCREEN_INTRO);
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const getOptionStyle = (index) => {
    if (selectedAnswer === null) return "bg-secondary text-primary";
    if (index === question.correct) return "bg-green-500 text-white";
    if (index === selectedAnswer) return "bg-red-400 text-white";
    return "bg-secondary text-primary opacity-50";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: `rgba(0,0,0,${visible ? 0.4 : 0})`,
        transition: "background-color 0.4s ease",
      }}
      onClick={onClose}
    >
      <div
        className="relative bg-ui-box rounded-3xl w-10/12 flex flex-col overflow-hidden"
        style={{
          height: "85vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 z-10 w-20 h-20 flex items-center justify-center rounded-full bg-ui-box text-primary shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 h-11"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* INTRO SCREEN */}
        {screen === SCREEN_INTRO && (
          <div className="flex flex-col items-center justify-between h-full px-10 py-16">
            <h2 className="font-display font-semibold text-primary text-7xl mt-8">
              {t.title}
            </h2>
            <p className="font-display font-light text-primary text-2xl text-center leading-relaxed">
              {t.intro}
            </p>
            <button
              onClick={handleStart}
              className="bg-secondary text-primary font-display font-semibold text-4xl rounded-full px-16 py-5 mb-4"
            >
              {t.startBtn}
            </button>
          </div>
        )}

        {/* QUESTION SCREEN */}
        {screen === SCREEN_QUESTION && (
          <div className="flex flex-col h-full px-10 py-16">
            {/* Progress indicator */}
            <p className="font-display font-light text-primary text-xl mb-4 opacity-60">
              {currentQ + 1} / {t.questions.length}
            </p>

            {/* Question */}
            <h2 className="font-display font-semibold text-primary text-3xl mb-10 leading-snug flex-1">
              {question.question}
            </h2>

            {/* Answer options */}
            <div className="flex flex-col gap-4 mb-8">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full rounded-2xl px-6 py-5 font-display font-semibold text-2xl text-left transition-all duration-300 ${getOptionStyle(i)}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* EXPLANATION SCREEN */}
        {screen === SCREEN_EXPLANATION && (
          <div className="flex flex-col items-center justify-between h-full px-10 py-16">
            {/* Correct/Wrong label */}
            <div
              className={`rounded-full px-10 py-3 mt-8 ${isCorrect ? "bg-green-500" : "bg-red-400"}`}
            >
              <span className="font-display font-semibold text-white text-3xl">
                {isCorrect ? t.correctLabel : t.wrongLabel}
              </span>
            </div>

            {/* Explanation */}
            <p className="font-display font-light text-primary text-2xl text-center leading-relaxed">
              {question.explanation}
            </p>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="bg-secondary text-primary font-display font-semibold text-3xl rounded-full px-16 py-5 mb-4"
            >
              {currentQ + 1 >= t.questions.length ? t.resultsTitle : t.nextBtn}
            </button>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {screen === SCREEN_RESULTS && (
          <div className="flex flex-col items-center justify-between h-full px-10 py-16">
            <h2 className="font-display font-semibold text-primary text-6xl mt-8">
              {t.resultsTitle}
            </h2>
            <p className="font-display font-light text-primary text-2xl text-center leading-relaxed">
              {t.resultsText
                .replace("{score}", score)
                .replace("{total}", t.questions.length)
                .replace("{percentile}", percentile)}
            </p>
            <button
              onClick={handlePlayAgain}
              className="bg-secondary text-primary font-display font-semibold text-3xl rounded-full px-16 py-5 mb-4"
            >
              {t.playAgainBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizOverlay;
