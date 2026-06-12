import React, { useEffect, useRef } from 'react';

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    // AI / Data Science Color Palette (Cool Blues, Cyans, Electric Purples)
    const COLORS = ['#38bdf8', '#0ea5e9', '#06b6d4', '#8b5cf6', '#c084fc'];
    
    // Adjust number of nodes based on screen size for a structured web
    const NUM = Math.min(Math.floor(W * H / 10000), 100);

    let mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const particles = Array.from({ length: NUM }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 2 + 1, // Slightly larger base nodes
      baseR: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      
      // Draw Connections (Neural Pathways)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            // Opacity based on distance
            let opacity = (1 - dist / 150) * 0.25;
            
            // Check if mouse is near this connection to highlight it (Data flow effect)
            if (mouse.x != null && mouse.y != null) {
              const midX = (particles[i].x + particles[j].x) / 2;
              const midY = (particles[i].y + particles[j].y) / 2;
              const mouseDist = Math.sqrt(Math.pow(mouse.x - midX, 2) + Math.pow(mouse.y - midY, 2));
              if (mouseDist < mouse.radius) {
                opacity += (1 - mouseDist / mouse.radius) * 0.4;
                ctx.strokeStyle = '#38bdf8'; // Highlight color
              } else {
                ctx.strokeStyle = particles[i].color;
              }
            } else {
              ctx.strokeStyle = particles[i].color;
            }

            ctx.globalAlpha = opacity;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Node glow when near mouse
        let currentAlpha = p.alpha;
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            currentAlpha = Math.min(p.alpha + (1 - dist / mouse.radius), 1);
            p.r = p.baseR + (1 - dist / mouse.radius) * 2; // Node swells slightly
          } else {
            p.r = p.baseR;
          }
        } else {
          p.r = p.baseR;
        }

        ctx.globalAlpha = currentAlpha;
        
        // Add subtle glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        
        ctx.fill();
        
        ctx.shadowBlur = 0; // Reset
      });

      ctx.globalAlpha = 1;
    }

    function update() {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Gentle bounce off edges
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Subtle mouse repulsion/attraction (Parallax effect)
        if (mouse.x != null && mouse.y != null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const forceDirectionX = dx / dist;
                const forceDirectionY = dy / dist;
                const force = (mouse.radius - dist) / mouse.radius;
                // Repel nodes slightly
                p.x -= forceDirectionX * force * 1.5;
                p.y -= forceDirectionY * force * 1.5;
            }
        }
      });
    }

    let animId;
    function loop() {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    }
    loop();

    const handleResize = () => {
      cancelAnimationFrame(animId);
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      loop();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }}></canvas>;
}

export default Particles;
