import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllBlogs } from '../Api/authAPI';
import Loader from '../Components/UI/Loader';
import { useAuth } from '../Store/Auth';

const Blogs = () => {
  const [searchBlogs, setSearchBlogs] = useState('');
  const { IMAGE_URI } = useAuth(); // ✅ use correct variable name

  const {
    data: Allblogs,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['blogs'],
    queryFn: ({ pageParam = 1 }) => getAllBlogs(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.currentPage < lastPage.totalPages;
      return hasMore ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#121212] text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const allBlogsFlat = Allblogs?.pages.flatMap((page) => page.blogs) || [];

  const filteredBlogs = allBlogsFlat.filter((blog) =>
    blog.title.toLowerCase().includes(searchBlogs.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5] px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#9333ea]"
        >
          Explore Inspiring Blogs
        </motion.h2>

        {/* Search */}
        <div className="mb-12 relative max-w-xl mx-auto">
          <input
            type="search"
            value={searchBlogs}
            onChange={(e) => setSearchBlogs(e.target.value)}
            placeholder="Search blogs by title..."
            className="w-full px-5 py-3 rounded-2xl bg-[#1f1f1f] text-[#f5f5f5] placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] transition shadow-inner"
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogs.map((blog, index) => {
       

            return (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="bg-[#1f1f1f] rounded-3xl shadow-[0_8px_30px_rgba(124,58,237,0.15)] hover:shadow-[0_8px_40px_rgba(124,58,237,0.4)] transition duration-300 overflow-hidden"
              >
                <img
                  src={blog.thumbnail} alt={blog.title}
                  className="w-full h-52 sm:h-56 md:h-60 object-cover hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-[#7c3aed] w-5 h-5" />
                    <h3 className="text-lg font-semibold text-[#f5f5f5] line-clamp-1">
                      {blog.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                    {blog.content.slice(0, 200)}...
                  </p>
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-sm font-medium inline-block bg-gradient-to-r from-[#7c3aed] to-[#9333ea] bg-clip-text text-transparent hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button */}
        {filteredBlogs.length > 0 && (
          <div className="flex justify-center mt-14">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!hasNextPage || isFetchingNextPage}
              onClick={fetchNextPage}
              className="bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition disabled:opacity-50"
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load More Blogs'
                  : 'No More Blogs'}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
