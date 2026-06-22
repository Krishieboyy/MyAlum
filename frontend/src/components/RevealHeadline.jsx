import { useRef } from "react";

/**
 * Hover text-reveal headline.
 * Base text stays visible; a second layer is revealed only inside a soft
 * radial mask that follows the cursor and eases open/closed on hover.
 */
export default function RevealHeadline({
  base = "Students Today",
  reveal = "Alumni Forever",
  radius = 150,
}) {
  const ref = useRef(null);

  const setPos = (clientX, clientY) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${clientX - r.left}px`);
    el.style.setProperty("--y", `${clientY - r.top}px`);
  };

  const open  = () => ref.current?.style.setProperty("--r", `${radius}px`);
  const close = () => ref.current?.style.setProperty("--r", "0px");

  return (
    <div
      ref={ref}
      className="reveal-headline"
      onMouseMove={(e) => setPos(e.clientX, e.clientY)}
      onMouseEnter={(e) => { setPos(e.clientX, e.clientY); open(); }}
      onMouseLeave={close}
      onTouchStart={(e) => { const t = e.touches[0]; setPos(t.clientX, t.clientY); open(); }}
      onTouchMove={(e) => { const t = e.touches[0]; setPos(t.clientX, t.clientY); }}
      onTouchEnd={close}
    >
      <span className="rh-layer rh-base">{base}</span>
      <span className="rh-layer rh-reveal" aria-hidden="true">{reveal}</span>

      <style>{`
        @property --r { syntax: "<length>"; inherits: false; initial-value: 0px; }
        @property --x { syntax: "<length>"; inherits: false; initial-value: 0px; }
        @property --y { syntax: "<length>"; inherits: false; initial-value: 0px; }

        .reveal-headline {
          --x: 50%; --y: 50%; --r: 0px;
          position: relative;
          display: inline-block;
          font-family: "Source Serif 4", Georgia, serif;
          font-weight: 600;
          font-size: clamp(40px, 8vw, 96px);
          line-height: 1.05;
          letter-spacing: -0.035em;
          cursor: default;
          user-select: none;
          -webkit-user-select: none;
        }
        .reveal-headline .rh-layer {
          display: block;
          margin: 0;
          white-space: nowrap;
        }
        /* base text */
        .reveal-headline .rh-base { color: var(--ink); }
        /* revealed text — gradient fill, masked to a moving circle */
        .reveal-headline .rh-reveal {
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, var(--blue) 0%, var(--amber) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-mask-image: radial-gradient(circle var(--r) at var(--x) var(--y), #000 60%, transparent 100%);
          mask-image: radial-gradient(circle var(--r) at var(--x) var(--y), #000 60%, transparent 100%);
          transition:
            --r 480ms cubic-bezier(0.22, 1, 0.36, 1),
            --x 160ms ease-out,
            --y 160ms ease-out;
          will-change: --r, --x, --y;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-headline .rh-reveal { transition: --r 200ms linear; }
        }
      `}</style>
    </div>
  );
}
