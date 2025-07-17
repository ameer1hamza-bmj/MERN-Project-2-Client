import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, User, Folder, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '../Api/authAPI';
import Loader from '../Components/UI/Loader';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorization } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogDetail', id],
    queryFn: () => getBlogById(id, authorization),
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen bg-[#121212] text-red-500 flex justify-center items-center">
        <p>Error loading blog: {error.message}</p>
      </div>
    );
  }

  const { title, content, thumbnail, author, category, tags, createdAt } = data;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#121212] text-[#f5f5f5] px-4 py-16"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[#7c3aed] hover:text-[#9333ea] text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        {/* Thumbnail */}
        <div className="w-full h-64 sm:h-80 md:h-[450px] overflow-hidden rounded-2xl shadow-xl mb-10">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-[#7c3aed] to-[#9333ea] bg-clip-text text-transparent tracking-tight">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {author?.username || 'Unknown'}
          </span>
          <span className="flex items-center gap-1">
            <Folder className="w-4 h-4" />
            {category || 'General'}
          </span>
        </div>

        {/* Tags */}
        {tags?.[0] && (
          <div className="flex flex-wrap gap-3 mb-10">
            {tags[0]
              .split(' ')
              .filter((tag) => tag.trim() !== '')
              .map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#1f1f1f] border border-[#7c3aed] text-[#7c3aed] px-3 py-1 text-xs rounded-full shadow-md hover:bg-[#2a2a2a] transition"
                >
                  #{tag.replace(/^#/, '')}
                </span>
              ))}
          </div>
        )}

        {/* Content */}
        <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed tracking-wide">
          {content.split('\n').map((para, i) => (
            <p key={i} className="whitespace-pre-line">
              {para}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;
