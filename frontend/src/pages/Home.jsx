import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, MessageCircle, Share2, Sparkles, TrendingUp, Users, Globe, Building2, Rocket, Award } from "lucide-react";
import { news, alumni, stats } from "../data/mockData";
import { serif, mono, avatarBg } from "../theme";
import { useAuth } from "../context/AuthContext";
import CompanyLogo from "../components/CompanyLogo";
import { NewsCardSkeleton, StatsBarSkeleton } from "../components/SkeletonLoader";

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
      
      {/* Author Header - Top Position */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link to={`/profile/${item.alumniId}`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flex: 1, minWidth: 0 }}>
          <div style={{ 
            width: 38, height: 38, borderRadius: "50%", 
            background: avatarBg(alum.category || ""), 
            display: "flex", alignItems: "center", justifyContent: "center", 
            color: "#fff", fontSize: 13, fontWeight: 600, flexShrink: 0,
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            {alum.avatar || "??"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "1 1 auto", minWidth: 0 }}>
            <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.alumniName}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2, minWidth: 0 }}>
              <CompanyLogo name={alum.currentCompany?.name} size={13} />
              <span style={{ fontSize: 12, color: "var(--sub)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {alum.currentCompany?.position} at <strong style={{ fontWeight: 500, color: "var(--ink)" }}>{alum.currentCompany?.name}</strong>
              </span>
            </div>
            <span style={{ fontSize: 11, color: "var(--sub)", marginTop: 2 }}>
              {item.alumniBatch} · {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        </Link>
        <span className="badge" style={{ ...ts, fontSize: 8.5, flexShrink: 0 }}>{item.tag}</span>
      </div>
      
      {/* Content Body */}
      <Link to={`/profile/${item.alumniId}`} style={{ display: "block", textDecoration: "none", flex: 1 }}>
        <div style={{ padding: "0 20px 16px" }}>
          <h2 style={{ 
            fontFamily: "var(--font-sans)", 
            fontSize: large ? 20 : 16, 
            fontWeight: 600, 
            color: "var(--ink)", 
            margin: "0 0 8px", 
            lineHeight: 1.4, 
            letterSpacing: "-0.01em" 
          }}>
            {item.headline}
          </h2>
          <p style={{ 
            fontSize: large ? 13.5 : 13, 
            color: "var(--sub)", 
            lineHeight: 1.6, 
            margin: 0 
          }}>
            {item.excerpt}
          </p>
        </div>
      </Link>
      
      <div className="rule" />
      
      {/* Social Actions Footer */}
      <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <button 
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }} 
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            padding: "6px 12px", 
            borderRadius: 4,
            display: "flex", 
            alignItems: "center", 
            gap: 6,
            fontSize: 12,
            fontWeight: 500,
            color: liked ? "var(--green)" : "var(--sub)",
            transition: "background 150ms ease"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.03)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <Heart style={{ width: 14, height: 14, color: liked ? "var(--green)" : "var(--sub)", fill: liked ? "var(--green)" : "none" }} />
          <span>{liked ? 13 : 12} Likes</span>
        </button>
        
        <button 
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            padding: "6px 12px", 
            borderRadius: 4,
            display: "flex", 
            alignItems: "center", 
            gap: 6,
            fontSize: 12,
            fontWeight: 500,
            color: "var(--sub)",
            transition: "background 150ms ease"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.03)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <MessageCircle style={{ width: 14, height: 14, color: "var(--sub)" }} />
          <span>3 Comments</span>
        </button>
      </div>
    </div>
  );
}

const SPOTLIGHT_ALUMNI = [
  {
    id: 1,
    name: "Arjun Sharma",
    batch: "CSE · 2014",
    company: "TechVentures India",
    position: "Co-Founder & CEO",
    achievement: "Forbes 30 Under 30",
    avatar: "AS",
    category: "FOUNDER"
  },
  {
    id: 2,
    name: "Priya Nair",
    batch: "ECE · 2016",
    company: "MIT Media Lab",
    position: "Research Scientist",
    achievement: "MIT RA & PhD",
    avatar: "PN",
    category: "RESEARCHER"
  },
  {
    id: 6,
    name: "Dr. Ananya Bose",
    batch: "MA · 2010",
    company: "IIT Delhi",
    position: "Associate Professor",
    achievement: "Ramanujan Fellow",
    avatar: "AB",
    category: "PROFESSOR"
  }
];

function AlumniSpotlight() {
  return (
    <div className="record-card animate-fade-in" style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Sparkles size={16} style={{ color: "var(--amber)" }} />
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em", ...mono }}>
          Alumni Spotlight
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {SPOTLIGHT_ALUMNI.map((alum, index) => (
          <div key={alum.id}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: avatarBg(alum.category),
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 12, fontWeight: 600, flexShrink: 0
              }}>
                {alum.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 4 }}>
                  <Link to={`/profile/${alum.id}`} style={{ textDecoration: "none", fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }} className="btn-premium">
                    {alum.name}
                  </Link>
                  <span style={{ fontSize: 10, color: "var(--sub)" }}>{alum.batch}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--sub)", margin: "2px 0 4px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {alum.position} at <strong>{alum.company}</strong>
                </p>
                <span style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: 4, 
                  fontSize: 10, 
                  color: "var(--amber)", 
                  background: "rgba(194, 119, 46, 0.08)", 
                  padding: "2px 6px", 
                  borderRadius: 4,
                  fontWeight: 500
                }}>
                  <Award size={10} />
                  {alum.achievement}
                </span>
              </div>
            </div>
            {index < SPOTLIGHT_ALUMNI.length - 1 && <div style={{ height: 1, background: "var(--rule)", marginTop: 12 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const featured = news.find(n => n.featured);
  const rest = news.filter(n => !n.featured);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }} className="animate-fade-in">

        {/* Header with stats */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                Alumni Network
              </h1>
              <p style={{ fontSize: 15, color: "var(--sub)", margin: 0 }}>
                Discover achievements, opportunities, and connections from IIT Guwahati alumni
              </p>
            </div>
            <span style={{ ...mono, fontSize: 11, color: "var(--sub)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()}
            </span>
          </div>

          {/* Stats bar */}
          {loading ? (
            <StatsBarSkeleton />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Alumni", value: stats.totalAlumni.toLocaleString(), icon: Users, color: "#1e40af", bg: "#eff6ff" },
                { label: "Countries", value: stats.countries, icon: Globe, color: "#166534", bg: "#f0fdf4" },
                { label: "Companies", value: stats.companies.toLocaleString(), icon: Building2, color: "#92400e", bg: "#fef3c7" },
                { label: "Founders", value: stats.founders, icon: Rocket, color: "#9f1239", bg: "#fff1f2" },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} style={{
                  background: "var(--surface)",
                  border: "1px solid var(--rule)",
                  borderRadius: 6,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 6,
                    background: bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: color, flexShrink: 0
                  }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>
                      {value}
                    </div>
                    <div style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Layout - Split Screen on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          
          {/* Main Feed Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            {/* Featured story */}
            {featured && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Sparkles style={{ width: 16, height: 16, color: "var(--amber)" }} />
                  <span style={{ ...mono, fontSize: 11, color: "var(--amber)", letterSpacing: "0.08em", fontWeight: 600, textTransform: "uppercase" }}>Featured</span>
                </div>
                {loading ? <NewsCardSkeleton /> : <NewsCard item={featured} large />}
              </div>
            )}

            {/* Section divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <TrendingUp style={{ width: 16, height: 16, color: "var(--blue)" }} />
              <span style={{ ...mono, fontSize: 11, color: "var(--ink)", letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase" }}>Recent Updates</span>
              <div className="rule" style={{ flex: 1 }} />
            </div>

            {/* News grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[1, 2].map(i => <NewsCardSkeleton key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rest.map(item => <NewsCard key={item.id} item={item} />)}
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* Spotlight Sidebar Widget */}
            <AlumniSpotlight />

            {/* Explore quick links */}
            <div className="record-card" style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Rocket size={16} style={{ color: "var(--blue)" }} />
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em", ...mono }}>
                  Resources & Links
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { to: "/directory", label: "👥 Alumni Directory", desc: "12,400+ registered profiles" },
                  { to: "/resources", label: "📚 Resources & Guides", desc: "Interview prep & notes" },
                  { to: "/placements", label: "🚀 Opportunities", desc: "Job referrals & openings" },
                ].map(({ to, label, desc }) => (
                  <Link key={to} to={to} style={{ textDecoration: "none", display: "block" }} className="btn-premium">
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)", margin: 0 }}>
                      {label}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--sub)", margin: "2px 0 0" }}>
                      {desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
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
            <Link to="/login" className="btn-premium" style={{
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
