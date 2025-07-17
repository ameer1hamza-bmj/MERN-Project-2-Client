import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { editProfileApi } from '../Api/authAPI';
import { useAuth } from '../Store/Auth';
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const [formData, setFormData] = useState({
        bio: '',
        website: '',
        location: '',
        avatar: null,
    });
    const { authorization, userAuthorization } = useAuth()
    const navigate = useNavigate()

    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {

        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFormData((pre) => ({ ...pre, avatar: file }))
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    };

    const mutation = useMutation({
        mutationFn: (formData) => editProfileApi(formData, authorization),
        onSuccess: (data) => {
            console.log('Profile updated successfully:', data);
            userAuthorization()
            navigate('/profile')
            alert('Profile updated successfully!');
        },
        onError: (error) => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again later.');
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData)
    };

    return (
        <div className="min-h-screen bg-[#121212] text-[#f5f5f5] px-4 py-16">
            <div className="max-w-3xl mx-auto bg-[#1f1f1f] p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-[#7c3aed] mb-6">Your Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Bio */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Write something about you..."
                            className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Website</label>
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://yourwebsite.com"
                            className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City, Country"
                            className="w-full px-4 py-3 bg-[#121212] border border-gray-700 rounded-xl text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                        />
                    </div>
                    {preview && (
                        <div className="mb-4">
                            <img
                                src={preview}
                                alt="Avatar Preview"
                                className="w-24 h-24 rounded-full object-cover border border-[#7c3aed]"
                            />
                        </div>
                    )}

                    {/* Avatar */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7c3aed] file:text-white hover:file:bg-[#9333ea]"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-[#7c3aed] hover:bg-[#9333ea] text-white px-6 py-3 rounded-xl font-medium transition duration-300 w-full"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
