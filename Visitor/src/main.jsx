import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx';
import Post from './pages/Post.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element : <Home></Home>
  }
  ,
  {
    path:"post/:postId",
    element:<Post></Post>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
