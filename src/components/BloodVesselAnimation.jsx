import { useEffect, useRef } from "react";

/**
 * BloodVesselAnimation
 * Pass activeIndex (1–4) from the Hormoner slider.
 * {showIllustration && <BloodVesselAnimation activeIndex={activeIndex} />}
 */

const WALL_COLOR = "#C8506A";
const CELL_COLOR = "#E8304A";
const PLAQUE_FILL = "#C8902A";
const PLAQUE_EDGE = "#7A5010";
const LUMEN_FRAC = 0.58;
const CELL_R = 6;
const CELL_GAP = 32;
const BASE_SPEED = 1.1;
const N_EDGE = 140;
const WALL_STROKE = 7;
const MAX_ROWS = 5;

const STAGES = [
  { speed: 1.1, elasticity: 1.0, plaques: [] },
  {
    speed: 1.1,
    elasticity: 0.6,
    plaques: [
      { pos: 0.25, size: 0.14, top: true },
      { pos: 0.72, size: 0.12, top: false },
    ],
  },
  {
    speed: 0.65,
    elasticity: 0.25,
    plaques: [
      // carried over from stage 1, slightly grown
      { pos: 0.25, size: 0.17, top: true },
      { pos: 0.72, size: 0.15, top: false },
      // new in stage 2
      { pos: 0.42, size: 0.16, top: false },
      { pos: 0.88, size: 0.13, top: true },
    ],
  },
  {
    speed: 0.4,
    elasticity: 0.0,
    plaques: [
      // carried over from stage 2, grown further
      { pos: 0.25, size: 0.2, top: true },
      { pos: 0.72, size: 0.19, top: false },
      { pos: 0.42, size: 0.2, top: false },
      { pos: 0.88, size: 0.17, top: true },
      // new in stage 3
      { pos: 0.08, size: 0.18, top: false },
      { pos: 0.55, size: 0.19, top: true },
      { pos: 0.95, size: 0.16, top: false },
    ],
  },
];

const ROW_VARIANCE = Array.from(
  { length: MAX_ROWS },
  (_, r) => 0.8 + Math.sin(r * 2.7) * 0.22,
);

// Build initial cell x positions — enough cells to always cover canvas + margins
function initCells(W) {
  const count = Math.ceil((W + CELL_GAP * 4) / CELL_GAP) + 2;
  return Array.from({ length: MAX_ROWS }, (_, row) => {
    const shift = row % 2 === 0 ? 0 : CELL_GAP / 2;
    return Array.from(
      { length: count },
      (_, c) => -CELL_GAP * 2 + shift + c * CELL_GAP,
    );
  });
}

function indentAt(fx, H, plaques, side) {
  let total = 0;
  plaques.forEach((p) => {
    if ((p.top && side === "top") || (!p.top && side === "bot")) {
      const dist = Math.abs(fx - p.pos);
      const reach = p.size * 0.72;
      if (dist < reach) {
        total += Math.pow(1 - dist / reach, 2) * p.size * H * 0.72;
      }
    }
  });
  return total;
}

function edgeY(fx, H, plaques, side, t, elasticity) {
  const cy = H / 2;
  const lh = (H * LUMEN_FRAC) / 2;
  const base = side === "top" ? cy - lh : cy + lh;
  const ph = side === "top" ? 0 : 1.7;
  const wave =
    (Math.sin(fx * Math.PI * 3.2 + t * 0.5 + ph) * 1.4 +
      Math.sin(fx * Math.PI * 6.8 - t * 0.85 + ph) * 0.45) *
    elasticity;
  const dir = side === "top" ? 1 : -1;
  return base + wave + dir * indentAt(fx, H, plaques, side);
}

function baseEdgeY(fx, H, side, t, elasticity) {
  const cy = H / 2;
  const lh = (H * LUMEN_FRAC) / 2;
  const base = side === "top" ? cy - lh : cy + lh;
  const ph = side === "top" ? 0 : 1.7;
  return (
    base +
    (Math.sin(fx * Math.PI * 3.2 + t * 0.5 + ph) * 1.4 +
      Math.sin(fx * Math.PI * 6.8 - t * 0.85 + ph) * 0.45) *
      elasticity
  );
}

// Very aggressive range: open water = 1.0, peak choke ≈ 0.03
function speedAt(fx, H, plaques) {
  const choke = Math.min(
    0.97,
    (indentAt(fx, H, plaques, "top") + indentAt(fx, H, plaques, "bot")) /
      (H * LUMEN_FRAC),
  );
  return Math.max(0.03, 1.0 - Math.pow(choke, 0.5) * 0.97);
}

function drawWalls(ctx, W, H, plaques, elasticity, t) {
  ["top", "bot"].forEach((side) => {
    const ce = side === "top" ? 0 : H;
    ctx.beginPath();
    ctx.moveTo(0, ce);
    ctx.lineTo(W, ce);
    if (side === "top") {
      for (let i = N_EDGE; i >= 0; i--) {
        const fx = i / N_EDGE;
        ctx.lineTo(fx * W, edgeY(fx, H, plaques, side, t, elasticity));
      }
    } else {
      for (let i = 0; i <= N_EDGE; i++) {
        const fx = i / N_EDGE;
        ctx.lineTo(fx * W, edgeY(fx, H, plaques, side, t, elasticity));
      }
    }
    ctx.closePath();
    ctx.fillStyle = WALL_COLOR;
    ctx.globalAlpha = 0.55;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    for (let i = 0; i <= N_EDGE; i++) {
      const fx = i / N_EDGE;
      const y = edgeY(fx, H, plaques, side, t, elasticity);
      i === 0 ? ctx.moveTo(fx * W, y) : ctx.lineTo(fx * W, y);
    }
    ctx.strokeStyle = WALL_COLOR;
    ctx.lineWidth = WALL_STROKE;
    ctx.globalAlpha = 0.95;
    ctx.stroke();
    ctx.globalAlpha = 1;
  });
}

function drawPlaques(ctx, W, H, plaques, elasticity, t) {
  const steps = 60;
  plaques.forEach((p) => {
    const cx = p.pos * W;
    const half = p.size * W * 0.52;
    const side = p.top ? "top" : "bot";
    const x0 = cx - half;
    const x1 = cx + half;

    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const fx = (x0 + (i / steps) * (x1 - x0)) / W;
      if (fx < 0 || fx > 1) continue;
      const y = baseEdgeY(fx, H, side, t, elasticity);
      i === 0 ? ctx.moveTo(fx * W, y) : ctx.lineTo(fx * W, y);
    }
    for (let i = steps; i >= 0; i--) {
      const fx = (x0 + (i / steps) * (x1 - x0)) / W;
      if (fx < 0 || fx > 1) continue;
      ctx.lineTo(fx * W, edgeY(fx, H, plaques, side, t, elasticity));
    }
    ctx.closePath();
    ctx.fillStyle = PLAQUE_FILL;
    ctx.globalAlpha = 0.92;
    ctx.fill();
    ctx.strokeStyle = PLAQUE_EDGE;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.55;
    ctx.stroke();
    ctx.globalAlpha = 1;
  });
}

function drawCells(ctx, W, H, plaques, elasticity, baseSpeed, cellsRef, t) {
  const cy = H / 2;
  const lh = (H * LUMEN_FRAC) / 2;
  const flatTop = cy - lh;
  const flatBot = cy + lh;
  const N = 80;

  // Clip to deformed lumen shape
  const topPts = [];
  const botPts = [];
  for (let i = 0; i <= N; i++) {
    const fx = i / N;
    topPts.push({ x: fx * W, y: edgeY(fx, H, plaques, "top", t, elasticity) });
    botPts.push({ x: fx * W, y: edgeY(fx, H, plaques, "bot", t, elasticity) });
  }
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(topPts[0].x, topPts[0].y);
  topPts.forEach((p) => ctx.lineTo(p.x, p.y));
  for (let i = botPts.length - 1; i >= 0; i--)
    ctx.lineTo(botPts[i].x, botPts[i].y);
  ctx.closePath();
  ctx.clip();

  // Blood channel background — distinct from cell color so cells are readable
  ctx.fillStyle = "#4A0A14";
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;

  ctx.fillStyle = CELL_COLOR;
  ctx.globalAlpha = 0.18;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;

  const rows = Math.max(1, Math.floor((flatBot - flatTop) / (CELL_R * 2 + 6)));
  const rowH = (flatBot - flatTop) / rows;

  for (let row = 0; row < rows; row++) {
    const rowCY = flatTop + rowH * (row + 0.5);
    const xs = cellsRef.current[row];

    for (let i = 0; i < xs.length; i++) {
      // Each cell advances by its own local speed this frame
      const fx = Math.max(0, Math.min(1, xs[i] / W));
      xs[i] += baseSpeed * ROW_VARIANCE[row] * speedAt(fx, H, plaques);

      // When a cell exits the right edge, send it back behind the leftmost cell
      if (xs[i] > W + CELL_GAP) {
        let minX = xs[0];
        for (let j = 1; j < xs.length; j++) if (xs[j] < minX) minX = xs[j];
        xs[i] = minX - CELL_GAP;
      }

      const x = xs[i];
      if (x < -CELL_R || x > W + CELL_R) continue;

      const xfx = Math.max(0, Math.min(1, x / W));
      const topY = edgeY(xfx, H, plaques, "top", t, elasticity);
      const botY = edgeY(xfx, H, plaques, "bot", t, elasticity);
      const localCY = (topY + botY) / 2;
      const sq = Math.max(0, 1 - (botY - topY) / (H * LUMEN_FRAC));
      const yCY = rowCY + (localCY - rowCY) * sq * 0.75;
      const drift = Math.sin(t * 0.55 + x * 0.07 + row * 1.4) * CELL_R * 0.16;

      ctx.beginPath();
      ctx.ellipse(x, yCY + drift, CELL_R, CELL_R * 0.62, 0, 0, Math.PI * 2);
      ctx.fillStyle = CELL_COLOR;
      ctx.globalAlpha = 0.95;
      ctx.fill();
      ctx.strokeStyle = WALL_COLOR;
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.18;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.ellipse(
        x - CELL_R * 0.28,
        yCY + drift - CELL_R * 0.18,
        CELL_R * 0.2,
        CELL_R * 0.14,
        -0.4,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.28;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();
}

function drawFrame(
  ctx,
  W,
  H,
  plaques,
  elasticity,
  baseSpeed,
  cellsRef,
  frameRef,
) {
  const t = frameRef.current * 0.016;
  ctx.clearRect(0, 0, W, H);

  // Dark solid background for the whole canvas — gives contrast to walls and cells
  ctx.fillStyle = "#7B1525";
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;

  drawWalls(ctx, W, H, plaques, elasticity, t);
  drawPlaques(ctx, W, H, plaques, elasticity, t);
  drawCells(ctx, W, H, plaques, elasticity, baseSpeed, cellsRef, t);
}

// Linearly interpolate between two numbers
function lerp(a, b, p) {
  return a + (b - a) * p;
}

// Ease in-out for a smoother feel
function ease(p) {
  return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
}

// Blend two stages together at progress 0→1.
// Plaques are matched by pos+top identity — same plaque just lerps its size.
// New plaques (only in `to`) grow in from 0; removed plaques shrink to 0.
function blendStages(from, to, p) {
  const ep = ease(p);
  const elasticity = lerp(from.elasticity, to.elasticity, ep);
  const speed = lerp(from.speed, to.speed, ep);

  const plaques = [];

  // All plaques in `from` — lerp size toward matching `to` plaque, or shrink to 0
  from.plaques.forEach((fp) => {
    const match = to.plaques.find(
      (tp) => Math.abs(tp.pos - fp.pos) < 0.02 && tp.top === fp.top,
    );
    const targetSize = match ? match.size : 0;
    const size = lerp(fp.size, targetSize, ep);
    if (size > 0.005) plaques.push({ ...fp, size });
  });

  // Plaques only in `to` — grow in from 0
  to.plaques.forEach((tp) => {
    const alreadyIn = from.plaques.some(
      (fp) => Math.abs(fp.pos - tp.pos) < 0.02 && fp.top === tp.top,
    );
    if (!alreadyIn) {
      const size = lerp(0, tp.size, ep);
      if (size > 0.005) plaques.push({ ...tp, size });
    }
  });

  return { elasticity, speed, plaques };
}

export default function BloodVesselAnimation({ activeIndex }) {
  const stageIdx = Math.max(0, Math.min(3, activeIndex - 1));

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const frameRef = useRef(0);
  const cellsRef = useRef(null);

  // Transition state — fromStage, toStage, progress (0→1), startTime
  const transRef = useRef({
    from: stageIdx,
    to: stageIdx,
    progress: 1,
    startTs: null,
  });

  useEffect(() => {
    const tr = transRef.current;
    // Start a new transition from wherever we currently are
    const currentBlended =
      tr.progress < 1
        ? blendStages(STAGES[tr.from], STAGES[tr.to], tr.progress)
        : STAGES[tr.to];

    // Snap a virtual "from" stage using the current blended values
    // so the transition always starts from the current visual state
    tr.from = tr.to;
    tr.to = stageIdx;
    tr.progress = 0;
    tr.startTs = null;
  }, [stageIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = 160;
      cellsRef.current = initCells(canvas.width);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const TRANSITION_MS = 300;

    function loop(ts) {
      frameRef.current += 1;
      if (!cellsRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const tr = transRef.current;

      // Advance transition progress
      if (tr.progress < 1) {
        if (tr.startTs === null) tr.startTs = ts;
        tr.progress = Math.min(1, (ts - tr.startTs) / TRANSITION_MS);
      }

      const stage =
        tr.progress >= 1
          ? STAGES[tr.to]
          : blendStages(STAGES[tr.from], STAGES[tr.to], tr.progress);

      drawFrame(
        ctx,
        canvas.width,
        canvas.height,
        stage.plaques,
        stage.elasticity,
        stage.speed,
        cellsRef,
        frameRef,
      );
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "160px",
        borderRadius: "12px",
        display: "block",
      }}
      aria-label="Animeret tværsnit af blodkar — viser blodflow og åreforkalkning med alderen"
    />
  );
}
