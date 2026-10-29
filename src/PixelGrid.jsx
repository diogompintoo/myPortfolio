import { useEffect, useRef } from 'react';

const CELL = 28;    // size of each square
const GAP = 3;      // space between squares
const RADIUS = 130; // radius of the "heat" 


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
      const styles = getComputedStyle(document.documentElement);
      const gold = styles.getPropertyValue('--gold').trim();
      const line = styles.getPropertyValue('--line').trim();

      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          
          const origCenterX = c * CELL + CELL / 2;
          const origCenterY = r * CELL + CELL / 2;

          let size = CELL - GAP;
          let x = c * CELL + GAP / 2;
          let y = r * CELL + GAP / 2;

          if (!reduceMotion) {
            const d = Math.hypot(c * CELL + CELL / 2 - mouse.x, r * CELL + CELL / 2 - mouse.y);
            if (d < RADIUS) heat[i] = Math.max(heat[i], (1 - d / RADIUS) ** 1.6);
            heat[i] *= 0.94;
            if (heat[i] < 0.01) heat[i] = 0;

            if (heat[i] > 0) {
              size = (CELL - GAP) * (1 + heat[i] * 0.35); 

              // Efeito Lente/Esfera (X e Y): Empurra o quadrado ligeiramente para fora do rato
              const dx = origCenterX - mouse.x;
              const dy = origCenterY - mouse.y;
              const distance = d || 1; // evita divisão por zero
              
              const push = heat[i] * 12; // Máximo de 12px de distorção lateral
              const offsetX = (dx / distance) * push;
              const offsetY = (dy / distance) * push;

              // Recalcula o X e Y para que o quadrado cresça a partir do novo centro distorcido
              x = (origCenterX + offsetX) - size / 2;
              y = (origCenterY + offsetY) - size / 2;
            }
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