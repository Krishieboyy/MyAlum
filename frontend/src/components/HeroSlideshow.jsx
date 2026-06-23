import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Users, Globe, Building2, Rocket, Award } from "lucide-react";
import { stats } from "../data/mockData";

const SLIDES = [
  {
    key: "welcome",
    title: "The Alumni Network,\nreimagined.",
    subtitle: "Discover achievements, opportunities, and connections from across the IITG community — all in one place.",
    cta: { label: "Explore Directory", to: "/directory" },
    Icon: Users,
    gradient: "linear-gradient(125deg, rgba(120,22,16,0.66) 0%, rgba(234,67,53,0.48) 100%)",
    glow: "rgba(255,95,82,0.42)",
  },
  {
    key: "stats",
    title: "12,400 IITGians.\nOne network.",
    subtitle: "From Guwahati to the world — founders, researchers, civil servants and leaders making an impact.",
    stats: [
      { label: "Alumni",    value: stats.totalAlumni.toLocaleString(), Icon: Users },
      { label: "Countries", value: stats.countries,                    Icon: Globe },
      { label: "Companies", value: stats.companies.toLocaleString(),   Icon: Building2 },
      { label: "Founders",  value: stats.founders,                     Icon: Rocket },
    ],
    Icon: Globe,
    gradient: "linear-gradient(125deg, rgba(12,32,72,0.66) 0%, rgba(66,133,244,0.48) 100%)",
    glow: "rgba(120,170,255,0.45)",
  },
  {
    key: "spotlight",
    title: "Arjun Sharma\nForbes 30 Under 30.",
    subtitle: "Co-Founder & CEO of TechVentures India, CSE '14 — building the future of EdTech for millions of students.",
    cta: { label: "Read the story", to: "/profile/1" },
    Icon: Award,
    gradient: "linear-gradient(125deg, rgba(74,52,6,0.72) 0%, rgba(251,188,5,0.42) 100%)",
    glow: "rgba(255,210,80,0.42)",
  },
  {
    key: "opportunities",
    title: "Find your next\nopportunity.",
    subtitle: "Internships, referrals and resources shared directly by seniors who've been exactly where you are.",
    cta: { label: "Browse Placements", to: "/placements" },
    Icon: Rocket,
    gradient: "linear-gradient(125deg, rgba(10,52,30,0.66) 0%, rgba(52,168,83,0.46) 100%)",
    glow: "rgba(90,222,140,0.42)",
  },
];

const DURATION = 6000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback((i) => setIndex((i + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setIndex(i => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex(i => (i - 1 + SLIDES.length) % SLIDES.length), []);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, DURATION);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, next]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        height: 300,
        border: "1px solid var(--rule)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
      }}
    >
      {/* Sliding track */}
      <div style={{
        display: "flex",
        height: "100%",
        width: `${SLIDES.length * 100}%`,
        transform: `translateX(-${index * (100 / SLIDES.length)}%)`,
        transition: "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)",
      }}>
        {SLIDES.map((s, i) => {
          const active = i === index;
          const BigIcon = s.Icon;
          return (
            <div key={s.key} style={{
              width: `${100 / SLIDES.length}%`,
              height: "100%",
              position: "relative",
              background: s.gradient,
              WebkitBackdropFilter: "blur(14px) saturate(150%)",
              backdropFilter: "blur(14px) saturate(150%)",
              overflow: "hidden",
            }}>
              {/* Decorative glow */}
              <div style={{
                position: "absolute", right: -60, top: -60,
                width: 360, height: 360, borderRadius: "50%",
                background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />
              {/* Giant faint icon */}
              <BigIcon style={{
                position: "absolute", right: 36, top: "50%", transform: "translateY(-50%)",
                width: 220, height: 220, color: "rgba(255,255,255,0.08)", strokeWidth: 1,
                pointerEvents: "none",
              }} />

              {/* Content */}
              <div style={{
                position: "relative", height: "100%",
                display: "flex", flexDirection: "column", justifyContent: "center",
                padding: "0 clamp(28px, 5vw, 64px)", maxWidth: 760,
                opacity: active ? 1 : 0,
                transform: active ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 600ms ease 150ms, transform 600ms ease 150ms",
              }}>
                <h2 style={{
                  fontFamily: "var(--font-sans)", fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 700,
                  color: "#fff", margin: "0 0 12px", lineHeight: 1.12, letterSpacing: "-0.025em",
                  whiteSpace: "pre-line",
                }}>
                  {s.title}
                </h2>

                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.6, maxWidth: 480 }}>
                  {s.subtitle}
                </p>

                {/* Inline stats */}
                {s.stats && (
                  <div style={{ display: "flex", gap: "clamp(18px, 3vw, 40px)", marginTop: 20 }}>
                    {s.stats.map(({ label, value, Icon }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Icon style={{ width: 18, height: 18, color: "rgba(255,255,255,0.7)", flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
                          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                {s.cta && (
                  <Link to={s.cta.to} style={{
                    display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start",
                    marginTop: 22, padding: "10px 20px", background: "#fff", color: "#1a1a1a",
                    textDecoration: "none", borderRadius: 8, fontSize: 13.5, fontWeight: 600,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.18)", transition: "transform 150ms ease",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                    {s.cta.label} <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      {[{ dir: "prev", Icon: ChevronLeft, side: { left: 14 } }, { dir: "next", Icon: ChevronRight, side: { right: 14 } }].map(({ dir, Icon, side }) => (
        <button key={dir} onClick={dir === "next" ? next : prev} aria-label={dir}
          style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)", ...side,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(6px)", color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 150ms ease",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.28)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}>
          <Icon style={{ width: 18, height: 18 }} />
        </button>
      ))}

      {/* Dots + progress */}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, alignItems: "center" }}>
        {SLIDES.map((s, i) => (
          <button key={s.key} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
            style={{
              height: 6, borderRadius: 99, border: "none", cursor: "pointer", padding: 0,
              width: i === index ? 28 : 6,
              background: i === index ? "#fff" : "rgba(255,255,255,0.45)",
              transition: "width 300ms ease, background 300ms ease",
              position: "relative", overflow: "hidden",
            }}>
            {i === index && !paused && (
              <span key={`p-${index}`} style={{
                position: "absolute", inset: 0, transformOrigin: "left",
                background: "rgba(255,255,255,0.55)",
                animation: `heroProgress ${DURATION}ms linear forwards`,
              }} />
            )}
          </button>
        ))}
      </div>

      <style>{`@keyframes heroProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </div>
  );
}
