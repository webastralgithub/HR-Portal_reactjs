import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFile,
  faBriefcase,
  faBook,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";
import "./internalsidebar.css";

const InternalSidebar = (props) => {
  function setShowBasicInfo(item) {
    props.change(item);
  }

  return (
    <div>
      <div>
        <ul className="navbar-ul">
          <li
            onClick={() => {
              setShowBasicInfo(0);
            }}
          >
            <FontAwesomeIcon icon={faUser} className="side-icon" />
            Basic Information
          </li>
          <li
            onClick={() => {
              setShowBasicInfo(5);
            }}
          >
            <FontAwesomeIcon icon={faUser} className="side-icon" />
            Personal Information
          </li>
          <li
            onClick={() => {
              setShowBasicInfo(1);
            }}
          >
            <FontAwesomeIcon icon={faBook} className="side-icon" />
            Qualification
          </li>
          <li
            onClick={() => {
              setShowBasicInfo(2);
            }}
          >
            <FontAwesomeIcon icon={faBriefcase} className="side-icon" />
            Work Experience
          </li>
          <li
            onClick={() => {
              setShowBasicInfo(3);
            }}
          >
            <FontAwesomeIcon icon={faFile} className="side-icon" />
            Document
          </li>
          <li
            onClick={() => {
              setShowBasicInfo(4);
            }}
          >
            <FontAwesomeIcon icon={faMugSaucer} className="side-icon" />
            Leave
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InternalSidebar;
