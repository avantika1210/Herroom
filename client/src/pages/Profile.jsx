import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { User, Mail, Phone, Save } from "lucide-react";

function Profile() {

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");

      setFormData(res.data);

    } catch (error) {
      console.log(error);
      alert("Failed to fetch profile");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {

      setSaving(true);

      await api.put("/user/profile", formData);

      alert("Profile Updated Successfully 🌸");

    } catch (error) {

      alert(error.response?.data?.message);

    }

    setSaving(false);
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-2xl">Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-md border border-[#E8DDD5] p-8">

          <h1 className="text-4xl font-bold text-[#3E2F2F]">
            My Profile 👤
          </h1>

          <p className="text-[#6D4C41] mt-2">
            Manage your account information.
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-md border border-[#E8DDD5] p-8 mt-8 space-y-6">

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">
              <User size={18} />
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">
              <Mail size={18} />
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-semibold flex items-center gap-2 mb-2">
              <Phone size={18} />
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            />

          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#6D4C41] text-white px-8 py-3 rounded-xl hover:bg-[#5A3E35]"
          >
            <Save className="inline mr-2" size={18} />

            {saving ? "Saving..." : "Save Changes"}

          </button>

        </div>

      </div>

    </Layout>
  );
}

export default Profile;