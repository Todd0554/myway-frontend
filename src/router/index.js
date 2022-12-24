import React from "react";

const About = React.lazy(() => import('../pages/About'))
const LogIn = React.lazy(() => import('../pages/LogIn'))
const Register = React.lazy(() => import('../pages/Register'))
const BlogList = React.lazy(() => import('../pages/BlogList'))
const BlogArticle = React.lazy(() => import('../pages/BlogArticle'))
const SitesList = React.lazy(() => import('../pages/SitesList'))
const SiteDetail = React.lazy(() => import('../pages/SiteDetail'))
const MyHome = React.lazy(() => import('../pages/MyHome'))
const AdminUserList = React.lazy(() => import('../pages/AdminUserList'))
const AdminSiteList = React.lazy(() => import('../pages/AdminSiteList'))
const BlogForm = React.lazy(() => import('../pages/BlogForm'))
const SiteForm = React.lazy(() => import('../pages/SiteForm'))
const MyDetails = React.lazy(() => import('../components/MyDetails'))
const MyBlog = React.lazy(() => import('../components/MyBlog'))

export const router = [
    {
        path:"",
        element: About
    },
    {
        path:"/",
        element: About
    },
    {
        path:"/login",
        element: LogIn
    },
    {
        path:"/register",
        element: Register
    },
    {
        path:"/blogs",
        element: BlogList,
        children: [
            {
                path:"/:id",
                element: BlogArticle
            },
            {
                path:"/:id/create",
                element: BlogForm
            },
        ]
    },

    {
        path:"/sites",
        element: SitesList,
        children: [
            {
                path:"/:id",
                element: SiteDetail
            },
            {
                path:"/:id/edit",
                element: SiteForm
            },
        ]
    },
    {
        path:"/myhome",
        element: MyHome
    },
    {
        path:"/myhome/myBlogs",
        element: MyBlog
    },
    {
        path:"/myhome/myDetails",
        element: MyDetails
    },
    {
        path:"/admin/userlist",
        element: AdminUserList
    },
    {
        path:"/admin/sitelist",
        element: AdminSiteList
    },
]