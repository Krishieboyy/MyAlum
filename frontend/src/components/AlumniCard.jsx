import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { serif, mono, catBadge, avatarBg } from "../theme";

export default function AlumniCard({ alumni: a }) {
  const badge = catBadge(a.category);

  return (
    <Link to={`/profile/${a.id}`} className="record-card">
      <div style={{ padding: "16px 18px" }}>
        {/* Kicker row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <span className="badge" style={{ ...badge }}>
            {a.category}
          </span>
          {/* Round avatar */}
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: avatarBg(a.category),
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 12, fontWeight: 600, flexShrink: 0,
          }}>
            {a.avatar}
          </div>
        </div>

        {/* Name — serif */}
        <p style={{ ...serif, fontSize: 17, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.015em", lineHeight: 1.2, margin: "0 0 4px" }}>
          {a.name}
        </p>
        <p style={{ fontSize: 12.5, color: "var(--sub)", margin: "0 0 1px", lineHeight: 1.4 }}>
          {a.currentCompany.position}
        </p>
        <p style={{ fontSize: 12.5, color: "var(--sub)", margin: 0, lineHeight: 1.4 }}>
          {a.currentCompany.name}
        </p>
      </div>

      {/* Hairline */}
      <div className="rule" />

      {/* Data footer — all mono */}
      <div style={{ padding: "8px 18px", display: "flex", alignItems: "center", gap: 0 }}>
        <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)", letterSpacing: "0.04em" }}>
          {a.branch.split(" ")[0].toUpperCase()}
        </span>
        <span style={{ ...mono, fontSize: 10.5, color: "var(--rule)", margin: "0 10px" }}>·</span>
        <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
          {a.endYear}
        </span>
        <span style={{ flex: 1 }} />
        <span style={{ display: "flex", alignItems: "center", gap: 3, ...mono, fontSize: 10.5, color: "var(--sub)" }}>
          <MapPin style={{ width: 10, height: 10 }} />
          {a.currentCity}
        </span>
      </div>
    </Link>
  );
}
