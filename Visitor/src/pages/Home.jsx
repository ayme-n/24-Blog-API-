
import { useEffect, useState } from "react";
import Post from "../compenents/Post";



function Home(){

    const[posts,setPosts]=useState([])



    useEffect(()=>{
            
    const GetPosts = async()=>{

    const response = await fetch("http://localhost:3000/posts")
    
    const posts = await response.json()

    setPosts(posts.posts)
}

GetPosts()

    
    },[])


    return(
        <>
        <h1>Blog</h1>

        <h1>Posts Lists</h1>
       <ul>
         {posts.map((post)=>{
            return <li key={post.id}><Post title={post.title} id={post.id}></Post> </li>
        })}
       </ul>
        </>
    )

}


export default Home;