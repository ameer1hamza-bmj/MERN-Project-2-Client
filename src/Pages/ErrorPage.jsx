import React from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

const ErrorPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#121212] text-[#f5f5f5] flex flex-col items-center justify-center px-4"
    >
      <AlertTriangle className="w-16 h-16 text-[#7c3aed] mb-4" />
      <h1 className="text-6xl font-bold text-[#7c3aed] mb-4">404</h1>
      <p className="text-xl text-center text-gray-400 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-[#7c3aed] hover:bg-[#9333ea] text-white px-6 py-3 rounded-xl transition duration-300"
      >
        Go Back Home
      </Link>
    </motion.div>
  )
}

export default ErrorPage
