import { useNavigate } from "react-router-dom";
import {
  Plus,
  Eye,
  Store,
  Pencil,
  Trash2,
} from "lucide-react";

import api from "../services/api";

function BusinessCard({ business, refreshBusinesses }) {
  const navigate = useNavigate();

  // Delete Business
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this business?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/business/${business._id}`);

      alert("Business Deleted Successfully 🗑️");

      refreshBusinesses();
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to delete business.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8DDD5] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-[#D9C2A3] flex items-center justify-center">
        <Store
          size={28}
          className="text-[#6D4C41]"
        />
      </div>

      {/* Business Name */}
      <h2 className="text-2xl font-bold text-[#3E2F2F] mt-5">
        {business.businessName}
      </h2>

      {/* Category */}
      <span className="inline-block mt-3 bg-[#F3E8D8] text-[#6D4C41] px-3 py-1 rounded-full text-sm">
        {business.category}
      </span>

      {/* Description */}
      <p className="text-gray-600 mt-4 line-clamp-3">
        {business.description}
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3">

        {/* View Products */}
        <button
          onClick={() =>
            navigate(`/products/${business._id}`)
          }
          className="flex items-center justify-center gap-2 bg-[#D9C2A3] text-[#3E2F2F] py-3 rounded-xl hover:bg-[#CCB18A] transition"
        >
          <Eye size={18} />
          View Products
        </button>

        {/* Add Product */}
        <button
          onClick={() =>
            navigate(`/create-product/${business._id}`)
          }
          className="flex items-center justify-center gap-2 bg-[#6D4C41] text-white py-3 rounded-xl hover:bg-[#5A3E35] transition"
        >
          <Plus size={18} />
          Add Product
        </button>

        {/* Edit Business */}
        <button
          onClick={() =>
            navigate(`/edit-business/${business._id}`)
          }
          className="flex items-center justify-center gap-2 border border-[#6D4C41] text-[#6D4C41] py-3 rounded-xl hover:bg-[#F8F5F0] transition"
        >
          <Pencil size={18} />
          Edit Business
        </button>

    <button
  onClick={handleDelete}
  className="flex items-center justify-center gap-2 bg-[#C58A8A] text-white py-3 rounded-xl hover:bg-[#B97777] transition duration-300"
>
  <Trash2 size={18} />
  Delete Business
</button>

      </div>
    </div>
  );
}

export default BusinessCard;