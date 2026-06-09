import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Bell, ChevronDown } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/directory", label: "Directory" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={{ background: "#0f172a" }} className="sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-15" style={{ height: 60 }}>
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <GraduationCap className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">MyAlum</span>
            <span className="text-xs text-slate-400 ml-1.5">IIT Guwahati</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="px-3.5 py-1.5 rounded-md text-sm font-medium transition-all"
                style={{
                  color: active ? "#fff" : "#94a3b8",
                  background: active ? "rgba(99,102,241,0.2)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            className="relative w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <Bell style={{ width: 16, height: 16, color: "#94a3b8" }} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-400 border border-slate-900" />
          </button>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#6366f1", color: "#fff" }}>A</div>
            Arjun
          </Link>
        </div>
      </div>
    </nav>
  );
}
