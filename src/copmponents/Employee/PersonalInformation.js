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
const PersonalInformation = () => {
  const [personalInformation, setPersonalInformation] = useState([]);
  const [loading, setloading] = useState(false);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}emp/getPersonalDetailsByEmp/${id}`,
      { headers: { token: token } }
    );

    setPersonalInformation(response.data.data[0]);
    setloading(response.data.status);
    console.log("per", response.data.data[0]);
    console.log("hduwdufhsvjhdg", id);
  };

  const changeDate = (date) => {
    if (date) return date.slice(0, 10);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="top-bar-cnt-area">
            <span id="role-title-1">Employee/Personal Information</span>
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
                <th scope="col">Father's Name:</th>-
                <td scope="col">
                  {personalInformation?.FatherName
                    ? personalInformation?.FatherName
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Mother's Name:</th>-
                <td scope="col">
                  {personalInformation?.MotherName
                    ? personalInformation?.MotherName
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Date of Birth:</th>-
                <td scope="col">
                  {personalInformation?.DOB
                    ? changeDate(personalInformation?.DOB)
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Blood Group:</th>-
                <td scope="col">
                  {personalInformation?.BloodGroup
                    ? personalInformation?.BloodGroup
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Hobbies:</th>-
                {personalInformation?.Hobbies?.map((hobby) => {
                  return <td scope="col">{hobby ? hobby : "NA"}</td>;
                })}
              </tr>

              <tr>
                <th scope="col">Emergency Contact No.:</th>-
                <td scope="col">
                  {personalInformation?.EmergencyContactNo
                    ? personalInformation?.EmergencyContactNo
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">Pancard No.:</th>-
                <td scope="col">
                  {personalInformation?.PanCardNo
                    ? personalInformation?.PanCardNo
                    : "NA"}
                </td>
              </tr>
              <tr>
                <th scope="col">AadharCard No.:</th>-
                <td scope="col">
                  {personalInformation?.AadhaarCardNo
                    ? personalInformation?.AadhaarCardNo
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
              <tr>
                <th scope="col">Permanent Address:</th>-
                <td scope="col">
                  {personalInformation?.PermanetAddress
                    ? personalInformation?.PermanetAddress
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

export default PersonalInformation;
