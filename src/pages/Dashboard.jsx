import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell, Users, Bookmark, Calendar, Edit3, CheckCircle,
  Clock, ArrowRight, MapPin, Mail, TrendingUp, Zap
} from "lucide-react";
import { alumni, avatarColors } from "../data/mockData";

const me = alumni[0];
const completionItems = [
  { label: "Basic info", done: true },
  { label: "Current company", done: true },
  { label: "Educational background", done: true },
  { label: "Phone number", done: false },
  { label: "Profile photo", done: false },
];
const profilePct = Math.round((completionItems.filter(i => i.done).length / completionItems.length) * 100);

const notifications = [
  { type: "welcome", text: "Welcome to MyAlum! Complete your profile to connect with batchmates.", time: "Just now", unread: true },
  { type: "event", text: "Alumni Meet 2025 — Register by Dec 15th", time: "2h ago", unread: true },
  { type: "connect", text: "Priya Nair from your batch accepted your connection.", time: "Yesterday", unread: false },
  { type: "update", text: "Rahul Gupta updated their profile. Now at Tata Motors.", time: "2 days ago", unread: false },
];

const events = [
  { title: "Alumni Meet 2025", date: "Dec 20, 2025", location: "IITG Campus", type: "In-Person" },
  { title: "Techniche Webinar: AI in 2025", date: "Nov 30, 2025", location: "Online", type: "Virtual" },
  { title: "CSE Batch 2014 Reunion", date: "Jan 15, 2026", location: "Bangalore", type: "In-Person" },
];

const netStats = [
  { label: "Connections", value: "47", icon: Users, color: "#6366f1", bg: "#eef2ff" },
  { label: "Saved", value: "12", icon: Bookmark, color: "#f59e0b", bg: "#fffbeb" },
  { label: "Events", value: "3", icon: Calendar, color: "#10b981", bg: "#f0fdf4" },
  { label: "Messages", value: "8", icon: Mail, color: "#ef4444", bg: "#fff1f2" },
];

export default function Dashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9" }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900" style={{ letterSpacing: "-0.02em" }}>
              Welcome back, {me.name.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">{me.course} · {me.branch} · Batch {me.endYear}</p>
          </div>
          <Link
            to={`/profile/${me.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </Link>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-0">
          {["overview", "notifications", "connections", "events"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="capitalize text-sm font-medium px-4 py-3 border-b-2 transition-all"
              style={{
                borderColor: tab === t ? "#6366f1" : "transparent",
                color: tab === t ? "#4f46e5" : "#94a3b8",
              }}
            >
              {t}
              {t === "notifications" && (
                <span className="ml-1.5 text-xs bg-indigo-100 text-indigo-600 font-semibold px-1.5 py-0.5 rounded-full">2</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-7">
        {tab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              {/* Profile completion */}
              <div className="rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-500" />
                    <h2 className="font-semibold text-slate-800 text-sm">Profile Completion</h2>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600" style={{ letterSpacing: "-0.03em" }}>{profilePct}%</span>
                </div>
                <div className="w-full rounded-full h-1.5 mb-5" style={{ background: "#f1f5f9" }}>
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${profilePct}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                  />
                </div>
                <div className="space-y-2.5">
                  {completionItems.map(({ label, done }) => (
                    <div key={label} className="flex items-center gap-3">
                      {done
                        ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        : <div className="w-4 h-4 rounded-full border-2 border-dashed border-slate-200 flex-shrink-0" />
                      }
                      <span className={`text-sm ${done ? "text-slate-400 line-through" : "text-slate-700"}`}>{label}</span>
                      {!done && (
                        <span className="ml-auto text-xs font-medium text-indigo-500 cursor-pointer hover:underline">Add</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent notifications */}
              <div className="rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-500" />
                    <h2 className="font-semibold text-slate-800 text-sm">Recent Updates</h2>
                  </div>
                  <button className="text-xs text-indigo-500 hover:text-indigo-700 font-medium" onClick={() => setTab("notifications")}>
                    View all
                  </button>
                </div>
                <div className="space-y-2">
                  {notifications.slice(0, 3).map((n, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-4 py-3 rounded-xl"
                      style={{ background: n.unread ? "#eef2ff" : "#f8fafc" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: n.unread ? "#6366f1" : "#cbd5e1" }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700">{n.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Net stats */}
              <div className="rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <h2 className="font-semibold text-slate-800 text-sm mb-4">My Network</h2>
                <div className="grid grid-cols-2 gap-3">
                  {netStats.map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="rounded-xl p-3 text-center" style={{ background: bg }}>
                      <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color }} />
                      <div className="font-bold text-slate-900 text-lg" style={{ letterSpacing: "-0.02em" }}>{value}</div>
                      <div className="text-xs text-slate-500">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* People you may know */}
              <div className="rounded-2xl p-6" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <h2 className="font-semibold text-slate-800 text-sm mb-1">People You May Know</h2>
                <p className="text-xs text-slate-400 mb-4">From your batch & branch</p>
                <div className="space-y-3">
                  {alumni.slice(1, 4).map((s, i) => (
                    <div key={s.id} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${["#6366f1,#8b5cf6", "#10b981,#059669", "#f59e0b,#d97706"][i]})` }}
                      >
                        {s.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link to={`/profile/${s.id}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 truncate block">
                          {s.name}
                        </Link>
                        <p className="text-xs text-slate-400 truncate">{s.currentCompany.name}</p>
                      </div>
                      <button
                        className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 transition-all"
                        style={{ background: "#eef2ff", color: "#4f46e5" }}
                      >
                        + Connect
                      </button>
                    </div>
                  ))}
                </div>
                <Link to="/directory" className="mt-5 flex items-center gap-1.5 text-sm text-indigo-500 hover:text-indigo-700 font-medium">
                  Browse all alumni <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div className="max-w-2xl rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-4"
                style={{ borderBottom: i < notifications.length - 1 ? "1px solid #f1f5f9" : "none", background: n.unread ? "#fafbff" : "#fff" }}
              >
                <div className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0" style={{ background: n.unread ? "#6366f1" : "transparent" }} />
                <div>
                  <p className="text-sm text-slate-700">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "connections" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alumni.slice(1).map((a, i) => (
              <div key={a.id} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${["#6366f1,#8b5cf6","#10b981,#059669","#f59e0b,#d97706","#ef4444,#dc2626","#06b6d4,#0891b2"][i % 5]})` }}
                >
                  {a.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/profile/${a.id}`} className="text-sm font-semibold text-slate-900 hover:text-indigo-600 truncate block">
                    {a.name}
                  </Link>
                  <p className="text-xs text-slate-500 truncate">{a.currentCompany.position}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {a.currentCity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "events" && (
          <div className="max-w-2xl space-y-3">
            {events.map((e, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff" }}
                >
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">{e.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span>{e.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={e.type === "Virtual"
                      ? { background: "#eff6ff", color: "#2563eb" }
                      : { background: "#f0fdf4", color: "#16a34a" }}
                  >{e.type}</span>
                  <button className="text-xs text-indigo-500 font-semibold hover:text-indigo-700">Register →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
