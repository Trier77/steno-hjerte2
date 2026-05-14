import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlagButton from "../components/FlagButton";
import BackButton from "../components/BackButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import LungsBackground from "../components/animated backgrounds/Lungsbackground";
import { useFadeIn } from "../hooks/useFadeIn";
import { useFadeNavigate } from "../hooks/useFadeNavigate";
import { useIdleTimeout } from "../hooks/useIdleTimeout";

const PAGE_FADE_DURATION = 0.4;

export default function Rygning() {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const { language, visible } = useLanguage();
  const SIDES = translations[language].rygning;
  const [sliderX, setSliderX] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const startXRef = useRef(null);
  const startSliderRef = useRef(null);
  const fadeVisible = useFadeIn();
  const { fadeNavigate, fading } = useFadeNavigate();
  useIdleTimeout(3);

  const activeSide = sliderX <= 0 ? "left" : sliderX >= 1 ? "right" : null;

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const handlePointerDown = (e) => {
    if (e.touches) e.preventDefault();
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
    if (sliderX < 0.25) setSliderX(0);
    else if (sliderX > 0.75) setSliderX(1);
    else setSliderX(0.5);
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

  useEffect(() => {
    const el = handleRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handlePointerDown, { passive: false });
    return () => el.removeEventListener("touchstart", handlePointerDown);
  }, [sliderX]);

  const sliderPercent = `${sliderX * 100}%`;
  const snapTransition = isSnapping
    ? "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
    : "none";
  const side = activeSide ? SIDES[activeSide] : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden select-none page-fade-in ${fadeVisible ? "visible" : ""}`}
    >
      <FlagButton />
      <BackButton onClick={() => fadeNavigate("/")} />
      <LungsBackground />

      {/* Left overlay */}
      <div
        className="absolute inset-0 bg-overlay-light opacity-30"
        style={{
          clipPath: `inset(0 ${100 - sliderX * 100}% 0 0)`,
          transition: snapTransition,
        }}
      />

      {/* Right overlay */}
      <div
        className="absolute inset-0 bg-overlay-dark opacity-30"
        style={{
          clipPath: `inset(0 0 0 ${sliderPercent})`,
          transition: snapTransition,
        }}
      />

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 z-30 flex flex-col items-center"
        style={{
          left: sliderPercent,
          transform: "translateX(-50%)",
          transition: snapTransition,
        }}
      >
        {/* Single continuous line */}
        <div className="absolute top-0 bottom-0 w-2 bg-ui-box" />

        {/* Handle centered on top of the line */}
        <div className="absolute top-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: PAGE_FADE_DURATION + 0.3,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <div
              ref={handleRef}
              className="w-24 h-24 rounded-full bg-ui-box flex items-center justify-center shadow-xl cursor-grab active:cursor-grabbing"
              onMouseDown={handlePointerDown}
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
          </motion.div>
        </div>
      </div>

      {/* Language fade wrapper */}
      <div
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        {/* Drag label */}
        <motion.div
          className="absolute top-8 left-0 right-0 z-40 flex justify-center px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: PAGE_FADE_DURATION + 0.6 }}
          style={{
            opacity: activeSide
              ? 0
              : Math.max(0, 1 - Math.abs(sliderX - 0.5) * 8),
            pointerEvents: activeSide ? "none" : "auto",
          }}
        >
          <div className="bg-ui-box rounded-full px-8 py-4">
            <span className="text-primary font-display font-semibold text-3xl text-center">
              {SIDES.dragLabel}
            </span>
          </div>
        </motion.div>

        {/* Side content — staggered */}
        <AnimatePresence mode="wait">
          {activeSide && side && (
            <motion.div
              key={activeSide}
              className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-10 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="font-display font-semibold text-6xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                {side.heading}
              </motion.h2>

              <motion.p
                className="font-display font-light text-2xl mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {side.intro}
              </motion.p>

              <motion.p
                className="font-display font-light text-2xl mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                {side.body}
              </motion.p>

              <div className="flex gap-12">
                {side.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                  >
                    <p className="font-display font-semibold text-8xl">
                      {stat.value}
                    </p>
                    <p className="font-display font-semibold text-2xl opacity-90 mt-1">
                      {stat.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fade to black */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "#000",
          opacity: fading ? 1 : 0,
          transition: "opacity 0.7s ease",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
