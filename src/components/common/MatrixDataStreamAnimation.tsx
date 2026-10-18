import React, { useEffect, useRef, useState } from 'react';

interface MatrixDataStreamAnimationProps {
  className?: string;
  intensity?: 'ambient' | 'active';
  showColorIndicator?: boolean;
}

export interface MatrixColorPalette {
  name: string;
  headGlow: string;
  bodyMain: string;
  bodyDark: string;
  bodyAccent: string;
  bgWash: string;
}

export const MATRIX_PALETTES: MatrixColorPalette[] = [
  {
    name: 'Cyber Azure & Amber Gold',
    headGlow: '#e0f2fe', // Luminous ice-white cyan
    bodyMain: '#38bdf8', // Luminous sky blue
    bodyDark: '#0284c7', // Deep ocean blue
    bodyAccent: '#fbbf24', // Warm golden amber
    bgWash: 'rgba(26, 18, 12, 0.16)',
  },
  {
    name: 'Matrix Emerald & Neon Mint',
    headGlow: '#ecfdf5', // Bright luminous white-mint
    bodyMain: '#10b981', // Neon emerald
    bodyDark: '#047857', // Deep forest
    bodyAccent: '#84cc16', // Electric lime
    bgWash: 'rgba(12, 24, 16, 0.16)',
  },
  {
    name: 'Neon Cyberpunk Violet & Pink',
    headGlow: '#faf5ff', // Luminous lilac white
    bodyMain: '#c084fc', // Vibrant electric purple
    bodyDark: '#7e22ce', // Deep violet
    bodyAccent: '#38bdf8', // Electric blue accent
    bgWash: 'rgba(24, 12, 30, 0.16)',
  },
  {
    name: 'Sunset Coral & Solar Bronze',
    headGlow: '#fff1f2', // Soft coral glow
    bodyMain: '#fb7185', // Radiant rose coral
    bodyDark: '#e11d48', // Deep crimson
    bodyAccent: '#f59e0b', // Solar gold
    bgWash: 'rgba(28, 14, 18, 0.16)',
  },
  {
    name: 'Electric Turquoise & Lime',
    headGlow: '#f0fdfa', // Bright turquoise glow
    bodyMain: '#2dd4bf', // Luminous cyan teal
    bodyDark: '#0f766e', // Deep sea teal
    bodyAccent: '#a3e635', // Electric neon lime
    bgWash: 'rgba(12, 26, 24, 0.16)',
  },
  {
    name: 'Golden Matrix & Flame Gold',
    headGlow: '#fefce8', // Bright gold-white
    bodyMain: '#facc15', // Luminous gold
    bodyDark: '#ca8a04', // Deep amber bronze
    bodyAccent: '#f97316', // Fiery orange
    bgWash: 'rgba(28, 20, 10, 0.16)',
  },
];

export const MatrixDataStreamAnimation: React.FC<MatrixDataStreamAnimationProps> = ({
  className = 'pointer-events-none absolute inset-0 z-0',
  intensity = 'active',
  showColorIndicator = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [cycleSecondsLeft, setCycleSecondsLeft] = useState(30);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const getParentDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? Math.max(parent.clientHeight, 350) : 650;
      return { w, h };
    };

    let { w: width, h: height } = getParentDimensions();
    canvas.width = width;
    canvas.height = height;

    // SEO glyphs, metrics, currencies, and binary symbols
    const charList = [
      '0', '1', 'AI', 'SEO', 'VOL', 'KD%', 'CPC', 'SERP', 'RANK', 'EEAT', 'GEO',
      '8', '4', 'X', 'Z', '9', '7', 'Q',
      '日', '本', '語', 'タ', 'グ', 'デ', 'ー', 'タ',
      '#', '$', '£', '€', '₹', '¥', '%', '&', '*',
    ];

    const fontSize = 13;
    let columns = Math.max(10, Math.floor(width / fontSize));
    let drops: number[] = [];
    let speeds: number[] = [];

    const initColumns = () => {
      columns = Math.max(10, Math.floor(width / fontSize));
      drops = [];
      speeds = [];
      const rowsTotal = Math.max(20, Math.floor(height / fontSize));

      for (let i = 0; i < columns; i++) {
        // Distribute drops vertically across the entire canvas height right at startup!
        // This guarantees animation is INSTANTLY visible on frame 1, never empty.
        drops[i] = Math.floor(Math.random() * rowsTotal);

        // Relaxed, smooth, hypnotic downward flow (~0.20 - 0.32 rows per frame)
        // Satisfies user requirement: "make it littel bit slow with the different colours"
        speeds[i] = (Math.random() * 0.14 + 0.18) * (intensity === 'ambient' ? 0.85 : 1.1);
      }
    };

    initColumns();

    // Initial background fill
    ctx.fillStyle = '#17100b';
    ctx.fillRect(0, 0, width, height);

    const handleResize = () => {
      if (!canvas) return;
      const dims = getParentDimensions();
      width = canvas.width = dims.w;
      height = canvas.height = dims.h;
      initColumns();
      ctx.fillStyle = '#17100b';
      ctx.fillRect(0, 0, width, height);
    };

    window.addEventListener('resize', handleResize);

    // 30-Second color cycle tracker
    const CYCLE_DURATION_MS = 30000;
    const startTime = Date.now();
    let lastRenderTime = 0;
    const TARGET_FRAME_MS = 33; // 30 FPS for buttery smooth performance without GPU throttling

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      // Skip render if tab is hidden to save battery
      if (document.hidden) return;

      const now = Date.now();
      if (now - lastRenderTime < TARGET_FRAME_MS) return;
      lastRenderTime = now;

      const elapsed = now - startTime;
      const activeIdx = Math.floor((elapsed / CYCLE_DURATION_MS) % MATRIX_PALETTES.length);
      const currentPalette = MATRIX_PALETTES[activeIdx];

      // Trailing matrix background wash creates phosphorescent trailing rain
      ctx.fillStyle = currentPalette.bgWash;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `600 ${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < columns; i++) {
        // Skip some columns in ambient mode for subtle texture
        if (i % 2 !== 0 && intensity === 'ambient') continue;

        const char = charList[Math.floor(Math.random() * charList.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y > -20 && y < height + 60) {
          // 1. Luminous Head Character
          ctx.fillStyle = currentPalette.headGlow;
          ctx.fillText(char, x, y);

          // 2. Trailing Character #1 (Bright Body)
          const char1 = charList[(i + Math.floor(now / 150)) % charList.length];
          ctx.fillStyle = currentPalette.bodyMain;
          ctx.fillText(char1, x, y - fontSize);

          // 3. Trailing Character #2 (Medium Body)
          const char2 = charList[(i * 3 + Math.floor(now / 220)) % charList.length];
          ctx.fillStyle = currentPalette.bodyDark;
          ctx.fillText(char2, x, y - fontSize * 2);

          // 4. Trailing Character #3 (Accent Glint)
          if (Math.random() > 0.45) {
            const char3 = charList[(i * 5 + Math.floor(now / 310)) % charList.length];
            ctx.fillStyle = currentPalette.bodyAccent;
            ctx.fillText(char3, x, y - fontSize * 3);
          }
        }

        // Advance drop smoothly downward
        drops[i] += speeds[i];

        // Reset drop smoothly when passing bottom
        if (y > height) {
          // Slight randomized delay so columns reset organically
          drops[i] = -Math.floor(Math.random() * 8);
        }
      }
    };

    render();

    // Secondary UI timer to update component state for indicator if needed
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const idx = Math.floor((elapsed / CYCLE_DURATION_MS) % MATRIX_PALETTES.length);
      setPaletteIndex(idx);
      setCycleSecondsLeft(Math.max(1, Math.ceil(30 - ((elapsed % CYCLE_DURATION_MS) / 1000))));
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [intensity]);

  const activePalette = MATRIX_PALETTES[paletteIndex];

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`${className} transition-opacity duration-700`}
        aria-hidden="true"
      />
      {showColorIndicator && (
        <div className="absolute top-3 right-4 z-20 hidden md:flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md px-3.5 py-1.5 border border-white/15 text-[11px] font-mono text-neutral-200 shadow-xl">
          <span
            className="h-2.5 w-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: activePalette.bodyMain }}
          />
          <span className="font-semibold text-white">{activePalette.name}</span>
          <span className="text-neutral-400">({cycleSecondsLeft}s)</span>
        </div>
      )}
    </>
  );
};
