import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, FileText, Image, List, Tags } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import Loader from '../Components/UI/Loader';
import { getBlogById, updateBlogById } from '../Api/authAPI';

const EditBlog = () => {
  const { id } = useParams();
  const { authorization } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    thumbnail: null,
    title: '',
    content: '',
    category: '',
    tags: '',
  });

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['editBlog', id],
    queryFn: () => getBlogById(id, authorization),
    enabled: Boolean(id && authorization), // 🔥 This is important
  });

  useEffect(() => {
    if (data) {
      setFormData({
        thumbnail: null,
        title: data.title || '',
        content: data.content || '',
        category: data.category || '',
        tags: Array.isArray(data.tags) ? data.tags.join(' ') : '',
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (formData) => updateBlogById(id, formData, authorization),
    onSuccess: (data) => {
      alert('Blog updated successfully!');
      setFormData({
        thumbnail: null,
        title: '',
        content: '',
        category: '',
        tags: '',
      });
      refetch();
      navigate('/profile');
    },
    onError: (error) => {
      alert('Failed to update blog. Please try again.');
      console.log('Error updating blog:', error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail') {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    mutation.mutate(formData);
  };

  // ✅ Show loader while query is loading or `authorization` not yet available
  if (isLoading || isFetching || !authorization) return <Loader />;

  if (isError) return <div className="text-red-500">Failed to load blog data</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#121212] text-[#f5f5f5] px-4 py-16"
    >
      <div className="max-w-3xl mx-auto bg-[#1f1f1f] p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#7c3aed] mb-6 flex items-center gap-2">
          <Pencil className="w-6 h-6" />
          Edit Blog
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Thumbnail</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 w-full hover:border-[#7c3aed] transition">
                <Image className="w-5 h-5 text-gray-500" />
                <span className="text-gray-400">Choose Image</span>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>
              {formData.thumbnail && (
                <span className="text-sm text-green-500 truncate">{formData.thumbnail.name}</span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Title</label>
            <div className="flex items-center gap-3 bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#7c3aed]">
              <FileText className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="bg-transparent outline-none w-full text-[#f5f5f5]"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Content</label>
            <textarea
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Category</label>
            <div className="flex items-center gap-3 bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#7c3aed]">
              <List className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="bg-transparent outline-none w-full text-[#f5f5f5]"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Tags</label>
            <div className="flex items-center gap-3 bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#7c3aed]">
              <Tags className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="#react #js"
                className="bg-transparent outline-none w-full text-[#f5f5f5]"
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#7c3aed] hover:bg-[#9333ea] text-white px-6 py-3 rounded-xl font-medium transition duration-300 w-full"
          >
            Update Blog
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EditBlog;
