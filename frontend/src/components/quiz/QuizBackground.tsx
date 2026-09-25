import React, { useEffect, useRef } from 'react';

export const QuizBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate floating stars/satellites
    const numParticles = Math.min(60, Math.floor((width * height) / 25000));
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.4 ? '#38bdf8' : Math.random() > 0.5 ? '#818cf8' : '#34d399'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby stars
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;
        const clampedAlpha = Math.max(0.1, Math.min(0.8, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Particle Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Ambient Gradient Orbs */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-gradient-to-b from-indigo-600/20 via-sky-600/10 to-transparent rounded-full blur-[150px]" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[130px]" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-[130px]" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Tactical Geographic Coordinate Watermarks */}
      <div className="hidden xl:flex items-center gap-6 absolute top-8 left-10 font-mono text-[10px] text-indigo-400/25 tracking-widest uppercase">
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> LAT: 25.2769° N</span>
        <span>LON: 55.2962° E</span>
        <span>SYS: ONLINE</span>
      </div>
      <div className="hidden xl:flex items-center gap-6 absolute bottom-8 right-10 font-mono text-[10px] text-sky-400/25 tracking-widest uppercase">
        <span>MODE: GEOPOLITICAL_SIM</span>
        <span>VERIFIED_DB: 104_NODES</span>
      </div>

      {/* Decorative SVG Orbital Target Rings */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.035] stroke-indigo-400 pointer-events-none fill-none">
        <circle cx="450" cy="450" r="200" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="450" cy="450" r="340" strokeWidth="1" />
        <circle cx="450" cy="450" r="420" strokeWidth="1" strokeDasharray="12 12" />
        <line x1="0" y1="450" x2="900" y2="450" strokeWidth="1" />
        <line x1="450" y1="0" x2="450" y2="900" strokeWidth="1" />
      </svg>
    </div>
  );
};
