import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

// Nøgler til localStorage så vi kan huske scores og forsøg på tværs af sessioner
const STORAGE_KEY = "hjerteskærm_quiz_scores";
const ATTEMPTS_KEY = "hjerteskærm_quiz_attempts";

// --- Storage helpers ---

function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    // Hvis localStorage er korrupt eller blokeret, returnerer vi bare et tomt array
    return [];
  }
}

function saveScore(score, total) {
  try {
    const existing = loadScores();
    const entry = { score, total, date: Date.now() };
    // Vi begrænser til de seneste 5000 forsøg så vi ikke fylder localStorage op
    const updated = [...existing, entry].slice(-5000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [{ score, total, date: Date.now() }];
  }
}

function loadAttemptCount() {
  try {
    return parseInt(localStorage.getItem(ATTEMPTS_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

function incrementAttempts() {
  try {
    const next = loadAttemptCount() + 1;
    localStorage.setItem(ATTEMPTS_KEY, String(next));
    return next;
  } catch {
    return 1;
  }
}

// Regner percentil ud baseret på tidligere forsøg.
// Vi sammenligner brugerens score med alle tidligere (dvs. alle undtagen det nyeste element).
// Vigtigt: incrementAttempts() skal kaldes FØR saveScore() og calcStats(),
// ellers er tællingen én bagud når vi viser resultatet.
function calcStats(allScores, myScore, total) {
  const previous = allScores.slice(0, -1);
  const myRatio = myScore / total;
  let percentile = 50;
  if (previous.length > 0) {
    const beaten = previous.filter((s) => s.score / s.total < myRatio).length;
    percentile = Math.round((beaten / previous.length) * 100);
  }
  return {
    percentile,
    totalAttempts: loadAttemptCount(),
  };
}

// En lille hook der tæller op fra 0 til target over en given varighed.
// startDelay bruges til at forskyde animationerne på resultatskærmen så de kommer ind én ad gangen.
function useCountUp(target, duration = 1200, startDelay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(0);
    let timeout;
    timeout = setTimeout(() => {
      const startTime = performance.now();
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out kurve så det bremser op mod slutningen, føles mere smooth
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [target, duration, startDelay]);
  return value;
}

// Vi injekter keyframes direkte i DOM'en én gang i stedet for at have det i en CSS-fil,
// så animationerne altid er tilgængelige når komponenten bruges
if (typeof document !== "undefined" && !document.getElementById("hb-style")) {
  const s = document.createElement("style");
  s.id = "hb-style";
  s.textContent = `
    @keyframes heartbeat {
      0%   { transform: scale(1); }
      14%  { transform: scale(1.06); }
      28%  { transform: scale(1); }
      42%  { transform: scale(1.04); }
      70%  { transform: scale(1); }
      100% { transform: scale(1); }
    }
    .heartbeat { animation: heartbeat 1.6s ease-in-out infinite; }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-slide-up { animation: fadeSlideUp 0.6s ease forwards; }
  `;
  document.head.appendChild(s);
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
  // wasCorrect fanges på svartidspunktet og må ikke genberegnes efterfølgende,
  // ellers kan den ændre sig mens fade-animationen kører
  const [wasCorrect, setWasCorrect] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState(null);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [quitVisible, setQuitVisible] = useState(false);

  const question = t.questions[currentQ];
  const isActiveQuiz =
    screen === SCREEN_QUESTION || screen === SCREEN_EXPLANATION;

  const handleCloseAttempt = () => {
    // Hvis quizzen er i gang, vis bekræftelsesdialog i stedet for at lukke direkte
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

  // Fade ud, skift screen, fade ind — giver en blød overgang mellem alle skærme
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
    setWasCorrect(null);
    setShowCorrect(false);
    setStats(null);
    transitionTo(SCREEN_QUESTION);
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    const correct = index === question.correct;
    setSelectedAnswer(index);
    setWasCorrect(correct);
    if (correct) setScore((s) => s + 1);
    // Lille forsinkelse så brugeren kan se sit valg markeret inden farven skifter
    setTimeout(() => setShowCorrect(true), 800);
    setTimeout(() => transitionTo(SCREEN_EXPLANATION), 1600);
  };

  const handleNext = () => {
    const nextQ = currentQ + 1;
    // Nulstil svar-state FØR vi transitionerer, så fade-out ikke ser gammelt indhold
    setSelectedAnswer(null);
    setShowCorrect(false);
    setWasCorrect(null);
    if (nextQ >= t.questions.length) {
      // Quizzen er færdig — gem score og beregn statistik
      incrementAttempts();
      const allScores = saveScore(score, t.questions.length);
      const computed = calcStats(allScores, score, t.questions.length);
      setStats(computed);
      transitionTo(SCREEN_RESULTS);
    } else {
      setCurrentQ(nextQ);
      transitionTo(SCREEN_QUESTION);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setWasCorrect(null);
    setShowCorrect(false);
    setStats(null);
    transitionTo(SCREEN_INTRO);
  };

  // Returnerer Tailwind-klasser til svarmuligheder baseret på om der er svaret og om svaret er korrekt
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
        {/* Luk-knap */}
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

        {/* Bekræftelsesdialog når man forsøger at lukke midt i quizzen */}
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

        {/* Fade-wrapper rundt om alt skærm-indhold */}
        <div
          className="flex flex-col h-full"
          style={{
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* INTRO */}
          {screen === SCREEN_INTRO && (
            <div className="flex flex-col items-center justify-between h-full px-10 py-16">
              <h2 className="font-display font-semibold text-primary text-7xl mt-8">
                {t.title}
              </h2>
              <p className="font-display font-semibold text-primary text-4xl text-center leading-relaxed">
                {t.intro}
              </p>
              <button
                onClick={handleStart}
                className="bg-secondary text-primary font-display font-semibold text-5xl rounded-full px-15 py-5 mb-4"
              >
                {t.startBtn}
              </button>
            </div>
          )}

          {/* SPØRGSMÅL */}
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
              {/* Fremgangsindikator — én prik per spørgsmål, aktiv prik er større */}
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

          {/* FORKLARING */}
          {screen === SCREEN_EXPLANATION && (
            <div className="flex flex-col items-center justify-between h-full px-10 py-16">
              <div className="mt-8">
                <span className="font-display font-semibold text-primary text-7xl">
                  {wasCorrect ? t.correctLabel : t.wrongLabel}
                </span>
              </div>
              <p className="font-display font-light text-primary text-4xl text-center leading-relaxed">
                {question.explanation}
              </p>
              <button
                onClick={handleNext}
                className="bg-secondary text-primary font-display font-semibold text-4xl rounded-full px-16 py-5 mb-4"
              >
                {currentQ + 1 >= t.questions.length
                  ? t.resultsTitle
                  : t.nextBtn}
              </button>
            </div>
          )}

          {/* RESULTATER */}
          {screen === SCREEN_RESULTS && stats && (
            <ResultsScreen
              score={score}
              total={t.questions.length}
              stats={stats}
              t={t}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Resultatskærmen er sin egen komponent så useCountUp-hooks altid kører fra et clean mount
function ResultsScreen({ score, total, stats, t, onPlayAgain }) {
  const animatedScore = useCountUp(score, 900, 200);
  const animatedPct = useCountUp(stats.percentile, 1400, 700);
  const [showPercentile, setShowPercentile] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // De tre elementer fader ind forskudt — score, så percentil, så knappen
  useEffect(() => {
    const t1 = setTimeout(() => setShowPercentile(true), 900);
    const t2 = setTimeout(() => setShowButton(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-full px-10 py-10">
      <h2
        className="font-display font-semibold text-primary leading-none mb-4 fade-slide-up"
        style={{ fontSize: "5.5rem", animationDelay: "0ms" }}
      >
        {t.resultsHeading}
      </h2>

      {/* Score tæller op fra 0 via useCountUp */}
      <p
        className="font-display font-semibold text-primary leading-none fade-slide-up"
        style={{ fontSize: "9rem", animationDelay: "100ms", opacity: 0 }}
      >
        {animatedScore}
        <span className="opacity-30" style={{ fontSize: "4.5rem" }}>
          /{total}
        </span>
      </p>

      <div className="flex-1" />

      {/* Percentil-blok fader ind lidt efter scoren */}
      <div
        className="flex flex-col items-center"
        style={{
          opacity: showPercentile ? 1 : 0,
          transform: showPercentile ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p className="font-display font-normal text-primary text-3xl text-center mb-3">
          {t.resultsBetterThan}
        </p>
        {/* Heartbeat-animationen starter kun når blokken er synlig */}
        <p
          className={`font-display font-semibold text-primary leading-none${showPercentile ? " heartbeat" : ""}`}
          style={{ fontSize: "7rem" }}
        >
          {animatedPct}%
        </p>
        <p className="font-display font-light text-primary text-3xl text-center mt-3">
          {t.resultsOfVisitors}
        </p>

        {/* Lille note om hvor mange forsøg statistikken er baseret på */}
        <p
          className="font-display font-light text-primary opacity-35 text-center mt-4"
          style={{ fontSize: "1.1rem" }}
        >
          {t.resultsBasedOn}{" "}
          <span
            className="font-semibold"
            style={{ fontSize: "1.6rem", opacity: 1 }}
          >
            {stats.totalAttempts}
          </span>{" "}
          {t.resultsAttempts}
        </p>
      </div>

      <div className="flex-1" />

      {/* Knappen fader ind sidst så brugeren får tid til at se resultatet først */}
      <button
        onClick={onPlayAgain}
        className="bg-secondary text-primary font-display font-semibold text-4xl rounded-full px-16 py-5"
        style={{
          opacity: showButton ? 1 : 0,
          transform: showButton ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {t.playAgainBtn}
      </button>
    </div>
  );
}

export default QuizOverlay;
