import React from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const loggingout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <button
        className="btn btn-primary"
        type="submit"
        style={{ float: "right" }}
        onClick={loggingout}
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
