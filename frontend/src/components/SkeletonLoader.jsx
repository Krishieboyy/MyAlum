import React from "react";

export function Shimmer({ style }) {
  return (
    <div 
      className="animate-shimmer" 
      style={{
        borderRadius: 4,
        height: 14,
        background: "#f1f5f9",
        ...style
      }}
    />
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="record-card" style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 14, height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Shimmer style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
          <Shimmer style={{ width: "40%", height: 13 }} />
          <Shimmer style={{ width: "70%", height: 11 }} />
        </div>
        <Shimmer style={{ width: 60, height: 16, borderRadius: 3 }} />
      </div>
      
      {/* Body */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, marginTop: 4 }}>
        <Shimmer style={{ width: "90%", height: 16 }} />
        <Shimmer style={{ width: "40%", height: 16 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          <Shimmer style={{ width: "100%", height: 11 }} />
          <Shimmer style={{ width: "95%", height: 11 }} />
          <Shimmer style={{ width: "60%", height: 11 }} />
        </div>
      </div>

      <div style={{ height: 1, background: "var(--rule)", margin: "4px 0" }} />
      
      {/* Footer */}
      <div style={{ display: "flex", gap: 12 }}>
        <Shimmer style={{ width: 70, height: 24, borderRadius: 4 }} />
        <Shimmer style={{ width: 90, height: 24, borderRadius: 4 }} />
      </div>
    </div>
  );
}

export function AlumniCardSkeleton() {
  return (
    <div className="record-card" style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Top info */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Shimmer style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <Shimmer style={{ width: 70, height: 16, borderRadius: 3 }} />
          <Shimmer style={{ width: "60%", height: 14 }} />
          <Shimmer style={{ width: "80%", height: 12 }} />
          <Shimmer style={{ width: "50%", height: 12 }} />
        </div>
      </div>
      
      <div style={{ height: 1, background: "var(--rule)" }} />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Shimmer style={{ width: 50, height: 12 }} />
        <Shimmer style={{ width: 60, height: 12 }} />
      </div>
    </div>
  );
}

export function StatsBarSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{
          background: "var(--surface)",
          border: "1px solid var(--rule)",
          borderRadius: 6,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}>
          <Shimmer style={{ width: 50, height: 22 }} />
          <Shimmer style={{ width: 70, height: 10 }} />
        </div>
      ))}
    </div>
  );
}
