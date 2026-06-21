import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { catBadge, avatarBg } from "../theme";
import CompanyLogo from "./CompanyLogo";

export default function AlumniCard({ alumni: a }) {
  const badge = catBadge(a.category);

  return (
    <Link to={`/profile/${a.id}`} className="record-card" style={{ textDecoration: "none" }}>
      <div style={{ padding: "16px 20px" }}>
        
        {/* Top Info Row */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          {/* Round avatar */}
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: avatarBg(a.category),
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 14, fontWeight: 600, flexShrink: 0,
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            {a.avatar}
          </div>
          
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Category badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span className="badge" style={{ ...badge, fontSize: 8.5 }}>
                {a.category}
              </span>
            </div>
            
            {/* Name */}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              {a.name}
            </p>
            
            {/* Company & Position Row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, minWidth: 0 }}>
              <CompanyLogo name={a.currentCompany.name} size={16} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: 12.5, color: "var(--ink)", margin: 0, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={a.currentCompany.position}>
                  {a.currentCompany.position}
                </p>
                <p style={{ fontSize: 11.5, color: "var(--sub)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={a.currentCompany.name}>
                  {a.currentCompany.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hairline rule */}
      <div className="rule" />

      {/* Data footer */}
      <div style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 0, fontSize: 12, color: "var(--sub)" }}>
        <span style={{ fontWeight: 500 }}>
          {a.branch.split(" ")[0]}
        </span>
        <span style={{ margin: "0 8px", color: "var(--rule)" }}>·</span>
        <span>
          Class of {a.endYear}
        </span>
        <span style={{ flex: 1 }} />
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin style={{ width: 12, height: 12, color: "var(--sub)" }} />
          {a.currentCity}
        </span>
      </div>
    </Link>
  );
}
