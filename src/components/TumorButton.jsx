import { useState, useRef } from "react";

const HOLD_DURATION = 2000;

function TumorButton({ onComplete, onHoldStart }) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const startHold = (e) => {
    e.preventDefault();
    if (done) return;
    setHolding(true);
    if (onHoldStart) onHoldStart();
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(elapsed / HOLD_DURATION, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        clearInterval(intervalRef.current);
        setDone(true);
        setHolding(false);
        setTimeout(() => onComplete(), 400);
      }
    }, 16);
  };

  const stopHold = () => {
    if (done) return;
    clearInterval(intervalRef.current);
    setHolding(false);
    setProgress(0);
  };

  const size = 140;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      {/* Pulsing ping - only when idle */}
      {!holding && !done && (
        <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-40 animate-ping" />
      )}

      {/* Progress ring - only appears when holding */}
      {holding && (
        <svg width={size} height={size} className="absolute rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="white"
            strokeOpacity={0.2}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
      )}

      {/* Inner circle */}
      <button
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
        className={`relative w-24 h-24 rounded-full bg-primary block cursor-pointer border-none transition-transform duration-200 ${
          holding ? "scale-90" : "scale-100"
        } ${done ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}

export default TumorButton;
