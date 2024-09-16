import React, { useRef, useEffect } from 'react';

const MeteorAnimation = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]).current; // Use a ref to persist particles

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Function to set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let lastTime = 0; // For smooth animation

    // Animation settings
    const numParticles = 1000; // Number of particles
    const tailLength = 20; // Length of the tail
    const colors = ['#00f', '#00c', '#00a', '#add8e6', '#87cefa']; // Shades of blue and light blue

    const createParticle = () => {
      // Random angle for direction
      const angle = Math.random() * 2 * Math.PI;
      // Direction vector based on angle
      const directionX = Math.cos(angle);
      const directionY = Math.sin(angle);

      return {
        x: centerX, // Particle starts from the center
        y: centerY,
        size: Math.random() * 4 + 4,
        headSize: Math.random() * 1 +0.5, // Smaller head size
        speed: Math.random() * 0.5 + 0.5, // Slow initial speed
        acceleration: Math.random() * 0.02 + 0.01, // Slow acceleration
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 200 + 200,
        history: [], // To store the particle's previous positions
        directionX,
        directionY
      };
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        // Update the particle's speed
        particle.speed += particle.acceleration;

        // Update the particle's position based on its direction and speed
        particle.x += particle.directionX * particle.speed;
        particle.y += particle.directionY * particle.speed;

        // Add current position to history
        if (particle.history.length >= tailLength) {
          particle.history.shift();
        }
        particle.history.push({ x: particle.x, y: particle.y });

        // Handle edge of canvas
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
          particles.splice(particles.indexOf(particle), 1);
        }

        particle.life -= 1;

        if (particle.life <= 0) {
          particles.splice(particles.indexOf(particle), 1);
        }
      });

      while (particles.length < numParticles) {
        particles.push(createParticle());
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Draw the tail
        ctx.beginPath();
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1; // Thin tail
        ctx.lineCap = 'round';

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
        ctx.shadowBlur = 15; // Glowing effect
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow blur
      });
    };

    const animate = (timestamp) => {
      // Calculate time difference for smooth animation
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      updateParticles();
      drawParticles();

      // Adjust the frame rate for smooth animation
      const fps = 60; // Target FPS
      const interval = 1000 / fps;
      const delay = Math.max(0, interval - deltaTime);
      setTimeout(() => requestAnimationFrame(animate), delay);
    };

    animate(0);

    // Resize canvas on window resize
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 1 }}
    ></canvas>
  );
};

export default MeteorAnimation;
