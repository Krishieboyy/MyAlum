import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ArrowRight, Users, Globe, Building2, Rocket } from "lucide-react";
import { alumni } from "../data/mockData";
import AlumniCard from "../components/AlumniCard";

export default function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ background: "#f5f5f4", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#1c1917", borderBottom: "1px solid #292524" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 20px 56px" }}>
          <div style={{ maxWidth: 540 }}>
            <div className="mono" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "#292524", border: "1px solid #44403c",
              borderRadius: 4, padding: "3px 10px", marginBottom: 22,
              color: "#78716c",
            }}>
              <span style={{ color: "#6366f1" }}>●</span> v1.0 · IITG Alumni Network
            </div>

            <h1 style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700, color: "#fafaf9",
              letterSpacing: "-0.03em", lineHeight: 1.15,
              margin: "0 0 14px",
            }}>
              12,400 IITGians.<br />One database.
            </h1>

            <p style={{ color: "#78716c", fontSize: 14, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 420 }}>
              Find alumni by batch, branch, company, or city.
              Connect with founders, researchers, officers, and professors.
            </p>

            <form
              onSubmit={e => { e.preventDefault(); navigate(`/directory?q=${encodeURIComponent(q)}`); }}
              style={{ display: "flex", maxWidth: 460 }}
            >
              <div style={{
                flex: 1, display: "flex", alignItems: "center",
                background: "#292524", border: "1px solid #44403c",
                borderRight: "none", borderRadius: "6px 0 0 6px", padding: "0 12px",
              }}>
                <Search style={{ width: 14, height: 14, color: "#57534e", flexShrink: 0 }} />
                <input
                  value={q} onChange={e => setQ(e.target.value)}
                  placeholder="name, batch, company, branch..."
                  style={{
                    flex: 1, background: "none", border: "none", outline: "none",
                    color: "#e7e5e4", fontSize: 13, padding: "11px 10px",
                    caretColor: "#6366f1",
                  }}
                />
              </div>
              <button type="submit" style={{
                background: "#6366f1", color: "#fff", border: "none",
                borderRadius: "0 6px 6px 0", padding: "0 20px",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Go</button>
            </form>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
              {["CSE 2014", "Founders", "NRI Alumni", "Researchers", "IIT Delhi → IITG"].map(tag => (
                <button key={tag}
                  onClick={() => navigate(`/directory?q=${encodeURIComponent(tag)}`)}
                  style={{
                    background: "none", border: "1px solid #292524",
                    borderRadius: 4, padding: "3px 9px", fontSize: 12,
                    color: "#57534e", cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#a5b4fc"; e.currentTarget.style.borderColor = "#4338ca"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#57534e"; e.currentTarget.style.borderColor = "#292524"; }}
                >{tag}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[
            { n: "12,400+", l: "Alumni registered", icon: Users },
            { n: "48", l: "Countries represented", icon: Globe },
            { n: "3,200+", l: "Companies employing them", icon: Building2 },
            { n: "620", l: "Founders & CEOs", icon: Rocket },
          ].map(({ n, l, icon: Icon }, i) => (
            <div key={l} style={{
              padding: "20px 0", paddingLeft: i > 0 ? 28 : 0,
              borderRight: i < 3 ? "1px solid #f5f5f4" : "none",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <Icon style={{ width: 15, height: 15, color: "#6366f1", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: "#1c1917", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11.5, color: "#a8a29e", marginTop: 3 }}>{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured alumni */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", color: "#1c1917", margin: 0 }}>Featured alumni</h2>
            <span style={{ fontSize: 12, color: "#a8a29e" }}>— hand-picked from the community</span>
          </div>
          <Link to="/directory" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6366f1", textDecoration: "none" }}>
            full directory <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {alumni.slice(0, 3).map((a, i) => <AlumniCard key={a.id} alumni={a} index={i} />)}
        </div>
      </div>

      {/* Feature list */}
      <div style={{ background: "#fff", borderTop: "1px solid #e7e5e4", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 20px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>
            Platform features
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#f5f5f4", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden" }}>
            {[
              { title: "Search & filter", desc: "Batch, branch, company, city, category, NRI status. Public access for basic info." },
              { title: "Admin enrichment", desc: "Pull verified emails and phone numbers for selected alumni. Admin-only, never public." },
              { title: "Full profiles", desc: "Work history, education, campus activities, achievements — everything linked." },
              { title: "Global coverage", desc: "NRI flag, current city, and country tracked. Alumni across 48 countries." },
              { title: "Campus data", desc: "Techniche, Alcheringa, clubs — all campus activity linked to each profile." },
              { title: "Outreach & events", desc: "Batch-specific invites, donation requests, and campus updates pushed directly." },
            ].map(({ title, desc }) => (
              <div key={title} style={{ background: "#fff", padding: "18px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1917", marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 12, color: "#78716c", lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 20px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#a8a29e" }}>MyAlum · IIT Guwahati Alumni Association</span>
        <span className="mono" style={{ color: "#d6d3d1", fontSize: 11 }}>© 2025</span>
      </div>
    </div>
  );
}
