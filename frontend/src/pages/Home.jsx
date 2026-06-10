import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { news, alumni } from "../data/mockData";
import { serif, mono, avatarBg } from "../theme";

const TAG_COLOR = {
  RECOGNITION: ["#EEF2F8", "#1B3A66", "#B8C8DF"],
  FUNDING:     ["#EDFAF3", "#2E7D5B", "#9ACFB8"],
  AWARD:       ["#FDF6EE", "#C2772E", "#E8C89A"],
  ACHIEVEMENT: ["#EEF2F8", "#1B3A66", "#B8C8DF"],
  BUSINESS:    ["#FDF6EE", "#C2772E", "#E8C89A"],
  POLICY:      ["#EDFAF3", "#2E7D5B", "#9ACFB8"],
};
function tagStyle(tag) {
  const [bg, color, border] = TAG_COLOR[tag] || ["#F5F5F4", "#6B6963", "#E4E1DA"];
  return { background: bg, color, borderColor: border };
}

function NewsCard({ item, large = false }) {
  const ts  = tagStyle(item.tag);
  const alum = alumni.find(a => a.id === item.alumniId) || {};
  return (
    <Link to={`/profile/${item.alumniId}`} className="record-card" style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}>
      <div style={{ padding: large ? "22px 24px 20px" : "16px 18px 14px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: large ? 14 : 10 }}>
          <span className="badge" style={{ ...ts, fontSize: 9 }}>{item.tag}</span>
          <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.06em" }}>{item.kicker}</span>
          <span style={{ ...mono, fontSize: 10, color: "var(--rule)" }}>·</span>
          <span style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>
            {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>
        <h2 style={{ ...serif, fontSize: large ? 22 : 15, fontWeight: 500, color: "var(--ink)", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.2, maxWidth: large ? 500 : undefined }}>
          {item.headline}
        </h2>
        <p style={{ fontSize: large ? 13 : 12.5, color: "var(--sub)", lineHeight: 1.75, margin: 0 }}>
          {item.excerpt}
        </p>
      </div>
      <div className="rule" />
      <div style={{ padding: "8px 18px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: avatarBg(alum.category || ""), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 7.5, fontWeight: 600, flexShrink: 0 }}>
          {alum.avatar || "??"}
        </div>
        <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>{item.alumniName} · {item.alumniBatch}</span>
        <ArrowRight style={{ width: 10, height: 10, color: "var(--rule)", marginLeft: "auto" }} />
      </div>
    </Link>
  );
}

export default function Home() {
  const featured = news.find(n => n.featured);
  const rest     = news.filter(n => !n.featured);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <h1 style={{ ...serif, fontSize: 20, fontWeight: 500, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>Alumni updates</h1>
            <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>— IIT Guwahati</span>
          </div>
          <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.06em" }}>
            {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()}
          </span>
        </div>
        <div className="rule" style={{ marginBottom: 24 }} />

        {/* Featured story */}
        {featured && (
          <div style={{ marginBottom: 14 }}>
            <NewsCard item={featured} large />
          </div>
        )}

        {/* 3-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 40 }}>
          {rest.map(item => <NewsCard key={item.id} item={item} />)}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", flexShrink: 0 }}>MORE FROM THE NETWORK</span>
          <div className="rule" style={{ flex: 1 }} />
        </div>

        {/* Nav tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { to: "/directory",  label: "Alumni directory", sub: "12,400+ profiles · search & filter",             kicker: "DATABASE" },
            { to: "/resources",  label: "Resources",        sub: "Notes, guides & prep material from seniors",      kicker: "SENIORS → JUNIORS" },
            { to: "/placements", label: "Placements",       sub: "Internship & job referrals posted by alumni",     kicker: "OPPORTUNITIES" },
          ].map(({ to, label, sub, kicker }) => (
            <Link key={to} to={to} className="record-card" style={{ padding: "18px 20px", textDecoration: "none" }}>
              <span style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{kicker}</span>
              <p style={{ ...serif, fontSize: 16, fontWeight: 500, color: "var(--ink)", margin: "0 0 5px", letterSpacing: "-0.01em" }}>{label}</p>
              <p style={{ fontSize: 12, color: "var(--sub)", margin: "0 0 12px", lineHeight: 1.5 }}>{sub}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--blue)", fontWeight: 500 }}>
                Open <ArrowRight style={{ width: 11, height: 11 }} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
