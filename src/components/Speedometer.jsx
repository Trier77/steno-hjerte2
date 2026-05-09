import HotspotButton from "./HotspotButton";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

// --- Geometri-konstanter ---
const CX = 300; // Centrum X
const CY = 295; // Centrum Y (bunden af halvkreds)
const SEG_OUTER_R = 275; // Ydre kant af røde segmenter
const SEG_INNER_R = 177; // Indre kant af røde segmenter
const TRACK_OUTER_R = 177; // Ydre kant af grå track
const TRACK_INNER_R = 140; // Indre kant af grå track
const DOT_R = 158; // Radius hvor den blå cirkel kører

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

// --- Segment-definitioner ---
// startDeg > endDeg (vi bevæger os venstre mod højre = faldende grader)
// Tilpas label og route til dit projekt
const SEGMENTS = [
  {
    id: 0,
    startDeg: 180,
    endDeg: 135,
    label: "Graviditet",
    route: "/graviditet",
  },
  {
    id: 1,
    startDeg: 135,
    endDeg: 90,
    label: "Graviditetsdiabetes",
    route: "/graviditetsdiabetes",
  },
  {
    id: 2,
    startDeg: 90,
    endDeg: 45,
    label: "For tidlig fødsel",
    route: "/foedsel",
  },
  {
    id: 3,
    startDeg: 45,
    endDeg: 0,
    label: "Svangerskabsforgiftning",
    route: "/svangerskab",
  },
];

// Flyt startpositionen til segment 0

// --- Komponent ---
function Speedometer() {
  const navigate = useNavigate();
  const [angle, setAngle] = useState(156); // Startposition (i segment 0)
  const svgRef = useRef(null);
  const isDragging = useRef(false);

  // Finder hvilket segment den blå cirkel er i (eller null)
  const activeSegment =
    SEGMENTS.find((s) => angle <= s.startDeg && angle >= s.endDeg)?.id ?? null;

  // Omregner museposition til vinkel i SVG-koordinater
  const getAngleFromEvent = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const svgX = ((clientX - rect.left) / rect.width) * 600;
    const svgY = ((clientY - rect.top) / rect.height) * 310;
    const a = Math.atan2(-(svgY - CY), svgX - CX) * (180 / Math.PI);
    // Klemmer til halvkredsens gyldige interval
    return Math.max(6, Math.min(174, a));

    //Sørger for at vi ikke kan komme v<->h uden forbi 0 og 180 grader
    //   setAngle(prev => Math.abs(clamped - prev) > 90 ? prev : clamped);
    // return null;
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const a = getAngleFromEvent(e);
      if (a !== null) setAngle(a);
    };
    const onUp = () => {
      isDragging.current = false;
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
  }, [getAngleFromEvent]);

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
      </defs>

      {/* Grå track – 4 dele der matcher de røde segmenter */}
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
          fill="#c8cdd6"
          stroke="white"
          strokeWidth={2}
        />
      ))}

      {/* Koncentriske dekorationsringe i det indre område */}

      {/* <circle cx={CX} cy={CY} r={275} fill="none" stroke="#9aa0b0" strokeWidth="2"   opacity="0.6" />
      <circle cx={CX} cy={CY} r={177} fill="none" stroke="#9aa0b0" strokeWidth="1.5" opacity="0.4" />
      <circle cx={CX} cy={CY} r={140} fill="none" stroke="#9aa0b0" strokeWidth="1"  opacity="0.3" /> */}

      {/* Hvide skillelinjer ved gap-vinklerne */}
      {/* {[134, 90, 46].map((deg) => {
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
      })} */}

      {/* Røde segmenter – skifter farve når cirklen er inden for */}
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
          fill={activeSegment === seg.id ? "#f2efe0" : "#8b1e2d"}
          stroke="white"
          strokeWidth={2}
          style={{ transition: "fill 0.35s ease", cursor: "pointer" }}
          onClick={() => navigate(seg.route)}
        />
      ))}

      {/* Labels langs kurven */}
      {SEGMENTS.map((seg) => (
        <text
          key={`t-${seg.id}`}
          fontSize="11"
          fontWeight="600"
          fontFamily="sans-serif"
          fill={activeSegment === seg.id ? "#6b1020" : "#f5ede8"}
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

      {/* Blå draggable cirkel */}
      <circle
        cx={dotPos.x}
        cy={dotPos.y}
        r="16"
        fill="#2b6dd4"
        stroke="white"
        strokeWidth="2.5"
        style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      />
    </svg>
  );
}
export default Speedometer;
