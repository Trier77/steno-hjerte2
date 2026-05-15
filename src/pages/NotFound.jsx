import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useFadeIn } from "../hooks/useFadeIn";
import { useFadeNavigate } from "../hooks/useFadeNavigate";
import translations from "../translations";

const COLORS = {
  sys: "#e5e9ed",
  ok: "#4cff91",
  warn: "#ffd94a",
  err: "#ff4444",
  fin: "#ffffff",
};

const GLITCH_CHARS = "!@#$%^&*<>?/\\|[]{}~0123456789ABCDEF";
const LINE_DELAY = 300;

function randomGlitch(str) {
  return str
    .split("")
    .map((c) =>
      c === " "
        ? " "
        : Math.random() < 0.55
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : c,
    )
    .join("");
}

/* ── Log line component ─────────────────────────────────────────────── */
function LogLine({ line, glitching }) {
  const color = COLORS[line.type];
  const text = glitching ? randomGlitch(line.text) : line.text;
  const isFin = line.type === "fin";
  const isErr = line.type === "err";

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      style={{
        fontFamily: "monospace",
        fontSize: isFin ? "1.5rem" : isErr ? "1.1rem" : "1rem",
        fontWeight: isFin ? 700 : isErr ? 700 : 400,
        color,
        lineHeight: 1.6,
        marginTop: isFin ? "1.5rem" : "0",
        letterSpacing: isFin ? "0.01em" : "0",
        textShadow: isErr
          ? `0 0 18px ${color}99`
          : isFin
            ? "0 0 24px #ffffff66"
            : "none",
      }}
    >
      {text}
    </motion.p>
  );
}

function Cursor() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "10px",
        height: "1rem",
        background: "#e5e9ed",
        marginLeft: "2px",
        verticalAlign: "middle",
        animation: "blink404 1s step-end infinite",
      }}
    />
  );
}

/* ── Main ───────────────────────────────────────────────────────────── */
export default function NotFound() {
  const { language } = useLanguage();
  const t = translations[language]?.notFound ?? translations.da.notFound;
  const fadeVisible = useFadeIn();
  const { fadeNavigate, fading } = useFadeNavigate();

  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  /* glitch modes: null | "tap" (light) | "button" (heavy) */
  const [glitchMode, setGlitchMode] = useState(null);
  const glitchRef = useRef(null);
  const timerRef = useRef(null);
  const bottomRef = useRef(null);

  const triggerGlitch = useCallback((mode) => {
    if (glitchRef.current) return;
    setGlitchMode(mode);
    const duration = mode === "button" ? 600 : 350;
    glitchRef.current = setTimeout(() => {
      setGlitchMode(null);
      glitchRef.current = null;
    }, duration);
  }, []);

  const restart = useCallback(() => {
    setShown(0);
    setDone(false);
    setGlitchMode(null);
    clearTimeout(glitchRef.current);
    glitchRef.current = null;
  }, []);

  /* reset when language switches */
  useEffect(() => {
    restart();
  }, [language, restart]);

  /* advance log lines */
  useEffect(() => {
    if (shown < t.log.length) {
      timerRef.current = setTimeout(() => setShown((n) => n + 1), LINE_DELAY);
    } else {
      setDone(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [shown, t.log.length]);

  /* scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [shown]);

  function handleScreenTap() {
    triggerGlitch("tap");
  }
  function handleButtonPress(e) {
    e.stopPropagation();
    triggerGlitch("button");
    fadeNavigate("/");
  }

  const isGlitching = glitchMode !== null;
  const isHeavy = glitchMode === "button";

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      clearTimeout(glitchRef.current);
    },
    [],
  );

  return (
    <>
      {/* ── Full-screen glitch overlay ── */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            key={glitchMode + Date.now()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isHeavy
                  ? "rgba(255,0,0,0.07)"
                  : "rgba(255,0,0,0.03)",
                transform: `translateX(${isHeavy ? 6 : 3}px)`,
                mixBlendMode: "screen",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isHeavy
                  ? "rgba(0,255,255,0.07)"
                  : "rgba(0,255,255,0.03)",
                transform: `translateX(${isHeavy ? -6 : -3}px)`,
                mixBlendMode: "screen",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
                animation: "scanMove 0.1s linear infinite",
              }}
            />
            {isHeavy && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.06)",
                  animation: "flashPulse 0.15s ease-out",
                }}
              />
            )}
            {Array.from({ length: isHeavy ? 5 : 2 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${10 + i * (isHeavy ? 18 : 35)}%`,
                  height: `${isHeavy ? 3 + i : 2}px`,
                  background:
                    i % 2 === 0
                      ? "rgba(255,68,68,0.35)"
                      : "rgba(0,255,145,0.25)",
                  transform: `translateX(${(i % 2 === 0 ? 1 : -1) * (isHeavy ? 12 + i * 4 : 6)}px)`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page ── */}
      <motion.div
        className={`page-fade-in ${fadeVisible ? "visible" : ""}`}
        onClick={handleScreenTap}
        animate={
          isGlitching
            ? {
                x: isHeavy ? [0, -8, 6, -4, 0] : [0, -3, 2, 0],
                filter: isHeavy
                  ? [
                      "brightness(1)",
                      "brightness(1.4)",
                      "brightness(0.8)",
                      "brightness(1)",
                    ]
                  : ["brightness(1)", "brightness(1.15)", "brightness(1)"],
              }
            : { x: 0, filter: "brightness(1)" }
        }
        transition={{ duration: isHeavy ? 0.35 : 0.2, ease: "easeOut" }}
        style={{
          minHeight: "100svh",
          background: "#000000",
          padding: "3.5rem 3rem",
          userSelect: "none",
          cursor: "default",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              color: "#555",
              letterSpacing: "0.15em",
              marginBottom: "0.5rem",
            }}
          >
            DET OVERSETE HJERTE — SYSTEM
          </p>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "5.5rem",
              fontWeight: 700,
              color: "#ff4444",
              lineHeight: 1,
              textShadow: isHeavy
                ? "0 0 60px #ff4444, 6px 0 0 #00ffff, -6px 0 0 #ff0000"
                : "0 0 40px #ff444466",
              transition: "text-shadow 0.1s",
            }}
          >
            404
          </p>
        </motion.div>

        {/* log lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {t.log.slice(0, shown).map((line, i) => (
            <LogLine
              key={`${language}-${i}`}
              line={line}
              glitching={isGlitching}
            />
          ))}

          <AnimatePresence>
            {isGlitching && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  color: "#ffd94a",
                  marginTop: "4px",
                  letterSpacing: "0.08em",
                }}
              >
                {t.interference}
              </motion.p>
            )}
          </AnimatePresence>

          {!done && (
            <div style={{ marginTop: "4px" }}>
              <Cursor />
            </div>
          )}
          <div ref={bottomRef} />
        </motion.div>

        {/* tap hint while log runs — absolute so it doesn't affect layout */}
        <AnimatePresence>
          {!done && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2 }}
              style={{
                position: "absolute",
                bottom: "3.5rem",
                left: "3rem",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                color: "#e5e9ed",
                pointerEvents: "none",
              }}
            >
              {t.tapHint}
            </motion.p>
          )}
        </AnimatePresence>

        {/* home button */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: "2.5rem" }}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={handleButtonPress}
                style={{
                  width: "100%",
                  padding: "22px 32px",
                  border: "1.5px solid #4cff91",
                  borderRadius: "6px",
                  background: "rgba(76,255,145,0.06)",
                  fontFamily: "monospace",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#4cff91",
                  cursor: "pointer",
                  display: "block",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 20px #4cff9188",
                  boxShadow: "0 0 30px #4cff9133, inset 0 0 30px #4cff9111",
                  animation: "pulseGlowGreen 2s ease-in-out infinite",
                }}
              >
                {t.homeBtn}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* fade to black overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 998,
            background: "#000",
            opacity: fading ? 1 : 0,
            transition: "opacity 0.7s ease",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      <style>{`
        @keyframes blink404 {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes scanMove {
          from { background-position-y: 0px; }
          to   { background-position-y: 4px; }
        }
        @keyframes flashPulse {
          0%   { opacity: 0.12; }
          100% { opacity: 0; }
        }
        @keyframes pulseGlowGreen {
          0%, 100% { box-shadow: 0 0 30px #4cff9133, inset 0 0 30px #4cff9111; }
          50%       { box-shadow: 0 0 55px #4cff9166, inset 0 0 40px #4cff9122; }
        }
      `}</style>
    </>
  );
}
