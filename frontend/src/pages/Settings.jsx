import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Bell, Lock, User, LogOut } from "lucide-react";

export default function Settings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    connectionRequests: true,
    mentorshipOffers: true,
    newsDigest: false,
    profileVisibility: "public",
    showEmail: false,
    allowMessages: true,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  const tabs = [
    { id: "account", label: "Account" },
    { id: "privacy", label: "Privacy" },
    { id: "notifications", label: "Notifications" },
  ];

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid var(--rule)",
    borderRadius: 8,
    fontSize: 15,
    color: "var(--ink)",
    background: "var(--surface)",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 150ms",
  };

  const Toggle = ({ checked, onChange }) => (
    <label className="toggle" style={{ cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-track" />
    </label>
  );

  const ToggleRow = ({ label, description, checked, onChange }) => (
    <label className="toggle-wrapper" style={{ cursor: "pointer" }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{label}</div>
        {description && <div style={{ fontSize: 13, color: "var(--sub)", marginTop: 2 }}>{description}</div>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </label>
  );

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 28px" }}>

        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 32, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>Settings</h1>
          <p style={{ fontSize: 16, color: "var(--sub)", margin: 0 }}>Manage your account, privacy, and notification preferences</p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: 4,
          borderBottom: "1px solid var(--rule)",
          marginBottom: 28,
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 18px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? "var(--ink)" : "var(--sub)",
                borderBottom: activeTab === tab.id ? "2px solid var(--blue)" : "2px solid transparent",
                marginBottom: "-1px",
                transition: "color 150ms, border-color 150ms",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Account Settings ── */}
        {activeTab === "account" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Profile Information */}
            <div className="settings-card">
              <div className="settings-card-header">
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <User size={18} style={{ color: "var(--blue)" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Profile Information</h3>
                  <p style={{ fontSize: 13, color: "var(--sub)", margin: "2px 0 0" }}>Update your name, email, and profile details</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "var(--blue)"}
                    onBlur={e => e.target.style.borderColor = "var(--rule)"}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email || user?.alumniEmailId}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "var(--blue)"}
                    onBlur={e => e.target.style.borderColor = "var(--rule)"}
                  />
                </div>
                <div style={{ paddingTop: 4 }}>
                  <button style={{
                    padding: "10px 24px",
                    background: "var(--blue)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "background 150ms",
                  }}
                    onMouseEnter={e => e.target.style.background = "var(--blue-hover)"}
                    onMouseLeave={e => e.target.style.background = "var(--blue)"}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Password & Security */}
            <div className="settings-card">
              <div className="settings-card-header">
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Lock size={18} style={{ color: "var(--blue)" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Password &amp; Security</h3>
                  <p style={{ fontSize: 13, color: "var(--sub)", margin: "2px 0 0" }}>Change your password and manage security settings</p>
                </div>
              </div>
              <button style={{
                padding: "10px 20px",
                background: "transparent",
                color: "var(--blue)",
                border: "1.5px solid var(--blue)",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}>
                Change Password
              </button>
            </div>

            {/* Logout */}
            <div className="settings-card">
              <div className="settings-card-header">
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FFF1F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LogOut size={18} style={{ color: "var(--red)" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Sign Out</h3>
                  <p style={{ fontSize: 13, color: "var(--sub)", margin: "2px 0 0" }}>Sign out from your current session</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px 20px",
                  background: "var(--red)",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* ── Privacy Settings ── */}
        {activeTab === "privacy" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="settings-card">
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: "0 0 16px" }}>Profile Visibility</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { value: "public", label: "Public", desc: "Visible to anyone on the internet" },
                  { value: "alumni-only", label: "Alumni Only", desc: "Visible to registered IITG alumni" },
                  { value: "private", label: "Private", desc: "Only visible to you" },
                ].map(option => (
                  <label key={option.value} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    border: `1.5px solid ${settings.profileVisibility === option.value ? "var(--blue)" : "var(--rule)"}`,
                    borderRadius: 10,
                    cursor: "pointer",
                    background: settings.profileVisibility === option.value ? "var(--blue-light)" : "var(--surface)",
                    transition: "border-color 150ms, background 150ms",
                  }}>
                    <input
                      type="radio"
                      name="profileVisibility"
                      value={option.value}
                      checked={settings.profileVisibility === option.value}
                      onChange={(e) => handleSelectChange("profileVisibility", e.target.value)}
                      style={{ accentColor: "var(--blue)", width: 16, height: 16, cursor: "pointer" }}
                    />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{option.label}</div>
                      <div style={{ fontSize: 12, color: "var(--sub)", marginTop: 1 }}>{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="settings-card">
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: "0 0 16px" }}>Contact Information</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ToggleRow
                  label="Show email on profile"
                  description="Let others see your email address"
                  checked={settings.showEmail}
                  onChange={() => handleToggle("showEmail")}
                />
                <ToggleRow
                  label="Allow direct messages"
                  description="Let alumni send you direct messages"
                  checked={settings.allowMessages}
                  onChange={() => handleToggle("allowMessages")}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Notification Settings ── */}
        {activeTab === "notifications" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="settings-card">
              <div className="settings-card-header">
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bell size={18} style={{ color: "var(--blue)" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Email Notifications</h3>
                  <p style={{ fontSize: 13, color: "var(--sub)", margin: "2px 0 0" }}>Choose what you'd like to be notified about</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ToggleRow
                  label="Connection requests"
                  description="When someone wants to connect with you"
                  checked={settings.connectionRequests}
                  onChange={() => handleToggle("connectionRequests")}
                />
                <ToggleRow
                  label="Mentorship offers"
                  description="When an alumni offers to mentor you"
                  checked={settings.mentorshipOffers}
                  onChange={() => handleToggle("mentorshipOffers")}
                />
                <ToggleRow
                  label="Weekly news digest"
                  description="A summary of network activity every Monday"
                  checked={settings.newsDigest}
                  onChange={() => handleToggle("newsDigest")}
                />
              </div>
            </div>

            <button style={{
              padding: "11px 28px",
              background: "var(--blue)",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              alignSelf: "flex-start",
              transition: "background 150ms",
            }}
              onMouseEnter={e => e.target.style.background = "var(--blue-hover)"}
              onMouseLeave={e => e.target.style.background = "var(--blue)"}
            >
              Save Preferences
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
