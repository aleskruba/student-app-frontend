import React, { useEffect ,useState,} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './teacherpage.scss'
import { useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react'


export default function Teacherpage() {
    const {currentUser,logout,updatedProfile,setUpdatedProfile}= useContext(AuthContext)

    const [users,setUsers] = useState([])

    const navigate = useNavigate()


    useEffect(()=>{
        const fetchData = async () => {
          try{
            const res = await axios.get('/teacher')
 
            setUsers(res.data)
          }catch(err){
            console.log(err)
          }
        }
        fetchData()
      },[])

      const [isHovering, setIsHovering] = useState(false);


      const handleMouseOut = () => {
        setIsHovering(false);
      };
  
  
  const [newElement,setNewElement] = useState([])



  const [search,setSearch] = useState('')


  return (
  
    <div className='main'>

        {currentUser?.admin == 1 ?
            <>
        <div className="students">
        <table>
                <thead>
                    <tr>
                        <th><input className='input' type="text" placeholder='search for username.'onChange={e=> setSearch(e.target.value)} /> </th>
                    </tr>
                </thead>
              
                <thead>
                    <tr>
                        <th className='username'>username</th>
                        <th className='email'>email</th>
                 
                                   
                    </tr>
                </thead>
                <tbody>
             
                            {users?.filter(item=>{
                                return search.toLowerCase() === '' ?  item : item.username.toLowerCase().includes(search)
                            }).map( (element,key) => { 
                        
                          
                            return (      
                       
                            <tr   
                              onClick={() => navigate(`/students/${element.id}`
                              )}
                              onMouseOver={() => {
                              setNewElement(element.img)
                              setIsHovering(true);
                            }} onMouseOut={handleMouseOut} className='arrayItem' key={key}    >
                             
                          <td className='username'>{element.username }</td>
                          <td className='email'>{element.email }</td>
                                   </tr>    )
                  
                             } )  }
      
                 
                </tbody>
            </table>
        </div>
        <div className="img">

        {!newElement  || newElement == 'nothing' ? <img src={`../upload/avatar.jpg`} alt="" />   : <img src={`../upload/${newElement}`} alt="" /> }


        </div>

   </>
   :
   <>
   <h1>you are not authorizied to see this page</h1>
   </> }
   
   </div>



  )
}
