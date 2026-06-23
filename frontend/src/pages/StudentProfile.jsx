import { useNavigate, Link } from "react-router-dom";
import {
  LogOut, BookOpen, Briefcase, Users, ArrowRight,
  GraduationCap, Award, MapPin, Building2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { serif, mono } from "../theme";
import { resources, placements } from "../data/mockData";

const SEMESTER_CGPA = [
  { sem: "Sem 1", cgpa: 8.2 },
  { sem: "Sem 2", cgpa: 8.5 },
  { sem: "Sem 3", cgpa: 8.9 },
  { sem: "Sem 4", cgpa: 9.0 },
  { sem: "Sem 5", cgpa: 8.7, current: true },
];

export default function StudentProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== "student") {
    return (
      <div style={{ background: "transparent", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="dotted-grid" style={{ padding: "60px 80px", borderRadius: 3, border: "1px solid var(--rule)", textAlign: "center" }}>
          <p style={{ ...mono, fontSize: 12, color: "var(--sub)", letterSpacing: "0.08em", margin: "0 0 12px" }}>STUDENT ACCOUNT REQUIRED</p>
          <Link to="/login" style={{ fontSize: 12, color: "var(--blue)", textDecoration: "none" }}>Sign in as student →</Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate("/login"); };

  const savedRes  = resources.filter(r  => (user.savedResources  || []).includes(r.id));
  const savedJobs = placements.filter(p => (user.savedPlacements || []).includes(p.id));

  const Field = ({ label, value }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <span style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      <span style={{ ...mono, fontSize: 12, color: "var(--ink)", letterSpacing: "0.03em" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px" }}>

        {/* ── Dossier header ── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, marginBottom: 12, overflow: "hidden" }}>

          {/* Navy band */}
          <div style={{ background: "var(--blue)", padding: "20px 28px", display: "flex", alignItems: "flex-start", gap: 20 }}>

            {/* Avatar */}
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#2B4F8A", border: "2px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 600, flexShrink: 0 }}>
              {user.avatar}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span className="badge" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.2)" }}>
                  STUDENT
                </span>
                <span className="badge" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.15)" }}>
                  {user.year.toUpperCase()}
                </span>
              </div>
              <h1 style={{ ...serif, fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                {user.name}
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {user.course} · {user.branch} · IIT Guwahati
              </p>
            </div>

            {/* Sign out */}
            <button onClick={handleLogout}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, ...mono, fontSize: 10, color: "rgba(255,255,255,0.35)", background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 3, padding: "5px 10px", cursor: "pointer", letterSpacing: "0.06em", flexShrink: 0 }}>
              <LogOut style={{ width: 10, height: 10 }} /> SIGN OUT
            </button>
          </div>

          {/* Metadata row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-3 gap-x-4" style={{ padding: "16px 28px", borderBottom: "1px solid var(--rule)" }}>
            <Field label="Roll No."  value={user.rollNo || "—"} />
            <Field label="Course"    value={user.course  || "—"} />
            <Field label="Branch"    value={user.branchCode || "—"} />
            <Field label="Batch"     value={user.startYear ? `${user.startYear}–${user.endYear}` : "—"} />
            <Field label="CGPA"      value={user.cgpa ? `${user.cgpa} / 10` : "—"} />
            <Field label="Email"     value={user.email   || "—"} />
          </div>

          {/* CGPA bar */}
          <div style={{ padding: "14px 28px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", flexShrink: 0 }}>CGPA TREND</span>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6, height: 56 }}>
                {SEMESTER_CGPA.map(({ sem, cgpa, current }) => (
                  <div key={sem} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <div style={{ ...mono, fontSize: 8.5, color: current ? "var(--ink)" : "var(--sub)" }}>{cgpa}</div>
                    <div style={{ width: "100%", height: Math.round((cgpa / 10) * 24), background: current ? "var(--blue)" : "var(--rule)", borderRadius: 2, minHeight: 3 }} />
                    <div style={{ ...mono, fontSize: 8, color: "var(--sub)", letterSpacing: "0.04em" }}>{sem}</div>
                  </div>
                ))}
              </div>
              <span style={{ ...mono, fontSize: 13, color: "var(--ink)", flexShrink: 0, letterSpacing: "-0.01em" }}>{user.cgpa} / 10</span>
            </div>
          </div>
        </div>

        {/* ── Body grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 12 }}>

          {/* ── Left column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Campus activities — timeline style matching career history */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <Users style={{ width: 12, height: 12, color: "var(--sub)" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Campus activities</span>
              </div>

              {(user.campusActivities || []).map((act, i) => (
                <div key={act.name} style={{ padding: "14px 20px", borderBottom: i < (user.campusActivities.length - 1) ? "1px solid var(--rule)" : "none", display: "flex", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue)", opacity: 0.5 }} />
                    {i < (user.campusActivities.length - 1) && (
                      <div style={{ flex: 1, width: 1, background: "var(--rule)", marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{act.name}</span>
                      <span className="badge" style={{ background: "#EEF2F8", color: "var(--blue)", borderColor: "#B8C8DF", fontSize: 9 }}>{act.position}</span>
                    </div>
                    <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                      {act.category}{act.since ? ` · since ${act.since}` : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Internship history */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <Building2 style={{ width: 12, height: 12, color: "var(--sub)" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Internship history</span>
              </div>

              {(user.internships || []).length === 0 ? (
                <div className="dotted-grid" style={{ padding: "28px 20px", textAlign: "center" }}>
                  <p style={{ ...mono, fontSize: 11, color: "var(--sub)", margin: 0, letterSpacing: "0.05em" }}>NO INTERNSHIPS ON RECORD</p>
                </div>
              ) : (user.internships || []).map((intern, i) => (
                <div key={intern.company} style={{ padding: "14px 20px", borderBottom: i < (user.internships.length - 1) ? "1px solid var(--rule)" : "none", display: "flex", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{intern.role}</span>
                      <span className="badge" style={{ background: "#EDFAF3", color: "var(--green)", borderColor: "#9ACFB8", fontSize: 9 }}>COMPLETED</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--sub)", margin: "0 0 4px" }}>{intern.company}</p>
                    <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                      {intern.duration} · {intern.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            {(user.skills || []).length > 0 && (
              <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                  <Award style={{ width: 12, height: 12, color: "var(--sub)" }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Skills</span>
                </div>
                <div style={{ padding: "14px 20px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {user.skills.map(skill => (
                    <span key={skill} className="badge" style={{ background: "#F5F5F4", color: "#44403C", borderColor: "#D6D3CE", fontSize: 10.5 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Academic summary — mirrors campus record card */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 8 }}>
                <GraduationCap style={{ width: 12, height: 12, color: "var(--sub)" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Academic record</span>
              </div>
              {[
                { l: "Programme", v: `${user.course} · ${user.branchCode}` },
                { l: "Year",      v: user.year },
                { l: "Duration",  v: `${user.startYear}–${user.endYear}` },
                { l: "CGPA",      v: `${user.cgpa} / 10.0` },
              ].map(({ l, v }, i) => (
                <div key={l} style={{ padding: "10px 16px", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: "var(--sub)" }}>{l}</span>
                  <span style={{ ...mono, fontSize: 11, color: "var(--ink)" }}>{v}</span>
                </div>
              ))}
              <div style={{ padding: "10px 16px" }} />
            </div>

            {/* Saved resources */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <BookOpen style={{ width: 12, height: 12, color: "var(--sub)" }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Saved resources</span>
                </div>
                <Link to="/resources" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--blue)", textDecoration: "none" }}>
                  All <ArrowRight style={{ width: 9, height: 9 }} />
                </Link>
              </div>
              {savedRes.length === 0 ? (
                <div style={{ padding: "18px 16px", textAlign: "center" }}>
                  <p style={{ ...mono, fontSize: 10.5, color: "var(--sub)", margin: 0 }}>None saved yet</p>
                </div>
              ) : savedRes.map((r, i) => (
                <div key={r.id} style={{ padding: "10px 16px", borderBottom: i < savedRes.length - 1 ? "1px solid var(--rule)" : "none" }}>
                  <div style={{ fontSize: 12, color: "var(--ink)", marginBottom: 2, lineHeight: 1.3 }}>{r.title}</div>
                  <span style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>{r.postedBy} · {r.batch}</span>
                </div>
              ))}
            </div>

            {/* Saved placements */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Briefcase style={{ width: 12, height: 12, color: "var(--sub)" }} />
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>Saved listings</span>
                </div>
                <Link to="/placements" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--blue)", textDecoration: "none" }}>
                  All <ArrowRight style={{ width: 9, height: 9 }} />
                </Link>
              </div>
              {savedJobs.length === 0 ? (
                <div style={{ padding: "18px 16px", textAlign: "center" }}>
                  <p style={{ ...mono, fontSize: 10.5, color: "var(--sub)", margin: 0 }}>None saved yet</p>
                </div>
              ) : savedJobs.map((p, i) => (
                <div key={p.id} style={{ padding: "10px 16px", borderBottom: i < savedJobs.length - 1 ? "1px solid var(--rule)" : "none", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 3, background: "#EEF2F8", border: "1px solid #B8C8DF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ ...mono, fontSize: 10, color: "var(--blue)", fontWeight: 500 }}>{p.company[0]}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: "var(--ink)", fontWeight: 500, marginBottom: 1 }}>{p.role}</div>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>{p.company}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Find a mentor */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, padding: "14px 16px" }}>
              <div style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Find a mentor</div>
              <p style={{ fontSize: 12.5, color: "var(--sub)", margin: "0 0 10px", lineHeight: 1.6 }}>
                Browse {user.branchCode} alumni who have offered to guide current students.
              </p>
              <Link to={`/directory?q=${user.branchCode}`}
                style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "var(--blue)", textDecoration: "none", fontWeight: 500 }}>
                Browse {user.branchCode} alumni <ArrowRight style={{ width: 11, height: 11 }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
