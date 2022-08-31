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
  const [account, setAccount] = useState("3");
  const [role, setRole] = useState();
  const [gender, setGender] = useState("Male");
  const [position, setPosition] = useState();
  const [department, setDepartment] = useState();
  const [addEmp, setAddEmp] = useState({
    Email: "",
    Password: "",
    // Account: "",
    // Role: "",
    // Gender: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    DOB: "",
    ContactNo: "",
    EmployeeCode: "",
    // Department: "",
    // Position: "",
    DateOfJoining: "",
    Termination: "",
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
    setId(data[index]?._id);
    setValue(data[index]);
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

    console.log("entity", response?.data);
  };

  const onAddEmployee = async (e) => {
    e.preventDefault();
    const obj = {
      Email: addEmp.Email,
      Password: addEmp.Password,
      Account: account,
      Gender: gender,
      FirstName: addEmp.FirstName,
      MiddleName: addEmp.MiddleName,
      LastName: addEmp.LastName,
      userRoleId: role,
      DOB: addEmp.DOB,
      DateOfJoining: addEmp.DateOfJoining,
      ContactNo: addEmp.ContactNo,
      EmployeeCode: addEmp.EmployeeCode,
      positionId: position,
      departId: department,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}hr/addEmployee`,
      obj,
      { headers: { token: `${token}` } }
    );
    if (response.data.status == true) {
      alert("Employee added successfully!");
      setShowNew(false);
      getData();
    } else {
      alert("Employee already Exists!");
    }
    console.log(response.data.data);
  };

  const onEditEmployee = async (e) => {
    e.preventDefault();
    const obj = {
      Email: addEmp.Email,
      Account: account,
      Gender: gender,
      FirstName: addEmp.FirstName,
      MiddleName: addEmp.MiddleName,
      LastName: addEmp.LastName,
      roleType: role,
      DOB: addEmp.DOB,
      DateOfJoining: addEmp.DateOfJoining,
      ContactNo: addEmp.ContactNo,
      EmployeeCode: addEmp.EmployeeCode,
      position: position,
      department: department,
    };

    Object.keys(obj).forEach((key) => {
      if (obj[key] === "") {
        delete obj[key];
      }
    });
    const response = await axios.patch(
      `${process.env.REACT_APP_API_KEY}hr/update/${id}`,
      obj,
      { headers: { token: `${token}` } }
    );
    console.log("editemp", response.data.data);

    setShowNew(false);
    getData();
    setShowEdit(false);
  };

  return (
    <div className="container">
      {showNew && (
        <div className="row">
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Add Employee Details</h2>
            </div>
          </div>
          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onAddEmployee}>
              <Form.Group className="frm-slct-indivi-asd">
                {/* <Form.Label column sm={2}>
                  Position
                </Form.Label> */}
                <Col sm={10} className="form-input col-lg-10 m-auto add-frm-adst">
                  <label for="Email">Email:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Email"
                    onChange={handleChange}
                    name="Email"
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

                  <Form.Group>
                    <label for="Account">Account Access:</label>
                    <select
                      id="Account"
                      name="Account"
                      onChange={(e) => setAccount(e.target.value)}
                    >
                      <option value="1">Admin</option>
                      <option value="2">HR</option>
                      <option value="3">Employee</option>
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="roles">Role:</label>
                    <select
                      id="roles"
                      name="Role"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {entity &&
                        entity.role.map((item) => (
                          <option value={item?._id}>{item?.roleType}</option>
                        ))}
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="gender">Gender:</label>
                    <select
                      id="gender"
                      name="Gender"
                      onChange={(e) => setGender(e.target.value)}
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

                  <label for="EmployeeCode">Employee Code:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Employee Code"
                    onChange={handleChange}
                    name="EmployeeCode"
                    //  ref={Position}
                    required
                  />

                  <Form.Group>
                    <label for="department">Department:</label>
                    <select
                      id="department"
                      name="Department"
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      {entity &&
                        entity.department.map((item) => (
                          <option value={item?._id}>
                            {item?.departmentName}
                          </option>
                        ))}
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="position">Position:</label>
                    <select
                      id="position"
                      name="Position"
                      onChange={(e) => setPosition(e.target.value)}
                    >
                      {entity &&
                        entity.position.map((item) => (
                          <option value={item?._id}>
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
                    placeholder="DateOfTermination"
                    onChange={handleChange}
                    name="Termination"
                    //  ref={Position}
                  />
                </Col>
              </Form.Group>

              <div className="sub-cancel">
                <div className="col-lg-10 m-auto btm-btns-asdt">
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
              </div>
            </Form>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="row">
         <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Edit Employee Details</h2>
            </div>
          </div>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onEditEmployee}>
              <Form.Group className="frm-slct-indivi-asd" >
                {/* <Form.Label column sm={2}>
                Position
              </Form.Label> */}
                <Col sm={10} className="form-input col-lg-10 m-auto add-frm-adst">
                  <label for="Email">Email:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Email"
                    onChange={handleChange}
                    name="Email"
                    defaultValue={value.Email}
                  />

                  {/* <label for="Password">Password:</label>
                <Form.Control
                  type="Text"
                  placeholder="Password"
                  onChange={handleChange}
                  name="Password"
                  //  ref={Position}
                  required
                /> */}

                  <Form.Group>
                    <label for="Account">Account Access:</label>
                    <select
                      id="Account"
                      name="Account"
                      onChange={(e) => setAccount(e.target.value)}
                    >
                      <option value={value.Account}>{value.Account}</option>
                      <option value="1">Admin</option>
                      <option value="2">HR</option>
                      <option value="3">Employee</option>
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="roles">Role:</label>
                    <select
                      id="roles"
                      name="Role"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value={value.roleType[0]}>
                        {value.roleType[0].roleType}
                      </option>
                      {entity &&
                        entity.role.map((item) => (
                          <option value={item?._id}>{item?.roleType}</option>
                        ))}
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="gender">Gender:</label>
                    <select
                      id="gender"
                      name="Gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value={value.Gender}>{value.Gender}</option>
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
                    defaultValue={value.FirstName}
                    required
                  />
                  <label for="middleName">MiddleName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="middleName"
                    onChange={handleChange}
                    name="MiddleName"
                    defaultValue={value.MiddleName}
                    required
                  />

                  <label for="lastName">LastName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="lastName"
                    onChange={handleChange}
                    name="LastName"
                    defaultValue={value.LastName}
                    required
                  />

                  <label for="dob">DOB:</label>
                  <Form.Control
                    type="date"
                    placeholder="dob"
                    onChange={handleChange}
                    name="DOB"
                    defaultValue={changeDate(value.DOB)}
                    required
                  />

                  <label for="Email">Contact No:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Contact"
                    onChange={handleChange}
                    name="ContactNo"
                    defaultValue={value.ContactNo}
                    required
                  />

                  <label for="EmployeeCode">Employee Code:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Employee Code"
                    onChange={handleChange}
                    name="EmployeeCode"
                    defaultValue={value.EmployeeCode}
                    required
                  />

                  <Form.Group>
                    <label for="department">Department:</label>
                    <select
                      id="department"
                      name="Department"
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value={value.department[0]?.departmentName}>
                        {value.department[0]?.departmentName}
                      </option>
                      {entity &&
                        entity.department.map((item) => (
                          <option value={item?._id}>
                            {item?.departmentName}
                          </option>
                        ))}
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="position">Position:</label>
                    <select
                      id="position"
                      name="Position"
                      onChange={(e) => setPosition(e.target.value)}
                    >
                      <option value={value.position[0]?.positionName}>
                        {value.position[0]?.positionName}
                      </option>
                      {entity &&
                        entity.position.map((item) => (
                          <option value={item?._id}>
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
                    defaultValue={changeDate(value.DateOfJoining)}
                    required
                  />

                  {/* <label for="termination">Terminate Date:</label>
                  <Form.Control
                    type="date"
                    placeholder="DateOfTermination"
                    onChange={handleChange}
                    name="Termination"
                    defaultValue={changeDate(value.DateOfJoining)}
                  /> */}
                </Col>
              </Form.Group>

              <div className="sub-cancel">
              <div className="col-lg-10 m-auto btm-btns-asdt">
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
