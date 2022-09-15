import "../../../App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const WorkExperience = (props) => {
  const [loading, setLoading] = useState(false);
  const [exp, setExp] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [expId, setExpId] = useState("");
  const [addExp, setAddExp] = useState({
    CompanyName: "",
    Tech: "",
    Designation: "",
    FromDate: "",
    ToDate: "",
  });
  // const id=localStorage.getItem("id")
  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // setLoading(true)
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}emp/getWorkExperienceByEpm/${props.id}`,
      { headers: { token: token } }
    );

    setExp(response.data);
    setLoading(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAddExp({ ...addExp, [name]: value });
  };

  const addExperience = async (e) => {
    e.preventDefault();
    const obj = {
      CompanyName: addExp.CompanyName,
      Tech: addExp.Tech,
      Designation: addExp.Designation,
      FromDate: addExp.FromDate,
      ToDate: addExp.ToDate,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}emp/addWorkExp/${props.id}`,
      obj,
      { headers: { token: `${token}` } }
    );

    if (response.data.status == true) {
      alert("Experience added Successfully");
      console.log("expp", response.data);
      setLoading(false);
      setShowNew(false);
      getData();
    } else {
      // alert(response.data.msg);
      setShowNew(false);
    }
  };

  const addHandler = () => {
    setShowNew(true);
  };

  const onFormClose = () => {
    setShowNew(false);
  };

  const deleteHandler = async (index) => {
    setExpId(exp?.data[index]._id);

    // console.log("eduId",education[index]._id);
    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}emp/deleteExperience/${exp?.data[index]._id}`,
      { headers: { token: `${token}` } }
    );
    console.log(response);
    getData();
  };

  return (
    <div className="container">
      {showNew && (
        <div className="row">
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Add Experience Details</h2>
            </div>
          </div>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={addExperience}>
              <Form.Group className="frm-slct-indivi-asd">
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <label for="CompanyName">Company Name :</label>
                  <Form.Control
                    type="Text"
                    placeholder="Company"
                    name="CompanyName"
                    onChange={handleChange}
                    required
                  />

                  <label for="Tech">Technology :</label>
                  <Form.Control
                    type="Text"
                    placeholder="Technology"
                    name="Tech"
                    onChange={handleChange}
                    required
                  />

                  <label for="Designation">Designation:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Designation"
                    name="Designation"
                    onChange={handleChange}
                    required
                  />

                  <label for="FromDate">From Date:</label>
                  <Form.Control
                    type="date"
                    placeholder="From Date"
                    name="FromDate"
                    onChange={handleChange}
                    required
                  />

                  <label for="ToDate">To Date:</label>
                  <Form.Control
                    type="date"
                    placeholder="To Date"
                    name="ToDate"
                    onChange={handleChange}
                    required
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
              <div className="top-bar-cnt-area top-bar-cnt-area-nw">
                <h2 id="role-title">List of Experiences</h2>
                <div className="rht-bnt">
                  <button className="btn-rght-top" onClick={addHandler}>
                    <FontAwesomeIcon icon={faPlus} id="plus-icon" />
                    Add Experience
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
                      <th scope="col">CompanyName</th>
                      <th scope="col">Tech</th>
                      <th scope="col">Designation</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exp &&
                      exp?.data?.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <th scope="row"> {index + 1}</th>
                              <td>{item.CompanyName}</td>
                              <td>{item.Tech}</td>
                              <td>{item.Designation}</td>
                              <td>{item.FromDate.slice(0, 10)}</td>
                              <td>{item.ToDate.slice(0, 10)}</td>

                              {/* <td>{item.Status=="1"?"Pending":item.Status=="2"?"Approoved":"Rejecteed"}</td> */}
                              <td>
                                <FontAwesomeIcon icon={faPen} />{" "}
                              </td>
                              <td onClick={() => deleteHandler(index)}>
                                <FontAwesomeIcon icon={faTrash} />{" "}
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

export default WorkExperience;
// http://112.196.64.119:4800/api/emp/getLeaveApplicationsByEmp/62eba6a7d6ab044f2d3b321d
