import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Col, Row } from "react-bootstrap";

const Department = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState([]);
  const Department = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}user/getDepartmentList`,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);
    setData(response.data.data);
    setLoading(false);
  };

  const onDepartmentSubmit = async (e) => {
    e.preventDefault();
    const obj = { departmentName: Department.current.value };

    e.target.reset();
    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}user/addDeprt`,
      obj,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);

    setShowNew(false);
    getData();
  };
  const onDepartmentEdit = async (e) => {
    e.preventDefault();
    const obj = { departmentName: Department.current.value };

    const response = await axios.patch(
      `${process.env.REACT_APP_API_KEY}user/updateDepartment/${id}`,
      obj,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);

    setShowEdit(false);
    e.target.reset();
    getData();
  };
  const onFormClose = () => {
    setShowNew(false);
    setShowEdit(false);
  };

  const addHandler = () => {
    setShowNew(true);
  };
  const editHandler = (index) => {
    setId(data[index]._id);
    setValue(data[index].departmentName);
    setShowEdit(true);
  };
  const deleteHandler = async (index) => {
    setId(data[index]._id);

    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}user/delete/${data[index]._id}`,
      { headers: { token: `${token}` } }
    );
    console.log(response);
    getData();
  };

  return (
    <div className="container">
      {showEdit && (
        <div className="row">
          <h2 id="role-form-title">Edit Department Details</h2>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onDepartmentEdit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Department
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="Text"
                    placeholder="Department"
                    ref={Department}
                    defaultValue={value}
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
      {showNew && !showEdit && (
        <div className="row">
          <h2 id="role-form-title">Add Department Details</h2>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onDepartmentSubmit}>
              <Form.Group as={Row}>
                <label column sm={2}>
                  Department
                </label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="Text"
                    placeholder="Department"
                    ref={Department}
                    required
                  />
                </Col>
              </Form.Group>
              <div className="sub-cancel">
              <Form.Group as={Row} id="form-submit-button">
                <Col >
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
      {!loading && !showEdit && !showNew && (
        <div className="right-cnt-area">
          <div className="top-bar-cnt-area">
            <h2 id="role-title">Department Details</h2>

            <button className="btn-rght-top" onClick={addHandler}>
              <FontAwesomeIcon icon={faPlus} id="plus-icon" />
              Add
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Department Name</th>
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
                      <td>{value.departmentName}</td>
                      <td onClick={() => editHandler(index)}>
                        <FontAwesomeIcon icon={faEdit} />{" "}
                      </td>
                      <td onClick={() => deleteHandler(index)}>
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

export default Department;
