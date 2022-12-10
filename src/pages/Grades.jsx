import axios from 'axios'
import React, {useEffect, useState } from 'react'
import moment from 'moment';
import './grades.scss'
import { useParams ,useNavigate } from 'react-router-dom';


export default function Grades() {

  const {id} = useParams();

  const [grades,setGrades] = useState([])


  useEffect(()=>{
    const fetchData = async () => {
      try{
          const res = await axios.get(`/grades/${id}`)
          setGrades(res.data)
  
     
           }catch(err){
          console.log(err)
      }
    }
    fetchData()
  },[])

const CountGrades = [...grades]
const GradesLength = grades.length;


let totalCountGrades = CountGrades.reduce((total,item)=> total + parseInt(item.grade),0)
let AverageGrade =  totalCountGrades/CountGrades.length
let result = Math.round(AverageGrade * 100) / 100

  return (
    <div className='mainGrades'>
    
      <div className="results">
        <h5>Total number of grades is {GradesLength }  - Average grade is {result} </h5>
      </div>
    
    
    <div className='GradesArray'>

    <table>
      <thead>
        <tr>
          <th className='username'>username</th>
          <th className='grade'>grade</th>
          <th className='note'>note</th>
          <th className='date'>date</th>
        </tr>
      </thead>
      <tbody>
      {grades.sort((a,b)=>{
                      return new Date(b.date) - new Date(a.date);
                      }).map( (element,key) => (
        <tr key={element.gradeID}>
          <td>{element.username}</td>
          <td className='grade1'>{element.grade}</td>
          <td>{element.comment}</td>
          <td>{moment(element?.date).format('DD.MM')}</td>
        </tr> ))}
      
      
      </tbody>
        </table>
      </div>
      </div>
  )
}
