import { useEffect, useRef } from "react";

export function ParticleCanvas({ count = 100 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      da: number;
    };

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.3 + 0.2,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      a: Math.random(),
      da: (Math.random() * 0.007 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));

    let raf = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.a += particle.da;
        if (particle.a > 1 || particle.a < 0) particle.da *= -1;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${Math.max(0, Math.min(1, particle.a)) * 0.6})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
