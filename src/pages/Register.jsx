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
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    // ✅ Role yahan nahi hai — backend hardcode karta hai "user"
    // Admin sirf /admin/create route se banega (protected)
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.password || !form.mobile) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API_MAP.auth}/api/auth/signup`, form, {
        withCredentials: true,
      });

      // ✅ Backend se role aata hai response mein
      const role = res.data.user?.role;

      toast.success("Account created 🎉");

      // ✅ ROLE-BASED REDIRECT
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/"); // Shopping page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
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
            value={form.fullName}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            onChange={handleChange}
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            onChange={handleChange}
          />

          {/* Mobile */}
          <input
            name="mobile"
            type="tel"
            placeholder="Mobile Number"
            value={form.mobile}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            onChange={handleChange}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={handleChange}
            />
            <span
              className="absolute right-4 top-3.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          {/* ❌ Radio buttons HATA DIYE — security reason
              Backend automatically role "user" set karta hai
              Admin sirf protected route se banega */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 
                       disabled:bg-orange-300 disabled:cursor-not-allowed
                       text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Google */}
        <button className="w-full cursor-pointer mt-4 flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition-colors">
          <FcGoogle />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
