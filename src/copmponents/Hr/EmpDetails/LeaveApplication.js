import axios from "axios";
import "../../../App.css";
import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";

const LeaveApplication = (props) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [showNew, setShowNew] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [applyLeave, setApplyLeave] = useState({
    FromDate: "",
    ToDate: "",
    Reasonforleave: "",
    Status: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // setLoading(true)
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}emp/getLeaveApplicationsByEmp/${id}`,
      { headers: { token: token } }
    );
    console.log(
      `${process.env.REACT_APP_API_KEY}emp/getWorkExperienceByEpm/${id}`
    );
    setLeaves(response.data);
    // setLoading(false)
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setApplyLeave({ ...applyLeave, [name]: value });
  };

  const appliedLeave = async (e) => {
    e.preventDefault();
    const obj = {
      Leavetype: leaveType,
      FromDate: applyLeave.FromDate,
      ToDate: applyLeave.ToDate,
      Reasonforleave: applyLeave.Reasonforleave,
      Status: "1",
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}emp/applyApplication/${id}`,
      obj,
      { headers: { token: `${token}` } }
    );
    console.log("leave", response);
    if (response.status == 200) {
      alert("Successfully applied leave");
      setShowNew(false);
      getData();
    } else {
      alert("An error has occured");
    }
  };

  const deleteHandler = async (index) => {
    setApplicationId(leaves[index].data._id);

    console.log("appId", applicationId);
    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}/api/emp/deletePendingApplication/${leaves[index]._id}`,
      { headers: { token: `${token}` } }
    );
    console.log(response);
    getData();
  };

  const onFormClose = () => {
    setShowNew(false);
    // setShowEdit(false);
  };

  const addHandler = () => {
    setShowNew(true);
  };

  const changeDate = (date) => {
    if (date) return date.slice(0, 10);
  };

  return (
    <div className="container">
      {showNew && (
        <div className="row">
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Add Education Details</h2>
            </div>
          </div>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={appliedLeave}>
              <Form.Group className="frm-slct-indivi-asd">
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <Form.Group>
                    <label for="LeaveType">Leave Type:</label>
                    <select
                      id="LeaveType"
                      name="LeaveType"
                      onChange={(e) => setLeaveType(e.target.value)}
                    >
                      <option value="shortLeave">Short Leave</option>
                      <option value="halfDay">Half Day Leave</option>
                      <option value="casualLeave">Casual Leave</option>
                      <option value="sickLeave">Sick Leave</option>
                      <option value="paidLeave">Paid Leave</option>
                      {/* <option value="1">Admin</option>
                      <option value="2">HR</option>
                      <option value="3">Employee</option> */}
                    </select>
                  </Form.Group>

                  <label for="FromDate">From Date:</label>
                  <Form.Control
                    type="date"
                    placeholder="Degree"
                    name="FromDate"
                    onChange={handleChange}
                    required
                  />

                  <label for="ToDate">To Date:</label>
                  <Form.Control
                    type="date"
                    placeholder="Grade"
                    name="ToDate"
                    onChange={handleChange}
                    required
                  />

                  <label for="Reasonforleave">Reason for leave:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Reason for leave"
                    name="Reasonforleave"
                    onChange={handleChange}
                    required
                  />

                  {/* <label for="PassingOfYear">Passing Year:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Passing Year"
                    name="PassingOfYear"
                    onChange={handleChange}
                    required
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
                    <Col id="form-cancel-button-inner">
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
      {loading && !showNew && <p>loading...</p>}
      {!loading && !showNew && (
        <div className="right-cnt-area">
          <div className="row">
            <div className="col-md-12">
              <div className="top-bar-cnt-area">
                <span id="role-title-1">Employee/Leave Details</span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="top-bar-cnt-area top-bar-cnt-area-nw">
                <h2 id="role-title">Leaves</h2>
                <div className="rht-bnt">
                  <button className="btn-rght-top" onClick={addHandler}>
                    <FontAwesomeIcon icon={faPlus} id="plus-icon" />
                    Apply Leave
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="table-outr-all-tb">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Leave type</th>
                      <th scope="col">Reason for leave</th>
                      <th scope="col">From Date</th>
                      <th scope="col">To Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                      {/* <th scope="col">Edit</th>
                      <th scope="col">Cancel</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {leaves &&
                      leaves?.data?.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <th scope="row"> {index + 1}</th>
                              <td>{item.Leavetype}</td>
                              <td>{item.Reasonforleave}</td>
                              <td>{changeDate(item.FromDate)}</td>
                              <td>{changeDate(item.ToDate)}</td>
                              <td>
                                {item.Status == "1"
                                  ? "Pending"
                                  : item.Status == "2"
                                  ? "Approved"
                                  : "Rejecteed"}
                              </td>
                              <td>
                                <FontAwesomeIcon icon={faPen} />{" "}
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() => deleteHandler(index)}
                                />{" "}
                                 <FontAwesomeIcon icon={faEye} />{" "}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;
