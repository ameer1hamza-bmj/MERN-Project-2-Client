import React, { useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Users, FileText, Home, Menu, X } from 'lucide-react';
import { useAuth } from '../Store/Auth';
import Loader from '../Components/UI/Loader';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  if (!user?.isAdmin) return <Navigate to="/" />;

  const links = [
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/blogs', label: 'Blogs', icon: FileText },
    { to: '/', label: 'Back to Home', icon: Home },
  ];

  return (
    <div className="flex h-screen bg-[#121212] text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out bg-[#1e1e1e] md:static w-64 shadow-lg`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4 border-b border-gray-700">
          <button onClick={() => setSidebarOpen(false)} className="text-gray-300">
            <X size={24} />
          </button>
        </div>

        <div className="p-5 border-b border-gray-700 text-2xl font-bold text-purple-400">
          Blogify Admin
        </div>

        <nav className="flex flex-col gap-2 mt-6 px-4">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white transition-colors text-gray-300"
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Topbar for mobile */}
        <header className="flex items-center justify-between p-4 bg-[#1e1e1e] md:hidden border-b border-gray-700">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-300">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-semibold text-purple-400">Admin Dashboard</h1>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto custom-scrollbar bg-[#181818]">
          {location.pathname === '/admin' ? (
            <div className="text-center mt-20">
              <h2 className="text-3xl font-bold mb-4 text-purple-400">Welcome to Admin Dashboard</h2>
              <p className="text-gray-400">Use the sidebar to manage users and blogs.</p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
