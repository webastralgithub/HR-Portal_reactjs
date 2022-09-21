import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../../App.css";
import "./employee.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
  faPlus,
  faSearch,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const BasicInformation = () => {
  const [personalInformation, setPersonalInformation] = useState([]);
  const [loading, setloading] = useState(false);
  const id = localStorage.getItem("id");
  console.log("empId", id);
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title="Basic Information"
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}hr/getEmpDetails/${id}`,
      { headers: { token: token } }
    );

    setPersonalInformation(response.data.data[0]);
    setloading(response.data.status);
  };

  const changeDate = (date) => {
    if (date) return date.slice(0, 10);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="top-bar-cnt-area">
            <span id="role-title-1">Employee/Basic Information</span>
          </div>
          {/* <button className="btn-rght-top">
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add
          </button> */}
        </div>

        {!loading ? (
          "loading..."
        ) : (
          <>
            <table className="table" className="emp_basic_dtl">
              <tr>
                <th scope="col">Name:</th> -
                <td scope="col">{`${personalInformation?.FirstName} ${personalInformation?.MiddleName} ${personalInformation?.LastName} `}</td>
              </tr>
              <tr>
                <th scope="col">Email Address:</th>-
                <td scope="col">
                  {personalInformation?.Email
                    ? personalInformation?.Email
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Contact No.:</th>-
                <td scope="col">
                  {personalInformation?.ContactNo
                    ? personalInformation?.ContactNo
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Gender:</th>-
                <td scope="col">
                  {personalInformation?.Gender
                    ? personalInformation?.Gender
                    : "NA"}{" "}
                </td>
              </tr>
              <tr>
                <th scope="col">Role:</th>-
                <td scope="col">
                  {personalInformation?.roleType[0]?.roleType
                    ? personalInformation?.roleType[0]?.roleType
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Position:</th>-
                <td scope="col">
                  {personalInformation?.position[0]?.positionName
                    ? personalInformation?.position[0]?.positionName
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Department:</th>-
                <td scope="col">
                  {personalInformation?.department[0]?.departmentName
                    ? personalInformation?.department[0]?.departmentName
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Team Lead:</th>-
                <td scope="col">
                  {personalInformation?.TeamLeader
                    ? personalInformation?.TeamLeader
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Date of Joining:</th>-
                <td scope="col">
                  {personalInformation?.DateOfJoining
                    ? changeDate(personalInformation?.DateOfJoining)
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Permanent Address:</th>-
                <td scope="col">
                  {personalInformation?.PermanetAddress
                    ? personalInformation?.PermanetAddress
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Current Address:</th>-
                <td scope="col">
                  {personalInformation?.PresentAddress
                    ? personalInformation?.PresentAddress
                    : "NA"}
                </td>
              </tr>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default BasicInformation;
