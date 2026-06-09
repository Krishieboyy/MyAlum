import { useParams, Link } from "react-router-dom";
import {
  MapPin, Briefcase, Globe, Mail, ExternalLink, Calendar,
  GraduationCap, Award, Users, Building2, ChevronLeft,
  Share2, MessageSquare, CheckCircle
} from "lucide-react";
import { alumni, categoryColors } from "../data/mockData";

const gradients = [
  "linear-gradient(135deg, #6366f1, #8b5cf6)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
  "linear-gradient(135deg, #06b6d4, #0891b2)",
  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
];

export default function Profile() {
  const { id } = useParams();
  const a = alumni.find((x) => x.id === Number(id)) || alumni[0];
  const grad = gradients[(Number(id) - 1) % gradients.length];

  return (
    <div style={{ background: "#f8fafc" }} className="min-h-screen pb-16">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 pt-6 pb-0">
        <Link
          to="/directory"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Directory
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-4 grid lg:grid-cols-3 gap-5">
        {/* ── Left / Main ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Identity card */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {/* Banner */}
            <div className="h-32 relative" style={{ background: grad }}>
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)" }} />
            </div>

            <div className="px-7 pb-6">
              {/* Avatar overlapping banner */}
              <div className="flex items-end justify-between -mt-10 mb-5">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                  style={{ background: grad, border: "4px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                >
                  {a.avatar}
                </div>
                <div className="flex gap-2 pb-1">
                  <button
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl font-medium transition-all"
                    style={{ border: "1px solid #e2e8f0", color: "#475569", background: "#fff" }}
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl font-semibold text-white transition-all"
                    style={{ background: grad }}
                  >
                    <MessageSquare className="w-4 h-4" /> Connect
                  </button>
                </div>
              </div>

              {/* Name & role */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-slate-900" style={{ letterSpacing: "-0.02em" }}>{a.name}</h1>
                {a.isNRI && (
                  <span
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: "#eef2ff", color: "#4f46e5", border: "1px solid #c7d2fe" }}
                  >
                    <Globe className="w-3 h-3" /> NRI
                  </span>
                )}
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[a.category] || ""}`}>
                  {a.category}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-1.5">
                {a.currentCompany.position} · <span className="font-medium text-slate-700">{a.currentCompany.name}</span>
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {a.currentCity}, {a.currentCountry}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> {a.course} · Batch {a.endYear}
                </span>
              </div>

              {a.bio && (
                <p className="text-sm text-slate-600 leading-relaxed pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
                  {a.bio}
                </p>
              )}

              {/* Links row */}
              <div className="flex flex-wrap gap-2 mt-4">
                <a
                  href={a.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                  style={{ background: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <span
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                  style={{ background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0" }}
                >
                  <Mail className="w-3.5 h-3.5" /> {a.alumniEmailId}
                </span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <ProfileCard title="Experience" icon={Briefcase}>
            {/* Current */}
            <ExpItem
              logo={a.currentCompany.name.charAt(0)}
              title={a.currentCompany.position}
              sub={a.currentCompany.name}
              meta={`Since ${a.currentCompany.startDate} · Present`}
              grad={grad}
              current
            />
            {a.pastCompanies.map((c, i) => (
              <ExpItem key={i} logo={c.charAt(0)} title={c} sub="Past" grad="linear-gradient(135deg,#94a3b8,#64748b)" />
            ))}
          </ProfileCard>

          {/* Education */}
          <ProfileCard title="Education" icon={GraduationCap}>
            <ExpItem
              logo="🎓"
              title="Indian Institute of Technology Guwahati"
              sub={`${a.course} · ${a.branch}`}
              meta={`${a.startYear} – ${a.endYear}`}
              grad="linear-gradient(135deg,#6366f1,#8b5cf6)"
              emoji
            />
          </ProfileCard>

          {/* Campus Activities */}
          {a.campusActivities.length > 0 && (
            <ProfileCard title="Campus Activities" icon={Users}>
              {a.campusActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
                  >
                    {act.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{act.name}</p>
                    <p className="text-xs text-slate-400">{act.position} · {act.category}</p>
                  </div>
                </div>
              ))}
            </ProfileCard>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-4">
          {/* Achievements */}
          {a.achievements.length > 0 && (
            <ProfileCard title="Achievements" icon={Award}>
              {a.achievements.map((ach, i) => (
                <div key={i} className="flex items-start gap-2.5 py-1.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs"
                    style={{ background: "#fefce8", color: "#ca8a04" }}
                  >
                    ★
                  </div>
                  <p className="text-sm text-slate-700">{ach}</p>
                </div>
              ))}
            </ProfileCard>
          )}

          {/* Locations */}
          <ProfileCard title="Locations" icon={MapPin}>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Current</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-700">{a.currentCity}, {a.currentCountry}</span>
                </div>
              </div>
              {a.pastCities.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Past</p>
                  {a.pastCities.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <span className="text-slate-500">{c}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ProfileCard>

          {/* Alumni Card */}
          <div
            className="rounded-2xl p-5 overflow-hidden relative"
            style={{ background: grad, boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{ background: "radial-gradient(circle, #fff, transparent)", transform: "translate(30%, -30%)", borderRadius: "50%" }} />
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Alumni Card</p>
            <div className="space-y-2">
              {[
                { l: "Card ID", v: a.alumniCardId },
                { l: "Batch", v: `${a.startYear}–${a.endYear}` },
                { l: "Course", v: a.course },
                { l: "Branch", v: a.branch.split(" ")[0] },
              ].map(({ l, v }) => (
                <div key={l} className="flex items-center justify-between text-xs">
                  <span className="text-white/60">{l}</span>
                  <span className="text-white font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <Icon className="w-4 h-4 text-indigo-500" />
        <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">{title}</h2>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ExpItem({ logo, title, sub, meta, grad, current, emoji }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={emoji ? { background: "#eef2ff", fontSize: 20 } : { background: grad }}
      >
        {logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-800 truncate">{title}</p>
          {current && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "#f0fdf4", color: "#16a34a" }}>● Active</span>
          )}
        </div>
        <p className="text-xs text-slate-500">{sub}</p>
        {meta && <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Calendar className="w-3 h-3" />{meta}</p>}
      </div>
    </div>
  );
}
