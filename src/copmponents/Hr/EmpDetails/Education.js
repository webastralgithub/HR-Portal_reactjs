import { faCircle, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../../App.css";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

const Education = (props) => {
  const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState([]);
  // const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [showEdit, setShowEdit] = useState(false);
  const [value, setValue] = useState("");
  const [eduId, setEduId] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [addEdu, setAddEdu] = useState({
    SchoolUniversity: "",
    Degree: "",
    Grade: "",
    PassingOfYear: "",
  });

  useEffect(() => {
    getData();
  }, []);

  console.log("PROPS",props)
  const getData = async () => {
    
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}emp/getEmployeeEducationByEmployee/${props.id}`,
      { headers: { token: token } }
    );

    setEducation(response.data);
    setLoading(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAddEdu({ ...addEdu, [name]: value });
  };

  const addEducation = async (e) => {
    e.preventDefault();
    const obj = {
      SchoolUniversity: addEdu.SchoolUniversity,
      Degree: addEdu.Degree,
      Grade: addEdu.Grade,
      PassingOfYear: addEdu.PassingOfYear,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}emp/addEducation/${props.id}`,
      obj,
      { headers: { token: `${token}` } }
    );
    if(response.data.status == true) {
        alert(response.data.msg);
        setEducation(response.data);
        setLoading(false);
        setShowNew(false);
        getData();
    } else {
        alert(response.data.msg);
        setShowNew(false);
    }
  };

  const deleteHandler = async (index) => {
    setEduId(education?.data[index]._id);

    // console.log("eduId",education[index]._id);
    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}emp/deleteEduction/${education?.data[index]._id}`,
      { headers: { token: `${token}` } }
    );
    console.log(response);
    getData();
  };
  

  const onFormClose = () => {
    setShowNew(false);
    // setShowEdit(false);
  };

//   const editHandler = (index) => {
//     setEduId(education[index]._id);
//     // setValue(education[index].positionName);
//     setShowEdit(true);
//   };

  const addHandler = () => {
    setShowNew(true);
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
            <Form id="form" onSubmit={addEducation}>
              <Form.Group className="frm-slct-indivi-asd">
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <label for="SchoolUniversity">School/University Name:</label>
                  <Form.Control
                    type="Text"
                    placeholder="School/University"
                    name="SchoolUniversity"
                    onChange={handleChange}
                    required
                  />

                  <label for="Degree">Degree:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Degree"
                    name="Degree"
                    onChange={handleChange}
                    required
                  />

                  <label for="university">Grade:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Grade"
                    name="Grade"
                    onChange={handleChange}
                    required
                  />

                  <label for="PassingOfYear">Passing Year:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Passing Year"
                    name="PassingOfYear"
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
                <h2 id="role-title">List of Degrees</h2>
                <div className="rht-bnt">
                  <button className="btn-rght-top" onClick={addHandler}>
                    <FontAwesomeIcon icon={faPlus} id="plus-icon" />
                    Add Education
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
                      <th scope="col">Degree/Class</th>
                      <th scope="col">School/University</th>
                      <th scope="col">Passing Year</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {education &&
                      education?.data?.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <th scope="row"> {index + 1}</th>
                              <td>{item.Degree}</td>
                              <td>{item.SchoolUniversity}</td>
                              <td>{item.PassingOfYear}</td>
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

export default Education;

