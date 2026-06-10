import { Link } from "react-router-dom";
import { ArrowRight, Users, Globe, Building2, Rocket, Bell, BookOpen, MapPin } from "lucide-react";
import { alumni, stats } from "../data/mockData";
import AlumniCard from "../components/AlumniCard";
import { serif, mono, catBadge, avatarBg } from "../theme";

const currentUser = alumni[0];

export default function Dashboard() {

  const StatRow = ({ label, value }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--rule)" }}>
      <span style={{ fontSize: 12, color: "var(--sub)" }}>{label}</span>
      <span style={{ ...mono, fontSize: 13, color: "var(--ink)" }}>{value}</span>
    </div>
  );

  const updates = [
    { type: "BATCH", text: "CSE 2014 batch reunion — Bangalore · Jul 2025", date: "12 Jun" },
    { type: "FORUM", text: "New thread: 'Breaking into deep tech startups'", date: "10 Jun" },
    { type: "ALUMNI", text: "Priya Nair published a note on her MIT research", date: "8 Jun" },
    { type: "EVENT", text: "Alcheringa 2025 invites alumni participation", date: "5 Jun" },
  ];

  const typeColor = { BATCH: "var(--blue)", FORUM: "var(--amber)", ALUMNI: "var(--green)", EVENT: "var(--sub)" };

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <h1 style={{ ...serif, fontSize: 22, fontWeight: 500, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>Dashboard</h1>
            <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>— logged in as ARJUN · CSE·14</span>
          </div>
          <div className="rule" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16 }}>

          {/* ── Main column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* My record card */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--rule)" }}>
                <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase" }}>My record</span>
              </div>
              <div style={{ padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: 18 }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: avatarBg(currentUser.category), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
                  {currentUser.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ ...serif, fontSize: 18, fontWeight: 500, color: "var(--ink)", margin: "0 0 3px", letterSpacing: "-0.015em" }}>{currentUser.name}</p>
                  <p style={{ fontSize: 12.5, color: "var(--sub)", margin: "0 0 10px" }}>{currentUser.currentCompany.position} · {currentUser.currentCompany.name}</p>
                  <div style={{ display: "flex", gap: 16 }}>
                    {[
                      { l: "Card", v: currentUser.alumniCardId },
                      { l: "Batch", v: `${currentUser.startYear}–${currentUser.endYear}` },
                      { l: "Branch", v: "CSE" },
                      { l: "City", v: currentUser.currentCity },
                    ].map(({ l, v }) => (
                      <div key={l}>
                        <div style={{ ...mono, fontSize: 9, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>{l}</div>
                        <div style={{ ...mono, fontSize: 11, color: "var(--ink)" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to={`/profile/${currentUser.id}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--blue)", textDecoration: "none", fontWeight: 500, flexShrink: 0 }}>
                  View profile <ArrowRight style={{ width: 11, height: 11 }} />
                </Link>
              </div>
            </div>

            {/* Activity feed */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <Bell style={{ width: 12, height: 12, color: "var(--sub)" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Updates</span>
              </div>
              {updates.map((u, i) => (
                <div key={i} style={{ padding: "12px 20px", borderBottom: i < updates.length - 1 ? "1px solid var(--rule)" : "none", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ ...mono, fontSize: 9, color: typeColor[u.type], letterSpacing: "0.08em", background: `${typeColor[u.type]}18`, border: `1px solid ${typeColor[u.type]}30`, borderRadius: 3, padding: "2px 6px", flexShrink: 0, marginTop: 1 }}>
                    {u.type}
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--ink)", flex: 1, lineHeight: 1.5 }}>{u.text}</span>
                  <span style={{ ...mono, fontSize: 10, color: "var(--sub)", flexShrink: 0 }}>{u.date}</span>
                </div>
              ))}
            </div>

            {/* Browse section */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Recent profiles</span>
                <Link to="/directory" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--blue)", textDecoration: "none" }}>
                  Full directory <ArrowRight style={{ width: 11, height: 11 }} />
                </Link>
              </div>
              <div className="rule" style={{ marginBottom: 12 }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {alumni.slice(1, 5).map(a => <AlumniCard key={a.id} alumni={a} />)}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Network stats */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <Users style={{ width: 12, height: 12, color: "var(--sub)" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Network</span>
              </div>
              <div style={{ padding: "0 16px" }}>
                <StatRow label="Alumni registered" value="12,400+" />
                <StatRow label="Countries" value="48" />
                <StatRow label="Companies" value="3,200+" />
                <StatRow label="Founders & CEOs" value="620" />
                <div style={{ padding: "9px 0" }}>
                  <span style={{ fontSize: 12, color: "var(--sub)" }}>CSE batch (your batch)</span>
                  <div style={{ ...mono, fontSize: 13, color: "var(--ink)", marginTop: 3 }}>214 alumni</div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--rule)" }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Quick links</span>
              </div>
              {[
                { icon: Users,     label: "Browse directory",     to: "/directory" },
                { icon: BookOpen,  label: "My full profile",      to: `/profile/${currentUser.id}` },
                { icon: Building2, label: "Admin panel",          to: "/admin" },
              ].map(({ icon: Icon, label, to }) => (
                <Link key={to} to={to} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", borderBottom: "1px solid var(--rule)", textDecoration: "none", color: "var(--ink)", fontSize: 12.5, transition: "background 120ms" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--paper)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <Icon style={{ width: 12, height: 12, color: "var(--sub)", flexShrink: 0 }} />
                  {label}
                  <ArrowRight style={{ width: 10, height: 10, color: "var(--rule)", marginLeft: "auto" }} />
                </Link>
              ))}
              <div style={{ padding: "11px 16px" }} />
            </div>

            {/* Batch map teaser */}
            <div className="dotted-grid" style={{ border: "1px solid var(--rule)", borderRadius: 3, padding: "18px 16px", textAlign: "center" }}>
              <MapPin style={{ width: 16, height: 16, color: "var(--sub)", margin: "0 auto 8px" }} />
              <p style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", margin: "0 0 4px", textTransform: "uppercase" }}>Batch map</p>
              <p style={{ fontSize: 12, color: "var(--sub)", margin: "0 0 8px", lineHeight: 1.5 }}>See where your batchmates are</p>
              <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.06em" }}>COMING SOON</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
