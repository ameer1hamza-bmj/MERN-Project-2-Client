import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Components/UI/Loader';
import { deleteBlogById, getAllBlogs } from '../Api/authAPI';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/Auth';

const AdminBlogs = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { authorization } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminBlogs', page],
    queryFn: () => getAllBlogs(page),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlogById(id, authorization),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminBlogs']);
      alert("Blog deleted successfully!");
    },
    onError: (err) => {
      alert("Failed to delete blog. Please try again.");
      console.log(err);
    }
  });

  const handleBlogDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) {
    return <div className="text-red-500 text-center mt-4">Error: {error.message}</div>;
  }

  return (
    <div className="px-6 py-10 text-[#f5f5f5] min-h-screen">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-10">
        📝 Manage Blogs
      </h1>

      {/* Blog Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.blogs?.map((blog) => (
          <div
            key={blog._id}
            className="bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-xl overflow-hidden shadow-lg hover:shadow-purple-800 transition-all hover:scale-[1.02]"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-5 flex flex-col justify-between h-[calc(100%-10rem)]">
              <div>
                <h2 className="text-xl font-semibold text-purple-300 mb-2 truncate">
                  {blog.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {blog.content}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/edit/${blog._id}`}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-600 text-sm"
                >
                  <Pencil size={18} />
                  Edit
                </Link>
                <button
                  onClick={() => handleBlogDelete(blog._id)}
                  className="flex items-center gap-2 text-red-400 hover:text-red-600 text-sm"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-12 flex justify-center items-center gap-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
            page === 1
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          Previous
        </button>

        <span className="text-gray-300">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= data?.totalPages}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
            page >= data?.totalPages
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminBlogs;
