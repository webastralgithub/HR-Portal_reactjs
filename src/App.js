import Login from "./copmponents/Login";
import { useNavigate, Route, Routes } from "react-router-dom";
import Dashboard from "./copmponents/Dashboard/Dashboard";
import PersonalInformation from "./copmponents/Hr/EmpDetails/PersonalInformation";
import Education from "./copmponents/Hr/EmpDetails/Education";
import WorkExperience from "./copmponents/Hr/EmpDetails/WorkExperience";
import { useEffect, useState } from "react";
import PersonalInfo from "./copmponents/pages/PersonalInfo";

function App() {
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [accountType, setAccountType] = useState("3");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const Account = localStorage.getItem("Account");
    const Email = localStorage.getItem("Email");
    //   const Name = localStorage.getItem("Name")
    //   const id = localStorage.getItem("id")
    // setAccountType(Account)
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Logout" element={<Login />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/personal" element={<PersonalInfo />} />
        <Route path="/dashboard/:id/:type" element={<Dashboard />} />
        <Route path="/dashboard/:id/:type/:section" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
