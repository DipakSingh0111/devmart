import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_MAP } from "../utils/apiData";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 redirect path (cart, checkout etc)
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await axios.post(
        `${API_MAP.auth}/api/auth/signin`,
        { email, password },
        { withCredentials: true },
      );

      // 🔥 save user
      localStorage.setItem("user", JSON.stringify(res.data));

      // 🔥 navbar update trigger
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login Successfully 🚀");

      // 🔥 redirect back
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h2>

        <p className="text-gray-500 cursor-pointer text-center mb-6">
          Login to continue shopping
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          {/* Forgot */}
          <div
            className="text-right text-sm cursor-pointer text-orange-500 cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google */}
        <button className="w-full cursor-pointer flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-center mt-6 text-sm cursor-pointer">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-500 cursor-pointer font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
