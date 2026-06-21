import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, LogOut, User, ChevronDown, Settings, LayoutDashboard, Shield, Moon, Sun } from "lucide-react";
import { mono } from "../theme";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/",           label: "Home"       },
  { to: "/directory",  label: "Directory"  },
  { to: "/globe",      label: "Global Map" },
  { to: "/resources",  label: "Resources"  },
  { to: "/placements", label: "Placements" },
];

// ── Dark mode persistence ─────────────────────────────
function getInitialDark() {
  try {
    const stored = localStorage.getItem("myalum-theme");
    if (stored) return stored === "dark";
  } catch (_) {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function Navbar() {
  const { pathname }       = useLocation();
  const navigate           = useNavigate();
  const { user, logout }   = useAuth();
  const [open, setOpen]    = useState(false);
  const [dark, setDark]    = useState(getInitialDark);
  const dropRef            = useRef(null);

  // Apply / remove data-theme="dark" on <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try { localStorage.setItem("myalum-theme", dark ? "dark" : "light"); } catch (_) {}
  }, [dark]);

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

  const dropItemStyle = {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 14px", textDecoration: "none",
    color: "var(--ink)", fontSize: 13,
    borderBottom: "1px solid var(--rule)",
    transition: "background 120ms",
    cursor: "pointer",
  };

  return (
    <nav style={{ background: "var(--blue)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", height: "var(--nav-height)" }}>

        {/* Logo + Wordmark */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginRight: 40, flexShrink: 0 }}>
          {/* Circular cropped logo */}
          <div style={{
            width: 30, height: 30,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#fff",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src="/sail-logo.png"
              alt="SAIL logo"
              style={{
                width: 42,          /* slightly larger than container to crop whitespace */
                height: 42,
                objectFit: "cover",
                objectPosition: "center",
                transform: "scale(1.15)",  /* zoom in to crop the white padding */
              }}
            />
          </div>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>MyAlum</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14, fontWeight: 300 }}>·</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", fontWeight: 600 }}>IITG</span>
        </Link>

        {/* Nav links */}
        <div style={{
          display: "flex",
          gap: 4,
          flex: 1,
          alignItems: "center",
          height: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {links.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to}
                className={`nav-link${active ? " active" : ""}`}
                style={{
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: active ? "#fff" : "rgba(255,255,255,0.65)",
                  padding: "8px 13px",
                  borderRadius: 5,
                  letterSpacing: "-0.01em",
                  transition: "color 150ms ease",
                  flexShrink: 0,
                }}>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(d => !d)}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 8,
              cursor: "pointer",
              padding: "6px 8px",
              color: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 150ms, border-color 150ms",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
          >
            {dark
              ? <Sun  style={{ width: 15, height: 15 }} />
              : <Moon style={{ width: 15, height: 15 }} />
            }
          </button>

          {user ? (
            <>
              {/* Bell */}
              <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "rgba(255,255,255,0.55)", position: "relative", display: "flex" }}>
                <Bell style={{ width: 16, height: 16 }} />
                <span style={{ position: "absolute", top: 5, right: 5, width: 6, height: 6, borderRadius: "50%", background: "var(--amber)" }} />
              </button>

              {/* Profile dropdown */}
              <div ref={dropRef} style={{ position: "relative", borderLeft: "1px solid rgba(255,255,255,0.14)", paddingLeft: 14, display: "flex", alignItems: "center" }}>
                <button onClick={() => setOpen(v => !v)}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {/* Avatar */}
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.14)", border: `1.5px solid ${open ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0, transition: "border-color 150ms" }}>
                    {user.avatar}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
                      {user.name.split(" ")[0]}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 500, textTransform: "capitalize" }}>
                      {user.role}
                    </div>
                  </div>
                  <ChevronDown style={{ width: 13, height: 13, color: "rgba(255,255,255,0.4)", transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }} />
                </button>

                {/* Dropdown menu */}
                {open && (
                  <div style={{ position: "absolute", right: 0, top: "calc(100% + 10px)", background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 10, minWidth: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)", overflow: "hidden", zIndex: 100 }}>

                    {/* User info row */}
                    <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--rule)", background: "var(--paper)" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>{user.name}</div>
                      <div style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{user.role} · {user.badge}</div>
                    </div>

                    {/* My profile */}
                    <Link
                      to={user.role === "alumni" ? `/profile/${user.alumniId}` : "/student-profile"}
                      onClick={() => setOpen(false)}
                      style={dropItemStyle}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--paper)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <User style={{ width: 12, height: 12, color: "var(--sub)" }} />
                      My profile
                    </Link>

                    {/* Dashboard */}
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      style={dropItemStyle}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--paper)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <LayoutDashboard style={{ width: 12, height: 12, color: "var(--sub)" }} />
                      Dashboard
                    </Link>

                    {/* Admin Panel */}
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        style={{ ...dropItemStyle, color: "var(--red)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--red-light)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <Shield style={{ width: 12, height: 12 }} />
                        Admin Panel
                      </Link>
                    )}

                    {/* Settings */}
                    <Link
                      to="/settings"
                      onClick={() => setOpen(false)}
                      style={dropItemStyle}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--paper)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <Settings style={{ width: 12, height: 12, color: "var(--sub)" }} />
                      Settings
                    </Link>

                    {/* Sign out */}
                    <button onClick={handleLogout}
                      style={{ ...dropItemStyle, width: "100%", background: "none", border: "none", color: "var(--red)", textAlign: "left" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--red-light)"}
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
              style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.75)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 8, padding: "7px 16px", transition: "border-color 150ms, color 150ms, background 150ms" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "transparent"; }}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
