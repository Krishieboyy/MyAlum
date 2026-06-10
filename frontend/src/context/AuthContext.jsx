import { createContext, useContext, useState } from "react";
import { alumni } from "../data/mockData";

const AuthContext = createContext(null);

export const MOCK_ALUMNI = {
  role: "alumni",
  name: alumni[0].name,
  alumniId: alumni[0].id,
  avatar: alumni[0].avatar,
  badge: "CSE · 14",
};

export const MOCK_STUDENT = {
  role: "student",
  name: "Rohan Mehta",
  alumniId: null,
  avatar: "RM",
  badge: "CSE · 3rd yr",
  rollNo: "210101045",
  branch: "Computer Science & Engineering",
  branchCode: "CSE",
  course: "B.Tech",
  year: "3rd Year",
  startYear: 2022,
  endYear: 2026,
  cgpa: "8.7",
  email: "r.mehta@iitg.ac.in",
  campusActivities: [
    { name: "Coding Club",  category: "Technical Club", position: "Member",      since: "2022" },
    { name: "Techniche",    category: "Technical Fest", position: "Volunteer",   since: "2023" },
    { name: "NSS IITG",    category: "Social Club",    position: "Volunteer",   since: "2023" },
  ],
  internships: [
    { company: "Razorpay", role: "SWE Intern", duration: "May–Jul 2024", location: "Bangalore" },
  ],
  skills: ["Python", "C++", "React", "Machine Learning", "System Design"],
  savedResources:  [1, 2],
  savedPlacements: [1, 3],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("myalum_user");
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      // Merge with full mock to fill any missing fields from old cached objects
      if (parsed.role === "student") return { ...MOCK_STUDENT, ...parsed };
      if (parsed.role === "alumni")  return { ...MOCK_ALUMNI,  ...parsed };
      return parsed;
    } catch { return null; }
  });

  const login = (role) => {
    const u = role === "alumni" ? MOCK_ALUMNI : MOCK_STUDENT;
    localStorage.setItem("myalum_user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("myalum_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
