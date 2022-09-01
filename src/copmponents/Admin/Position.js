import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Col, Row } from "react-bootstrap";

const Position = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [data, setData] = useState([]);
  const Position = useRef(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}user/getPositionList`,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);
    setData(response.data.data);
    setLoading(false);
  };
  const onPositionSubmit = async (e) => {
    e.preventDefault();
    const obj = { positionName: Position.current.value };

    e.target.reset();
    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}user/addPosition`,
      obj,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);

    setShowNew(false);
    getData();
  };
  const onPositionEdit = async (e) => {
    e.preventDefault();
    const obj = { positionName: Position.current.value };

    const response = await axios.patch(
      `${process.env.REACT_APP_API_KEY}user/updatePosition/${id}`,
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
    setValue(data[index].positionName);
    setShowEdit(true);
  };
  const deleteHandler = async (index) => {
    setId(data[index]._id);

    const response = await axios.delete(
      `${process.env.REACT_APP_API_KEY}user/deletePosition/${data[index]._id}`,
      { headers: { token: `${token}` } }
    );
    console.log(response);
    getData();
  };

  return (
    <div className="container">
      {showEdit && (
        <div className="row">
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Edit Position Details</h2>
            </div>
          </div>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onPositionEdit}>
              <Form.Group className="frm-slct-indivi-asd">
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <label for="Email">Position :</label>
                  <Form.Control
                    type="Text"
                    placeholder="Position"
                    ref={Position}
                    defaultValue={value}
                    required
                  />
                </Col>
              </Form.Group>

              <div className="sub-cancel">
                <div className="col-lg-10 m-auto btm-btns-asdt">
                  <Form.Group as={Row} id="form-submit-button">
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit">Submit</Button>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} id="form-cancel-button">
                    <Col
                      sm={{ span: 10, offset: 2 }}
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
      {showNew && (
        <div>
          <h2 id="role-form-title">Add Position Details</h2>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onPositionSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Position
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control
                    type="Text"
                    placeholder="Position"
                    ref={Position}
                    required
                  />
                </Col>
              </Form.Group>

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
            </Form>
          </div>
        </div>
      )}
      {loading && !showNew && !showEdit && <p>loading...</p>}
      {!loading && !showNew && !showEdit && (
        <div className="right-cnt-area">
          <div className="top-bar-cnt-area">
            <h2 id="role-title">Position Details</h2>

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
                      <td>{value.positionName}</td>
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

export default Position;
