import React from 'react'
import './Navbar.css'
import { Navbar, Nav } from 'react-bootstrap'
import logo from "../../logo512.png"

export default function NavBar() {
    return (
        <div>
            <Navbar bg="light" expand="lg" className="nav-bar" fixed="top" id="main-nav">
                <Navbar.Brand id="logo-anchor" >
                    <img id="nav-bar-logo" src={logo} alt="" />

                   
                </Navbar.Brand>
            </Navbar>
            
        </div>
    )
}
