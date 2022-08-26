import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";

import {
  faDeleteLeft,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Salary = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const Salary = useRef(null);
  const [employee, setEmployee] = useState();
  const [selectEmp, setSelectEmp] = useState();
  const [addSalary, setAddSalary] = useState({
    BasicSalary: "",
    BankName: "",
    AccountNo: "",
    AccountHolderName: "",
    IFSCcode: "",
    TaxDeduction: "",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    getData();
  }, []);

  const onFormClose = () => {
    setShowNew(false);
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

  return (
    <div>
      {showNew && (
        <div>
          <h2 id="role-form-title">Add Salary Details</h2>

          <div id="role-form-outer-div">
            <Form id="form" onSubmit={onSalarySubmit}>
              <Form.Group as={Row}>
                {/* <Form.Label column sm={2}>
                  Position
                </Form.Label> */}
                <Col sm={10} className="form-input">
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
      {loading && !showNew && <p>loading...</p>}
      {!loading && !showNew && (
        <div className="right-cnt-area">
          <div className="top-bar-cnt-area">
            <h2 id="role-title">Salary Details</h2>

            <button className="btn-rght-top" onClick={addHandler}>
              <FontAwesomeIcon icon={faPlus} id="plus-icon" />
              Add
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>FirstName</th>
                <th>MiddleName</th>
                <th>LastName</th>
                <th>Salary</th>
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
                      <td>{value.FirstName}</td>
                      <td>{value.MiddleName}</td>
                      <td>{value.LastName}</td>
                      <td>{value?.salary[0]?.BasicSalary}</td>

                      <td>
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

export default Salary;
