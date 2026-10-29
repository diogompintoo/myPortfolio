import { useEffect, useRef } from 'react';

const CELL = 28;    // size of each square
const GAP = 3;      // space between squares
const RADIUS = 170; // radius of the "heat" 


export default function PixelGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let heat = new Float32Array(0);
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      heat = new Float32Array(cols * rows);
      if (reduceMotion) draw();
    };

    const draw = () => {
      // lê as cores atuais (mudam com o modo claro/escuro)
      const styles = getComputedStyle(document.documentElement);
      const gold = styles.getPropertyValue('--gold').trim();
      const line = styles.getPropertyValue('--line').trim();

      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = c * CELL + GAP / 2;
          const y = r * CELL + GAP / 2;
          const size = CELL - GAP;

          if (!reduceMotion) {
            const d = Math.hypot(c * CELL + CELL / 2 - mouse.x, r * CELL + CELL / 2 - mouse.y);
            if (d < RADIUS) heat[i] = Math.max(heat[i], (1 - d / RADIUS) ** 1.6);
            heat[i] *= 0.94; // apaga devagar
            if (heat[i] < 0.01) heat[i] = 0;
          }

          ctx.globalAlpha = 0.55;
          ctx.fillStyle = line;
          ctx.fillRect(x, y, size, size);

          if (heat[i] > 0) {
            ctx.globalAlpha = heat[i];
            ctx.fillStyle = gold;
            ctx.fillRect(x, y, size, size);
          }
        }
      }
      ctx.globalAlpha = 1;

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    resize();
    if (!reduceMotion) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_35%,transparent)]"
    />
  );
}