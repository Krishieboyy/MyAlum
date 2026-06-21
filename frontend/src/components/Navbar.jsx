import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, LogOut, User, ChevronDown, Settings, LayoutDashboard, Shield } from "lucide-react";
import { serif, mono } from "../theme";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/",           label: "Home"       },
  { to: "/directory",  label: "Directory"  },
  { to: "/globe",      label: "Global Map" },
  { to: "/resources",  label: "Resources"  },
  { to: "/placements", label: "Placements" },
];

export default function Navbar() {
  const { pathname }       = useLocation();
  const navigate           = useNavigate();
  const { user, logout }   = useAuth();
  const [open, setOpen]    = useState(false);
  const dropRef            = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  return (
    <nav style={{ background: "var(--blue)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 54 }}>

        {/* Wordmark */}
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none", marginRight: 40, flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.015em" }}>MyAlum</span>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>·</span>
          <span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", fontWeight: 600 }}>IITG</span>
        </Link>

        {/* Nav links */}
        <div style={{ 
          display: "flex", 
          gap: 8, 
          flex: 1, 
          alignItems: "center", 
          height: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none", // Hide default scrollbars
          msOverflowStyle: "none",
        }}>
          {links.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to}
                className={`nav-link${active ? " active" : ""}`}
                style={{ 
                  fontSize: 14.5, 
                  fontWeight: 500, 
                  color: active ? "#fff" : "rgba(255,255,255,0.65)", 
                  padding: "8px 14px", 
                  borderRadius: 4, 
                  letterSpacing: "-0.005em",
                  transition: "color 150ms ease",
                  flexShrink: 0
                }}>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {user ? (
            <>
              {/* Bell */}
              <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "rgba(255,255,255,0.55)", position: "relative", display: "flex" }}>
                <Bell style={{ width: 16, height: 16 }} />
                <span style={{ position: "absolute", top: 5, right: 5, width: 6, height: 6, borderRadius: "50%", background: "var(--amber)" }} />
              </button>

              {/* Profile dropdown */}
              <div ref={dropRef} style={{ position: "relative", borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 16, display: "flex", alignItems: "center" }}>
                <button onClick={() => setOpen(v => !v)}
                  style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {/* Avatar */}
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: `1px solid ${open ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 600, flexShrink: 0, transition: "border-color 150ms" }}>
                    {user.avatar}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
                      {user.name.split(" ")[0]}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 10.5, color: "rgba(255,255,255,0.5)", fontWeight: 500, textTransform: "capitalize" }}>
                      {user.role} · {user.badge}
                    </div>
                  </div>
                  <ChevronDown style={{ width: 12, height: 12, color: "rgba(255,255,255,0.4)", transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }} />
                </button>

                {/* Dropdown menu */}
                {open && (
                  <div style={{ position: "absolute", right: 0, top: "calc(100% + 10px)", background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, minWidth: 180, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", overflow: "hidden", zIndex: 100 }}>

                    {/* User info row */}
                    <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--rule)", background: "var(--paper)" }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>{user.name}</div>
                      <div style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{user.role} · {user.badge}</div>
                    </div>

                    {/* My profile — both roles */}
                    <Link
                      to={user.role === "alumni" ? `/profile/${user.alumniId}` : "/student-profile"}
                      onClick={() => setOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", textDecoration: "none", color: "var(--ink)", fontSize: 13, borderBottom: "1px solid var(--rule)", transition: "background 120ms" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--paper)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <User style={{ width: 12, height: 12, color: "var(--sub)" }} />
                      My profile
                    </Link>

                    {/* Dashboard */}
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", textDecoration: "none", color: "var(--ink)", fontSize: 13, borderBottom: "1px solid var(--rule)", transition: "background 120ms" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--paper)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <LayoutDashboard style={{ width: 12, height: 12, color: "var(--sub)" }} />
                      Dashboard
                    </Link>

                    {/* Admin Panel - only for admins */}
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", textDecoration: "none", color: "#dc2626", fontSize: 13, borderBottom: "1px solid var(--rule)", transition: "background 120ms" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#FFF5F5"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <Shield style={{ width: 12, height: 12 }} />
                        Admin Panel
                      </Link>
                    )}

                    {/* Settings */}
                    <Link
                      to="/settings"
                      onClick={() => setOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", textDecoration: "none", color: "var(--ink)", fontSize: 13, borderBottom: "1px solid var(--rule)", transition: "background 120ms" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--paper)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <Settings style={{ width: 12, height: 12, color: "var(--sub)" }} />
                      Settings
                    </Link>

                    {/* Sign out */}
                    <button onClick={handleLogout}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", width: "100%", background: "none", border: "none", cursor: "pointer", color: "var(--red)", fontSize: 13, textAlign: "left", transition: "background 120ms" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#FFF5F5"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <LogOut style={{ width: 12, height: 12 }} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Not logged in */
            <Link to="/login"
              style={{ display: "flex", alignItems: "center", gap: 6, ...mono, fontSize: 10.5, color: "rgba(255,255,255,0.6)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 3, padding: "6px 14px", letterSpacing: "0.06em", transition: "border-color 150ms, color 150ms" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
