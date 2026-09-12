import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Package } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [marketingContent, setMarketingContent] = useState(null);

  const { businessId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [businessId]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/product/business/${businessId}`);
      setProducts(res.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // 🤖 Generate AI Marketing Content
  const generateMarketing = async (product) => {
    setAiLoading(true);

    try {
      const res = await api.post("/marketing/generate", {
        productName: product.name,
        category: product.category || "General",
        price: product.price,
      });

      setMarketingContent(res.data.marketingContent);
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to generate marketing content ❌");
    }

    setAiLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#3E2F2F]">
                My Products 🛍️
              </h1>

              <p className="text-[#6D4C41] mt-2">
                Manage all your products beautifully.
              </p>
            </div>

            <button
              onClick={() => navigate(`/create-product/${businessId}`)}
              className="flex items-center gap-2 bg-[#6D4C41] text-white px-6 py-3 rounded-xl hover:bg-[#5A3E35] transition"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* Products */}
          {products.length === 0 ? (

            // Empty State
            <div className="bg-white rounded-2xl shadow-md border border-[#E8DDD5] p-10 text-center">

              <Package
                size={60}
                className="mx-auto text-[#6D4C41]"
              />

              <h2 className="text-2xl font-semibold mt-5 text-[#3E2F2F]">
                No Products Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Add your first product to this business.
              </p>

              <button
                onClick={() =>
                  navigate(`/create-product/${businessId}`)
                }
                className="mt-6 bg-[#6D4C41] text-white px-6 py-3 rounded-xl hover:bg-[#5A3E35] transition"
              >
                Add Product
              </button>

            </div>

          ) : (

            <>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {products.map((product) => (

                  <div key={product._id}>

                    <ProductCard
                      product={product}
                      onDelete={fetchProducts}
                    />

                    {/* AI Button */}
                    <button
                      onClick={() => generateMarketing(product)}
                      disabled={aiLoading}
                      className="mt-3 w-full bg-[#D9C2A3] text-[#6D4C41] py-3 rounded-xl font-medium hover:bg-[#CDB394] transition disabled:opacity-50"
                    >
                      {aiLoading
                        ? "Generating..."
                        : "✨ Generate Marketing"}
                    </button>

                  </div>

                ))}

              </div>

              {/* AI Marketing Content */}
              {marketingContent && (

                <div className="mt-10 bg-white rounded-3xl shadow-lg border border-[#E8DDD5] p-8">

                  <h2 className="text-3xl font-bold text-[#3E2F2F] mb-6">
                    ✨ AI Marketing Content
                  </h2>

                  <div className="space-y-6">

                    {/* Instagram */}
                    <div>
                      <h3 className="font-semibold text-[#6D4C41]">
                        📸 Instagram Caption
                      </h3>

                      <p className="mt-2 text-gray-700 whitespace-pre-line">
                        {marketingContent.instagramCaption}
                      </p>
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <h3 className="font-semibold text-[#6D4C41]">
                        📱 WhatsApp Message
                      </h3>

                      <p className="mt-2 text-gray-700 whitespace-pre-line">
                        {marketingContent.whatsappMessage}
                      </p>
                    </div>

                    {/* Tagline */}
                    <div>
                      <h3 className="font-semibold text-[#6D4C41]">
                        🏷️ Tagline
                      </h3>

                      <p className="mt-2 text-gray-700">
                        {marketingContent.tagline}
                      </p>
                    </div>

                    {/* Hashtags */}
                    <div>
                      <h3 className="font-semibold text-[#6D4C41]">
                        #️⃣ Hashtags
                      </h3>

                      <p className="mt-2 text-[#6D4C41]">
                        {marketingContent.hashtags.join(" ")}
                      </p>
                    </div>

                  </div>

                </div>

              )}

            </>

          )}

        </div>
      </div>
    </div>
  );
}

export default MyProducts;