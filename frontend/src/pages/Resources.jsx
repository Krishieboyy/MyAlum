import { useState } from "react";
import { BookOpen, Download, ArrowUpRight } from "lucide-react";
import { resources } from "../data/mockData";
import { serif, mono, avatarBg } from "../theme";

const TYPES = ["ALL", "NOTES", "GUIDE", "PREP"];

const TYPE_STYLE = {
  NOTES: ["#EEF2F8", "#1B3A66", "#B8C8DF"],
  GUIDE: ["#EDFAF3", "#2E7D5B", "#9ACFB8"],
  PREP:  ["#FDF6EE", "#C2772E", "#E8C89A"],
};
function typeStyle(t) {
  const [bg, color, border] = TYPE_STYLE[t] || ["#F5F5F4", "#6B6963", "#E4E1DA"];
  return { background: bg, color, borderColor: border };
}

export default function Resources() {
  const [active, setActive] = useState("ALL");

  const filtered = active === "ALL" ? resources : resources.filter(r => r.type === active);

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── Header ── */}
        <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 8px" }}>Resources</h1>
        <p style={{ fontSize: 15, color: "var(--sub)", margin: "0 0 20px", lineHeight: 1.6, maxWidth: 560 }}>
          Notes, guides, and preparation material contributed by seniors. Use freely; contribute back.
        </p>
        <div className="rule" style={{ marginBottom: 20 }} />

        {/* ── Type filter ── */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {TYPES.map(t => (
            <button key={t} onClick={() => setActive(t)}
              style={{ ...mono, fontSize: 10, letterSpacing: "0.08em", padding: "5px 12px", borderRadius: 3, border: "1px solid", borderColor: active === t ? "var(--blue)" : "var(--rule)", background: active === t ? "#EEF2F8" : "var(--surface)", color: active === t ? "var(--blue)" : "var(--sub)", cursor: "pointer" }}>
              {t}
            </button>
          ))}
          <span style={{ ...mono, fontSize: 10, color: "var(--sub)", marginLeft: "auto", alignSelf: "center" }}>
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Resource cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {filtered.map((r, i) => {
            const ts = typeStyle(r.type);
            return (
              <div key={r.id} style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 16, transition: "border-color 180ms", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--blue)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--rule)"}>

                {/* Icon */}
                <div style={{ width: 34, height: 34, borderRadius: 3, background: ts.background, border: `1px solid ${ts.borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <BookOpen style={{ width: 14, height: 14, color: ts.color }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span className="badge" style={{ ...ts, fontSize: 9 }}>{r.type}</span>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>{r.branch}</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", margin: "0 0 5px", lineHeight: 1.3 }}>{r.title}</p>
                  <p style={{ fontSize: 12.5, color: "var(--sub)", margin: "0 0 8px", lineHeight: 1.6 }}>{r.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#6B6963", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 7, fontWeight: 600 }}>
                      {r.postedBy.split(" ").map(w => w[0]).join("")}
                    </div>
                    <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>{r.postedBy} · {r.batch}</span>
                    <span style={{ ...mono, fontSize: 10, color: "var(--rule)" }}>·</span>
                    <span style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>
                      {new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Download area */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--paper)", border: "1px solid var(--rule)", borderRadius: 3, padding: "6px 12px", fontSize: 12, color: "var(--ink)", cursor: "pointer", marginBottom: 6 }}>
                    <Download style={{ width: 11, height: 11 }} /> Download
                  </button>
                  <div style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.04em" }}>
                    {r.downloads.toLocaleString()} downloads
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Submit CTA ── */}
        <div className="dotted-grid" style={{ marginTop: 24, border: "1px solid var(--rule)", borderRadius: 3, padding: "28px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.1em", margin: "0 0 4px", textTransform: "uppercase" }}>Contribute</p>
            <p style={{ fontSize: 14, color: "var(--ink)", margin: 0 }}>Share notes or guides with your juniors</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--blue)", border: "none", borderRadius: 3, padding: "9px 18px", fontSize: 13, color: "#fff", cursor: "pointer", fontWeight: 500 }}>
            Submit resource <ArrowUpRight style={{ width: 12, height: 12 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
