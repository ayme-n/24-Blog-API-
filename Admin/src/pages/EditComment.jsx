import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



function EditComment(){

        const navigate = useNavigate();

    const [comment,setcomment] = useState({
        text:""
    })

    const {commentId} = useParams()

    const {postId} = useParams()


    useEffect(
    ()=>{

        async function GetComment(){


        const respone = await fetch(`http://localhost:3000/post/${postId}/comment/${commentId}`)

        const data = await respone.json()

        setcomment(data.comment)


    }


   

        
        GetComment

    
    

    },[])

    const token = localStorage.getItem('token');

    async function handleSubmit(e) {

        e.preventDefault();


        const respone = await fetch(`http://localhost:3000/post/${postId}/comment/${commentId}`,{
            method : "PUT",
             headers: {
       'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
        
      },
      body: JSON.stringify({ text : comment.text }),
        })
 

         navigate(`/post/${postId}`)

    }

    return(
        <div>
            <Link to={`/admin`}>Back</Link>
            
             <form onSubmit={handleSubmit}>
                   
                   <label htmlFor="title">Text : </label>

                   <textarea name="text" cols={100} rows={30} id="text"  value={comment.text} onChange={(e)=>{
                    setcomment({
                        ...comment,
                            text : e.target.value
                    })
                   }} ></textarea>
                  
                    <br/>
                    <input type="submit" value={"edit"} />
                </form>
            
        </div>
    )

}

export default EditComment