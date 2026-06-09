import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search, Users, Globe, Building2, Rocket,
  ArrowRight, TrendingUp, ChevronRight,
  Briefcase, GraduationCap, MapPin
} from "lucide-react";
import { alumni, stats, categoryColors, avatarColors } from "../data/mockData";
import AlumniCard from "../components/AlumniCard";

const quickTags = ["Computer Science", "2015 Batch", "Founders", "NRI Alumni", "Researchers"];

const statItems = [
  { value: "12,400+", label: "Alumni", sub: "across the globe", icon: Users, color: "#6366f1" },
  { value: "48+", label: "Countries", sub: "worldwide presence", icon: Globe, color: "#10b981" },
  { value: "3,200+", label: "Companies", sub: "employing our alumni", icon: Building2, color: "#f59e0b" },
  { value: "620+", label: "Founders", sub: "building the future", icon: Rocket, color: "#ef4444" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/directory?q=${encodeURIComponent(query)}`);
  };

  return (
    <div style={{ background: "#f8fafc" }}>
      {/* ── Hero ── */}
      <section
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)" }}
        className="relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: -80, right: -80, width: 400, height: 400,
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60, width: 300, height: 300,
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />

        <div className="max-w-4xl mx-auto px-6 py-28 flex flex-col items-center text-center relative">
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            IIT Guwahati Alumni Network
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-tight mb-5 text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Connect with{" "}
            <span style={{ background: "linear-gradient(90deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              12,000+ IITGians
            </span>
            <br />
            who shaped the world.
          </h1>

          <p className="text-slate-400 text-lg mb-10 max-w-xl leading-relaxed">
            Mentors, collaborators, and friends who walked the same campus.
            Find them, connect with them, grow together.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-6">
            <div
              className="flex items-center rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
            >
              <Search style={{ width: 18, height: 18, color: "#64748b", flexShrink: 0, marginLeft: 18 }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, company, batch, or branch..."
                className="flex-1 bg-transparent px-4 py-4 text-white text-sm outline-none"
                style={{ color: "#e2e8f0" }}
              />
              <button
                type="submit"
                className="font-semibold text-sm px-6 py-4 m-1 rounded-xl transition-all"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/directory?q=${encodeURIComponent(tag)}`)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.2)"; e.currentTarget.style.color = "#a5b4fc"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#94a3b8"; }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {statItems.map(({ value, label, sub, icon: Icon, color }, i) => (
              <div
                key={label}
                className="flex items-center gap-4 py-6 px-6"
                style={{ borderRight: i < 3 ? "1px solid #f1f5f9" : "none" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: color + "15" }}>
                  <Icon style={{ width: 20, height: 20, color }} />
                </div>
                <div>
                  <div className="font-bold text-xl text-slate-900" style={{ letterSpacing: "-0.02em" }}>{value}</div>
                  <div className="text-xs text-slate-500">{label} · {sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Alumni ── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2">Our Community</p>
            <h2 className="text-2xl font-bold text-slate-900" style={{ letterSpacing: "-0.02em" }}>Featured Alumni</h2>
          </div>
          <Link
            to="/directory"
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View all directory <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alumni.slice(0, 3).map((a, i) => (
            <AlumniCard key={a.id} alumni={a} index={i} />
          ))}
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section style={{ background: "#fff", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2">Platform</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-3" style={{ letterSpacing: "-0.02em" }}>Everything in one place</h2>
            <p className="text-slate-500 max-w-md">Built specifically for the IIT Guwahati community. Not a generic platform.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="rounded-2xl p-6 border border-slate-100 transition-all duration-200 cursor-default"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)"}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: bg }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1.5">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div
          className="rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)" }}
        >
          <div>
            <p className="text-indigo-300 text-sm font-medium mb-2">For IITG Alumni</p>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ letterSpacing: "-0.02em" }}>
              Your profile is waiting.
            </h2>
            <p className="text-indigo-300">Claim it, update your story, reconnect with your batchmates.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              className="font-semibold px-6 py-3 rounded-xl text-sm transition-all"
              style={{ background: "#fff", color: "#4f46e5" }}
            >
              Claim Profile
            </button>
            <button
              className="font-medium px-6 py-3 rounded-xl text-sm transition-all"
              style={{ background: "rgba(255,255,255,0.1)", color: "#c7d2fe", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f1f5f9", background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-700">MyAlum</span>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-400">IIT Guwahati Alumni Association</span>
          </div>
          <span className="text-xs text-slate-400">© 2025</span>
        </div>
      </footer>
    </div>
  );
}

const features = [
  { icon: "🔍", title: "Smart Search", desc: "Find alumni by batch, branch, company, city, or category. Public access for basic info.", bg: "#eff6ff" },
  { icon: "🤝", title: "Mentorship Network", desc: "Connect with alumni in your field for guidance, referrals, and career advice.", bg: "#f0fdf4" },
  { icon: "⚡", title: "Admin Enrichment", desc: "Admins can enrich profiles with verified emails and phones for targeted outreach.", bg: "#fefce8" },
  { icon: "🌏", title: "Global Community", desc: "NRI alumni across 48 countries. Find fellow IITGians wherever life takes you.", bg: "#fdf4ff" },
  { icon: "🎓", title: "Campus Legacy", desc: "Club activities, fest roles, and batch bonds — preserved forever in one place.", bg: "#fff7ed" },
  { icon: "💰", title: "Alumni Giving", desc: "Support campus initiatives and stay updated on IITG events and development.", bg: "#f0f9ff" },
];
