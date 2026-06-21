import { useState } from "react";
import { Shield, Search, Download, Mail, Phone, Trash2, Eye, EyeOff, AlertCircle, CheckCircle, Users, TrendingUp, MessageSquare, Flag } from "lucide-react";
import { alumni, stats } from "../data/mockData";
import { serif, mono, catBadge, avatarBg } from "../theme";

export default function Admin() {
  const [q, setQ] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [revealed, setRevealedSet] = useState(new Set());
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  const toggle = (id) => setRevealedSet(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const toggleSelect = (id) => {
    setSelectedUsers(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = alumni.filter(a => {
    const lq = q.toLowerCase();
    return !lq || a.name.toLowerCase().includes(lq) || a.branch.toLowerCase().includes(lq) || a.alumniCardId.toLowerCase().includes(lq);
  });

  const reports = [
    { id: 1, type: "SPAM", user: "Unknown User", content: "Suspicious post about crypto", date: "2 hours ago", status: "pending" },
    { id: 2, type: "HARASSMENT", user: "Another User", content: "Inappropriate comment", date: "5 hours ago", status: "pending" },
    { id: 3, type: "MISINFORMATION", user: "Test User", content: "False job posting", date: "1 day ago", status: "resolved" },
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
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Shield style={{ width: 24, height: 24, color: "var(--blue)" }} />
              <h1 style={{ ...serif, fontSize: 28, fontWeight: 600, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
                Admin Panel
              </h1>
            </div>
            <p style={{ ...mono, fontSize: 11, color: "var(--sub)", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              IITG-ADMIN · READ / WRITE · SESSION ACTIVE
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--blue)",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
            }}>
              <Download style={{ width: 14, height: 14 }} /> Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
          <StatCard icon={Users} label="Total Users" value={stats.totalAlumni.toLocaleString()} color="var(--blue)" />
          <StatCard icon={TrendingUp} label="Active This Month" value="3,240" color="var(--green)" />
          <StatCard icon={AlertCircle} label="Pending Reports" value="12" color="var(--amber)" />
          <StatCard icon={CheckCircle} label="Resolved Reports" value="156" color="var(--green)" />
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--rule)",
          marginBottom: 24,
        }}>
          {["users", "content", "reports"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 20px",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid var(--blue)" : "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: activeTab === tab ? 600 : 500,
                color: activeTab === tab ? "var(--ink)" : "var(--sub)",
                textTransform: "capitalize",
              }}
            >
              {tab === "users" && `Users (${alumni.length})`}
              {tab === "content" && "Content Moderation"}
              {tab === "reports" && `Reports (${reports.filter(r => r.status === "pending").length})`}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Search */}
            <div style={{
              display: "flex",
              gap: 8,
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: "12px 16px",
              alignItems: "center",
            }}>
              <Search style={{ width: 16, height: 16, color: "var(--sub)" }} />
              <input
                type="text"
                placeholder="Search by name, branch, or card ID..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  fontSize: 13,
                  outline: "none",
                  color: "var(--ink)",
                }}
              />
            </div>

            {/* Users Table */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              overflow: "hidden",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr 150px 150px 100px 100px",
                gap: 12,
                padding: "14px 16px",
                borderBottom: "1px solid var(--rule)",
                background: "var(--paper)",
                fontWeight: 600,
                fontSize: 12,
                color: "var(--sub)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                <div></div>
                <div>Name</div>
                <div>Branch</div>
                <div>Company</div>
                <div>Card ID</div>
                <div>Actions</div>
              </div>

              {filtered.map((a) => (
                <div key={a.id} style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 150px 150px 100px 100px",
                  gap: 12,
                  padding: "14px 16px",
                  borderBottom: "1px solid var(--rule)",
                  alignItems: "center",
                }}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(a.id)}
                    onChange={() => toggleSelect(a.id)}
                    style={{ cursor: "pointer", width: 16, height: 16 }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: avatarBg(a.category),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 600,
                    }}>
                      {a.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: "var(--sub)" }}>{a.alumniEmailId}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--sub)" }}>{a.branch.split(" ")[0]}</div>
                  <div style={{ fontSize: 12, color: "var(--sub)" }}>{a.currentCompany.name}</div>
                  <div style={{ ...mono, fontSize: 11, color: "var(--sub)" }}>{a.alumniCardId}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => toggle(a.id)}
                      title={revealed.has(a.id) ? "Hide" : "Show"}
                      style={{
                        background: "transparent",
                        border: "1px solid var(--rule)",
                        borderRadius: 3,
                        padding: "4px 8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        color: "var(--sub)",
                      }}
                    >
                      {revealed.has(a.id) ? <EyeOff size={12} /> : <Eye size={12} />}
                    </button>
                    <button style={{
                      background: "transparent",
                      border: "1px solid #dc2626",
                      borderRadius: 3,
                      padding: "4px 8px",
                      cursor: "pointer",
                      color: "#dc2626",
                      fontSize: 11,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Revealed contact info */}
                  {revealed.has(a.id) && (
                    <div style={{
                      gridColumn: "1 / -1",
                      padding: "12px",
                      background: "#FFFDF8",
                      borderRadius: 4,
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 16,
                    }}>
                      <div>
                        <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Alumni Email</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink)" }}>
                          <Mail style={{ width: 12, height: 12 }} /> {a.alumniEmailId}
                        </span>
                      </div>
                      <div>
                        <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Work Email</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink)" }}>
                          <Mail style={{ width: 12, height: 12 }} /> {a.emailAddresses[0] || "—"}
                        </span>
                      </div>
                      <div>
                        <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Phone</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--sub)" }}>
                          <Phone style={{ width: 12, height: 12 }} /> {a.phoneNumbers[0] || "Not on record"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Moderation Tab */}
        {activeTab === "content" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: "16px",
              textAlign: "center",
              color: "var(--sub)",
            }}>
              <MessageSquare style={{ width: 32, height: 32, margin: "0 auto 12px", color: "var(--rule)" }} />
              <p style={{ fontSize: 13, margin: 0 }}>Content moderation tools coming soon</p>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {reports.map(report => (
              <div key={report.id} style={{
                background: "var(--surface)",
                border: "1px solid var(--rule)",
                borderRadius: 6,
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}>
                <div style={{ display: "flex", gap: 12, flex: 1 }}>
                  <Flag style={{
                    width: 20,
                    height: 20,
                    color: report.type === "SPAM" ? "var(--amber)" : report.type === "HARASSMENT" ? "#dc2626" : "var(--blue)",
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                      <span style={{ ...mono, fontSize: 10, fontWeight: 600, color: "var(--ink)", textTransform: "uppercase" }}>
                        {report.type}
                      </span>
                      <span style={{
                        ...mono,
                        fontSize: 10,
                        padding: "2px 8px",
                        borderRadius: 3,
                        background: report.status === "pending" ? "#FEF3C7" : "#DBEAFE",
                        color: report.status === "pending" ? "#92400E" : "#1E40AF",
                        textTransform: "uppercase",
                      }}>
                        {report.status}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--ink)", margin: "0 0 4px", fontWeight: 500 }}>
                      {report.content}
                    </p>
                    <span style={{ fontSize: 12, color: "var(--sub)" }}>Reported by: {report.user} · {report.date}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {report.status === "pending" && (
                    <>
                      <button style={{
                        padding: "6px 12px",
                        background: "var(--green)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 3,
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 500,
                      }}>
                        Resolve
                      </button>
                      <button style={{
                        padding: "6px 12px",
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: 3,
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 500,
                      }}>
                        Remove
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
