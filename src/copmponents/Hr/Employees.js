import React, { useState, useEffect,useLayoutEffect } from "react";
import axios from "axios";
import "../../App.css";
import InternalSidebar from "../Dashboard/internalSidebar";
import Pagination from "../Pagination";
import { Form, Button, Col, Row } from "react-bootstrap";
import Education from "./EmpDetails/Education";
import WorkExperience from "./EmpDetails/WorkExperience";
import LeaveApplication from "../Employee/LeaveApplication";
import PersonalInformation from "./EmpDetails/PersonalInformation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
  faPlus,
  faSearch,
  faEye,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

const Employees = () => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [check, setCheck] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [education, setEducation] = useState(false);
  const [entity, setEntity] = useState();
  const [account, setAccount] = useState("3");
  const [role, setRole] = useState();
  const [gender, setGender] = useState("Male");
  const [position, setPosition] = useState();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);

  const [addEmp, setAddEmp] = useState({
    Email: "",
    Password: "",
    // Account: "",
    // Role: "",
    // Gender: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    // DOB: "",
    ContactNo: "",
    EmployeeCode: "",
    // Department: "",
    // Position: "",
    DateOfJoining: "",
    TeamLeader: "",
    Termination: "",
  });

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  const nPages = Math.ceil(data.length / recordPerPage);
  const currentRecord = data.slice(indexOfFirstRecord, indexOfLastRecord);

  useEffect(() => {
    getData();
    getEntity();
  }, []);

  const onFormClose = () => {
    setShowNew(false);
    setShowEdit(false);
    setShowView(false);
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
    index = (currentPage - 1) * recordPerPage + index;
    console.log("index", data[index]);
    setId(data[index]?._id);
    setValue(data[index]);
    setShowEdit(true);
  };

  const viewHandler = (index) => {
    index = (currentPage - 1) * recordPerPage + index;
    console.log("index", data[index]);
    setId(data[index]?._id);
    setValue(data[index]);
    setItem(0);
    setShowView(true);
  };

  const getData = async () => {
    // setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}hr/getEpmList`,
      { headers: { token: `${token}` } }
    );
    setData(response?.data?.data);
    // setLoading(false);
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
      TeamLeader: addEmp.TeamLeader,
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
      userRoleId: role,
      // DOB: addEmp.DOB,
      DateOfJoining: addEmp.DateOfJoining,
      ContactNo: addEmp.ContactNo,
      EmployeeCode: addEmp.EmployeeCode,
      positionId: position,
      departId: department,
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
    setShowView(false);
  };

  const deleteHandler = async (index) => {
    setId(data[index]._id);

    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}hr/deleteEmployee/${data[index]._id}`,
      { headers: { token: `${token}` } }
    );
    console.log(response);
    getData();
  };

  const checkDelete = (event, id) => {
    console.log("eve", event.target.checked, id);
    let newData = data.map((item, index) => {
      if (item._id == id) {
        console.log("here");
        item.ischeck = event.target.checked;
      }

      return { ...item };
    });
    console.log("selete", newData);
    setData(newData);
    if (event.target.checked == true) {
      setCheck([...check, id]);
      console.log("yggy8g8yyu8", [...check, id]);
    }
    if (event.target.checked == false) {
      var filteredArray = check.filter((e) => e !== id);
      setCheck(filteredArray);
      console.log("yggy8g8yyu8", filteredArray);
    }
  };
  const deleteMany = async () => {
    console.log("check", check);

    var data = JSON.stringify({ ids: check });

    var config = {
      method: "delete",
      url: `${process.env.REACT_APP_API_KEY}hr/deleteAllEmployee`,
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    getData();
    setLoading(false);
  };
  const change = (item) => {
    console.log("item", item);
    setItem(item);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="top-bar-cnt-area" style={{ marginTop: "20px" }}>
            <span id="role-title-1">Employees Detail</span>
          </div>
        </div>
      </div>

      {showView && (
        <div id="sidebar" className="side_bar" style={{ marginTop: "0px" }}>
          {" "}
          <InternalSidebar value={value} id={id} change={change} />
        </div>
      )}

      {showNew && (
        <div className="row">
          {/* <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Add Employee Details</h2>
            </div>
          </div> */}
          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onAddEmployee}>
              <Form.Group className="frm-slct-indivi-asd">
                {/* <Form.Label column sm={2}>
                  Position
                </Form.Label> */}
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <div className="page-tittle">
                    <h4 id="role-form-title">Add Employee Details</h4>
                  </div>
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
                    required
                  />
                  <label for="middleName">MiddleName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="middleName"
                    onChange={handleChange}
                    name="MiddleName"
                    required
                  />

                  <label for="lastName">LastName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="lastName"
                    onChange={handleChange}
                    name="LastName"
                    required
                  />

                  {/* <label for="dob">DOB:</label>
                  <Form.Control
                    type="date"
                    placeholder="dob"
                    onChange={handleChange}
                    name="DOB"
                    required
                  /> */}

                  <label for="Email">Contact No:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Contact"
                    onChange={handleChange}
                    name="ContactNo"
                    required
                  />

                  <label for="EmployeeCode">Employee Code:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Employee Code"
                    onChange={handleChange}
                    name="EmployeeCode"
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
                    required
                  />

                  <label for="TeamLeader">Team Lead:</label>
                  <Form.Control
                    type="type"
                    placeholder="TeamLeader"
                    onChange={handleChange}
                    name="TeamLeader"
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

      {item == 1 && <Education id={id} />}
      {item == 2 && <WorkExperience id={id} />}

      {item == 4 && <LeaveApplication id={id} />}

      {item == 5 && <PersonalInformation id={id} />}

      {showView && item == 0 && (
        <div className="row">
          {/* <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">View Employee Details</h2>
            </div>
          </div> */}

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onEditEmployee}>
              <Form.Group className="frm-slct-indivi-asd">
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <div className="page-tittle">
                    <h4 id="role-form-title">Basic Information</h4>
                  </div>
                  <label for="Email">Email:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Email"
                    onChange={handleChange}
                    name="Email"
                    value={value.Email}
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
                      // onChange={(e) => setAccount(e.target.value)}
                    >
                      <option value={value.Account}>{value.Account}</option>
                      {/* <option value="1">Admin</option>
                      <option value="2">HR</option>
                      <option value="3">Employee</option> */}
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="roles">Role:</label>
                    <select
                      id="roles"
                      name="Role"
                      // onChange={(e) => setRole(e.target.value)}
                    >
                      <option value={value?.roleType[0]}>
                        {value?.roleType[0]?.roleType}
                      </option>
                      {/* {entity &&
                        entity.role.map((item) => (
                          <option value={item?._id}>{item?.roleType}</option>
                        ))} */}
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="gender">Gender:</label>
                    <select
                      id="gender"
                      name="Gender"
                      // onChange={(e) => setGender(e.target.value)}
                    >
                      <option value={value.Gender}>{value.Gender}</option>
                      {/* <option value="Male">Male</option>
                      <option value="Female">Female</option> */}
                    </select>
                  </Form.Group>

                  <label for="firstName">FirstName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="firstName"
                    onChange={handleChange}
                    name="FirstName"
                    value={value.FirstName}
                    required
                  />
                  <label for="middleName">MiddleName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="middleName"
                    onChange={handleChange}
                    name="MiddleName"
                    value={value.MiddleName}
                    required
                  />

                  <label for="lastName">LastName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="lastName"
                    onChange={handleChange}
                    name="LastName"
                    value={value.LastName}
                    required
                  />

                  {/* <label for="dob">DOB:</label>
                  <Form.Control
                    type="date"
                    placeholder="dob"
                    // onChange={handleChange}
                    name="DOB"
                    value={changeDate(value.DOB)}
                    required
                  /> */}

                  <label for="Email">Contact No:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Contact"
                    onChange={handleChange}
                    name="ContactNo"
                    value={value.ContactNo}
                    required
                  />

                  <label for="EmployeeCode">Employee Code:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Employee Code"
                    onChange={handleChange}
                    name="EmployeeCode"
                    value={value.EmployeeCode}
                    required
                  />

                  <Form.Group>
                    <label for="department">Department:</label>
                    <select
                      id="department"
                      name="Department"
                      // onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value={value.department[0]?.departmentName}>
                        {value.department[0]?.departmentName}
                      </option>
                      {/* {entity &&
                        entity.department.map((item) => (
                          <option value={item?._id}>
                            {item?.departmentName}
                          </option>
                        ))} */}
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label for="position">Position:</label>
                    <select
                      id="position"
                      name="Position"
                      // onChange={(e) => setPosition(e.target.value)}
                    >
                      <option value={value.position[0]?.positionName}>
                        {value.position[0]?.positionName}
                      </option>
                      {/* {entity &&
                        entity.position.map((item) => (
                          <option value={item?._id}>
                            {item?.positionName}
                          </option>
                        ))} */}
                    </select>
                  </Form.Group>

                  <label for="DateOfJoining">Date Of Joining:</label>
                  <Form.Control
                    type="date"
                    placeholder="DateOfJoining"
                    // onChange={handleChange}
                    name="DateOfJoining"
                    value={changeDate(value.DateOfJoining)}
                    required
                  />

                  <label for="TeamLeader">Team Lead:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Employee Code"
                    onChange={handleChange}
                    name="TeamLeader"
                    value={value.TeamLeader}
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
                        Back
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
          {/* <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Edit Employee Details</h2>
            </div>
          </div> */}

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onEditEmployee}>
              <Form.Group className="frm-slct-indivi-asd">
                {/* <Form.Label column sm={2}>
                Position
              </Form.Label> */}
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <div className="page-tittle">
                    <h4 id="role-form-title">Edit Employee Details</h4>
                  </div>
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
                      <option value={value?.roleType[0]}>
                        {value?.roleType[0]?.roleType}
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
                  />

                  <label for="lastName">LastName:</label>
                  <Form.Control
                    type="Text"
                    placeholder="lastName"
                    onChange={handleChange}
                    name="LastName"
                    defaultValue={value.LastName}
                  />

                  {/* <label for="dob">DOB:</label>
                  <Form.Control
                    type="date"
                    placeholder="dob"
                    onChange={handleChange}
                    name="DOB"
                    defaultValue={changeDate(value.DOB)}
                    required
                  /> */}

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

                  <label for="TeamLeader">Team Leader:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Employee Code"
                    onChange={handleChange}
                    name="TeamLeader"
                    defaultValue={value.TeamLeader}
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
      {loading && !showNew && !showEdit && !showView && <p>loading...</p>}
      {!loading && !showNew && !showEdit && !showView && (
        <div className="right-cnt-area">
          <div className="row">
            {/* <div className="col-md-12">
              <div className="top-bar-cnt-area">
                <h2 id="role-title">Employee Details</h2>
              </div>
            </div> */}

            <div className="col-md-12">
              <div className="top-bar-cnt-area top-bar-cnt-area-nw">
                <h2 id="role-title">List of Employees</h2>

                <div className="rht-bnt">
                  <div className="secrch-form">
                    <input
                      type="text"
                      placeholder="search by email"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <button>
                      <FontAwesomeIcon icon={faSearch} id="plus-icon" />
                    </button>
                  </div>

                  <button onClick={deleteMany} className="btn-rght-top dlt">
                    <FontAwesomeIcon icon={faTrash} id="plus-icon" />
                    Delete
                  </button>

                  <button className="btn-rght-top" onClick={addHandler}>
                    <FontAwesomeIcon icon={faPlus} id="plus-icon" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="table-outr-all-tb">
                <table>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>ID</th>
                      <th>Employee Name</th>
                      <th>Email</th>
                      <th>Contact No</th>
                      <th>Gender</th>
                      <th>Role Type</th>
                      <th>Department Name</th>
                      <th>Position Name</th>
                      <th>Leave Application</th>
                      <th>DOB</th>
                      <th>Date Of Joining</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecord &&
                      currentRecord
                        .filter((value) => {
                          if (search == "") {
                            console.log("val", value);
                            return value;
                          } else if (
                            value.Email.toLowerCase().includes(
                              search.toLowerCase()
                            )
                          ) {
                            return value;
                          }
                        })
                        .map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <input
                                  key={value._id}
                                  type="checkbox"
                                  checked={value.ischeck}
                                  onClick={(event) =>
                                    checkDelete(event, value._id)
                                  }
                                />
                              </td>
                              <td>{indexOfFirstRecord + index + 1}</td>
                              {/* <td>{value.Employee_ID}</td> */}
                              <td>
                                {value.FirstName +
                                  " " +
                                  value.MiddleName +
                                  " " +
                                  value.LastName}
                              </td>

                              <td>{value.Email}</td>
                              <td>{value.ContactNo}</td>
                              <td>{value.Gender}</td>

                              <td>{value?.roleType[0]?.roleType}</td>
                              <td>{value?.department[0]?.departmentName}</td>
                              <td>{value?.position[0]?.positionName}</td>
                              <td>{value?.leaveApplication.length}</td>
                              <td>{changeDate(value.DOB)}</td>
                              <td>{changeDate(value.DateOfJoining)}</td>
                              <td onClick={() => editHandler(index)}>
                                <FontAwesomeIcon icon={faEdit} />{" "}
                              </td>
                              <td onClick={() => deleteHandler(index)}>
                                <FontAwesomeIcon icon={faTrash} />
                              </td>
                              <td onClick={() => viewHandler(index)}>
                                <FontAwesomeIcon icon={faEye} />
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-12">
              <div className="pgnation_all-pg">
                <Pagination
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Employees;
