import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";

function Appearance() {
  const { theme, setTheme, accent, setAccent } = useTheme();

  const colors = [
    "#C58A8A",
    "#8E7DBE",
    "#6CA6CD",
    "#7FAF8F",
    "#D8B26E",
  ];

  const saveAppearance = () => {
    alert("Appearance updated successfully!");
  };

  const resetAppearance = () => {
    setTheme("light");
    setAccent("#C58A8A");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md border border-[#E8DDD5] p-10">

        <h1 className="text-4xl font-bold text-[#3E2F2F]">
          Appearance 🎨
        </h1>

        <p className="text-gray-500 mt-2">
          Personalize the look and feel of HerRoom.
        </p>

        {/* Theme */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-[#3E2F2F] mb-5">
            Theme
          </h2>

          <div className="flex gap-5">

            <button
              onClick={() => setTheme("light")}
              className={`flex-1 rounded-2xl border-2 p-6 transition ${
                theme === "light"
                  ? "border-[#C58A8A] bg-[#FFF7F2]"
                  : "border-gray-200"
              }`}
            >
              <div className="text-5xl">☀️</div>

              <h3 className="font-bold mt-3">Light</h3>

              <p className="text-gray-500 text-sm">
                Warm beige interface
              </p>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`flex-1 rounded-2xl border-2 p-6 transition ${
                theme === "dark"
                  ? "border-[#C58A8A] bg-[#FFF7F2]"
                  : "border-gray-200"
              }`}
            >
              <div className="text-5xl">🌙</div>

              <h3 className="font-bold mt-3">
                Mocha Dark
              </h3>

              <p className="text-gray-500 text-sm">
                Premium dark experience
              </p>
            </button>

          </div>
        </div>

        {/* Accent */}
        <div className="mt-12">

          <h2 className="text-xl font-semibold text-[#3E2F2F] mb-5">
            Accent Color
          </h2>

          <div className="flex gap-5">

            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setAccent(color)}
                className={`w-16 h-16 rounded-full border-4 transition ${
                  accent === color
                    ? "border-black scale-110"
                    : "border-white"
                }`}
                style={{
                  backgroundColor: color,
                }}
              />
            ))}

          </div>

        </div>

        {/* Preview */}
        <div className="mt-12">

          <h2 className="text-xl font-semibold text-[#3E2F2F] mb-5">
            Preview
          </h2>

          <div
            className="rounded-2xl p-8 border"
            style={{
              background:
                theme === "light"
                  ? "#F8F5F0"
                  : "#2B2421",
              color:
                theme === "light"
                  ? "#3E2F2F"
                  : "#F8F5F0",
            }}
          >
            <h3 className="text-2xl font-bold">
              HerRoom Dashboard
            </h3>

            <p className="mt-2">
              This is how your dashboard will look.
            </p>

            <button
              className="mt-5 px-6 py-3 rounded-xl text-white font-semibold"
              style={{
                backgroundColor: accent,
              }}
            >
              Sample Button
            </button>
          </div>

        </div>

        <div className="flex gap-4 mt-12">

          <button
            onClick={saveAppearance}
            className="bg-[#6D4C41] hover:bg-[#5A3E35] text-white px-8 py-3 rounded-xl transition"
          >
            Save Changes
          </button>

          <button
            onClick={resetAppearance}
            className="border border-[#C58A8A] text-[#C58A8A] px-8 py-3 rounded-xl hover:bg-[#FFF2F2] transition"
          >
            Reset
          </button>

        </div>

      </div>
    </Layout>
  );
}

export default Appearance;