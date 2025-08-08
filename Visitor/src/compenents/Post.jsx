



import { Link } from 'react-router-dom';


function Post({title,id}){


    return(
        <div>
            <h1>{title}</h1>
            <Link to={`/post/${id}`}>View</Link>
           
        </div>
    )

}


export default Post;