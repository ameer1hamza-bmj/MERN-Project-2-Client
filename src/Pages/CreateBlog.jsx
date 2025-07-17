import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ImagePlus, Tags, Tag, PencilLine } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../Store/Auth'
import { postBlog } from '../Api/authAPI'
import toast from 'react-hot-toast'

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    thumbnail: null
  })

  const { authorization } = useAuth()

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'thumbnail') {
      setFormData({ ...formData, thumbnail: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const mutation = useMutation({
    mutationFn: (formData) => postBlog(formData, authorization),
    onSuccess: (data) => {
      console.log("Blog created successfully:", data)
      toast.success("Blog created successfully!")
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: '',
        thumbnail: null
      })
    },
    onError: (error) => {
      console.error("Error creating blog:", error)
      toast.error("Failed to create blog. Please try again.")
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
    console.log("Submitting blog:", Object.fromEntries(data))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#121212] text-[#f5f5f5] px-4 py-16"
    >
      <div className="max-w-3xl mx-auto bg-[#1f1f1f] p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#7c3aed] mb-6 flex items-center gap-2">
          <PencilLine className="w-6 h-6 text-[#7c3aed]" />
          Create New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail Upload */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Thumbnail</label>
            <div className="bg-[#121212] border border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#7c3aed]">
              <div className="flex items-center gap-3">
                <ImagePlus className="w-5 h-5 text-gray-500" />
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-sm text-[#f5f5f5] file:bg-[#7c3aed] file:border-none file:rounded-lg file:px-4 file:py-1 file:text-white"
                />
              </div>
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
                onChange={handleChange}
                placeholder="Enter blog title"
                className="bg-transparent outline-none w-full text-[#f5f5f5]"
              />
            </div>
          </div>

          {/* Content / Description */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Content</label>
            <textarea
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content..."
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Programming, Lifestyle"
              className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
            />
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
                onChange={handleChange}
                placeholder="e.g. react, mongodb, express"
                className="bg-transparent outline-none w-full text-[#f5f5f5]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#7c3aed] hover:bg-[#9333ea] text-white px-6 py-3 rounded-xl font-medium transition duration-300"
          >
            Publish Blog
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default CreateBlog
