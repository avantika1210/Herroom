import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building2, Save } from "lucide-react";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EditBusiness() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    try {
      const res = await api.get(`/business/${id}`);

      setBusinessName(res.data.businessName);
      setDescription(res.data.description);
      setCategory(res.data.category);
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to load business.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.put(`/business/${id}`, {
        businessName,
        description,
        category,
      });

      alert("Business Updated Successfully 🌸");

      navigate("/my-businesses");
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to update business.");
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
                  Edit Business
                </h1>

                <p className="text-[#6D4C41] mt-1">
                  Update your business information.
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
                {loading ? "Updating..." : "Update Business"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBusiness;