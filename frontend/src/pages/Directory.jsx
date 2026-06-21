import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Download, HelpCircle } from "lucide-react";
import { alumni, branches, categories } from "../data/mockData";
import AlumniCard from "../components/AlumniCard";
import { mono, serif, T, catBadge } from "../theme";
import { AlumniCardSkeleton } from "../components/SkeletonLoader";
import EmptyState from "../components/EmptyState";

export default function Directory() {
  const [params] = useSearchParams();
  const [q,        setQ]        = useState(params.get("q") || "");
  const [category, setCategory] = useState("");
  const [branch,   setBranch]   = useState("");
  const [isNRI,    setIsNRI]    = useState("");
  const [bFrom,    setBFrom]    = useState("");
  const [bTo,      setBTo]      = useState("");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [q, category, branch, isNRI, bFrom, bTo]);

  const filtered = useMemo(() => alumni.filter(a => {
    const lq = q.toLowerCase();
    if (lq &&
      !a.name.toLowerCase().includes(lq) &&
      !a.branch.toLowerCase().includes(lq) &&
      !a.currentCompany.name.toLowerCase().includes(lq) &&
      !String(a.endYear).includes(lq) &&
      !a.category.toLowerCase().includes(lq) &&
      !a.currentCity.toLowerCase().includes(lq)
    ) return false;
    if (category && a.category !== category) return false;
    if (branch   && a.branch   !== branch)   return false;
    if (isNRI === "true"  && !a.isNRI) return false;
    if (isNRI === "false" &&  a.isNRI) return false;
    if (bFrom && a.endYear < Number(bFrom)) return false;
    if (bTo   && a.endYear > Number(bTo))   return false;
    return true;
  }), [q, category, branch, isNRI, bFrom, bTo]);

  const hasFilters = q || category || branch || isNRI || bFrom || bTo;
  const clear = () => { setQ(""); setCategory(""); setBranch(""); setIsNRI(""); setBFrom(""); setBTo(""); };

  const Label = ({ children }) => (
    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "var(--sub)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>
      {children}
    </div>
  );

  const inputStyle = { width: "100%", background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 3, padding: "6px 10px", fontSize: 12, color: "var(--ink)", outline: "none", fontFamily: "inherit" };

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div className="flex flex-col md:flex-row gap-6" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 28px" }}>

        {/* ── Filter sidebar ── */}
        <aside className="w-full md:w-[220px]" style={{ flexShrink: 0 }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-card)", position: "sticky", top: "calc(var(--nav-height) + 16px)", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>

            {/* Sidebar header */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Filters</span>
              {hasFilters && (
                <button onClick={clear} style={{ ...mono, fontSize: 10, color: "var(--red)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.05em" }}>
                  CLEAR
                </button>
              )}
            </div>

            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Category */}
              <div>
                <Label>Category</Label>
                {categories.map(c => {
                  const badge = catBadge(c);
                  const active = category === c;
                  return (
                    <button key={c} onClick={() => setCategory(active ? "" : c)}
                      style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", background: active ? badge.background : "none", border: "1px solid", borderColor: active ? badge.borderColor : "transparent", borderRadius: 3, padding: "4px 8px", cursor: "pointer", marginBottom: 3, textAlign: "left" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: active ? badge.color : "var(--rule)", flexShrink: 0 }} />
                      <span style={{ ...mono, fontSize: 10.5, color: active ? badge.color : "var(--sub)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{c}</span>
                    </button>
                  );
                })}
              </div>

              {/* Branch */}
              <div>
                <Label>Branch</Label>
                <select value={branch} onChange={e => setBranch(e.target.value)} style={{ ...inputStyle, ...mono, fontSize: 10.5 }}>
                  <option value="">All branches</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* NRI */}
              <div>
                <Label>NRI status</Label>
                <div style={{ display: "flex", gap: 4 }}>
                  {[{ v: "true", l: "NRI" }, { v: "false", l: "India" }].map(({ v, l }) => (
                    <button key={v} onClick={() => setIsNRI(isNRI === v ? "" : v)}
                      style={{ ...mono, flex: 1, fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", padding: "5px 0", borderRadius: 3, border: "1px solid", borderColor: isNRI === v ? "var(--blue)" : "var(--rule)", background: isNRI === v ? "#EEF2F8" : "var(--surface)", color: isNRI === v ? "var(--blue)" : "var(--sub)", cursor: "pointer" }}>{l}</button>
                  ))}
                </div>
              </div>

              {/* Batch */}
              <div>
                <Label>Batch year</Label>
                <div style={{ display: "flex", gap: 4 }}>
                  <input type="number" placeholder="from" value={bFrom} onChange={e => setBFrom(e.target.value)} style={{ ...inputStyle, ...mono, fontSize: 11, width: "50%" }} />
                  <input type="number" placeholder="to"   value={bTo}   onChange={e => setBTo(e.target.value)}   style={{ ...inputStyle, ...mono, fontSize: 11, width: "50%" }} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Header bar */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
            <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>Alumni Directory</h1>
          </div>
          <p style={{ fontSize: 15, color: "var(--sub)", margin: "0 0 16px" }}>12,400+ registered IIT Guwahati alumni worldwide</p>

          {/* Search + export */}
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-md)", transition: "border-color 150ms" }}
              onFocusCapture={e => e.currentTarget.style.borderColor = "var(--blue)"}
              onBlurCapture={e => e.currentTarget.style.borderColor = "var(--rule)"}
            >
              <Search style={{ width: 15, height: 15, color: "var(--muted)", margin: "0 12px", flexShrink: 0 }} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, company, branch, city…"
                style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "var(--ink)", padding: "11px 0", background: "none", fontFamily: "inherit" }} />
              {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 12px", color: "var(--muted)" }}><X style={{ width: 14, height: 14 }} /></button>}
            </div>
            <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: "var(--radius-md)", padding: "0 16px", fontSize: 13, fontWeight: 500, color: "var(--sub)", cursor: "pointer" }}>
              <Download style={{ width: 13, height: 13 }} /> Export
            </button>
          </div>

          {/* Result count */}
          <div className="rule" style={{ marginBottom: 16 }} />
          <div style={{ fontSize: 13, color: "var(--sub)", fontWeight: 500, marginBottom: 16 }}>
            {filtered.length.toLocaleString()} result{filtered.length !== 1 ? "s" : ""}
            {hasFilters && <span style={{ color: "var(--muted)" }}> · filtered</span>}
          </div>

          {/* Results */}
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
              {[1, 2, 3, 4, 5, 6].map(i => <AlumniCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState 
              icon={HelpCircle} 
              title="No alumni matches found" 
              description="We couldn't find any alumni matching your search keyword or selected filters. Try broadening your criteria or reset filters." 
              actionLabel="Clear Filters"
              onAction={clear}
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }} className="animate-fade-in">
              {filtered.map(a => <AlumniCard key={a.id} alumni={a} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
