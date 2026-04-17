import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { API_MAP } from "../utils/apiData";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    role: "user", // ✅ default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.mobile
    ) {
      return toast.error("All fields are required");
    }

    try {
      await axios.post(`${API_MAP.auth}/api/auth/signup`, form, {
        withCredentials: true,
      });

      toast.success("Account created 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border">
        
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account 🚀
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Start your shopping journey
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <input
            name="fullName"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
          />

          {/* Email */}
          <input
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
          />

          {/* Mobile */}
          <input
            name="mobile"
            placeholder="Mobile Number"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              onChange={handleChange}
            />
            <span
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          {/* 🔥 Role Selection */}
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={form.role === "user"}
                onChange={handleChange}
              />
              User
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={handleChange}
              />
              Admin
            </label>
          </div>

          {/* Button */}
          <button className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
            Register
          </button>
        </form>

        {/* Google */}
        <button className="w-full cursor-pointer mt-4 flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100">
          <FcGoogle />
          Continue with Google
        </button>

        {/* Login */}
        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;