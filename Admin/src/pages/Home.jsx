
import { useEffect, useState } from "react";
import Post from "../compenents/Post";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function Home(){

    const navigate = useNavigate();


    const[posts,setPosts]=useState([])

     const GetPosts = async()=>{

    const response = await fetch("http://localhost:3000/posts")
    
    const posts = await response.json()

    setPosts(posts.posts)
}


    useEffect(()=>{
            
   

GetPosts()

    
    },[])


    async function logout(e) {

    e.preventDefault();

    localStorage.removeItem("token"); 

    navigate("/login")
    
}

async function DeletePost(id){
            const token = localStorage.getItem('token');


    const response = await fetch(`http://localhost:3000/post/${id}`,
        {
            method : "DELETE",
             headers: {
       'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
        
      }        }
    )

    GetPosts()

    }   


    return(
        <>

        <form onSubmit={logout}>

            <input type="submit" name="logout" value={"logout"}/>

        </form>

        <h1>Blog</h1>

        <h1>Posts Lists</h1>
       <ul>
         {posts.map((post)=>{
            return  <li key={post.id}><Post title={post.title} id={post.id}></Post>
            <Link to={`/post/${post.id}`}><button>View</button></Link>
            <Link to={`/post/${post.id}/edit`}><button>Edit</button></Link>
             <button onClick={()=>{
                DeletePost(post.id)
             }}>Delete</button> </li>
            
        })}
       </ul>
       <Link to={"/post/new"}><button>ADD POST</button>
</Link>
        </>
    )

}


export default Home;