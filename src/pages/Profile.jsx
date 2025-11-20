import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PencilSquareIcon, ShieldCheckIcon, SparklesIcon, HeartIcon, CalendarIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function ProfilePage() {
  const { user, updateUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || "/default-avatar.png"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || ""
  });
  const [activeTab, setActiveTab] = useState("overview");

  const [loading, setLoading] = useState(false);


  // Sync avatarPreview with user.avatar changes
  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user.avatar);
    }
    if (user) {
      setEditForm({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || ""
      });
    }
  }, [user]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview locally
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axios.put(
        `http://localhost:5000/api/user/avatar/${user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      updateUser({ avatar: res.data.avatar });
      setAvatarPreview(res.data.avatar);
      
    } catch (err) {
      console.error("Failed to upload avatar:", err);
      alert("Failed to upload avatar. Please try again.");
      setAvatarPreview(user.avatar || "/default-avatar.png");
    }
  };

  const handleSaveProfile = async () => {
    if (!user) {
      toast.error("Cannot edit profile at the moment.");
      return;
    }
  
    try {
      setLoading(true); 
  
      const res = await axios.put(
        `http://localhost:5000/api/user/profile/${user._id}`,
        editForm
      );
  
      updateUser(res.data);
      setIsEditing(false);
  
      toast.success("Profile updated successfully!");
  
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 p-6 flex flex-col justify-center items-center gap-3">
        <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-gray-700 dark:text-gray-300 text-lg text-center">
          Cannot edit the profile at the moment. <br />
          <span className="text-red-500 font-semibold">Please try again later.</span>
        </div>
      </div>
    );
  }

  //Handle Logout

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      toast.success("Logged out successfully!");
      navigate("/"); 
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to logout. Please try again.");
      navigate("/");
    }
  };
  
  

  const memberDays = Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24));
  const loyaltyLevel = memberDays > 180 ? "💎 Diamond" : memberDays > 90 ? "👑 Gold" : memberDays > 30 ? "✨ Silver" : "🌟 New";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-6 relative">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative p-8 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <img
                src={avatarPreview}
                alt="Profile"
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
                onError={(e) => {
                  if (e.target.src !== "/default-avatar.png") {
                    e.target.src = "/default-avatar.png";
                  }
                }}
              />
              <label htmlFor="avatarInput" className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full shadow-lg hover:shadow-xl cursor-pointer transition-all transform hover:scale-110">
                <PencilSquareIcon className="w-5 h-5 text-white" />
              </label>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <SparklesIcon className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-3">{user.email}</p>
              {/* Role Badge */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-700 dark:text-red-300' 
                    : 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300'
                }`}>
                  <ShieldCheckIcon className="w-4 h-4" />
                  {user.role === 'admin' ? 'Administrator' : 'User'}
                </div>
              </div>

              {/* Loyalty Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                <span className="text-sm font-semibold">{loyaltyLevel} Member</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">• {memberDays} days with us</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors flex items-center gap-2"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Edit
              </button>
              <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>

            </div>
          </div>
        </div>



        {/* User Details Card */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
      <SparklesIcon className="w-5 h-5 text-purple-600" />
      Profile Details
    </h3>
    {!isEditing && (
      <button
        onClick={() => {
          setIsEditing(true);
          // Initialize edit form with current user data
          setEditForm({
            name: user.name,
            phone: user.phone || "",
            location: user.location || ""
          });
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Edit Profile
      </button>
    )}
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
      {isEditing ? (
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      ) : (
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
      )}
    </div>
    
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email (Non-editable)</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.email}</p>
    </div>
    
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
      {isEditing ? (
        <input
          type="text"
          value={editForm.phone}
          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      ) : (
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.phone || "Not provided"}</p>
      )}
    </div>
    
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</p>
      {isEditing ? (
        <input
          type="text"
          value={editForm.location}
          onChange={(e) => setEditForm({...editForm, location: e.target.value})}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="e.g., Nairobi, Westlands"
        />
      ) : (
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.location || "Not provided"}</p>
      )}
    </div>
    
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Role</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">{user.role}</p>
    </div>
    
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>
  </div>
  
  {isEditing && (
    <div className="flex gap-2 mt-6">
     <button
  onClick={handleSaveProfile}
  disabled={loading}
  className={`px-4 py-2 rounded-lg text-white 
    ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
>
  {loading ? "Saving..." : "Save Changes"}
</button>
      <button
        onClick={() => setIsEditing(false)}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
      >
        Cancel
      </button>
    </div>
  )}
</div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <HeartIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-1">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Favorite Services</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCardIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">KSh 0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-purple-600" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/booking")}
              className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl hover:shadow-lg transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📅</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Book Service</div>
            </button>

            <button
              onClick={() => navigate("/services")}
              className="p-4 bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 rounded-xl hover:shadow-lg transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💅</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Browse Services</div>
            </button>

            <button
              onClick={() => navigate("/stylists")}
              className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl hover:shadow-lg transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💇‍♀️</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">View Stylists</div>
            </button>

            <button className="p-4 bg-gradient-to-br from-yellow-50 to-purple-50 dark:from-yellow-900/20 dark:to-purple-900/20 rounded-xl hover:shadow-lg transition-all text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎁</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Rewards</div>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}