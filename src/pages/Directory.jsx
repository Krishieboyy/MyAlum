import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Download, X, SlidersHorizontal } from "lucide-react";
import { alumni, branches, categories, categoryColors } from "../data/mockData";
import AlumniCard from "../components/AlumniCard";

export default function Directory() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [isNRI, setIsNRI] = useState("");
  const [batchFrom, setBatchFrom] = useState("");
  const [batchTo, setBatchTo] = useState("");

  const filtered = useMemo(() => {
    return alumni.filter((a) => {
      const q = query.toLowerCase();
      if (q &&
        !a.name.toLowerCase().includes(q) &&
        !a.branch.toLowerCase().includes(q) &&
        !a.currentCompany.name.toLowerCase().includes(q) &&
        !a.currentCompany.position.toLowerCase().includes(q) &&
        !String(a.endYear).includes(q) &&
        !a.category.toLowerCase().includes(q) &&
        !a.currentCity.toLowerCase().includes(q)
      ) return false;
      if (category && a.category !== category) return false;
      if (branch && a.branch !== branch) return false;
      if (isNRI === "true" && !a.isNRI) return false;
      if (isNRI === "false" && a.isNRI) return false;
      if (batchFrom && a.endYear < Number(batchFrom)) return false;
      if (batchTo && a.startYear > Number(batchTo)) return false;
      return true;
    });
  }, [query, category, branch, isNRI, batchFrom, batchTo]);

  const hasFilters = category || branch || isNRI || batchFrom || batchTo;
  const clearFilters = () => { setCategory(""); setBranch(""); setIsNRI(""); setBatchFrom(""); setBatchTo(""); };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex gap-7">
      {/* ── Sidebar filters ── */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div
          className="rounded-2xl overflow-hidden sticky top-20"
          style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
        >
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
              Filters
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <div className="p-5 space-y-5">
            <FilterGroup label="Category">
              <div className="flex flex-col gap-1">
                {categories.map((c) => (
                  <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={c}
                      checked={category === c}
                      onChange={() => setCategory(category === c ? "" : c)}
                      className="accent-indigo-600"
                    />
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[c] || "bg-slate-100 text-slate-600"}`}>{c}</span>
                  </label>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Branch">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full text-xs rounded-lg px-3 py-2 outline-none"
                style={{ border: "1px solid #e2e8f0", background: "#f8fafc", color: "#475569" }}
              >
                <option value="">All branches</option>
                {branches.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </FilterGroup>

            <FilterGroup label="NRI Status">
              <div className="flex gap-2">
                {[{ v: "true", l: "NRI" }, { v: "false", l: "India" }].map(({ v, l }) => (
                  <button
                    key={v}
                    onClick={() => setIsNRI(isNRI === v ? "" : v)}
                    className="flex-1 text-xs py-1.5 rounded-lg font-medium transition-all"
                    style={{
                      background: isNRI === v ? "#eef2ff" : "#f8fafc",
                      color: isNRI === v ? "#4f46e5" : "#64748b",
                      border: isNRI === v ? "1px solid #c7d2fe" : "1px solid #e2e8f0",
                    }}
                  >{l}</button>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup label="Batch Year">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="From"
                  value={batchFrom}
                  onChange={(e) => setBatchFrom(e.target.value)}
                  className="w-full text-xs rounded-lg px-3 py-2 outline-none"
                  style={{ border: "1px solid #e2e8f0", background: "#f8fafc", color: "#475569" }}
                />
                <input
                  type="number"
                  placeholder="To"
                  value={batchTo}
                  onChange={(e) => setBatchTo(e.target.value)}
                  className="w-full text-xs rounded-lg px-3 py-2 outline-none"
                  style={{ border: "1px solid #e2e8f0", background: "#f8fafc", color: "#475569" }}
                />
              </div>
            </FilterGroup>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900" style={{ letterSpacing: "-0.02em" }}>Alumni Directory</h1>
            <p className="text-sm text-slate-400 mt-0.5">12,400+ registered · {filtered.length} shown</p>
          </div>
          <button
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all"
            style={{ background: "#fff", border: "1px solid #e2e8f0", color: "#475569" }}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Search bar */}
        <div
          className="flex items-center rounded-xl mb-6 overflow-hidden"
          style={{ background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <Search className="w-4 h-4 text-slate-400 ml-4 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, company, branch, city..."
            className="flex-1 px-3 py-3 text-sm outline-none bg-transparent text-slate-800 placeholder-slate-400"
          />
          {query && (
            <button onClick={() => setQuery("")} className="mr-3">
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        {/* Active filter pills (mobile) */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {category && <Pill label={category} onRemove={() => setCategory("")} />}
            {branch && <Pill label={branch.split(" ")[0] + "..."} onRemove={() => setBranch("")} />}
            {isNRI && <Pill label={isNRI === "true" ? "NRI" : "India-based"} onRemove={() => setIsNRI("")} />}
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#f1f5f9" }}>
              <Search className="w-7 h-7 text-slate-300" />
            </div>
            <p className="font-semibold text-slate-600">No alumni found</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search or clearing filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((a, i) => (
              <AlumniCard key={a.id} alumni={a} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">{label}</p>
      {children}
    </div>
  );
}

function Pill({ label, onRemove }) {
  return (
    <span
      className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium"
      style={{ background: "#eef2ff", color: "#4f46e5", border: "1px solid #c7d2fe" }}
    >
      {label}
      <button onClick={onRemove}><X className="w-3 h-3" /></button>
    </span>
  );
}
