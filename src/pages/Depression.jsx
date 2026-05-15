import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import neuron from "../assets/neuron.svg";
import NeuronButton from "../components/NeuronButton";
import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import BrainBackground from "../components/animated backgrounds/Brainbackground";
import { useFadeIn } from "../hooks/useFadeIn";
import { useFadeNavigate } from "../hooks/useFadeNavigate";
import { useIdleTimeout } from "../hooks/useIdleTimeout";

// Placering og rotation af de fire neuron-knapper på skærmen.
// Koordinaterne er i procent så de skalerer med skærmstørrelsen.
const NEURON_POSITIONS = [
  { top: "15%", left: "22%", rotation: -15 },
  { top: "25%", left: "68%", rotation: 25 },
  { top: "48%", left: "14%", rotation: -35 },
  { top: "44%", left: "74%", rotation: 10 },
];

// Hvor lang tid side-fade-in-animationen tager — bruges til at forsinke efterfølgende animationer
const PAGE_FADE_DURATION = 0.1;

export default function Depression() {
  const { language, visible } = useLanguage();
  const t = translations[language].depression;
  const [selected, setSelected] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const neuronRefs = useRef([]);
  const boxRef = useRef(null);
  const containerRef = useRef(null);
  const [path, setPath] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [lineVisible, setLineVisible] = useState(false);
  const fadeVisible = useFadeIn();
  const { fadeNavigate, fading } = useFadeNavigate();
  useIdleTimeout(3);

  // Illustrationer og størrelser til hvert neuron-punkt — indeks matcher NEURON_POSITIONS
  const NEURON_ILLUSTRATIONS = [
    "/src/assets/icons/brain-depression1.svg",
    "/src/assets/icons/brain-depression2.svg",
    "/src/assets/icons/brain-depression3.svg",
    "/src/assets/icons/brain-depression4.svg",
  ];

  const NEURON_ILLUSTRATION_SIZES = [
    { width: "42%", height: "250px" },
    { width: "42%", height: "200px" },
    { width: "42%", height: "250px" },
    { width: "42%", height: "280px" },
  ];

  // Bestemmer om billede og tekst byttes om — giver lidt variation i layoutet
  const NEURON_LAYOUT = ["row", "row-reverse", "row-reverse", "row"];

  const content = t?.neurons?.[selected];

  const handleSelect = (index) => {
    if (index === selected) return;
    // Fade indholdet ud, skift data, fade ind igen
    setContentVisible(false);
    setTimeout(() => {
      setSelected(index);
      setContentVisible(true);
    }, 300);
  };

  // Venter med at vise signallinjen til UI-boksen er landet — ellers ser det rodet ud
  useEffect(() => {
    const uiBoxDelay = PAGE_FADE_DURATION + 0.3 + 2 * 0.15;
    const uiBoxDuration = 0.6;
    const buffer = 0.15;

    const t = setTimeout(
      () => setLineVisible(true),
      (uiBoxDelay + uiBoxDuration + buffer) * 800,
    );
    return () => clearTimeout(t);
  }, []);

  // Beregner og opdaterer SVG-stien mellem den valgte neuron og UI-boksen.
  // Vi kører den på et interval fordi layout kan shifte lidt undervejs (f.eks. under animationer).
  useEffect(() => {
    const updatePath = () => {
      const container = containerRef.current;
      const neuronEl = neuronRefs.current[selected];
      const box = boxRef.current;
      if (!container || !neuronEl || !box) return;

      const containerRect = container.getBoundingClientRect();
      const neuronRect = neuronEl.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      // Startpunkt = centrum af neuronen, slutpunkt = toppen af UI-boksen
      const startX =
        neuronRect.left + neuronRect.width / 2 - containerRect.left;
      const startY = neuronRect.top + neuronRect.height / 2 - containerRect.top;
      const endX = boxRect.left + boxRect.width / 2 - containerRect.left;
      const endY = boxRect.top - containerRect.top;

      // Cubic bezier kontrolpunkter — giver den bløde kurve ned mod boksen
      const cp1X = startX + (endX - startX) * 0.1;
      const cp1Y = startY + (endY - startY) * 0.5;
      const cp2X = endX - (endX - startX) * 0.1;
      const cp2Y = startY + (endY - startY) * 0.75;

      setSvgSize({ width: containerRect.width, height: containerRect.height });
      setPath(
        `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`,
      );
    };

    updatePath();
    const interval = setInterval(updatePath, 50);
    window.addEventListener("resize", updatePath);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updatePath);
    };
  }, [selected]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden page-fade-in ${fadeVisible ? "visible" : ""}`}
    >
      <FlagButton />
      <BackButton onClick={() => fadeNavigate("/")} />
      <BrainBackground />

      {/* Animeret signallinje fra neuron til UI-boks */}
      {path && (
        <svg
          className="absolute inset-0 pointer-events-none z-10"
          width={svgSize.width}
          height={svgSize.height}
          style={{
            overflow: "visible",
            opacity: lineVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <path
            d={path}
            fill="none"
            stroke="var(--color-ui-box)"
            strokeWidth="3"
            strokeOpacity="0.35"
            strokeDasharray="10 8"
          />
          {/* To kugler der løber langs stien med en halv periode forskydning */}
          <circle
            r="8"
            fill="var(--color-ui-box)"
            opacity="0.9"
            style={{ filter: "drop-shadow(0 0 10px var(--color-ui-box))" }}
          >
            <animateMotion dur="1.4s" repeatCount="indefinite" path={path} />
          </circle>
          <circle
            r="5"
            fill="var(--color-ui-box)"
            opacity="0.6"
            style={{ filter: "drop-shadow(0 0 6px var(--color-ui-box))" }}
          >
            <animateMotion
              dur="1.4s"
              begin="0.7s"
              repeatCount="indefinite"
              path={path}
            />
          </circle>
        </svg>
      )}

      {/* Neuron-knapper — staggered fade-in via Framer Motion */}
      {NEURON_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          ref={(el) => (neuronRefs.current[i] = el)}
          className="absolute z-20"
          style={{ top: pos.top, left: pos.left }}
          initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          transition={{
            duration: 0.7,
            delay: PAGE_FADE_DURATION + 0.3 + i * 0.15,
            ease: [0.34, 1.56, 0.64, 1], // Lille overshoot så de popper ind
          }}
        >
          <div style={{ transform: `rotate(${pos.rotation}deg)` }}>
            <NeuronButton
              src={neuron}
              alt={`Neuron ${i + 1}`}
              selected={selected === i}
              onClick={() => handleSelect(i)}
              floatSeed={i * 7 + 3}
            />
          </div>
        </motion.div>
      ))}

      {/* UI-boks der slider op fra bunden når siden loader */}
      <motion.section
        ref={boxRef}
        className="absolute w-screen bg-ui-box/70 bottom-0 rounded-t-4xl z-20 px-8 pt-6 pb-8"
        style={{ height: "25vh" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          delay: PAGE_FADE_DURATION + 0.3 + 2 * 0.15,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* visible-prop fra LanguageContext sikrer at indhold er skjult under sprogskift */}
        <div
          className="flex flex-col h-full"
          style={{
            opacity: contentVisible && visible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <h2 className="font-display font-semibold text-primary text-5xl text-center mb-3 leading-snug">
            {content?.heading || "[ Tekst fra museet ]"}
          </h2>
          <div
            className="flex flex-row gap-10 flex-1 pt-5"
            style={{ flexDirection: NEURON_LAYOUT[selected] }}
          >
            <img
              src={NEURON_ILLUSTRATIONS[selected]}
              alt=""
              className="shrink-0 object-contain opacity-80"
              style={NEURON_ILLUSTRATION_SIZES[selected]}
            />
            <p
              className="font-display font-light text-primary text-3xl leading-relaxed"
              style={{ width: "58%" }}
            >
              {content?.body || "[ Tekst fra museet ]"}
            </p>
          </div>
        </div>
      </motion.section>

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
