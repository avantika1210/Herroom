import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package, Save } from "lucide-react";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function CreateProduct() {
  const { businessId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const[aiLoading, setaiLoading]=useState(false);

const generateDescription=async ()=>{
  setaiLoading(true);
  try{
    const response=await api.post("/ai/generate-description",{
productName:name,
    category:"General"
    }
    
  )
setDescription(response.data.description);

  }catch(error){
  console.log("ERROR:", error);
console.log("RESPONSE:", error.response);
console.log("DATA:", error.response?.data);

    alert("Failed to generate description ❌");

  }
   setaiLoading(false);
}







  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/product", {
        businessId,
        name,
        description,
        price: Number(price),
      });

      alert("Product Created Successfully 🎉");

      navigate(`/products/${businessId}`);
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to Create Product ❌");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        <div className="flex justify-center items-center p-10">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-[#E8DDD5] p-10">

            {/* Heading */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#D9C2A3] flex items-center justify-center">
                <Package
                  size={32}
                  className="text-[#6D4C41]"
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-[#3E2F2F]">
                  Create Product
                </h1>

                <p className="text-[#6D4C41] mt-1">
                  Add a new product to your business.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block mb-2 font-medium text-[#3E2F2F]">
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Handmade Candle"
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
                  placeholder="Describe your product..."
                  required
                  className="w-full rounded-xl border border-[#D9C2A3] p-4 focus:outline-none focus:ring-2 focus:ring-[#6D4C41]"
                />
                <button
  type="button"
  onClick={generateDescription}
  disabled={aiLoading || !name}
  className="mt-3 px-5 py-3 rounded-xl bg-[#D9C2A3] text-[#6D4C41] font-medium hover:bg-[#CDB394] transition disabled:opacity-50"
>
  {aiLoading ? "Generating..." : "✨ Generate with AI"}
</button>
              </div>

              <div>
                <label className="block mb-2 font-medium text-[#3E2F2F]">
                  Price (₹)
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="499"
                  required
                  min="0"
                  className="w-full rounded-xl border border-[#D9C2A3] p-4 focus:outline-none focus:ring-2 focus:ring-[#6D4C41]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6D4C41] hover:bg-[#5A3E35] text-white py-4 rounded-xl flex justify-center items-center gap-3 transition disabled:opacity-60"
              >
                <Save size={20} />
                {loading ? "Creating..." : "Create Product"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;