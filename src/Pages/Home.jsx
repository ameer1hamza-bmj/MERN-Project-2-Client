import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PenLine } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center space-y-6"
      >


        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Welcome to <span className="text-[#7c3aed]">Blogify</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          A place to share your thoughts, ideas, and stories with the world.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/blogs"
            className="inline-block bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#7c3aed] text-white font-medium px-6 py-3 rounded-xl transition duration-300"
          >
            Explore Blogs
          </Link>
        </motion.div>
      </motion.div>
    </div>

  )
}

export default Home
