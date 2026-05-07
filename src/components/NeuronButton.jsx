import { useEffect, useRef } from "react";

function NeuronButton({ src, alt, selected, onClick, floatSeed = 0 }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    // Each neuron gets unique random movement values based on floatSeed
    const xRange = 8 + (floatSeed % 3) * 4;
    const yRange = 10 + (floatSeed % 4) * 4;
    const duration = 3000 + floatSeed * 400;
    const xOffset = (floatSeed % 5) * 0.4;

    let start = null;
    let animFrame;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start + floatSeed * 1200; // offset start point

      const x = Math.sin((elapsed / duration) * Math.PI * 2 + xOffset) * xRange;
      const y =
        Math.cos((elapsed / (duration * 1.3)) * Math.PI * 2 + floatSeed) *
        yRange;

      el.style.transform = `translate(${x}px, ${y}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [floatSeed]);

  return (
    <div ref={btnRef} style={{ willChange: "transform" }}>
      <button
        onClick={onClick}
        className="relative flex items-center justify-center bg-transparent border-none cursor-pointer"
        style={{
          filter: selected
            ? "drop-shadow(0 0 30px rgba(241,241,241,1)) drop-shadow(0 0 60px rgba(241,241,241,0.6))"
            : "drop-shadow(0 0 8px rgba(241,241,241,0.3))",
          opacity: selected ? 1 : undefined,
          transform: selected ? "scale(1.3)" : "scale(1)",
          transition:
            "filter 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          animation: selected
            ? "none"
            : `neuronBreathe ${3.5 + floatSeed * 0.3}s ease-in-out infinite`,
        }}
      >
        <img src={src} alt={alt} className="w-58 h-58 object-contain" />

        {/* Tap hint ring - only on unselected */}
        {!selected && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              animation: `tapHint ${4 + floatSeed * 0.5}s ease-in-out infinite`,
              border: "2px solid rgba(241,241,241,0.3)",
              borderRadius: "50%",
            }}
          />
        )}
      </button>

      <style>{`
        @keyframes neuronBreathe {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.65; }
        }
        @keyframes tapHint {
          0%, 80%, 100% { transform: scale(1); opacity: 0.3; }
          40% { transform: scale(1.15); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

export default NeuronButton;
