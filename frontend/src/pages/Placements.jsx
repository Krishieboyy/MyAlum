import { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { placements } from "../data/mockData";
import { serif, mono } from "../theme";

const TYPES = ["ALL", "INTERN", "FULL-TIME"];

const TYPE_STYLE = {
  "INTERN":    ["#EEF2F8", "#1B3A66", "#B8C8DF"],
  "FULL-TIME": ["#EDFAF3", "#2E7D5B", "#9ACFB8"],
};
function typeStyle(t) {
  const [bg, color, border] = TYPE_STYLE[t] || ["#F5F5F4", "#6B6963", "#E4E1DA"];
  return { background: bg, color, borderColor: border };
}

function deadlineDays(d) {
  const diff = Math.ceil((new Date(d) - new Date()) / 86400000);
  if (diff < 0)  return { label: "CLOSED",   color: "var(--red)" };
  if (diff <= 7) return { label: `${diff}D`,  color: "var(--amber)" };
  return           { label: `${diff}D`,        color: "var(--sub)" };
}

export default function Placements() {
  const [active, setActive] = useState("ALL");

  const filtered = active === "ALL" ? placements : placements.filter(p => p.type === active);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 4 }}>
          <h1 style={{ ...serif, fontSize: 20, fontWeight: 500, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>Placements</h1>
          <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>— referrals & opportunities shared by alumni</span>
        </div>
        <p style={{ fontSize: 13, color: "var(--sub)", margin: "0 0 20px", lineHeight: 1.6, maxWidth: 520 }}>
          Internships and full-time roles posted by IITG alumni. Reach out through the alumni portal for referrals.
        </p>
        <div className="rule" style={{ marginBottom: 20 }} />

        {/* ── Filter ── */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {TYPES.map(t => (
            <button key={t} onClick={() => setActive(t)}
              style={{ ...mono, fontSize: 10, letterSpacing: "0.08em", padding: "5px 12px", borderRadius: 3, border: "1px solid", borderColor: active === t ? "var(--blue)" : "var(--rule)", background: active === t ? "#EEF2F8" : "var(--surface)", color: active === t ? "var(--blue)" : "var(--sub)", cursor: "pointer" }}>
              {t}
            </button>
          ))}
          <span style={{ ...mono, fontSize: 10, color: "var(--sub)", marginLeft: "auto", alignSelf: "center" }}>
            {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Listings ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {filtered.map(p => {
            const ts    = typeStyle(p.type);
            const dl    = deadlineDays(p.deadline);
            const initials = p.sharedBy.split(" ").map(w => w[0]).join("");
            return (
              <div key={p.id} style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden", transition: "border-color 180ms" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--blue)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--rule)"}>

                <div style={{ padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 16 }}>
                  {/* Company initial block */}
                  <div style={{ width: 40, height: 40, borderRadius: 3, background: ts.background, border: `1px solid ${ts.borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ ...mono, fontSize: 13, color: ts.color, fontWeight: 500 }}>{p.company[0]}</span>
                  </div>

                  <div style={{ flex: 1 }}>
                    {/* Top row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span className="badge" style={{ ...ts, fontSize: 9 }}>{p.type}</span>
                      <span style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>{p.season}</span>
                      <span style={{ ...mono, fontSize: 10, color: dl.color, marginLeft: "auto", letterSpacing: "0.06em" }}>
                        <Clock style={{ width: 9, height: 9, display: "inline", marginRight: 3 }} />
                        DEADLINE · {dl.label}
                      </span>
                    </div>

                    {/* Role + company */}
                    <p style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", margin: "0 0 2px" }}>{p.role}</p>
                    <p style={{ ...mono, fontSize: 11.5, color: "var(--sub)", margin: "0 0 8px", letterSpacing: "0.02em" }}>{p.company}</p>

                    {/* Meta row */}
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                        <MapPin style={{ width: 10, height: 10 }} />{p.location}
                      </span>
                      <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                        {p.stipend}
                      </span>
                      <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                        {p.branches.join(" · ")}
                      </span>
                    </div>

                    {/* Alumni note */}
                    <div style={{ background: "var(--paper)", borderLeft: "2px solid var(--rule)", paddingLeft: 10, marginBottom: 8 }}>
                      <p style={{ fontSize: 12.5, color: "var(--sub)", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
                        "{p.note}"
                      </p>
                    </div>

                    {/* Posted by */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#6B6963", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 7, fontWeight: 600 }}>
                        {initials}
                      </div>
                      <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                        {p.sharedBy} · {p.sharedBatch}
                      </span>
                    </div>
                  </div>

                  {/* Apply CTA */}
                  <button style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--blue)", border: "none", borderRadius: 3, padding: "7px 14px", fontSize: 12, color: "#fff", cursor: "pointer", flexShrink: 0, fontWeight: 500 }}>
                    Apply <ArrowUpRight style={{ width: 11, height: 11 }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Post opportunity CTA ── */}
        <div className="dotted-grid" style={{ marginTop: 24, border: "1px solid var(--rule)", borderRadius: 3, padding: "28px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", margin: "0 0 4px", textTransform: "uppercase" }}>Alumni</p>
            <p style={{ fontSize: 14, color: "var(--ink)", margin: 0 }}>Hiring or can refer? Post an opportunity for juniors</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--blue)", border: "none", borderRadius: 3, padding: "9px 18px", fontSize: 13, color: "#fff", cursor: "pointer", fontWeight: 500 }}>
            Post listing <ArrowUpRight style={{ width: 12, height: 12 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
