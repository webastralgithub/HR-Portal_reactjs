import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import Pagination from "../Pagination";

import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";

import {
  faDeleteLeft,
  faEdit,
  faTrash,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Salary = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [showNew, setShowNew] = useState(false);
  const Salary = useRef(null);
  const [showEdit, setShowEdit] = useState(false);
  const [employee, setEmployee] = useState();
  const [selectEmp, setSelectEmp] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [addSalary, setAddSalary] = useState({
    BasicSalary: "",
    BankName: "",
    AccountNo: "",
    AccountHolderName: "",
    IFSCcode: "",
    TaxDeduction: "",
  });

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

  const nPages = Math.ceil(data.length / recordPerPage);
  const currentRecord = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getData();
  }, []);

  const onFormClose = () => {
    setShowNew(false);
    setShowEdit(false);
  };

  const addHandler = () => {
    setShowNew(true);
    getEmployees();
  };

  const getEmployees = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}hr/getEpmList`,
      { headers: { token: `${token}` } }
    );
    console.log(response?.data?.data);
    setEmployee(response?.data?.data);
    console.log("emppp", response?.data?.data);
  };

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_KEY}hr/getSalary`,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);
    setData(response.data.data);
    setLoading(false);
  };

  const editHandler = (index) => {
    index = (currentPage - 1) * recordPerPage + index;
    console.log("index", data[index]);
    setId(data[index]?.salary[0]?._id);
    setValue(data[index]);
    setShowEdit(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAddSalary({ ...addSalary, [name]: value });
    console.log("username", addSalary);
  };

  const onSalarySubmit = async (e) => {
    e.preventDefault();
    const obj = {
      BasicSalary: addSalary.BasicSalary,
      BankName: addSalary.BankName,
      AccountNo: addSalary.AccountNo,
      AccountHolderName: addSalary.AccountHolderName,
      IFSCcode: addSalary.IFSCcode,
      TaxDeduction: addSalary.TaxDeduction,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_KEY}hr/addSalary/${selectEmp}`,
      obj,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);

    setShowNew(false);
    getData();
  };

  const onSalaryEdit = async (e) => {
    e.preventDefault();
    const obj = {
      BasicSalary: addSalary.BasicSalary,
      BankName: addSalary.BankName,
      AccountNo: addSalary.AccountNo,
      AccountHolderName: addSalary.AccountHolderName,
      IFSCcode: addSalary.IFSCcode,
      TaxDeduction: addSalary.TaxDeduction,
    };
    Object.keys(obj).forEach((key) => {
      if (obj[key] === "") {
        delete obj[key];
      }
    });

    const response = await axios.patch(
      `${process.env.REACT_APP_API_KEY}hr/updateSalary/${id}`,
      obj,
      { headers: { token: `${token}` } }
    );
    console.log(response.data.data);

    setShowNew(false);
    getData();
    setShowEdit(false);
  };

  return (
    <div className="container">
      {showNew && (
        <div className="row">
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">Add Salary Details</h2>
            </div>
          </div>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onSalarySubmit}>
              <Form.Group className="frm-slct-indivi-asd">
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <Form.Group as={Row}>
                    <label for="employee">Select Employee:</label>
                    <select
                      id="employee"
                      name="employee"
                      onChange={(e) => setSelectEmp(e.target.value)}
                    >
                      {employee &&
                        employee.map((emp) => (
                          <option
                            value={emp._id}
                          >{`${emp.FirstName} ${emp.MiddleName} ${emp.LastName}`}</option>
                        ))}
                    </select>
                  </Form.Group>
                  <label for="basicSalary">Basic Salary:</label>
                  <Form.Control
                    type="Text"
                    placeholder="BasicSalary"
                    name="BasicSalary"
                    onChange={handleChange}
                    value={addSalary.BasicSalary}
                    //  ref={Position}
                    required
                  />
                  <label for="bankname">Bank Name:</label>
                  <Form.Control
                    type="Text"
                    placeholder="BankName"
                    name="BankName"
                    onChange={handleChange}
                    value={addSalary.BankName}
                    //  ref={Position}
                    required
                  />

                  <label for="accountno">Account No:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Account No"
                    name="AccountNo"
                    onChange={handleChange}
                    value={addSalary.AccountNo}
                    //  ref={Position}
                    required
                  />

                  <label for="accountholder">Account Holder Name:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Account Holdername"
                    name="AccountHolderName"
                    onChange={handleChange}
                    value={addSalary.AccountHolderName}
                    //  ref={Position}
                    required
                  />

                  <label for="IFSC">IFSC Code:</label>
                  <Form.Control
                    type="Text"
                    placeholder="IFSC code"
                    name="IFSCcode"
                    onChange={handleChange}
                    value={addSalary.IFSCcode}
                    //  ref={Position}
                    required
                  />

                  <label for="tax">Tax Deduction:</label>
                  <Form.Control
                    type="Text"
                    placeholder="tax deduction"
                    name="TaxDeduction"
                    onChange={handleChange}
                    value={addSalary.TaxDeduction}
                    //  ref={Position}
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

      {showEdit && (
        <div className="row">
          <div className="col-md-12">
            <div className="page-tittle">
              <h2 id="role-form-title">
                Edit Salary Details of{" "}
                {`${value.FirstName} ${value.MiddleName} ${value.LastName}`}
              </h2>
            </div>
          </div>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onSalaryEdit}>
              <Form.Group className="frm-slct-indivi-asd">
                {/* <Form.Label column sm={2}>
                  Position
                </Form.Label> */}
                <Col
                  sm={10}
                  className="form-input col-lg-10 m-auto add-frm-adst"
                >
                  <label for="basicSalary">Basic Salary:</label>
                  <Form.Control
                    type="Text"
                    placeholder="BasicSalary"
                    name="BasicSalary"
                    onChange={handleChange}
                    defaultValue={value?.salary[0]?.BasicSalary}
                    required
                  />
                  <label for="bankname">Bank Name:</label>
                  <Form.Control
                    type="Text"
                    placeholder="BankName"
                    name="BankName"
                    onChange={handleChange}
                    defaultValue={value?.salary[0]?.BankName}
                    required
                  />

                  <label for="accountno">Account No:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Account No"
                    name="AccountNo"
                    onChange={handleChange}
                    defaultValue={value?.salary[0]?.AccountNo}
                    //  ref={Position}
                    required
                  />

                  <label for="accountholder">Account Holder Name:</label>
                  <Form.Control
                    type="Text"
                    placeholder="Account Holdername"
                    name="AccountHolderName"
                    onChange={handleChange}
                    defaultValue={value?.salary[0]?.AccountHolderName}
                    required
                  />

                  <label for="IFSC">IFSC Code:</label>
                  <Form.Control
                    type="Text"
                    placeholder="IFSC code"
                    name="IFSCcode"
                    onChange={handleChange}
                    defaultValue={value?.salary[0]?.IFSCcode}
                    required
                  />

                  <label for="tax">Tax Deduction:</label>
                  <Form.Control
                    type="Text"
                    placeholder="tax deduction"
                    name="TaxDeduction"
                    onChange={handleChange}
                    defaultValue={value?.salary[0]?.TaxDeduction}
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
      {!loading && !showNew && !showEdit && (


<div className="right-cnt-area">
<div className="row">
  <div className="col-md-12">
      <div className="top-bar-cnt-area">
            <h2 id="role-title">Salary Details</h2>
            
            </div>
            </div>

            <div className="col-md-12">
                <div className="top-bar-cnt-area top-bar-cnt-area-nw">
                  <h2 id="role-title">List of Employee's salary</h2>

                  <div className="rht-bnt">

                    <div className="secrch-form">
                      <input type="text" placeholder="search.."/>
                      <button><FontAwesomeIcon icon={faSearch} id="plus-icon" /></button>
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
                <th>EmployeeName</th>
                <th>Salary</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentRecord &&
                currentRecord.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{indexOfFirstRecord + index + 1}</td>
                      <td>
                        {value.FirstName +
                          " " +
                          value.MiddleName +
                          " " +
                          value.LastName}
                      </td>
                      <td>{value?.salary[0]?.BasicSalary}</td>

                      <td onClick={() => editHandler(index)}>
                        <FontAwesomeIcon icon={faEdit} />{" "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          </div>
            </div>

            <div className="col-md-12">
              <div className="pgnation_all-pg"></div>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          </div>
        </div>
            </div>
          
        
      )}
    </div>
  );
};

export default Salary;
