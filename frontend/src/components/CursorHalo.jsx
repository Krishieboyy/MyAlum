import { useEffect, useRef } from "react";

/**
 * Global liquid cursor halo.
 * A tiny blob follows the cursor everywhere; when it touches text it grows
 * smoothly to full size, and shrinks back when it leaves. Over the headline
 * (`.reveal-headline`) it hides, letting the big text-reveal blob take over.
 */
const FULL = 30;            // enlarged diameter (px)
const SMALL_SCALE = 0.26;   // resting size = FULL * SMALL_SCALE  (~8px dot)

// elements considered "text"
const TEXT_SEL = "h1,h2,h3,h4,h5,h6,p,a,span,li,button,label,strong,em,b,i,td,th,blockquote,figcaption,small";

export default function CursorHalo() {
  const wrapRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    if (!wrap || !dot) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = innerWidth / 2, ty = innerHeight / 2;
    let cx = tx, cy = ty;
    let raf = 0;
    let state = "small"; // "small" | "big" | "hidden"

    const setState = (s) => {
      if (s === state) return;
      state = s;
      const scale = s === "hidden" ? 0 : s === "big" ? 1 : SMALL_SCALE;
      dot.style.transform = `scale(${scale})`;
    };

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      const el = e.target;
      if (el?.closest?.(".reveal-headline")) setState("hidden");
      else if (el?.closest?.(TEXT_SEL)) setState("big");
      else setState("small");
    };
    const onLeave = () => setState("hidden");

    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      wrap.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };

    dot.style.transform = `scale(${SMALL_SCALE})`;
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    if (!reduce) raf = requestAnimationFrame(loop);
    else wrap.style.transform = `translate(${cx}px, ${cy}px)`;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* outer = position (rAF, no transition); inner = size (smooth scale) */}
      <div
        ref={wrapRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <div
          ref={dotRef}
          style={{
            width: FULL,
            height: FULL,
            marginLeft: -FULL / 2,
            marginTop: -FULL / 2,
            borderRadius: "50%",
            background: "#fff",
            mixBlendMode: "difference",
            filter: "url(#cursor-liquid)",
            transform: `scale(${SMALL_SCALE})`,
            transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

      {/* liquid distortion filter for the cursor blob */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden="true">
        <filter id="cursor-liquid" x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.05" numOctaves="2" seed="2" result="n">
            <animate attributeName="baseFrequency" dur="9s" repeatCount="indefinite"
              values="0.04 0.05; 0.07 0.035; 0.04 0.05" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </>
  );
}
