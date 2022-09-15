import React, { useEffect, useState } from 'react';
import { faCircle, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../../App.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

const PersonalInformation = (props) => {
    const [loading, setLoading] = useState(false);
    const [personalDetail, setPersonalDetail] = useState([]);
    const token = localStorage.getItem("token");

    const getData = async() => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_KEY}emp/getEmployeeEducationByEmployee/${props.id}`,
            { headers: { token: token } }
          );

          setPersonalDetail(response?.data?.data);
          setLoading(false);
    }
    return (
        <div>
            PersonalInformation
        </div>
    )
}

export default PersonalInformation;
