import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/Auth'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Components/UI/Loader'
import { getUserById, updateUserById } from '../Api/authAPI'
import toast from 'react-hot-toast'

const AdminUpdate = () => {
    const { id } = useParams()
    const { authorization } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        bio: '',
        website: '',
    })

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getUserById'],
        queryFn: () => getUserById(id, authorization),
        keepPreviousData: true,
    })

    useEffect(() => {
        if (data) {
            setFormData({
                username: data.username || '',
                email: data.email || '',
                bio: data.bio || '',
                website: data.website || '',
            });
        }
    }, [data]);


    const updateMutation = useMutation({
        mutationFn: (formData) => updateUserById(id, formData, authorization),
        onSuccess: () => {
            toast.success('User info updated successfully!');
            setFormData({
                username: '',
                email: '',
                bio: '',
                website: '',
            });
            navigate('/admin/users')
        },
        onError: (err) => {
            toast.error('Failed to update user info. Please try again.')
            console.error(err)
        }
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        updateMutation.mutate(formData)
        console.log(formData)
    }

    if (isLoading) return <Loader />;
    if (isError) return <div className="text-center text-red-500">Error: {error.message}</div>

    return (
        <div className="min-h-screen bg-[#121212] text-[#f5f5f5] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-[#7c3aed] mb-6 text-center">✏️ Update User Info</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block mb-1 text-sm font-medium text-[#cfcfcf]">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-[#1f1f1f] border border-[#333] text-[#f5f5f5] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-[#cfcfcf]">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#1f1f1f] border border-[#333] text-[#f5f5f5] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="bio" className="block mb-1 text-sm font-medium text-[#cfcfcf]">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows="3"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full bg-[#1f1f1f] border border-[#333] text-[#f5f5f5] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="website" className="block mb-1 text-sm font-medium text-[#cfcfcf]">Website</label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full bg-[#1f1f1f] border border-[#333] text-[#f5f5f5] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white py-2 rounded-xl font-medium hover:opacity-90 transition"
                    >
                        Update Info
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminUpdate
