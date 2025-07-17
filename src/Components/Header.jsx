import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../Store/Auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1f1f1f] text-[#f5f5f5] shadow-md sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#7c3aed]">
          Blogify
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-[#7c3aed] transition">Home</Link>
          <Link to="/blogs" className="hover:text-[#7c3aed] transition">Blogs</Link>
          <Link to="/write" className="hover:text-[#7c3aed] transition">Write</Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:text-[#7c3aed] transition">Profile</Link>

              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
                >
                  Admin Panel
                </Link>
              )}

              <Link
                to="/logout"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#7c3aed] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-[#9333ea] via-[#7c3aed] to-[#9333ea] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#f5f5f5]" />
            ) : (
              <Menu className="w-6 h-6 text-[#f5f5f5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-4 bg-[#1f1f1f] text-sm font-medium space-y-3"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#7c3aed]">Home</Link>
            <Link to="/blogs" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#7c3aed]">Blogs</Link>
            <Link to="/write" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#7c3aed]">Write</Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#7c3aed]">Profile</Link>

                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-purple-400 font-semibold"
                  >
                    Admin Panel
                  </Link>
                )}

                <Link
                  to="/logout"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-left text-red-500"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#7c3aed]">Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#7c3aed]">Register</Link>
              </>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
