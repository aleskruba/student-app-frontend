import React,{useContext, useEffect, useState} from 'react'
import { Link, useNavigate,useParams,useLocation } from 'react-router-dom'
import axios from 'axios'
import './updateUser.scss'
import { AuthContext } from '../context/authContext'
import './home.scss'


export default function UpdateUser(props) {
  
  const location = useLocation()
  const propsData = location.state;

  const {currentUser,login,logout,setUpdatedProfile} = useContext(AuthContext)
  const params = useParams()
  const [data,setData] = useState([])

  const [isPass ,setIsPass] = useState(false)
    
useEffect(()=>{
  setIsPass(true)

if (params.id!=currentUser.id){
  fetch("https://api.ipify.org?format=json") 
        .then(res => res.json())
        .then(res => alert('do not try it again bro', res.id))   }
      },
[params.id!=currentUser.id])





  const [file,setFile] = useState(null)


  const [inputs,setInputs] = useState({
        
        
        username: propsData?.username ?  propsData.username : currentUser.username,
        email: propsData?.email ?  propsData.email : currentUser.email,
        password:"",
        isadmin:false
        
      })
     

      const navigate = useNavigate()

      const  upload = async () => {
        try{
          const formData = new FormData()
          formData.append("file",file)
            if (file)
                {const res = await axios.post("/upload",formData)
                return res.data}
            else {
              return;
            }


      }catch(err){
          console.log(err)

        }
      } 

      
     
    
      const [err,setError] = useState(null)  
    
      
    
      const handleChange = (e) => {
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
 
        if(!e.target.value) {
          setIsPass(true)
        } else (setIsPass(false))
    
      }


  
      const handleSubmit = async (e) =>{ 
        e.preventDefault()
        const imgUrl = await upload()
   
        setUpdatedProfile(inputs)
      

        try{
            await axios.put(`/auth/updateUser/${currentUser.id}`,
               
                {...inputs,img: file ? imgUrl:""}) //,{img: file ? imgUrl:""}
                  navigate('/')
            }catch(err){
                setError(err.response.data)
              }
            
            
      
    }

    
       
  return (
    <div className='auth1'>
                <h1>Update your Profile {propsData?.username ? propsData?.username : currentUser.username }</h1>
                {currentUser.id &&
    <form>
        <input required type="text" placeholder='username' value={inputs.username} name="username" onChange={handleChange} /> 
        <input required type="email" placeholder='email'  value={inputs.email} name="email" onChange={handleChange}/>    
        <input  type="file" placeholder='profile image' name="" id="profile-file" onChange={e=>setFile(e.target.files[0])}/>   
        
        <input className={!isPass ? 'white': 'pink'} type="password" placeholder='password' value={inputs.password} name="password"  id="pwd" onChange={handleChange}/>
        <button onClick={handleSubmit} >Update Profile</button>
        <Link to="/"><button  >Cancel</button></Link>
        {params.id!=currentUser.id ?  <h1 style={{color:'red'}}>I know your public IP adress <p id="gfg"></p>  </h1> : null} 


        {err && <p>{err}</p>}  

    </form>    }
    </div>
  )
}
