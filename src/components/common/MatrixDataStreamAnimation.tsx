import React, { useEffect, useRef } from 'react';

interface MatrixDataStreamAnimationProps {
  className?: string;
  intensity?: 'ambient' | 'active';
}

export const MatrixDataStreamAnimation: React.FC<MatrixDataStreamAnimationProps> = ({
  className = 'pointer-events-none absolute inset-0 z-0',
  intensity = 'ambient',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initColumns();
    };

    window.addEventListener('resize', handleResize);

    // Characters for the Matrix stream: SEO terms, hex, binary, and Matrix katakana glyphs
    const charList = [
      '0', '1', 'AI', 'SEO', 'ROI', 'SERP', 'CTR', 'KW', 'EEAT',
      '8', '4', 'X', 'Z', '9', '7', 'Q',
      '日', '本', '語', 'タ', 'グ', 'デ', 'ー', 'タ',
      '#', '$', '£', '€', '%', '&', '*',
    ];

    const fontSize = 13;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];
    let speeds: number[] = [];

    const initColumns = () => {
      columns = Math.floor(width / fontSize);
      drops = [];
      speeds = [];
      for (let i = 0; i < columns; i++) {
        // Stagger drops randomly
        drops[i] = Math.floor(Math.random() * -50);
        speeds[i] = Math.random() * 0.7 + 0.6; // gentle organic flow
      }
    };

    initColumns();

    let frame = 0;

    const render = () => {
      frame++;
      // Semi-transparent dark brown wash to create trailing matrix fading trails
      // Warm espresso brown background wash: rgba(24, 18, 14, 0.12)
      ctx.fillStyle = intensity === 'ambient' ? 'rgba(24, 18, 14, 0.15)' : 'rgba(22, 16, 12, 0.18)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Only draw some columns to keep it elegant and readable
        if (i % 2 !== 0 && intensity === 'ambient') continue;

        const char = charList[Math.floor(Math.random() * charList.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y > 0 && y < height + 40) {
          // Matrix Head Glyph: Luminous light blue / bright cyan (#38bdf8)
          ctx.fillStyle = '#bae6fd'; // Light blue glowing head
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.fillText(char, x, y);

          // Matrix Body: Cyan / light blue fading into warm brown/amber
          ctx.shadowBlur = 0;
          if (Math.random() > 0.8) {
            ctx.fillStyle = '#38bdf8'; // Electric Sky Blue
          } else if (Math.random() > 0.5) {
            ctx.fillStyle = '#0284c7'; // Deep Sky Blue
          } else {
            ctx.fillStyle = '#d97706'; // Warm Amber/Brown Matrix shimmer
          }
          ctx.fillText(char, x, y - fontSize);
        }

        // Reset drop when past bottom with random delay
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += speeds[i];
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} opacity-85 transition-opacity duration-1000`}
      aria-hidden="true"
    />
  );
};
