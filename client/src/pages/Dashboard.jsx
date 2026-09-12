import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AICopilot from "../components/AICopilot";
import {
  Store,
  Package,
  Plus,
  ArrowRight,
  Bell,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";

import api from "../services/api";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

function Dashboard() {
  const navigate = useNavigate();

  const [businessCount, setBusinessCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
const [businessId, setBusinessId] = useState(null);
const [insights, setInsights] = useState(null);
const [aiLoading, setAiLoading] = useState(false);
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const bizRes = await api.get("/business/my");
      const prodRes = await api.get("/product");
      const notificationRes = await api.get("/notifications");

      setBusinessCount(bizRes.data.length);
      if (bizRes.data.length > 0) {
  setBusinessId(bizRes.data[0]._id);
  console.log("BUSINESS ID:", bizRes.data[0]._id);
}
      setProductCount(prodRes.data.length);

      // Latest 5 notifications
      setRecentActivity(notificationRes.data.slice(0, 5));

    } catch (error) {
      console.log(error);
    }
  };

  const generateInsights= async () =>{
    if(!businessId)return ;
    try{
      setAiLoading(true);
      const res=await api.post("/insights/generate", {
      businessId,
    });

setInsights(res.data.insights);





    }catch(error){
      console.log(error);
}
finally {
      setAiLoading(false);

    }
  }

  return (
    <Layout>

      {/* Hero Section */}
      <div className="bg-[#FFFDF9] rounded-3xl shadow-md border border-[#E8DDD5] p-8">

        <h2 className="text-4xl font-bold text-[#3E2F2F]">
          Your Entrepreneurial Journey 🌸
        </h2>

        <p className="text-[#6D4C41] mt-3 text-lg">
          Manage your businesses, products and grow your dream with HerRoom.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <StatCard
          title="Businesses"
          value={businessCount}
          icon={<Store size={30} className="text-[#6D4C41]" />}
        />

        <StatCard
          title="Products"
          value={productCount}
          icon={<Package size={30} className="text-[#6D4C41]" />}
        />

      </div>

      {/* AI Business Insights */}
<div className="mt-10 bg-white rounded-2xl shadow-md border border-[#E8DDD5] p-8">

  <div className="flex justify-between items-center">

    <div>
      <h2 className="text-2xl font-semibold text-[#3E2F2F]">
        🤖 AI Business Insights
      </h2>

      <p className="text-gray-500 mt-2">
        Get AI-powered insights and recommendations for your business.
      </p>
    </div>

    <button
      onClick={generateInsights}
      disabled={aiLoading || !businessId}
      className="bg-[#6D4C41] hover:bg-[#5A3E35] text-white px-6 py-3 rounded-xl transition disabled:opacity-50"
    >
      {aiLoading ? "Analyzing..." : "✨ Generate Insights"}
    </button>

  </div>

  {insights && (
    <div className="mt-8">

      <h3 className="text-xl font-semibold text-[#3E2F2F]">
        Summary
      </h3>

      <p className="text-gray-600 mt-2">
        {insights.summary}
      </p>

      <h3 className="text-xl font-semibold text-[#3E2F2F] mt-8">
        💡 Key Insights
      </h3>

      <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-600">
        {insights.insights.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-[#3E2F2F] mt-8">
        🎯 Recommendations
      </h3>

      <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-600">
        {insights.recommendations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

    </div>
  )}

</div>
<AICopilot businessId={businessId} />
      {/* Quick Actions */}
      <div className="mt-10">

        <h2 className="text-2xl font-semibold text-[#3E2F2F] mb-5">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-5">

          <button
            onClick={() => navigate("/create-business")}
            className="bg-[#6D4C41] hover:bg-[#5A3E35] text-white px-6 py-4 rounded-xl flex items-center gap-3 transition"
          >
            <Plus size={20} />
            Create Business
          </button>

          <button
            onClick={() => navigate("/my-businesses")}
            className="bg-[#D9C2A3] hover:bg-[#CDB18B] text-[#3E2F2F] px-6 py-4 rounded-xl flex items-center gap-3 transition"
          >
            <ArrowRight size={20} />
            View Businesses
          </button>

        </div>

      </div>

      {/* Recent Activity */}
      <div className="mt-12 bg-white rounded-2xl shadow-md border border-[#E8DDD5] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold text-[#3E2F2F]">
            Recent Activity
          </h2>

          <button
            onClick={() => navigate("/notifications")}
            className="text-[#6D4C41] font-semibold hover:underline"
          >
            View All →
          </button>

        </div>

        {recentActivity.length === 0 ? (

          <div className="text-center py-10">

            <Bell
              size={40}
              className="mx-auto text-gray-300"
            />

            <p className="text-gray-500 mt-4">
              No recent activity yet.
            </p>

          </div>

        ) : (

          recentActivity.map((activity) => (

            <div
              key={activity._id}
              className="flex items-start gap-4 border-b border-gray-200 last:border-none py-5"
            >

              <div className="w-12 h-12 rounded-full bg-[#F5ECE4] flex items-center justify-center">

                <Bell
                  size={20}
                  className="text-[#6D4C41]"
                />

              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-[#3E2F2F]">
                  {activity.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  {activity.message}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  {formatDistanceToNow(
                    new Date(activity.createdAt),
                    { addSuffix: true }
                  )}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </Layout>
  );
}

export default Dashboard;