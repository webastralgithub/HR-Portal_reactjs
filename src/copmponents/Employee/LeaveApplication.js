import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeaveApplication = () => {
  const [leaves, setLeaves] = useState([])
 
  const id=localStorage.getItem("id")
const token = localStorage.getItem("token")
  useEffect(() => {
 


getData()
  }, [])
console.log("schasahfjga",id);
  // const callApi = async () => {
  //   try {
  //     let config = {
  //       method: 'get',
  //       url: `${process.env.REACT_APP_API_KEY}emp/getLeaveApplicationsByEmp/${id}`,
  //       headers: {
  //         'token':token
  //        }
  //     };

  //     const response = await axios(config)
  //     setLeaves(response.data)
  //     console.log("jfydftydxhgdfut", response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const getData=async()=>{
    // setLoading(true)
  const response= await axios.get(`${process.env.REACT_APP_API_KEY}emp/getLeaveApplicationsByEmp/${id}`, 
  { headers: {"token" : token}})
  console.log(`${process.env.REACT_APP_API_KEY}emp/getWorkExperienceByEpm/${id}`)
  setLeaves(response.data)
  // setLoading(false)
  }
  return (
    <div>
      <button className='btn btn-primary'>Add Education</button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Leave type</th>
            <th scope="col">Reason for leave</th>
            <th scope="col">Status</th>
            {/* <th scope="col">Edit</th>
            <th scope="col">Delete</th> */}

          </tr>
        </thead>
        <tbody>
          {leaves && leaves?.data?.map((item, i) => {
            return (
              <>
                <tr key={i}>
                  <th scope="row"> {i + 1}</th>
                  <td>{item.Leavetype}</td>
                  <td>{item.Reasonforleave}</td>

                  <td>{item.Status=="1"?"Pending":item.Status=="2"?"Approoved":"Rejecteed"}</td>
                  {/* <td><FontAwesomeIcon icon={faPen} /> </td>
                  <td><FontAwesomeIcon icon={faTrash} /> </td> */}


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

export default LeaveApplication