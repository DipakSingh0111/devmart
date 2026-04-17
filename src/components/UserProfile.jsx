import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      setForm({
        fullName: storedUser.fullName || "",
        email: storedUser.email || "",
        mobile: storedUser.mobile || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...form };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("authChange"));

    setUser(updatedUser);
    setEditMode(false);

    toast.success("Profile updated ✅");
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Please login first
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://i.pravatar.cc/120"
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
          />
          <h2 className="text-xl font-semibold text-white mt-3">
            {form.fullName || "User"}
          </h2>
          <p className="text-gray-400 text-sm">Manage your profile</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            name="email"
            value={form.email}
            disabled
            className="w-full px-4 py-3 rounded-xl bg-white/5 text-gray-400 border border-white/10"
          />

          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Mobile Number"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          {editMode ? (
            <>
              <button
                onClick={handleCancel}
                className="w-1/2 py-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold transition"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;