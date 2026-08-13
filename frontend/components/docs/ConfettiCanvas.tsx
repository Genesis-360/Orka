"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
  gravity: number;
}

const COLORS = ["#9474ff", "#22bd93", "#ff8a22", "#3b82f6", "#f59e0b", "#ec4899"];

function createParticles(canvas: HTMLCanvasElement): Particle[] {
  const particles: Particle[] = [];
  const count = 50;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 14 - 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 6 + 4,
      opacity: 1,
      gravity: 0.3,
    });
  }
  return particles;
}

interface ConfettiCanvasProps {
  active: boolean;
  onComplete?: () => void;
}

export default function ConfettiCanvas({ active, onComplete }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const context = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const width = canvas.width;
    const height = canvas.height;

    const particles = createParticles(canvas);
    const startTime = Date.now();
    const duration = 700;

    function draw() {
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        context.clearRect(0, 0, width, height);
        onComplete?.();
        return;
      }

      context.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - elapsed / duration);

        context.save();
        context.translate(p.x, p.y);
        context.rotate((p.rotation * Math.PI) / 180);
        context.globalAlpha = p.opacity;
        context.fillStyle = p.color;
        context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        context.restore();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
