import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Users, Shield, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { serif, mono } from "../theme";

export default function Login() {
  const { login } = useAuth();
  const navigate   = useNavigate();
  const [role,     setRole]     = useState("alumni");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
    navigate(role === "alumni" ? "/profile/1" : "/");
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid var(--rule)",
    borderRadius: 3,
    padding: "9px 12px",
    fontSize: 13,
    color: "var(--ink)",
    background: "var(--surface)",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 150ms",
  };

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Top strip ── */}
      <div style={{ background: "var(--blue)", padding: "14px 32px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none" }}>
          <span style={{ ...serif, fontSize: 16, fontWeight: 500, color: "#fff" }}>MyAlum</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>·</span>
          <span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>IITG</span>
        </Link>
      </div>

      {/* ── Card ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h1 style={{ ...serif, fontSize: 24, fontWeight: 500, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
              Sign in to MyAlum
            </h1>
            <p style={{ fontSize: 13, color: "var(--sub)", margin: 0 }}>IIT Guwahati Alumni Network</p>
          </div>

          {/* Card */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>

            {/* Role toggle */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid var(--rule)" }}>
              {[
                { r: "alumni",  label: "Alumni",  Icon: Users },
                { r: "student", label: "Student", Icon: GraduationCap },
                { r: "admin",  label: "Admin",  Icon: Shield },
              ].map(({ r, label, Icon }) => (
                <button key={r} onClick={() => setRole(r)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "16px 0", background: role === r ? "var(--paper)" : "var(--surface)", border: "none", borderBottom: role === r ? "2px solid var(--blue)" : "2px solid transparent", cursor: "pointer", transition: "all 150ms", color: role === r ? "var(--blue)" : "var(--sub)" }}>
                  <Icon style={{ width: 16, height: 16 }} />
                  <span style={{ ...mono, fontSize: 10.5, letterSpacing: "0.08em", fontWeight: role === r ? 500 : 400 }}>{label.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

              {role === "alumni" ? (
                <>
                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", display: "block", marginBottom: 5 }}>ALUMNI ID</label>
                    <input defaultValue="IITG-CSE-2014-001" placeholder="IITG-CSE-2014-001" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--blue)"}
                      onBlur={e  => e.target.style.borderColor = "var(--rule)"} />
                  </div>
                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", display: "block", marginBottom: 5 }}>EMAIL</label>
                    <input type="email" defaultValue="arjun.sharma@iitg.ac.in" placeholder="you@iitg.ac.in" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--blue)"}
                      onBlur={e  => e.target.style.borderColor = "var(--rule)"} />
                  </div>
                </>
              ) : role === "admin" ? (
                <>
                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", display: "block", marginBottom: 5 }}>ADMIN ID</label>
                    <input defaultValue="admin@iitg.ac.in" placeholder="admin@iitg.ac.in" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--blue)"}
                      onBlur={e  => e.target.style.borderColor = "var(--rule)"} />
                  </div>
                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", display: "block", marginBottom: 5 }}>EMAIL</label>
                    <input type="email" defaultValue="admin@iitg.ac.in" placeholder="admin@iitg.ac.in" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--blue)"}
                      onBlur={e  => e.target.style.borderColor = "var(--rule)"} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", display: "block", marginBottom: 5 }}>ROLL NUMBER</label>
                    <input defaultValue="210101045" placeholder="210101045" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--blue)"}
                      onBlur={e  => e.target.style.borderColor = "var(--rule)"} />
                  </div>
                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", display: "block", marginBottom: 5 }}>EMAIL</label>
                    <input type="email" defaultValue="r.mehta@iitg.ac.in" placeholder="you@iitg.ac.in" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--blue)"}
                      onBlur={e  => e.target.style.borderColor = "var(--rule)"} />
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", display: "block", marginBottom: 5 }}>PASSWORD</label>
                <div style={{ position: "relative" }}>
                  <input type={showPass ? "text" : "password"} defaultValue="••••••••" style={{ ...inputStyle, paddingRight: 38 }}
                    onFocus={e => e.target.style.borderColor = "var(--blue)"}
                    onBlur={e  => e.target.style.borderColor = "var(--rule)"} />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--sub)", display: "flex" }}>
                    {showPass ? <EyeOff style={{ width: 13, height: 13 }} /> : <Eye style={{ width: 13, height: 13 }} />}
                  </button>
                </div>
              </div>

              <button type="submit"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--blue)", color: "#fff", border: "none", borderRadius: 3, padding: "11px 0", fontSize: 13, fontWeight: 500, cursor: "pointer", marginTop: 4, transition: "opacity 150ms" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Sign in as {role === "alumni" ? "Alumni" : role === "admin" ? "Admin" : "Student"}
                <ArrowRight style={{ width: 13, height: 13 }} />
              </button>
            </form>

            {/* Demo notice */}
            <div style={{ padding: "10px 24px 14px", borderTop: "1px solid var(--rule)" }}>
              <p style={{ ...mono, fontSize: 10, color: "var(--sub)", margin: 0, textAlign: "center", letterSpacing: "0.05em" }}>
                DEMO — no real authentication · credentials pre-filled
              </p>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "var(--sub)" }}>
            <Link to="/" style={{ color: "var(--blue)", textDecoration: "none" }}>← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
