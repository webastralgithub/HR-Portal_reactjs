import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import Pagination from "../Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faPlus,
  faTrash,
  faSearch,
  faEye,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  const nPages = Math.ceil(data.length / recordPerPage);
  const currentRecord = data.slice(indexOfFirstRecord, indexOfLastRecord);

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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}user/addDeprt`,
        obj,
        { headers: { token: `${token}` } }
      );
      console.log(response.data.data);

      setShowNew(false);
      getData();
    } catch (error) {
      if (error?.response?.data?.status == false) {
        alert(error?.response?.data?.msg);
        setShowNew(false);
      } else {
        alert("some error has occured");
      }
    }
  };

  const onDepartmentEdit = async (e) => {
    e.preventDefault();
    const obj = { departmentName: Department.current.value };

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_KEY}user/updateDepartment/${id}`,
        obj,
        { headers: { token: `${token}` } }
      );
      setShowEdit(false);
      e.target.reset();
      getData();
    } catch (error) {
      if (error?.response?.data?.status == false) {
        alert(error?.response?.data?.msg);
        setShowEdit(false);
      } else {
        alert("some error has occured");
      }
    }
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
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Edit Department Details</h2>
            </div>
          </div>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onDepartmentEdit}>
              <Form.Group className="frm-slct-indivi-asd">
                {/* <Form.Label column sm={2}>
                  Department
                </Form.Label> */}
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <label for="Department">Department:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Department"
                    ref={Department}
                    name="Department"
                    defaultValue={value}
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
      {showNew && !showEdit && (
        <div className="row">
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Edit Employee Details</h2>
            </div>
          </div>
          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onDepartmentSubmit}>
              <Form.Group className="frm-slct-indivi-asd">
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <label for="Department">Department:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Department"
                    name="Department"
                    ref={Department}
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
      {loading && !showNew && !showEdit && <p>loading...</p>}
      {!loading && !showEdit && !showNew && (
        <div className="right-cnt-area">
          <div className="row">
            <div className="col-md-12">
              <div className="top-bar-cnt-area">
                <h2 id="role-title">Department Details</h2>
              </div>
            </div>
            <div className="col-md-12">
              <div className="top-bar-cnt-area top-bar-cnt-area-nw">
                <h2 id="role-title">List of Departments</h2>

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
                      <th>Department Name</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>View</th>
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
                            <td>
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

export default Department;
