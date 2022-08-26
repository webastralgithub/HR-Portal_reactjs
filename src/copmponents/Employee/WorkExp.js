import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
// require('dotenv').config()
const WorkExp = () => {
const [exp,setExp] = useState([])
 
const id=localStorage.getItem("id")
const token = localStorage.getItem("token")

 
useEffect(()=>{
   
   
 
getData()
},[])
const getData=async()=>{
  // setLoading(true)
const response= await axios.get(`${process.env.REACT_APP_API_KEY}emp/getWorkExperienceByEpm/${id}`, 
{ headers: {"token" : token}})
 
setExp(response.data)
// setLoading(false)
}



  return (
    <div>
  <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">CompanyName</th>
            <th scope="col">Tech</th>
            <th scope="col">Designation</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {exp && exp?.data?.map((item, i) => {
            return (
              <>
                <tr key={i}>
                  <th scope="row"> {i + 1}</th>
                  <td>{item.CompanyName}</td>
                  <td>{item.Tech}</td>
                  <td>{item.Designation}</td>
                  <td>{item.FromDate.slice(0,10)}</td>
                  <td>{item.ToDate.slice(0,10)}</td>
                  
                  {/* <td>{item.Status=="1"?"Pending":item.Status=="2"?"Approoved":"Rejecteed"}</td> */}
                  <td><FontAwesomeIcon icon={faPen} /> </td>
                  <td><FontAwesomeIcon icon={faTrash} /> </td>


                </tr>
              </>
            )
          })

          }


        </tbody>
      </table>


    </div>
  )
}

export default WorkExp
// http://112.196.64.119:4800/api/emp/getLeaveApplicationsByEmp/62eba6a7d6ab044f2d3b321d