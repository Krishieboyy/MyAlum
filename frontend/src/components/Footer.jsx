import { sans } from "../theme";

const learnMore = [
  { label: "Alumni & External Relations", href: "#" },
  { label: "IIT Guwahati",                href: "#" },
  { label: "About Us",                    href: "#" },
];

// Brand icons as inline SVG (lucide build here lacks brand glyphs)
const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...p}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z"/>
    <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4z"/>
    <circle cx="18.41" cy="5.59" r="1.44"/>
  </svg>
);
const YoutubeIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...p}>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/>
  </svg>
);
const LinkedinIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
  </svg>
);
const MessengerIcon = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...p}>
    <path d="M12 0C5.24 0 0 4.95 0 11.64c0 3.5 1.44 6.53 3.77 8.62.2.17.31.42.32.68l.07 2.13c.02.68.72 1.12 1.34.85l2.38-1.05c.2-.09.42-.1.63-.05 1.1.3 2.26.46 3.47.46 6.76 0 12-4.95 12-11.64S18.76 0 12 0zm7.2 8.93l-3.52 5.6c-.56.89-1.76 1.11-2.6.48l-2.8-2.1a.72.72 0 0 0-.87 0l-3.78 2.87c-.5.38-1.16-.22-.82-.75l3.52-5.6c.56-.89 1.76-1.11 2.6-.48l2.8 2.1c.26.2.61.2.87 0l3.78-2.87c.5-.38 1.16.22.82.75z"/>
  </svg>
);

const socials = [
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: YoutubeIcon,   href: "#", label: "YouTube" },
  { Icon: LinkedinIcon,  href: "#", label: "LinkedIn" },
  { Icon: MessengerIcon, href: "#", label: "Messenger" },
];

export default function Footer() {
  return (
    <footer className="site-footer" style={{ ...sans }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 28px 20px" }}>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: 40 }}>

          {/* ── Brand ── */}
          <div style={{ flex: "1 1 320px", minWidth: 280 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", background: "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/sail-logo.png" alt="SAIL logo"
                  style={{ width: 52, height: 52, objectFit: "cover", objectPosition: "center", transform: "scale(1.15)" }} />
              </div>
              <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: "0.04em", color: "#fff" }}>SAIL</span>
            </div>

            {/* Tagline */}
            <h2 style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.25, margin: "0 0 28px", color: "#fff", letterSpacing: "-0.01em" }}>
              Student Alumni<br />Interaction Linkage
            </h2>

            {/* Socials */}
            <div style={{ display: "flex", gap: 14 }}>
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", opacity: 0.9, transition: "opacity 150ms" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0.9"}>
                  <Icon style={{ width: 24, height: 24 }} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 1, background: "rgba(255,255,255,0.18)", alignSelf: "stretch" }} className="hidden md:block" />

          {/* ── Learn More ── */}
          <div style={{ flex: "1 1 220px", minWidth: 180 }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 36px", color: "#fff" }}>Learn More</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 22 }}>
              {learnMore.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", textDecoration: "none", transition: "color 150ms" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Us ── */}
          <div style={{ flex: "1 1 220px", minWidth: 180 }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 36px", color: "#fff" }}>Contact Us</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, fontSize: 15, color: "rgba(255,255,255,0.85)" }}>
              <span>Call us:</span>
              <a href="tel:+917340303998" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>+91-7340303998</a>
              <a href="tel:+918459281263" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>+91-8459281263</a>
              <span>Email us: <a href="mailto:SAIL@iitg.ac.in" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>SAIL@iitg.ac.in</a></span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ textAlign: "center", marginTop: 44, fontSize: 14.5, color: "rgba(255,255,255,0.85)" }}>
          © {new Date().getFullYear()} SAIL All rights reserved.
        </div>
      </div>
    </footer>
  );
}
