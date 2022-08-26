import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUniversity, faMale, faBriefcase, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function SideBar({ sidebarLink,account }) {
    // const [content, setContent] = useState(null)
    // console.log("jksjkbbbjkuidhjksdfjkafheuf", sidebarLink);
 

    return (
        <div>
            <div id="sidebar-top-content" />
            <div id="main-title" className="main-title-employee">
                {account}
            </div>
            <ul className="navbar-ul">
                {
                    sidebarLink?.map((item) => {
                        return (
                            <>

                                <li>
                                    <Link to={`/dashboard/${account}/${item.link.replace(/ /g, '')}`}>
                                        <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                                        {item.link}

                                    </Link>
                                </li>
                            </>
                        )
                    })
                }

            </ul>
        </div>

    )
}
