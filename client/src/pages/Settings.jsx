import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Bell,
  Palette,
  LogOut,
  ChevronRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const settings = [
    {
      icon: User,
      title: "Profile",
      subtitle: "View and manage your profile information",
      color: "bg-[#D9C2A3]",
      route: "/profile",
    },
    {
      icon: Lock,
      title: "Change Password",
      subtitle: "Update your account password securely",
      color: "bg-[#E8DDD5]",
      route: "/change-password",
    },
    {
  icon: Bell,
  title: "Notifications",
  subtitle: "Manage alerts and reminders",
  color: "bg-[#F3E8D8]",
  route: "/notifications",
},
    {
      icon: Palette,
      title: "Appearance",
      subtitle: "Customize the look and feel of HerRoom",
      color: "bg-[#F8D7DA]",
      route: "/appearance",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold text-[#3E2F2F]">
            Settings ⚙️
          </h1>

          <p className="text-[#6D4C41] mt-2">
            Manage your account and personalize your experience.
          </p>

          {/* Settings Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {settings.map((item, index) => (
              <div
                key={index}
                onClick={() => item.route && navigate(item.route)}
                className="bg-white rounded-2xl border border-[#E8DDD5] shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
              >
                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-4">

                    <div
                      className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center`}
                    >
                      <item.icon size={28} className="text-[#6D4C41]" />
                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-[#3E2F2F]">
                        {item.title}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        {item.subtitle}
                      </p>

                    </div>

                  </div>

                  <ChevronRight className="text-[#6D4C41]" />

                </div>
              </div>
            ))}

          </div>

          {/* Account Section */}
          <div className="bg-white rounded-2xl border border-[#E8DDD5] shadow-md p-8 mt-10">

            <h2 className="text-2xl font-bold text-[#3E2F2F]">
              Account
            </h2>

            <p className="text-gray-500 mt-2">
              Sign out of your account anytime.
            </p>

            <button
              onClick={handleLogout}
              className="mt-6 flex items-center gap-2 bg-[#C58A8A] hover:bg-[#B57A7A] text-white px-6 py-3 rounded-xl transition"
            >
              <LogOut size={20} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;