import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { accent } = useTheme();

  const [unreadCount, setUnreadCount] = useState(0);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchNotifications();
    fetchUser();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      const unread = res.data.filter(
        (notification) => !notification.read
      ).length;

      setUnreadCount(unread);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className="w-full px-8 py-5 flex items-center justify-between border-b transition-all duration-300"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* Left */}
      <div>
        <h1
          className="text-3xl font-bold font-serif"
          style={{ color: "var(--text)" }}
        >
          Welcome back, {user.name || "User"} 🌸
        </h1>

        <p
          className="mt-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Manage your businesses beautifully.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div
          className="flex items-center rounded-xl shadow-sm px-4 py-2 border"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <Search
            size={18}
            style={{ color: "var(--text-secondary)" }}
          />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 outline-none bg-transparent w-56"
            style={{ color: "var(--text)" }}
          />
        </div>

        {/* Notification */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative p-3 rounded-xl shadow-sm hover:shadow-md transition"
          style={{
            background: "var(--surface)",
          }}
        >
          <Bell
            size={20}
            style={{
              color: "var(--text-secondary)",
            }}
          />

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-6 w-6 rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm"
          style={{
            background: "var(--surface)",
          }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{
              background: accent,
            }}
          >
            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <p
              className="font-semibold"
              style={{ color: "var(--text)" }}
            >
              {user.name || "User"}
            </p>

            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              {user.email}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;