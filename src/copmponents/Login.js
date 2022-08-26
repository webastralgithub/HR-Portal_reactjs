import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import "./login.css";




export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [userLogin, setUserLogin] = useState({
    Email: "",
    Password: ""
  })


  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserLogin({ ...userLogin, [name]: value })
  }



  const handleSubmit = async (e) => {
    const url = "http://112.196.64.119:4800/api/auth/login"
    e.preventDefault()
    const newEntry = {
      Email: userLogin.Email,
      Password: userLogin.Password
    }
    try {
      const response = await axios.post(url, newEntry)
      localStorage.setItem("token", response?.data?.token)
      localStorage.setItem("Account", response?.data?.userDetails?.Account)
      localStorage.setItem("id", response?.data?.userDetails?._id)
      // localStorage.setItem("Name", response?.data?.userDetails?.Name)
      if(response?.data?.userDetails?.Account==="1"){
        navigate('/dashboard/Admin')
      }
      if(response?.data?.userDetails?.Account==="2"){
        navigate('/dashboard/Hr')
      }
       
if(response?.data?.userDetails?.Account==="3"){
  navigate('/dashboard/Employee')
}

// console.log("jsgsghfghhgfdf",response?.data?.userDetails?.Account);

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div>
      <div className="container">
        <div id="main-outer-div">
          <div id="logo-div">
            <img id="logo-img" alt="" />
          </div>
          <div id="title-div">
            <h4 className="title">Sign in</h4>
          </div>

          <div id="outer-login-form-div">
            <form action="" method="" onSubmit={handleSubmit}>

              <input
                className="login-form-input"
                type="text"

                placeholder="Email"
                required="required"
                name="Email"
                value={userLogin.Email}
                onChange={handleInputChange}
              />

              <input
                className="login-form-input"
                type="password"

                placeholder="Password"
                required="required"
                name="Password"
                value={userLogin.Password}
                onChange={handleInputChange}
              />

              <input
                className="login-form-input"
                type="submit"
                value="Login"
                id="submitBtn"
              />

            </form>
          </div>

          <div className="loading">
            {/* <ScaleLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.props.loading}
          /> */}
          </div>
        </div>
      </div>
    </div>


  );
}
