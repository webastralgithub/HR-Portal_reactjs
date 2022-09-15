import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import "./employee.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Referrals = () => {
  const [refferals, setRefferals] = useState("");
  const [addRefferal, setAddReferral] = useState({});
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="top-bar-cnt-area">
            <span id="role-title-1">Employee/Refferrals</span>
          </div>
        </div>

        {!refferals ? (
          <>
            <span className="no-refferal">You haven't reffered anyone yet</span>
            <button type="button" class="btn btn-primary btn-add-ref">
              <FontAwesomeIcon icon={faPlus} id="plus-icon" />
              Add Refferals
            </button>
          </>
        ) : (
          <table className="table" className="emp_basic_dtl">
            <tr>
              <th scope="col">Father's Name:</th> - <td scope="col"></td>
            </tr>
          </table>
        )}
      </div>
    </div>
  );
};

export default Referrals;
