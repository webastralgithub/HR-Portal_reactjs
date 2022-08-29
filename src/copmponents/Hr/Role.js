import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Col, Row } from "react-bootstrap";

const Role = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState([]);
  const Role = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}user/getRole`,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);
    setData(response.data.data);
    setLoading(false);
  };
  const onRoleSubmit = async (e) => {
    e.preventDefault();
    const obj = { roleType: Role.current.value };

    e.target.reset();
    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}user/addRole`,
      obj,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);

    setShowNew(false);
    getData();
  };
  const onRoleEdit = async (e) => {
    e.preventDefault();
    const obj = { roleType: Role.current.value };

    const response = await axios.patch(
      `${process.env.REACT_APP_API_KEY}user/updateRole/${id}`,
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
    setValue(data[index].roleType);
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
    <div>
      {showEdit && (
        <div>
          <h2 id="role-form-title">Edit Role Details</h2>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onRoleEdit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Role
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="Text"
                    placeholder="Role"
                    ref={Role}
                    defaultValue={value}
                    required
                  />
                </Col>
              </Form.Group>

              <div className="sub-cancel">
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
              </div>
            </Form>
          </div>
        </div>
      )}
      {showNew && !showEdit && (
        <div>
          <h2 id="role-form-title">Add Role Details</h2>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onRoleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Role
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="Text"
                    placeholder="Role"
                    ref={Role}
                    required
                  />
                </Col>
              </Form.Group>
              <div className="sub-cancel">
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
              </div>
            </Form>
          </div>
        </div>
      )}
      {loading && !showNew && !showEdit && <p>loading...</p>}
      {!loading && !showNew && !showEdit && (
        <div className="right-cnt-area">
          <div className="top-bar-cnt-area">
            <h2 id="role-title">Role Details</h2>

            <button className="btn-rght-top" onClick={addHandler}>
              <FontAwesomeIcon icon={faPlus} id="plus-icon" />
              Add
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Position Name</th>
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
                      <td>{value.roleType}</td>
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

export default Role;
