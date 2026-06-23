import { useEffect, useRef } from "react";

/**
 * Fluid cursor reveal confined to a multi-line headline block.
 * Base text is always visible; a soft circle follows the cursor and reveals a
 * complementary layer beneath (var(--ink) patch + var(--paper) text).
 *
 * The circle radius is capped to the distance to the nearest edge of the WHOLE
 * block, so it stays inside the block and collapses smoothly inward to a point
 * at the boundary. No liquid distortion — the revealed text stays crisp.
 *
 * @param {{base:string, reveal:string}[]} lines  one entry per headline line
 */
const FULL_R = 130; // max radius (px) when far from any edge

export default function RevealHeadline({
  lines = [{ base: "Students Now.", reveal: "Alumni Forever." }],
  size,
  style,
}) {
  const ref = useRef(null);
  const st = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, tr: 0, cr: 0, raf: 0 });

  const sizerLines = lines.map((l) => (l.base.length >= l.reveal.length ? l.base : l.reveal));

  useEffect(() => {
    const el = ref.current;
    const s = st.current;
    const loop = () => {
      s.cx += (s.tx - s.cx) * 0.2;
      s.cy += (s.ty - s.cy) * 0.2;
      s.cr += (s.tr - s.cr) * 0.08;   // slow inward collapse
      el.style.setProperty("--mx", `${s.cx}px`);
      el.style.setProperty("--my", `${s.cy}px`);
      el.style.setProperty("--r", `${Math.max(0, s.cr)}px`);
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const target = (clientX, clientY) => {
    const b = ref.current.getBoundingClientRect();
    const x = clientX - b.left, y = clientY - b.top;
    st.current.tx = x;
    st.current.ty = y;
    const edge = Math.min(x, b.width - x, y, b.height - y);
    st.current.tr = Math.max(0, Math.min(FULL_R, edge));
  };
  const snap = (clientX, clientY) => {
    target(clientX, clientY);
    st.current.cx = st.current.tx;
    st.current.cy = st.current.ty;
  };
  const collapse = () => { st.current.tr = 0; };

  const renderLines = (key) =>
    lines.map((l, i) => (
      <span key={i} style={{ display: "block" }}>{l[key]}</span>
    ));

  return (
    <span
      ref={ref}
      className="reveal-headline"
      style={{ ...(size ? { "--vr-size": size } : null), ...style }}
      onMouseEnter={(e) => snap(e.clientX, e.clientY)}
      onMouseMove={(e) => target(e.clientX, e.clientY)}
      onMouseLeave={collapse}
      onTouchStart={(e) => { const t = e.touches[0]; snap(t.clientX, t.clientY); }}
      onTouchMove={(e) => { const t = e.touches[0]; target(t.clientX, t.clientY); }}
      onTouchEnd={collapse}
    >
      <span className="rh-sizer" aria-hidden="true">
        {sizerLines.map((t, i) => <span key={i} style={{ display: "block" }}>{t}</span>)}
      </span>
      <span className="rh-base">{renderLines("base")}</span>
      <span className="rh-revealtext" aria-hidden="true">{renderLines("reveal")}</span>

      <style>{`
        .reveal-headline {
          --vr-size: clamp(34px, 6vw, 76px);
          --mx: 50%; --my: 50%; --r: 0px;
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          padding: 0.18em 0.16em;
          font-family: "Source Serif 4", Georgia, serif;
          font-weight: 500;
          font-size: var(--vr-size);
          line-height: 1.12;
          letter-spacing: -0.03em;
          white-space: nowrap;
          font-style: italic;
          text-align: center;
          cursor: default;
          -webkit-user-select: none; user-select: none;
        }
        .reveal-headline .rh-sizer { visibility: hidden; display: block; }

        .reveal-headline .rh-base {
          position: absolute; inset: 0;
          padding: 0.18em 0.16em;
          color: var(--ink);
          display: block;
        }
        .reveal-headline .rh-revealtext {
          position: absolute; inset: 0;
          padding: 0.18em 0.16em;
          background: var(--ink);
          color: var(--paper);
          display: block;
          -webkit-mask-image: radial-gradient(circle var(--r) at var(--mx) var(--my), #000 0%, #000 94%, transparent 100%);
                  mask-image: radial-gradient(circle var(--r) at var(--mx) var(--my), #000 0%, #000 94%, transparent 100%);
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
        }
      `}</style>
    </span>
  );
}
