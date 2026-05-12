import HotspotButton from "./HotspotButton";
import { useState, useRef, useEffect, useCallback } from "react";
import {animate} from "framer-motion";

// --- Geometri-konstanter ---
const CX = 300; // Centrum X
const CY = 295; // Centrum Y (bunden af halvkreds)
const SEG_OUTER_R = 255; // Ydre kant af røde segmenter
const SEG_INNER_R = 190; // Indre kant af røde segmenter
const TRACK_OUTER_R = 190; // Ydre kant af grå track
const TRACK_INNER_R = 140; // Indre kant af grå track
const DOT_R = 165; // Radius hvor den blå cirkel kører

// --- Hjælpefunktioner ---
const toRad = (d) => (d * Math.PI) / 180;

const polarToCart = (cx, cy, r, deg) => ({
  x: cx + r * Math.cos(toRad(deg)),
  y: cy - r * Math.sin(toRad(deg)),
});

// Tegner en "ring-skive" fra startDeg til endDeg (startDeg > endDeg = venstre mod højre)
const arcPath = (cx, cy, outerR, innerR, startDeg, endDeg) => {
  const fmt = (n) => n.toFixed(2);
  const oS = polarToCart(cx, cy, outerR, startDeg);
  const oE = polarToCart(cx, cy, outerR, endDeg);
  const iS = polarToCart(cx, cy, innerR, startDeg);
  const iE = polarToCart(cx, cy, innerR, endDeg);
  const large = Math.abs(startDeg - endDeg) > 180 ? 1 : 0;
  return [
    `M ${fmt(oS.x)} ${fmt(oS.y)}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${fmt(oE.x)} ${fmt(oE.y)}`,
    `L ${fmt(iE.x)} ${fmt(iE.y)}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${fmt(iS.x)} ${fmt(iS.y)}`,
    "Z",
  ].join(" ");
};

// Sti som teksten følger langs midten af segmentet
const LABEL_R = (SEG_OUTER_R + SEG_INNER_R) / 2;
const labelArcD = (startDeg, endDeg) => {
  const margin = 3;
  const s = polarToCart(CX, CY, LABEL_R, startDeg - margin);
  const e = polarToCart(CX, CY, LABEL_R, endDeg + margin);
  const fmt = (n) => n.toFixed(2);
  return `M ${fmt(s.x)} ${fmt(s.y)} A ${LABEL_R} ${LABEL_R} 0 0 1 ${fmt(e.x)} ${fmt(e.y)}`;
};



// --- Komponent ---
function Speedometer({onSegmentChange, labels =[]}) {

  const [angle, setAngle] = useState(156); // Startposition (i segment 0)
  const svgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const SEGMENTS = [
    { id: 0, startDeg: 180, endDeg: 135, midDeg:157, label: labels[0] ?? "Graviditet" },
    { id: 1, startDeg: 135, endDeg: 90, midDeg:112, label: labels[1] ?? "Graviditetsdiabetes" },
    { id: 2, startDeg: 90,  endDeg: 45, midDeg:67, label: labels[2] ?? "Svangerskabsforgiftning" },
    { id: 3, startDeg: 45,  endDeg: 0, midDeg:22, label: labels[3] ?? "For tidlig fødsel" },
  ];
  
  // Finder hvilket segment den blå cirkel er i (eller null)
  const activeSegment =
    SEGMENTS.find((s) => angle <= s.startDeg && angle >= s.endDeg)?.id ?? null;

    const handleSegmentClick = (midDeg) => {
  animate(angle, midDeg, {
    duration: 0.5,
    ease: "easeInOut",
    onUpdate: (v) => setAngle(v),
  });
};

  // Omregner museposition til vinkel i SVG-koordinater
  const getAngleFromEvent = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const svgX = ((clientX - rect.left) / rect.width) * 600;
    const svgY = ((clientY - rect.top) / rect.height) * 310;
    const a = Math.atan2(-(svgY - CY), svgX - CX) * (180 / Math.PI);
    // Klemmer til halvkredsens gyldige interval
    const clamped = Math.max(6, Math.min(174, a));

    //Sørger for at vi ikke kan komme v<->h uden forbi 0 og 180 grader
    setAngle(prev => Math.abs(clamped - prev) > 90 ? prev : clamped);
  
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(()=> {
     onSegmentChange?.(activeSegment);
  },[activeSegment, onSegmentChange]);

  useEffect(() => {
     const onMove = (e) => {
      if (!isDragging) return;
      getAngleFromEvent(e);
    };
    const onUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [getAngleFromEvent, isDragging]); 

  const dotPos = polarToCart(CX, CY, DOT_R, angle);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 310"
      width="100%"
      style={{ userSelect: "none", display: "block" }}
    >
      {/* Sti-definitioner til tekst langs kurven */}
      <defs>
        {SEGMENTS.map((seg) => (
          <path
            key={`lp-${seg.id}`}
            id={`lp-${seg.id}`}
            d={labelArcD(seg.startDeg, seg.endDeg)}
          />
        ))}
        {SEGMENTS.map((seg) => (
          <mask key={`mask-${seg.id}`} id={`sweep-${seg.id}`}>
            <rect width="600" height="310" fill="black" />
            {/* Hvid = synlig — definerer segmentets form */}
            <path d={arcPath(CX, CY, SEG_OUTER_R, SEG_INNER_R, seg.startDeg, seg.endDeg)} fill="white" />
            {/* Sort cirkel krymper fra ydre til indre → afslører farven udefra og ind */}
            <circle
              key={activeSegment === seg.id ? "on" : "off"}
              cx={CX} cy={CY} fill="black"
              r={activeSegment === seg.id ? TRACK_INNER_R : SEG_OUTER_R}
              style={activeSegment === seg.id
                ? { animation: "sweepInward 0.5s ease forwards" }
                : {}
              }
            />
          </mask>
        ))}
        <filter id="round-corners">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feColorMatrix in="blur" type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
          result="rounded"/>
        <feComposite in="SourceGraphic" in2="rounded" operator="atop"/>
        </filter>
      </defs>

      {/* Slider felter */}
      <g filter="url(#round-corners)">
{SEGMENTS.map((seg) => (
        <path
          key={`track-${seg.id}`}
          d={arcPath(
            CX,
            CY,
            TRACK_OUTER_R,
            TRACK_INNER_R,
            seg.startDeg,
            seg.endDeg,
          )}
          fill="#c1cddb"
          // stroke="white"
          // strokeWidth={2}
           filter="url(#round-corners)"

           //Kan slettes, hvis vi kun vil have at man kan trykke på emne felterne
           style={{ transition: "fill 0.35s ease", cursor: "pointer" }}
          onClick={() => handleSegmentClick(seg.midDeg)}
        />
      ))}
      
      
      {/* Emne felter – skifter farve når cirklen er inden for */}
      {SEGMENTS.map((seg) => (
        <path
          key={seg.id}
          d={arcPath(
            CX,
            CY,
            SEG_OUTER_R,
            SEG_INNER_R,
            seg.startDeg,
            seg.endDeg,
          )}
          fill={activeSegment === seg.id ? "var(--color-secondary)" : "#c1cddb"}
          // stroke="white"
          // strokeWidth={2}
           filter="url(#round-corners)"
          style={{ transition: "fill 0.35s ease", cursor: "pointer" }}
          onClick={() => handleSegmentClick(seg.midDeg)}
          
        />
      ))}
      {/* Farvede overlays med sweep-animation */}
      {SEGMENTS.map((seg) => (
        <path
          key={`overlay-${seg.id}`}
          d={arcPath(CX, CY, SEG_OUTER_R, SEG_INNER_R, seg.startDeg, seg.endDeg)}
          fill="var(--color-secondary)"
          mask={`url(#sweep-${seg.id})`}
          style={{ pointerEvents: "none" }}
        />
      ))}

      {/* Skillelinjer – tegnes ovenpå segmenterne */}
      {[180, 135, 90, 45, 0].map((deg) => {
        const inner = polarToCart(CX, CY, TRACK_INNER_R, deg);
        const outer = polarToCart(CX, CY, SEG_OUTER_R, deg);
        return (
          <line
            key={deg}
            x1={inner.x} y1={inner.y}
            x2={outer.x} y2={outer.y}
            stroke="white"
            strokeWidth="3"
          />
        );
      })}
      {/* Yderste bue */}
      <path
        d={`M ${polarToCart(CX, CY, SEG_OUTER_R, 180).x} ${polarToCart(CX, CY, SEG_OUTER_R, 180).y} A ${SEG_OUTER_R} ${SEG_OUTER_R} 0 0 1 ${polarToCart(CX, CY, SEG_OUTER_R, 0).x} ${polarToCart(CX, CY, SEG_OUTER_R, 0).y}`}
        fill="none"
        stroke="white"
        strokeWidth="3"
      />

      {/* Inderste bue */}
      <path
        d={`M ${polarToCart(CX, CY, TRACK_INNER_R, 180).x} ${polarToCart(CX, CY, TRACK_INNER_R, 180).y} A ${TRACK_INNER_R} ${TRACK_INNER_R} 0 0 1 ${polarToCart(CX, CY, TRACK_INNER_R, 0).x} ${polarToCart(CX, CY, TRACK_INNER_R, 0).y}`}
        fill="none"
        stroke="white"
        strokeWidth="3"
      />
      </g>
      

      {/* Labels langs kurven */}
      {SEGMENTS.map((seg) => (
        <text
          key={`t-${seg.id}`}
          fontSize="11"
          fontWeight="600"
          fontFamily="sans-serif"
          fill={activeSegment === seg.id ? "var(--color-primary)" : "#f5ede8"}
          style={{ transition: "fill 0.35s ease", pointerEvents: "none" }}
        >
          <textPath
            href={`#lp-${seg.id}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {seg.label}
          </textPath>
        </text>
      ))}

      
      {/* Ping-effekt */}
      <circle
        cx={dotPos.x}
        cy={dotPos.y}
        r="16"
        fill="var(--color-primary)"
        style={{ animation: isDragging ?  "none" : "ping 1.5s ease-out infinite",
          transformOrigin: `${dotPos.x}px ${dotPos.y}px` }}
      />
      {/* Blå draggable cirkel */}
      <circle
        cx={dotPos.x}
        cy={dotPos.y}
        r={isDragging ? 22 : 16}
        fill="var(--color-primary)"
        style={{ cursor: isDragging ? "grabbing" : "grab", transition: "r 0.2s ease" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      />
    </svg>
  );
}
export default Speedometer;
