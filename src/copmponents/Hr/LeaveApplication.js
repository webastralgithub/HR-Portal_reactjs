import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Col, Row } from "react-bootstrap";

const LeaveApplication = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState([]);
  const Role = useRef(null);
  const token = localStorage.getItem("token");
  const [leaveStatus, setLeaveStatus] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}emp/getApplicationList`,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);
    setData(response.data.data);
    setLoading(false);
  };

  const changeDate = (date) => {
    if (date) return date.slice(0, 10);
  };

  const getStatus = (item) => {
    var status;
    if (item == "1") {
      status = "Pending";
      return status;
    } else if (item == "3") {
      status = "Approved";
      return status;
    } else {
      status = "Rejected";
      return status;
    }
  };

  const onFormClose = () => {
    setShowNew(false);
    setShowEdit(false);
  };

  const editHandler = (index) => {
    console.log("index", data[index]);
    setValue(data[index]);
    setId(data[index]?._id);
    setShowEdit(true);
  };

  const updateLeaveStatus = async (e) => {
    e.preventDefault();
    const status = {
      Status: leaveStatus,
    };

    const response = await axios.patch(
      `${process.env.REACT_APP_API_KEY}hr/updateApplicationStatus/${id}`,
      status,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);
    setShowEdit(false);
    getData();
  };

  return (
    <div className="container">
      {showEdit && (
        <div className="row">
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Edit Leave Application of _</h2>
            </div>
          </div>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={updateLeaveStatus}>
              <Form.Group lassName="frm-slct-indivi-asd">
                
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <Form.Group>
                    <label for="leavetype">Leave Type:</label>
                    <select
                      id="leavetype"
                      name="leavetype"
                      //   onChange={(e) => setSelectEmp(e.target.value)}
                      value={value.Leavetype}
                    >
                      <option value={value.Leavetype}>{value.Leavetype}</option>
                      {/* <option value="casual">Casual Leave</option>
                      <option value="privilege">Privilege Leave</option> */}
                    </select>
                  </Form.Group>

                  <label for="fromDate">FromDate:</label>
                  <Form.Control
                    type="Text"
                    name="fromdate"
                    className="fromdate"
                    id="fromDate"
                    value={changeDate(value.FromDate)}
                    placeholder=""
                    defaultValue={value}
                  />

                  <label for="toDate">ToDate:</label>
                  <Form.Control
                    type="Text"
                    name="todate"
                    className="todate"
                    id="toDate"
                    value={changeDate(value.ToDate)}
                    placeholder=""
                    defaultValue={value}
                  />

                  <label for="leaveReason">Reason For Leave:</label>
                  <Form.Control
                    type="Text"
                    name="reason"
                    className="reason"
                    id="leaveReason"
                    value={value.Reasonforleave}
                    placeholder=""
                    defaultValue={value}
                  />

                  <Form.Group>
                    <label for="leavestatus">Status:</label>
                    <select
                      id="leavestatus"
                      name="status"
                      onChange={(e) => setLeaveStatus(e.target.value)}
                    >
                      <option value={value.Status}>
                        {getStatus(value.Status)}
                      </option>
                      <option value="3">Approved</option>
                      <option value="1">Pending</option>
                      <option value="2">Rejected</option>
                    </select>
                  </Form.Group>
                </Col>
              </Form.Group>

              <div className="sub-cancel">
                <div className="col-lg-10 m-auto btm-btns-asdt">
                  <Form.Group as={Row} id="form-submit-button">
                    <Col>
                      <Button type="submit">Update</Button>
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
            <h2 id="role-title">Employee Leave Application Details</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Reason for leave</th>
                <th>Status</th>
                <th>Employee</th>
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
                      <td>{value.Leavetype}</td>
                      <td>{changeDate(value.FromDate)}</td>
                      <td>{changeDate(value.ToDate)}</td>
                      <td>{value.Reasonforleave}</td>
                      <td>{getStatus(value.Status)}</td>
                      <td>{value.employee[0]}</td>
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

export default LeaveApplication;
