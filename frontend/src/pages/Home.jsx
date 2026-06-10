import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ArrowRight, Users, Globe, Building2, Rocket } from "lucide-react";
import { alumni } from "../data/mockData";
import AlumniCard from "../components/AlumniCard";
import { serif, mono, T, catBadge, avatarBg } from "../theme";

export default function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{ background: "var(--blue)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 56px" }}>
          <div style={{ maxWidth: 560 }}>

            {/* Version pill */}

            <h1 style={{ ...serif, fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12, margin: "0 0 16px" }}>
              12,400 IITGians.<br />One database.
            </h1>

            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "0 0 32px", maxWidth: 400 }}>
              Find alumni by batch, branch, company, or city.
              Connect with founders, researchers, civil servants, and professors.
            </p>

            {/* Search */}
            <form onSubmit={e => { e.preventDefault(); navigate(`/directory?q=${encodeURIComponent(q)}`); }}
              style={{ display: "flex", maxWidth: 480, marginBottom: 16 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRight: "none", borderRadius: "3px 0 0 3px", padding: "0 14px" }}>
                <Search style={{ width: 13, height: 13, color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                <input value={q} onChange={e => setQ(e.target.value)}
                  placeholder="name, batch, company, branch…"
                  style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 13, padding: "11px 10px", caretColor: "var(--amber)" }}
                />
              </div>
              <button type="submit" style={{ background: "var(--amber)", color: "#fff", border: "none", borderRadius: "0 3px 3px 0", padding: "0 22px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em" }}>
                Search
              </button>
            </form>

            {/* Quick filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["CSE 2014", "Founders", "NRI Alumni", "Researchers", "Govt Officers"].map(tag => (
                <button key={tag}
                  onClick={() => navigate(`/directory?q=${encodeURIComponent(tag)}`)}
                  style={{ ...mono, background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 3, padding: "3px 9px", fontSize: 10.5, color: "rgba(255,255,255,0.38)", cursor: "pointer", letterSpacing: "0.04em", transition: "border-color 120ms, color 120ms" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.38)"; }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--rule)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { n: "12,400+", l: "Alumni registered", icon: Users },
            { n: "48",      l: "Countries",          icon: Globe },
            { n: "3,200+", l: "Companies",           icon: Building2 },
            { n: "620",    l: "Founders & CEOs",     icon: Rocket },
          ].map(({ n, l, icon: Icon }, i) => (
            <div key={l} style={{ padding: "20px 0", paddingLeft: i > 0 ? 28 : 0, borderRight: i < 3 ? "1px solid var(--rule)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
              <Icon style={{ width: 14, height: 14, color: "var(--blue)", flexShrink: 0, opacity: 0.7 }} />
              <div>
                <div style={{ ...mono, fontSize: 22, fontWeight: 500, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em" }}>{n}</div>
                <div style={{ fontSize: 11.5, color: "var(--sub)", marginTop: 3 }}>{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured alumni — editorial ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <h2 style={{ ...serif, fontSize: 22, fontWeight: 500, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              Alumni spotlight
            </h2>
            <span style={{ fontSize: 12, color: "var(--sub)" }}>— selected from the community</span>
          </div>
          <Link to="/directory" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--blue)", textDecoration: "none", fontWeight: 500 }}>
            Full directory <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        </div>

        {/* Hairline under heading */}
        <div className="rule" style={{ marginBottom: 24 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {alumni.slice(0, 3).map(a => <AlumniCard key={a.id} alumni={a} />)}
        </div>
      </div>

      {/* ── Platform features — text grid on dotted bg ── */}
      <div style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="dotted-grid" style={{ padding: "2px 0" }}>
          <div style={{ background: "var(--surface)", maxWidth: 1200, margin: "0 auto", borderLeft: "1px solid var(--rule)", borderRight: "1px solid var(--rule)" }}>
            <div style={{ padding: "36px 24px 12px" }}>
              <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Platform features</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
              {[
                { title: "Search & filter",     desc: "Batch, branch, company, city, category, NRI status. Public access for basic info." },
                { title: "Admin enrichment",    desc: "Pull verified emails and phone numbers for selected alumni. Admin-only, never public." },
                { title: "Full profiles",       desc: "Complete work history, education, campus activities, achievements — all linked." },
                { title: "Global coverage",     desc: "NRI flag, current city and country tracked. Alumni across 48 countries." },
                { title: "Campus data",         desc: "Techniche, Alcheringa, clubs — all campus activity linked to each profile." },
                { title: "Outreach & events",   desc: "Batch-specific invites, donation requests, and campus updates pushed directly." },
              ].map(({ title, desc }, i) => (
                <div key={title} style={{ padding: "20px 24px 24px", borderRight: (i % 3 < 2) ? "1px solid var(--rule)" : "none", borderBottom: i < 3 ? "1px solid var(--rule)" : "none" }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 12.5, color: "var(--sub)", lineHeight: 1.7 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--sub)" }}>MyAlum · IIT Guwahati Alumni Association</span>
        <span style={{ ...mono, fontSize: 10.5, color: "var(--rule)", letterSpacing: "0.06em" }}>© 2025</span>
      </div>
    </div>
  );
}
