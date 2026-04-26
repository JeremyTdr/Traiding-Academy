import { useEffect, useRef } from "react";

const PAD_CANDLE = { top: 20, right: 60, bottom: 8, left: 10 };
const PAD_RSI    = { top: 8,  right: 60, bottom: 24, left: 10 };
const RSI_H      = 80; // hauteur du panneau RSI en px

function calcRSI(candles, period = 14) {
  const rsi = Array(candles.length).fill(null);
  if (candles.length < period + 1) return rsi;

  let avgGain = 0, avgLoss = 0;
  for (let i = 1; i <= period; i++) {
    const diff = candles[i].close - candles[i - 1].close;
    if (diff >= 0) avgGain += diff; else avgLoss += Math.abs(diff);
  }
  avgGain /= period;
  avgLoss /= period;

  for (let i = period; i < candles.length; i++) {
    if (i === period) {
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      rsi[i] = 100 - 100 / (1 + rs);
    } else {
      const diff = candles[i].close - candles[i - 1].close;
      const gain = diff >= 0 ? diff : 0;
      const loss = diff < 0 ? Math.abs(diff) : 0;
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
      const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
      rsi[i] = 100 - 100 / (1 + rs);
    }
  }
  return rsi;
}

function calcMM(candles, period) {
  return candles.map((_, i) => {
    if (i < period - 1) return null;
    const slice = candles.slice(i - period + 1, i + 1);
    return slice.reduce((sum, c) => sum + c.close, 0) / period;
  });
}

export default function CandleChart({ candles, currentPrice, width, height, positions = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!candles?.length || !canvasRef.current || width <= 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const totalH = height + RSI_H;

    canvas.width  = width * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width  = `${width}px`;
    canvas.style.height = `${totalH}px`;
    ctx.scale(dpr, dpr);

    // ── Zones ───────────────────────────────────────────
    const CW = width - PAD_CANDLE.left - PAD_CANDLE.right;
    const CH = height - PAD_CANDLE.top - PAD_CANDLE.bottom;
    const RW = width - PAD_RSI.left - PAD_RSI.right;
    const RH = RSI_H - PAD_RSI.top - PAD_RSI.bottom;
    const rsiOffsetY = height;

    const nb = candles.length;
    const CANDLE_GAP = Math.max(1, Math.floor((CW / nb) * 0.25));
    const CANDLE_W   = Math.floor((CW - CANDLE_GAP * (nb - 1)) / nb);

    const prices = candles.flatMap(c => [c.high, c.low]);
    if (currentPrice) prices.push(currentPrice);
    // Ajouter SL/TP dans le range de prix
    positions.forEach(p => {
      if (p.sl) prices.push(p.prixEntree * (1 - p.sl / 100));
      if (p.tp) prices.push(p.prixEntree * (1 + p.tp / 100));
    });
    const minP = Math.min(...prices) * 0.999;
    const maxP = Math.max(...prices) * 1.001;
    const range = maxP - minP || 1;

    function toYC(p) { return PAD_CANDLE.top + CH - ((p - minP) / range) * CH; }
    function toX(i)  { return PAD_CANDLE.left + i * (CANDLE_W + CANDLE_GAP) + CANDLE_W / 2 + CANDLE_GAP / 2; }
    function toYR(v) { return rsiOffsetY + PAD_RSI.top + RH - (v / 100) * RH; }

    // Fond
    ctx.fillStyle = "#060b14";
    ctx.fillRect(0, 0, width, totalH);

    // Séparateur RSI
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, rsiOffsetY);
    ctx.lineTo(width, rsiOffsetY);
    ctx.stroke();

    // ── Grille candles ───────────────────────────────────
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = PAD_CANDLE.top + (i / 5) * CH;
      ctx.beginPath(); ctx.moveTo(PAD_CANDLE.left, y); ctx.lineTo(width - PAD_CANDLE.right, y); ctx.stroke();
      const price = maxP - (i / 5) * range;
      ctx.fillStyle = "#445566";
      ctx.font = "10px IBM Plex Mono, monospace";
      ctx.textAlign = "left";
      ctx.fillText(price.toFixed(2), width - PAD_CANDLE.right + 4, y + 3);
    }

    // ── Moyennes mobiles ─────────────────────────────────
    const mm7  = calcMM(candles, 7);
    const mm20 = calcMM(candles, 20);

    function drawMM(values, color) {
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 1.2; ctx.setLineDash([]);
      let started = false;
      values.forEach((v, i) => {
        if (v === null) return;
        const x = toX(i), y = toYC(v);
        if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
    drawMM(mm7,  "rgba(255,200,40,0.75)");
    drawMM(mm20, "rgba(120,160,255,0.75)");

    // Légende MM
    ctx.font = "bold 11px IBM Plex Mono, monospace";
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,200,40,0.9)";
    ctx.fillText("─ MM7",  PAD_CANDLE.left + 4, PAD_CANDLE.top + 14);
    ctx.fillStyle = "rgba(120,160,255,0.9)";
    ctx.fillText("─ MM20", PAD_CANDLE.left + 4, PAD_CANDLE.top + 28);

    // ── Bougies ──────────────────────────────────────────
    candles.forEach((c, i) => {
      const x = toX(i);
      const yOpen = toYC(c.open), yClose = toYC(c.close);
      const yHigh = toYC(c.high), yLow = toYC(c.low);
      const isBull = c.close >= c.open;
      const color  = isBull ? "#00c076" : "#ff4d4d";
      const half   = CANDLE_W / 2;

      ctx.strokeStyle = color; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x, yHigh); ctx.lineTo(x, Math.min(yOpen, yClose)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, yLow);  ctx.lineTo(x, Math.max(yOpen, yClose)); ctx.stroke();

      const bodyTop = Math.min(yOpen, yClose);
      const bodyH   = Math.max(Math.abs(yClose - yOpen), 1);
      ctx.fillStyle = isBull ? "rgba(0,192,118,0.85)" : "rgba(255,77,77,0.85)";
      ctx.fillRect(x - half, bodyTop, CANDLE_W, bodyH);
    });

    // ── SL / TP des positions ouvertes ───────────────────
    positions.forEach(p => {
      if (p.sl) {
        const slPrice = p.prixEntree * (1 - p.sl / 100);
        const y = toYC(slPrice);
        ctx.setLineDash([3, 3]); ctx.strokeStyle = "rgba(255,77,77,0.6)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(PAD_CANDLE.left, y); ctx.lineTo(width - PAD_CANDLE.right, y); ctx.stroke();
        ctx.fillStyle = "rgba(255,77,77,0.8)";
        ctx.font = "9px IBM Plex Mono, monospace"; ctx.textAlign = "left";
        ctx.fillText(`SL ${slPrice.toFixed(2)}`, width - PAD_CANDLE.right + 4, y - 2);
      }
      if (p.tp) {
        const tpPrice = p.prixEntree * (1 + p.tp / 100);
        const y = toYC(tpPrice);
        ctx.setLineDash([3, 3]); ctx.strokeStyle = "rgba(0,192,118,0.6)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(PAD_CANDLE.left, y); ctx.lineTo(width - PAD_CANDLE.right, y); ctx.stroke();
        ctx.fillStyle = "rgba(0,192,118,0.8)";
        ctx.font = "9px IBM Plex Mono, monospace"; ctx.textAlign = "left";
        ctx.fillText(`TP ${tpPrice.toFixed(2)}`, width - PAD_CANDLE.right + 4, y - 2);
      }
      ctx.setLineDash([]);
    });

    // ── Ligne prix courant ────────────────────────────────
    if (currentPrice) {
      const y = toYC(currentPrice);
      const isBull = currentPrice >= (candles.at(-1)?.open ?? currentPrice);
      const lineColor = isBull ? "#00c076" : "#ff4d4d";
      ctx.setLineDash([4, 4]); ctx.strokeStyle = lineColor; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD_CANDLE.left, y); ctx.lineTo(width - PAD_CANDLE.right, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = lineColor;
      ctx.fillRect(width - PAD_CANDLE.right, y - 9, PAD_CANDLE.right - 2, 18);
      ctx.fillStyle = "#000"; ctx.font = "bold 10px IBM Plex Mono, monospace"; ctx.textAlign = "center";
      ctx.fillText(currentPrice.toFixed(2), width - PAD_CANDLE.right / 2 - 1, y + 4);
    }

    // ── Axe X — dates ─────────────────────────────────────
    ctx.fillStyle = "#445566"; ctx.font = "9px IBM Plex Mono, monospace"; ctx.textAlign = "center";
    const step = Math.max(1, Math.floor(nb / 6));
    const lastIdx = nb - 1;
    candles.forEach((c, i) => {
      if ((i % step === 0 || i === lastIdx) && c.date) {
        ctx.fillText(c.date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }), toX(i), height - 2);
      }
    });

    // ── RSI ───────────────────────────────────────────────
    const rsiValues = calcRSI(candles);

    // Zones RSI colorées
    ctx.fillStyle = "rgba(255,77,77,0.06)";
    ctx.fillRect(PAD_RSI.left, toYR(100), RW, toYR(70) - toYR(100));
    ctx.fillStyle = "rgba(0,192,118,0.06)";
    ctx.fillRect(PAD_RSI.left, toYR(30), RW, toYR(0) - toYR(30));

    // Lignes 70 / 50 / 30
    [[70, "rgba(255,77,77,0.4)"], [50, "rgba(255,255,255,0.08)"], [30, "rgba(0,192,118,0.4)"]].forEach(([val, col]) => {
      ctx.setLineDash(val === 50 ? [] : [3, 3]);
      ctx.strokeStyle = col; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD_RSI.left, toYR(val)); ctx.lineTo(width - PAD_RSI.right, toYR(val)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = val === 70 ? "#ff4d4d" : val === 30 ? "#00c076" : "#445566";
      ctx.font = "9px IBM Plex Mono, monospace"; ctx.textAlign = "left";
      ctx.fillText(val, width - PAD_RSI.right + 4, toYR(val) + 3);
    });

    // Courbe RSI
    ctx.beginPath(); ctx.lineWidth = 1.5; let rsiStarted = false;
    rsiValues.forEach((v, i) => {
      if (v === null) return;
      const x = toX(i), y = toYR(v);
      const color = v > 70 ? "#ff4d4d" : v < 30 ? "#00c076" : "#00d4aa";
      if (!rsiStarted) { ctx.strokeStyle = color; ctx.moveTo(x, y); rsiStarted = true; }
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#00d4aa"; ctx.stroke();

    // Label RSI
    ctx.fillStyle = "#00d4aa"; ctx.font = "bold 9px IBM Plex Mono, monospace"; ctx.textAlign = "left";
    ctx.fillText("RSI(14)", PAD_RSI.left + 4, rsiOffsetY + PAD_RSI.top + 10);
    const lastRsi = rsiValues.filter(v => v !== null).at(-1);
    if (lastRsi !== undefined) {
      const rsiColor = lastRsi > 70 ? "#ff4d4d" : lastRsi < 30 ? "#00c076" : "#00d4aa";
      ctx.fillStyle = rsiColor;
      ctx.fillText(lastRsi.toFixed(1), PAD_RSI.left + 58, rsiOffsetY + PAD_RSI.top + 10);
    }

  }, [candles, currentPrice, width, height, positions]);

  return (
    <canvas ref={canvasRef} style={{ display: "block", borderRadius: "6px 6px 0 0" }} />
  );
}
