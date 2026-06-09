import { useParams, Link } from "react-router-dom";
import { MapPin, Briefcase, Globe, Mail, ExternalLink, Calendar, GraduationCap, Award, Users, Building2, ChevronLeft, Share2, MessageSquare } from "lucide-react";
import { alumni } from "../data/mockData";

const catColor = {
  FOUNDER:       { bg: "#ede9fe", text: "#6d28d9" },
  EMPLOYEE:      { bg: "#e0f2fe", text: "#0369a1" },
  "GOVT OFFICER":{ bg: "#dcfce7", text: "#15803d" },
  BUSINESSMAN:   { bg: "#fef9c3", text: "#a16207" },
  RESEARCHER:    { bg: "#cffafe", text: "#0e7490" },
  TEACHER:       { bg: "#fce7f3", text: "#be185d" },
  PROFESSOR:     { bg: "#fce7f3", text: "#be185d" },
};

const accents = ["#6366f1","#10b981","#f59e0b","#ef4444","#06b6d4","#8b5cf6"];

export default function Profile() {
  const { id } = useParams();
  const a = alumni.find(x => x.id === Number(id)) || alumni[0];
  const accent = accents[(Number(id) - 1) % accents.length];
  const cat = catColor[a.category] || { bg: "#f5f5f4", text: "#57534e" };

  const card = (children, style = {}) => (
    <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden", ...style }}>
      {children}
    </div>
  );

  const section = (label, children) => (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.08em", padding: "12px 16px 8px", borderBottom: "1px solid #f5f5f4" }}>
        {label}
      </div>
      <div style={{ padding: "12px 16px" }}>{children}</div>
    </div>
  );

  return (
    <div style={{ background: "#f5f5f4", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
        <Link to="/directory" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "#a8a29e", textDecoration: "none", marginBottom: 18 }}>
          <ChevronLeft style={{ width: 13, height: 13 }} /> back to directory
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 12 }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            {/* Identity */}
            {card(
              <>
                {/* Thin accent top bar */}
                <div style={{ height: 3, background: accent }} />
                <div style={{ padding: "20px 20px 18px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      {/* Avatar */}
                      <div style={{
                        width: 52, height: 52, borderRadius: 10,
                        background: accent + "18", border: `1px solid ${accent}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: 18, color: accent, flexShrink: 0,
                      }}>{a.avatar}</div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#1c1917", margin: 0 }}>{a.name}</h1>
                          {a.isNRI && (
                            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#6366f1", background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 4, padding: "1px 6px" }}>
                              <Globe style={{ width: 10, height: 10 }} /> NRI
                            </span>
                          )}
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: cat.bg, color: cat.text }}>
                            {a.category}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: "#57534e", marginTop: 3 }}>
                          {a.currentCompany.position} · <span style={{ color: "#1c1917", fontWeight: 500 }}>{a.currentCompany.name}</span>
                        </div>
                        <div style={{ display: "flex", gap: 14, marginTop: 5 }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#a8a29e" }}>
                            <MapPin style={{ width: 11, height: 11 }} />{a.currentCity}, {a.currentCountry}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#a8a29e" }}>
                            <GraduationCap style={{ width: 11, height: 11 }} />{a.course} · {a.endYear}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, padding: "7px 14px", border: "1px solid #e7e5e4", borderRadius: 6, background: "#fff", color: "#57534e", cursor: "pointer" }}>
                        <Share2 style={{ width: 13, height: 13 }} /> Share
                      </button>
                      <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, padding: "7px 14px", border: "none", borderRadius: 6, background: accent, color: "#fff", cursor: "pointer", fontWeight: 600 }}>
                        <MessageSquare style={{ width: 13, height: 13 }} /> Connect
                      </button>
                    </div>
                  </div>

                  {a.bio && <p style={{ fontSize: 13, color: "#57534e", lineHeight: 1.65, borderTop: "1px solid #f5f5f4", paddingTop: 12, margin: 0 }}>{a.bio}</p>}

                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <a href={a.linkedinUrl} target="_blank" rel="noreferrer" style={{
                      display: "flex", alignItems: "center", gap: 5, fontSize: 12, padding: "5px 10px",
                      background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 5,
                      color: "#1d4ed8", textDecoration: "none",
                    }}>
                      <ExternalLink style={{ width: 11, height: 11 }} /> LinkedIn
                    </a>
                    <span style={{
                      display: "flex", alignItems: "center", gap: 5, fontSize: 12, padding: "5px 10px",
                      background: "#f5f5f4", border: "1px solid #e7e5e4", borderRadius: 5, color: "#78716c",
                    }}>
                      <Mail style={{ width: 11, height: 11 }} /> {a.alumniEmailId}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Experience */}
            {card(
              section("Experience",
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <ExpRow icon={a.currentCompany.name[0]} accent={accent}
                    title={a.currentCompany.position} sub={a.currentCompany.name}
                    meta={`Since ${a.currentCompany.startDate}`} badge="current" />
                  {a.pastCompanies.map((c, i) => (
                    <ExpRow key={i} icon={c[0]} accent="#a8a29e" title={c} sub="Past employer" />
                  ))}
                </div>
              )
            )}

            {/* Education */}
            {card(
              section("Education",
                <ExpRow icon="🎓" accent="#6366f1" emoji
                  title="IIT Guwahati"
                  sub={`${a.course} · ${a.branch}`}
                  meta={`${a.startYear} – ${a.endYear}`}
                />
              )
            )}

            {/* Campus */}
            {a.campusActivities.length > 0 && card(
              section("Campus Activities",
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {a.campusActivities.map((act, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 6, background: "#fef9c3", border: "1px solid #fde68a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#a16207", flexShrink: 0 }}>
                        {act.name[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>{act.name}</div>
                        <div style={{ fontSize: 12, color: "#78716c" }}>{act.position} · {act.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            {/* Alumni card */}
            <div style={{ background: accent, borderRadius: 8, padding: "14px 16px", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div className="mono" style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Alumni Card</div>
              {[["Card ID", a.alumniCardId], ["Batch", `${a.startYear}–${a.endYear}`], ["Course", a.course], ["Branch", a.branch.split(" ")[0]]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{l}</span>
                  <span className="mono" style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Achievements */}
            {a.achievements.length > 0 && card(
              section("Achievements",
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {a.achievements.map((ach, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#f59e0b", fontSize: 12, marginTop: 1, flexShrink: 0 }}>★</span>
                      <span style={{ fontSize: 12.5, color: "#292524", lineHeight: 1.5 }}>{ach}</span>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* Locations */}
            {card(
              section("Locations",
                <div>
                  <div style={{ fontSize: 11, color: "#a8a29e", fontWeight: 600, marginBottom: 5 }}>CURRENT</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                    <span style={{ fontSize: 13, color: "#1c1917" }}>{a.currentCity}, {a.currentCountry}</span>
                  </div>
                  {a.pastCities.length > 0 && <>
                    <div style={{ fontSize: 11, color: "#a8a29e", fontWeight: 600, marginBottom: 5 }}>PAST</div>
                    {a.pastCities.map((c, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e7e5e4" }} />
                        <span style={{ fontSize: 12, color: "#78716c" }}>{c}</span>
                      </div>
                    ))}
                  </>}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpRow({ icon, accent, title, sub, meta, badge, emoji }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 6, flexShrink: 0,
        background: emoji ? "#f5f5f4" : accent + "18",
        border: `1px solid ${emoji ? "#e7e5e4" : accent + "30"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: emoji ? 16 : 12, fontWeight: 700, color: accent,
      }}>{icon}</div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>{title}</span>
          {badge && <span style={{ fontSize: 10, fontWeight: 600, background: "#dcfce7", color: "#15803d", padding: "1px 6px", borderRadius: 4 }}>● active</span>}
        </div>
        <div style={{ fontSize: 12, color: "#78716c" }}>{sub}</div>
        {meta && <div className="mono" style={{ fontSize: 11, color: "#a8a29e", marginTop: 2 }}>{meta}</div>}
      </div>
    </div>
  );
}
