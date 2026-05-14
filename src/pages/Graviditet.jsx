import { useState, useCallback } from "react";
import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import Speedometer from "../components/Speedometer";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { useIdleTimeout } from "../hooks/useIdleTimeout";

function Graviditet() {
  const { language, visible } = useLanguage();
  const t = translations[language]?.graviditet;
  const [currentStep, setCurrentStep] = useState(0);
  useIdleTimeout(3);

  const handleSegmentChange = useCallback((segmentId) => {
    if (segmentId !== null) setCurrentStep(segmentId);
  }, []);

  const step = t.steps[currentStep];

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <FlagButton />
      <BackButton />

      <div className="flex-1" />

      {/* Speedometer */}
      {/* <div
        className="absolute left-0 right-0 z-20 flex justify-center"
        style={{ bottom: "34.5vh" }}
      >
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <Speedometer onSegmentChange={handleSegmentChange} labels={t.labels} />
        </div>
      </div> */}

      {/* UI Infobox */}
      <div
        className="relative z-10 w-full bg-ui-box/70 rounded-t-4xl px-8 pt-8 pb-8 flex flex-col"
        style={{ height: "35vh" }}
      >
        <div
          key={currentStep}
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease",
            animation: "fadeIn 0.6s ease",
          }}
        >
          <h2 className="font-display font-semibold text-primary text-4xl mb-3 leading-snug">
            {step.heading}
          </h2>
          <p className="font-display font-light text-primary text-2xl leading-relaxed mb-6">
            {step.body}
          </p>
          {step.link && (
            <button className="w-full text-center font-display font-semibold text-primary text-2xl underline bg-transparent border-none cursor-pointer">
              {step.link}
            </button>
          )}
        </div>
        <div
          className="absolute -bottom-6 left-0 right-0"
          style={{ transformOrigin: "bottom center", transform: "scale(0.75)" }}
        >
          <Speedometer
            onSegmentChange={handleSegmentChange}
            labels={t.labels}
          />
        </div>
      </div>
    </div>
  );
}

export default Graviditet;
