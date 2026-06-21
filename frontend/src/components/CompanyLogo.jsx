import React from "react";
import { Building2 } from "lucide-react";

// Pre-defined SVG icons for major tech/finance notable employers
const SVGS = {
  google: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22.81-.6z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z" fill="#EA4335"/>
    </svg>
  ),
  microsoft: (size) => (
    <svg width={size} height={size} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="10.5" height="10.5" fill="#F25022"/>
      <rect x="11.5" width="10.5" height="10.5" fill="#7FBA00"/>
      <rect y="11.5" width="10.5" height="10.5" fill="#00A1F1"/>
      <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#FFB900"/>
    </svg>
  ),
  nvidia: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.88 15.34c-1.84 0-3.32-1.27-3.32-2.84s1.48-2.84 3.32-2.84 3.32 1.27 3.32 2.84-1.48 2.84-3.32 2.84zm-4.32-5.6c0-1.63 1.94-2.95 4.32-2.95s4.32 1.32 4.32 2.95-1.94 2.95-4.32 2.95-4.32-1.32-4.32-2.95zm-2.03-3.14c0-2.3 2.85-4.16 6.35-4.16s6.35 1.86 6.35 4.16-2.85 4.16-6.35 4.16-6.35-1.86-6.35-4.16z" fill="#76B900"/>
    </svg>
  ),
  amazon: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.42 16.3c-1.5.83-3.7.83-5.26.17-.67-.28-1.2-.7-1.44-1.32.22-.05.47-.07.72-.05 1.07.12 2.45-.1 3.5-.67.92-.5 1.54-1.28 1.54-2.28 0-1.25-.97-1.89-2.5-1.89-2.02 0-3.23.95-3.23 2.5 0 1.28.84 2.05 2.1 2.22-.84.72-1.83.95-2.94.7-1.02-.23-1.68-.86-1.89-1.78-.3-1.3.45-2.73 2.05-3.32 1.44-.53 3.42-.53 4.96.05V10.2c0-.7-.36-1.12-1.12-1.12-.87 0-1.84.45-2.12.92l-.93-.76C9.27 8.35 10.6 7.6 12.3 7.6c1.86 0 2.82.97 2.82 2.76v5.22c.03.3.16.42.3.72h-1.28c-.1-.28-.16-.62-.16-1zm5.2 2.6c-4.48 2.84-11.4 3.12-16.14.86-.48-.23-.84-.7-.45-1.15.3-.34.8-.1 1.23.1 4.12 1.94 10.3 1.7 14.4-.8.43-.26.96-.03.73.4-.1.17-.3.43-.57.59z" fill="#000000"/>
      <path d="M21.28 18.06c.13-.17.07-.33-.13-.36-1.02-.1-3.03.2-3.83.95-.16.15-.1.33.1.3.93-.07 2.82-.46 3.86-.89z" fill="#FF9900"/>
    </svg>
  ),
  atlassian: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.34 2c-.3 0-.58.17-.7.44L7.56 12.1a.8.8 0 000 .68l4.08 9.66a.8.8 0 00.7.46c3.9-.1 7.28-2.6 8.7-6.2a10.8 10.8 0 00-8.7-14.7z" fill="#0052CC"/>
      <path d="M11.66 2c.3 0 .58.17.7.44l4.08 9.66a.8.8 0 010 .68l-4.08 9.66a.8.8 0 01-.7.46C7.76 22.8 4.38 20.3 2.96 16.7a10.8 10.8 0 018.7-14.7z" fill="#2684FF"/>
    </svg>
  ),
  goldman: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0A3A60"/>
      <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="sans-serif">GS</text>
    </svg>
  ),
  tesla: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C11.38 3.94 9.8 5.76 7.72 6.8c1.65.62 3.3.97 4.28 2v10.22c.98-1.03 2.63-1.38 4.28-2-2.08-1.04-3.66-2.86-4.28-4.8V2z" fill="#E82127"/>
    </svg>
  ),
  cisco: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="16" width="2" height="4" fill="#00BCEB" rx="0.5"/>
      <rect x="5" y="10" width="2" height="10" fill="#00BCEB" rx="0.5"/>
      <rect x="8" y="6" width="2" height="14" fill="#00BCEB" rx="0.5"/>
      <rect x="11" y="10" width="2" height="10" fill="#00BCEB" rx="0.5"/>
      <rect x="14" y="6" width="2" height="14" fill="#00BCEB" rx="0.5"/>
      <rect x="17" y="10" width="2" height="10" fill="#00BCEB" rx="0.5"/>
      <rect x="20" y="16" width="2" height="4" fill="#00BCEB" rx="0.5"/>
    </svg>
  ),
  mit: (size) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="4" height="16" fill="#A31F34"/>
      <rect x="8" y="4" width="3" height="11" fill="#8A8B8C"/>
      <rect x="13" y="4" width="3" height="16" fill="#A31F34"/>
      <rect x="18" y="4" width="4" height="16" fill="#A31F34"/>
    </svg>
  )
};

// Deterministic pastel color palette for generic company cards
const BACKGROUNDS = [
  { bg: "#EFF6FF", color: "#1D4ED8", border: "#DBEAFE" }, // Blue
  { bg: "#ECFDF5", color: "#047857", border: "#D1FAE5" }, // Green
  { bg: "#FFFBEB", color: "#B45309", border: "#FEF3C7" }, // Yellow
  { bg: "#FDF2F8", color: "#BE185D", border: "#FCE7F3" }, // Pink
  { bg: "#F5F3FF", color: "#6D28D9", border: "#EDE9FE" }, // Purple
  { bg: "#FFF5F5", color: "#C53030", border: "#FED7D7" }, // Red
  { bg: "#F0FDFA", color: "#0F766E", border: "#CCFBF1" }, // Teal
];

// Helper to hash string deterministically to a number
function getStringHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function CompanyLogo({ name, size = 16, style }) {
  if (!name) return null;

  const cleanName = name.toLowerCase().trim();

  // 1. Check if we have a custom SVG
  for (const key of Object.keys(SVGS)) {
    if (cleanName.includes(key)) {
      return (
        <span 
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center", 
            width: size + 8, 
            height: size + 8, 
            background: key === "goldman" ? "transparent" : "#f8fafc",
            border: key === "goldman" ? "none" : "1px solid #e2e8f0", 
            borderRadius: 6,
            flexShrink: 0,
            ...style 
          }}
          title={name}
        >
          {SVGS[key](size)}
        </span>
      );
    }
  }

  // 2. Generate a nice Notion-style text monogram with dynamic background
  const hash = getStringHash(name);
  const colorTheme = BACKGROUNDS[hash % BACKGROUNDS.length];
  
  // Extract initials (e.g. "Tata Motors" -> "TM", "Freshworks" -> "F")
  const words = name.split(/\s+/).filter(w => w.length > 0);
  let monogram = "";
  if (words.length >= 2) {
    monogram = (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1) {
    monogram = words[0].slice(0, 2).toUpperCase();
  } else {
    monogram = "??";
  }

  return (
    <span 
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size + 8,
        height: size + 8,
        borderRadius: 6,
        background: colorTheme.bg,
        border: `1px solid ${colorTheme.border}`,
        color: colorTheme.color,
        fontSize: size * 0.55,
        fontWeight: 700,
        fontFamily: "var(--font-mono)",
        letterSpacing: "-0.02em",
        flexShrink: 0,
        ...style
      }}
      title={name}
    >
      {monogram}
    </span>
  );
}
