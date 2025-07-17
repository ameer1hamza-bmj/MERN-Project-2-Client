import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../Store/Auth';
import { useMutation } from '@tanstack/react-query';
import { loginData } from '../Api/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { storeToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: (formData) => loginData(formData, storeToken),
    onSuccess: (data) => {
      storeToken(data.token);
      navigate('/');
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        alert('Invalid credentials');
      } else {
        alert('Something went wrong');
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#121212] flex items-center justify-center px-4 py-16 text-[#f5f5f5]"
    >
      <div className="w-full max-w-md bg-[#1f1f1f]/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-[#7c3aed]/20">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#9333ea]">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label className="text-sm text-gray-300 mb-1 block">Email</label>
            <div className="flex items-center bg-[#121212] border border-gray-700 rounded-xl px-4 py-3">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent text-[#f5f5f5] placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <div className="flex items-center bg-[#121212] border border-gray-700 rounded-xl px-4 py-3">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className="w-full bg-transparent text-[#f5f5f5] placeholder-gray-400 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#7c3aed] py-3 rounded-xl text-white font-semibold shadow-md transition"
          >
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </motion.button>

          {/* Link to Register */}
          <p className="text-sm text-gray-400 text-center mt-4">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-purple-400 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
