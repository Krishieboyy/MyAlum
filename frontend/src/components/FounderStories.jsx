import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { serif, mono, avatarBg } from "../theme";

/* ── Data-driven: add entries without touching layout ── */
const STORIES = [
  { id: 1, name: "Arjun Sharma", avatar: "AS", category: "FOUNDER",
    duringTag: "CSE · 2010–14", duringCaption: "Arjun led the Coding Club and built his first startup from a Lohit hostel room.",
    nowTag: "Co-Founder & CEO", nowCaption: "Built TechVentures India into an EdTech platform serving 2M+ students. Forbes 30 Under 30." },
  { id: 2, name: "Priya Nair", avatar: "PN", category: "RESEARCHER",
    duringTag: "ECE · 2012–16", duringCaption: "Vice President of the Robotics Club, tinkering with autonomous bots for Techniche.",
    nowTag: "Research Scientist", nowCaption: "Now at MIT Media Lab leading a human–robot interaction group backed by a $2.4M NSF grant." },
  { id: 4, name: "Sneha Kapoor", avatar: "SK", category: "GOVT OFFICER",
    duringTag: "CE · 2009–13", duringCaption: "NSS secretary who organised rural infrastructure drives around Guwahati.",
    nowTag: "Deputy Director, NITI Aayog", nowCaption: "Authoring India's urban infrastructure framework for 2030. IAS, AIR 23." },
  { id: 5, name: "Vikram Reddy", avatar: "VR", category: "BUSINESSMAN",
    duringTag: "CHE · 2005–09", duringCaption: "Founded the campus Entrepreneurship Cell long before it was fashionable.",
    nowTag: "Managing Director", nowCaption: "Scaling Reddy Pharma Group across 14 states, targeting ₹500 Cr in revenue." },
  { id: 6, name: "Dr. Ananya Bose", avatar: "AB", category: "PROFESSOR",
    duringTag: "MA · 2006–10", duringCaption: "President of the Mathematics Club, lost in number theory problem sets.",
    nowTag: "Associate Professor, IIT Delhi", nowCaption: "A Ramanujan Fellow advancing research in analytic number theory." },
  { id: 3, name: "Rahul Gupta", avatar: "RG", category: "EMPLOYEE",
    duringTag: "ME · 2008–12", duringCaption: "Team lead at SAE IITG, building combustion engines for student competitions.",
    nowTag: "Sr. Engineering Manager", nowCaption: "Leading the EV powertrain division at Tata Motors — a CII Excellence Award winner." },
  { id: 7, name: "Rohan Mehta", avatar: "RM", category: "EMPLOYEE",
    duringTag: "CSE · 2011–15", duringCaption: "Coding Club president who lived for late-night hackathons in the lab.",
    nowTag: "Staff Software Engineer", nowCaption: "Now at Google in San Francisco, building large-scale distributed AI systems." },
  { id: 8, name: "Aisha Kidwai", avatar: "AK", category: "EMPLOYEE",
    duringTag: "MA · 2013–17", duringCaption: "Finance Club coordinator who modelled markets between problem sets.",
    nowTag: "Vice President, Quant", nowCaption: "A VP at Goldman Sachs in London — one of Top 30 Quant Minds Under 30." },
  { id: 9, name: "Tanmay Sen", avatar: "TS", category: "EMPLOYEE",
    duringTag: "ECE · 2015–19", duringCaption: "Media lead for Alcheringa, shooting the fest by night and coding by day.",
    nowTag: "Sr. Engineering Manager", nowCaption: "Leading engineering teams at Grab in Singapore across Southeast Asia." },
  { id: 13, name: "Kenji Tanaka", avatar: "KT", category: "RESEARCHER",
    duringTag: "ECE · 2017–21", duringCaption: "Robotics Club core team, obsessed with computer vision pipelines.",
    nowTag: "AI Vision Scientist", nowCaption: "Pushing the frontier of perception research at Sony Research Labs, Tokyo." },
  { id: 15, name: "Aditya Varma", avatar: "AV", category: "EMPLOYEE",
    duringTag: "CE · 2010–14", duringCaption: "Operations lead at SAE IITG who loved logistics and big builds.",
    nowTag: "Director of Infrastructure", nowCaption: "Director at Jio Platforms in Mumbai, scaling India's digital backbone." },
  { id: 19, name: "Divya Teja", avatar: "DT", category: "EMPLOYEE",
    duringTag: "ME · 2014–18", duringCaption: "Chief mechanic for SAE IITG, hand-tuning race cars in the workshop.",
    nowTag: "Sr. Battery Design Engineer", nowCaption: "Designing next-gen battery systems at Tesla in Austin, Texas." },
];

const N = STORIES.length;
const ROW = 104;                 // scroll-distance unit per company (px)
const FADE = [1, 0.18, 0.09, 0.04, 0];
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Interpolated opacity by distance (in rows) from the active/center row
function fadeAt(dist) {
  if (dist >= 4) return 0;
  const lo = Math.floor(dist), hi = Math.min(4, lo + 1), f = dist - lo;
  return FADE[lo] + (FADE[hi] - FADE[lo]) * f;
}

/* ── Polished gradient placeholder used in place of real photos ── */
function PhotoPlaceholder({ story, variant }) {
  const past = variant === "during";
  const accent = avatarBg(story.category);
  const bg = past
    ? "linear-gradient(150deg, #ece9e2 0%, #d8d3c8 100%)"
    : `linear-gradient(150deg, ${accent} 0%, ${accent}cc 60%, #0a0e1a 140%)`;
  return (
    <div style={{
      position: "absolute", inset: 0, background: bg,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      filter: past ? "saturate(0.55)" : "none",
    }}>
      <div style={{
        width: 96, height: 96, borderRadius: "50%",
        background: past ? "rgba(28,27,25,0.10)" : "rgba(255,255,255,0.16)",
        border: past ? "2px solid rgba(28,27,25,0.18)" : "2px solid rgba(255,255,255,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 34, fontWeight: 600,
        color: past ? "rgba(28,27,25,0.55)" : "#fff",
      }}>
        {story.avatar}
      </div>
      <span style={{ ...mono, fontSize: 11, letterSpacing: "0.12em", marginTop: 16, color: past ? "rgba(28,27,25,0.5)" : "rgba(255,255,255,0.8)" }}>
        {past ? story.duringTag : story.nowTag.toUpperCase()}
      </span>
    </div>
  );
}

/* ── Stacked, crossfading photo card (contents swap; card never moves) ── */
function PhotoCard({ label, variant, activeIndex, align }) {
  return (
    <div style={{
      width: "100%", maxWidth: 540, minWidth: 0,
      marginLeft: align === "right" ? "auto" : 0,
      marginRight: align === "left" ? "auto" : 0,
    }}>
      <p style={{ ...serif, fontStyle: "italic", fontSize: 22, color: "var(--ink)", textAlign: "center", margin: "0 0 24px" }}>
        {label}
      </p>
      <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", borderRadius: 8, overflow: "hidden", boxShadow: "0 12px 24px rgba(0,0,0,0.10)" }}>
        {STORIES.map((s, i) => (
          <div key={s.id} style={{ opacity: i === activeIndex ? 1 : 0, transition: "opacity 350ms ease" }}>
            <PhotoPlaceholder story={s} variant={variant} />
          </div>
        ))}
      </div>
      <div style={{ position: "relative", marginTop: 20, minHeight: 56, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
        {STORIES.map((s, i) => (
          <p key={s.id} style={{
            position: "absolute", inset: 0, margin: 0,
            ...serif, fontSize: 16, lineHeight: 1.5, color: "var(--sub)", textAlign: "center",
            opacity: i === activeIndex ? 1 : 0, transition: "opacity 350ms ease",
          }}>
            {variant === "during" ? s.duringCaption : s.nowCaption}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ── Layer 3 logo column: alumni names as colored wordmarks, staggered fade-in ── */
function LogoColumn({ items, p, startGlobal }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "34px 20px", alignContent: "center" }}>
      {items.map((s, idx) => {
        const g = startGlobal + idx;
        const start = 0.62 + (g / N) * 0.24;        // staggered 0.62 → 0.86 (after the last person)
        const t = clamp01((p - start) / 0.1);
        return (
          <Link key={s.id} to={`/profile/${s.id}`}
            style={{
              ...serif, fontSize: "clamp(14px, 1.4vw, 20px)", fontWeight: 600,
              color: avatarBg(s.category), textDecoration: "none", textAlign: "center",
              letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              opacity: t * 0.95,
              filter: `blur(${(1 - t) * 4}px)`,
              transform: `translateY(${(1 - t) * 10}px)`,
              pointerEvents: t > 0.6 ? "auto" : "none",
            }}>
            {s.name}
          </Link>
        );
      })}
    </div>
  );
}

export default function FounderStories() {
  const sectionRef = useRef(null);
  const [scroll, setScroll] = useState(0); // 0..1 progress through the pinned section
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 900);

  // Derived scroll-driven values (sequenced so layers hand off cleanly)
  const p          = scroll;
  const nameP      = clamp01(p / 0.5);                  // names scroll through the first half
  const floatIndex = Math.min(nameP * N, N - 1);       // last person holds at center (then cleared via fade)
  const activeIndex = Math.min(N - 1, Math.max(0, Math.round(floatIndex)));
  const cardsT     = clamp01(1 - (p - 0.52) / 0.14);  // cards stay bright through the last person, then fade
  const namesT     = clamp01(1 - (p - 0.56) / 0.12);  // last person rests, then names fade out
  const headP      = ease(clamp01((p - 0.6) / 0.28));  // headline hidden until names clear, then resolves slowly
  const linkT      = clamp01((p - 0.84) / 0.1);        // "All alumni" appears with the grid

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const recompute = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const navH = document.querySelector("nav")?.offsetHeight ?? 56;
    const stickyH = window.innerHeight - navH;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - stickyH;
    const progress = scrollable > 0 ? (navH - rect.top) / scrollable : 0;
    setScroll(clamp01(progress));
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { recompute(); ticking = false; });
    };
    recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
    };
  }, [isMobile, recompute]);

  /* ── Mobile: stacked cards + simple finale, no pinning ── */
  if (isMobile) {
    return (
      <section style={{ padding: "8px 0 16px" }}>
        <QuoteIntro />
        <div style={{ display: "flex", flexDirection: "column", gap: 28, padding: "0 20px" }}>
          {STORIES.map(s => (
            <Link key={s.id} to={`/profile/${s.id}`} className="record-card" style={{ overflow: "hidden", textDecoration: "none" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                {["during", "now"].map(v => (
                  <div key={v} style={{ position: "relative", aspectRatio: "1 / 1" }}>
                    <PhotoPlaceholder story={s} variant={v} />
                  </div>
                ))}
              </div>
              <div style={{ padding: "14px 16px" }}>
                <h3 style={{ ...serif, fontSize: 20, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>{s.name}</h3>
                <p style={{ fontSize: 13, color: "var(--sub)", margin: 0, lineHeight: 1.6 }}>{s.nowCaption}</p>
              </div>
            </Link>
          ))}
        </div>
        <MobileFinale />
      </section>
    );
  }

  /* ── Desktop: quote intro → pinned 3-layer scrollytelling → drop-cap paragraph ── */
  const navOffset = "var(--nav-height, 56px)";
  const half = Math.ceil(N / 2);
  const left = STORIES.slice(0, half);
  const right = STORIES.slice(half);

  return (
    <>
      <QuoteIntro navOffset={navOffset} />

      <section ref={sectionRef} style={{ height: `calc(${N * ROW}px + 260vh)`, position: "relative" }}>
        <div style={{
          position: "sticky", top: navOffset, height: `calc(100vh - ${navOffset})`,
          overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center",
        }}>

          {/* ── LAYER 3 — valuation headline + logo grid (pinned, scroll-driven) ── */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            display: "grid", gridTemplateColumns: "1fr minmax(300px, 380px) 1fr",
            gap: "clamp(24px, 4vw, 56px)", alignItems: "center",
            maxWidth: 1480, margin: "0 auto", width: "100%", padding: "0 48px",
          }}>
            <LogoColumn items={left} p={p} startGlobal={0} />

            {/* Center headline — faint behind names, resolving to full prominence */}
            <div style={{
              textAlign: "center",
              opacity: headP,
              transform: `scale(${lerp(0.85, 1, headP)})`,
              transition: "opacity 80ms linear, transform 80ms linear",
            }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", lineHeight: 1 }}>
                $84&nbsp;Billion+
              </div>
              <div style={{ ...serif, fontStyle: "italic", fontSize: "clamp(15px, 1.8vw, 21px)", color: "var(--sub)", marginTop: 12 }}>
                in alumni-led company value
              </div>
              <Link to="/directory" style={{
                display: "inline-flex", alignItems: "center", gap: 6, marginTop: 22,
                ...serif, fontSize: 16, color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 4,
                opacity: linkT, transform: `translateY(${(1 - linkT) * 8}px)`,
                pointerEvents: linkT > 0.6 ? "auto" : "none",
              }}>
                All alumni →
              </Link>
            </div>

            <LogoColumn items={right} p={p} startGlobal={half} />
          </div>

          {/* ── LAYER 1 + 2 — cards (fade out) and center name list (scrolls) ── */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "grid", gridTemplateColumns: "1fr minmax(280px, 380px) 1fr",
            gap: "clamp(40px, 5vw, 64px)", alignItems: "center",
            maxWidth: 1480, margin: "0 auto", width: "100%", padding: "0 48px",
            pointerEvents: "none",
          }}>
            {/* Left card */}
            <div style={{
              opacity: cardsT, transform: `translateY(${(1 - cardsT) * -30}px)`,
              transition: "opacity 80ms linear, transform 80ms linear",
              pointerEvents: cardsT > 0.5 ? "auto" : "none",
            }}>
              <PhotoCard label="During IITG" variant="during" activeIndex={activeIndex} align="left" />
            </div>

            {/* Center name list */}
            <div style={{
              position: "relative", height: "min(70vh, 660px)",
              opacity: namesT,
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 40%, #000 60%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, #000 40%, #000 60%, transparent 100%)",
              overflow: "hidden", pointerEvents: "auto",
            }}>
              <div style={{
                position: "absolute", left: 0, right: 0, top: "50%",
                transform: `translateY(${-(floatIndex * ROW + ROW / 2)}px)`,
                transition: "transform 100ms linear",
              }}>
                {STORIES.map((s, i) => {
                  const dist = Math.abs(i - floatIndex);
                  const isActive = i === activeIndex;
                  const o = fadeAt(dist);
                  return (
                    <Link key={s.id} to={`/profile/${s.id}`}
                      style={{
                        height: ROW, display: "flex", alignItems: "center", justifyContent: "center",
                        textDecoration: "none", textAlign: "center", ...serif,
                        fontSize: isActive ? "clamp(34px, 4.4vw, 56px)" : "clamp(28px, 3.6vw, 48px)",
                        fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ink)",
                        opacity: o,
                        transform: `scale(${lerp(0.78, 1, clamp01(1 - dist * 0.5))})`,
                        filter: `blur(${Math.min(2, dist * 0.9)}px)`,
                        transition: "opacity 250ms ease, font-size 250ms ease",
                        whiteSpace: "nowrap",
                        pointerEvents: isActive ? "auto" : "none",
                      }}>
                      {s.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right card */}
            <div style={{
              opacity: cardsT, transform: `translateY(${(1 - cardsT) * -30}px)`,
              transition: "opacity 80ms linear, transform 80ms linear",
              pointerEvents: cardsT > 0.5 ? "auto" : "none",
            }}>
              <PhotoCard label="Now" variant="now" activeIndex={activeIndex} align="right" />
            </div>
          </div>
        </div>
      </section>

      {/* Trailing body paragraph with drop-cap (normal scroll) */}
      <DropCapParagraph />
    </>
  );
}

/* ── Full-page quote intro ── */
function QuoteIntro({ navOffset = "var(--nav-height, 56px)" }) {
  return (
    <div style={{
      minHeight: `calc(100vh - ${navOffset})`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "60px 28px", position: "relative",
    }}>
      <h2 style={{ ...serif, fontSize: "clamp(34px, 6vw, 76px)", fontWeight: 500, lineHeight: 1.12, letterSpacing: "-0.03em", color: "var(--ink)", margin: 0, maxWidth: 960 }}>
        IIT Guwahati turns students<br />into <em style={{ fontStyle: "italic" }}>formidable founders</em>
        <sup style={{ fontSize: "0.34em", verticalAlign: "super", color: "var(--sub)", fontStyle: "normal", marginLeft: 2 }}>[1]</sup>
      </h2>
      <div style={{ maxWidth: 540, marginTop: 44 }}>
        <p style={{ ...serif, fontStyle: "italic", fontSize: "clamp(15px, 1.7vw, 20px)", lineHeight: 1.65, color: "var(--sub)", margin: 0, textAlign: "left" }}>
          <span style={{ marginRight: 8 }}>[1]</span>
          “A formidable person is one who seems like they’ll get what they want, regardless of whatever obstacles are in the way.”
        </p>
        <p style={{ ...serif, fontStyle: "italic", fontSize: "clamp(14px, 1.5vw, 18px)", color: "var(--sub)", margin: "14px 0 0", textAlign: "right" }}>
          — Paul Graham
        </p>
      </div>
      <ChevronDown style={{ position: "absolute", bottom: 30, width: 24, height: 24, color: "var(--sub)", opacity: 0.6, animation: "founderBounce 1.8s ease-in-out infinite" }} />
      <style>{`@keyframes founderBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(7px); } }`}</style>
    </div>
  );
}

/* ── Trailing drop-cap paragraph ── */
function DropCapParagraph() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} style={{ maxWidth: 1480, margin: "0 auto", padding: "20px 40px 90px" }}>
      <p className="founder-dropcap" style={{
        maxWidth: 760, margin: "0 auto", ...serif, fontSize: 18, lineHeight: 1.7, color: "var(--ink)",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 700ms ease, transform 700ms ease",
      }}>
        Since 1994, IIT Guwahati has turned curious students into founders, researchers, civil
        servants and leaders across the globe. From hostel-room prototypes to boardrooms and
        research labs, the same restless ambition runs through every batch — and this network
        exists to keep that thread alive, connecting the people who were once exactly where you
        are now to the ones who will follow.
      </p>
      <style>{`.founder-dropcap::first-letter { font-size: 3em; float: left; line-height: 0.8; padding-right: 10px; font-weight: 600; color: var(--ink); }`}</style>
    </section>
  );
}

/* ── Mobile finale ── */
function MobileFinale() {
  return (
    <div style={{ textAlign: "center", padding: "48px 20px 8px" }}>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(38px, 11vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", lineHeight: 1 }}>
        $84&nbsp;Billion+
      </div>
      <div style={{ ...serif, fontStyle: "italic", fontSize: 17, color: "var(--sub)", marginTop: 10 }}>
        in alumni-led company value
      </div>
      <Link to="/directory" style={{ display: "inline-flex", marginTop: 18, ...serif, fontSize: 16, color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 4 }}>
        All alumni →
      </Link>
    </div>
  );
}
