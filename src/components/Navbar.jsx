import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axios from 'axios'

export default function Navbar(props) {

  const {currentUser,logout,updatedProfile,setUpdatedProfile}= useContext(AuthContext)

  useEffect(()=>{
    setUpdatedProfile(currentUser)
  },[])

  useEffect(()=>{ 

    if(updatedProfile) {

    const fetchData = async () => {
      try{
        const res = await axios.get('/users')
       
       setUpdatedProfile(res.data[0])
      
      }catch(err){
        console.log(err)
      }
    }
    fetchData() }
  },[])
   


  return (
    <div className='navbar'>

      <div className="container">
        <div className="logo">
         <Link to="/"> <img className='image' src="https://www.freeiconspng.com/thumbs/classes-icon/classes-icon-17.png" alt="" /></Link>
          </div>
     

        <div className="links">
               <div className="greet">
         {currentUser && <h4 className='currentUser'>Welcome ! <span className='currentUserName'>{ updatedProfile?.username ? updatedProfile?.username : currentUser.username}</span>  </h4> }
         </div>
         
         
         {updatedProfile?.admin != 0 ?
                <span className='navbarTitle'>
            <Link className='link' to="/Teacherpage">
            <div className="example">
              {!updatedProfile?.img || updatedProfile?.img == 'nothing' ?    <img src={`../upload/avatar.jpg`}  />
               :
              <img src={`../upload/${updatedProfile?.img}`} /> 
              } 
    
  
      
            <div className="fadedbox">
            <div className="title text"><b>TEACHER ZONE</b></div>
           </div>
        </div></Link></span>
          : 
         
         <Link className='link' to={`/grades/${currentUser?.id}`}>
         <div className="example">
              {!updatedProfile?.img || updatedProfile?.img == 'nothing' ?    <img src={`../upload/avatar.jpg`}  />
               :
              <img src={`../upload/${updatedProfile?.img}`} /> 
              } 
    
  
      
            <div className="fadedbox">
            <div className="title text"><b>Your grades</b></div>
           </div>
        </div>
        </Link>} 
          

         
          <span className='navbarTitle'>
            <Link className='link' to="/comment">
             Comment</Link></span>
             
             {currentUser && 
             <Link className='link'  to={`/updateuser/${currentUser.id}`} state={updatedProfile} >
             <div className='update'>
               <span className='navbarTitle' >Profile</span> 
              </div></Link>}

         
             <div className="logout">
               <span className='navbarTitle' onClick={logout} >Logout</span> 
              </div>
            </div>
      </div>
    </div>
  )
}
