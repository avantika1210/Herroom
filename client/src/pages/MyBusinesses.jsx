import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Plus, Store } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BusinessCard from "../components/BusinessCard";

function MyBusinesses() {
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await api.get("/business/my");
      setBusinesses(res.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#3E2F2F]">
                My Businesses 🏢
              </h1>

              <p className="text-[#6D4C41] mt-2">
                Manage all your businesses from one place.
              </p>
            </div>

            <button
              onClick={() => navigate("/create-business")}
              className="flex items-center gap-2 bg-[#6D4C41] text-white px-6 py-3 rounded-xl hover:bg-[#5A3E35] transition"
            >
              <Plus size={20} />
              New Business
            </button>
          </div>

          {/* Empty State */}
          {businesses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-[#E8DDD5]">
              <Store
                size={60}
                className="mx-auto text-[#6D4C41]"
              />

              <h2 className="text-2xl font-semibold mt-5 text-[#3E2F2F]">
                No Businesses Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Create your first business to get started.
              </p>

              <button
                onClick={() => navigate("/create-business")}
                className="mt-6 bg-[#6D4C41] text-white px-6 py-3 rounded-xl hover:bg-[#5A3E35] transition"
              >
                Create Business
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {businesses.map((business) => (
    <BusinessCard
      key={business._id}
      business={business}
      refreshBusinesses={fetchBusinesses}
    />
  ))}
</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBusinesses;