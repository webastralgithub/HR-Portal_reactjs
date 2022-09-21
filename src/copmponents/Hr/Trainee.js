import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faPlus,
  faTrash,
  faSearch,
  faEye,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Col, Row, Table } from "react-bootstrap";

const Trainee = () => {
  const [loading, setLoading] = useState(false);
  const Feedback = useRef(null);
  const Comment = useRef(null);

  const [modalValue, setModalValue] = useState({
    name: "",
    tl: "",
    id: "",
  });
  const [showNew, setShowNew] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [show2, setShow2] = useState(false);

  const token = localStorage.getItem("token");
  const [feedback, setFeedback] = useState([]);

  const [data, setData] = useState([]);
  const [addTrainee, setAddTrainee] = useState({
    traineeName: "",
    teamLeader: "",
    timePeriod: "",
    email: "",
    dateOfBirth: "",
    contactNo: "",
    technology: "",
    permanetAddress: "",
  });

  useEffect(() => {
    getData();
    // getEntity();
  }, []);

  const getData = async () => {
    // setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}hr/getListOfTrainee`,
      { headers: { token: `${token}` } }
    );
    setData(response?.data?.data);

    // setLoading(false);
  };
  const getFeedback = (item, name) => {
    setShow2(true);
    setName(name);
    console.log(item, "itefgcgfg");
    setFeedback(item);
  };
  const modalShow = (name, tl, id) => {
    setShow(true);
    setModalValue({ name, tl, id });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    //   const url = `http://112.196.64.119:4800/api/hr/addTraineeFeedback/63298ed629cf55ae4705c750`
    //   axios.post(url,{headers:})
    const obj = {
      teamLeader: modalValue.tl,
      trainee: modalValue.name,
      feedback: Feedback.current.value,
      comment: Comment.current.value,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}hr/addTraineeFeedback/${modalValue.id}`,
      obj,
      { headers: { token: `${token}` } }
    );
    setShow(false);
    getData();
    console.log(response);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAddTrainee({ ...addTrainee, [name]: value });
  };

  const onAddTrainee = async (e) => {
    e.preventDefault();
    const obj = {
      traineeName: addTrainee.traineeName,
      teamLeader: addTrainee.teamLeader,
      timePeriod: addTrainee.timePeriod,
      email: addTrainee.email,
      dateOfBirth: addTrainee.dateOfBirth,
      contactNo: addTrainee.contactNo,
      technology: addTrainee.technology,
      permanetAddress: addTrainee.permanetAddress,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}hr/addTraineeDetails`,
      obj,
      { headers: { token: `${token}` } }
    );
    if (response.data.status == true) {
      alert("Trainee added successfully!");
      setShowNew(false);
      getData();
    } else {
      alert("Employee already Exists!");
    }
    console.log(response.data.data);
  };

  const addHandler = () => {
    setShowNew(true);
  };

  const onFormClose = () => {
    setShowNew(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="top-bar-cnt-area" style={{ marginTop: "20px" }}>
            <span id="role-title-1">Trainees Detail</span>
          </div>
        </div>
      </div>

      {showNew && (
        <div className="row">
          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onAddTrainee}>
              <Form.Group className="frm-slct-indivi-asd">
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <div className="page-tittle">
                    <h4 id="role-form-title">Add Trainee Details</h4>
                  </div>
                  <label for="traineeName">Trainee Name:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Trainee Name"
                    name="traineeName"
                    onChange={handleChange}
                    required
                  />

                  <label for="teamLeader">Team Leader:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Team Leader"
                    onChange={handleChange}
                    name="teamLeader"
                    required
                  />

                  <label for="timePeriod">Time Period:</label>
                  <Form.Control
                    type="Number"
                    placeholder="Time Period"
                    onChange={handleChange}
                    name="timePeriod"
                    required
                  />

                  <label for="email">Email:</label>
                  <Form.Control
                    type="Number"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    required
                  />

                  <label for="dateOfBirth">Date Of Birth:</label>
                  <Form.Control
                    type="date"
                    placeholder=""
                    onChange={handleChange}
                    name="dateOfBirth"
                    required
                  />

                  <label for="contactNo">Contact No:</label>
                  <Form.Control
                    type="Number"
                    placeholder=""
                    onChange={handleChange}
                    name="contactNo"
                    required
                  />

                  <label for="technology">Technology:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Technology"
                    onChange={handleChange}
                    name="technology"
                    required
                  />

                  <label for="permanetAddress">Permanent Address:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Permanent Address"
                    onChange={handleChange}
                    name="permanetAddress"
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

      {loading && !showNew && <p>loading...</p>}
      {!loading && !showNew && (
        <div className="right-cnt-area">
          <div className="row">
            <div className="col-md-12">
              <div className="top-bar-cnt-area top-bar-cnt-area-nw">
                <h2 id="role-title">List of Trainees</h2>

                <div className="rht-bnt">
                  <div className="secrch-form">
                    <input type="text" placeholder="search.." />
                    <button>
                      <FontAwesomeIcon icon={faSearch} id="plus-icon" />
                    </button>
                  </div>

                  <button className="btn-rght-top dlt">
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
                      <th>ID</th>
                      <th>Name</th>
                      <th>Mentor Name</th>
                      <th>Time Period</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Technology</th>
                      <th>Permanent Address</th>
                      <th>Feedback</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      {/* <th>View</th> */}
                      <th>Add Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{value.traineeName}</td>
                            <td>{value.teamLeader}</td>
                            <td>{value.timePeriod} months</td>

                            <td>{value.email}</td>
                            <td>{value.contactNo}</td>
                            <td>{value.technology}</td>
                            <td>{value.permanetAddress}</td>
                            <td>
                              {value.feedback.length > 0 ? (
                                <FontAwesomeIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    getFeedback(
                                      value.feedback,
                                      value.traineeName
                                    )
                                  }
                                  icon={faEye}
                                />
                              ) : (
                                "No feedback"
                              )}
                            </td>
                            <td>
                              <FontAwesomeIcon
                                style={{ cursor: "pointer" }}
                                icon={faEdit}
                              />{" "}
                            </td>
                            <td>
                              <FontAwesomeIcon
                                style={{ cursor: "pointer" }}
                                icon={faTrash}
                              />
                            </td>
                            {/* <td>
                            <FontAwesomeIcon
                              style={{ cursor: "pointer" }}
                              icon={faEye}
                            />
                          </td> */}
                            <td>
                              <FontAwesomeIcon
                                style={{ cursor: "pointer" }}
                                icon={faAddressCard}
                                onClick={() =>
                                  modalShow(
                                    value.traineeName,
                                    value.teamLeader,
                                    value._id
                                  )
                                }
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <Modal show={show}>
                  <Modal.Header closeButton onClick={() => setShow(false)}>
                    <Modal.Title>Name: {modalValue.name}</Modal.Title>
                  </Modal.Header>
                  <h6> Mentor Name: {modalValue.tl}</h6>
                  <Modal.Body>
                    <Form onSubmit={onSubmit}>
                      <Form.Group>
                        <Col>
                          <label for="Feedback">Feedback:</label>
                          <Form.Control
                            type="Text"
                            placeholder="Feedback"
                            name="Feedback"
                            ref={Feedback}
                          />
                          <Form.Control
                            type="Text"
                            placeholder="Comment"
                            name="Comment"
                            ref={Comment}
                          />
                        </Col>
                      </Form.Group>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShow(false)}
                        >
                          Close
                        </Button>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal.Body>
                </Modal>

                <Modal size="xl" centered={true} show={show2}>
                  <Modal.Header closeButton onClick={() => setShow2(false)}>
                    <Modal.Title>Name:{name} </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <table>
                      {feedback.length > 0 &&
                        feedback.map((item) => {
                          return (
                            <tr>
                              <tr scope="col">
                                Date:{item.createdAt.slice(5, 10)}{" "}
                              </tr>
                              <th scope="col">FeedbackBy:</th>
                              <td scope="col">{item.teamLeader}</td>
                              <th scope="col">Feedback:</th>
                              <td scope="col">{item.feedback}</td>
                              <th scope="col">Comment:</th>
                              <td scope="col">{item.comment}</td>
                            </tr>
                          );
                        })}
                    </table>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainee;
