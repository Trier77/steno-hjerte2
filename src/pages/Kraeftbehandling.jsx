import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { useState } from "react";
import TumorButton from "../components/TumorButton";

function TekstModul({ step, currentStep, onLinkTap }) {
  return (
    <section className="absolute w-screen h-120 bg-[#f1f1f1]/70 bottom-0 rounded-t-4xl px-8 pt-8 pb-10">
      <div key={currentStep} style={{ animation: "fadeIn 0.6s ease" }}>
        <div className="mb-4">
          <h2 className="font-display font-semibold text-primary text-4xl">
            {step.heading}
          </h2>
        </div>
        <p className="font-display font-light text-primary text-3xl leading-relaxed whitespace-pre-line">
          {step.body}
        </p>
        {step.link && (
          <button
            onClick={onLinkTap}
            className="w-full text-center font-display font-semibold text-primary text-3xl leading-snug border-none bg-transparent cursor-pointer underline mt-8"
          >
            {step.link}
          </button>
        )}
      </div>
    </section>
  );
}

function Kraeftbehandling() {
  const { language, visible } = useLanguage();
  const t = translations[language].kraeftbehandling;
  const [currentStep, setCurrentStep] = useState(0);
  const [showTumor, setShowTumor] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const step = t.steps[currentStep];

  const handleTumorComplete = () => {
    setCurrentStep(1);
    setTimeout(() => setShowTumor(false), 800);
  };

  const handleLinkTap = () => {
    setShowHint(true);
  };

  const handleTumorStart = () => {
    setShowHint(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <FlagButton />
      <BackButton />

      {/* Background image/video goes here later */}

      {/* Tumor button + hint */}
      {showTumor && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            opacity: currentStep === 0 ? 1 : 0,
            transition: "opacity 0.8s ease",
            pointerEvents: currentStep === 0 ? "auto" : "none",
          }}
        >
          {/* Hint tooltip */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-2 whitespace-nowrap"
            style={{
              opacity: showHint ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          >
            <span className="font-display font-semibold text-primary text-lg">
              Hold her
            </span>
          </div>

          <TumorButton
            onComplete={handleTumorComplete}
            onHoldStart={handleTumorStart}
          />
        </div>
      )}

      {/* Language fade wrapper */}
      <div
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <TekstModul
          step={step}
          currentStep={currentStep}
          onLinkTap={handleLinkTap}
        />
      </div>
    </div>
  );
}

export default Kraeftbehandling;
