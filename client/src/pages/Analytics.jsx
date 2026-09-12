import { useEffect, useState } from "react";
import {
  Store,
  Package,
  IndianRupee,
  Layers3,
  TrendingUp,
} from "lucide-react";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Analytics() {
  const [businesses, setBusinesses] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const businessRes = await api.get("/business/my");
      const productRes = await api.get("/product");

      setBusinesses(businessRes.data);
      setProducts(productRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalBusinesses = businesses.length;

  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const totalCategories = new Set(
    businesses.map((b) => b.category)
  ).size;

  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold text-[#3E2F2F]">
            Analytics 📊
          </h1>

          <p className="text-[#6D4C41] mt-2">
            Track your business growth and insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

            {/* Businesses */}

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E8DDD5]">

              <Store
                className="text-[#6D4C41]"
                size={35}
              />

              <h2 className="text-4xl font-bold mt-5 text-[#3E2F2F]">
                {totalBusinesses}
              </h2>

              <p className="text-gray-500 mt-2">
                Businesses
              </p>

            </div>

            {/* Products */}

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E8DDD5]">

              <Package
                className="text-[#6D4C41]"
                size={35}
              />

              <h2 className="text-4xl font-bold mt-5 text-[#3E2F2F]">
                {totalProducts}
              </h2>

              <p className="text-gray-500 mt-2">
                Products
              </p>

            </div>

            {/* Categories */}

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E8DDD5]">

              <Layers3
                className="text-[#6D4C41]"
                size={35}
              />

              <h2 className="text-4xl font-bold mt-5 text-[#3E2F2F]">
                {totalCategories}
              </h2>

              <p className="text-gray-500 mt-2">
                Categories
              </p>

            </div>

            {/* Total Value */}

            <div className="bg-white rounded-2xl shadow-md p-6 border border-[#E8DDD5]">

              <IndianRupee
                className="text-[#6D4C41]"
                size={35}
              />

              <h2 className="text-4xl font-bold mt-5 text-[#3E2F2F]">
                ₹{totalValue}
              </h2>

              <p className="text-gray-500 mt-2">
                Product Value
              </p>

            </div>

          </div>

          {/* Coming Soon */}

          <div className="mt-10 bg-white rounded-2xl shadow-md border border-[#E8DDD5] p-8">

            <div className="flex items-center gap-3">

              <TrendingUp
                size={28}
                className="text-[#6D4C41]"
              />

              <h2 className="text-2xl font-bold text-[#3E2F2F]">
                Growth Analytics
              </h2>

            </div>

            <div className="mt-8 border-2 border-dashed border-[#D9C2A3] rounded-2xl p-14 text-center">

              <h3 className="text-2xl font-semibold text-[#6D4C41]">
                📈 Charts Coming Soon
              </h3>

              <p className="text-gray-500 mt-3">
                Sales charts, business growth, category insights,
                revenue reports and trends will appear here.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;