import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const navigate = useNavigate();
  const { theme, accent } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside
      className="w-72 min-h-screen shadow-xl flex flex-col transition-all duration-300"
      style={{
        background:
          theme === "light"
            ? "#6D4C41"
            : "#161311",
        color: "#fff",
      }}
    >
      {/* Logo */}

      <div
        className="p-8 border-b"
        style={{
          borderColor:
            theme === "light"
              ? "#8B6B61"
              : "#2C2725",
        }}
      >
        <h1 className="text-3xl font-bold tracking-wide">
          HerRoom
        </h1>

        <p
          className="text-sm mt-2"
          style={{
            color:
              theme === "light"
                ? "#E8DDD5"
                : "#BFB6AE",
          }}
        >
          Empowering Women Entrepreneurs
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5 py-8 space-y-3">

        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            background: isActive ? accent : "transparent",
            color: isActive ? "#fff" : "#fff",
          })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-80"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/my-businesses"
          style={({ isActive }) => ({
            background: isActive ? accent : "transparent",
            color: "#fff",
          })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-80"
        >
          <BriefcaseBusiness size={20} />
          My Businesses
        </NavLink>

        <NavLink
          to="/analytics"
          style={({ isActive }) => ({
            background: isActive ? accent : "transparent",
            color: "#fff",
          })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-80"
        >
          <BarChart3 size={20} />
          Analytics
        </NavLink>

        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            background: isActive ? accent : "transparent",
            color: "#fff",
          })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-80"
        >
          <Settings size={20} />
          Settings
        </NavLink>

      </nav>

      {/* Logout */}

      <div
        className="p-5 border-t"
        style={{
          borderColor:
            theme === "light"
              ? "#8B6B61"
              : "#2C2725",
        }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-medium text-white transition-all duration-300 hover:opacity-90"
          style={{
            background: accent,
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;