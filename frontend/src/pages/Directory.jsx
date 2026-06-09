import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Download } from "lucide-react";
import { alumni, branches, categories } from "../data/mockData";
import AlumniCard from "../components/AlumniCard";

const catColor = {
  FOUNDER:       { bg: "#ede9fe", text: "#6d28d9" },
  EMPLOYEE:      { bg: "#e0f2fe", text: "#0369a1" },
  "GOVT OFFICER":{ bg: "#dcfce7", text: "#15803d" },
  BUSINESSMAN:   { bg: "#fef9c3", text: "#a16207" },
  RESEARCHER:    { bg: "#cffafe", text: "#0e7490" },
  TEACHER:       { bg: "#fce7f3", text: "#be185d" },
  PROFESSOR:     { bg: "#fce7f3", text: "#be185d" },
};

export default function Directory() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [isNRI, setIsNRI] = useState("");
  const [batchFrom, setBatchFrom] = useState("");
  const [batchTo, setBatchTo] = useState("");

  const filtered = useMemo(() => alumni.filter(a => {
    const lq = q.toLowerCase();
    if (lq &&
      !a.name.toLowerCase().includes(lq) &&
      !a.branch.toLowerCase().includes(lq) &&
      !a.currentCompany.name.toLowerCase().includes(lq) &&
      !a.currentCompany.position.toLowerCase().includes(lq) &&
      !String(a.endYear).includes(lq) &&
      !a.category.toLowerCase().includes(lq) &&
      !a.currentCity.toLowerCase().includes(lq)
    ) return false;
    if (category && a.category !== category) return false;
    if (branch && a.branch !== branch) return false;
    if (isNRI === "true" && !a.isNRI) return false;
    if (isNRI === "false" && a.isNRI) return false;
    if (batchFrom && a.endYear < Number(batchFrom)) return false;
    if (batchTo && a.startYear > Number(batchTo)) return false;
    return true;
  }), [q, category, branch, isNRI, batchFrom, batchTo]);

  const hasFilters = category || branch || isNRI || batchFrom || batchTo;

  const labelStyle = { fontSize: 11, fontWeight: 600, color: "#a8a29e", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 };
  const inputStyle = { width: "100%", background: "#fff", border: "1px solid #e7e5e4", borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#1c1917", outline: "none" };

  return (
    <div style={{ background: "#f5f5f4", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px", display: "flex", gap: 20 }}>

        {/* Sidebar */}
        <aside style={{ width: 210, flexShrink: 0 }}>
          <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 8, overflow: "hidden", position: "sticky", top: 72 }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid #f5f5f4", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>Filters</span>
              {hasFilters && (
                <button onClick={() => { setCategory(""); setBranch(""); setIsNRI(""); setBatchFrom(""); setBatchTo(""); }}
                  style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                  clear
                </button>
              )}
            </div>

            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Category */}
              <div>
                <label style={labelStyle}>Category</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {categories.map(c => {
                    const col = catColor[c] || { bg: "#f5f5f4", text: "#57534e" };
                    const active = category === c;
                    return (
                      <button key={c} onClick={() => setCategory(active ? "" : c)}
                        style={{
                          display: "flex", alignItems: "center", gap: 8,
                          background: active ? col.bg : "none",
                          border: active ? `1px solid ${col.text}30` : "1px solid transparent",
                          borderRadius: 5, padding: "4px 8px", cursor: "pointer", textAlign: "left",
                        }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: active ? col.text : "#d6d3d1", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: active ? col.text : "#78716c", fontWeight: active ? 600 : 400 }}>{c}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Branch */}
              <div>
                <label style={labelStyle}>Branch</label>
                <select value={branch} onChange={e => setBranch(e.target.value)} style={inputStyle}>
                  <option value="">All branches</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* NRI */}
              <div>
                <label style={labelStyle}>NRI Status</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[{ v: "true", l: "NRI" }, { v: "false", l: "India" }].map(({ v, l }) => (
                    <button key={v} onClick={() => setIsNRI(isNRI === v ? "" : v)}
                      style={{
                        flex: 1, fontSize: 12, padding: "5px 0",
                        borderRadius: 5, border: "1px solid",
                        borderColor: isNRI === v ? "#6366f1" : "#e7e5e4",
                        background: isNRI === v ? "#eef2ff" : "#fff",
                        color: isNRI === v ? "#4f46e5" : "#78716c",
                        cursor: "pointer", fontWeight: isNRI === v ? 600 : 400,
                      }}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Batch */}
              <div>
                <label style={labelStyle}>Batch year</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <input className="mono" type="number" placeholder="from" value={batchFrom} onChange={e => setBatchFrom(e.target.value)} style={{ ...inputStyle, width: "50%" }} />
                  <input className="mono" type="number" placeholder="to" value={batchTo} onChange={e => setBatchTo(e.target.value)} style={{ ...inputStyle, width: "50%" }} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              flex: 1, display: "flex", alignItems: "center",
              background: "#fff", border: "1px solid #e7e5e4", borderRadius: 6,
            }}>
              <Search style={{ width: 13, height: 13, color: "#a8a29e", margin: "0 10px", flexShrink: 0 }} />
              <input value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search alumni..."
                style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: "#1c1917", padding: "9px 0", background: "none" }}
              />
              {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 10px" }}>
                <X style={{ width: 13, height: 13, color: "#a8a29e" }} />
              </button>}
            </div>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#fff", border: "1px solid #e7e5e4", borderRadius: 6,
              padding: "8px 14px", fontSize: 12, color: "#78716c", cursor: "pointer",
            }}>
              <Download style={{ width: 13, height: 13 }} /> Export
            </button>
          </div>

          <div style={{ fontSize: 12, color: "#a8a29e", marginBottom: 14 }}>
            Showing <span style={{ color: "#1c1917", fontWeight: 600 }}>{filtered.length}</span> of 12,400+ alumni
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#a8a29e" }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>No results</div>
              <div style={{ fontSize: 12 }}>Try a different search or clear filters</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
              {filtered.map((a, i) => <AlumniCard key={a.id} alumni={a} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
