import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import Placements from "./pages/Placements";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ background: "var(--paper)" }}>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/directory"  element={<Directory />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/resources"  element={<Resources />} />
          <Route path="/placements" element={<Placements />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
