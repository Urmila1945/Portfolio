import React, { useEffect, useRef } from 'react';

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left  = mouseX - 4 + 'px';
      dot.style.top   = mouseY - 4 + 'px';
    };

    document.addEventListener('mousemove', onMouseMove);

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX - 18 + 'px';
      ring.style.top  = ringY - 18 + 'px';
      animId = requestAnimationFrame(animateRing);
    }
    animateRing();

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        if (!el.dataset.cursorBound) {
          el.dataset.cursorBound = 'true';
          el.addEventListener('mouseenter', () => {
            ring.style.transform = 'scale(1.8)';
            ring.style.borderColor = 'rgba(168,85,247,0.8)';
            dot.style.transform = 'scale(0.5)';
          });
          el.addEventListener('mouseleave', () => {
            ring.style.transform = 'scale(1)';
            ring.style.borderColor = 'rgba(168,85,247,0.5)';
            dot.style.transform = 'scale(1)';
          });
        }
      });
    };

    // Run once and on every mouse move just in case new elements render
    const hoverInterval = setInterval(addHoverListeners, 1000);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      clearInterval(hoverInterval);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" id="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" id="cursor-ring" ref={ringRef}></div>
    </>
  );
}

export default Cursor;
