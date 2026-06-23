import { useEffect, useRef } from "react";

/**
 * Animated flow-field background (à la landonorris.com).
 * Particles drift along a smooth pseudo-noise vector field, leaving fading
 * trails that read as fluid "squiggles". Sits fixed behind all content.
 *
 * Theme-aware:
 *   dark  → black canvas, white squiggles
 *   light → paper canvas, soft dark squiggles
 */
export default function FlowField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1;
    let particles = [];
    let raf = 0;
    let t = 0;

    // ── cursor "stir" state ──
    let mx = -9999, my = -9999;   // pointer position
    let pvx = 0, pvy = 0;         // smoothed pointer velocity
    let lastX = null, lastY = null;
    const STIR_R = 190;           // radius of influence around the cursor

    const onMove = (e) => {
      if (lastX !== null) {
        pvx = pvx * 0.6 + (e.clientX - lastX) * 0.4;
        pvy = pvy * 0.6 + (e.clientY - lastY) * 0.4;
      }
      lastX = e.clientX; lastY = e.clientY;
      mx = e.clientX; my = e.clientY;
    };
    const onTouch = (e) => { const tch = e.touches[0]; if (tch) onMove(tch); };

    const palette = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      return dark
        ? { bg: "0,0,0",        line: "255,255,255", lineA: 0.55 }
        : { bg: "248,250,252",  line: "15,23,42",     lineA: 0.22 };
    };
    let pal = palette();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // paint solid base
      ctx.fillStyle = `rgb(${pal.bg})`;
      ctx.fillRect(0, 0, W, H);
      seed();
    };

    const seed = () => {
      const count = Math.round((W * H) / 9000); // density scales with area
      particles = Array.from({ length: Math.min(900, Math.max(120, count)) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        life: Math.random() * 200,
      }));
    };

    // smooth angle field from layered sines (cheap pseudo-noise)
    const angleAt = (x, y, time) => {
      const a =
        Math.sin(x * 0.0024 + time) +
        Math.sin(y * 0.0031 - time * 0.8) +
        Math.sin((x + y) * 0.0017 + time * 0.6);
      return a * Math.PI; // radians
    };

    const SPEED = 0.9;

    const step = () => {
      t += 0.0016;

      // pointer velocity decays when the cursor slows/stops → stir subsides
      pvx *= 0.9; pvy *= 0.9;
      const sp = Math.hypot(pvx, pvy);
      const ux = sp > 0.001 ? pvx / sp : 0;
      const uy = sp > 0.001 ? pvy / sp : 0;

      // fade previous frame toward base color → leaves soft trails
      ctx.fillStyle = `rgba(${pal.bg}, 0.05)`;
      ctx.fillRect(0, 0, W, H);

      ctx.lineWidth = 1.1;
      ctx.lineCap = "round";
      ctx.strokeStyle = `rgba(${pal.line}, ${pal.lineA})`;

      ctx.beginPath();
      for (const p of particles) {
        const ang = angleAt(p.x, p.y, t);
        let ca = Math.cos(ang), sa = Math.sin(ang), mag = SPEED;

        // blend toward the cursor's direction near the pointer (hand stirring water)
        if (sp > 0.4) {
          const dx = p.x - mx, dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < STIR_R * STIR_R) {
            const infl = 1 - Math.sqrt(d2) / STIR_R;     // 1 at cursor → 0 at edge
            const k = infl * Math.min(1, sp / 26);        // also scales with speed
            ca = ca * (1 - k) + ux * k;
            sa = sa * (1 - k) + uy * k;
            mag = SPEED * (1 + k * 2.4);                  // swept particles speed up
          }
        }

        const nx = p.x + ca * mag;
        const ny = p.y + sa * mag;

        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);

        p.x = nx;
        p.y = ny;
        p.life -= 1;

        // respawn off-screen or aged particles to keep the field lively
        if (p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10 || p.life < 0) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.life = 200 + Math.random() * 200;
        }
      }
      ctx.stroke();

      raf = requestAnimationFrame(step);
    };

    // react to light/dark toggle
    const observer = new MutationObserver(() => {
      pal = palette();
      ctx.fillStyle = `rgb(${pal.bg})`;
      ctx.fillRect(0, 0, W, H);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
    }

    if (reduce) {
      // draw a few static frames then stop
      for (let i = 0; i < 120; i++) step();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
