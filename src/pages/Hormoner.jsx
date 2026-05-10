import { useState, useRef, useEffect } from "react";
import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import BloodVesselAnimation from "../components/BloodVesselAnimation";

const SNAP_POINTS = ["···", "0-50", "50-60", "60-70", "70+", "···"];

export default function Hormoner() {
  const { language, visible } = useLanguage();
  const t = translations[language]?.hormoner;
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderX, setSliderX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const sliderRef = useRef(null);
  const startXRef = useRef(null);
  const startSliderRef = useRef(null);

  const content = t?.stages?.[activeIndex] || {};

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const snapToIndex = (index) => {
    const clampedIndex = Math.max(0, Math.min(SNAP_POINTS.length - 1, index));
    setIsSnapping(true);
    setSliderX(clampedIndex / (SNAP_POINTS.length - 1));
    if (clampedIndex !== activeIndex) {
      setContentVisible(false);
      setTimeout(() => {
        setActiveIndex(clampedIndex);
        setContentVisible(true);
      }, 300);
    }
    setTimeout(() => setIsSnapping(false), 400);
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = getClientX(e);
    startSliderRef.current = sliderX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const width = sliderRef.current?.offsetWidth || 300;
    const delta = getClientX(e) - startXRef.current;
    const newX = Math.max(
      0,
      Math.min(1, startSliderRef.current + delta / width),
    );
    setSliderX(newX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const nearest = Math.round(sliderX * (SNAP_POINTS.length - 1));
    snapToIndex(nearest);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, sliderX]);

  const handlePointTap = (index) => snapToIndex(index);
  const dotPercent = sliderX * 100;
  const showIllustration = activeIndex !== 0 && activeIndex !== 5;

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <FlagButton />
      <BackButton />

      {/* Background — animated background goes here later */}
      <div className="flex-1" />

      {/* UI Infobox — flex column: text → animation → slider */}
      <div
        className="relative z-10 w-full bg-ui-box/70 rounded-t-4xl px-8 pt-6 pb-4 flex flex-col"
        style={{ height: "40vh" }}
      >
        <div
          className="flex flex-col h-full justify-between"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          {/* 1. Text area */}
          <div
            className="shrink-0 overflow-hidden"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <h2 className="font-display font-semibold text-primary text-5xl mb-1 leading-snug">
              {content.heading || "Hormoner og kvinders hjerter"}
            </h2>
            <p className="font-display font-light text-primary text-3xl leading-snug">
              {content.body || "[ Tekst fra museet ]"}
            </p>
          </div>

          {/* 2. Blood vessel animation — only on age-range slides */}
          {showIllustration && (
            <div
              className="shrink-0 rounded-2xl overflow-hidden"
              style={{
                height: "160px",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#1A0508",
              }}
            >
              <BloodVesselAnimation activeIndex={activeIndex} />
            </div>
          )}

          {/* 3. Slider */}
          <div className="shrink-0">
            {/* Labels */}
            <div className="relative h-7 mb-5 mx-2">
              {SNAP_POINTS.map((label, i) => (
                <button
                  key={i}
                  onClick={() => handlePointTap(i)}
                  className="absolute font-display text-primary text-2xl transition-all duration-300 -translate-x-1/2"
                  style={{
                    left: `${(i / (SNAP_POINTS.length - 1)) * 100}%`,
                    fontWeight: activeIndex === i ? "600" : "300",
                    opacity: activeIndex === i ? 1 : 0.5,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Track */}
            <div
              ref={sliderRef}
              className="relative w-full h-3 bg-primary/20 rounded-full cursor-pointer mb-2"
              onMouseDown={handlePointerDown}
              onTouchStart={handlePointerDown}
            >
              <div
                className="absolute left-0 top-0 h-full bg-primary rounded-full"
                style={{
                  width: `${dotPercent}%`,
                  transition: isSnapping
                    ? "width 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
                }}
              />
              <div
                className="absolute top-1/2 rounded-full bg-primary shadow-lg cursor-grab active:cursor-grabbing"
                style={{
                  left: `${dotPercent}%`,
                  transform: "translate(-50%, -50%)",
                  width: isDragging ? "52px" : "36px",
                  height: isDragging ? "52px" : "36px",
                  transition: isSnapping
                    ? "left 0.4s cubic-bezier(0.25, 1, 0.5, 1), width 0.2s ease, height 0.2s ease"
                    : "width 0.2s ease, height 0.2s ease",
                }}
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
              />
            </div>

            {/* Drag hint */}
            <p className="mt-3 font-display font-semibold text-primary text-center text-4xl">
              {t?.dragHint || "← Træk →"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
