import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Search, Download, RefreshCw, Mail, Phone, CheckCircle, AlertTriangle, BarChart3, Upload, Zap, X } from "lucide-react";
import { alumni } from "../data/mockData";

const catColor = {
  FOUNDER:       { bg: "#ede9fe", text: "#6d28d9" },
  EMPLOYEE:      { bg: "#e0f2fe", text: "#0369a1" },
  "GOVT OFFICER":{ bg: "#dcfce7", text: "#15803d" },
  BUSINESSMAN:   { bg: "#fef9c3", text: "#a16207" },
  RESEARCHER:    { bg: "#cffafe", text: "#0e7490" },
  TEACHER:       { bg: "#fce7f3", text: "#be185d" },
  PROFESSOR:     { bg: "#fce7f3", text: "#be185d" },
};

const accents = ["#6366f1","#10b981","#f59e0b","#ef4444","#06b6d4","#8b5cf6"];

const statItems = [
  { label: "Total alumni", value: "12,400", sub: "+128 this month", icon: Users, color: "#6366f1" },
  { label: "Verified profiles", value: "8,240", sub: "66% of total", icon: CheckCircle, color: "#10b981" },
  { label: "Pending updates", value: "342", sub: "awaiting review", icon: RefreshCw, color: "#f59e0b" },
  { label: "Enriched contacts", value: "5,120", sub: "+43 this week", icon: Zap, color: "#8b5cf6" },
];

const sources = [
  { name: "LinkedIn Enrichment", last: "2h ago", ok: true, count: "4,320 profiles synced" },
  { name: "IITG Academic Records", last: "1 day ago", ok: true, count: "12,100 records matched" },
  { name: "Club & Fest Data", last: "3 days ago", ok: false, count: "2,840 activities imported" },
  { name: "Alumni Self-Updates", last: "real-time", ok: true, count: "128 updates this month" },
];

const tabs = ["dashboard", "manage alumni", "enrich", "import"];

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [selected, setSelected] = useState([]);
  const [q, setQ] = useState("");

  const filtered = alumni.filter(a => !q || a.name.toLowerCase().includes(q.toLowerCase()) || a.currentCompany.name.toLowerCase().includes(q.toLowerCase()));
  const allSel = selected.length === alumni.length;
  const toggle = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const th = { fontSize: 11, fontWeight: 600, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.07em", padding: "10px 14px", textAlign: "left", background: "#f5f5f4", borderBottom: "1px solid #e7e5e4" };
  const td = { fontSize: 13, padding: "10px 14px", borderBottom: "1px solid #f5f5f4", verticalAlign: "middle" };

  return (
    <div style={{ background: "#f5f5f4", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Shield style={{ width: 16, height: 16, color: "#ef4444" }} />
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#1c1917", margin: 0, letterSpacing: "-0.01em" }}>Admin Panel</h1>
            <span className="mono" style={{ fontSize: 10, background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", borderRadius: 4, padding: "2px 7px", marginLeft: 4 }}>restricted</span>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontSize: 13, fontWeight: tab === t ? 600 : 400,
                color: tab === t ? "#1c1917" : "#a8a29e",
                background: "none", border: "none", borderBottom: `2px solid ${tab === t ? "#ef4444" : "transparent"}`,
                padding: "8px 16px 10px", cursor: "pointer", textTransform: "capitalize",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {statItems.map(({ label, value, sub, icon: Icon, color }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: "#78716c" }}>{label}</span>
                    <Icon style={{ width: 14, height: 14, color, flexShrink: 0 }} />
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", color: "#1c1917" }}>{value}</div>
                  <div className="mono" style={{ fontSize: 11, color: "#a8a29e", marginTop: 3 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #f5f5f4", display: "flex", alignItems: "center", gap: 8 }}>
                <BarChart3 style={{ width: 14, height: 14, color: "#6366f1" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>Data source sync status</span>
              </div>
              {sources.map(({ name, last, ok, count }, i) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i < sources.length - 1 ? "1px solid #f5f5f4" : "none" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: ok ? "#10b981" : "#f59e0b", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1c1917" }}>{name}</div>
                    <div className="mono" style={{ fontSize: 11, color: "#a8a29e" }}>{count}</div>
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: "#a8a29e" }}>{last}</span>
                  <button style={{ fontSize: 12, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>sync</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MANAGE ALUMNI */}
        {tab === "manage alumni" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", border: "1px solid #e7e5e4", borderRadius: 6 }}>
                <Search style={{ width: 13, height: 13, color: "#a8a29e", margin: "0 10px", flexShrink: 0 }} />
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search alumni..."
                  style={{ flex: 1, border: "none", outline: "none", fontSize: 13, padding: "9px 0", color: "#1c1917", background: "none" }} />
              </div>
              <button onClick={() => setSelected(allSel ? [] : alumni.map(a => a.id))}
                style={{ fontSize: 12, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                {allSel ? "deselect all" : "select all"}
              </button>
              {selected.length > 0 && <>
                <span className="mono" style={{ fontSize: 11, background: "#eef2ff", color: "#4f46e5", padding: "4px 9px", borderRadius: 4 }}>{selected.length} selected</span>
                <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, background: "#1c1917", color: "#fff", border: "none", borderRadius: 6, padding: "7px 14px", cursor: "pointer" }}>
                  <Download style={{ width: 12, height: 12 }} /> Export
                </button>
                <button onClick={() => setSelected([])} style={{ background: "none", border: "1px solid #e7e5e4", borderRadius: 6, padding: "7px", cursor: "pointer", color: "#a8a29e" }}>
                  <X style={{ width: 13, height: 13 }} />
                </button>
              </>}
            </div>

            <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...th, width: 40 }}>
                      <input type="checkbox" checked={allSel} onChange={() => setSelected(allSel ? [] : alumni.map(a => a.id))} />
                    </th>
                    <th style={th}>Alumni</th>
                    <th style={th}>Branch / Batch</th>
                    <th style={th}>Category</th>
                    <th style={th}>Company</th>
                    <th style={th}>Location</th>
                    <th style={th} />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => {
                    const ac = accents[i % 6];
                    const cat = catColor[a.category] || { bg: "#f5f5f4", text: "#57534e" };
                    return (
                      <tr key={a.id} style={{ background: selected.includes(a.id) ? "#fafbff" : "#fff" }}>
                        <td style={td}><input type="checkbox" checked={selected.includes(a.id)} onChange={() => toggle(a.id)} /></td>
                        <td style={td}>
                          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 6, background: ac + "18", border: `1px solid ${ac}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: ac, flexShrink: 0 }}>{a.avatar}</div>
                            <div>
                              <Link to={`/profile/${a.id}`} style={{ fontSize: 13, fontWeight: 600, color: "#1c1917", textDecoration: "none" }}>{a.name}</Link>
                              <div className="mono" style={{ fontSize: 10, color: "#a8a29e" }}>{a.alumniEmailId}</div>
                            </div>
                          </div>
                        </td>
                        <td style={td}>
                          <div style={{ fontSize: 12, fontWeight: 500, color: "#292524" }}>{a.branch.split(" ")[0]}</div>
                          <div className="mono" style={{ fontSize: 11, color: "#a8a29e" }}>{a.course} · {a.endYear}</div>
                        </td>
                        <td style={td}><span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: cat.bg, color: cat.text }}>{a.category}</span></td>
                        <td style={{ ...td, fontSize: 12, color: "#57534e" }}>{a.currentCompany.name}</td>
                        <td style={{ ...td, fontSize: 12, color: "#a8a29e" }}>{a.currentCity}</td>
                        <td style={td}><Link to={`/profile/${a.id}`} style={{ fontSize: 12, color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>edit →</Link></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ENRICH */}
        {tab === "enrich" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "12px 14px", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8 }}>
              <AlertTriangle style={{ width: 14, height: 14, color: "#c2410c", flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 13, color: "#9a3412" }}>Enriched contact data is admin-only — emails and phones are never shown on public profiles.</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: Mail, label: "Email enrichment", count: "9,840", total: "12,400", pct: 79, color: "#6366f1" },
                { icon: Phone, label: "Phone enrichment", count: "5,120", total: "12,400", pct: 41, color: "#10b981" },
              ].map(({ icon: Icon, label, count, total, pct, color }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, padding: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <Icon style={{ width: 15, height: 15, color }} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1c1917" }}>{label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#78716c", marginBottom: 6 }}>
                    <span>Alumni enriched</span>
                    <span className="mono" style={{ color: "#1c1917", fontWeight: 600 }}>{count} / {total}</span>
                  </div>
                  <div style={{ height: 4, background: "#f5f5f4", borderRadius: 4, marginBottom: 16 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4 }} />
                  </div>
                  <button style={{ width: "100%", background: "#1c1917", color: "#fff", border: "none", borderRadius: 6, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Zap style={{ width: 13, height: 13 }} /> Enrich {selected.length > 0 ? `${selected.length} selected` : "all"}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #f5f5f4", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>Enriched data preview</span>
                <button style={{ fontSize: 12, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <Download style={{ width: 12, height: 12 }} /> CSV
                </button>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Name", "Email", "Phone", "Status"].map(h => (
                      <th key={h} style={{ fontSize: 11, fontWeight: 600, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.07em", padding: "10px 16px", textAlign: "left", background: "#f5f5f4", borderBottom: "1px solid #e7e5e4" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {alumni.map((a, i) => (
                    <tr key={a.id} style={{ borderBottom: "1px solid #f5f5f4" }}>
                      <td style={{ padding: "9px 16px", fontSize: 13, fontWeight: 500, color: "#1c1917" }}>{a.name}</td>
                      <td style={{ padding: "9px 16px", fontSize: 12, color: "#57534e" }}>{a.emailAddresses[0] || "—"}</td>
                      <td className="mono" style={{ padding: "9px 16px", fontSize: 11, color: "#a8a29e" }}>not enriched</td>
                      <td style={{ padding: "9px 16px" }}>
                        {a.emailAddresses[0]
                          ? <span style={{ fontSize: 11, fontWeight: 600, color: "#15803d", display: "flex", alignItems: "center", gap: 4 }}><CheckCircle style={{ width: 11, height: 11 }} /> email</span>
                          : <span style={{ fontSize: 11, color: "#d6d3d1" }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* IMPORT */}
        {tab === "import" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { emoji: "🔗", title: "LinkedIn import", desc: "Bulk import alumni via Sales Navigator CSV export or API.", action: "Connect LinkedIn" },
                { emoji: "🎓", title: "Academic records", desc: "Sync batch, branch, and course data directly from IITG's student DB.", action: "Sync records" },
                { emoji: "🏆", title: "Club & fest data", desc: "Import campus activity records — Techniche, Alcheringa, clubs.", action: "Import data" },
                { emoji: "📄", title: "CSV upload", desc: "Upload a formatted CSV to bulk-add alumni profiles.", action: "Upload CSV" },
              ].map(({ emoji, title, desc, action }) => (
                <div key={title} style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, padding: "18px" }}>
                  <div style={{ fontSize: 22, marginBottom: 10 }}>{emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1c1917", marginBottom: 5 }}>{title}</div>
                  <div style={{ fontSize: 12.5, color: "#78716c", lineHeight: 1.6, marginBottom: 14 }}>{desc}</div>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, background: "#1c1917", color: "#fff", border: "none", borderRadius: 6, padding: "7px 14px", cursor: "pointer" }}>
                    <Upload style={{ width: 12, height: 12 }} /> {action}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, padding: "18px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1917", marginBottom: 5 }}>CSV import template</div>
              <div style={{ fontSize: 12, color: "#78716c", marginBottom: 10 }}>Required columns:</div>
              <div className="mono" style={{ background: "#f5f5f4", border: "1px solid #e7e5e4", borderRadius: 6, padding: "12px 14px", color: "#57534e", overflowX: "auto" }}>
                name, linkedin_url, category, branch, start_year, end_year, course, current_company, position, city, country, is_nri
              </div>
              <button style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                <Download style={{ width: 12, height: 12 }} /> download template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
