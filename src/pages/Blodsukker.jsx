import { useState, useEffect, useRef } from "react";
import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

function PersonIcon({ color, size = 32 }) {
  return (
    <svg
      width={size}
      height={size * 1.8}
      viewBox="0 0 20 36"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="4" r="4" />
      <path d="M5 10 Q10 8 15 10 L16 22 H12 L11 30 H9 L8 22 H4 Z" />
      <path
        d="M7 22 L6 34 M13 22 L14 34"
        strokeWidth="2.5"
        stroke={color}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M5 13 L2 20 M15 13 L18 20"
        strokeWidth="2"
        stroke={color}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AnimatedCounter({ target, suffix = "%" }) {
  const [count, setCount] = useState(0);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 300, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(from + (target - from) * e));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target]);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function GenderRow({
  label,
  baseCount,
  currentCount,
  color,
  percent,
  showPercent,
}) {
  const newCount = currentCount - baseCount;
  return (
    <div className="flex flex-row items-center gap-3 w-full">
      <p className="font-display font-semibold text-primary text-2xl shrink-0 w-20">
        {label}
      </p>
      <div
        className="flex flex-row flex-wrap gap-1 items-end flex-1"
        style={{ minHeight: "60px" }}
      >
        {Array.from({ length: baseCount }).map((_, i) => (
          <PersonIcon key={`base-${i}`} color={color} size={32} />
        ))}
        {Array.from({ length: Math.max(0, newCount) }).map((_, i) => (
          <div
            key={`new-${i}`}
            style={{ animation: `fadeInUp 0.3s ease ${i * 0.05}s both` }}
          >
            <PersonIcon color="#e05555" size={32} />
          </div>
        ))}
      </div>
      <div
        className="shrink-0 w-24 flex flex-col items-end"
        style={{ minHeight: "60px" }}
      >
        {showPercent && percent > 0 && (
          <div className="flex items-center gap-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#e05555">
              <path d="M12 4 L20 20 H4 Z" />
            </svg>
            <p
              className="font-display font-semibold text-2xl"
              style={{ color: "#e05555" }}
            >
              <AnimatedCounter target={percent} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const MAN_COLOR = "#39516f";
const WOMAN_COLOR = "#8b3a5a";
const baselineMen = 10;
const baselineWomen = 7;
const diabetesMen = 24;
const diabetesWomen = 20;

const getStage = (v) => (v < 33 ? 0 : v < 66 ? 1 : 2);
const getMenCount = (v) =>
  Math.round(baselineMen + (diabetesMen - baselineMen) * (v / 100));
const getWomenCount = (v) =>
  Math.round(baselineWomen + (diabetesWomen - baselineWomen) * (v / 100));
const getMenPercent = (v) => Math.round(v * 1.4);
const getWomenPercent = (v) => Math.round(v * 1.85);

// Blood cells spread across full height
const BLOOD_CELLS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  yPercent: (i * 61) % 100,
  r: 20 + (i % 4) * 12,
  duration: 5 + (i % 5) * 1.5,
  delay: -(i * 0.9),
  color: i % 3 === 0 ? "#c0392b" : "#922b21",
}));

// Sugar cubes — spread evenly across y-axis
const SUGAR_CUBES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  yPercent: ((i * 79) % 96) + 2,
  size: 16 + (i % 3) * 8,
  duration: 4 + (i % 6) * 1.2,
  delay: -(i * 0.7),
}));

function BloodScene({ w, h, visibleCubes }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Blood cells */}
      {BLOOD_CELLS.map((cell) => {
        const cy = h * (cell.yPercent / 100);
        const path = `M -150 0 L ${w + 150} 0`;
        return (
          <ellipse
            key={cell.id}
            rx={cell.r}
            ry={cell.r * 0.55}
            fill={cell.color}
            fillOpacity="0.18"
          >
            <animateMotion
              dur={`${cell.duration}s`}
              begin={`${cell.delay}s`}
              repeatCount="indefinite"
              path={`M -150 ${cy} L ${w + 150} ${cy}`}
            />
          </ellipse>
        );
      })}

      {/* Sugar cubes */}
      {SUGAR_CUBES.slice(0, visibleCubes).map((cube) => {
        const s = cube.size;
        const cy = h * (cube.yPercent / 100);
        return (
          <g key={cube.id}>
            <g>
              <animateMotion
                dur={`${cube.duration}s`}
                begin={`${cube.delay}s`}
                repeatCount="indefinite"
                path={`M -150 ${cy} L ${w + 150} ${cy}`}
              />
              {/* Bob animation using animateTransform */}
              <rect
                x={-s / 2}
                y={-s / 2}
                width={s}
                height={s}
                fill="white"
                fillOpacity="0.9"
                rx="3"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,-6; 0,6; 0,-6"
                  dur={`${cube.duration * 0.5}s`}
                  begin={`${cube.delay}s`}
                  repeatCount="indefinite"
                />
              </rect>
              <path
                d={`M${-s / 2},${-s / 2} L${-s / 2 + s * 0.3},${-s / 2 - s * 0.3} L${s / 2 + s * 0.3},${-s / 2 - s * 0.3} L${s / 2},${-s / 2} Z`}
                fill="white"
                fillOpacity="0.6"
              />
              <path
                d={`M${s / 2},${-s / 2} L${s / 2 + s * 0.3},${-s / 2 - s * 0.3} L${s / 2 + s * 0.3},${s / 2 - s * 0.3} L${s / 2},${s / 2} Z`}
                fill="white"
                fillOpacity="0.4"
              />
              <line
                x1={-s / 2}
                y1={0}
                x2={s / 2}
                y2={0}
                stroke="rgba(180,180,180,0.4)"
                strokeWidth="0.8"
              />
              <line
                x1={0}
                y1={-s / 2}
                x2={0}
                y2={s / 2}
                stroke="rgba(180,180,180,0.4)"
                strokeWidth="0.8"
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export default function Blodsukker() {
  const { language, visible } = useLanguage();
  const t = translations[language]?.blodsukker;
  const [sugarLevel, setSugarLevel] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const [containerSize, setContainerSize] = useState({ w: 500, h: 900 });

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

  const stage = getStage(sugarLevel);
  const menCount = getMenCount(sugarLevel);
  const womenCount = getWomenCount(sugarLevel);
  const menPercent = getMenPercent(sugarLevel);
  const womenPercent = getWomenPercent(sugarLevel);
  const currentStep = t?.steps?.[stage] || {};
  const sliderColor =
    stage === 0 ? "#39516f" : stage === 1 ? "#e09030" : "#e05555";
  const visibleCubes = Math.floor((sugarLevel / 100) * SUGAR_CUBES.length);

  const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);
  const handleMove = (e) => {
    if (!isDragging.current) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const ratio =
      1 - Math.max(0, Math.min(1, (getClientY(e) - rect.top) / rect.height));
    setSugarLevel(Math.round(ratio * 100));
  };
  const handleDown = (e) => {
    isDragging.current = true;
    handleMove(e);
  };
  const handleUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "#5c1a1a" }}
    >
      <FlagButton />
      <BackButton />

      {/* Full screen background */}
      <BloodScene
        w={containerSize.w}
        h={containerSize.h}
        visibleCubes={visibleCubes}
      />

      {/* Upper area — slider */}
      <div className="relative z-10 flex-1 flex flex-row px-8 gap-6">
        <div
          className="flex items-center justify-center w-20"
          style={{ marginTop: "15vh", height: "50vh" }}
        >
          <div
            ref={sliderRef}
            className="relative w-12 h-full rounded-full cursor-pointer"
            style={{ backgroundColor: "rgba(241,241,241,0.15)" }}
            onMouseDown={handleDown}
            onTouchStart={handleDown}
          >
            <div
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{
                height: `${sugarLevel}%`,
                backgroundColor: sliderColor,
                transition: "background-color 0.5s ease",
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full shadow-xl flex items-center justify-center"
              style={{
                bottom: `calc(${sugarLevel}% - 32px)`,
                backgroundColor: "var(--color-ui-box)",
              }}
            >
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: sliderColor,
                  transition: "background-color 0.5s ease",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-1" />
      </div>

      {/* UI Infobox */}
      <div
        className="relative z-10 w-full rounded-t-4xl px-8 pt-6 pb-8"
        style={{ height: "30vh", backgroundColor: "rgba(241,241,241,0.7)" }}
      >
        <div
          className="flex flex-col h-full gap-2"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <div style={{ minHeight: "80px" }}>
            <h2 className="font-display font-semibold text-primary text-3xl text-center leading-snug mb-1">
              <span key={stage} style={{ animation: "fadeIn 0.3s ease" }}>
                {currentStep.heading || "Diabetes og hjertet"}
              </span>
            </h2>
            <p className="font-display font-light text-primary text-3xl leading-relaxed text-center">
              <span
                key={`body-${stage}`}
                style={{ animation: "fadeIn 0.3s ease" }}
              >
                {currentStep.body || "[ Tekst fra museet ]"}
              </span>
            </p>
          </div>
          <div className="w-full h-px bg-primary opacity-20" />
          <div className="flex flex-col gap-2 flex-1 justify-center">
            <GenderRow
              label={t?.men || "Mænd"}
              baseCount={baselineMen}
              currentCount={menCount}
              color={MAN_COLOR}
              percent={menPercent}
              showPercent={sugarLevel > 5}
            />
            <GenderRow
              label={t?.women || "Kvinder"}
              baseCount={baselineWomen}
              currentCount={womenCount}
              color={WOMAN_COLOR}
              percent={womenPercent}
              showPercent={sugarLevel > 5}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
