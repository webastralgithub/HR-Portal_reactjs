import { faCircle, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Education = () => {

    const [education, setEducation] = useState()
    const id=localStorage.getItem("id")
    const token = localStorage.getItem("token")

    useEffect(() => {
  
        getData()

    }, [])
    const getData=async()=>{
      
      const response= await axios.get(`${process.env.REACT_APP_API_KEY}emp/getEmployeeEducationByEmployee/${id}`, 
      { headers: {"token" : token}})
   
      setEducation(response.data)
      console.log(education);
     
  
      }
 

    return (
        <div>
            <button className='btn btn-primary'>Add Education</button>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Degree/Class</th>
                        <th scope="col">School/University</th>
                        <th scope="col">Passing Year</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {education &&
                        education?.data?.map((item, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <th scope="row"> {index+1}</th>
                                        <td>{item.Degree}</td>
                                        <td>{item.SchoolUniversity}</td>
                                        <td>{item.PassingOfYear}</td>
                                        <td><FontAwesomeIcon  icon={faPen} /> </td>
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

export default Education