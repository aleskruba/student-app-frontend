import React from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [inputs,setInputs] = useState({
    username: "",
    email:  "",
    password:"",
    img:"avatar.jpg",
    isadmin:false
  })
  
  
  
  const [err,setError] = useState(null)  

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))

  }

  const handleSubmit = async (e) =>{ 
    e.preventDefault()
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      try {
        await axios.post("/auth/register",inputs)
        navigate('/login')
      }catch(err){

        setError(err.response.data)
      }

  }


  return (
    <div className='auth'>
        <h1>Register</h1>
    
        <form>
            <input required type="text" placeholder='username' name="username" onChange={handleChange} /> 
            <input required type="email" placeholder='email' name="email" onChange={handleChange}/>         
            <input required type="password" placeholder='password' name="password" onChange={handleChange}/>
            <button onClick={handleSubmit} >Register</button>
          {err && <p>{err}</p>}  
            <span>
                <Link to='../login'>Login here</Link>
          
            </span>
        </form>    
    </div>
  )
}
