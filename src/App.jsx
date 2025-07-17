import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import ErrorPage from './Pages/ErrorPage'
import Home from './Pages/Home'
import Blogs from './Pages/Blogs'
import BlogDetail from './Pages/BlogDetail'
import CreateBlog from './Pages/CreateBlog'
import EditBlog from './Pages/EditBlog'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Logout from './Pages/Logout'
import PrivateRoute from './Pages/PrivateRoute'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'
import ChangePassword from './Pages/ChangePassword'
import AdminLayout from './Layout/AdminLayout'
import AdminBlogs from './Pages/AdminBlogs'
import AdminUsers from './Pages/AdminUsers'
import AdminRoute from './Pages/AdminRoute'
import AdminUpdate from './Pages/AdminUpdate'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', errorElement: <ErrorPage />, element: <Home /> },
      { path: '/register', errorElement: <ErrorPage />, element: <Register /> },
      { path: '/logout', errorElement: <ErrorPage />, element: <Logout /> },
      { path: '/login', errorElement: <ErrorPage />, element: <Login /> },
      { path: '/blogs/:id', errorElement: <ErrorPage />, element: <PrivateRoute> <BlogDetail /></PrivateRoute> },
      { path: '/blogs', errorElement: <ErrorPage />, element: <Blogs /> },
      { path: '/write', element: <PrivateRoute><CreateBlog /></PrivateRoute> },
      { path: '/edit/:id', errorElement: <ErrorPage />, element: <PrivateRoute> <EditBlog /></PrivateRoute> },
      { path: '/profile', errorElement: <ErrorPage />, element: <PrivateRoute><Profile /></PrivateRoute> },
      { path: '/profile/edit', errorElement: <ErrorPage />, element: <PrivateRoute><EditProfile /></PrivateRoute> },
      { path: '/change-password', errorElement: <ErrorPage />, element: <PrivateRoute><ChangePassword /></PrivateRoute> },
      {
        path: '/admin',
        errorElement: <ErrorPage />,
        element: <AdminRoute><AdminLayout /></AdminRoute>,
        children: [
          {
            path: 'blogs',
            errorElement: <ErrorPage />,
            element: <AdminRoute><AdminBlogs /></AdminRoute>
          },
          {
            path: 'users',
            errorElement: <ErrorPage />,
            element: <AdminRoute><AdminUsers /></AdminRoute>
          },
          {
            path: 'edit/users/:id',
            errorElement: <ErrorPage />,
            element: <AdminRoute><AdminUpdate /></AdminRoute>
          },
        ]
      }
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
