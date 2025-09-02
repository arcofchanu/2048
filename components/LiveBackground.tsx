import React, { useRef, useEffect } from 'react';

// Configuration for the Matrix rain animation
const MATRIX_CONFIG = {
  fontSize: 16,
  font: 'monospace',
  characters: 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789',
  mainColor: '#a855f7', // purple-500
  highlightColor: '#d8b4fe', // purple-300
  trailAlpha: 0.04,
  fallSpeed: 0.75,
};

const LiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const drops = useRef<number[]>([]); // Stores the y-position for each column's drop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let columns = 0;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      columns = Math.floor(canvas.width / MATRIX_CONFIG.fontSize);
      drops.current = [];
      for (let i = 0; i < columns; i++) {
        // Start each drop at a random y-position
        drops.current[i] = (Math.random() * canvas.height) / MATRIX_CONFIG.fontSize;
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      // Create a fading trail effect by drawing a semi-transparent black rectangle
      ctx.fillStyle = `rgba(10, 10, 10, ${MATRIX_CONFIG.trailAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${MATRIX_CONFIG.fontSize}px ${MATRIX_CONFIG.font}`;

      for (let i = 0; i < drops.current.length; i++) {
        const text = MATRIX_CONFIG.characters[Math.floor(Math.random() * MATRIX_CONFIG.characters.length)];
        
        // Randomly use highlight color for some characters
        ctx.fillStyle = Math.random() > 0.95 ? MATRIX_CONFIG.highlightColor : MATRIX_CONFIG.mainColor;
        
        const xPos = i * MATRIX_CONFIG.fontSize;
        const yPos = drops.current[i] * MATRIX_CONFIG.fontSize;
        
        ctx.fillText(text, xPos, yPos);

        // Reset the drop to the top if it's off-screen, with a random chance
        // This creates a staggered, continuous effect.
        if (yPos > canvas.height && Math.random() > 0.975) {
          drops.current[i] = 0;
        }

        drops.current[i] += MATRIX_CONFIG.fallSpeed;
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId.current);
      setup();
      draw();
    };

    setup();
    draw();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
};

export default LiveBackground;