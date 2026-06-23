import { useEffect, useRef } from "react";

/**
 * Fluid "punched hole" cursor reveal (à la landonorris.com).
 * Base text is always visible. A soft circle glides after the cursor and
 * reveals a complementary layer beneath: a filled patch (var(--ink)) + the
 * reveal text in the inverted colour (var(--paper)). Dark mode → white halo
 * with black "Alumni Forever"; light mode inverts.
 *
 * Two masked layers share the cursor circle:
 *   • .rh-patch      — overflows the box so the halo is always a full circle
 *   • .rh-revealtext — sits in the SAME box as the base, so the words align
 */
const OFF = 150; // overflow of the patch beyond the text box, in px

export default function RevealHeadline({
  base = "Students Now.",
  reveal = "Alumni Forever.",
  diameter = 230,
  size,
  style,
}) {
  const ref = useRef(null);
  const st = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0 });

  const sizer = base.length >= reveal.length ? base : reveal;

  useEffect(() => {
    const el = ref.current;
    const s = st.current;
    const loop = () => {
      s.cx += (s.tx - s.cx) * 0.18;   // ease toward cursor → fluid trailing
      s.cy += (s.ty - s.cy) * 0.18;
      el.style.setProperty("--mx", `${s.cx}px`);
      el.style.setProperty("--my", `${s.cy}px`);
      s.raf = requestAnimationFrame(loop);
    };
    s.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(s.raf);
  }, []);

  // coords are in the BOX's space (used directly by the aligned text layer)
  const target = (clientX, clientY) => {
    const b = ref.current.getBoundingClientRect();
    st.current.tx = clientX - b.left;
    st.current.ty = clientY - b.top;
  };
  const snap = (clientX, clientY) => {
    target(clientX, clientY);
    st.current.cx = st.current.tx;
    st.current.cy = st.current.ty;
  };

  return (
    <span
      ref={ref}
      className="reveal-headline"
      style={{ ...(size ? { "--vr-size": size } : null), "--r": `${diameter / 2}px`, "--off": `${OFF}px`, ...style }}
      onMouseEnter={(e) => snap(e.clientX, e.clientY)}
      onMouseMove={(e) => target(e.clientX, e.clientY)}
      onTouchStart={(e) => { const t = e.touches[0]; snap(t.clientX, t.clientY); }}
      onTouchMove={(e) => { const t = e.touches[0]; target(t.clientX, t.clientY); }}
    >
      <span className="rh-sizer" aria-hidden="true">{sizer}</span>
      <span className="rh-base">{base}</span>
      <span className="rh-patch" aria-hidden="true" />
      <span className="rh-revealtext" aria-hidden="true">{reveal}</span>

      <style>{`
        .reveal-headline {
          --vr-size: clamp(34px, 6vw, 76px);
          --mx: 50%; --my: 50%; --r: 90px; --off: 150px;
          position: relative;
          display: inline-block;
          padding: 0 0.2em;            /* tight box → no extra gap */
          font-family: "Source Serif 4", Georgia, serif;
          font-weight: 500;
          font-size: var(--vr-size);
          line-height: 1.12;
          letter-spacing: -0.03em;
          white-space: nowrap;
          font-style: italic;
          cursor: default;
          overflow: visible;
          -webkit-user-select: none;
          user-select: none;
        }

        .reveal-headline .rh-sizer { visibility: hidden; display: block; }

        /* base text — always visible */
        .reveal-headline .rh-base {
          position: absolute; inset: 0;
          padding: 0 0.2em;
          color: var(--ink);
          display: block;
        }

        /* circular patch — overflows the box so the halo is never clipped.
           Its mask centre is offset by --off because its origin is shifted. */
        .reveal-headline .rh-patch {
          position: absolute;
          top: calc(-1 * var(--off)); left: calc(-1 * var(--off));
          right: calc(-1 * var(--off)); bottom: calc(-1 * var(--off));
          background: var(--ink);
          -webkit-mask-image: radial-gradient(circle var(--r) at calc(var(--mx) + var(--off)) calc(var(--my) + var(--off)), #000 0%, #000 99%, transparent 100%);
                  mask-image: radial-gradient(circle var(--r) at calc(var(--mx) + var(--off)) calc(var(--my) + var(--off)), #000 0%, #000 99%, transparent 100%);
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
          opacity: 0;
          transition: opacity 240ms ease;
          will-change: opacity;
        }

        /* reveal text — SAME box as the base, so words line up exactly */
        .reveal-headline .rh-revealtext {
          position: absolute; inset: 0;
          padding: 0 0.2em;
          color: var(--paper);
          display: block;
          -webkit-mask-image: radial-gradient(circle var(--r) at var(--mx) var(--my), #000 0%, #000 99%, transparent 100%);
                  mask-image: radial-gradient(circle var(--r) at var(--mx) var(--my), #000 0%, #000 99%, transparent 100%);
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
          opacity: 0;
          transition: opacity 240ms ease;
          will-change: opacity;
        }

        .reveal-headline:hover .rh-patch,
        .reveal-headline:hover .rh-revealtext,
        .reveal-headline:focus-within .rh-patch,
        .reveal-headline:focus-within .rh-revealtext { opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .reveal-headline .rh-patch,
          .reveal-headline .rh-revealtext { transition: opacity 120ms linear; }
        }
      `}</style>
    </span>
  );
}
