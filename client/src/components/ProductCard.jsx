import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2, IndianRupee } from "lucide-react";
import api from "../services/api";

function ProductCard({ product, onDelete }) {
  const navigate = useNavigate();
  const { businessId } = useParams();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/product/${product._id}`);

      alert("Product deleted successfully ✅");

      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to delete product ❌");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8DDD5] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

      {/* Product Name */}
      <h2 className="text-2xl font-bold text-[#3E2F2F]">
        {product.name}
      </h2>

      {/* Price */}
      <div className="flex items-center gap-1 mt-4 text-[#6D4C41]">
        <IndianRupee size={18} />
        <span className="text-xl font-semibold">
          {product.price}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-4 line-clamp-3">
        {product.description}
      </p>

      {/* Category */}
      <span className="inline-block mt-5 bg-[#F3E8D8] text-[#6D4C41] px-3 py-1 rounded-full text-sm">
        {product.category || "General"}
      </span>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={() =>
            navigate(`/edit-product/${businessId}/${product._id}`)
          }
          className="flex-1 bg-[#D9C2A3] hover:bg-[#CCB18A] text-[#3E2F2F] py-3 rounded-xl flex justify-center items-center gap-2 transition"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>
    </div>
  );
}

export default ProductCard;