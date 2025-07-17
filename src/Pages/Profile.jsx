import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Components/UI/Loader';
import { deleteBlogById, getBlogOfAuther } from '../Api/authAPI';
import { Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, API, authorization } = useAuth();
  const queryClient = useQueryClient();

  const profile = {
    username: user?.username || 'John Doe',
    bio: user?.bio || 'Frontend Developer & Blogger.',
    website: user?.website || 'https://yourwebsite.com',
    location: user?.location || 'Lahore, Pakistan',
    avatar: user?.avatar || 'https://cdn-icons-png.flaticon.com/128/64/64572.png',
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['myBlogs'],
    queryFn: () => getBlogOfAuther(authorization),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlogById(id, authorization),
    onSuccess: () => {
      queryClient.invalidateQueries(['myBlogs']);
      alert("Blog deleted successfully!");
    },
    onError: () => {
      alert("Failed to delete blog. Please try again.");
    }
  });

  const handleBlogDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (confirm) {
      deleteMutation.mutate(id);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#121212] text-red-500">
        <p>Error loading profile: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5] px-4 py-16">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-[#1f1f1f] p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={profile.avatar ? `${API}/uploads/${profile.avatar}` : 'https://cdn-icons-png.flaticon.com/128/64/64572.png'}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-[#7c3aed] object-cover"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold">{profile.username}</h2>
            <p className="text-gray-400 mt-1">{profile.location}</p>
          </div>
        </div>

        <div className="space-y-2 text-center sm:text-left">
          <p><span className="font-semibold">Bio:</span> {profile.bio}</p>
          <p>
            <span className="font-semibold">Website:</span>{' '}
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="text-[#7c3aed] hover:text-[#9333ea] underline break-all"
            >
              {profile.website}
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
          <Link
            to="/profile/edit"
            className="bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white px-6 py-3 rounded-xl font-medium text-center w-full sm:w-auto"
          >
            Edit Profile
          </Link>
          <Link
            to="/change-password"
            className="bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white px-6 py-3 rounded-xl font-medium text-center w-full sm:w-auto"
          >
            Change Password
          </Link>
        </div>
      </motion.div>

      {/* Blogs Section */}
      <div className="max-w-6xl mx-auto mt-16 px-2">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-center sm:text-left"
        >
          My Blogs
        </motion.h3>

        {data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1f1f1f] p-5 rounded-2xl shadow-lg hover:shadow-purple-700/30 transition duration-300"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="h-40 w-full object-cover rounded-xl mb-4"
                />
                <h4 className="text-lg font-semibold mb-2">{blog.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-3">
                  {blog.content.slice(0, 150)}...
                </p>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-[#7c3aed] hover:text-[#9333ea] text-sm font-medium block mt-3"
                >
                  Read More →
                </Link>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-4">
                  <Link
                    to={`/edit/${blog._id}`}
                    className="flex items-center gap-1 text-[#7c3aed] hover:text-[#9333ea] text-sm font-medium"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleBlogDelete(blog._id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-12">No blogs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
