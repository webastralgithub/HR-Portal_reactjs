import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Employees = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const onFormClose = () => {
    setShowNew(false);
  };

  const addHandler = () => {
    setShowNew(true);
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}hr/getEpmList`,
      { headers: { token: `${token}` } }
    );
    console.log(response?.data?.data);
    setData(response?.data?.data);
    setLoading(false);
  };



  
  return (
    <div>
      {showNew && (
        <div>
          <h2 id="role-form-title">Add Employee Details</h2>

          <div id="role-form-outer-div">
            <Form id="form">
              <Form.Group as={Row}>
                {/* <Form.Label column sm={2}>
                  Position
                </Form.Label> */}
                <Col sm={10} className="form-input">
                  <label for="firstName">Enter FirstName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="firstName"
                    //  ref={Position}
                    required
                  />
                  <label for="middleName">Enter MiddleName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="middleName"
                    //  ref={Position}
                    required
                  />

                  <label for="lastName">Enter LastName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="lastName"
                    //  ref={Position}
                    required
                  />

                  <label for="Email">Enter Email:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Email"
                    //  ref={Position}
                    required
                  />

                  <label for="Gender">Choose Gender:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Gender"
                    //  ref={Position}
                    required
                  />

                  <label for="dob">Enter DOB:</label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="dob"
                    //  ref={Position}
                    required
                  />

                  <label for="doj">Enter Date Of Joining:</label>
                  <Form.Control
                    type="datetime-local"
                    placeholder="DateOfJoining"
                    //  ref={Position}
                    required
                  />

                  <label for="roles">Choose Role:</label>
                  <select id="roles" name="roles">
                    <option value="role1">Role1</option>
                    <option value="role2">Role2</option>
                    <option value="role3">Role3</option>
                    <option value="role4">Role4</option>
                  </select>

                  <label for="position">Choose Position:</label>
                  <select id="position" name="position">
                    <option value="position1">position1</option>
                    <option value="position2">position2</option>
                    <option value="position3">position3</option>
                    <option value="position4">position4</option>
                  </select>

                  <label for="department">Choose Department:</label>
                  <select id="department" name="department">
                    <option value="department1">department1</option>
                  
                  </select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} id="form-submit-button">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit">Submit</Button>
                </Col>
              </Form.Group>
              <Form.Group as={Row} id="form-cancel-button">
                <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                  <Button type="reset" onClick={onFormClose}>
                    cancel
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      )}
      {loading && !showNew && <p>loading...</p>}
      {!loading && !showNew && (
        <div className="right-cnt-area">
          <div className="top-bar-cnt-area">
            <h2 id="role-title">Position Details</h2>

            <button className="btn-rght-top" onClick={addHandler}>
              <FontAwesomeIcon icon={faPlus} id="plus-icon" />
              Add
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>FirstName</th>
                <th>MiddleName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>Gender</th>
                {/* <th>Role Type</th> */}
                {/* <th>Department Name</th> */}
                {/* <th>Position Name</th> */}
                {/* <th>Leave Application</th> */}
                <th>DOB</th>
                <th>Date Of Joining</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {/* <td>{value.Employee_ID}</td> */}
                      <td>{value.FirstName}</td>
                      <td>{value.MiddleName}</td>
                      <td>{value.LastName}</td>
                      <td>{value.Email}</td>
                      <td>{value.ContactNo}</td>
                      <td>{value.Gender}</td>
                      <td>{value.DOB}</td>
                      <td>{value.DateOfJoining}</td>
                      {/* <td>{value.roleType}</td>
                    <td>{value.department}</td>
                    <td>{value.position}</td>
                    <td>{value.leaveApplication}</td> */}
                      <td>
                        <FontAwesomeIcon icon={faEdit} />{" "}
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faTrash} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employees;
