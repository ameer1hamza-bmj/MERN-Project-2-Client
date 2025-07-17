import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <motion.div
        className="w-16 h-16 border-4 border-t-[#7c3aed] border-b-[#9333ea] border-l-transparent border-r-transparent rounded-full animate-spin"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

export default Loader
