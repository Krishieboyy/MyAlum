import { Link, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { serif, mono } from "../theme";
import { alumni } from "../data/mockData";

const links = [
  { to: "/",           label: "Home"       },
  { to: "/directory",  label: "Directory"  },
  { to: "/resources",  label: "Resources"  },
  { to: "/placements", label: "Placements" },
];

const currentUser = alumni[0];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={{ background: "var(--blue)", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 54 }}>

        {/* Wordmark */}
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none", marginRight: 40, flexShrink: 0 }}>
          <span style={{ ...serif, fontSize: 17, fontWeight: 500, color: "#fff", letterSpacing: "-0.01em" }}>MyAlum</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>·</span>
          <span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>IITG</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 2, flex: 1, alignItems: "center", height: "100%" }}>
          {links.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to}
                className={`nav-link${active ? " active" : ""}`}
                style={{ fontSize: 13, fontWeight: active ? 500 : 400, color: active ? "#fff" : "rgba(255,255,255,0.5)", padding: "6px 12px", borderRadius: 3, letterSpacing: "-0.005em" }}>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right — bell + profile icon */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "rgba(255,255,255,0.35)", position: "relative", display: "flex" }}>
            <Bell style={{ width: 15, height: 15 }} />
            <span style={{ position: "absolute", top: 5, right: 5, width: 5, height: 5, borderRadius: "50%", background: "var(--amber)" }} />
          </button>

          {/* Profile icon → links to own profile */}
          <Link to={`/profile/${currentUser.id}`}
            style={{ display: "flex", alignItems: "center", gap: 9, borderLeft: "1px solid rgba(255,255,255,0.12)", paddingLeft: 14, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 600, flexShrink: 0, transition: "border-color 120ms" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"}>
              {currentUser.avatar}
            </div>
            <span style={{ ...mono, fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em" }}>
              {currentUser.name.split(" ")[0].toUpperCase()} · CSE·14
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
