import React, { useRef, useEffect, useState } from 'react';

const MeteorAnimation = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]).current;
  const [tailLength, setTailLength] = useState(20); // Initial tail length

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Function to set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();

    // Animation settings
    const numParticles = 1000; // Number of particles
    const colors = ['#00f', '#00c', '#00a', '#add8e6', '#87cefa']; // Shades of blue and light blue

    // Spread particles across the canvas
    const createParticle = () => {
      return {
        x: Math.random() * canvas.width, // Random x position
        y: Math.random() * canvas.height, // Random y position
        size: Math.random() * 4 + 4,
        headSize: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        history: [],
      };
    };

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(createParticle());
    }

    const updateParticles = () => {
      particles.forEach(particle => {
        // Update particle's history based on tail length
        if (particle.history.length >= tailLength) {
          particle.history.shift();
        }
        particle.history.push({ x: particle.x, y: particle.y });
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        // Draw the tail
        for (let i = 0; i < particle.history.length - 1; i++) {
          const { x: x1, y: y1 } = particle.history[i];
          const { x: x2, y: y2 } = particle.history[i + 1];
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }

        ctx.stroke();

        // Draw the head
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.headSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      // Reinitialize particles to fit new canvas size
      particles.length = 0; // Clear existing particles
      for (let i = 0; i < numParticles; i++) {
        particles.push(createParticle());
      }
    };

    const handleScroll = () => {
      // Update tail length based on scroll position
      const scrollTop = window.scrollY;
      const newTailLength = Math.max(10, 20 + scrollTop / 10);
      setTailLength(newTailLength);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tailLength]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 1 }}
    ></canvas>
  );
};

export default MeteorAnimation;
