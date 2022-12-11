import axios from 'axios';
import moment from 'moment';
import React,{useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom'
import './comment.scss'
import { useNavigate} from 'react-router-dom'
import { API_URL } from "../index.js";

axios.defaults.withCredentials = true;

export default function Comment() {
  const [value, setValue] = useState('');
  const [title,setTitle] = useState("")
 
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{
        await axios.post(`https://studend-app-backend-production.up.railway.app/comments`,{
          title:title,
          comment:value,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        })
        navigate("/")
    }catch(err){
        console.log(err)
    }

  }



  return (
    <div className='write-comment'>
      <div className="content">
        <input type="text" value={title} maxLength="50"  placeholder='title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editContainer"> 
           <ReactQuill   
              theme="snow" 
              value={value} 
              onChange={setValue} 
              maxLength="10" 
           
              />
        </div>
        <div className="buttons">
          <button className='button-send' onClick={handleSubmit} >Send</button>
        <Link to="/"><button className='button-cancel'>Cancel</button></Link>  
          
        </div>
      </div>
      <div className="menu">
        <div className="item">item 1</div>
        <div className="item">item 2 </div>
      </div>

    </div>
  )
}
