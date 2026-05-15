import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { useFadeIn } from "../hooks/useFadeIn";
import { useFadeNavigate } from "../hooks/useFadeNavigate";
import BloodBackground from "../components/animated backgrounds/BloodBackground";
import { useIdleTimeout } from "../hooks/useIdleTimeout";

// ─── Konstanter ───────────────────────────────────────────────────────────────
const SNAP_POSITIONS = [0, 50, 100]; // slider-positioner i procent svarende til de tre stages
const PAGE_FADE_DURATION = 0.4;

// ─── Sukkerknalder ──────────────────────────────────────────────────────────

// Hver terning får faste tilfældige egenskaber beregnet én gang, stabile på tværs af re-renders.
// Vi bruger deterministisk matematik (i * primtal) i stedet for Math.random() så de ikke hopper rundt.
const CUBE_TRAITS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  y: 5 + ((i * 37 + 11) % 85), // vertikal placering 5–90%
  duration: 6 + ((i * 13) % 10), // 6–16s om at krydse skærmen
  delay: -((i * 3.7) % 16), // negativ delay gør at de starter midt i animationen
  size: 24 + ((i * 7) % 20), // 24–44px
  opacity: 0.5 + ((i * 11) % 40) / 100, // 0.5–0.9
  wobble: ((i * 17) % 12) - 6, // lille vertikal drift ±6px
}));

// Antal terninger der vises per stage — flere terninger = mere sukker i blodet
const STAGE_CUBE_COUNT = [3, 8, 20];

// CSS-animationen injektes direkte i DOM'en én gang så den altid er tilgængelig
const FLOW_STYLE = `
@keyframes sugarFlow {
  0%   { transform: translateX(-60px) translateY(0px); }
  50%  { transform: translateX(calc(50vw))  translateY(var(--wobble)); }
  100% { transform: translateX(calc(100vw + 60px)) translateY(0px); }
}`;
if (
  typeof document !== "undefined" &&
  !document.getElementById("sugar-flow-style")
) {
  const tag = document.createElement("style");
  tag.id = "sugar-flow-style";
  tag.textContent = FLOW_STYLE;
  document.head.appendChild(tag);
}

function SugarCube({ traits, entranceDelay }) {
  const { y, duration, delay, size, opacity, wobble } = traits;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{
        duration: 0.5,
        delay: entranceDelay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      style={{
        position: "absolute",
        top: `${y}%`,
        left: 0,
        pointerEvents: "none",
      }}
    >
      {/* Det indre div håndterer den løbende drift på tværs af skærmen */}
      <div
        style={{
          "--wobble": `${wobble}px`,
          animation: `sugarFlow ${duration}s linear ${delay}s infinite`,
          opacity,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="18,2 34,10 18,18 2,10"
            fill="#f9e4a0"
            stroke="#c9a84c"
            strokeWidth="1"
          />
          <polygon
            points="2,10 18,18 18,34 2,26"
            fill="#e8c96e"
            stroke="#c9a84c"
            strokeWidth="1"
          />
          <polygon
            points="34,10 18,18 18,34 34,26"
            fill="#d4a843"
            stroke="#c9a84c"
            strokeWidth="1"
          />
          <circle cx="20" cy="7" r="1.5" fill="white" opacity="0.6" />
        </svg>
      </div>
    </motion.div>
  );
}

function SugarCubes({ stage }) {
  const count = STAGE_CUBE_COUNT[stage] ?? 0;
  return (
    <div
      className="absolute inset-0"
      style={{ pointerEvents: "none", zIndex: 5, overflow: "hidden" }}
    >
      {/* AnimatePresence sørger for at terninger fader ud når stagen skifter */}
      <AnimatePresence>
        {CUBE_TRAITS.slice(0, count).map((traits, i) => (
          <SugarCube key={traits.id} traits={traits} entranceDelay={i * 0.05} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Personfigur ──────────────────────────────────────────────────────────────
const GENDER_CONFIG = {
  man: { total: 10, redCount: 4, multiplier: "140%" },
  woman: { total: 10, redCount: 5, multiplier: "185%" },
};

const FIGURE_SIZE = 64; // px bred
const FIGURE_HEIGHT = 110; // px høj — fast så mænd og kvinder er samme højde

// Blå og røde figurer ligger ovenpå hinanden og crossfader i stedet for at unmounte/remounte.
// Det giver en blød overgang uden layout-hop.
function PersonIcon({ gender, isRed, appearDelay, swapDelay }) {
  const blueSrc = `/src/assets/icons/${gender}-blue.svg`;
  const redSrc = `/src/assets/icons/${gender}-red.svg`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: appearDelay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      style={{
        position: "relative",
        width: FIGURE_SIZE,
        height: FIGURE_HEIGHT,
        flexShrink: 0,
      }}
    >
      {/* Blå fader ud når figuren skal blive rød */}
      <motion.img
        src={blueSrc}
        alt=""
        animate={{ opacity: isRed ? 0 : 1 }}
        transition={{ duration: 0.35, delay: isRed ? swapDelay : 0 }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      {/* Rød fader ind oven på den blå */}
      <motion.img
        src={redSrc}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: isRed ? 1 : 0 }}
        transition={{ duration: 0.35, delay: isRed ? swapDelay : 0 }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </motion.div>
  );
}

function GenderRow({ gender, stage }) {
  const { total, redCount, multiplier } = GENDER_CONFIG[gender];

  return (
    <div className="relative flex flex-row items-center justify-center w-full">
      <div className="flex flex-row items-end justify-center gap-1 w-full">
        {Array.from({ length: total }, (_, i) => {
          const isRed = stage === 2 && i >= total - redCount;
          const redIndex = i - (total - redCount);
          return (
            <PersonIcon
              key={`${gender}-${i}`}
              gender={gender}
              isRed={isRed}
              // Kun stagger-delay ved stage 1, ved stage 2 er figurerne allerede synlige
              appearDelay={stage === 1 ? i * 0.06 : 0}
              swapDelay={isRed ? redIndex * 0.1 : 0}
            />
          );
        })}
      </div>

      {/* Badge/tallene får absolute så den ikke påvirker centreringen af figurerne */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              key="multiplier"
              initial={{ opacity: 0, scale: 0.5, x: 12 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 12 }}
              transition={{
                duration: 0.45,
                delay: redCount * 0.1 + 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="flex flex-row items-center gap-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#e05555">
                <path d="M12 4 L20 20 H4 Z" />
              </svg>
              <p
                className="font-display font-bold leading-none"
                style={{ color: "#e05555", fontSize: "1.6rem" }}
              >
                {multiplier}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Blodsukker() {
  const { language, visible } = useLanguage();
  const t = translations[language]?.blodsukker;
  const fadeVisible = useFadeIn();
  const { fadeNavigate, fading } = useFadeNavigate();
  useIdleTimeout(3);

  const [stage, setStage] = useState(0);
  const [sliderY, setSliderY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);

  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const startYRef = useRef(null);
  const startSliderRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ w: 500, h: 900 });

  // Refs bruges i event listeners for at undgå stale closures
  // React state kan ikke læses korrekt inde i addEventListener-callbacks,
  // så vi holder en synkroniseret ref-kopi af de værdier vi har brug for der.
  const isDraggingRef = useRef(false);
  const sliderYRef = useRef(0);
  const stageRef = useRef(0);

  useEffect(() => {
    sliderYRef.current = sliderY;
  }, [sliderY]);
  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Tracker container-størrelsen så BloodBackground kan skalere korrekt
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setContainerSize({ w: r.width, h: r.height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sliderPercent = sliderY * 100;

  const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

  const snapToIndex = (index) => {
    const clamped = Math.max(0, Math.min(2, index));
    setIsSnapping(true);
    setSliderY(SNAP_POSITIONS[clamped] / 100);
    // Lille forsinkelse så slider-animationen når at starte inden indholdet skifter
    if (clamped !== stageRef.current) {
      setTimeout(() => {
        setStage(clamped);
        stageRef.current = clamped;
      }, 150);
    }
    setTimeout(() => setIsSnapping(false), 400);
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    startYRef.current = getClientY(e);
    startSliderRef.current = sliderYRef.current;
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      // Vi bruger slider-elementets højde som reference for hvor langt man skal trække
      const height = sliderRef.current?.offsetHeight || 300;
      const delta = startYRef.current - getClientY(e);
      const newY = Math.max(
        0,
        Math.min(1, startSliderRef.current + delta / height),
      );
      sliderYRef.current = newY;
      setSliderY(newY);
    };

    const onUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      // Snap til nærmeste stage når brugeren slipper
      const nearest = Math.round(sliderYRef.current * 2);
      snapToIndex(nearest);
    };

    const track = sliderRef.current;

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
    track?.addEventListener("touchstart", handlePointerDown, {
      passive: false,
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      track?.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  const currentStep = t?.steps?.[stage] || {};

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden flex flex-col page-fade-in ${fadeVisible ? "visible" : ""}`}
      style={{ backgroundColor: "#5c1a1a" }}
    >
      <FlagButton />
      <BackButton onClick={() => fadeNavigate("/")} />

      <BloodBackground w={containerSize.w} h={containerSize.h} />

      {/* Sukkerknalderne er over baggrunden, under UI */}
      <SugarCubes stage={stage} />

      {/* Øverste område med den vertikale slider */}
      <div className="relative z-10 flex-1 flex flex-row px-8 gap-6">
        <motion.div
          className="flex items-center justify-center w-20"
          style={{ marginTop: "15vh", height: "50vh" }}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: PAGE_FADE_DURATION + 0.3,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          <div
            ref={sliderRef}
            className="relative w-6 h-full rounded-full select-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handlePointerDown}
          >
            {/* Fyldt del af slideren vokser opad med slideren */}
            <div
              className="absolute bottom-0 left-0 right-0 rounded-full bg-primary"
              style={{
                height: `${sliderPercent}%`,
                transition: isSnapping
                  ? "height 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                  : isDragging
                    ? "none"
                    : undefined,
              }}
            />

            {/* Håndtaget/selve den dot der er */}
            <div
              className="absolute left-1/2"
              style={{
                bottom: `${sliderPercent}%`,
                transform: "translate(-50%, 50%)",
                transition: isSnapping
                  ? "bottom 0.4s cubic-bezier(0.25, 1, 0.5, 1), width 0.2s ease, height 0.2s ease"
                  : "width 0.2s ease, height 0.2s ease",
                zIndex: 2,
              }}
            >
              <motion.div
                style={{
                  width: isDragging ? "65px" : "50px",
                  height: isDragging ? "65px" : "50px",
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
                {/* Ping-animation på stage 0 som hint til at slideren kan trækkes */}
                {stage === 0 && (
                  <span className="absolute inset-0 rounded-full bg-primary opacity-40 animate-ping" />
                )}
                <div
                  className="absolute inset-0 rounded-full bg-primary shadow-lg"
                  style={{ cursor: isDragging ? "grabbing" : "grab" }}
                  onMouseDown={handlePointerDown}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Infoboks */}
      <motion.div
        className="relative z-10 w-full rounded-t-4xl px-8 pt-6 pb-8"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.65,
          delay: PAGE_FADE_DURATION + 0.1,
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{
          height: "32vh",
          backgroundColor: "rgba(241,241,241,0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* visible-prop fra LanguageContext skjuler indhold under sprogskift */}
        <div
          className="flex flex-col h-full gap-2"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <div style={{ minHeight: "80px" }}>
            {/* mode="wait" sikrer at gammelt indhold er væk inden nyt fader ind */}
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display font-semibold text-primary text-5xl text-center leading-snug mb-1">
                  {currentStep.heading || "Diabetes og hjertet"}
                </h2>
                <p
                  className="font-display font-light text-primary text-3xl leading-relaxed text-left"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {currentStep.body || ""}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* På stage 0 vises et hint og på stage 1 og 2 vises kønsfigurerne */}
          <AnimatePresence mode="wait">
            {stage === 0 && currentStep.hint ? (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center gap-2 mt-2 flex-1"
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
                  <p className="font-display font-semibold text-primary text-3xl mt-40 text-center px-6">
                    {currentStep.hint}
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="gender-rows"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-2 flex-1 justify-center"
              >
                <GenderRow gender="man" stage={stage} />
                <GenderRow gender="woman" stage={stage} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Sort overlay der fader ind ved tilbage-navigation */}
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
