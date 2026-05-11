import { useState, useRef, useEffect } from "react";
import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import BloodVesselAnimation from "../components/BloodVesselAnimation";
import OvariesBackground from "../components/animated backgrounds/Ovariesbackground";

const SNAP_POINTS = ["", "0-50", "50-60", "60-70", "70+", ""];

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
    if (activeIndex === 0 && nearest === 0 && sliderX > 0.02) {
      snapToIndex(1);
    } else if (
      activeIndex === SNAP_POINTS.length - 1 &&
      nearest === SNAP_POINTS.length - 1 &&
      sliderX < 0.98
    ) {
      snapToIndex(SNAP_POINTS.length - 2);
    } else {
      snapToIndex(nearest);
    }
  };

  useEffect(() => {
    const track = sliderRef.current;

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);
    // touchstart needs passive: false so preventDefault works
    track?.addEventListener("touchstart", handlePointerDown, {
      passive: false,
    });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
      track?.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isDragging, sliderX]);

  const handlePointTap = (index) => snapToIndex(index);
  const dotPercent = sliderX * 100;
  const isBookend = activeIndex === 0 || activeIndex === SNAP_POINTS.length - 1;
  const showIllustration = !isBookend;

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <FlagButton />
      <BackButton />
      <OvariesBackground />

      <div className="flex-1" />

      {/* UI Infobox */}
      <div
        className="relative z-10 w-full bg-ui-box/70 rounded-t-4xl px-8 pt-6 pb-4 flex flex-col"
        style={{ height: "40vh" }}
      >
        <div
          className="flex flex-col h-full gap-10"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          {/* 1. Text area */}
          <div
            className="shrink-0 overflow-hidden"
            style={{
              height: "310px",
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

          {/* 2. Blood vessel animation */}
          <div
            className="shrink-0 rounded-2xl overflow-hidden transition-opacity duration-300"
            style={{
              height: "160px",
              background: "#1A0508",
              opacity: showIllustration ? 1 : 0,
            }}
          >
            <BloodVesselAnimation activeIndex={activeIndex} />
          </div>

          {/* 3. Slider */}
          <div className="shrink-0">
            {/* Labels */}
            <div className="relative h-7 mb-7">
              {SNAP_POINTS.map((label, i) => {
                if (!label) return null;
                return (
                  <button
                    key={i}
                    onClick={() => handlePointTap(i)}
                    className={`absolute font-display text-primary text-2xl transition-all duration-300 -translate-x-1/2 ${
                      activeIndex === i
                        ? "font-semibold opacity-100"
                        : "font-normal opacity-75"
                    }`}
                    style={{ left: `${(i / (SNAP_POINTS.length - 1)) * 100}%` }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Track */}
            <div
              ref={sliderRef}
              className="relative w-full h-3 bg-primary/20 rounded-full cursor-pointer mb-2 overflow-visible"
              onMouseDown={handlePointerDown}
            >
              {/* Fill */}
              <div
                className="absolute left-0 top-0 h-full bg-primary rounded-full"
                style={{
                  width: `${dotPercent}%`,
                  transition: isSnapping
                    ? "width 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                    : "none",
                }}
              />

              {/* Dot + pulsating ring */}
              <div
                className="absolute top-1/2"
                style={{
                  left: `${dotPercent}%`,
                  transform: "translate(-50%, -50%)",
                  width: isDragging ? "52px" : "36px",
                  height: isDragging ? "52px" : "36px",
                  transition: isSnapping
                    ? "left 0.4s cubic-bezier(0.25, 1, 0.5, 1), width 0.2s ease, height 0.2s ease"
                    : "width 0.2s ease, height 0.2s ease",
                }}
              >
                {isBookend && (
                  <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping" />
                )}
                <div
                  className="absolute inset-0 rounded-full bg-primary shadow-lg cursor-grab active:cursor-grabbing"
                  onMouseDown={handlePointerDown}
                />
              </div>
            </div>

            {/* Drag hint */}
            <p className="mt-5 font-display font-semibold text-primary text-center text-4xl">
              {t?.dragHint || "← Træk →"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
