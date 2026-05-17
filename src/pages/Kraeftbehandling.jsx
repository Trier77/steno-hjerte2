import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { useState } from "react";
import TumorButton from "../components/TumorButton";
import { useIdleTimeout } from "../hooks/useIdleTimeout";
import tumorani from "../assets/tumorani.webm"
import rayOverlay from "../assets/rayOverlay.webm"  // din overlay video
import notumorani from "../assets/notumorani.webm"            // din nye baggrund

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
  const [showOverlay, setShowOverlay] = useState(false);
  const [showNewBg, setShowNewBg] = useState(false);
  const step = t.steps[currentStep];
  useIdleTimeout(3);

  const handleTumorComplete = () => {
    // Start overlay — tekst skifter IKKE endnu
    setShowOverlay(true);
    setTimeout(() => setShowTumor(false), 800);
  };

  const handleOverlayEnded = () => {
    // Overlay færdig → skift baggrund og tekst samtidig
    setShowOverlay(false);
    setShowNewBg(true);
    setCurrentStep(1);
  };

  const handleLinkTap = () => setShowHint(true);
  const handleTumorStart = () => setShowHint(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <FlagButton />
      <BackButton />

      {/* Baggrund 1: tumorani — fader ud når ny baggrund vises */}
      <video
        src={tumorani}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ zIndex: 0, opacity: showNewBg ? 0 : 1 }}
      />

      {/* Baggrund 2: ny baggrund — fader ind når overlay er færdig */}
      <video
        src={notumorani}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ zIndex: 1, opacity: showNewBg ? 1 : 0 }}
      />

      {/* Overlay video — spiller én gang henover alt */}
      {showOverlay && (
        <video
          src={rayOverlay}
          autoPlay muted playsInline
          onEnded={handleOverlayEnded}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 20 }}
        />
      )}

      {/* Tumor button + hint */}
      {showTumor && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            zIndex: 10,
            opacity: currentStep === 0 ? 1 : 0,
            transition: "opacity 0.8s ease",
            pointerEvents: currentStep === 0 ? "auto" : "none",
          }}
        >
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

      {/* Tekst — skifter kun efter overlay er færdig */}
      <div
        style={{
          zIndex: 30,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
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
