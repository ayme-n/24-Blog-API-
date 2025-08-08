import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx';
import Post from './pages/Post.jsx';
import EditPost from './pages/EditPost.jsx';
import { StrictMode } from "react";
import Login from './pages/Login.jsx';
import Signin from './pages/Signin.jsx';
import { useState, createContext } from "react";
import AddPost from './pages/AddPost.jsx';
import EditComment from './pages/EditComment.jsx';

const router = createBrowserRouter([
  {
    path:"/admin",
    element : <Home></Home>
  }
  ,
  {
    path:"/post/:postId",
    element:<Post></Post>
  },
  {
    path:"/post/new",
    element:<AddPost></AddPost>
  }
  ,
  {
    path:"/post/:postId/edit",
    element:<EditPost></EditPost>
  },
  ,
  {
    path:"/post/:postId/comment/:commentId",
    element:<EditComment></EditComment>
  },
  ,
  {
    path:"/signin",
    element:<Signin></Signin>
  },
  {
    path:"/login",
    element:<Login></Login>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
