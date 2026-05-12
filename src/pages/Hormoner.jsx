import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import BloodVesselAnimation from "../components/BloodVesselAnimation";
import OvariesBackground from "../components/animated backgrounds/Ovariesbackground";
import { useFadeIn } from "../hooks/useFadeIn";
import { useFadeNavigate } from "../hooks/useFadeNavigate";

const SNAP_POINTS = ["", "0-50", "50-60", "60-70", "70+", ""];
const PAGE_FADE_DURATION = 0.4;

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
  const fadeVisible = useFadeIn();
  const { fadeNavigate, fading } = useFadeNavigate();

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
    <div
      className={`relative w-full h-screen overflow-hidden flex flex-col page-fade-in ${fadeVisible ? "visible" : ""}`}
    >
      <FlagButton />
      <BackButton onClick={() => fadeNavigate("/")} />
      <OvariesBackground />

      <div className="flex-1" />

      {/* UI box slides up on entrance */}
      <motion.div
        className="relative z-10 w-full bg-ui-box/70 rounded-t-4xl px-8 pt-6 pb-4 flex flex-col"
        style={{ height: "40vh" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          delay: PAGE_FADE_DURATION + 0.1,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <div
          className="flex flex-col h-full gap-10"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          {/* Text area */}
          <motion.div
            key={activeIndex}
            className="shrink-0 overflow-hidden"
            style={{ height: "310px" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <motion.h2
              className="font-display font-semibold text-primary text-5xl mb-1 leading-snug"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {content.heading || "Hormoner og kvinders hjerter"}
            </motion.h2>
            <motion.p
              className="font-display font-light text-primary text-3xl leading-snug"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {content.body || "[ Tekst fra museet ]"}
            </motion.p>

            {/* Caption — fixed slot, only text changes, no layout shift */}
            <div className="mt-4" style={{ height: "2rem" }}>
              <AnimatePresence mode="wait">
                {content.caption && (
                  <motion.p
                    key={content.caption}
                    className="font-display font-semibold text-primary text-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    {content.caption}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Blood vessel animation OR hint */}
          <div className="shrink-0 relative" style={{ height: "160px" }}>
            {/* Hint — only shows on bookend */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              animate={{ opacity: isBookend ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ pointerEvents: "none" }}
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-2"
              >
                <p className="font-display font-semibold text-primary text-3xl text-center px-6">
                  {activeIndex === 0 ? t?.vesselHintStart : t?.vesselHintEnd}
                </p>
                {activeIndex === 0 && (
                  <p className="font-display font-bold text-primary text-3xl text-center px-6">
                    {t?.vesselHintStartBold}
                  </p>
                )}
              </motion.div>
              <motion.div
                animate={{ x: [-6, 6, -6] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
            </motion.div>

            {/* Blood vessel animation — fades in when not bookend */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: showIllustration ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <BloodVesselAnimation activeIndex={activeIndex} />
            </motion.div>
          </div>

          {/* Slider */}
          <div className="shrink-0">
            {/* Labels */}
            <div className="relative h-7 mb-7">
              <button
                onClick={() => handlePointTap(0)}
                className={`absolute text-primary text-4xl transition-all duration-300 -translate-x-1/2 ${
                  activeIndex === 0 ? "opacity-100" : "opacity-40"
                }`}
                style={{ left: "0%" }}
              >
                ●
              </button>

              {/* Age labels */}
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

              {/* End tick */}
              <button
                onClick={() => handlePointTap(SNAP_POINTS.length - 1)}
                className={`absolute text-primary text-4xl transition-all duration-300 -translate-x-1/2 ${
                  activeIndex === SNAP_POINTS.length - 1
                    ? "opacity-100"
                    : "opacity-40"
                }`}
                style={{ left: "100%" }}
              >
                ●
              </button>
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

              {/* Dot */}
              <div
                className="absolute top-1/2"
                style={{
                  left: `${dotPercent}%`,
                  transform: "translate(-50%, -50%)",
                  transition: isSnapping
                    ? "left 0.4s cubic-bezier(0.25, 1, 0.5, 1), width 0.2s ease, height 0.2s ease"
                    : "width 0.2s ease, height 0.2s ease",
                }}
              >
                <motion.div
                  style={{
                    width: isDragging ? "52px" : "36px",
                    height: isDragging ? "52px" : "36px",
                    position: "relative",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: PAGE_FADE_DURATION + 0.4,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {isBookend && (
                    <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping" />
                  )}
                  <div
                    className="absolute inset-0 rounded-full bg-primary shadow-lg cursor-grab active:cursor-grabbing"
                    onMouseDown={handlePointerDown}
                  />
                </motion.div>
              </div>
            </div>

            {/* Drag hint */}
            <motion.p
              className="mt-5 font-display font-semibold text-primary text-center text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: PAGE_FADE_DURATION + 0.6 }}
            >
              {t?.dragHint || "← Træk →"}
            </motion.p>
          </div>
        </div>
      </motion.div>

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
