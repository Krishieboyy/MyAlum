import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Bell } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/directory", label: "Directory" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={{
      background: "#1c1917",
      borderBottom: "1px solid #292524",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 52 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginRight: 32 }}>
          <GraduationCap style={{ width: 16, height: 16, color: "#6366f1" }} />
          <span style={{ fontWeight: 600, color: "#fafaf9", fontSize: 14, letterSpacing: "-0.01em" }}>MyAlum</span>
          <span style={{ color: "#44403c", fontSize: 13, margin: "0 2px" }}>/</span>
          <span style={{ color: "#78716c", fontSize: 13 }}>IITG</span>
        </Link>

        <div style={{ display: "flex", gap: 2, flex: 1 }}>
          {links.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link key={to} to={to} style={{
                padding: "5px 12px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: active ? 500 : 400,
                color: active ? "#fafaf9" : "#a8a29e",
                background: active ? "#292524" : "transparent",
                textDecoration: "none",
              }}>
                {label}
              </Link>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "#78716c", position: "relative" }}>
            <Bell style={{ width: 15, height: 15 }} />
            <span style={{ position: "absolute", top: 5, right: 5, width: 5, height: 5, borderRadius: "50%", background: "#6366f1" }} />
          </button>
          <Link to="/dashboard" style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "#292524", border: "1px solid #44403c",
            borderRadius: 6, padding: "4px 10px",
            textDecoration: "none", color: "#d6d3d1", fontSize: 13,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              background: "#6366f1", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: "#fff",
            }}>A</div>
            Arjun
          </Link>
        </div>
      </div>
    </nav>
  );
}
