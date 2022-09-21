import React from "react";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  faUser,
  faUniversity,
  faMale,
  faBriefcase,
  faFileAlt,
  faBook,
  faPerson,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "./Navbar";
import "./Dashboard.css";
import SideBar from "./SideBar";
import DashboardRoutes from "./DashboardRoutes";

export default function Dashboard() {
  let { id } = useParams();
  let { type } = useParams();

  console.log(type);
  const data = [
    // Admin Routes
    [
      {
        link: "Role",
        icon: faUser,
      },
      {
        link: "Position",
        icon: faUniversity,
      },
      {
        link: "Department",
        icon: faMale,
      },
    ],
    // Hr Routes
    [
      {
        link: "Employees",
        icon: faUser,
        EmployeeDetails: [
          { link: "Personal Information", icon: faPerson },
          { link: "Education", icon: faBook },
          { link: "Work Experience", icon: faBriefcase },
          // "Personal Information", "Education", "Work Experience"
        ],
      },
      {
        link: "Salary",
        icon: faUniversity,
      },
      {
        link: "Leave Application",
        icon: faMale,
      },
      {
        link: "Role",
        icon: faBriefcase,
      },
      {
        link: "Department",
        icon: faFileAlt,
      },
      {
        link: "Position",
        icon: faUniversity,
      },
      {
        link: "Trainee",
        icon: faUser
      }
    ],

    //  Employee Routes

    [
      {
        link: "Basic Information",
        icon: faUser,
      },
      {
        link: "Personal Information",
        icon: faUser,
      },
      {
        link: "Education",
        icon: faUniversity,
      },
      {
        link: "Referrals",
        icon: faMale,
      },
      {
        link: "Work Experience",
        icon: faBriefcase,
      },
      {
        link: "Leave Application",
        icon: faFileAlt,
      },
      {
        link: "Holidays",
        icon: faMugSaucer,
      },
    ],
  ];

  const [account, setAccount] = useState("");
  const [sidebarLink, setSidebarKinks] = useState([]);
  var userType;
  useEffect(() => {
    // setAccount()
    userType = Number(localStorage.getItem("Account"));
    if (userType == 1) userType = "Admin";
    if (userType == 2) userType = "Hr";
    if (userType == 3) userType = "Employee";
    console.log(userType, id);
    if (userType != id) {
      return;
    }
    if (userType == "Admin") {
      setSidebarKinks(data[0]);
      setAccount("Admin");
    }
    if (userType == "Hr") {
      setSidebarKinks(data[1]);
      setAccount("Hr");
    }
    if (userType == "Employee") {
      setSidebarKinks(data[2]);
      setAccount("Employee");
    }
  }, []);

  console.log(sidebarLink, "dhbh");
  return (
    <>
      {sidebarLink.length == 0 && (
        <p>You are not authorised to access this page</p>
      )}
      {sidebarLink.length > 0 && (
        <div id="outer-main-div">
          <div id="outer-nav">
            <Navbar />
          </div>
          <div id="main-non-nav">
            <div id="sidebar" className="side_bar">
              <SideBar sidebarLink={sidebarLink} account={account} />
              
            </div>
            {/* <div id="sidebar-top-content" /> */}
            <div id="main-area">
              <div id="sidebar-top-content" />
              <DashboardRoutes accType={id} type={type} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
