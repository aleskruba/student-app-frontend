import React, { Fragment, useEffect, useState } from 'react'
import { useParams ,useNavigate } from 'react-router-dom';
import axios from 'axios'
import './students.scss'
import moment from 'moment';

export default function Students() {



    const {id} = useParams();

    const [buttons,setButtons] = useState(true)
    const [gradesArray,setGradesArray] = useState([])
    


    const [grades,setGrades] = useState({
      grade:'',
      note:'',
      uidGrade:id,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
   
    })

    const {grade,note} = grades    
    const [state,setState] = useState(false)

    const navigate = useNavigate()
    
    const [editGradeId,setEditGradeId] = useState(null)
    
    const [user,setUser] = useState()

    const [isLoading,setIsLoading] = useState(false)
  


    useEffect(()=>{
      const fetchData = async () => {
        try{
      const resUser = await axios.get(`/auth/users/${id}`)
          setUser(resUser.data[0])
        }catch(err){
      console.log(err)
    }
      }
      fetchData()
    },[])

    useEffect(()=>{
        const fetchData = async () => {
          try{     
            const res = await axios.get(`/grades/${id}`)
      
            setGradesArray(res.data)
         
               }catch(err){
            console.log(err)
          }
        }
        fetchData()
      },[state,isLoading])



      const handlerChangeGrades = (e) => {
        e.preventDefault()
        setGrades({...grades,[e.target.name]:e.target.value})
      
      }

      

      const handlerSubmitGrades = async (e) => {
        e.preventDefault()

              try{
                setIsLoading(true)
              await axios.post('/grades',{grade:grade,
                                    id,
                                    note:note,
                                    date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") })
                
              setIsLoading(false)
              setGrades({grade:"", note:""})
             setState(!state)
                        
            }catch(err){
            console.log(err) }
            
             }
      
        const handleDeleteGradeClick = async (delID) => {
             
              if(window.confirm("Are you sure that you want to delete this grade ?")) {
          
                const data = {
                  delID: delID
          }
            try{
            await axios.delete(`/grades/${delID}`,{data})
                const newGradeObject = [...gradesArray].filter(con => con.id !== delID)
                setGradesArray(newGradeObject)
                setIsLoading(false)
                setState(!state)
       
                }catch(err){
            console.log(err)
          }
          } 
        }


///////////////////////// EDIT ////////////////////////////////////////

const [editFormGradeData,setEditFormGradeData] = useState({
  id: '',
  uidGrade: '',
  date: '',
  grade: '',
  note: ''
})

const [input,setInput] = useState({
  grade:editFormGradeData.grade,
  note:editFormGradeData.note,

})

const handleEditGradeClick = (e,grade) => {
  e.preventDefault()
  setEditGradeId(grade.gradeID)
  setButtons(false)

  const formValues = {
      id: grade.gradeID,
      uidGrade: grade.uidGrade,
      date: grade.date,
      grade: grade.grade,
      note: grade.comment
  }
  setEditFormGradeData(formValues)
  setInput({
    grade:grade.grade,
    note:grade.comment,
  
  })
}




const handleEditFormGradeChange = (e) =>{
  e.preventDefault();

    setInput({...input,[e.target.name]:e.target.value})
   
}

const handleEditFormGradeSubmit = async (e) => {
  e.preventDefault();


  setEditFormGradeData(prev=>({...prev,grade:input.grade,note:input.note}))

        const newGrade = [...gradesArray];   
        const index = gradesArray.findIndex( (grade)=> grade.gradeID === editGradeId )   
      
        newGrade[index] = editFormGradeData;
 
      const e_gradeID = editFormGradeData.id
      const e_note = input.note
      const e_grade = input.grade  
    
      try {
          await axios.put(`/grades/${editFormGradeData.id}`,{e_gradeID, e_note, e_grade }).
            then(()=>setGradesArray(newGrade))
            .catch((err)=>console.log(err.response.data))
            setEditGradeId(null);
     
            setState(!state)
            setButtons(true)
     } catch(err) {console.log(err)}
      
}

 //    const handleEditFormGradeSubmit = async (e) => {
 //      e.preventDefault();

 //      const editedGrade = {
 //        id: editFormGradeData.id,
 //        uidGrade: id,
 //        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
 //        grade: editFormGradeData.grade,
 //        note: editFormGradeData.note,
 //        
 //      };
 //      const newGrade = [...gradesArray];   
 //      const index = gradesArray.findIndex( (grade)=> grade.gradeID== editGradeId )   
 //    
 //      newGrade[index] = editedGrade;
 //    
 //    const e_gradeID = editFormGradeData.id
 //    const e_uidGrade = editFormGradeData.uidGrade
 //    const e_note = editFormGradeData.note
 //    const e_grade = editFormGradeData.grade  
 //    const e_datum = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
 //   console.log(e_datum)     

 //    
 //    try{
 //    await axios.put(`/grades/${editFormGradeData.id}`,{e_gradeID, e_uidGrade, e_datum, e_note, e_grade }).
 //      then(()=>setGradesArray(newGrade))
 //     .catch((err)=>console.log(err.response.data))
 //           setEditGradeId(null);
 //    
 //           setState(!state)
 //           setButtons(true)
 //    } catch(err) {console.log(err)}
 //    
 //          }

   


   
      const  handleCancelGradeClick = () => {
        setEditGradeId(null)
        setButtons(true)
      }
      

/////////////////// delete user

const deleteUser = async (id) =>{ 
  if(window.confirm("Are you sure that you want to delete this user ?")) {

  try{
      await axios.delete(`/auth/${id}`)
                       navigate('/')
      }catch(err){
        console.log(err)
        }
  }
  }



  return (
    <div className='main'>
          <div className="student">   
                    <button className="back" onClick={()=>{     navigate('/Teacherpage')}} >Back to student list</button>
                   <div >     
                    <h3>student ID : <span className="text">{user?.id}</span> </h3>
                    <h3>userame :  <span className="text">{user?.username}</span></h3>
                    <h3>email :  <span className="text">{user?.email}</span></h3>
                         
                        <div className="imgDiv">
                        {!user?.img  || user?.img == 'nothing' ? <img src={`../upload/avatar.jpg`} alt="" />   :   <img src={`../upload/${user?.img}`} alt="" />  }
                        </div>
                    <div className="delButton">
                       <button onClick={()=>{deleteUser(id) }}>delete user</button>
                    </div>

                    </div> 
             
            </div> 

     
            <div className="grades">

              {buttons ? 
                  <div className="insertGrade">
                    <form onSubmit={handlerSubmitGrades}>
                    <div className="label">
                    </div>
                    <div className="select">
                <select  required name='grade' value={grades?.grade} onChange={handlerChangeGrades} > 
                        <option   value="">choose a grade - 1 is the best</option>
                        <option   value="1">1</option>
                        <option   value="2">2</option>
                        <option    value="3">3</option>
                        <option    value="4">4</option>
                        <option    value="5">5</option>
                </select>
                </div>

                  <div className="note">
                      <label id="note">Write a note</label>
                 </div>

                 <div className="text">
                
                <textarea type='text' name="note" rows="4" cols="50" value={grades?.note} maxLength="250"  onChange={handlerChangeGrades}/>   
                    <div className='savegrade' >
                      {isLoading ? 'is loading' : <button type='submit'>save</button>} 
                
                    </div>
                </div>  
                </form>
        
        </div>
          : null}
        
        <div className='GradesArray'>
  
        <table>
                <thead>
                <tr>  
         
                <th>Datum</th>
                     <th>Grade</th>
                    <th>Note</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

                    {gradesArray.sort((a,b)=>{
                      return new Date(b.date) - new Date(a.date);
                      }).map( (element,key) => (
                        <Fragment key={key}>
                            {element.uidGrade == id && 
                            <Fragment> 
                              {editGradeId !== element.gradeID ? (
                                
                         

                                  <tr >  
                        
                        <td>{moment(element?.date).format('DD.MM')}</td>
                                  <td className='grade1'>{element?.grade}</td>
                                  <td>{element?.comment}</td>
                               
                                
                                  <td >
                                 
                                  {buttons ? 
                                  <div className="buttons">
                                    <div>
                                    <button className="update" onClick={(e)=>handleEditGradeClick(e,element)}>update</button>
                                    </div>
                                    <div>
                                                                   
                                      <Fragment>
                                {isLoading ? 'is loading': <button className="delete" onClick={()=> handleDeleteGradeClick(element.gradeID) } >delete</button> }   
                                </Fragment>
                                    </div>
                                  </div>   : null } </td>
                                  
                                  </tr>
                                         ):(
                        
                                <tr>    
                        
                        <td>{moment(element?.date).format('DD.MM')}</td>
                                <td> 
                                    <select  value={input.grade} name='grade' onChange={handleEditFormGradeChange}> 
                                        <option  value="1">1</option>
                                        <option  value="2">2</option>
                                        <option  value="3">3</option>
                                        <option  value="4">4</option>
                                        <option  value="5">5</option>
                                      </select></td>
                                <td style={{width:'200px'}}>
                                  <textarea style={{width:"250px", resize:"none"}} maxLength="250" type="text" value={input.note} name="note"   rows="4" cols="50"  onChange={handleEditFormGradeChange} 
                                  />
                                </td>
                           
                                <td>
               
                                          <div className="buttons">
                                               <div>
                                               <button type='submit' className='save' onClick={handleEditFormGradeSubmit}>save</button>
                                               </div>
                                               <div>
                                               <button className='cancel' onClick={handleCancelGradeClick}>cancel</button>
                                               </div>      
                                           </div>
                              
              
                                                      </td>
                               </tr>  
                    
                    )}
                        </Fragment>
                        }
                        </Fragment>
                ))}
                               
                
                </tbody>
         </table>     

                  </div>
        
              </div>   
    </div>
  )
}
