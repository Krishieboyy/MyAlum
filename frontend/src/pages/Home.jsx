import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, MessageCircle, Share2, Sparkles, TrendingUp } from "lucide-react";
import { news, alumni, stats } from "../data/mockData";
import { serif, mono, avatarBg } from "../theme";
import { useAuth } from "../context/AuthContext";

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
  const [liked, setLiked] = useState(false);
  const ts = tagStyle(item.tag);
  const alum = alumni.find(a => a.id === item.alumniId) || {};
  
  return (
    <div className="record-card" style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <Link to={`/profile/${item.alumniId}`} style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", flex: 1 }}>
        <div style={{ padding: large ? "22px 24px 20px" : "16px 18px 14px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: large ? 14 : 10, flexWrap: "wrap" }}>
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
      </Link>
      
      <div className="rule" />
      
      {/* Footer with author and actions */}
      <div style={{ padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to={`/profile/${item.alumniId}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: avatarBg(alum.category || ""), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 7.5, fontWeight: 600, flexShrink: 0 }}>
            {alum.avatar || "??"}
          </div>
          <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>{item.alumniName} · {item.alumniBatch}</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => setLiked(!liked)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 6px", display: "flex", alignItems: "center", gap: 4 }}>
            <Heart style={{ width: 13, height: 13, color: liked ? "#dc2626" : "var(--rule)", fill: liked ? "#dc2626" : "none" }} />
            <span style={{ fontSize: 10, color: "var(--sub)" }}>12</span>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 6px", display: "flex", alignItems: "center", gap: 4 }}>
            <MessageCircle style={{ width: 13, height: 13, color: "var(--rule)" }} />
            <span style={{ fontSize: 10, color: "var(--sub)" }}>3</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const featured = news.find(n => n.featured);
  const rest = news.filter(n => !n.featured);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header with stats */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h1 style={{ ...serif, fontSize: 28, fontWeight: 600, color: "var(--ink)", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                Alumni Network
              </h1>
              <p style={{ fontSize: 14, color: "var(--sub)", margin: 0 }}>
                Discover achievements, opportunities, and connections from IIT Guwahati alumni
              </p>
            </div>
            <span style={{ ...mono, fontSize: 11, color: "var(--sub)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()}
            </span>
          </div>

          {/* Stats bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { label: "Total Alumni", value: stats.totalAlumni.toLocaleString() },
              { label: "Countries", value: stats.countries },
              { label: "Companies", value: stats.companies.toLocaleString() },
              { label: "Founders", value: stats.founders },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: "var(--surface)",
                border: "1px solid var(--rule)",
                borderRadius: 6,
                padding: "14px 16px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "var(--blue)", marginBottom: 4 }}>
                  {value}
                </div>
                <div style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured story */}
        {featured && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Sparkles style={{ width: 16, height: 16, color: "var(--amber)" }} />
              <span style={{ ...mono, fontSize: 11, color: "var(--amber)", letterSpacing: "0.08em", fontWeight: 600, textTransform: "uppercase" }}>Featured</span>
            </div>
            <NewsCard item={featured} large />
          </div>
        )}

        {/* Section divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <TrendingUp style={{ width: 16, height: 16, color: "var(--blue)" }} />
          <span style={{ ...mono, fontSize: 11, color: "var(--ink)", letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase" }}>Recent Updates</span>
          <div className="rule" style={{ flex: 1 }} />
        </div>

        {/* News grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 40 }}>
          {rest.map(item => <NewsCard key={item.id} item={item} />)}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <span style={{ ...mono, fontSize: 11, color: "var(--ink)", letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase" }}>Explore More</span>
          <div className="rule" style={{ flex: 1 }} />
        </div>

        {/* Navigation tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            {
              to: "/directory",
              label: "Alumni Directory",
              sub: "12,400+ profiles · search & filter by branch, company & more",
              kicker: "DATABASE",
              icon: "👥",
            },
            {
              to: "/resources",
              label: "Resources & Guides",
              sub: "Notes, interview prep & career guides from alumni",
              kicker: "LEARN",
              icon: "📚",
            },
            {
              to: "/placements",
              label: "Opportunities",
              sub: "Internships & job referrals posted by alumni",
              kicker: "CAREERS",
              icon: "🚀",
            },
          ].map(({ to, label, sub, kicker, icon }) => (
            <Link key={to} to={to} className="record-card" style={{
              padding: "20px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              transition: "transform 200ms, box-shadow 200ms",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div>
                <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6, fontWeight: 600 }}>
                  {kicker}
                </span>
                <p style={{ ...serif, fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                  {label}
                </p>
                <p style={{ fontSize: 12.5, color: "var(--sub)", margin: "0 0 10px", lineHeight: 1.5 }}>
                  {sub}
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--blue)", fontWeight: 600 }}>
                  Explore <ArrowRight style={{ width: 12, height: 12 }} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section for logged-out users */}
        {!user && (
          <div style={{
            marginTop: 40,
            padding: "24px",
            background: "linear-gradient(135deg, var(--blue) 0%, rgba(0, 51, 102, 0.8) 100%)",
            borderRadius: 6,
            textAlign: "center",
            color: "#fff",
          }}>
            <h2 style={{ ...serif, fontSize: 20, fontWeight: 600, margin: "0 0 8px" }}>
              Join the Network
            </h2>
            <p style={{ fontSize: 14, margin: "0 0 16px", opacity: 0.9 }}>
              Sign in to connect with alumni, access resources, and discover opportunities
            </p>
            <Link to="/login" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              background: "#fff",
              color: "var(--blue)",
              textDecoration: "none",
              borderRadius: 4,
              fontWeight: 600,
              fontSize: 13,
            }}>
              Sign In <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
