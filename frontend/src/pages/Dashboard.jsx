import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Users, Bookmark, Calendar, Edit3, CheckCircle, ArrowRight, MapPin, Mail } from "lucide-react";
import { alumni } from "../data/mockData";

const me = alumni[0];
const items = [
  { label: "Basic info", done: true },
  { label: "Current company", done: true },
  { label: "Educational background", done: true },
  { label: "Phone number", done: false },
  { label: "Profile photo", done: false },
];
const pct = Math.round(items.filter(i => i.done).length / items.length * 100);

const notifs = [
  { text: "Welcome to MyAlum — complete your profile to connect.", time: "just now", unread: true },
  { text: "Alumni Meet 2025 registration closes Dec 15th.", time: "2h ago", unread: true },
  { text: "Priya Nair accepted your connection request.", time: "yesterday", unread: false },
  { text: "Rahul Gupta updated their profile — now at Tata Motors.", time: "2d ago", unread: false },
];

const events = [
  { title: "Alumni Meet 2025", date: "Dec 20, 2025", location: "IITG Campus", type: "in-person" },
  { title: "Techniche Webinar: AI in 2025", date: "Nov 30, 2025", location: "Online", type: "virtual" },
  { title: "CSE 2014 Batch Reunion", date: "Jan 15, 2026", location: "Bangalore", type: "in-person" },
];

const tabs = ["overview", "notifications", "connections", "events"];

export default function Dashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ background: "#f5f5f4", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#1c1917", margin: "0 0 3px" }}>
                Hey, {me.name.split(" ")[0]} 👋
              </h1>
              <div className="mono" style={{ color: "#a8a29e", fontSize: 11 }}>
                {me.course} · {me.branch} · Batch {me.endYear}
              </div>
            </div>
            <Link to={`/profile/${me.id}`} style={{
              display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600,
              background: "#1c1917", color: "#fff", padding: "7px 14px", borderRadius: 6,
              textDecoration: "none",
            }}>
              <Edit3 style={{ width: 13, height: 13 }} /> Edit profile
            </Link>
          </div>

          <div style={{ display: "flex", gap: 0 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontSize: 13, fontWeight: tab === t ? 600 : 400,
                color: tab === t ? "#1c1917" : "#a8a29e",
                background: "none", border: "none", borderBottom: `2px solid ${tab === t ? "#6366f1" : "transparent"}`,
                padding: "8px 16px 10px", cursor: "pointer", textTransform: "capitalize",
              }}>
                {t}
                {t === "notifications" && <span style={{ marginLeft: 5, background: "#6366f1", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 10 }}>2</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Profile completion */}
              <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8 }}>
                <div style={{ padding: "14px 16px", borderBottom: "1px solid #f5f5f4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>Profile completion</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "#6366f1" }}>{pct}%</span>
                </div>
                <div style={{ padding: "12px 16px 16px" }}>
                  <div style={{ height: 4, background: "#f5f5f4", borderRadius: 4, marginBottom: 14, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "#6366f1", borderRadius: 4 }} />
                  </div>
                  {items.map(({ label, done }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0", borderBottom: "1px solid #fafaf9" }}>
                      {done
                        ? <CheckCircle style={{ width: 14, height: 14, color: "#10b981", flexShrink: 0 }} />
                        : <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px dashed #d6d3d1", flexShrink: 0 }} />}
                      <span style={{ fontSize: 13, color: done ? "#a8a29e" : "#1c1917", textDecoration: done ? "line-through" : "none" }}>{label}</span>
                      {!done && <span style={{ marginLeft: "auto", fontSize: 11, color: "#6366f1", fontWeight: 600, cursor: "pointer" }}>+ Add</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications preview */}
              <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8 }}>
                <div style={{ padding: "14px 16px", borderBottom: "1px solid #f5f5f4", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>Recent notifications</span>
                  <button onClick={() => setTab("notifications")} style={{ fontSize: 12, color: "#6366f1", background: "none", border: "none", cursor: "pointer" }}>view all</button>
                </div>
                {notifs.slice(0, 3).map((n, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 16px",
                    background: n.unread ? "#fafbff" : "#fff",
                    borderBottom: i < 2 ? "1px solid #f5f5f4" : "none",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: n.unread ? "#6366f1" : "#e7e5e4", flexShrink: 0, marginTop: 5 }} />
                    <div>
                      <div style={{ fontSize: 13, color: "#292524" }}>{n.text}</div>
                      <div className="mono" style={{ fontSize: 11, color: "#a8a29e", marginTop: 2 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Stats */}
              <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #f5f5f4", fontSize: 13, fontWeight: 600, color: "#1c1917" }}>My network</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#f5f5f4" }}>
                  {[
                    { l: "Connections", v: "47", icon: Users, color: "#6366f1" },
                    { l: "Saved", v: "12", icon: Bookmark, color: "#f59e0b" },
                    { l: "Events", v: "3", icon: Calendar, color: "#10b981" },
                    { l: "Messages", v: "8", icon: Mail, color: "#ef4444" },
                  ].map(({ l, v, icon: Icon, color }) => (
                    <div key={l} style={{ background: "#fff", padding: "14px 16px", textAlign: "center" }}>
                      <Icon style={{ width: 16, height: 16, color, margin: "0 auto 6px" }} />
                      <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "#1c1917" }}>{v}</div>
                      <div style={{ fontSize: 11, color: "#a8a29e" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* People you may know */}
              <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #f5f5f4" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>People you may know</div>
                  <div style={{ fontSize: 11, color: "#a8a29e", marginTop: 1 }}>from your batch & branch</div>
                </div>
                {alumni.slice(1, 4).map((s, i) => {
                  const colors = ["#6366f1","#10b981","#f59e0b"];
                  return (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderBottom: "1px solid #f5f5f4" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 6, background: colors[i] + "18", border: `1px solid ${colors[i]}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: colors[i], flexShrink: 0 }}>
                        {s.avatar}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link to={`/profile/${s.id}`} style={{ fontSize: 13, fontWeight: 600, color: "#1c1917", textDecoration: "none", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {s.name}
                        </Link>
                        <div style={{ fontSize: 11, color: "#a8a29e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.currentCompany.name}</div>
                      </div>
                      <button style={{ fontSize: 11, fontWeight: 600, background: "#eef2ff", color: "#4f46e5", border: "1px solid #c7d2fe", borderRadius: 4, padding: "3px 8px", cursor: "pointer", flexShrink: 0 }}>
                        + Connect
                      </button>
                    </div>
                  );
                })}
                <div style={{ padding: "10px 16px" }}>
                  <Link to="/directory" style={{ fontSize: 12, color: "#6366f1", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                    Browse all alumni <ArrowRight style={{ width: 12, height: 12 }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden", maxWidth: 640 }}>
            {notifs.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "14px 18px", background: n.unread ? "#fafbff" : "#fff", borderBottom: i < notifs.length - 1 ? "1px solid #f5f5f4" : "none" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.unread ? "#6366f1" : "transparent", flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ fontSize: 13, color: "#292524" }}>{n.text}</div>
                  <div className="mono" style={{ fontSize: 11, color: "#a8a29e", marginTop: 3 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "connections" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {alumni.slice(1).map((a, i) => {
              const colors = ["#6366f1","#10b981","#f59e0b","#ef4444","#06b6d4"];
              const c = colors[i % 5];
              return (
                <div key={a.id} style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, padding: "14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: c + "18", border: `1px solid ${c}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: c, flexShrink: 0 }}>
                    {a.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link to={`/profile/${a.id}`} style={{ fontSize: 13, fontWeight: 600, color: "#1c1917", textDecoration: "none", display: "block" }}>{a.name}</Link>
                    <div style={{ fontSize: 12, color: "#78716c", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.currentCompany.position}</div>
                    <div style={{ fontSize: 11, color: "#a8a29e", display: "flex", alignItems: "center", gap: 3, marginTop: 3 }}>
                      <MapPin style={{ width: 10, height: 10 }} /> {a.currentCity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "events" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 600 }}>
            {events.map((e, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Calendar style={{ width: 16, height: 16, color: "#6366f1" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>{e.title}</div>
                  <div className="mono" style={{ fontSize: 11, color: "#a8a29e", marginTop: 2 }}>{e.date} · {e.location}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: e.type === "virtual" ? "#e0f2fe" : "#dcfce7", color: e.type === "virtual" ? "#0369a1" : "#15803d" }}>{e.type}</span>
                  <button style={{ fontSize: 12, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Register →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
