import { Link } from "react-router-dom";
import { MapPin, Globe, ArrowUpRight } from "lucide-react";
import { categoryColors, avatarColors } from "../data/mockData";

export default function AlumniCard({ alumni: a, index = 0 }) {
  const bg = avatarColors[index % avatarColors.length];

  return (
    <Link
      to={`/profile/${a.id}`}
      className="group block rounded-2xl bg-white border border-slate-100 overflow-hidden transition-all duration-200"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.12), 0 1px 4px rgba(0,0,0,0.06)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"}
    >
      {/* Top accent bar */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${gradientFor(index)})` }} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${gradientFor(index)})` }}
            >
              {a.avatar}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-slate-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors">
                  {a.name}
                </h3>
                {a.isNRI && (
                  <Globe className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[160px]">
                {a.currentCompany.position}
              </p>
            </div>
          </div>
          <ArrowUpRight
            className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5"
          />
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3" style={{ background: "#f8fafc" }}>
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${gradientFor(index)})`, opacity: 0.7 }}
          >
            {a.currentCompany.name.charAt(0)}
          </div>
          <span className="text-xs font-medium text-slate-700 truncate">{a.currentCompany.name}</span>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold tracking-wide ${categoryColors[a.category] || "bg-slate-100 text-slate-600"}`}>
              {a.category}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
              {a.endYear}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <MapPin className="w-3 h-3" />
            {a.currentCity}
          </span>
        </div>
      </div>
    </Link>
  );
}

function gradientFor(i) {
  const gradients = [
    "#6366f1, #8b5cf6",
    "#10b981, #059669",
    "#f59e0b, #d97706",
    "#ef4444, #dc2626",
    "#06b6d4, #0891b2",
    "#8b5cf6, #7c3aed",
  ];
  return gradients[i % gradients.length];
}
