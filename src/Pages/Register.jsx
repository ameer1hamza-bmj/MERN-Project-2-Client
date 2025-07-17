import React, { useState } from 'react'
import { User, Mail, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { registerData } from '../Api/authAPI'
import { useAuth } from '../Store/Auth'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const { storeToken } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const mutation = useMutation({
    mutationFn: (formData) => registerData(formData, storeToken),
    onSuccess: () => {
      navigate('/')
      toast.success('Registration successful! Welcome Blogify!')
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        toast.success('User already exists')
      } else {
        toast.success('Registration failed')
      }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#121212] flex items-center justify-center px-4 py-16 text-[#f5f5f5]"
    >
      <div className="w-full max-w-md bg-[#1f1f1f]/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-[#7c3aed]/20">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#9333ea] to-[#7c3aed]">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Username</label>
            <div className="flex items-center bg-[#121212] border border-gray-700 rounded-xl px-4 py-3">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username"
                className="w-full bg-transparent text-[#f5f5f5] placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
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
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <div className="flex items-center bg-[#121212] border border-gray-700 rounded-xl px-4 py-3">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full bg-transparent text-[#f5f5f5] placeholder-gray-400 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-gradient-to-r from-[#9333ea] via-[#7c3aed] to-[#9333ea] py-3 rounded-xl text-white font-semibold shadow-md transition"
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#7c3aed] hover:text-[#9333ea] font-medium transition"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default Register
