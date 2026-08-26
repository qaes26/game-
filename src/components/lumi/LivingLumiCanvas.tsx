import React, { useEffect, useRef } from 'react';

interface LivingLumiCanvasProps {
  isSpeaking?: boolean;
  emotion?: 'happy' | 'cheering' | 'talking' | 'listening' | 'excited';
  size?: number; // Canvas size in pixels
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export const LivingLumiCanvas: React.FC<LivingLumiCanvasProps> = ({
  isSpeaking = false,
  emotion = 'happy',
  size = 200,
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isHoveredRef = useRef<boolean>(false);
  const isBlinkingRef = useRef<boolean>(false);
  const blinkTimerRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Mouse tracker for eye gaze
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mousePosRef.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)))
      };
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const render = () => {
      time += 0.04;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Organic Floating & Breathing Motion
      const floatY = Math.sin(time * 2.2) * 6;
      const floatX = Math.cos(time * 1.1) * 3;
      const breathScale = 1 + Math.sin(time * 3.0) * 0.025;
      const earWiggle = Math.sin(time * 4.5) * 0.06;

      const bodyY = centerY + floatY + 10;
      const bodyX = centerX + floatX;

      // Blinking controller
      blinkTimerRef.current += 1;
      if (blinkTimerRef.current > 160 + Math.random() * 80) {
        isBlinkingRef.current = true;
        if (blinkTimerRef.current > 172) {
          isBlinkingRef.current = false;
          blinkTimerRef.current = 0;
        }
      }

      // 2. Emit Stardust Particles from Star Antenna
      if (Math.random() < 0.35 || isSpeaking) {
        const starX = bodyX + Math.sin(time * 2) * 4;
        const starY = bodyY - 68;
        particlesRef.current.push({
          x: starX + (Math.random() - 0.5) * 12,
          y: starY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -Math.random() * 1.8 - 0.5,
          size: Math.random() * 3.5 + 1.5,
          alpha: 1,
          color: Math.random() < 0.6 ? '#facc15' : '#38bdf8',
          life: 0,
          maxLife: 40 + Math.random() * 30
        });
      }

      // Render & Update Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // 3. Glowing Bioluminescent Stardust Aura
      const auraGradient = ctx.createRadialGradient(
        bodyX,
        bodyY,
        20,
        bodyX,
        bodyY,
        75 * (isSpeaking ? 1.25 : 1.1)
      );
      auraGradient.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      auraGradient.addColorStop(0.5, 'rgba(250, 204, 21, 0.25)');
      auraGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.save();
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(bodyX, bodyY, 78, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. Outer Rotating Energy Ring
      ctx.save();
      ctx.translate(bodyX, bodyY);
      ctx.rotate(time * 0.8);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 12]);
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 58, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 5. Fluffy Animated Ears (with wiggle physics)
      ctx.save();
      ctx.translate(bodyX, bodyY);
      ctx.scale(breathScale, breathScale);

      // Left Ear
      ctx.save();
      ctx.translate(-38, -32);
      ctx.rotate(-0.35 + earWiggle);
      const leftEarGrad = ctx.createLinearGradient(0, -28, 0, 15);
      leftEarGrad.addColorStop(0, '#38bdf8');
      leftEarGrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = leftEarGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 26, -0.2, 0, Math.PI * 2);
      ctx.fill();
      // Inner Ear Pink
      ctx.fillStyle = 'rgba(251, 113, 133, 0.75)';
      ctx.beginPath();
      ctx.ellipse(0, 2, 9, 17, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right Ear
      ctx.save();
      ctx.translate(38, -32);
      ctx.rotate(0.35 - earWiggle);
      const rightEarGrad = ctx.createLinearGradient(0, -28, 0, 15);
      rightEarGrad.addColorStop(0, '#38bdf8');
      rightEarGrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = rightEarGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 26, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // Inner Ear Pink
      ctx.fillStyle = 'rgba(251, 113, 133, 0.75)';
      ctx.beginPath();
      ctx.ellipse(0, 2, 9, 17, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 6. Round Bioluminescent Fur Body (with organic 3D gradient shading)
      const bodyGrad = ctx.createRadialGradient(-12, -15, 8, 0, 0, 48);
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.25, '#bae6fd');
      bodyGrad.addColorStop(0.65, '#38bdf8');
      bodyGrad.addColorStop(1, '#0369a1');

      ctx.fillStyle = bodyGrad;
      ctx.shadowColor = 'rgba(2, 132, 199, 0.6)';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI * 2);
      ctx.fill();

      // Fluffy Fur Texture Arc Highlights
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(-22, -10, 12, 1, 2.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(22, -10, 12, 0.6, 2.1);
      ctx.stroke();

      // Rosy Cheeks (Pulsing softly)
      const cheekAlpha = 0.55 + Math.sin(time * 3) * 0.15;
      ctx.fillStyle = `rgba(244, 63, 94, ${cheekAlpha})`;
      ctx.beginPath();
      ctx.ellipse(-24, 12, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(24, 12, 8, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // 7. Interactive Gaze Tracking Eyes (Living Pixar Specular Eyes)
      const eyeOffsetX = mousePosRef.current.x * 4;
      const eyeOffsetY = mousePosRef.current.y * 3;

      const renderEye = (ex: number, ey: number) => {
        if (isBlinkingRef.current) {
          // Closed eyelid arc
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 3.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.arc(ex, ey, 9, 0.2, Math.PI - 0.2);
          ctx.stroke();
        } else {
          // Eye White Sclera
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = 'rgba(0,0,0,0.2)';
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.ellipse(ex, ey, 10, 13, 0, 0, Math.PI * 2);
          ctx.fill();

          // Iris (Deep Oceanic Cyan Gradient)
          const irisX = ex + eyeOffsetX;
          const irisY = ey + eyeOffsetY;
          const irisGrad = ctx.createRadialGradient(irisX - 2, irisY - 2, 1, irisX, irisY, 7);
          irisGrad.addColorStop(0, '#38bdf8');
          irisGrad.addColorStop(0.7, '#0284c7');
          irisGrad.addColorStop(1, '#0f172a');

          ctx.fillStyle = irisGrad;
          ctx.beginPath();
          ctx.arc(irisX, irisY, 7, 0, Math.PI * 2);
          ctx.fill();

          // Pupil (Black Center)
          ctx.fillStyle = '#020617';
          ctx.beginPath();
          ctx.arc(irisX, irisY, 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Specular Catchlights (Glints)
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(irisX - 2.5, irisY - 3, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(irisX + 2, irisY + 2.5, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      renderEye(-16, -2);
      renderEye(16, -2);

      // Cute Little Nose
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.ellipse(0, 10, 3.5, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // 8. Dynamic Animated Talking Mouth (Synchronized Visemes)
      if (isSpeaking || emotion === 'talking') {
        const mouthOpen = Math.abs(Math.sin(time * 14)) * 9 + 4;
        ctx.fillStyle = '#881337';
        ctx.beginPath();
        ctx.ellipse(0, 19, 7, mouthOpen, 0, 0, Math.PI * 2);
        ctx.fill();

        // Little Tongue
        ctx.fillStyle = '#fb7185';
        ctx.beginPath();
        ctx.ellipse(0, 20 + mouthOpen * 0.3, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (emotion === 'cheering') {
        ctx.fillStyle = '#e11d48';
        ctx.beginPath();
        ctx.arc(0, 17, 7, 0, Math.PI);
        ctx.fill();
      } else {
        // Happy Gentle Smile
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, 14, 7, 0.3, Math.PI - 0.3);
        ctx.stroke();
      }

      // 9. Forehead Stargate Antenna & Rotating Golden Star
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, -42);
      ctx.quadraticCurveTo(Math.sin(time * 3) * 4, -54, 0, -64);
      ctx.stroke();

      // Spinning Star Antenna Tip
      ctx.save();
      ctx.translate(0, -65);
      ctx.rotate(time * 2.0);
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 18;

      // Draw 5-Pointed Star
      ctx.beginPath();
      for (let s = 0; s < 5; s++) {
        const starAngle = (s * Math.PI * 2) / 5 - Math.PI / 2;
        const starAngleInner = starAngle + Math.PI / 5;
        const outerR = 9;
        const innerR = 4.5;
        if (s === 0) {
          ctx.moveTo(Math.cos(starAngle) * outerR, Math.sin(starAngle) * outerR);
        } else {
          ctx.lineTo(Math.cos(starAngle) * outerR, Math.sin(starAngle) * outerR);
        }
        ctx.lineTo(Math.cos(starAngleInner) * innerR, Math.sin(starAngleInner) * innerR);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.restore(); // End Body Scale & Transform

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSpeaking, emotion, interactive]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="drop-shadow-2xl transition-transform active:scale-95 duration-200"
      style={{ width: size, height: size }}
    />
  );
};
