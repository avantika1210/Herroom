import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

function Layout({ children }) {
  const { theme } = useTheme();

  return (
    <div
      className="flex min-h-screen transition-all duration-300"
      style={{
        backgroundColor:
          theme === "dark"
            ? "var(--bg)"
            : "var(--bg)",
        color:
          theme === "dark"
            ? "var(--text)"
            : "var(--text)",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;