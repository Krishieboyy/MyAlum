import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import Profile from "./pages/Profile";
import StudentProfile from "./pages/StudentProfile";
import Resources from "./pages/Resources";
import Placements from "./pages/Placements";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login has its own layout (no Navbar) */}
          <Route path="/login" element={<Login />} />

          {/* All other pages share the Navbar layout */}
          <Route path="/*" element={
            <div style={{ background: "var(--paper)" }}>
              <Navbar />
              <Routes>
                <Route path="/"                element={<Home />} />
                <Route path="/directory"       element={<Directory />} />
                <Route path="/profile/:id"     element={<Profile />} />
                <Route path="/student-profile" element={<StudentProfile />} />
                <Route path="/dashboard"       element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/settings"        element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/admin"           element={<ProtectedRoute requiredRole="admin"><Admin /></ProtectedRoute>} />
                <Route path="/resources"       element={<Resources />} />
                <Route path="/placements"      element={<Placements />} />
              </Routes>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
