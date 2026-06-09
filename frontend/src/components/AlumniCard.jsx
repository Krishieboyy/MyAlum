import { Link } from "react-router-dom";
import { MapPin, Globe } from "lucide-react";

const catColor = {
  FOUNDER:       { bg: "#ede9fe", text: "#6d28d9" },
  EMPLOYEE:      { bg: "#e0f2fe", text: "#0369a1" },
  "GOVT OFFICER":{ bg: "#dcfce7", text: "#15803d" },
  BUSINESSMAN:   { bg: "#fef9c3", text: "#a16207" },
  RESEARCHER:    { bg: "#cffafe", text: "#0e7490" },
  TEACHER:       { bg: "#fce7f3", text: "#be185d" },
  PROFESSOR:     { bg: "#fce7f3", text: "#be185d" },
};

const accentColors = ["#6366f1","#10b981","#f59e0b","#ef4444","#06b6d4","#8b5cf6"];

export default function AlumniCard({ alumni: a, index = 0 }) {
  const accent = accentColors[index % accentColors.length];
  const cat = catColor[a.category] || { bg: "#f5f5f4", text: "#57534e" };

  return (
    <Link
      to={`/profile/${a.id}`}
      style={{
        display: "block",
        background: "#fff",
        border: "1px solid #e7e5e4",
        borderRadius: 8,
        textDecoration: "none",
        overflow: "hidden",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#e7e5e4"}
    >
      {/* Left accent bar */}
      <div style={{ height: 3, background: accent }} />

      <div style={{ padding: "14px 16px" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: accent + "20",
            border: `1px solid ${accent}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            fontWeight: 700, fontSize: 13, color: accent,
          }}>
            {a.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 13.5, color: "#1c1917", lineHeight: 1.3 }}>{a.name}</span>
              {a.isNRI && <Globe style={{ width: 11, height: 11, color: "#6366f1", flexShrink: 0 }} />}
            </div>
            <div style={{ fontSize: 12, color: "#78716c", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {a.currentCompany.position}
            </div>
          </div>
        </div>

        {/* Company */}
        <div style={{
          fontSize: 12, color: "#57534e",
          borderTop: "1px solid #f5f5f4",
          paddingTop: 9, marginBottom: 9,
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <span style={{ fontWeight: 500, color: "#292524" }}>{a.currentCompany.name}</span>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "2px 7px",
              borderRadius: 4, background: cat.bg, color: cat.text,
            }}>{a.category}</span>
            <span className="mono" style={{ color: "#a8a29e" }}>{a.endYear}</span>
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#a8a29e" }}>
            <MapPin style={{ width: 10, height: 10 }} />
            {a.currentCity}
          </span>
        </div>
      </div>
    </Link>
  );
}
