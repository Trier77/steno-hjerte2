import { useEffect, useState } from "react";

// These positions must match NEURON_POSITIONS in Depression.jsx exactly
const NEURONS = [
  { top: "15%", left: "22%", rotation: -15, delay: 0.0 },
  { top: "25%", left: "68%", rotation: 25, delay: 0.15 },
  { top: "48%", left: "14%", rotation: -35, delay: 0.3 },
  { top: "44%", left: "74%", rotation: 10, delay: 0.45 },
];

export default function DepressionTransition({ origin, onDone }) {
  const [phase, setPhase] = useState("idle");
  // idle → zooming → darkening → neurons → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("zooming"), 30);
    const t2 = setTimeout(() => setPhase("darkening"), 500);
    const t3 = setTimeout(() => setPhase("neurons"), 900);
    const t4 = setTimeout(() => onDone(), 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone]);

  const ox = origin?.x ?? "50%";
  const oy = origin?.y ?? "50%";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* ── Speed lines from tap point ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: phase === "zooming" ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = (i / 28) * 360;
          const rad = (angle * Math.PI) / 180;
          const cx = parseFloat(ox);
          const cy = parseFloat(oy);
          const len = 1600;
          const width = i % 3 === 0 ? 2 : 1;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(rad) * len}
              y2={cy + Math.sin(rad) * len}
              stroke="rgba(150,90,130,0.22)"
              strokeWidth={width}
            />
          );
        })}
      </svg>

      {/* ── Vignette closing in from edges ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at ${ox} ${oy},
          transparent ${phase === "zooming" ? "10%" : "0%"},
          rgba(10,2,8,0.85) ${phase === "zooming" ? "55%" : "20%"},
          rgba(5,0,4,1) ${phase === "zooming" ? "80%" : "50%"}
        )`,
          transition: "background 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* ── Full black ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0d0408",
          opacity: phase === "darkening" || phase === "neurons" ? 1 : 0,
          transition: "opacity 0.4s ease-in",
        }}
      />

      {/* ── Neuron glows ── */}
      {NEURONS.map((n, i) => (
        <div
          key={`g-${i}`}
          style={{
            position: "absolute",
            top: n.top,
            left: n.left,
            width: 220,
            height: 220,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(100,60,140,0.45) 0%, transparent 70%)",
            opacity: phase === "neurons" ? 1 : 0,
            transition: `opacity 0.7s ease ${n.delay}s`,
            filter: "blur(18px)",
          }}
        />
      ))}

      {/* ── Neuron shapes ── */}
      {NEURONS.map((n, i) => (
        <div
          key={`n-${i}`}
          style={{
            position: "absolute",
            top: n.top,
            left: n.left,
            width: 110,
            height: 110,
            transform: `translate(-50%, -50%) rotate(${n.rotation}deg)`,
            opacity: phase === "neurons" ? 0.6 : 0,
            transition: `opacity 0.7s ease ${n.delay + 0.05}s`,
          }}
        >
          <NeuronShape />
        </div>
      ))}
    </div>
  );
}

function NeuronShape() {
  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
      <circle cx="50" cy="50" r="18" fill="rgba(160,120,200,0.6)" />
      <circle
        cx="50"
        cy="50"
        r="26"
        fill="none"
        stroke="rgba(160,120,200,0.3)"
        strokeWidth="1.5"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + Math.cos(rad) * 26}
            y1={50 + Math.sin(rad) * 26}
            x2={50 + Math.cos(rad) * 46}
            y2={50 + Math.sin(rad) * 46}
            stroke="rgba(160,120,200,0.5)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
