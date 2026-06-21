import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Bell, Lock, User, LogOut, ChevronRight } from "lucide-react";

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

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "0.5rem" }}>Settings</h1>
        <p style={{ color: "var(--text-secondary)" }}>Manage your account, privacy, and notifications</p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        borderBottom: "1px solid var(--border)",
        marginBottom: "2rem",
      }}>
        {["account", "privacy", "notifications"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "1rem 1.5rem",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: activeTab === tab ? "600" : "400",
              color: activeTab === tab ? "var(--text-primary)" : "var(--text-secondary)",
              borderBottom: activeTab === tab ? "2px solid var(--accent)" : "none",
              textTransform: "capitalize",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Account Settings */}
      {activeTab === "account" && (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div style={{
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            background: "var(--paper)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <User size={20} style={{ color: "var(--accent)" }} />
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>Profile Information</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Update your name, email, and profile details</p>
              </div>
            </div>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", marginBottom: "0.5rem" }}>Name</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "0.375rem",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "500", marginBottom: "0.5rem" }}>Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || user?.alumniEmailId}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "0.375rem",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
              <button style={{
                padding: "0.75rem 1.5rem",
                background: "var(--accent)",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontWeight: "500",
                marginTop: "0.5rem",
              }}>
                Save Changes
              </button>
            </div>
          </div>

          <div style={{
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            background: "var(--paper)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <Lock size={20} style={{ color: "var(--accent)" }} />
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>Password & Security</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Change your password and manage security settings</p>
              </div>
            </div>
            <button style={{
              padding: "0.75rem 1.5rem",
              background: "transparent",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontWeight: "500",
            }}>
              Change Password
            </button>
          </div>

          <div style={{
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            background: "var(--paper)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <LogOut size={20} style={{ color: "#dc2626" }} />
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem" }}>Logout</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Sign out from your account</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Privacy Settings */}
      {activeTab === "privacy" && (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div style={{
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            background: "var(--paper)",
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1.5rem" }}>Profile Visibility</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              {["public", "alumni-only", "private"].map(option => (
                <label key={option} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                }}>
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={option}
                    checked={settings.profileVisibility === option}
                    onChange={(e) => handleSelectChange("profileVisibility", e.target.value)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ textTransform: "capitalize", fontWeight: "500" }}>{option.replace("-", " ")}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            background: "var(--paper)",
          }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1.5rem" }}>Contact Information</h3>
            <div style={{ display: "grid", gap: "1rem" }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
              }}>
                <span style={{ fontWeight: "500" }}>Show email on profile</span>
                <input
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={() => handleToggle("showEmail")}
                  style={{ cursor: "pointer", width: "1.25rem", height: "1.25rem" }}
                />
              </label>
              <label style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
              }}>
                <span style={{ fontWeight: "500" }}>Allow direct messages</span>
                <input
                  type="checkbox"
                  checked={settings.allowMessages}
                  onChange={() => handleToggle("allowMessages")}
                  style={{ cursor: "pointer", width: "1.25rem", height: "1.25rem" }}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          <div style={{
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            background: "var(--paper)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <Bell size={20} style={{ color: "var(--accent)" }} />
              <h3 style={{ fontSize: "1rem", fontWeight: "600" }}>Email Notifications</h3>
            </div>
            <div style={{ display: "grid", gap: "1rem" }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
              }}>
                <span style={{ fontWeight: "500" }}>Connection requests</span>
                <input
                  type="checkbox"
                  checked={settings.connectionRequests}
                  onChange={() => handleToggle("connectionRequests")}
                  style={{ cursor: "pointer", width: "1.25rem", height: "1.25rem" }}
                />
              </label>
              <label style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
              }}>
                <span style={{ fontWeight: "500" }}>Mentorship offers</span>
                <input
                  type="checkbox"
                  checked={settings.mentorshipOffers}
                  onChange={() => handleToggle("mentorshipOffers")}
                  style={{ cursor: "pointer", width: "1.25rem", height: "1.25rem" }}
                />
              </label>
              <label style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
              }}>
                <span style={{ fontWeight: "500" }}>Weekly news digest</span>
                <input
                  type="checkbox"
                  checked={settings.newsDigest}
                  onChange={() => handleToggle("newsDigest")}
                  style={{ cursor: "pointer", width: "1.25rem", height: "1.25rem" }}
                />
              </label>
            </div>
          </div>

          <button style={{
            padding: "0.75rem 1.5rem",
            background: "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            fontWeight: "500",
          }}>
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}
