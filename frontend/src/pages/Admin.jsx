import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Search, Download, Mail, Phone, X, Check } from "lucide-react";
import { alumni } from "../data/mockData";
import { serif, mono, catBadge, avatarBg } from "../theme";

export default function Admin() {
  const [q, setQ] = useState("");
  const [revealed, setRevealedSet] = useState(new Set());

  const toggle = (id) => setRevealedSet(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const filtered = alumni.filter(a => {
    const lq = q.toLowerCase();
    return !lq || a.name.toLowerCase().includes(lq) || a.branch.toLowerCase().includes(lq) || a.alumniCardId.toLowerCase().includes(lq);
  });

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <Shield style={{ width: 14, height: 14, color: "var(--blue)" }} />
              <h1 style={{ ...serif, fontSize: 20, fontWeight: 500, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>Admin panel</h1>
            </div>
            <p style={{ ...mono, fontSize: 10.5, color: "var(--sub)", margin: 0 }}>IITG-ADMIN · READ / WRITE · SESSION ACTIVE</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, padding: "7px 14px", fontSize: 12, color: "var(--sub)", cursor: "pointer" }}>
              <Download style={{ width: 12, height: 12 }} /> Export CSV
            </button>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, padding: "0 20px", marginBottom: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { n: "12,400", l: "Total records" },
            { n: "6",      l: "Mock records (demo)" },
            { n: "48",     l: "Countries" },
            { n: "3,200+", l: "Companies" },
          ].map(({ n, l }, i) => (
            <div key={l} style={{ padding: "14px 0", paddingLeft: i > 0 ? 20 : 0, borderLeft: i > 0 ? "1px solid var(--rule)" : "none" }}>
              <div style={{ ...mono, fontSize: 20, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.02em", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 11, color: "var(--sub)", marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* ── Search ── */}
        <div style={{ display: "flex", alignItems: "center", background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, marginBottom: 4 }}>
          <Search style={{ width: 13, height: 13, color: "var(--sub)", margin: "0 12px", flexShrink: 0 }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, card ID, branch…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "var(--ink)", padding: "10px 0", background: "none", fontFamily: "inherit" }} />
          {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 12px", color: "var(--sub)" }}><X style={{ width: 12, height: 12 }} /></button>}
        </div>

        {/* ── Table ── */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, overflow: "hidden" }}>

          {/* Table head */}
          <div style={{ display: "grid", gridTemplateColumns: "200px 120px 90px 80px 1fr 120px 90px", padding: "8px 16px", background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}>
            {["Name", "Card No.", "Branch", "Batch", "Company", "City", "Contact"].map(h => (
              <span key={h} style={{ ...mono, fontSize: 9.5, color: "var(--sub)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="dotted-grid" style={{ padding: "60px 0", textAlign: "center" }}>
              <p style={{ ...mono, fontSize: 11, color: "var(--sub)", letterSpacing: "0.06em" }}>NO RECORDS MATCH</p>
            </div>
          ) : (
            filtered.map((a, i) => {
              const badge = catBadge(a.category);
              const open = revealed.has(a.id);
              return (
                <div key={a.id} style={{ display: "grid", gridTemplateColumns: "200px 120px 90px 80px 1fr 120px 90px", padding: "11px 16px", borderBottom: i < filtered.length - 1 ? "1px solid var(--rule)" : "none", alignItems: "center" }}>

                  {/* Name */}
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: avatarBg(a.category), display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 600, flexShrink: 0 }}>
                      {a.avatar}
                    </div>
                    <div>
                      <Link to={`/profile/${a.id}`} style={{ ...serif, fontSize: 13.5, fontWeight: 500, color: "var(--ink)", textDecoration: "none", display: "block", letterSpacing: "-0.01em" }}>
                        {a.name}
                      </Link>
                      <span className="badge" style={{ ...badge, fontSize: 8.5, marginTop: 2 }}>{a.category}</span>
                    </div>
                  </div>

                  {/* Card No. */}
                  <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>{a.alumniCardId}</span>

                  {/* Branch */}
                  <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                    {a.branch.split(" ").map(w => w[0]).join("").slice(0, 4)}
                  </span>

                  {/* Batch */}
                  <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>{a.startYear}–{a.endYear}</span>

                  {/* Company */}
                  <span style={{ fontSize: 12, color: "var(--ink)" }}>{a.currentCompany.name}</span>

                  {/* City */}
                  <span style={{ ...mono, fontSize: 10.5, color: "var(--sub)" }}>
                    {a.currentCity}{a.isNRI ? " ·NRI" : ""}
                  </span>

                  {/* Reveal toggle */}
                  <div>
                    {open ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <span style={{ ...mono, fontSize: 10, color: "var(--ink)", display: "flex", alignItems: "center", gap: 4 }}>
                          <Mail style={{ width: 9, height: 9 }} /> {a.alumniEmailId}
                        </span>
                        <button onClick={() => toggle(a.id)} style={{ ...mono, fontSize: 9, color: "var(--sub)", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, letterSpacing: "0.05em" }}>
                          HIDE
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => toggle(a.id)}
                        style={{ ...mono, fontSize: 9.5, color: "var(--blue)", background: "none", border: "1px solid var(--rule)", borderRadius: 3, cursor: "pointer", padding: "3px 8px", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 5 }}>
                        <Mail style={{ width: 9, height: 9 }} /> REVEAL
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer note ── */}
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <Shield style={{ width: 10, height: 10, color: "var(--sub)" }} />
          <span style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.04em" }}>
            Contact data visible to admin-role users only. All access is logged.
          </span>
        </div>
      </div>
    </div>
  );
}
