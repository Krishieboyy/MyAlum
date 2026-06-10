import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, ExternalLink, Building2, Award, Users, Shield, Mail, Phone, Eye, EyeOff } from "lucide-react";
import { alumni } from "../data/mockData";
import { serif, mono, catBadge, avatarBg } from "../theme";

export default function Profile() {
  const { id } = useParams();
  const a = alumni.find(x => x.id === Number(id));
  const [adminOpen, setAdminOpen] = useState(false);

  if (!a) return (
    <div style={{ background: "var(--paper)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="dotted-grid" style={{ padding: "60px 80px", borderRadius: 3, border: "1px solid var(--rule)", textAlign: "center" }}>
        <p style={{ ...mono, fontSize: 12, color: "var(--sub)", letterSpacing: "0.08em" }}>RECORD NOT FOUND</p>
        <Link to="/directory" style={{ fontSize: 12, color: "var(--blue)", textDecoration: "none", marginTop: 12, display: "block" }}>← Return to directory</Link>
      </div>
    </div>
  );

  const badge = catBadge(a.category);

  const Field = ({ label, value }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <span style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      <span style={{ ...mono, fontSize: 12, color: "var(--ink)", letterSpacing: "0.03em" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px" }}>

        {/* Back */}
        <Link to="/directory" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--sub)", textDecoration: "none", marginBottom: 22 }}>
          <ArrowLeft style={{ width: 12, height: 12 }} /> Directory
        </Link>

        {/* ── Dossier header ── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, marginBottom: 12, overflow: "hidden" }}>

          {/* Blue band */}
          <div style={{ background: "var(--blue)", padding: "20px 28px", display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: avatarBg(a.category), border: "2px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 600, flexShrink: 0 }}>
              {a.avatar}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span className="badge" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}>{a.category}</span>
                {a.isNRI && <span className="badge" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.15)" }}>NRI</span>}
              </div>
              <h1 style={{ ...serif, fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                {a.name}
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {a.currentCompany.position} · {a.currentCompany.name}
              </p>
            </div>

            {/* Right actions */}
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <a href={a.linkedinUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, ...mono, fontSize: 10, color: "rgba(255,255,255,0.35)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 3, padding: "5px 10px", letterSpacing: "0.06em" }}>
                <ExternalLink style={{ width: 10, height: 10 }} /> LINKEDIN
              </a>
              {/* Admin toggle */}
              <button onClick={() => setAdminOpen(v => !v)}
                title={adminOpen ? "Hide admin panel" : "Show admin panel"}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, ...mono, fontSize: 10, color: adminOpen ? "var(--amber)" : "rgba(255,255,255,0.35)", background: adminOpen ? "rgba(194,119,46,0.12)" : "none", border: "1px solid", borderColor: adminOpen ? "rgba(194,119,46,0.4)" : "rgba(255,255,255,0.12)", borderRadius: 3, padding: "5px 10px", cursor: "pointer", letterSpacing: "0.06em" }}>
                <Shield style={{ width: 10, height: 10 }} /> ADMIN
              </button>
            </div>
          </div>

          {/* Metadata grid */}
          <div style={{ padding: "16px 28px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px 0", borderBottom: "1px solid var(--rule)" }}>
            <Field label="Card No." value={a.alumniCardId} />
            <Field label="Course"   value={a.course} />
            <Field label="Branch"   value={a.branch.split(" ").map(w => w[0]).join("").slice(0, 4)} />
            <Field label="Batch"    value={`${a.startYear}–${a.endYear}`} />
            <Field label="Location" value={a.currentCity} />
            <Field label="Status"   value={a.isNRI ? "NRI · Abroad" : "India"} />
          </div>

          {/* Bio */}
          <div style={{ padding: "14px 28px 16px" }}>
            <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.75, margin: 0, maxWidth: 620 }}>{a.bio}</p>
          </div>

          {/* ── Admin panel (inline, toggled) ── */}
          {adminOpen && (
            <div style={{ borderTop: "1px solid var(--rule)", background: "#FFFDF8" }}>
              <div style={{ padding: "12px 28px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <Shield style={{ width: 11, height: 11, color: "var(--amber)" }} />
                <span style={{ ...mono, fontSize: 10, color: "var(--amber)", letterSpacing: "0.08em" }}>ADMIN VIEW · CONTACT DATA</span>
              </div>
              <div style={{ padding: "16px 28px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                <div>
                  <span style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Alumni email</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 7, ...mono, fontSize: 12, color: "var(--ink)" }}>
                    <Mail style={{ width: 11, height: 11, color: "var(--sub)" }} /> {a.alumniEmailId}
                  </span>
                </div>
                <div>
                  <span style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Work email</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 7, ...mono, fontSize: 12, color: "var(--ink)" }}>
                    <Mail style={{ width: 11, height: 11, color: "var(--sub)" }} />
                    {a.emailAddresses[0] || "—"}
                  </span>
                </div>
                <div>
                  <span style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Phone</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 7, ...mono, fontSize: 12, color: "var(--sub)" }}>
                    <Phone style={{ width: 11, height: 11 }} /> {a.phoneNumbers[0] || "Not on record"}
                  </span>
                </div>
              </div>
              <div style={{ padding: "0 28px 14px" }}>
                <span style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.06em" }}>Access logged · visible to admin-role only</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Body grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 12 }}>

          {/* Left: career + achievements */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <Building2 style={{ width: 12, height: 12, color: "var(--sub)" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Career history</span>
              </div>

              {/* Current */}
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--rule)", display: "flex", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
                  <div style={{ flex: 1, width: 1, background: "var(--rule)", marginTop: 4 }} />
                </div>
                <div style={{ paddingBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{a.currentCompany.position}</span>
                    <span className="badge" style={{ background: "#EDFAF3", color: "var(--green)", borderColor: "#9ACFB8", fontSize: 9 }}>CURRENT</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--sub)", margin: "0 0 5px" }}>{a.currentCompany.name}</p>
                  <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                    {a.currentCompany.startDate.replace("-", " / ")} → present
                  </span>
                </div>
              </div>

              {a.pastCompanies.map((company, i) => (
                <div key={company} style={{ padding: "14px 20px", borderBottom: i < a.pastCompanies.length - 1 ? "1px solid var(--rule)" : "none", display: "flex", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--surface)", border: "1.5px solid var(--sub)", opacity: 0.5 }} />
                    {i < a.pastCompanies.length - 1 && <div style={{ flex: 1, width: 1, background: "var(--rule)", marginTop: 4 }} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: "var(--ink)", margin: "0 0 3px" }}>{company}</p>
                    <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>past employer</span>
                  </div>
                </div>
              ))}
            </div>

            {a.achievements.length > 0 && (
              <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                  <Award style={{ width: 12, height: 12, color: "var(--sub)" }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Achievements</span>
                </div>
                {a.achievements.map((ach, i) => (
                  <div key={ach} style={{ padding: "10px 20px", borderBottom: i < a.achievements.length - 1 ? "1px solid var(--rule)" : "none", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "var(--amber)", fontSize: 10, marginTop: 2, flexShrink: 0 }}>★</span>
                    <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{ach}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <Users style={{ width: 12, height: 12, color: "var(--sub)" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Campus record</span>
              </div>
              {a.campusActivities.map((act, i) => (
                <div key={act.name} style={{ padding: "10px 16px", borderBottom: i < a.campusActivities.length - 1 ? "1px solid var(--rule)" : "none" }}>
                  <div style={{ fontSize: 12.5, color: "var(--ink)", marginBottom: 2 }}>{act.name}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.04em" }}>{act.category}</span>
                    <span style={{ color: "var(--rule)" }}>·</span>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>{act.position}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, padding: "14px 16px" }}>
              <div style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Location history</div>
              {[a.currentCity, ...a.pastCities].map((city, i) => (
                <div key={city + i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < a.pastCities.length ? 7 : 0 }}>
                  <MapPin style={{ width: 10, height: 10, color: i === 0 ? "var(--green)" : "var(--rule)", flexShrink: 0 }} />
                  <span style={{ ...mono, fontSize: 11, color: i === 0 ? "var(--ink)" : "var(--sub)" }}>{city}</span>
                  {i === 0 && <span style={{ ...mono, fontSize: 9, color: "var(--green)", marginLeft: "auto", letterSpacing: "0.08em" }}>NOW</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
