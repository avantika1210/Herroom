import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Save } from "lucide-react";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function CreateBusiness() {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/business", {
        businessName,
        description,
        category,
      });

     alert("Business Created Successfully 🌸")

      navigate("/my-businesses");
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to create business.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />

        <div className="flex justify-center items-center p-10">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-[#E8DDD5] p-10">

            {/* Heading */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#D9C2A3] flex items-center justify-center">
                <Building2
                  size={32}
                  className="text-[#6D4C41]"
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-[#3E2F2F]">
                  Create Business
                </h1>

                <p className="text-[#6D4C41] mt-1">
                  Start your entrepreneurial journey.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block mb-2 font-medium text-[#3E2F2F]">
                  Business Name
                </label>

                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Bloom Boutique"
                  required
                  className="w-full rounded-xl border border-[#D9C2A3] p-4 focus:outline-none focus:ring-2 focus:ring-[#6D4C41]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-[#3E2F2F]">
                  Description
                </label>

                <textarea
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell customers about your business..."
                  required
                  className="w-full rounded-xl border border-[#D9C2A3] p-4 focus:outline-none focus:ring-2 focus:ring-[#6D4C41]"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-[#3E2F2F]">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Fashion, Bakery, Handmade..."
                  required
                  className="w-full rounded-xl border border-[#D9C2A3] p-4 focus:outline-none focus:ring-2 focus:ring-[#6D4C41]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6D4C41] hover:bg-[#5A3E35] text-white py-4 rounded-xl flex justify-center items-center gap-3 transition disabled:opacity-60"
              >
                <Save size={20} />

                {loading ? "Creating..." : "Create Business"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBusiness;