import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 flex items-center justify-center px-6">
      
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-700">
            HerRoom 💜
          </h1>

          <p className="text-gray-500 mt-2">
            Empowering Women Entrepreneurs
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <label className="block text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300"
          >
            Login 🚀
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            New here?
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-2 text-purple-700 font-semibold hover:underline"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;