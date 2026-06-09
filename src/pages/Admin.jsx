import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Users, Search, Download, RefreshCw,
  Mail, Phone, CheckCircle, XCircle, AlertTriangle,
  BarChart3, Upload, Zap, X
} from "lucide-react";
import { alumni, categoryColors, avatarColors } from "../data/mockData";

const statCards = [
  { label: "Total Alumni", value: "12,400", sub: "+128 this month", color: "#6366f1", bg: "#eef2ff", icon: Users },
  { label: "Verified Profiles", value: "8,240", sub: "66% of total", color: "#10b981", bg: "#f0fdf4", icon: CheckCircle },
  { label: "Pending Updates", value: "342", sub: "Needs review", color: "#f59e0b", bg: "#fffbeb", icon: RefreshCw },
  { label: "Enriched Contacts", value: "5,120", sub: "+43 this week", color: "#8b5cf6", bg: "#fdf4ff", icon: Zap },
];

const dataSources = [
  { source: "LinkedIn Enrichment", last: "2h ago", status: "ok", count: "4,320 profiles synced" },
  { source: "IITG Academic Records", last: "1 day ago", status: "ok", count: "12,100 records matched" },
  { source: "Club & Fest Data", last: "3 days ago", status: "warn", count: "2,840 activities imported" },
  { source: "Alumni Self-Updates", last: "Real-time", status: "ok", count: "128 updates this month" },
];

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [selected, setSelected] = useState([]);
  const [q, setQ] = useState("");

  const filtered = alumni.filter(a => !q || a.name.toLowerCase().includes(q.toLowerCase()) || a.currentCompany.name.toLowerCase().includes(q.toLowerCase()));
  const allSelected = selected.length === alumni.length;
  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const gradients = ["#6366f1,#8b5cf6", "#10b981,#059669", "#f59e0b,#d97706", "#ef4444,#dc2626", "#06b6d4,#0891b2", "#8b5cf6,#7c3aed"];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff1f2" }}>
            <Shield className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900" style={{ letterSpacing: "-0.02em" }}>Admin Panel</h1>
            <p className="text-sm text-slate-400">IITG Alumni Administration</p>
          </div>
          <div
            className="ml-auto flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: "#fffbeb", color: "#b45309", border: "1px solid #fde68a" }}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Restricted Access
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-0">
          {["dashboard", "manage alumni", "enrich", "import"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="capitalize text-sm font-medium px-4 py-3 border-b-2 transition-all"
              style={{
                borderColor: tab === t ? "#ef4444" : "transparent",
                color: tab === t ? "#dc2626" : "#94a3b8",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-7">

        {/* ── Dashboard tab ── */}
        {tab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map(({ label, value, sub, color, bg, icon: Icon }) => (
                <div key={label} className="rounded-2xl p-5" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-slate-500">{label}</p>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900" style={{ letterSpacing: "-0.03em" }}>{value}</p>
                  <p className="text-xs text-slate-400 mt-1">{sub}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                <h2 className="text-sm font-semibold text-slate-800">Data Source Sync Status</h2>
              </div>
              <div className="space-y-2.5">
                {dataSources.map(({ source, last, status, count }) => (
                  <div
                    key={source}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "#f8fafc" }}
                  >
                    {status === "ok"
                      ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      : <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    }
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{source}</p>
                      <p className="text-xs text-slate-400">{count}</p>
                    </div>
                    <span className="text-xs text-slate-400">{last}</span>
                    <button className="text-xs text-indigo-500 font-semibold hover:text-indigo-700">Sync</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Manage Alumni tab ── */}
        {tab === "manage alumni" && (
          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <div
                className="flex items-center rounded-xl overflow-hidden flex-1 min-w-56"
                style={{ background: "#fff", border: "1px solid #e2e8f0" }}
              >
                <Search className="w-4 h-4 text-slate-400 ml-4 flex-shrink-0" />
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search alumni..."
                  className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent"
                />
              </div>
              <button onClick={() => setSelected(allSelected ? [] : alumni.map(a => a.id))}
                className="text-sm text-indigo-500 font-medium hover:text-indigo-700">
                {allSelected ? "Deselect all" : "Select all"}
              </button>
              {selected.length > 0 && (
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: "#eef2ff", color: "#4f46e5" }}>
                    {selected.length} selected
                  </span>
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-white px-3 py-2 rounded-xl"
                    style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                    <Download className="w-4 h-4" /> Export
                  </button>
                  <button onClick={() => setSelected([])} className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl"
                    style={{ border: "1px solid #e2e8f0", color: "#64748b" }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                      <th className="w-12 px-4 py-3">
                        <input type="checkbox" checked={allSelected}
                          onChange={() => setSelected(allSelected ? [] : alumni.map(a => a.id))}
                          className="rounded accent-indigo-600" />
                      </th>
                      {["Alumni", "Branch / Batch", "Category", "Company", "Location", ""].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a, i) => (
                      <tr
                        key={a.id}
                        style={{
                          borderBottom: "1px solid #f8fafc",
                          background: selected.includes(a.id) ? "#fafbff" : "#fff"
                        }}
                        className="transition-colors hover:bg-slate-50"
                      >
                        <td className="px-4 py-3.5">
                          <input type="checkbox" checked={selected.includes(a.id)}
                            onChange={() => toggle(a.id)} className="rounded accent-indigo-600" />
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                              style={{ background: `linear-gradient(135deg,${gradients[i % 6]})` }}
                            >{a.avatar}</div>
                            <div>
                              <Link to={`/profile/${a.id}`} className="font-semibold text-slate-900 hover:text-indigo-600 text-sm">{a.name}</Link>
                              <p className="text-xs text-slate-400">{a.alumniEmailId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="text-xs font-medium text-slate-700">{a.branch.split(" ")[0]}</p>
                          <p className="text-xs text-slate-400">{a.course} · {a.endYear}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[a.category] || ""}`}>{a.category}</span>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-slate-600">{a.currentCompany.name}</td>
                        <td className="px-4 py-3.5 text-xs text-slate-400">{a.currentCity}, {a.currentCountry}</td>
                        <td className="px-4 py-3.5">
                          <Link to={`/profile/${a.id}`} className="text-xs text-indigo-500 font-semibold hover:text-indigo-700">Edit →</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Enrich tab ── */}
        {tab === "enrich" && (
          <div className="space-y-5">
            <div
              className="flex items-start gap-3 px-5 py-4 rounded-2xl"
              style={{ background: "#fffbeb", border: "1px solid #fde68a" }}
            >
              <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                Enriched contact data (emails & phones) is <strong>admin-only</strong> and not shown on public profiles.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: Mail, label: "Email Enrichment", count: "9,840 / 12,400", pct: 79, color: "#6366f1", bg: "#eef2ff", grad: "linear-gradient(135deg,#6366f1,#8b5cf6)" },
                { icon: Phone, label: "Phone Enrichment", count: "5,120 / 12,400", pct: 41, color: "#10b981", bg: "#f0fdf4", grad: "linear-gradient(135deg,#10b981,#059669)" },
              ].map(({ icon: Icon, label, count, pct, color, bg, grad }) => (
                <div key={label} className="rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <h3 className="font-semibold text-slate-800">{label}</h3>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Alumni enriched</span>
                    <span className="font-semibold text-slate-700">{count}</span>
                  </div>
                  <div className="w-full rounded-full h-1.5 mb-5" style={{ background: "#f1f5f9" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: grad }} />
                  </div>
                  <button
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                    style={{ background: grad }}
                  >
                    <Zap className="w-4 h-4" /> Enrich Selected ({selected.length || "all"})
                  </button>
                </div>
              ))}
            </div>

            {/* Preview table */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
                <h3 className="text-sm font-semibold text-slate-800">Enriched Data Preview</h3>
                <button className="flex items-center gap-1.5 text-xs text-indigo-500 font-semibold hover:text-indigo-700">
                  <Download className="w-4 h-4" /> Download CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                      {["Name", "Email", "Phone", "Status"].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {alumni.map((a, i) => (
                      <tr key={a.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                        <td className="px-5 py-3 font-medium text-slate-900 text-sm">{a.name}</td>
                        <td className="px-5 py-3 text-slate-600 text-xs">{a.emailAddresses[0] || "—"}</td>
                        <td className="px-5 py-3 text-slate-400 text-xs">Not enriched</td>
                        <td className="px-5 py-3">
                          {a.emailAddresses[0]
                            ? <span className="flex items-center gap-1 text-emerald-500 text-xs font-medium"><CheckCircle className="w-3.5 h-3.5" /> Email</span>
                            : <span className="text-slate-300 text-xs">—</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Import tab ── */}
        {tab === "import" && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { emoji: "🔗", title: "LinkedIn", desc: "Bulk import alumni profiles via Sales Navigator or CSV export.", action: "Connect LinkedIn", grad: "linear-gradient(135deg,#2563eb,#1d4ed8)", bg: "#eff6ff" },
                { emoji: "🎓", title: "Academic Records", desc: "Sync with IITG's student database for batch, branch and course data.", action: "Sync Records", grad: "linear-gradient(135deg,#6366f1,#8b5cf6)", bg: "#eef2ff" },
                { emoji: "🏆", title: "Club & Fest Data", desc: "Import campus activity records from Techniche, Alcheringa, and clubs.", action: "Import Data", grad: "linear-gradient(135deg,#f59e0b,#d97706)", bg: "#fffbeb" },
                { emoji: "📄", title: "CSV Upload", desc: "Upload a formatted CSV file with alumni data in bulk.", action: "Upload CSV", grad: "linear-gradient(135deg,#10b981,#059669)", bg: "#f0fdf4" },
              ].map(({ emoji, title, desc, action, grad, bg }) => (
                <div key={title} className="rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ background: bg }}>
                    {emoji}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5">{title}</h3>
                  <p className="text-sm text-slate-500 mb-5 leading-relaxed">{desc}</p>
                  <button
                    className="flex items-center gap-2 text-sm font-semibold text-white px-4 py-2.5 rounded-xl"
                    style={{ background: grad }}
                  >
                    <Upload className="w-4 h-4" /> {action}
                  </button>
                </div>
              ))}
            </div>

            {/* Template */}
            <div className="rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <h3 className="font-semibold text-slate-900 mb-1">CSV Import Template</h3>
              <p className="text-sm text-slate-400 mb-3">Required columns for bulk import</p>
              <div className="rounded-xl px-5 py-4 font-mono text-xs text-slate-600 overflow-x-auto" style={{ background: "#f8fafc", border: "1px solid #f1f5f9" }}>
                name, linkedin_url, category, branch, start_year, end_year, course, current_company, position, city, country, is_nri
              </div>
              <button className="mt-3 flex items-center gap-1.5 text-sm text-indigo-500 font-semibold hover:text-indigo-700">
                <Download className="w-4 h-4" /> Download template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
