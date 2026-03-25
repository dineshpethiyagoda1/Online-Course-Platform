import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    if (!cursor || !ring) return;

    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    };
    document.addEventListener('mousemove', onMove);

    let rafId;
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const grow   = () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; ring.style.width = '56px'; ring.style.height = '56px'; };
    const shrink = () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.width = '36px'; ring.style.height = '36px'; };

    const addListeners = () => {
      document.querySelectorAll('a,button,input,textarea,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };
    addListeners();
    const mo = new MutationObserver(addListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position:'fixed',width:'10px',height:'10px',background:'var(--lime)',
        borderRadius:'50%',pointerEvents:'none',zIndex:9999,
        transition:'transform 0.15s',transform:'translate(-50%,-50%)',
      }} />
      <div ref={ringRef} style={{
        position:'fixed',width:'36px',height:'36px',
        border:'1.5px solid rgba(200,255,0,0.4)',borderRadius:'50%',
        pointerEvents:'none',zIndex:9998,
        transition:'transform 0.4s cubic-bezier(0.23,1,0.32,1),width 0.3s,height 0.3s',
        transform:'translate(-50%,-50%)',
      }} />
    </>
  );
}

