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

const SCREEN_INTRO = "intro";
const SCREEN_QUESTION = "question";
const SCREEN_EXPLANATION = "explanation";
const SCREEN_RESULTS = "results";

function QuizOverlay({ onClose, visible }) {
  const { language } = useLanguage();
  const t = translations[language].quiz;

  const [screen, setScreen] = useState(SCREEN_INTRO);
  const [fadeIn, setFadeIn] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [percentile, setPercentile] = useState(50);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [quitVisible, setQuitVisible] = useState(false);

  const question = t.questions[currentQ];
  const isCorrect = selectedAnswer === question?.correct;

  const isActiveQuiz =
    screen === SCREEN_QUESTION || screen === SCREEN_EXPLANATION;

  const handleCloseAttempt = () => {
    if (isActiveQuiz) {
      setShowQuitDialog(true);
      setTimeout(() => setQuitVisible(true), 10);
    } else {
      onClose();
    }
  };

  const handleConfirmQuit = () => {
    setQuitVisible(false);
    setTimeout(() => {
      setShowQuitDialog(false);
      onClose();
    }, 300);
  };

  const handleCancelQuit = () => {
    setQuitVisible(false);
    setTimeout(() => setShowQuitDialog(false), 300);
  };

  const transitionTo = (nextScreen) => {
    setFadeIn(false);
    setTimeout(() => {
      setScreen(nextScreen);
      setFadeIn(true);
    }, 300);
  };

  const handleStart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowCorrect(false);
    transitionTo(SCREEN_QUESTION);
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === question.correct) setScore((s) => s + 1);
    setTimeout(() => setShowCorrect(true), 800);
    setTimeout(() => {
      setShowCorrect(false);
      transitionTo(SCREEN_EXPLANATION);
    }, 1600);
  };

  const handleNext = () => {
    const nextQ = currentQ + 1;
    if (nextQ >= t.questions.length) {
      saveScore(score, t.questions.length);
      setPercentile(getPercentile(score, t.questions.length));
      transitionTo(SCREEN_RESULTS);
    } else {
      setCurrentQ(nextQ);
      setSelectedAnswer(null);
      setShowCorrect(false);
      transitionTo(SCREEN_QUESTION);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowCorrect(false);
    transitionTo(SCREEN_INTRO);
  };

  const getOptionStyle = (index) => {
    if (selectedAnswer === null) return "bg-secondary text-primary";
    if (showCorrect && index === question.correct)
      return "bg-primary text-white";
    if (index === selectedAnswer) {
      return index === question.correct
        ? "bg-green-400/50 text-primary"
        : "bg-red-400/50 text-primary";
    }
    return "bg-secondary text-primary opacity-40";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: `rgba(0,0,0,${visible ? 0.4 : 0})`,
        transition: "background-color 0.4s ease",
      }}
      onClick={handleCloseAttempt}
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
          onClick={handleCloseAttempt}
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

        {/* Quit confirmation dialog */}
        {showQuitDialog && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl"
            style={{
              backgroundColor: `rgba(0,0,0,${quitVisible ? 0.5 : 0})`,
              opacity: quitVisible ? 1 : 0,
              transition: "opacity 0.3s ease, background-color 0.3s ease",
            }}
          >
            <div className="bg-ui-box rounded-3xl px-10 py-12 mx-8 flex flex-col items-center gap-8">
              <h3 className="font-display font-semibold text-primary text-4xl text-center">
                {t.quitTitle}
              </h3>
              <p className="font-display font-light text-primary text-2xl text-center leading-relaxed">
                {t.quitBody}
              </p>
              <div className="flex flex-col gap-4 w-full">
                <button
                  onClick={handleConfirmQuit}
                  className="w-full bg-primary text-white font-display font-semibold text-2xl rounded-full py-5"
                >
                  {t.quitConfirm}
                </button>
                <button
                  onClick={handleCancelQuit}
                  className="w-full bg-secondary text-primary font-display font-semibold text-2xl rounded-full py-5"
                >
                  {t.quitCancel}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Screen content with fade animation */}
        <div
          className="flex flex-col h-full"
          style={{
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
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
            <div className="flex flex-col h-full px-10 py-12">
              <div className="flex-1 flex items-center justify-center">
                <h2 className="font-display font-semibold text-primary text-4xl text-center leading-snug">
                  {question.question}
                </h2>
              </div>
              <div className="flex flex-col gap-5 mb-6">
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full rounded-2xl px-6 py-7 font-display font-semibold text-3xl text-center transition-all duration-500 ${getOptionStyle(i)}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3 mb-4">
                {t.questions.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full bg-primary transition-all duration-300 ${
                      i === currentQ
                        ? "w-5 h-5 opacity-100"
                        : "w-3 h-3 opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* EXPLANATION SCREEN */}
          {screen === SCREEN_EXPLANATION && (
            <div className="flex flex-col items-center justify-between h-full px-10 py-16">
              <div className="rounded-full px-10 py-3 mt-8 bg-primary">
                <span className="font-display font-semibold text-white text-3xl">
                  {isCorrect ? t.correctLabel : t.wrongLabel}
                </span>
              </div>
              <p className="font-display font-light text-primary text-2xl text-center leading-relaxed">
                {question.explanation}
              </p>
              <button
                onClick={handleNext}
                className="bg-secondary text-primary font-display font-semibold text-3xl rounded-full px-16 py-5 mb-4"
              >
                {currentQ + 1 >= t.questions.length
                  ? t.resultsTitle
                  : t.nextBtn}
              </button>
            </div>
          )}

          {/* RESULTS SCREEN */}
          {screen === SCREEN_RESULTS && (
            <div className="flex flex-col items-center justify-between h-full px-10 py-16">
              <h2 className="font-display font-semibold text-primary text-5xl mt-8 text-center">
                {t.resultsTitle}
              </h2>
              <div className="flex flex-col items-center gap-4">
                <p className="font-display font-light text-primary text-2xl text-center leading-relaxed">
                  {t.resultsText.split("{percentile}")[0]}
                </p>
                <p className="font-display font-semibold text-primary text-8xl">
                  {percentile}%
                </p>
                <p className="font-display font-light text-primary text-2xl text-center">
                  {t.resultsText.split("{percentile}")[1]}
                </p>
              </div>
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
    </div>
  );
}

export default QuizOverlay;
