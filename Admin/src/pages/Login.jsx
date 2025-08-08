import { useState } from "react";

import { useNavigate } from 'react-router-dom';


function Login(){

    const [username,Setusername] = useState("")
    const [password,Setpassword] = useState("")

    
const navigate = useNavigate();

    
 async function handleSubmit(e){

    e.preventDefault();


    const response = await fetch("http://localhost:3000/login",
        {
            method : "POST",
             headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username , password : password}),
        }
    )

    const data = await response.json()


    if(response.ok){

        localStorage.setItem('token', data.token); 

        localStorage.setItem('username', username);

        navigate("/admin"
            
        )

    }


}


    return(

        <div>


            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

            
            <label htmlFor="username">username</label>
            <input type="text" name="username" id="username"  onChange={(e)=>{
                Setusername(e.target.value)
            }} /><br />

            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" onChange={(e)=>{
                Setpassword(e.target.value)
            }}  /><br />

            <input type="submit" value={"login"} />


            </form>


        </div>
    )

}

export default Login 