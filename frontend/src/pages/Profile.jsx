import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ExternalLink, Building2, Award, Users, Shield, Mail, Phone, LogOut, Heart, Share2, MessageCircle } from "lucide-react";
import { alumni } from "../data/mockData";
import { serif, mono, catBadge, avatarBg } from "../theme";
import { useAuth } from "../context/AuthContext";
import CompanyLogo from "../components/CompanyLogo";

export default function Profile() {
  const { id } = useParams();
  const a = alumni.find(x => x.id === Number(id));
  const [adminOpen, setAdminOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  if (!a) return (
    <div style={{ background: "transparent", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="dotted-grid" style={{ padding: "60px 80px", borderRadius: 3, border: "1px solid var(--rule)", textAlign: "center" }}>
        <p style={{ ...mono, fontSize: 12, color: "var(--sub)", letterSpacing: "0.08em" }}>RECORD NOT FOUND</p>
        <Link to="/directory" style={{ fontSize: 12, color: "var(--blue)", textDecoration: "none", marginTop: 12, display: "block" }}>← Return to directory</Link>
      </div>
    </div>
  );

  const badge = catBadge(a.category);

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Back button */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 28px" }}>
        <Link to="/directory" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--sub)", textDecoration: "none" }}>
          <ArrowLeft style={{ width: 12, height: 12 }} /> Directory
        </Link>
      </div>

      {/* Profile Card */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px 32px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
        
        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Header Card with Banner */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-card)", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
            
            {/* Banner */}
            <div style={{
              height: 200,
              background: `linear-gradient(135deg, #1E4B87 0%, #0d2a52 60%, #1a3a6e 100%)`,
              position: "relative",
            }} />

            {/* Profile Info */}
            <div style={{ padding: "0 28px 28px", position: "relative" }}>
              
              {/* Avatar - positioned over banner */}
              <div style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: avatarBg(a.category),
                border: "4px solid var(--surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 38,
                fontWeight: 600,
                marginTop: -60,
                marginBottom: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              }}>
                {a.avatar}
              </div>

              {/* Name and Professional details in LinkedIn split style */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap", marginBottom: 20 }}>
                
                {/* Left Side: Name and Professional Headline */}
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 700, color: "var(--ink)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                    {a.name}
                  </h1>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "var(--ink)", margin: "0 0 10px", lineHeight: 1.4 }}>
                    {a.currentCompany.position} at <span style={{ color: "var(--blue)", fontWeight: 600 }}>{a.currentCompany.name}</span>
                  </p>
                  
                  {/* Location & Quick Meta */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13.5, color: "var(--sub)", flexWrap: "wrap", marginBottom: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin style={{ width: 14, height: 14 }} /> {a.currentCity}, {a.currentCountry}
                    </span>
                    <span>·</span>
                    <span style={{ color: "var(--blue)", fontWeight: 600 }}>Class of {a.endYear}</span>
                    <span>·</span>
                    <span>{a.course} in {a.branch.split(" ")[0]}</span>
                  </div>
                  
                  {/* Badges */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span className="badge" style={badge}>{a.category}</span>
                    {a.isNRI && <span className="badge" style={{ background: "rgba(59, 130, 246, 0.08)", color: "#1d4ed8", borderColor: "#bfdbfe", fontSize: 9 }}>NRI</span>}
                  </div>
                </div>

                {/* Right Side: Corporate & Academic Institutions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "var(--paper)", borderRadius: 6, border: "1px solid var(--rule)" }}>
                    <CompanyLogo name={a.currentCompany.name} size={15} />
                    <span>{a.currentCompany.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "var(--paper)", borderRadius: 6, border: "1px solid var(--rule)" }}>
                    <span style={{ fontSize: 15 }}>🎓</span>
                    <span>IIT Guwahati</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.8, margin: "0 0 20px", maxWidth: 700 }}>
                {a.bio}
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                <button style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  background: "var(--blue)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}>
                  <Users style={{ width: 14, height: 14 }} /> Connect
                </button>
                <button style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  background: "transparent",
                  color: "var(--blue)",
                  border: "1.5px solid var(--blue)",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}>
                  <MessageCircle style={{ width: 14, height: 14 }} /> Message
                </button>
                <a href={a.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 20px",
                    background: "transparent",
                    color: "var(--sub)",
                    border: "1px solid var(--rule)",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                  <ExternalLink style={{ width: 14, height: 14 }} /> LinkedIn
                </a>
              </div>

              {/* Admin Panel Toggle */}
              {user?.role === "alumni" && (
                <button onClick={() => setAdminOpen(v => !v)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    background: adminOpen ? "rgba(194, 119, 46, 0.1)" : "transparent",
                    color: adminOpen ? "var(--amber)" : "var(--sub)",
                    border: "1px solid",
                    borderColor: adminOpen ? "rgba(194, 119, 46, 0.3)" : "var(--rule)",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}>
                  <Shield style={{ width: 14, height: 14 }} /> Admin View
                </button>
              )}
            </div>

            {/* Admin Panel */}
            {adminOpen && (
              <div style={{ borderTop: "1px solid var(--rule)", background: "#FFFDF8", padding: "16px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Shield style={{ width: 14, height: 14, color: "var(--amber)" }} />
                  <span style={{ ...mono, fontSize: 11, color: "var(--amber)", letterSpacing: "0.08em", fontWeight: 500 }}>ADMIN VIEW · CONTACT DATA</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Alumni Email</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink)" }}>
                      <Mail style={{ width: 12, height: 12, color: "var(--sub)" }} /> {a.alumniEmailId}
                    </span>
                  </div>
                  <div>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Work Email</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ink)" }}>
                      <Mail style={{ width: 12, height: 12, color: "var(--sub)" }} /> {a.emailAddresses[0] || "—"}
                    </span>
                  </div>
                  <div>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Phone</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--sub)" }}>
                      <Phone style={{ width: 12, height: 12 }} /> {a.phoneNumbers[0] || "Not on record"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Career History */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-card)", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
            <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
              <Building2 style={{ width: 16, height: 16, color: "var(--blue)" }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Career History</span>
            </div>

            {/* Current Position */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--rule)" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--green)" }} />
                  <div style={{ flex: 1, width: 2, background: "var(--rule)", marginTop: 8, height: 40 }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{a.currentCompany.position}</span>
                    <span className="badge" style={{ background: "#EDFAF3", color: "var(--green)", borderColor: "#9ACFB8", fontSize: 11 }}>Current</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "2px 0 6px 0" }}>
                    <CompanyLogo name={a.currentCompany.name} size={13} />
                    <span style={{ fontSize: 13, color: "var(--sub)", fontWeight: 500 }}>{a.currentCompany.name}</span>
                  </div>
                  <span style={{ ...mono, fontSize: 11, color: "var(--sub)" }}>
                    {a.currentCompany.startDate.replace("-", " / ")} → present
                  </span>
                </div>
              </div>
            </div>

            {/* Past Positions */}
            {a.pastCompanies.map((company, i) => (
              <div key={company} style={{ padding: "14px 20px", borderBottom: i < a.pastCompanies.length - 1 ? "1px solid var(--rule)" : "none" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rule)", opacity: 0.5 }} />
                    {i < a.pastCompanies.length - 1 && <div style={{ flex: 1, width: 2, background: "var(--rule)", marginTop: 8, height: 40 }} />}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <CompanyLogo name={company} size={13} />
                      <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{company}</span>
                    </div>
                    <span style={{ ...mono, fontSize: 11, color: "var(--sub)" }}>past employer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          {a.achievements.length > 0 && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-card)", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
              <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <Award style={{ width: 16, height: 16, color: "var(--amber)" }} />
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Achievements</span>
              </div>
              <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {a.achievements.map((ach) => (
                  <div key={ach} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "var(--amber)", fontSize: 16, marginTop: -2, flexShrink: 0 }}>★</span>
                    <span style={{ fontSize: 13, color: "var(--ink)" }}>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Campus Record */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-card)", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
              <Users style={{ width: 14, height: 14, color: "var(--blue)" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Campus Activities</span>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              {a.campusActivities.map((act) => (
                <div key={act.name}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>{act.name}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.04em" }}>{act.category}</span>
                    <span style={{ color: "var(--rule)" }}>·</span>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>{act.position}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location History */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-card)", padding: "16px 18px", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>Location History</div>
            {[a.currentCity, ...a.pastCities].map((city, i) => (
              <div key={city + i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < a.pastCities.length ? 8 : 0 }}>
                <MapPin style={{ width: 11, height: 11, color: i === 0 ? "var(--green)" : "var(--rule)", flexShrink: 0 }} />
                <span style={{ ...mono, fontSize: 11, color: i === 0 ? "var(--ink)" : "var(--sub)" }}>
                  {city} {i === 0 ? "· now" : ""}
                </span>
              </div>
            ))}
          </div>

          {/* Batch Info */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-card)", padding: "16px 18px", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>Education</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <span style={{ ...mono, fontSize: 9, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>Batch</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{a.startYear}–{a.endYear}</span>
              </div>
              <div>
                <span style={{ ...mono, fontSize: 9, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>Branch</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{a.branch}</span>
              </div>
              <div>
                <span style={{ ...mono, fontSize: 9, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 2 }}>Card No.</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)", ...mono }}>{a.alumniCardId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
