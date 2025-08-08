import { useEffect, useState , useRef } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';



function EditPost(){

        const navigate = useNavigate();

    const [post,setpost] = useState({
        title:"",
        text:""
    })

    const {postId} = useParams()

    useEffect(
    ()=>{

        async function GetPost(id){


        const respone = await fetch(`http://localhost:3000/post/${id}`)

        const data = await respone.json()

        setpost(data.post)


    }


   

        
        GetPost(postId)

    
    

    },[postId])

    const token = localStorage.getItem('token');

    async function handleSubmit(e) {

        e.preventDefault();


        const respone = await fetch(`http://localhost:3000/post/${post.id}`,{
            method : "PUT",
             headers: {
       'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
        
      },
      body: JSON.stringify({ title : post.title , text : post.text }),
        })
 

         navigate("/admin")

    }

    return(
        <div>
            <Link to={`/admin`}>Back</Link>
            
             <form onSubmit={handleSubmit}>
                   
                   <label htmlFor="title">Title : </label>
                   <input type="text" name="title" id="title" value={post.title} onChange={(e)=>{
                    setpost(
                        {
                            ...post,
                            title : e.target.value
                        }
                    )
                   }}/><br />

                   <Editor
                         apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                         init={{
                           plugins: [
                             // Core editing features
                             'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                             // Your account includes a free trial of TinyMCE premium features
                             // Try the most popular premium features until Aug 22, 2025:
                             'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                           ],
                           toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                           tinycomments_mode: 'embedded',
                           tinycomments_author: 'Author name',
                           mergetags_list: [
                             { value: 'First.Name', title: 'First Name' },
                             { value: 'Email', title: 'Email' },
                           ],
                           ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                           uploadcare_public_key: '94a562de00d0e48f40c7',
                         }}
                         initialValue="Welcome to TinyMCE!"
                   
                         onEditorChange={(content) => {
                       setpost({
                         ...post,
                         text: content
                       });
                     }}
                       />

                   
                  
                    <br/>
                    <input type="submit" value={"edit"} />
                </form>
            
        </div>
    )

}

export default EditPost