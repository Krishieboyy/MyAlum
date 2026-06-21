import React from "react";
import { Info, HelpCircle } from "lucide-react";

export default function EmptyState({ 
  icon: Icon = HelpCircle, 
  title = "No results found", 
  description = "Try adjusting your search filters or terms.", 
  actionLabel, 
  onAction,
  style 
}) {
  return (
    <div 
      className="dotted-grid animate-fade-in" 
      style={{ 
        padding: "60px 24px", 
        textAlign: "center", 
        borderRadius: 8, 
        border: "1px solid var(--rule)",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        maxWidth: 600,
        margin: "24px auto",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        ...style 
      }}
    >
      {/* Icon container */}
      <div 
        style={{ 
          width: 56, 
          height: 56, 
          borderRadius: "50%", 
          background: "var(--paper)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "var(--sub)",
          border: "1px solid var(--rule)"
        }}
      >
        <Icon size={24} style={{ color: "var(--blue)", strokeWidth: 1.5 }} />
      </div>

      {/* Texts */}
      <div style={{ maxWidth: 400 }}>
        <h3 
          style={{ 
            fontFamily: "var(--font-sans)", 
            fontSize: 16, 
            fontWeight: 600, 
            color: "var(--ink)", 
            margin: "0 0 6px 0",
            letterSpacing: "-0.01em"
          }}
        >
          {title}
        </h3>
        <p 
          style={{ 
            fontSize: 13, 
            color: "var(--sub)", 
            lineHeight: 1.5,
            margin: 0 
          }}
        >
          {description}
        </p>
      </div>

      {/* Call to action button */}
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="btn-premium"
          style={{
            padding: "8px 16px",
            background: "var(--blue)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 12.5,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
