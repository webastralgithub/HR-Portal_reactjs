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
  const [showEdit, setShowEdit] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [entity, setEntity] = useState();
  const [account, setAccount] = useState();
  const [role, setRole] = useState();
 
  const [position, setPosition] = useState();
  const [department, setDepartment] = useState();
  const [addEmp, setAddEmp] = useState({
    Email: "",
    Password: "",
    // Account: "",
    Role: "",
    Gender: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    DOB: "",
    ContactNo: "",
    EmpCode: "",
    Department: "",
    Position: "",
    DateOfJoining: "",
    Termination: ""
  });

  useEffect(() => {
    getData();
    getEntity();
  }, []);

  const onFormClose = () => {
    setShowNew(false);
    setShowEdit(false);
  };

  const addHandler = () => {
    setShowNew(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAddEmp({ ...addEmp, [name]: value });
  };

  const editHandler = (index) => {
    console.log("index", data[index]);
    // setId(data[index]?.salary[0]?._id)
    // setValue(data[index])
    setShowEdit(true);
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

  const changeDate = (date) => {
    if (date) return date.slice(0, 10);
  };

  const getEntity = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}hr/dropdown`,
      { headers: { token: `${token}` } }
    );
    setEntity(response?.data);

    console.log("entity", response?.data.role);
  };

  const onAddEmployee = async(e) => {
     e.preventDefault();
     const obj = {
      Email: "",
      Password: "",
      Account: "",
     }
  }

  // const onEmployeeEdit = async(e) => {
  //   e.preventDefault();
  //     const obj = {
  //       BasicSalary: addSalary.BasicSalary,
  //       BankName: addSalary.BankName,
  //       AccountNo: addSalary.AccountNo,
  //       AccountHolderName: addSalary.AccountHolderName,
  //       IFSCcode: addSalary.IFSCcode,
  //       TaxDeduction: addSalary.TaxDeduction,
  //     };
  //     Object.keys(obj).forEach(key => {
  //       if (obj[key] === '') {
  //         delete obj[key];
  //       }
  //     });

  //     const response = await axios.patch(
  //       `${process.env.REACT_APP_API_KEY}/hr/update/${id}`,
  //       obj,
  //       { headers: { token: `${token}` } }
  //     );
  //     console.log(response.data.data);

  //     setShowNew(false);
  //     getData();
  //     setShowEdit(false)
  // }

  return (
    <div className="container">
      {showNew && (
        <div className="row">
          <h2 id="role-form-title">Add Employee Details</h2>

          <div id="role-form-outer-div">
            <Form id="form">
              <Form.Group as={Row}>
                {/* <Form.Label column sm={2}>
                  Position
                </Form.Label> */}
                <Col sm={10} className="form-input col-lg-10 m-auto ">
                  <label for="Email">Email:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Email"
                    onChange={handleChange}
                    name="Email"
                    //  ref={Position}
                    required
                  />

                  <label for="Password">Password:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Password"
                    onChange={handleChange}
                    name="Password"
                    //  ref={Position}
                    required
                  />

                  <Form.Group as={Row}>
                    <label for="Account">Account Access:</label>
                    <select
                      id="Account"
                      name="Account"
                      onChange={(e) => setAccount(e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="HR">HR</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <label for="roles">Role:</label>
                    <select
                      id="roles"
                      name="Role"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {entity &&
                        entity.role.map((item) => (
                          <option value={item?.roleType}>
                            {item?.roleType}
                          </option>
                        ))}
                    </select>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <label for="gender">Gender:</label>
                    <select
                      id="gender"
                      name="Gender"
                      // onChange={(e) => setPosition(e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </Form.Group>

                  <label for="firstName">FirstName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="firstName"
                    onChange={handleChange}
                    name="FirstName"
                    //  ref={Position}
                    required
                  />
                  <label for="middleName">MiddleName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="middleName"
                    onChange={handleChange}
                    name="MiddleName"
                    //  ref={Position}
                    required
                  />

                  <label for="lastName">LastName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="lastName"
                    onChange={handleChange}
                    name="LastName"
                    //  ref={Position}
                    required
                  />

                  <label for="dob">DOB:</label>
                  <Form.Control
                    type="date"
                    placeholder="dob"
                    onChange={handleChange}
                    name="DOB"
                    //  ref={Position}
                    required
                  />

                  <label for="Email">Contact No:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Contact"
                    onChange={handleChange}
                    name="ContactNo"
                    //  ref={Position}
                    required
                  />

                  <label for="empcode">Employee Code:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Employee Code"
                    onChange={handleChange}
                    name="Empcode"
                    //  ref={Position}
                    required
                  />

                  <Form.Group as={Row}>
                    <label for="department">Department:</label>
                    <select
                      id="department"
                      name="Department"
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      {entity &&
                        entity.department.map((item) => (
                          <option value={item?.departmentName}>
                            {item?.departmentName}
                          </option>
                        ))}
                    </select>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <label for="position">Position:</label>
                    <select
                      id="position"
                      name="Position"
                      onChange={(e) => setPosition(e.target.value)}
                    >
                      {entity &&
                        entity.position.map((item) => (
                          <option value={item?.positionName}>
                            {item?.positionName}
                          </option>
                        ))}
                    </select>
                  </Form.Group>

                  <label for="DateOfJoining">Date Of Joining:</label>
                  <Form.Control
                    type="date"
                    placeholder="DateOfJoining"
                    onChange={handleChange}
                    name="DateOfJoining"
                    //  ref={Position}
                    required
                  />

                  <label for="termination">Terminate Date:</label>
                  <Form.Control
                    type="date"
                    placeholder="DateOfJoining"
                    onChange={handleChange}
                    name="Termination"
                    //  ref={Position}
                    required
                  />
                </Col>
              </Form.Group>

              <div className="sub-cancel">
                <Form.Group as={Row} id="form-submit-button">
                  <Col>
                    <Button type="submit">Submit</Button>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} id="form-cancel-button">
                  <Col
                    // sm={{ span: 10, offset: 2 }}
                    id="form-cancel-button-inner"
                  >
                    <Button type="reset" onClick={onFormClose}>
                      cancel
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            </Form>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="row">
          <h2 id="role-form-title">Add Employee Details</h2>

          <div id="role-form-outer-div">
            <Form id="form">
              <Form.Group as={Row}>
                {/* <Form.Label column sm={2}>
                  Position
                </Form.Label> */}
                <Col sm={10} className="form-input col-lg-10 m-auto">
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

              <div className="sub-cancel">
                <Form.Group as={Row} id="form-submit-button">
                  <Col>
                    <Button type="submit">Submit</Button>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} id="form-cancel-button">
                  <Col id="form-cancel-button-inner">
                    <Button type="reset" onClick={onFormClose}>
                      cancel
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            </Form>
          </div>
        </div>
      )}
      {loading && !showNew && !showEdit && <p>loading...</p>}
      {!loading && !showNew && !showEdit && (
        <div className="right-cnt-area">
          <div className="top-bar-cnt-area">
            <h2 id="role-title">Employee Details</h2>

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
                      <td>{changeDate(value.DOB)}</td>
                      <td>{changeDate(value.DateOfJoining)}</td>
                      {/* <td>{value.roleType}</td>
                    <td>{value.department}</td>
                    <td>{value.position}</td>
                    <td>{value.leaveApplication}</td> */}
                      <td onClick={() => editHandler(index)}>
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
