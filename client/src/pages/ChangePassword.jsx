import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function ChangePassword() {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.put("/user/change-password", data);
      alert("Password changed successfully 🔐");
      setData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">Change Password 🔒</h1>

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={data.oldPassword}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={data.newPassword}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleSubmit}
          className="bg-[#6D4C41] text-white px-6 py-3 rounded-xl w-full"
        >
          Update Password
        </button>
      </div>
    </Layout>
  );
}

export default ChangePassword;