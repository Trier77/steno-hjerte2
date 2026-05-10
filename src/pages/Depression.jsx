import { useState, useRef, useEffect } from "react";
import neuron from "../assets/neuron.svg";
import NeuronButton from "../components/NeuronButton";
import BackButton from "../components/BackButton";
import FlagButton from "../components/FlagButton";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import BrainBackground from "../components/Brainbackground";

const NEURON_POSITIONS = [
  { top: "15%", left: "22%", rotation: -15 },
  { top: "25%", left: "68%", rotation: 25 },
  { top: "48%", left: "14%", rotation: -35 },
  { top: "44%", left: "74%", rotation: 10 },
];

function Depression() {
  const { language, visible } = useLanguage();
  const t = translations[language].depression;
  const [selected, setSelected] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const neuronRefs = useRef([]);
  const boxRef = useRef(null);
  const containerRef = useRef(null);
  const [path, setPath] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const content = t?.neurons?.[selected];

  const handleSelect = (index) => {
    if (index === selected) return;
    setContentVisible(false);
    setTimeout(() => {
      setSelected(index);
      setContentVisible(true);
    }, 300);
  };

  useEffect(() => {
    const updatePath = () => {
      const container = containerRef.current;
      const neuronEl = neuronRefs.current[selected];
      const box = boxRef.current;
      if (!container || !neuronEl || !box) return;

      const containerRect = container.getBoundingClientRect();
      const neuronRect = neuronEl.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      const startX =
        neuronRect.left + neuronRect.width / 2 - containerRect.left;
      const startY = neuronRect.top + neuronRect.height / 2 - containerRect.top;
      const endX = boxRect.left + boxRect.width / 2 - containerRect.left;
      const endY = boxRect.top - containerRect.top;

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
      className="relative w-full h-screen overflow-hidden"
    >
      <FlagButton />
      <BackButton />
      <BrainBackground />

      {/* Animated background goes here later */}

      {/* SVG signal line */}
      {path && (
        <svg
          className="absolute inset-0 pointer-events-none z-10"
          width={svgSize.width}
          height={svgSize.height}
          style={{ overflow: "visible" }}
        >
          <path
            d={path}
            fill="none"
            stroke="var(--color-ui-box)"
            strokeWidth="3"
            strokeOpacity="0.35"
            strokeDasharray="10 8"
          />
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

      {/* Neurons */}
      {NEURON_POSITIONS.map((pos, i) => (
        <div
          key={i}
          ref={(el) => (neuronRefs.current[i] = el)}
          className="absolute z-20"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
          }}
        >
          <NeuronButton
            src={neuron}
            alt={`Neuron ${i + 1}`}
            selected={selected === i}
            onClick={() => handleSelect(i)}
            floatSeed={i * 7 + 3}
          />
        </div>
      ))}

      {/* UI Info box */}
      <section
        ref={boxRef}
        className="absolute w-screen bg-ui-box/70 bottom-0 rounded-t-4xl z-20 px-8 pt-6 pb-8"
        style={{ height: "25vh" }}
      >
        <div
          className="flex flex-col h-full"
          style={{
            opacity: contentVisible && visible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* Heading - always same size */}
          <h2 className="font-display font-semibold text-primary text-5xl text-center mb-3 leading-snug">
            {content?.heading || "[ Tekst fra museet ]"}
          </h2>

          {/* Illustration + text - always same layout */}
          <div className="flex flex-row gap-10 flex-1 pt-5">
            <div
              className="bg-white/60 rounded-2xl shrink-0"
              style={{ width: "42%", height: "300px" }}
            />
            <p
              className="font-display font-light text-primary text-3xl leading-relaxed"
              style={{ width: "58%" }}
            >
              {content?.body || "[ Tekst fra museet ]"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Depression;
