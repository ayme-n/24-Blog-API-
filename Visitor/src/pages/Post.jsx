import { useEffect, useState } from "react"
import { redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";



function Post(){

     async function GetComments(postId){


        const respone = await fetch(`http://localhost:3000/post/${postId}/comments`)

        const data = await respone.json()

        SetComments(data.comments)


    }

    const [post,setpost] = useState({})

    const {postId} = useParams()

    useEffect(
    ()=>{

        async function GetPost(id){


        const respone = await fetch(`http://localhost:3000/post/${id}`)

        const data = await respone.json()

        setpost(data.post)


    }


   

        
        GetPost(postId)

        GetComments(postId)
    

    },[postId])

    
    async function handleSubmit(e) {

        e.preventDefault();


        const respone = await fetch(`http://localhost:3000/post/${post.id}/comment/new`,{
            method : "POST",
             headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: comment }),
        })

        setComment(""); 

        GetComments(postId)

    }

    const [comment,setComment] = useState("")

    const [comments,SetComments] = useState([])

    return(
        <div>
            <Link to={"/"}>Back</Link>
            <h1>Ttitle : {post.title}</h1>
            <p>{post.text}</p>
            

            <div className="comments">

            <h3>Comments </h3>

            <ul>
                {comments.map((comment)=>{
                return <li key={comment.id}>{comment.text}</li>
            })}
            </ul>

            </div>


             <form onSubmit={handleSubmit}>
                    <textarea name="text" id="text" placeholder="enter a comment" onChange={(e)=>{
                        setComment(e.target.value)
                    }} value={comment}></textarea>
                    <br />
                    <input type="submit" value={"add"} />
                </form>
            
        </div>
    )

}

export default Post