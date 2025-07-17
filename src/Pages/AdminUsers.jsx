import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminDeleteUserById, adminGetAllUsers } from '../Api/authAPI';
import { useAuth } from '../Store/Auth';
import Loader from '../Components/UI/Loader';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const { authorization, API } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['adminUsers', page],
    queryFn: () => adminGetAllUsers(page, authorization),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminDeleteUserById(id, authorization),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminUsers']);
      toast.success('User deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete user. Please try again.');
    }
  });

  const handleUserDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500 text-center mt-4">Error: {error.message}</div>;

  return (
    <div className="bg-[#121212] min-h-screen px-6 py-10 text-[#f5f5f5]">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-10">
        👥 Manage Users
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.users.map((user) => (
          <div
            key={user._id}
            className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-2xl p-6 shadow-md hover:shadow-purple-800 hover:scale-[1.02] transition-all"
          >
            <div className="flex justify-center mb-4">
              <img
                src={
                  user.avatar
                    ? `${API}/uploads/${user.avatar}`
                    : 'https://cdn-icons-png.flaticon.com/128/64/64572.png'
                }
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-purple-500 shadow-md"
              />
            </div>

            <h2 className="text-xl font-semibold text-center text-purple-300 truncate">
              {user.username}
            </h2>

            <div className="mt-3 space-y-1 text-sm text-gray-300">
              <p>
                <span className="text-purple-500 font-semibold">Email:</span> {user.email}
              </p>
              {user.bio && (
                <p>
                  <span className="text-purple-500 font-semibold">Bio:</span>{' '}
                  <span className="line-clamp-2">{user.bio}</span>
                </p>
              )}
              {user.website && (
                <p>
                  <span className="text-purple-500 font-semibold">Website:</span>{' '}
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    {user.website}
                  </a>
                </p>
              )}
            </div>

            <div className="flex justify-between pt-5 mt-4 border-t border-gray-700">
              <Link
                to={`/admin/edit/users/${user._id}`}
                className="flex items-center gap-1 px-3 py-1 text-sm rounded bg-purple-600 hover:bg-purple-700 transition text-white"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={() => handleUserDelete(user._id)}
                className="flex items-center gap-1 px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 transition text-white"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${page === 1
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
        >
          Previous
        </button>

        <span className="text-gray-300">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= data.totalPages}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${data.length < 10
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
        >
          Next
        </button>
      </div>

      {isFetching && (
        <div className="text-center mt-4 text-sm text-gray-400 animate-pulse">
          Loading more users...
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
