import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Users, Globe, Building2, Rocket, Bell, BookOpen, MapPin, TrendingUp, MessageSquare, Heart, Share2 } from "lucide-react";
import { alumni, stats } from "../data/mockData";
import { serif, mono, catBadge, avatarBg } from "../theme";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("activity");

  if (!user) {
    return (
      <div style={{ background: "var(--paper)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--sub)" }}>Please log in to view your dashboard</p>
        </div>
      </div>
    );
  }

  const isAlumni = user.role === "alumni";
  const currentUser = isAlumni ? alumni.find(a => a.id === user.alumniId) : null;

  const updates = [
    { type: "CONNECTION", text: "Rohan Mehta sent you a connection request", date: "2 hours ago", icon: "👥" },
    { type: "MENTION", text: "Your post was liked by 12 alumni", date: "5 hours ago", icon: "❤️" },
    { type: "RESOURCE", text: "New resource added: 'System Design Interview Guide'", date: "1 day ago", icon: "📚" },
    { type: "EVENT", text: "Alcheringa 2025 — Alumni networking event", date: "2 days ago", icon: "🎉" },
    { type: "OPPORTUNITY", text: "New internship opportunity at Google", date: "3 days ago", icon: "🚀" },
  ];

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--rule)",
      borderRadius: 6,
      padding: "16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        background: `${color}20`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color,
      }}>
        <Icon size={20} />
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>{value}</div>
        <div style={{ fontSize: 12, color: "var(--sub)" }}>{label}</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
            <h1 style={{ ...serif, fontSize: 28, fontWeight: 600, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              Dashboard
            </h1>
            <span style={{ ...mono, fontSize: 11, color: "var(--sub)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Welcome back, {user.name.split(" ")[0]}
            </span>
          </div>
          <p style={{ fontSize: 14, color: "var(--sub)", margin: 0 }}>
            {isAlumni ? "Manage your profile, connections, and activity" : "Track your progress and opportunities"}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
          <StatCard icon={Users} label="Connections" value={isAlumni ? "142" : "8"} color="var(--blue)" />
          <StatCard icon={Heart} label="Profile Views" value={isAlumni ? "324" : "45"} color="var(--red)" />
          <StatCard icon={MessageSquare} label="Messages" value={isAlumni ? "12" : "3"} color="var(--green)" />
          <StatCard icon={TrendingUp} label="Engagement" value={isAlumni ? "89%" : "62%"} color="var(--amber)" />
        </div>

        {/* Main Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>

          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Profile Summary Card */}
            {isAlumni && currentUser && (
              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--rule)",
                borderRadius: 6,
                overflow: "hidden",
              }}>
                <div style={{
                  height: 100,
                  background: "linear-gradient(135deg, var(--blue) 0%, rgba(0, 51, 102, 0.8) 100%)",
                  position: "relative",
                }} />
                <div style={{ padding: "0 20px 20px", position: "relative" }}>
                  <div style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: avatarBg(currentUser.category),
                    border: "4px solid var(--surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: 600,
                    marginTop: -35,
                    marginBottom: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}>
                    {currentUser.avatar}
                  </div>
                  <h2 style={{ ...serif, fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>
                    {currentUser.name}
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--sub)", margin: "0 0 12px" }}>
                    {currentUser.currentCompany.position} at {currentUser.currentCompany.name}
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{
                      padding: "8px 16px",
                      background: "var(--blue)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 500,
                    }}>
                      Edit Profile
                    </button>
                    <button style={{
                      padding: "8px 16px",
                      background: "transparent",
                      color: "var(--blue)",
                      border: "1px solid var(--blue)",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 500,
                    }}>
                      View Public
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tabs */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              overflow: "hidden",
            }}>
              <div style={{
                display: "flex",
                borderBottom: "1px solid var(--rule)",
              }}>
                {["activity", "connections", "saved"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      background: activeTab === tab ? "var(--paper)" : "transparent",
                      border: "none",
                      borderBottom: activeTab === tab ? "2px solid var(--blue)" : "none",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: activeTab === tab ? 600 : 500,
                      color: activeTab === tab ? "var(--ink)" : "var(--sub)",
                      textTransform: "capitalize",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Activity Content */}
              <div style={{ padding: "16px" }}>
                {activeTab === "activity" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {updates.map((update, i) => (
                      <div key={i} style={{
                        padding: "12px",
                        background: "var(--paper)",
                        borderRadius: 4,
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}>
                        <div style={{ fontSize: 20 }}>{update.icon}</div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 13, color: "var(--ink)", margin: "0 0 4px", fontWeight: 500 }}>
                            {update.text}
                          </p>
                          <span style={{ ...mono, fontSize: 11, color: "var(--sub)" }}>{update.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "connections" && (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <Users style={{ width: 40, height: 40, color: "var(--rule)", margin: "0 auto 12px" }} />
                    <p style={{ fontSize: 13, color: "var(--sub)" }}>
                      {isAlumni ? "You have 142 connections" : "Connect with alumni to expand your network"}
                    </p>
                  </div>
                )}

                {activeTab === "saved" && (
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <Heart style={{ width: 40, height: 40, color: "var(--rule)", margin: "0 auto 12px" }} />
                    <p style={{ fontSize: 13, color: "var(--sub)" }}>
                      No saved items yet. Explore and save resources you find useful.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: "16px",
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", margin: "0 0 12px" }}>Quick Actions</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { label: "Browse Directory", icon: "👥" },
                  { label: "View Resources", icon: "📚" },
                  { label: "Explore Jobs", icon: "🚀" },
                  { label: "Join Events", icon: "🎉" },
                ].map(action => (
                  <button key={action.label} style={{
                    padding: "12px",
                    background: "var(--paper)",
                    border: "1px solid var(--rule)",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    justifyContent: "center",
                  }}>
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Network Stats */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: "16px",
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", margin: "0 0 12px" }}>Network Stats</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Total Alumni", value: stats.totalAlumni.toLocaleString() },
                  { label: "Countries", value: stats.countries },
                  { label: "Companies", value: stats.companies.toLocaleString() },
                  { label: "Founders", value: stats.founders },
                ].map(stat => (
                  <div key={stat.label} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "8px",
                    borderBottom: "1px solid var(--rule)",
                  }}>
                    <span style={{ fontSize: 12, color: "var(--sub)" }}>{stat.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: "16px",
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", margin: "0 0 12px" }}>Recommended</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { name: "Priya Nair", role: "Research Scientist at MIT" },
                  { name: "Rahul Gupta", role: "Engineering Manager at Tata Motors" },
                  { name: "Sneha Kapoor", role: "Deputy Director at NITI Aayog" },
                ].map(person => (
                  <div key={person.name} style={{
                    padding: "10px",
                    background: "var(--paper)",
                    borderRadius: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)", margin: "0 0 2px" }}>
                        {person.name}
                      </p>
                      <p style={{ fontSize: 11, color: "var(--sub)", margin: 0 }}>
                        {person.role}
                      </p>
                    </div>
                    <button style={{
                      padding: "4px 10px",
                      background: "var(--blue)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 3,
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 500,
                    }}>
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
