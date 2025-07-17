import React, { useState } from 'react';
import { useAuth } from '../Store/Auth';
import { useMutation } from '@tanstack/react-query';
import { changePasswordApi } from '../Api/authAPI';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { authorization, userAuthorization } = useAuth();

  const mutation = useMutation({
    mutationFn: (formData) => changePasswordApi(formData, authorization),
    onSuccess: (data) => {
      console.log('Password changed successfully:', data);
      userAuthorization();
      toast.success('Password changed successfully!');
    },
    onError: (data) => {
      console.error('Error changing password:', data);
      toast.error('Failed to change password. Please try again later.');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    mutation.mutate(formData);
  };

  const inputClasses = "w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-[#f5f5f5] focus:ring-[#7c3aed]";

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5] px-4 py-16">
      <div className="max-w-xl mx-auto bg-[#1f1f1f] p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-[#7c3aed]">Change Password</h2>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {/* Current Password */}
          <div className="relative">
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className={inputClasses}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#7c3aed] cursor-pointer"
              onClick={() => toggleShow("current")}
            >
              {showPassword.current ? "Hide" : "Show"}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className={inputClasses}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#7c3aed] cursor-pointer"
              onClick={() => toggleShow("new")}
            >
              {showPassword.new ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm New Password */}
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputClasses}
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#7c3aed] cursor-pointer"
              onClick={() => toggleShow("confirm")}
            >
              {showPassword.confirm ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7c3aed] hover:bg-[#9333ea] text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
