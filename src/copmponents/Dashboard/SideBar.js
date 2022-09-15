import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUniversity,
  faMale,
  faBriefcase,
  faFileAlt,
  faAnchor,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function SideBar({ sidebarLink, account }) {
  // const [content, setContent] = useState(null)
  // console.log("jksjkbbbjkuidhjksdfjkafheuf", sidebarLink);
  const [show, setShow] = useState(false);
  const checkemp = (item) => {
    console.log(item, "vhjgggjk");
    if (item === "Employees") {
      setShow(!show);
    }
  };
  return (
    <div>
      <div id="sidebar-top-content" />
      <div id="main-title" className="main-title-employee">
        <FontAwesomeIcon icon={faUser} />
        {account}
      </div>
      <ul className="navbar-ul">
        {sidebarLink?.map((item) => {
          return (
            <>
              <li onClick={() => checkemp(item.link)}>
                <Link
                  to={`/dashboard/${account}/${item.link.replace(/ /g, "")}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                  {item.link}
                  {show &&
                    item?.EmployeeDetails &&
                    item?.EmployeeDetails.map((item) => {
                      return (
                        <>
                          <ul>
                            <Link
                              to={`/dashboard/Hr/Employees/${item.link.replace(
                                / /g,
                                ""
                              )}`}
                            >
                              <FontAwesomeIcon
                                icon={item.icon}
                                className="sidebar-icon"
                              />
                              {item.link}
                            </Link>
                          </ul>
                        </>
                      );
                    })}
                </Link>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
