import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function Signin(){

    const [username,Setusername] = useState("")
    const [password,Setpassword] = useState("")


const navigate = useNavigate();

    
 async function handleSubmit(e){

    e.preventDefault();


    const response = await fetch("http://localhost:3000/signin",
        {
            method : "POST",
             headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username , password : password}),
        }
    )

    if(response.ok){

        navigate("/login")

    }


}


    return(

        <div>


            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>

            
            <label htmlFor="username">username</label>
            <input type="text" name="username" id="username"  onChange={(e)=>{
                Setusername(e.target.value)
            }} /><br />

            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" onChange={(e)=>{
                Setpassword(e.target.value)
            }}  /><br />

            <input type="submit" value={"sigin"} />


            </form>

            <Link to="/login">login</Link>


        </div>
    )

}

export default Signin 