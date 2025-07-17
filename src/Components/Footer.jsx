import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-[#1f1f1f] text-[#f5f5f5] text-center py-6 mt-12"
    >
      <div className="flex flex-col items-center justify-center gap-2 text-sm">
        <p className="flex items-center gap-1 text-gray-400">
          Made with <Heart className="text-[#7c3aed] w-4 h-4" /> by Ameer Hamza
        </p>
        <p className="text-gray-500 text-xs">© {new Date().getFullYear()} Blogify. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}

export default Footer
