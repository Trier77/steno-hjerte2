import { useState, useRef, useEffect } from "react";
import FlagButton from "../components/FlagButton";
import BackButton from "../components/BackButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

export default function Rygning() {
  const containerRef = useRef(null);
  const { language, visible } = useLanguage();
  const SIDES = translations[language].rygning;
  const [sliderX, setSliderX] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const startXRef = useRef(null);
  const startSliderRef = useRef(null);

  const activeSide = sliderX <= 0 ? "left" : sliderX >= 1 ? "right" : null;

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = getClientX(e);
    startSliderRef.current = sliderX;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const width = containerRef.current?.offsetWidth || window.innerWidth;
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
    setIsSnapping(true);
    if (sliderX < 0.25) {
      setSliderX(0);
    } else if (sliderX > 0.75) {
      setSliderX(1);
    } else {
      setSliderX(0.5);
    }
    setTimeout(() => setIsSnapping(false), 400);
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

  const sliderPercent = `${sliderX * 100}%`;
  const transition = isSnapping
    ? "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
    : "none";
  const side = activeSide ? SIDES[activeSide] : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
    >
      <FlagButton />
      <BackButton />

      {/* Left background */}
      <div className="absolute inset-0 bg-overlay-light opacity-50" />

      {/* Right background */}
      <div
        className="absolute inset-0 bg-overlay-dark opacity-50"
        style={{
          clipPath: `inset(0 0 0 ${sliderPercent})`,
          transition,
        }}
      />

      {/* Lung image/animation goes here later */}
      {/* <img src={lungImage} className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none" /> */}

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-30 flex flex-col items-center"
        style={{
          left: sliderPercent,
          transform: "translateX(-50%)",
          transition,
        }}
      >
        <div className="w-2 flex-1 bg-ui-box" />
        <div
          className="w-24 h-24 rounded-full bg-ui-box flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing shrink-0"
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18m-4 4l4-4m0 0l-4-4"
            />
          </svg>
        </div>
        <div className="w-2 flex-1 bg-ui-box" />
      </div>

      {/* Fade wrapper - fades on language switch */}
      <div
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div
          className="absolute top-8 left-0 right-0 z-40 flex justify-center px-6"
          style={{
            opacity: activeSide
              ? 0
              : Math.max(0, 1 - Math.abs(sliderX - 0.5) * 8),
            transition: "opacity 0.3s ease",
            pointerEvents: activeSide ? "none" : "auto",
          }}
        >
          <div className="bg-ui-box rounded-full px-8 py-4">
            <span className="text-primary font-display font-semibold text-3xl text-center">
              {SIDES.dragLabel}
            </span>
          </div>
        </div>

        {/* Bottom content */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-10 text-white"
          style={{
            opacity: activeSide ? 1 : 0,
            transform: activeSide ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            pointerEvents: activeSide ? "auto" : "none",
          }}
        >
          {side && (
            <>
              <h2 className="font-display font-semibold text-6xl mb-4">
                {side.heading}
              </h2>
              <p className="font-display font-light text-2xl mb-3">
                {side.intro}
              </p>
              <p className="font-display font-light text-2xl mb-3">
                {side.body}
              </p>
              <div className="flex gap-12">
                {side.stats.map((stat, i) => (
                  <div key={i}>
                    <p className="font-display font-semibold text-8xl">
                      {stat.value}
                    </p>
                    <p className="font-display font-semibold text-2xl opacity-90 mt-1">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
