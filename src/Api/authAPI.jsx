import axios from 'axios';

const API_BASE_URI = import.meta.env.VITE_API_BASE_URI || 'http://localhost:3002';

const api = axios.create({
    baseURL: API_BASE_URI
})


export const registerData = async (formData, storeToken) => {

    try {
        const res = await api.post('/api/auth/register', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        storeToken(res.data.token)
        return res.data;
    } catch (error) {
        console.error('Error registering data:', error);
        throw error;

    }
}


export const loginData = async (formData, storeToken) => {
    try {
        const res = await api.post('/api/auth/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        storeToken(res.data.token)
        return res.data;
    } catch (error) {
        console.error('Error Login data:', error);
        throw error;
    }
}



export const editProfileApi = async (formData, authorization) => {
    try {
        const data = new FormData();
        data.append('bio', formData.bio);
        data.append('website', formData.website);
        data.append('location', formData.location);
        if (formData.avatar) {
            data.append('avatar', formData.avatar)
        }
        const res = await api.patch('/api/auth/profile/edit', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authorization
            }
        })
        return res.data
    } catch (error) {
        console.error('Error editing profile:', error);
        throw error;

    }
}




export const changePasswordApi = async (formData, authorization) => {
    try {
        const res = await api.patch('/api/auth/profile/change-password', formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization
            }
        })
        return res.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;

    }
}


export const postBlog = async (formData, authorization) => {
    try {
        const data = new FormData()
        data.append('title', formData.title)
        data.append('content', formData.content)
        data.append('category', formData.category)
        data.append('tags', formData.tags)
        data.append('thumbnail', formData.thumbnail)
        const res = await api.post('/api/blogs', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authorization
            }
        })
        return res.data
    } catch (error) {

    }
}



export const getAllBlogs = async (page = 1) => {
    try {
        const res = await api.get(`/api/blogs/?page=${page}&limit=10`)
        return res.data
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}


export const getBlogById = async (id, authorization) => {
    try {
        const res = await api.get(`/api/blogs/${id}`, {
            headers: {
                Authorization: authorization
            }
        })
        return res.data.blog
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        throw error;
    }
}


export const getBlogOfAuther = async (authorization) => {
    try {
        const res = await api.get('/api/blogs/userBlogs', {
            headers: {
                Authorization: authorization
            }
        })
        return res.data
    } catch (error) {
        console.error('Error fetching author blogs:', error);
        throw error;
    }
}






export const deleteBlogById = async (id, authorization) => {
    try {
        const res = await api.delete(`/api/blogs/delete/${id}`, {
            headers: {
                Authorization: authorization
            }
        })
        return res.data
    } catch (error) {
        console.error('Error deleting blog by ID:', error);
        throw error;

    }
}



export const updateBlogById = async (id, formData, authorization) => {
    const data = new FormData();

    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    data.append('tags', formData.tags);
    if (formData.thumbnail) {
        data.append('thumbnail', formData.thumbnail);
    }
    try {
        const res = await api.patch(`/api/blogs/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: authorization
            }
        })
        return res.data
    } catch (error) {
        console.error('Error updating blog by ID:', error);
        throw error;
    }
}



export const adminGetAllUsers = async (page = 1, authorization) => {
    try {
        const res = await api.get(`/api/admin/users/?page=${page}&limit=10`, {
            headers: {
                Authorization: authorization
            }
        })
        return res.data
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
}




export const adminDeleteUserById = async (id, authorization) => {
    try {
        const res = await api.delete(`/api/admin/users/${id}`, {
            headers: {
                Authorization: authorization
            }
        })
        return res.data
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        throw error;

    }
}


export const getUserById = async (id, authorization) => {
    try {
        const res = await api.get(`/api/admin/users/${id}`, {
            headers: {
                Authorization: authorization
            }
        })
        return res.data.user
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;

    }
}


export const updateUserById = async (id, formData, authorization,) => {
    try {
        const res = await api.patch(`/api/admin/users/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authorization
            }
        })
        return res.data
    } catch (error) {
        console.error('Error updating user by ID:', error);
        throw error;

    }
}




