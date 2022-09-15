import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Dependents = () => {
  const [familyMem, setFamilyMem] = useState([]);

  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    try {
      let config = {
        method: "get",
        url: "http://112.196.64.119:4800/api/emp/getfamilyDetails/62eba6a7d6ab044f2d3b321d",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWE2NGIzYzA2NzIwODNmNzI5NDFhOSIsIkFjY291bnQiOiIzIiwiaWF0IjoxNjU5NTg5MzI4fQ.AQG1PcM2lNLpEJA8JFMZfomcXjuMq2dHS6Cy0eXgobw",
        },
      };

      const response = await axios(config);
      setFamilyMem(response.data);
      console.log("fdhfgjghjghjhjy", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name </th>
            <th scope="col">Relationship</th>
            <th scope="col">DOB</th>
            <th scope="col">Occupation</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>

            {/* <th scope="col">Edit</th>
            <th scope="col">Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {familyMem &&
            familyMem?.data?.map((item, i) => {
              return (
                <>
                  <tr key={i}>
                    <th scope="row"> {i + 1}</th>
                    <td>{item.Name}</td>
                    <td>{item.Relationship}</td>
                    <td>{item.DOB.slice(0, 10)}</td>
                    <td>{item.Occupation}</td>

                    {/* <td>{item.Status=="1"?"Pending":item.Status=="2"?"Approoved":"Rejecteed"}</td> */}
                    <td>
                      <FontAwesomeIcon icon={faPen} />{" "}
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faTrash} />{" "}
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Dependents;
